import { NextRequest, NextResponse } from "next/server";
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { sendContactEmail } from "../../../lib/email";
import { connectMongo } from "../../../lib/mongodb";
import { Lead } from "../../../lib/models/Lead";
import { cleanText, clientIp, hashIp, honeypotTriggered, isEmail, isIndianMobile, normalizeIndianMobile } from "../../../lib/security";

export const runtime = "nodejs";

const DIR = join(process.cwd(), "data");
const FILE = join(DIR, "contacts.json");
const R = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const timestamps = (R.get(ip) || []).filter((t) => now - t < 60_000);
  if (timestamps.length >= 5) return true;
  R.set(ip, [...timestamps, now]);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = clientIp(req);
    if (limited(ip)) return NextResponse.json({ error: "Too many requests. Please try again in a minute." }, { status: 429 });
    const body = await req.json();
    if (honeypotTriggered(body.website)) return NextResponse.json({ success: true, leadId: "UT-OK" });

    const name = cleanText(body.name, 120);
    const email = cleanText(body.email, 180).toLowerCase();
    const phone = normalizeIndianMobile(cleanText(body.phone, 30));
    const company = cleanText(body.company, 160);
    const subject = cleanText(body.subject, 180);
    const message = cleanText(body.message, 5000);
    const type = cleanText(body.type || "contact", 60);
    const source = cleanText(body.source || "Website", 180);

    if (!name || !email || !phone || !subject || !message) return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    if (!isIndianMobile(phone)) return NextResponse.json({ error: "Enter a valid 10-digit Indian mobile number." }, { status: 400 });
    if (!isEmail(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    if (message.length < 10) return NextResponse.json({ error: "Please describe your requirement in a little more detail." }, { status: 400 });

    const leadId = `UT-${Date.now().toString().slice(-8)}`;
    const createdAt = new Date();
    const record = { leadId, kind: type, name, email, phone, company, subject, message, source, ipHash: hashIp(ip), createdAt };

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
    } catch (e) { console.error("lead storage failed", e); }
    const emailed = await sendContactEmail({ name, email, phone, company, subject, message, type });
    if (!stored && !emailed) return NextResponse.json({ error: "We could not send your enquiry right now. Please email contact@uniquetoo.in or use WhatsApp." }, { status: 503 });
    return NextResponse.json({ success: true, leadId });
  } catch (error) {
    console.error("contact route error", error);
    return NextResponse.json({ error: "We could not save the enquiry. Please try again." }, { status: 500 });
  }
}
