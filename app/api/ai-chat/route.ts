import { NextRequest, NextResponse } from "next/server";
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const DIR = join(process.cwd(), "data");
const FILE = join(DIR, "ai-leads.json");

const SYSTEM_PROMPT = `You are the UniqueToo Assistant, the chat assistant on uniquetoo.in.
UniqueToo is an Indian workforce company: recruitment, industrial and contract staffing, engineering hiring, blue-collar and frontline hiring, security and facility staffing, payroll and workforce management, and campus placement with colleges, ITIs and polytechnics.

Your job:
- Answer questions about these services clearly and briefly.
- Employers: collect location, role/skill, quantity needed, shift and timeline, then say you will pass it to the team and ask for name and phone/email.
- Candidates: UniqueToo works with skilled, semi-skilled and entry-level candidates (10th/12th pass, ITI, diploma, graduates, freshers). Point them to /candidates to register a profile and /jobs for listed roles. Never promise a job, a salary or a joining date.
- Colleges: point them to /campus-hiring for campus placement partnerships.
- Warn candidates never to pay money or share OTPs/bank details for a job; report suspicious requests to contact@uniquetoo.in.
- Keep replies short (2-5 sentences), friendly and professional. Reply in the same language/style the user writes in (English, Hindi, or Hinglish).
- Never invent prices, guarantees or timelines you don't know; direct the person to the Contact page or offer to log their requirement for a callback.
- If asked something unrelated to UniqueToo, answer briefly and steer back to how UniqueToo can help.`;

// Simple rule-based fallback used only if ANTHROPIC_API_KEY is not configured,
// so the widget still works (in a limited way) before the API key is set up.
function fallbackReply(message: string): string {
  const m = message.toLowerCase();
  if (/job|naukri|vacancy|work|register|resume|cv|fresher|iti|diploma|10th|12th|नौकरी|काम/.test(m)) {
    return "You can register your profile for skilled, semi-skilled or entry-level roles at /candidates, or check listed roles at /jobs. We can't promise a job, but our team reviews every profile.";
  }
  if (/college|campus|placement|student|tpo/.test(m)) {
    return "Colleges, ITIs and polytechnics can partner with us for employer drives at /campus-hiring. Share your institute details and the team will follow up.";
  }
  if (/staff|worker|manpower|hire|recruit|security|housekeeping/.test(m)) {
    return "I can help log a workforce requirement. Could you share the location, role/skill needed, how many people, shift and your timeline? You can also submit it on /employers or /contact.";
  }
  return "Thanks for reaching out! I can help with hiring requirements, candidate registration or campus placement. What are you looking for?";
}

function saveLead(entry: Record<string, unknown>) {
  try {
    if (!existsSync(DIR)) mkdirSync(DIR, { recursive: true });
    const existing = existsSync(FILE) ? JSON.parse(readFileSync(FILE, "utf-8")) : [];
    existing.push(entry);
    writeFileSync(FILE, JSON.stringify(existing, null, 2));
  } catch (e) {
    console.error("ai-chat lead save failed", e);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "messages array required" }, { status: 400 });
    }

    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
    const apiKey = process.env.ANTHROPIC_API_KEY;
    const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-5";

    if (!apiKey) {
      const reply = fallbackReply(String(lastUserMessage));
      saveLead({ id: Date.now(), source: "ai-chat-fallback", message: lastUserMessage, submittedAt: new Date().toISOString() });
      return NextResponse.json({ reply, mode: "fallback" });
    }

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: m.content,
        })),
      }),
    });

    if (!res.ok) {
      const reply = fallbackReply(String(lastUserMessage));
      return NextResponse.json({ reply, mode: "fallback-error" });
    }

    const data = await res.json();
    const reply = data?.content?.find((c: { type: string }) => c.type === "text")?.text
      ?? fallbackReply(String(lastUserMessage));

    saveLead({ id: Date.now(), source: "ai-chat", message: lastUserMessage, reply, submittedAt: new Date().toISOString() });

    return NextResponse.json({ reply, mode: "ai" });
  } catch (e) {
    console.error("ai-chat error", e);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
