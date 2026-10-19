import { NextRequest, NextResponse } from "next/server";
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { sendApplyEmail } from "../../../lib/email";
import { connectMongo } from "../../../lib/mongodb";
import { Application } from "../../../lib/models/Application";
import { cleanText, clientIp, hashIp, honeypotTriggered, isEmail, isIndianMobile, normalizeIndianMobile } from "../../../lib/security";

export const runtime = "nodejs";
const DIR = join(process.cwd(), "data");
const FILE = join(DIR, "applications.json");
const RD = join(process.cwd(), "data", "resumes");
const R = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const timestamps = (R.get(ip) || []).filter((t) => now - t < 300_000);
  if (timestamps.length >= 3) return true;
  R.set(ip, [...timestamps, now]);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = clientIp(req);
    if (limited(ip)) return NextResponse.json({ error: "Too many applications from this connection. Please try again later." }, { status: 429 });
    const contentType = req.headers.get("content-type") || "";
    let name = "", email = "", phone = "", jobTitle = "", experience = "", location = "", education = "", message = "", jobId = "", website = "";
    let resume: File | null = null;

    if (contentType.includes("multipart/form-data")) {
      const fd = await req.formData();
      name = String(fd.get("name") || ""); email = String(fd.get("email") || ""); phone = String(fd.get("phone") || "");
      jobTitle = String(fd.get("jobTitle") || ""); experience = String(fd.get("experience") || ""); location = String(fd.get("location") || "");
      education = String(fd.get("education") || ""); message = String(fd.get("message") || ""); jobId = String(fd.get("jobId") || ""); website = String(fd.get("website") || "");
      const candidate = fd.get("resume"); resume = candidate instanceof File ? candidate : null;
    } else {
      const body = await req.json();
      name = String(body.name || ""); email = String(body.email || ""); phone = String(body.phone || ""); jobTitle = String(body.jobTitle || "");
      experience = String(body.experience || ""); location = String(body.location || body.city || ""); education = String(body.education || "");
      message = String(body.message || ""); jobId = String(body.jobId || ""); website = String(body.website || "");
    }

    if (honeypotTriggered(website)) return NextResponse.json({ success: true });
    name = cleanText(name, 120); email = cleanText(email, 180).toLowerCase(); phone = normalizeIndianMobile(cleanText(phone, 30)); jobTitle = cleanText(jobTitle, 180);
    experience = cleanText(experience, 120); location = cleanText(location, 160); education = cleanText(education, 180); message = cleanText(message, 5000); jobId = cleanText(jobId, 120);

    if (!name || !phone || !jobTitle || !experience || !location) return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    if (!isIndianMobile(phone)) return NextResponse.json({ error: "Enter a valid 10-digit Indian mobile number." }, { status: 400 });
    if (email && !isEmail(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });

    let resumeFile = "";
    if (resume && resume.size > 0) {
      const allowed = new Map([["application/pdf", ".pdf"], ["application/msword", ".doc"], ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", ".docx"]]);
      const extension = allowed.get(resume.type);
      if (!extension) return NextResponse.json({ error: "Resume must be PDF or Word format." }, { status: 400 });
      if (resume.size > 5 * 1024 * 1024) return NextResponse.json({ error: "Resume must be under 5MB." }, { status: 400 });
      try {
        if (!existsSync(RD)) mkdirSync(RD, { recursive: true });
        const safeName = resume.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-120);
        const generated = `${Date.now()}_${safeName}`;
        writeFileSync(join(RD, generated), Buffer.from(await resume.arrayBuffer()));
        resumeFile = generated;
      } catch (e) {
        // Read-only/serverless hosts cannot keep uploaded files; the profile itself is still saved.
        console.error("resume storage unavailable", e);
        resumeFile = `not-stored:${resume.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80)}`;
      }
    }

    const applicationId = `UTA-${Date.now().toString().slice(-8)}`;
    const createdAt = new Date();
    const record = { applicationId, name, email, phone, jobTitle, jobId, experience, education, location, message, resumeFile, ipHash: hashIp(ip), createdAt };
    let stored = false;
    try {
      const mongo = await connectMongo();
      if (mongo) { await Application.create(record); stored = true; }
      else if (process.env.NODE_ENV !== "production") {
        if (!existsSync(DIR)) mkdirSync(DIR, { recursive: true });
        const existing = existsSync(FILE) ? JSON.parse(readFileSync(FILE, "utf-8")) : [];
        existing.push({ ...record, submittedAt: createdAt.toISOString(), status: "new" });
        writeFileSync(FILE, JSON.stringify(existing, null, 2));
        stored = true;
      }
    } catch (e) { console.error("application storage failed", e); }
    const emailed = await sendApplyEmail({ name, email, phone, jobTitle, experience, location, education, message, resumeFile });
    if (!stored && !emailed) return NextResponse.json({ error: "We could not submit your profile right now. Please email contact@uniquetoo.in or try again shortly." }, { status: 503 });
    return NextResponse.json({ success: true, applicationId });
  } catch (error) {
    console.error("application route error", error);
    return NextResponse.json({ error: "We could not save your application. Please try again." }, { status: 500 });
  }
}
