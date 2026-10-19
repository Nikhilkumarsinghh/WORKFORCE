"use client";
import { useRef, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export type EnquiryField = { name: string; label: string; type?: "text" | "email" | "tel" | "number" | "select" | "textarea" | "date"; options?: string[]; required?: boolean; full?: boolean; placeholder?: string };

/** Posts to /api/contact. Used for employer requirements, college partnerships and campus hiring. */
export default function EnquiryForm({ fields, type, source, subject, button, success }: { fields: EnquiryField[]; type: string; source: string; subject: string; button: string; success: string }) {
  const [v, setV] = useState<Record<string, string>>({});
  const [err, setErr] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const hp = useRef<HTMLInputElement>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const x: Record<string, string> = {};
    for (const f of fields) {
      const val = (v[f.name] || "").trim();
      if (f.required && !val) x[f.name] = "Required";
      if (f.type === "email" && val && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val)) x[f.name] = "Enter a valid email";
      if (f.type === "tel" && val && !/^(\+?91)?[6-9]\d{9}$/.test(val.replace(/\s|-/g, ""))) x[f.name] = "Enter a valid 10-digit mobile number";
    }
    setErr(x);
    if (Object.keys(x).length) return;
    setBusy(true);
    const details = fields.filter((f) => !["name", "email", "phone", "company"].includes(f.name) && v[f.name]).map((f) => `${f.label}: ${v[f.name]}`).join("\n");
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
        name: v.name || "", email: v.email || "", phone: (v.phone || "").replace(/\D/g, "").slice(-10), company: v.company || "",
        subject, message: details || "No additional details", type, source, website: hp.current?.value || "",
      }) });
      const d = await r.json().catch(() => ({}));
      if (r.ok) setDone(true); else setErr({ _form: d.error || "Could not submit. Please try again." });
    } catch { setErr({ _form: "Network error. Please try again." }); }
    setBusy(false);
  }

  if (done) return <div className="wf-success" role="status"><span className="wf-ok"><CheckCircle2 size={34} /></span><h3>Request received</h3><p style={{ maxWidth: 420, color: "var(--wf-body)" }}>{success}</p></div>;

  return (
    <form onSubmit={submit} noValidate>
      <input ref={hp} className="contact-honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="wf-form-grid">
        {fields.map((f) => (
          <div key={f.name} className={`wf-field ${f.full ? "full" : ""} ${err[f.name] ? "err" : ""}`}>
            <label htmlFor={`${source}-${f.name}`}>{f.label}{f.required ? " *" : ""}</label>
            {f.type === "select" ? (
              <select id={`${source}-${f.name}`} value={v[f.name] || ""} onChange={(e) => setV({ ...v, [f.name]: e.target.value })}><option value="">Select</option>{f.options?.map((o) => <option key={o}>{o}</option>)}</select>
            ) : f.type === "textarea" ? (
              <textarea id={`${source}-${f.name}`} placeholder={f.placeholder} value={v[f.name] || ""} onChange={(e) => setV({ ...v, [f.name]: e.target.value })} />
            ) : (
              <input id={`${source}-${f.name}`} type={f.type === "tel" ? "tel" : f.type || "text"} inputMode={f.type === "tel" || f.type === "number" ? "numeric" : undefined} placeholder={f.placeholder} value={v[f.name] || ""} onChange={(e) => setV({ ...v, [f.name]: e.target.value })} />
            )}
            {err[f.name] && <span className="wf-err" role="alert">{err[f.name]}</span>}
          </div>
        ))}
      </div>
      {err._form && <p className="wf-err" role="alert" style={{ marginTop: 14 }}>{err._form}</p>}
      <button className="wf-btn wf-btn-primary" style={{ marginTop: 22, width: "100%" }} disabled={busy}>{busy ? "Sending…" : button} <ArrowRight size={17} /></button>
    </form>
  );
}
