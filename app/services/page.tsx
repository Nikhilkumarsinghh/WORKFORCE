import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "../../lib/content/services";
import { CtaBand, PageHero } from "../../components/wf/blocks";

export const metadata: Metadata = {
  title: "Workforce, Recruitment & Staffing Services",
  description: "Recruitment, industrial staffing, engineering hiring, blue-collar recruitment, security, housekeeping, payroll support and campus placement from UniqueToo.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main id="main">
      <PageHero crumbs={[["Services"]]} eyebrow="What we do" title={<>Services for every <em>workforce need.</em></>} text="Nine services under one roof: from a single hire to multi-location workforce programs, for skilled, semi-skilled and entry-level roles." actions={<><Link href="/employers#requirement" className="wf-btn wf-btn-primary">Post a requirement <ArrowRight size={16} /></Link><Link href="/roles" className="wf-btn wf-btn-ghost">Roles we hire for</Link></>} />
      <section className="wf-section"><div className="wf-shell">
        <div className="wf-svc-grid" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
          {SERVICES.map((s, i) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="wf-svc" data-reveal="" style={{ ["--d" as string]: `${(i % 3) * 0.07}s` }}>
              <div className="wf-svc-img"><Image src={s.image} alt={s.title} fill sizes="(max-width:700px) 100vw, 33vw" loading={i < 3 ? "eager" : "lazy"} /></div>
              <div className="wf-svc-body"><h3>{s.title}</h3><p>{s.short}</p><span className="wf-link">Explore service <ArrowRight size={15} /></span></div>
            </Link>
          ))}
        </div>
      </div></section>
      <section className="wf-section alt"><div className="wf-shell">
        <div className="wf-head" data-reveal=""><div><span className="wf-eyebrow">How we work</span><h2 className="wf-h2">One simple way of <em>working with us.</em></h2></div></div>
        <div className="wf-proc" data-reveal="">{[["Understand", "We study the role, site, shift and pay range."], ["Source", "We search our database, portals, campuses and local networks."], ["Screen", "Skills, eligibility and availability are checked."], ["Deliver", "Interviews, offers and joining are coordinated."], ["Support", "Follow-up, replacement and review as agreed."]].map(([t, d]) => <div key={t}><strong>{t}</strong><span>{d}</span></div>)}</div>
      </div></section>
      <CtaBand title="Tell us what you need." text="Share a requirement and our team will respond with next steps." primary={["Post a requirement", "/employers#requirement"]} secondary={["Contact us", "/contact"]} />
    </main>
  );
}
