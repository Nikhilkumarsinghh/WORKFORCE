import { NextRequest, NextResponse } from "next/server";
import { createCredentialsUser, setSession } from "../../../../lib/auth";
import { isEmail, cleanText } from "../../../../lib/security";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    const safeName = cleanText(name, 120);
    const safeEmail = cleanText(email, 160).toLowerCase();
    if (safeName.length < 2 || !isEmail(safeEmail) || String(password || "").length < 8) {
      return NextResponse.json({ error: "Enter a valid name, email and password of at least 8 characters." }, { status: 400 });
    }
    const user = await createCredentialsUser(safeName, safeEmail, String(password));
    await setSession(user);
    return NextResponse.json({ ok: true, user: { name: user.name, email: user.email, image: user.image || null } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create account.";
    return NextResponse.json({ error: message }, { status: message.includes("already exists") ? 409 : 500 });
  }
}
