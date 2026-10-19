import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { connectMongo } from "../../../../lib/mongodb";
import { Lead } from "../../../../lib/models/Lead";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("ut_admin")?.value;
  const secret = process.env.JWT_SECRET;
  if (!token || !secret) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const payload = jwt.verify(token, secret) as { role?: string };
    if (payload.role !== "admin") throw new Error("role");
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const mongo = await connectMongo();
    if (!mongo) {
      if (process.env.NODE_ENV === "production") return NextResponse.json({ error: "Persistent database is not configured." }, { status: 503 });
      const read = (file: string) => { try { return existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) as Record<string, unknown>[] : []; } catch { return []; } };
      const dataDir = join(process.cwd(), "data");
      const leads = [...read(join(dataDir, "contacts.json")), ...read(join(dataDir, "quotes.json"))]
        .sort((a, b) => new Date(String(b.createdAt || b.submittedAt || 0)).getTime() - new Date(String(a.createdAt || a.submittedAt || 0)).getTime())
        .slice(0, 50)
        .map(({ ipHash, ...item }) => item);
      return NextResponse.json({ leads, mode: "development-file-fallback" });
    }
    const leads = await Lead.find({}).select("leadId kind name email phone company subject message source createdAt").sort({ createdAt: -1 }).limit(50).lean();
    return NextResponse.json({ leads });
  } catch (error) {
    console.error("admin leads error", error);
    return NextResponse.json({ error: "Could not load enquiries." }, { status: 500 });
  }
}
