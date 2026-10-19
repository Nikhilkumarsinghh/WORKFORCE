import type { Metadata } from "next";
import { Faq, CtaBand, PageHero, faqLd } from "../../components/wf/blocks";

export const metadata: Metadata = { title: "Frequently Asked Questions", description: "Answers for employers, candidates, colleges and students: hiring process, registration, campus placement, fees, scams and compliance.", alternates: { canonical: "/faq" } };

const groups: { title: string; items: [string, string][] }[] = [
  { title: "For candidates", items: [
    ["Do you hire only skilled candidates?", "No. We work with skilled, semi-skilled and entry-level candidates including 10th and 12th pass, ITI, diploma, graduates, engineers and freshers."],
    ["How do I register?", "Use the registration form on the candidates page. Name, mobile, city, education and experience are required. Resume and email are optional."],
    ["Do I have to pay anything?", "No. Never pay anyone for registration, interview or a job. Report any request for money to contact@uniquetoo.in."],
    ["Will I definitely get a job?", "No. Registration places you in consideration for matching requirements; employers make the final decision."],
    ["How long until someone contacts me?", "It depends on whether a matching requirement is open. If your profile matches, the team calls the mobile number you provide."],
  ] },
  { title: "For employers", items: [
    ["What kinds of roles can you hire for?", "Skilled, semi-skilled and non-skilled roles in manufacturing, logistics, warehouse, construction, automotive, healthcare, hospitality, retail, support and more."],
    ["Do you work with small requirements?", "Yes. A single role is as welcome as a bulk or multi-location requirement."],
    ["Who handles statutory compliance?", "Responsibilities are defined in writing for each engagement; we do not leave this vague."],
    ["How are commercials decided?", "After understanding scope: roles, headcount, duration, location and compliance. We share them in writing."],
    ["Do you offer replacements?", "A replacement process for early exits is agreed in the engagement terms."],
  ] },
  { title: "Campus placement", items: [
    ["How can a college partner with you?", "Submit your details through the college form on the campus placement page; the team will follow up."],
    ["Do you guarantee placements?", "No. Placement depends on employer demand and student performance."],
    ["Do students pay?", "No student should pay for placement."],
  ] },
];

export default function FaqPage() {
  const all = groups.flatMap((g) => g.items);
  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(all)) }} />
      <PageHero crumbs={[["FAQ"]]} eyebrow="FAQ" title={<>Questions, <em>answered.</em></>} text="Straight answers for candidates, employers and colleges." />
      <section className="wf-section"><div className="wf-shell" style={{ maxWidth: 940 }}>
        {groups.map((g) => <div key={g.title} style={{ marginBottom: 48 }}><h2 className="wf-h3" data-reveal="">{g.title}</h2><Faq items={g.items} /></div>)}
      </div></section>
      <CtaBand title="Still have a question?" text="Ask us directly." primary={["Contact us", "/contact"]} />
    </main>
  );
}
