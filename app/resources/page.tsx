import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CaseStudySection from "../../components/common/CaseStudySection";

export const metadata: Metadata = {
  title: "Guides & Resources",
  description: "Original guides from UniqueToo on hiring, staffing, workforce planning, campus placement, ITI and diploma jobs, and career preparation for candidates across India.",
};

const guides = [
  ["01", "Workforce Planning Guide", "How to translate headcount pressure into roles, skills, locations, shifts, timelines and an operating plan.", "/blog/how-manpower-staffing-works"],
  ["02", "Engineering Hiring Checklist", "A practical checklist for defining technical roles, evaluating project depth and running structured interviews.", "/blog/engineering-interview-prep"],
  ["03", "Manufacturing Workforce Readiness", "How to define machine, process and shift requirements so plant hiring and onboarding go smoothly.", "/blog/manufacturing-workforce-readiness"],
  ["04", "Campus Hiring Playbook", "How employers can plan college outreach, assessments, interviews, offer communication and joining support.", "/campus-hiring"],
  ["05", "ITI Hiring Guide", "A practical overview of trade requirements, shop-floor readiness, documentation and screening for technical roles.", "/blog/iti-jobs-maharashtra"],
  ["06", "Employer Hiring Brief", "What to prepare before sharing a requirement: roles, headcount, location, shift, pay range and joining date.", "/employers"],
  ["07", "Job Seeker Preparation", "How candidates can improve resumes, project explanations, interview preparation and job-search discipline.", "/blog/engineering-interview-prep"],
  ["08", "Multi-location Workforce Planning", "How to plan headcount, supervision and replacement cover across several sites.", "/blog/workforce-planning-for-multi-location-operations"],
  ["09", "Recruitment Process Design", "How requirement capture, sourcing, screening, interviews, documentation and onboarding fit together in a repeatable hiring workflow.", "/services/recruitment"],
];

const faqs = [
  ["What does UniqueToo do?", "UniqueToo is a workforce company: recruitment, industrial and contract staffing, engineering hiring, security and facility staffing, campus placement and workforce operations support for employers across India. Candidates can register their profile for skilled and non-skilled roles."],
  ["Can a business request a workforce requirement online?", "Yes. Employers can describe roles, headcount, location, shift and timeline through the requirement form. The request is routed to the relevant team for follow-up."],
  ["Does UniqueToo work only with large companies?", "No. A smaller business may need a focused recruitment requirement, while a larger operation may need multi-location staffing, contract workforce or campus hiring support."],
  ["Can job seekers register if they have no formal skills or experience?", "Yes. UniqueToo works with skilled, semi-skilled and entry-level candidates, including 10th and 12th pass candidates, ITI and diploma holders, graduates and freshers. Choose the closest category in the registration form."],
  ["Can job seekers apply for jobs through the website?", "Yes. Candidates can register a profile or apply to a listed role. Provide accurate qualifications, experience and contact details so the team can reach you."],
  ["How does campus placement work?", "Colleges, ITIs and polytechnics can partner with UniqueToo for employer drives. The team coordinates student shortlisting, screening, scheduling and joining follow-up against the employer's requirement."],
  ["How can I avoid job scams?", "Never pay money, share bank or card details or OTPs to anyone who promises a job. If someone asks for payment in UniqueToo's name, report it to contact@uniquetoo.in."],
  ["How should an employer prepare a hiring requirement?", "Start with the job title, responsibilities, essential skills, qualification, experience, location, shift, headcount, joining timeline and any compliance or documentation requirements. Clear inputs make screening more relevant."],
];

const glossary = [
  ["Blue-collar recruitment", "Hiring for operational, technical, trade and frontline roles such as operators, technicians, warehouse staff and skilled trades."],
  ["Campus hiring", "A structured hiring process through colleges, universities or training institutions to identify and onboard early-career talent."],
  ["Workforce management", "The planning and operational coordination of people, attendance, deployment, staffing requirements and related workforce processes."],
  ["RPO", "Recruitment Process Outsourcing, where part or all of a recruitment workflow is managed by an external recruitment partner."],
];

export default function ResourcesPage() {
  return (
    <main>
      <section className="editorial-hero">
        <div className="content-shell editorial-hero-grid">
          <div>
            <p className="eyebrow">KNOWLEDGE HUB</p>
            <h1>Useful information for <span>real decisions.</span></h1>
            <p>UniqueToo&apos;s resource hub brings together practical guides on hiring, staffing, workforce operations, campus placement and career preparation. The aim is simple: explain the problem clearly before recommending a solution.</p>
          </div>
          <div className="editorial-hero-photo"><Image src="/media/user/workforce-solutions.webp" alt="Professionals reviewing a work process together" fill priority sizes="(max-width: 900px) 100vw, 42vw" quality={88}/><div><span>GUIDES & RESOURCES</span><strong>Understand the problem before choosing a solution.</strong><small>Checklists · explainers · practical guides</small></div></div>
        </div>
      </section>

      <section className="content-section">
        <div className="content-shell">
          <div className="content-section-head"><span className="eyebrow">GUIDES</span><div><h2>Go deeper than a service page.</h2><p>Service pages explain what we do. These guides explain the underlying problem, the questions to ask, common mistakes and the practical steps involved.</p></div></div>
          <div className="guide-grid">{guides.map(([no,title,desc,href]) => <article className="guide-card" key={title}><span className="guide-no">{no}</span><h3>{title}</h3><p>{desc}</p><Link href={href}>Read the guide →</Link></article>)}</div>
        </div>
      </section>

      <section className="content-section alt">
        <div className="content-shell">
          <div className="content-section-head"><span className="eyebrow">FAQ</span><div><h2>Questions businesses and candidates ask.</h2><p>These answers provide a general starting point. Specific requirements, employment conditions, contracts and compliance obligations should be confirmed for the relevant engagement.</p></div></div>
          <div className="faq-list">{faqs.map(([q,a]) => <article className="faq-item" key={q}><h3>{q}</h3><p>{a}</p></article>)}</div>
        </div>
      </section>

      <section className="content-section">
        <div className="content-shell">
          <div className="content-section-head"><span className="eyebrow">GLOSSARY</span><div><h2>Hiring and staffing terms, explained simply.</h2><p>A shared vocabulary makes projects easier to discuss. Here are some terms frequently used across workforce, recruitment and technology conversations.</p></div></div>
          <div className="guide-grid">{glossary.map(([term,definition]) => <article className="guide-card" key={term}><span className="guide-no">TERM</span><h3>{term}</h3><p>{definition}</p></article>)}</div>
        </div>
      </section>

      <section className="resource-cta"><div className="content-shell resource-cta-grid"><div><p className="eyebrow light">READY TO APPLY THE IDEA?</p><h2>Turn the requirement into a plan.</h2><p>If you already know the problem you want to solve, tell us the context. We can route workforce, technology and business enquiries to the relevant team.</p></div><Link href="/contact" className="button primary">Start a conversation →</Link></div></section>
    
      <CaseStudySection variant="resources" />
    </main>
  );
}
