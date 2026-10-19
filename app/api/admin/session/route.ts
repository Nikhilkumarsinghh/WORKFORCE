import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export const runtime = "nodejs";
export async function GET(req: NextRequest) {
  const token = req.cookies.get("ut_admin")?.value; const secret = process.env.JWT_SECRET;
  if (!token || !secret) return NextResponse.json({ authenticated: false }, { status: 401 });
  try { const payload = jwt.verify(token, secret) as { sub?: string; role?: string }; if (payload.role !== "admin") throw new Error("role"); return NextResponse.json({ authenticated: true, email: payload.sub }); }
  catch { return NextResponse.json({ authenticated: false }, { status: 401 }); }
}
