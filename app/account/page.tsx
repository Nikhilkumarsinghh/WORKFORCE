"use client";
import Link from "next/link";
import { ArrowRight, LogOut, UserRound } from "lucide-react";
import { useEffect, useState } from "react";

type User = { name: string; email: string; role: string } | null;
export default function AccountPage() {
  const [user, setUser] = useState<User>(null); const [loading, setLoading] = useState(true);
  useEffect(() => { fetch("/api/auth/me").then(r => r.json()).then(d => { setUser(d.user); setLoading(false); }).catch(() => setLoading(false)); }, []);
  async function logout() { await fetch("/api/auth/logout", { method: "POST" }); window.location.href = "/"; }
  if (loading) return <main className="account-page"><div className="account-loading">Loading account…</div></main>;
  if (!user) return <main className="account-page"><div className="account-empty"><UserRound size={28}/><h1>Your account</h1><p>Sign in to access your UniqueToo workspace.</p><Link className="button primary" href="/login">Sign in <ArrowRight size={16}/></Link></div></main>;
  return <main className="account-page"><section className="account-hero"><span className="eyebrow">MY UNIQUE TOO</span><h1>Welcome, <span>{user.name.split(" ")[0]}.</span></h1><p>Your account is ready. This workspace is designed to become the home for your enquiries, applications and service conversations.</p><div className="account-actions"><Link className="button primary" href="/contact">Start a requirement <ArrowRight size={16}/></Link><button className="button secondary" onClick={logout}><LogOut size={16}/> Sign out</button></div></section><section className="account-grid"><article><span>PROFILE</span><h2>{user.name}</h2><p>{user.email}</p></article><article><span>ACCESS</span><h2>{user.role === "admin" ? "Administrator" : "Customer account"}</h2><p>Protected by an HTTP-only session cookie.</p></article><article><span>NEXT</span><h2>Keep building</h2><p>Explore technology, workforce, AI and business solutions.</p><Link href="/solutions">Explore solutions <ArrowRight size={14}/></Link></article></section></main>;
}
