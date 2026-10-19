"use client";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, MapPin, Search, X, Briefcase, Clock } from "lucide-react";

type Job = { id: string | number; title: string; company: string; category: string; location: string; salary: string; type: string; exp: string; urgent: boolean; qual: string; desc: string };
const LEVELS = ["All levels", "Skilled", "Semi-skilled & non-skilled", "Freshers"] as const;
type Level = (typeof LEVELS)[number];
function levelOf(j: Job): Level {
  const t = `${j.qual} ${j.exp} ${j.title}`.toLowerCase();
  if (/fresher|trainee|apprentice/.test(t)) return "Freshers";
  if (/10th|12th|helper|no experience|guard|housekeep|loader|packer|operator|warehouse|attendant/.test(t)) return "Semi-skilled & non-skilled";
  return "Skilled";
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [level, setLevel] = useState<Level>("All levels");
  const [cat, setCat] = useState("All");
  const [sel, setSel] = useState<Job | null>(null);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const hp = useRef<HTMLInputElement>(null);
  const file = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let on = true;
    fetch("/api/jobs", { cache: "no-store" }).then((r) => r.json()).then((d) => { if (on) setJobs(Array.isArray(d.jobs) ? d.jobs : []); }).catch(() => on && setJobs([])).finally(() => on && setLoading(false));
    return () => { on = false; };
  }, []);
  useEffect(() => {
    if (!sel) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.body.style.overflow = "hidden"; window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [sel]);

  const cats = useMemo(() => ["All", ...Array.from(new Set(jobs.map((j) => j.category)))], [jobs]);
  const list = jobs.filter((j) => (cat === "All" || j.category === cat) && (level === "All levels" || levelOf(j) === level) && `${j.title} ${j.company} ${j.location}`.toLowerCase().includes(q.toLowerCase()));
  const close = () => { setSel(null); setDone(false); setErr(""); };

  async function apply(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); if (!sel) return;
    const fd = new FormData(e.currentTarget);
    const phone = String(fd.get("phone") || "").replace(/\D/g, "").slice(-10);
    if (!String(fd.get("name") || "").trim() || phone.length !== 10) { setErr("Enter your name and a valid 10-digit mobile number."); return; }
    if (!String(fd.get("location") || "").trim()) { setErr("Enter the city you want to work in."); return; }
    if (!fd.get("consent")) { setErr("Please accept the consent to continue."); return; }
    fd.set("phone", phone); fd.set("jobTitle", `${sel.title} — ${sel.company}`); fd.set("jobId", String(sel.id)); fd.set("website", hp.current?.value || "");
    const f = file.current?.files?.[0]; if (f && f.size > 5 * 1024 * 1024) { setErr("Resume must be under 5 MB."); return; }
    setBusy(true); setErr("");
    try { const r = await fetch("/api/apply", { method: "POST", body: fd }); const d = await r.json().catch(() => ({})); if (r.ok) setDone(true); else setErr(d.error || "Could not submit. Please try again."); }
    catch { setErr("Network error. Please try again."); }
    setBusy(false);
  }

  return (
    <main id="main">
      <section className="wf-page-hero"><div className="wf-shell">
        <nav className="wf-crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link>/<span>Jobs</span></nav>
        <span className="wf-eyebrow">Jobs</span>
        <h1>Find work that <em>fits you.</em></h1>
        <p className="wf-lead">Employer-verified openings for skilled, semi-skilled, non-skilled and fresher candidates. Not seeing a match? Register your profile and we will contact you when a requirement fits.</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}><Link href="/candidates#register" className="wf-btn wf-btn-primary">Register your profile <ArrowRight size={16} /></Link><Link href="/roles" className="wf-btn wf-btn-ghost">Browse role guides</Link></div>
      </div></section>

      <section className="wf-section"><div className="wf-shell">
        <div className="wf-jobs-bar">
          <label className="wf-search"><Search size={18} aria-hidden="true" /><span className="sr-only" style={{ position: "absolute", left: -9999 }}>Search jobs</span><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by role, company or city" /></label>
          <select aria-label="Category" value={cat} onChange={(e) => setCat(e.target.value)} className="wf-btn wf-btn-ghost" style={{ minHeight: 52, padding: "0 18px" }}>{cats.map((c) => <option key={c}>{c}</option>)}</select>
        </div>
        <div className="wf-tabs" role="group" aria-label="Skill level">{LEVELS.map((l) => <button key={l} type="button" className="wf-tab" aria-selected={level === l} onClick={() => setLevel(l)}>{l}</button>)}</div>

        {loading ? <div className="wf-jobs-grid">{[0, 1, 2].map((i) => <div key={i} className="wf-job" style={{ minHeight: 180, background: "var(--wf-mist)" }} aria-hidden="true" />)}</div>
        : list.length === 0 ? (
          <div className="wf-empty">
            <Briefcase size={36} color="#176b87" />
            <h2 className="wf-h3" style={{ margin: 0 }}>{jobs.length ? "No openings match your filters" : "No verified openings are published right now"}</h2>
            <p style={{ color: "var(--wf-body)", maxWidth: 560, margin: 0 }}>{jobs.length ? "Try clearing the filters or search." : "We publish only employer-verified roles. Register your profile and we will contact you as soon as a matching requirement opens."}</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}><Link href="/candidates#register" className="wf-btn wf-btn-primary">Register your profile</Link><Link href="/candidates" className="wf-btn wf-btn-ghost">Candidate guides</Link></div>
          </div>
        ) : (
          <div className="wf-jobs-grid">{list.map((j) => (
            <button key={j.id} type="button" className="wf-job" onClick={() => setSel(j)}>
              <span style={{ display: "flex", gap: 8, flexWrap: "wrap" }}><span className="wf-badge">{j.category}</span>{j.urgent && <span className="wf-badge" style={{ background: "#fff0e0", color: "#b35b00" }}>Urgent</span>}</span>
              <h3>{j.title}</h3><p>{j.company}</p>
              <span style={{ display: "grid", gap: 6, color: "var(--wf-body)", fontSize: 14 }}><span><MapPin size={14} style={{ verticalAlign: -2 }} /> {j.location}</span><span><Clock size={14} style={{ verticalAlign: -2 }} /> {j.type} · {j.exp}</span><b style={{ color: "var(--wf-ink)" }}>{j.salary}</b></span>
              <span className="wf-link">View & apply <ArrowRight size={15} /></span>
            </button>
          ))}</div>
        )}
      </div></section>

      {sel && (
        <div className="wf-modal" role="dialog" aria-modal="true" aria-label={`Apply for ${sel.title}`}>
          <button className="wf-modal-bg" aria-label="Close" onClick={close} />
          <div className="wf-modal-box">
            <button type="button" onClick={close} aria-label="Close" style={{ position: "absolute", right: 14, top: 14, width: 42, height: 42, borderRadius: "50%", border: "1px solid var(--wf-line)", background: "#fff", cursor: "pointer", display: "grid", placeItems: "center" }}><X size={18} /></button>
            {done ? (
              <div className="wf-success"><span className="wf-ok"><CheckCircle2 size={34} /></span><h3>Application received</h3><p style={{ color: "var(--wf-body)", maxWidth: 380 }}>Our team will review it and contact you if you are shortlisted. Never pay anyone for a job.</p><button className="wf-btn wf-btn-primary" onClick={close}>Close</button></div>
            ) : (
              <form onSubmit={apply} noValidate>
                <span className="wf-eyebrow">{sel.category}</span>
                <h2 style={{ margin: "8px 0 4px", fontSize: 26, letterSpacing: "-.02em" }}>{sel.title}</h2>
                <p style={{ margin: 0, color: "var(--wf-body)" }}>{sel.company} · {sel.location} · {sel.salary}</p>
                <p style={{ color: "var(--wf-body)", lineHeight: 1.7, fontSize: 15 }}>{sel.desc}</p>
                <p style={{ fontSize: 13.5, color: "var(--wf-body)" }}><b>Qualification:</b> {sel.qual} · <b>Experience:</b> {sel.exp}</p>
                <input ref={hp} className="contact-honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                <div className="wf-form-grid">
                  <div className="wf-field"><label htmlFor="j-name">Full name *</label><input id="j-name" name="name" autoComplete="name" /></div>
                  <div className="wf-field"><label htmlFor="j-phone">Mobile number *</label><input id="j-phone" name="phone" inputMode="numeric" autoComplete="tel-national" /></div>
                  <div className="wf-field"><label htmlFor="j-email">Email (optional)</label><input id="j-email" name="email" type="email" autoComplete="email" /></div>
                  <div className="wf-field"><label htmlFor="j-city">City *</label><input id="j-city" name="location" defaultValue="" autoComplete="address-level2" /></div>
                  <div className="wf-field"><label htmlFor="j-exp">Experience *</label><select id="j-exp" name="experience" defaultValue="Fresher">{["Fresher", "0–2 years", "2–5 years", "5+ years"].map((x) => <option key={x}>{x}</option>)}</select></div>
                  <div className="wf-field"><label htmlFor="j-edu">Education</label><input id="j-edu" name="education" /></div>
                  <div className="wf-field full"><label htmlFor="j-res">Resume (optional)</label><input id="j-res" ref={file} name="resume" type="file" accept=".pdf,.doc,.docx" /></div>
                  <label className="wf-consent" style={{ gridColumn: "1/-1" }}><input type="checkbox" name="consent" />I agree to UniqueToo storing my details to contact me about this and other suitable jobs, as per the Privacy Policy. *</label>
                </div>
                {err && <p className="wf-err" role="alert" style={{ marginTop: 12 }}>{err}</p>}
                <button className="wf-btn wf-btn-primary" style={{ marginTop: 18, width: "100%" }} disabled={busy}>{busy ? "Submitting…" : "Apply now"} <ArrowRight size={16} /></button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
