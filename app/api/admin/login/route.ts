import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";
const COOKIE = "ut_admin";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const expectedEmail = process.env.ADMIN_EMAIL;
    const passwordHash = process.env.ADMIN_PASSWORD_HASH;
    const secret = process.env.JWT_SECRET;
    if (!expectedEmail || !passwordHash || !secret) return NextResponse.json({ error: "Admin authentication is not configured on this server." }, { status: 503 });
    if (String(email || "").toLowerCase() !== expectedEmail.toLowerCase()) return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    const valid = await bcrypt.compare(String(password || ""), passwordHash);
    if (!valid) return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    const token = jwt.sign({ sub: expectedEmail, role: "admin" }, secret, { expiresIn: "8h" });
    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 8 * 60 * 60 });
    return response;
  } catch { return NextResponse.json({ error: "Unable to sign in." }, { status: 400 }); }
}
