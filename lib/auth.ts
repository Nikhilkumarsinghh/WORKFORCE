import crypto from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { connectMongo } from "./mongodb";
import { User, type UserDocument } from "../models/User";

const SESSION_COOKIE = "ut_session";
const OAUTH_STATE_COOKIE = "ut_oauth_state";
const JWT_SECRET = process.env.JWT_SECRET || "change-this-secret-in-production";

type SessionPayload = { sub: string; email: string; name: string; role: string };

export function createOAuthState() {
  return crypto.randomBytes(24).toString("hex");
}

export async function setOAuthState(state: string) {
  const jar = await cookies();
  jar.set(OAUTH_STATE_COOKIE, state, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 600, path: "/" });
}

export async function consumeOAuthState(state: string) {
  const jar = await cookies();
  const stored = jar.get(OAUTH_STATE_COOKIE)?.value;
  jar.delete(OAUTH_STATE_COOKIE);
  if (!stored || !state || stored.length !== state.length) return false;
  return crypto.timingSafeEqual(Buffer.from(stored), Buffer.from(state));
}

export async function setSession(user: { _id: unknown; email: string; name: string; role: string }) {
  const token = jwt.sign({ sub: String(user._id), email: user.email, name: user.name, role: user.role } satisfies SessionPayload, JWT_SECRET, { expiresIn: "30d" });
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 24 * 30, path: "/" });
}

export async function clearSession() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

export async function getSession() {
  try {
    const token = (await cookies()).get(SESSION_COOKIE)?.value;
    if (!token) return null;
    return jwt.verify(token, JWT_SECRET) as SessionPayload;
  } catch {
    return null;
  }
}

export async function findOrCreateOAuthUser(input: { provider: "google" | "facebook"; providerId: string; email: string; name: string; image?: string }) {
  const db = await connectMongo();
  if (!db) throw new Error("Database is not configured");
  const email = input.email.toLowerCase().trim();
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ name: input.name || "UniqueToo User", email, image: input.image, provider: input.provider, providerId: input.providerId, role: "user" });
  } else {
    user.name = input.name || user.name;
    user.image = input.image || user.image;
    user.provider = input.provider;
    user.providerId = input.providerId;
    await user.save();
  }
  return user;
}

export async function createCredentialsUser(name: string, email: string, password: string) {
  const db = await connectMongo();
  if (!db) throw new Error("Database is not configured");
  const normalized = email.toLowerCase().trim();
  const existing = await User.findOne({ email: normalized });
  if (existing) throw new Error("An account with this email already exists");
  const passwordHash = await bcrypt.hash(password, 12);
  return User.create({ name: name.trim(), email: normalized, passwordHash, provider: "credentials", role: "user" });
}

export async function authenticateCredentials(email: string, password: string) {
  const db = await connectMongo();
  if (!db) throw new Error("Database is not configured");
  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (!user?.passwordHash) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  return ok ? user : null;
}
