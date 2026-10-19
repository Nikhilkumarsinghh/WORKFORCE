import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { connectMongo } from "../../../../lib/mongodb";
import { Application } from "../../../../lib/models/Application";

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
      const file = join(process.cwd(), "data", "applications.json");
      let applications: Record<string, unknown>[] = [];
      try { if (existsSync(file)) applications = JSON.parse(readFileSync(file, "utf8")); } catch { applications = []; }
      applications = applications.sort((a, b) => new Date(String(b.createdAt || b.submittedAt || 0)).getTime() - new Date(String(a.createdAt || a.submittedAt || 0)).getTime()).slice(0, 50).map(({ ipHash, ...item }) => item);
      return NextResponse.json({ applications, mode: "development-file-fallback" });
    }
    const applications = await Application.find({}).select("applicationId name email phone jobTitle jobId experience education location message resumeFile createdAt").sort({ createdAt: -1 }).limit(50).lean();
    return NextResponse.json({ applications });
  } catch (error) {
    console.error("admin applications error", error);
    return NextResponse.json({ error: "Could not load applications." }, { status: 500 });
  }
}
