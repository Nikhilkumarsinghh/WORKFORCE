"use client";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";

const TRACKS = [
  { id: "skilled", label: "Skilled", hint: "Experienced engineer, technician or specialist" },
  { id: "non-skilled", label: "Semi-skilled / Non-skilled", hint: "Helper, operator, guard, housekeeping, retail" },
  { id: "fresher", label: "Fresher / Student", hint: "Graduate, diploma, ITI or final-year student" },
] as const;
type TrackId = (typeof TRACKS)[number]["id"];
const EDU = ["Below 10th", "10th pass", "12th pass", "ITI", "Diploma", "Graduate (BA/BCom/BSc/BBA)", "Engineering (BE/BTech)", "Post graduate / MBA", "Other"];
const EXP = ["Fresher", "0–2 years", "2–5 years", "5+ years"];
const ROLES = ["Production / machine operator", "Warehouse & logistics", "Security guard / supervisor", "Housekeeping & facility", "Fitter / welder / electrician", "CNC / VMC operator", "Quality / maintenance", "Mechanical / electrical engineer", "IT / technical support", "Customer support / BPO", "Sales / retail", "Driver / delivery", "Office / data entry", "Any suitable role"];

type F = { name: string; phone: string; email: string; city: string; education: string; experience: string; role: string; skills: string; relocate: boolean; consent: boolean };
const empty: F = { name: "", phone: "", email: "", city: "", education: "", experience: "", role: "", skills: "", relocate: false, consent: false };

export default function CandidateForm({ defaultTrack }: { defaultTrack?: TrackId }) {
  const [track, setTrack] = useState<TrackId>(defaultTrack ?? "non-skilled");
  const [f, setF] = useState<F>(empty);
  const [err, setErr] = useState<Partial<Record<keyof F | "form", string>>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const hp = useRef<HTMLInputElement>(null);
  const file = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("track");
    if (t && TRACKS.some((x) => x.id === t)) setTrack(t as TrackId);
  }, []);

  const set = <K extends keyof F>(k: K, v: F[K]) => setF((p) => ({ ...p, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const x: typeof err = {};
    if (!f.name.trim()) x.name = "Enter your full name";
    if (!/^(\+?91)?[6-9]\d{9}$/.test(f.phone.replace(/\s|-/g, ""))) x.phone = "Enter a valid 10-digit mobile number";
    if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)) x.email = "Enter a valid email or leave it blank";
    if (!f.city.trim()) x.city = "Enter your city";
    if (!f.education) x.education = "Select your education";
    if (!f.experience) x.experience = "Select your experience";
    if (!f.consent) x.consent = "Please accept to continue";
    const fl = file.current?.files?.[0];
    if (fl && fl.size > 5 * 1024 * 1024) x.form = "Resume must be under 5 MB";
    setErr(x);
    if (Object.keys(x).length) return;

    setBusy(true);
    const label = TRACKS.find((t) => t.id === track)!.label;
    const fd = new FormData();
    fd.set("name", f.name.trim());
    fd.set("phone", f.phone.replace(/\D/g, "").slice(-10));
    fd.set("email", f.email.trim());
    fd.set("location", f.city.trim());
    fd.set("education", f.education);
    fd.set("experience", f.experience);
    fd.set("jobTitle", `Profile registration — ${label}${f.role ? ` — ${f.role}` : ""}`);
    fd.set("message", [`Track: ${label}`, f.role && `Interested in: ${f.role}`, f.skills && `Skills: ${f.skills}`, `Open to relocate: ${f.relocate ? "Yes" : "No"}`].filter(Boolean).join("\n"));
    fd.set("website", hp.current?.value || "");
    if (fl) fd.set("resume", fl);
    try {
      const r = await fetch("/api/apply", { method: "POST", body: fd });
      const d = await r.json().catch(() => ({}));
      if (r.ok) setDone(true); else setErr({ form: d.error || "Could not submit. Please try again." });
    } catch { setErr({ form: "Network error. Please try again." }); }
    setBusy(false);
  }

  if (done) return (
    <div className="wf-success" role="status">
      <span className="wf-ok"><CheckCircle2 size={34} /></span>
      <h3>Profile received. Thank you!</h3>
      <p style={{ maxWidth: 420, color: "var(--wf-body)" }}>Our team will review it and contact you on your mobile number if a suitable requirement matches. This is not a job offer or a guarantee of employment. Never pay anyone for a job.</p>
    </div>
  );

  const Field = ({ k, label, children, full }: { k: keyof F; label: string; children: React.ReactNode; full?: boolean }) => (
    <div className={`wf-field ${full ? "full" : ""} ${err[k] ? "err" : ""}`}><label htmlFor={`cf-${k}`}>{label}</label>{children}{err[k] && <span className="wf-err" role="alert">{err[k]}</span>}</div>
  );

  return (
    <form onSubmit={submit} noValidate>
      <input ref={hp} className="contact-honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <fieldset className="wf-field" style={{ border: 0, padding: 0, margin: 0 }}>
        <legend>I am a…</legend>
        <div className="wf-seg">{TRACKS.map((t) => (
          <label key={t.id}><input type="radio" name="track" value={t.id} checked={track === t.id} onChange={() => setTrack(t.id)} /><strong>{t.label}</strong><small>{t.hint}</small></label>
        ))}</div>
      </fieldset>
      <div className="wf-form-grid">
        <Field k="name" label="Full name *"><input id="cf-name" autoComplete="name" value={f.name} onChange={(e) => set("name", e.target.value)} /></Field>
        <Field k="phone" label="Mobile number *"><input id="cf-phone" inputMode="numeric" autoComplete="tel-national" placeholder="10-digit number" value={f.phone} onChange={(e) => set("phone", e.target.value.replace(/[^\d+\s-]/g, "").slice(0, 14))} /></Field>
        <Field k="city" label="City you want to work in *"><input id="cf-city" autoComplete="address-level2" value={f.city} onChange={(e) => set("city", e.target.value)} /></Field>
        <Field k="email" label="Email (optional)"><input id="cf-email" type="email" autoComplete="email" value={f.email} onChange={(e) => set("email", e.target.value)} /></Field>
        <Field k="education" label="Education *"><select id="cf-education" value={f.education} onChange={(e) => set("education", e.target.value)}><option value="">Select</option>{EDU.map((x) => <option key={x}>{x}</option>)}</select></Field>
        <Field k="experience" label="Experience *"><select id="cf-experience" value={f.experience} onChange={(e) => set("experience", e.target.value)}><option value="">Select</option>{EXP.map((x) => <option key={x}>{x}</option>)}</select></Field>
        <Field k="role" label="Type of work you want"><select id="cf-role" value={f.role} onChange={(e) => set("role", e.target.value)}><option value="">Select</option>{ROLES.map((x) => <option key={x}>{x}</option>)}</select></Field>
        <div className="wf-field"><label htmlFor="cf-resume">Resume (optional)</label><input id="cf-resume" ref={file} type="file" accept=".pdf,.doc,.docx" /><span className="wf-hint">PDF or Word, up to 5 MB. Not required.</span></div>
        <Field k="skills" label="Skills, trade or machines you know (optional)" full><textarea id="cf-skills" value={f.skills} onChange={(e) => set("skills", e.target.value)} placeholder="e.g. lathe, MIG welding, forklift, typing, Tally, customer calls" /></Field>
        <label className="wf-consent full" style={{ gridColumn: "1/-1" }}><input type="checkbox" checked={f.relocate} onChange={(e) => set("relocate", e.target.checked)} />I can relocate or work in shifts if needed.</label>
        <div className={`wf-field full ${err.consent ? "err" : ""}`}>
          <label className="wf-consent"><input type="checkbox" checked={f.consent} onChange={(e) => set("consent", e.target.checked)} />I agree to UniqueToo storing my details to contact me about suitable jobs, as per the Privacy Policy. *</label>
          {err.consent && <span className="wf-err" role="alert">{err.consent}</span>}
        </div>
      </div>
      {err.form && <p className="wf-err" role="alert" style={{ marginTop: 14 }}>{err.form}</p>}
      <button className="wf-btn wf-btn-primary" style={{ marginTop: 22, width: "100%" }} disabled={busy}>{busy ? "Submitting…" : "Submit my profile"} <ArrowRight size={17} /></button>
    </form>
  );
}
