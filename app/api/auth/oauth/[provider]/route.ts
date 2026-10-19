import { NextRequest, NextResponse } from "next/server";
import { createOAuthState, setOAuthState } from "../../../../../lib/auth";

export async function GET(req: NextRequest, { params }: { params: Promise<{ provider: string }> }) {
  const { provider } = await params;
  const base = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;
  const state = createOAuthState();
  await setOAuthState(state);
  const callback = `${base}/api/auth/oauth/${provider}/callback`;
  if (provider === "google") {
    if (!process.env.GOOGLE_CLIENT_ID) return NextResponse.redirect(new URL("/login?error=google_not_configured", base));
    const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    url.searchParams.set("client_id", process.env.GOOGLE_CLIENT_ID); url.searchParams.set("redirect_uri", callback); url.searchParams.set("response_type", "code"); url.searchParams.set("scope", "openid email profile"); url.searchParams.set("state", state); url.searchParams.set("access_type", "online");
    return NextResponse.redirect(url);
  }
  if (provider === "facebook") {
    if (!process.env.FACEBOOK_CLIENT_ID) return NextResponse.redirect(new URL("/login?error=facebook_not_configured", base));
    const version = process.env.FACEBOOK_GRAPH_VERSION || "v23.0";
    const url = new URL(`https://www.facebook.com/${version}/dialog/oauth`);
    url.searchParams.set("client_id", process.env.FACEBOOK_CLIENT_ID); url.searchParams.set("redirect_uri", callback); url.searchParams.set("response_type", "code"); url.searchParams.set("scope", "email,public_profile"); url.searchParams.set("state", state);
    return NextResponse.redirect(url);
  }
  return NextResponse.redirect(new URL("/login?error=provider_not_supported", base));
}
