import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import EnquiryForm, { type EnquiryField } from "../../components/wf/EnquiryForm";
import { CtaBand, PageHero } from "../../components/wf/blocks";

export const metadata: Metadata = {
  title: "Join Our Team: Careers at UniqueToo",
  description: "Work with UniqueToo: recruiters, operations coordinators, campus and business development roles in Pune. Share your interest and our team will be in touch.",
  alternates: { canonical: "/join-us" },
};

const fields: EnquiryField[] = [
  { name: "name", label: "Full name", required: true }, { name: "phone", label: "Mobile number", type: "tel", required: true },
  { name: "email", label: "Email", type: "email", required: true }, { name: "area", label: "Area of interest", type: "select", options: ["Recruitment", "Operations / deployment", "Campus and college relations", "Business development", "Finance and payroll", "Other"] },
  { name: "experience", label: "Experience", type: "select", options: ["Fresher", "0–2 years", "2–5 years", "5+ years"] }, { name: "city", label: "Current city" },
  { name: "about", label: "About you (optional)", type: "textarea", full: true },
];

export default function JoinUs() {
  return (
    <main id="main">
      <PageHero crumbs={[["Who we are", "/about"], ["Join our team"]]} eyebrow="Careers at UniqueToo" title={<>Help people find <em>work that works.</em></>} text="We are building a workforce company that is fair to candidates and dependable for employers. If that sounds like your kind of work, tell us about yourself." />
      <section className="wf-section"><div className="wf-shell wf-form-wrap">
        <div className="wf-side" data-reveal="left"><span className="wf-eyebrow">Roles we hire for</span><h2 className="wf-h2">Teams that <em>keep us moving.</em></h2>
          <div className="wf-pills">{["Recruiters", "Operations coordinators", "Campus relations", "Business development", "Payroll & compliance"].map((x) => <span key={x}>{x}</span>)}</div>
          <p className="wf-lead">Looking for a job through UniqueToo rather than at UniqueToo? <Link href="/candidates#register" className="wf-link">Register as a candidate <ArrowRight size={15} /></Link></p></div>
        <div className="wf-form-card" data-reveal="right"><h3>Express your interest</h3><div style={{ marginTop: 18 }}><EnquiryForm fields={fields} type="Careers at UniqueToo" source="Join Us Page" subject="Interest in working at UniqueToo" button="Submit interest" success="Thank you. Our team will review your details and get in touch if there is a suitable opening." /></div></div>
      </div></section>
      <CtaBand title="Not ready to apply?" text="Read how we work and what we stand for." primary={["Vision & values", "/about/vision"]} secondary={["About us", "/about"]} />
    </main>
  );
}
