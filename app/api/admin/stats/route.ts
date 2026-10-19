import { NextRequest, NextResponse } from "next/server";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import jwt from "jsonwebtoken";
import { connectMongo } from "../../../../lib/mongodb";
import { Lead } from "../../../../lib/models/Lead";
import { Application } from "../../../../lib/models/Application";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  const token = req.cookies.get("ut_admin")?.value; const secret = process.env.JWT_SECRET;
  if (!token || !secret) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try { const payload = jwt.verify(token, secret) as { role?: string }; if (payload.role !== "admin") throw new Error("role"); } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
  const mongo = await connectMongo();
  if (!mongo) {
    if (process.env.NODE_ENV === "production") return NextResponse.json({ configured: false, leads: 0, applications: 0 });
    const readCount = (file: string) => { try { return existsSync(file) ? (JSON.parse(readFileSync(file, "utf8")) as unknown[]).length : 0; } catch { return 0; } };
    const dataDir = join(process.cwd(), "data");
    const leads = readCount(join(dataDir, "contacts.json")) + readCount(join(dataDir, "quotes.json"));
    const applications = readCount(join(dataDir, "applications.json"));
    return NextResponse.json({ configured: false, leads, applications, mode: "development-file-fallback" });
  }
  const [leads, applications] = await Promise.all([Lead.countDocuments(), Application.countDocuments()]);
  return NextResponse.json({ configured: true, leads, applications });
}
