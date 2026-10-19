import { NextRequest, NextResponse } from "next/server";
import { consumeOAuthState, findOrCreateOAuthUser, setSession } from "../../../../../../lib/auth";

async function tokenRequest(url: string, body: URLSearchParams) {
  const response = await fetch(url, { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body, cache: "no-store" });
  if (!response.ok) throw new Error("OAuth token exchange failed");
  return response.json();
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ provider: string }> }) {
  const { provider } = await params;
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state") || "";
  const base = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;
  if (!code || !(await consumeOAuthState(state))) return NextResponse.redirect(new URL("/login?error=oauth_state", base));
  try {
    const callback = `${base}/api/auth/oauth/${provider}/callback`;
    let profile: { id: string; email: string; name: string; image?: string };
    if (provider === "google") {
      const token = await tokenRequest("https://oauth2.googleapis.com/token", new URLSearchParams({ client_id: process.env.GOOGLE_CLIENT_ID || "", client_secret: process.env.GOOGLE_CLIENT_SECRET || "", code, grant_type: "authorization_code", redirect_uri: callback }));
      const user = await fetch("https://openidconnect.googleapis.com/v1/userinfo", { headers: { Authorization: `Bearer ${token.access_token}` }, cache: "no-store" }).then(r => r.json());
      if (!user.sub || !user.email) throw new Error("Google account email is unavailable");
      profile = { id: user.sub, email: user.email, name: user.name || user.email.split("@")[0], image: user.picture };
    } else if (provider === "facebook") {
      const version = process.env.FACEBOOK_GRAPH_VERSION || "v23.0";
      const token = await tokenRequest(`https://graph.facebook.com/${version}/oauth/access_token`, new URLSearchParams({ client_id: process.env.FACEBOOK_CLIENT_ID || "", client_secret: process.env.FACEBOOK_CLIENT_SECRET || "", code, redirect_uri: callback }));
      const user = await fetch(`https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${encodeURIComponent(token.access_token)}`, { cache: "no-store" }).then(r => r.json());
      if (!user.id || !user.email) throw new Error("Facebook account email is unavailable. Please allow email permission and try again.");
      profile = { id: user.id, email: user.email, name: user.name || user.email.split("@")[0], image: user.picture?.data?.url };
    } else throw new Error("Unsupported provider");
    const user = await findOrCreateOAuthUser({ provider: provider as "google" | "facebook", providerId: profile.id, email: profile.email, name: profile.name, image: profile.image });
    await setSession(user);
    return NextResponse.redirect(new URL("/account", base));
  } catch (error) {
    console.error("OAuth callback error", error);
    return NextResponse.redirect(new URL(`/login?error=${provider}_failed`, base));
  }
}
