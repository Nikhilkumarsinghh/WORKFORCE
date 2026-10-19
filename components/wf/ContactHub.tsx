"use client";
import { useEffect, useState } from "react";
import EnquiryForm, { type EnquiryField } from "./EnquiryForm";

const base: EnquiryField[] = [
  { name: "name", label: "Full name", required: true }, { name: "phone", label: "Mobile number", type: "tel", required: true },
  { name: "email", label: "Email", type: "email", required: true },
];
const ROUTES = [
  { id: "hire", t: "Hire workforce", d: "I need staff or a recruitment partner.", type: "Hire Workforce", subject: "Workforce requirement", fields: [...base, { name: "company", label: "Company name", required: true }, { name: "role", label: "Roles needed", required: true }, { name: "headcount", label: "Number of people", type: "number" as const }, { name: "location", label: "Location" }, { name: "message", label: "Details", type: "textarea" as const, full: true }] },
  { id: "job", t: "Job enquiry", d: "I'm looking for work or have a question about a job.", type: "Job Inquiry", subject: "Candidate enquiry", fields: [...base, { name: "city", label: "City" }, { name: "education", label: "Education" }, { name: "message", label: "How can we help?", type: "textarea" as const, full: true, required: true }] },
  { id: "college", t: "College / campus", d: "I represent a college, ITI or placement cell.", type: "College Partnership", subject: "College partnership", fields: [...base, { name: "company", label: "Institute name", required: true }, { name: "city", label: "City / state" }, { name: "message", label: "Details", type: "textarea" as const, full: true }] },
  { id: "partner", t: "Partnership", d: "I want to partner or collaborate with UniqueToo.", type: "Partnership", subject: "Partnership enquiry", fields: [...base, { name: "company", label: "Organisation" }, { name: "message", label: "Tell us more", type: "textarea" as const, full: true, required: true }] },
  { id: "media", t: "Media & other", d: "Press, feedback or something else.", type: "General", subject: "General enquiry", fields: [...base, { name: "message", label: "Your message", type: "textarea" as const, full: true, required: true }] },
];

export default function ContactHub() {
  const [id, setId] = useState("hire");
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("type");
    const map: Record<string, string> = { hire: "hire", workforce: "hire", job: "job", career: "job", campus: "college", college: "college", partnership: "partner" };
    if (t && map[t]) setId(map[t]);
  }, []);
  const r = ROUTES.find((x) => x.id === id)!;
  return (
    <div>
      <div className="wf-routes" role="group" aria-label="What's on your mind?">
        {ROUTES.map((x) => <button key={x.id} type="button" className="wf-route" aria-pressed={id === x.id} onClick={() => setId(x.id)}><strong>{x.t}</strong><span>{x.d}</span></button>)}
      </div>
      <div className="wf-form-card" style={{ marginTop: 22 }} key={r.id}>
        <h3>{r.t}</h3><p style={{ margin: 0, color: "var(--wf-body)" }}>Fields marked * are required. We reply by phone or email.</p>
        <div style={{ marginTop: 18 }}><EnquiryForm fields={r.fields} type={r.type} source={`Contact Page - ${r.t}`} subject={r.subject} button="Send message" success="Thank you. Your message has reached our team and we will get back to you shortly." /></div>
      </div>
    </div>
  );
}
