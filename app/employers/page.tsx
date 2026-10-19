import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, ClipboardList, Search, UserCheck, Rocket } from "lucide-react";
import EnquiryForm, { type EnquiryField } from "../../components/wf/EnquiryForm";
import { SERVICES } from "../../lib/site";

export const metadata: Metadata = {
  title: "Hire Talent: Post a Requirement",
  description: "Post a hiring requirement: recruitment, industrial and contract staffing, engineering hiring, security, housekeeping and campus hiring across India.",
  alternates: { canonical: "/employers" },
};

const fields: EnquiryField[] = [
  { name: "company", label: "Company name", required: true },
  { name: "name", label: "Contact person", required: true },
  { name: "phone", label: "Mobile number", type: "tel", required: true },
  { name: "email", label: "Work email", type: "email", required: true },
  { name: "role", label: "Role(s) to hire", required: true, placeholder: "e.g. CNC operator, security guard" },
  { name: "headcount", label: "Number of people", type: "number", required: true },
  { name: "location", label: "Work location / city", required: true },
  { name: "level", label: "Skill level", type: "select", options: ["Skilled", "Semi-skilled", "Non-skilled / helper", "Fresher / trainee", "Mixed"] },
  { name: "hiretype", label: "Hiring type", type: "select", options: ["Permanent", "Contract / third-party payroll", "Temporary / seasonal", "Not sure yet"] },
  { name: "timeline", label: "Needed by", type: "select", options: ["Immediately", "Within 2 weeks", "Within a month", "Planning ahead"] },
  { name: "details", label: "Shift, pay range and other details", type: "textarea", full: true, placeholder: "Shift pattern, pay range, qualification, experience, any special requirement" },
];

export default function EmployersPage() {
  return (
    <main id="main">
      <section className="wf-page-hero">
        <div className="wf-shell">
          <nav className="wf-crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link>/<span>Hire talent</span></nav>
          <span className="wf-eyebrow">For employers</span>
          <h1>Hire the right people, <em>skilled or entry-level.</em></h1>
          <p className="wf-lead">Share your requirement and we source, screen and coordinate hiring for plants, warehouses, offices, sites and campuses, from helpers and guards to engineers and trainees.</p>
          <div style={{ marginTop: 24 }}><a href="#requirement" className="wf-btn wf-btn-primary">Post a requirement <ArrowRight size={16} /></a></div>
        </div>
      </section>

      <section className="wf-section">
        <div className="wf-shell">
          <div className="wf-head" data-reveal=""><div><span className="wf-eyebrow">What we hire for</span><h2 className="wf-h2">Services for <em>every workforce need.</em></h2></div></div>
          <div className="wf-svc-grid">
            {SERVICES.map((s, i) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="wf-svc" data-reveal="" style={{ ["--d" as string]: `${(i % 4) * 0.06}s` }}>
                <div className="wf-svc-body" style={{ padding: 24 }}><h3>{s.title}</h3><p>{s.text}</p><span className="wf-link">Learn more <ArrowRight size={15} /></span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="wf-section dark">
        <div className="wf-shell">
          <div className="wf-head" data-reveal=""><div><span className="wf-eyebrow light">Our process</span><h2 className="wf-h2">From requirement to <em>joining.</em></h2></div></div>
          <div className="wf-svc-grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}>
            {[[ClipboardList, "1. Requirement", "You share roles, headcount, location, shift and pay range."], [Search, "2. Source & screen", "We shortlist candidates against the agreed criteria."], [UserCheck, "3. Interview & select", "We coordinate interviews, offers and documentation."], [Rocket, "4. Join & support", "Joining follow-up and replacement process as agreed."]].map(([Icon, t, d], i) => {
              const I = Icon as typeof ClipboardList;
              return <div key={t as string} className="wf-steps" data-reveal="" style={{ ["--d" as string]: `${i * 0.08}s`, padding: 24 }}><I size={26} color="#79b7c7" /><h3 style={{ margin: "14px 0 8px", fontSize: 19 }}>{t as string}</h3><span>{d as string}</span></div>;
            })}
          </div>
        </div>
      </section>

      <section className="wf-section alt" id="requirement">
        <div className="wf-shell wf-form-wrap">
          <div className="wf-side" data-reveal="left">
            <span className="wf-eyebrow">Post a requirement</span>
            <h2 className="wf-h2">Tell us what you <em>need.</em></h2>
            <p className="wf-lead">The more specific the brief, the faster we can shortlist. Commercial terms, screening scope and statutory responsibilities are agreed in writing for each engagement.</p>
            <ul className="wf-checks">{["Skilled, semi-skilled and non-skilled hiring", "Contract workforce and permanent hiring", "Multi-location and bulk requirements", "Campus and fresher hiring"].map((x) => <li key={x}><Check size={18} />{x}</li>)}</ul>
          </div>
          <div className="wf-form-card" data-reveal="right"><h3>Hiring requirement</h3><p style={{ margin: 0, color: "var(--wf-body)" }}>Fields marked * are required.</p>
            <div style={{ marginTop: 18 }}><EnquiryForm fields={fields} type="Employer Requirement" source="Employers Page" subject="Hiring requirement" button="Submit requirement" success="Thank you. Our team will review the requirement and contact you shortly." /></div>
          </div>
        </div>
      </section>
    </main>
  );
}
