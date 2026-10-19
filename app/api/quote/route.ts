import { NextRequest, NextResponse } from "next/server";
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { sendQuoteEmail } from "../../../lib/email";
import { connectMongo } from "../../../lib/mongodb";
import { Lead } from "../../../lib/models/Lead";
import { cleanText, clientIp, hashIp, honeypotTriggered, isEmail, isIndianMobile, normalizeIndianMobile } from "../../../lib/security";

export const runtime = "nodejs";
const DIR = join(process.cwd(), "data");
const FILE = join(DIR, "quotes.json");
const R = new Map<string, number[]>();
function limited(ip: string) { const now = Date.now(); const timestamps = (R.get(ip) || []).filter((t) => now - t < 60_000); if (timestamps.length >= 5) return true; R.set(ip, [...timestamps, now]); return false; }

export async function POST(req: NextRequest) {
  try {
    const ip = clientIp(req); if (limited(ip)) return NextResponse.json({ error: "Too many requests." }, { status: 429 });
    const body = await req.json(); if (honeypotTriggered(body.website)) return NextResponse.json({ success: true });
    const name = cleanText(body.name, 120), email = cleanText(body.email, 180).toLowerCase(), phone = normalizeIndianMobile(cleanText(body.phone, 30));
    const company = cleanText(body.company, 160), workers = cleanText(body.workers, 80), message = cleanText(body.message, 5000);
    const location = cleanText(body.location, 180);
    const service = cleanText(body.service, 160), industry = cleanText(body.industry, 160);
    if (!name || !email || !phone || !workers || !message) return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    if (!isIndianMobile(phone)) return NextResponse.json({ error: "Enter a valid 10-digit Indian mobile number." }, { status: 400 });
    if (!isEmail(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    if (message.length < 10) return NextResponse.json({ error: "Please describe the requirement in more detail." }, { status: 400 });
    const leadId = `UT-REQ-${Date.now().toString().slice(-8)}`; const createdAt = new Date();
    const record = { leadId, kind: "quote", name, email, phone, company, subject: service || industry || "Workforce requirement", message: `${message}\nWorkers: ${workers}\nLocation: ${location || "Not specified"}\nService: ${service}\nIndustry: ${industry}`, source: "Quote form", ipHash: hashIp(ip), createdAt };
    let stored = false;
    try {
      const mongo = await connectMongo();
      if (mongo) { await Lead.create(record); stored = true; }
      else if (process.env.NODE_ENV !== "production") {
        if (!existsSync(DIR)) mkdirSync(DIR, { recursive: true });
        const existing = existsSync(FILE) ? JSON.parse(readFileSync(FILE, "utf-8")) : [];
        existing.push({ ...record, submittedAt: createdAt.toISOString(), status: "new" });
        writeFileSync(FILE, JSON.stringify(existing, null, 2));
        stored = true;
      }
    } catch (e) { console.error("quote storage failed", e); }
    const emailed = await sendQuoteEmail({ name, email, phone, company, workers, message: `${message}\nLocation: ${location || "Not specified"}\nWorkers: ${workers}\nService: ${service || "Not specified"}\nIndustry: ${industry || "Not specified"}`, service, industry });
    if (!stored && !emailed) return NextResponse.json({ error: "We could not send your request right now. Please email contact@uniquetoo.in." }, { status: 503 });
    return NextResponse.json({ success: true, leadId });
  } catch (error) { console.error("quote route error", error); return NextResponse.json({ error: "We could not save the request. Please try again." }, { status: 500 }); }
}
