import { NextRequest, NextResponse } from "next/server";
import { authenticateCredentials, setSession } from "../../../../lib/auth";
import { isEmail, cleanText } from "../../../../lib/security";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const safeEmail = cleanText(email, 160).toLowerCase();
    if (!isEmail(safeEmail) || !String(password || "")) return NextResponse.json({ error: "Enter your email and password." }, { status: 400 });
    const user = await authenticateCredentials(safeEmail, String(password));
    if (!user) return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    await setSession(user);
    return NextResponse.json({ ok: true, user: { name: user.name, email: user.email, image: user.image || null } });
  } catch {
    return NextResponse.json({ error: "Authentication service is not configured yet." }, { status: 503 });
  }
}
