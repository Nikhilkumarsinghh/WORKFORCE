import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectMongo } from "../../../../lib/mongodb";
import { Job } from "../../../../lib/models/Job";
import { cleanText } from "../../../../lib/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function isAdmin(req: NextRequest) {
  const token = req.cookies.get("ut_admin")?.value;
  const secret = process.env.JWT_SECRET;
  if (!token || !secret) return false;
  try { return (jwt.verify(token, secret) as { role?: string }).role === "admin"; } catch { return false; }
}

export async function GET(req: NextRequest) {
  if (!(await isAdmin(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const mongo = await connectMongo();
    if (!mongo) return NextResponse.json({ error: "Configure MONGODB_URI and MONGODB_DB to manage live vacancies." }, { status: 503 });
    const jobs = await Job.find({}).sort({ createdAt: -1 }).limit(200).lean();
    return NextResponse.json({ jobs: jobs.map(job => ({ ...job, id: String(job._id) })) });
  } catch (error) {
    console.error("admin jobs get error", error);
    return NextResponse.json({ error: "Could not load job records." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const title = cleanText(body.title, 180), company = cleanText(body.company, 180), category = cleanText(body.category, 100);
    const location = cleanText(body.location, 180), salary = cleanText(body.salary, 120), type = cleanText(body.type, 80);
    const exp = cleanText(body.exp, 100), qual = cleanText(body.qual, 180), desc = cleanText(body.desc, 3000);
    if (!title || !company || !category || !location || !salary || !type || !exp || !qual || desc.length < 20) {
      return NextResponse.json({ error: "Complete all job fields and provide at least 20 characters of description." }, { status: 400 });
    }
    const verified = body.verified === true;
    const published = body.published === true && verified;
    const expiresAt = body.expiresAt ? new Date(body.expiresAt) : undefined;
    if (expiresAt && Number.isNaN(expiresAt.getTime())) return NextResponse.json({ error: "Choose a valid expiry date." }, { status: 400 });
    const mongo = await connectMongo();
    if (!mongo) return NextResponse.json({ error: "Persistent database is not configured." }, { status: 503 });
    const job = await Job.create({ title, company, category, location, salary, type, exp, qual, desc, urgent: body.urgent === true, verified, published, expiresAt, createdAt: new Date(), updatedAt: new Date() });
    return NextResponse.json({ success: true, job: { ...job.toObject(), id: String(job._id) } }, { status: 201 });
  } catch (error) {
    console.error("admin jobs post error", error);
    return NextResponse.json({ error: "Could not save the job. Check the fields and database connection." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await isAdmin(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const id = cleanText(body.id, 80);
    if (!id) return NextResponse.json({ error: "Job ID is required." }, { status: 400 });
    const mongo = await connectMongo();
    if (!mongo) return NextResponse.json({ error: "Persistent database is not configured." }, { status: 503 });
    const update = body.action === "verify-publish" ? { verified: true, published: true, updatedAt: new Date() } : body.action === "unpublish" ? { published: false, updatedAt: new Date() } : null;
    if (!update) return NextResponse.json({ error: "Unsupported action." }, { status: 400 });
    const job = await Job.findByIdAndUpdate(id, { $set: update }, { new: true }).lean();
    if (!job) return NextResponse.json({ error: "Job not found." }, { status: 404 });
    return NextResponse.json({ success: true, job: { ...job, id: String(job._id) } });
  } catch (error) {
    console.error("admin jobs patch error", error);
    return NextResponse.json({ error: "Could not update the job." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdmin(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const id = cleanText(body.id, 80);
    if (!id) return NextResponse.json({ error: "Job ID is required." }, { status: 400 });
    const mongo = await connectMongo();
    if (!mongo) return NextResponse.json({ error: "Persistent database is not configured." }, { status: 503 });
    await Job.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("admin jobs delete error", error);
    return NextResponse.json({ error: "Could not delete the job." }, { status: 500 });
  }
}
