import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, Handshake, HeartHandshake, Scale, Target, Users } from "lucide-react";
import { CtaBand, PageHero } from "../../../components/wf/blocks";

export const metadata: Metadata = {
  title: "Vision, Mission & Values",
  description: "UniqueToo's vision, mission and values: opening work to people of every skill level and giving employers hiring they can trust.",
  alternates: { canonical: "/about/vision" },
};

const values = [
  [HeartHandshake, "People first", "Every candidate is a person with a family and a future, treated with respect and clear communication."],
  [Scale, "Integrity", "No fees from candidates. No promises we can't keep. Written scope for every engagement."],
  [Target, "Accountability", "A named coordinator, honest reporting and ownership of outcomes we commit to."],
  [Users, "Inclusion", "Pathways for skilled, semi-skilled and non-skilled candidates, freshers and experienced workers alike."],
  [Handshake, "Partnership", "We work as an extension of your team, not a vendor that disappears after joining."],
  [Compass, "Continuous improvement", "We review, learn and adjust: every placement teaches us something."],
] as const;

export default function VisionPage() {
  return (
    <main id="main">
      <PageHero crumbs={[["About", "/about"], ["Vision"]]} eyebrow="Vision, mission & values" title={<>Work for everyone. <em>Hiring you can trust.</em></>} text="What we are building, why it matters and the principles we hold ourselves to." />
      <section className="wf-section"><div className="wf-shell"><div className="wf-two">
        <div className="wf-steps" data-reveal="left" style={{ padding: 36 }}><span className="wf-eyebrow">Vision</span><h2 className="wf-h3" style={{ marginTop: 14 }}>To be the most trusted workforce partner in India, opening work to every skill level.</h2><p style={{ color: "var(--wf-body)", lineHeight: 1.75, margin: 0 }}>A future where a helper, a technician and an engineer can all find dignified work through a process that is transparent, fair and free for the candidate.</p></div>
        <div className="wf-steps" data-reveal="right" style={{ padding: 36 }}><span className="wf-eyebrow">Mission</span><h2 className="wf-h3" style={{ marginTop: 14 }}>To match people and employers through honest, well-run hiring and deployment.</h2><p style={{ color: "var(--wf-body)", lineHeight: 1.75, margin: 0 }}>We understand the role, screen with care, communicate clearly and support joining, so employers get dependable teams and candidates get fair opportunities.</p></div>
      </div></div></section>
      <section className="wf-section alt"><div className="wf-shell">
        <div className="wf-head" data-reveal=""><div><span className="wf-eyebrow">Our values</span><h2 className="wf-h2">Six principles <em>we work by.</em></h2></div></div>
        <div className="wf-grid3">{values.map(([I, t, d], i) => <div key={t} className="wf-tile" data-reveal="" style={{ ["--d" as string]: `${(i % 3) * 0.07}s` }}><I size={28} color="#176b87" /><h3>{t}</h3><p>{d}</p></div>)}</div>
      </div></section>
      <section className="wf-section"><div className="wf-shell"><div className="wf-cta" data-reveal="zoom"><div><h2>See how we put this into practice.</h2><p>Read about our standards on trust and compliance.</p></div><div className="wf-cta-actions"><Link href="/trust" className="wf-btn wf-btn-light">Trust &amp; compliance <ArrowRight size={16} /></Link><Link href="/about" className="wf-btn wf-btn-outline-light">About UniqueToo</Link></div></div></div></section>
      <CtaBand title="Work with a partner that shares your standards." text="Tell us what you need." primary={["Contact us", "/contact"]} />
    </main>
  );
}
