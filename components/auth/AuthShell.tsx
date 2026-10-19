"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react";
import { FaFacebookF } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function AuthShell({ mode }: { mode: "login" | "signup" }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("error");
    if (!code) return;
    const messages: Record<string, string> = {
      google_not_configured: "Google sign-in is not configured on this environment yet.",
      facebook_not_configured: "Facebook sign-in is not configured on this environment yet.",
      google_failed: "Google sign-in could not be completed. Please try again or use email sign-in.",
      facebook_failed: "Facebook sign-in could not be completed. Please try again or use email sign-in.",
      oauth_state: "The sign-in session expired. Please try again.",
    };
    setError(messages[code] || "Social sign-in could not be completed. Please try again.");
  }, []);
  const isLogin = mode === "login";
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setError(""); setMessage("");
    try {
      const res = await fetch(`/api/auth/${isLogin ? "login" : "signup"}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to continue");
      setMessage(isLogin ? "Signed in. Opening your account…" : "Account created. Opening your account…");
      router.push("/account");
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to continue"); } finally { setBusy(false); }
  }

  return (
    <main className="auth-page">
      <section className="auth-visual">
        <div className="auth-visual-grid" />
        <span className="eyebrow light">UNIQUE TOO · ACCOUNT</span>
        <h1>{isLogin ? <>Continue the work.<br /><span>Keep everything connected.</span></> : <>Create your UniqueToo<br /><span>workspace.</span></>}</h1>
        <p>Access your enquiries, saved opportunities, applications and future business workflows from one secure account.</p>
        <div className="auth-trust"><ShieldCheck size={16} /><span>Signed session cookie · passwords are securely hashed · social providers never receive your password</span></div>
      </section>
      <section className="auth-card-wrap">
        <div className="auth-card">
          <div className="auth-card-head"><span className="eyebrow">{isLogin ? "WELCOME BACK" : "GET STARTED"}</span><h2>{isLogin ? "Sign in" : "Create account"}</h2><p>{isLogin ? "Use email, Google or Facebook." : "Create an account in less than a minute."}</p></div>
          <div className="auth-social-grid">
            <a href="/api/auth/oauth/google" className="auth-social" data-no-transition="true"><span className="google-mark">G</span> Continue with Google</a>
            <a href="/api/auth/oauth/facebook" className="auth-social" data-no-transition="true"><FaFacebookF size={15} /> Facebook</a>
          </div>
          <div className="auth-divider"><span>OR</span></div>
          <form onSubmit={submit} className="auth-form">
            {!isLogin && <label>Name<input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your full name" required minLength={2} /></label>}
            <label>Email<input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" required /></label>
            <label>Password<input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder={isLogin ? "Your password" : "At least 8 characters"} required minLength={isLogin ? 1 : 8} /></label>
            {error && <div className="auth-error">{error}</div>}{message && <div className="auth-success">{message}</div>}
            <button className="auth-submit" disabled={busy}>{busy ? "Please wait…" : isLogin ? "Sign in" : "Create account"}<ArrowRight size={16} /></button>
          </form>
          <div className="auth-links"><span>{isLogin ? "New to UniqueToo?" : "Already have an account?"}</span><Link href={isLogin ? "/signup" : "/login"}>{isLogin ? "Create an account" : "Sign in"}</Link></div>
          <div className="auth-note"><Mail size={14} /> We will only use your account email for account and service communication.</div>
        </div>
      </section>
    </main>
  );
}
