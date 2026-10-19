import crypto from "crypto";
import type { NextRequest } from "next/server";

export function clientIp(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

export function hashIp(ip: string) {
  const salt = process.env.IP_HASH_SALT || "unique-too-public-salt-change-me";
  return crypto.createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export function cleanText(value: unknown, max = 500) {
  return String(value ?? "").replace(/<[^>]*>/g, "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max);
}

export function isEmail(value: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value); }
export function normalizeIndianMobile(value: string) {
  const digits = String(value ?? "").replace(/\D/g, "");
  const national = digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
  return /^[6-9]\d{9}$/.test(national) ? national : "";
}
export function isIndianMobile(value: string) { return Boolean(normalizeIndianMobile(value)); }

export function honeypotTriggered(value: unknown) { return Boolean(String(value ?? "").trim()); }
