import { NextResponse } from "next/server";
import { connectMongo } from "../../../lib/mongodb";
import { Job } from "../../../lib/models/Job";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const mongo = await connectMongo();
    if (!mongo) return NextResponse.json({ jobs: [], configured: false }, { headers: { "Cache-Control": "no-store" } });
    const now = new Date();
    const jobs = await Job.find({ published: true, verified: true, $or: [{ expiresAt: { $exists: false } }, { expiresAt: null }, { expiresAt: { $gt: now } }] })
      .select("title company category location salary type exp urgent qual desc createdAt expiresAt")
      .sort({ urgent: -1, createdAt: -1 }).limit(100).lean();
    return NextResponse.json({ jobs: jobs.map(job => ({ ...job, id: String(job._id) })), configured: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("public jobs route error", error);
    return NextResponse.json({ jobs: [], configured: false }, { headers: { "Cache-Control": "no-store" } });
  }
}
