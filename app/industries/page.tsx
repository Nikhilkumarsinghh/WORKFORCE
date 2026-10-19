import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { INDUSTRIES } from "../../lib/content/industries";
import { CtaBand, PageHero } from "../../components/wf/blocks";

export const metadata: Metadata = {
  title: "Industries We Serve: 12 Sectors",
  description: "UniqueToo supports hiring and staffing in 12 industries: manufacturing, logistics, warehouse, construction, automotive, healthcare, hospitality, retail, IT and BPO, engineering, agri and education.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <main id="main">
      <PageHero crumbs={[["Industries"]]} eyebrow="Industries" title={<>Hiring across <em>12 industries.</em></>} text="From plants and warehouses to hospitals, campuses and stores, we match people to the realities of each industry." />
      <section className="wf-section"><div className="wf-shell"><div className="wf-svc-grid" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
        {INDUSTRIES.map((i, n) => (
          <Link key={i.slug} href={`/industries/${i.slug}`} className="wf-svc" data-reveal="" style={{ ["--d" as string]: `${(n % 4) * 0.06}s` }}>
            <div className="wf-svc-img"><Image src={i.image} alt={i.title} fill sizes="(max-width:600px) 100vw,(max-width:1100px) 50vw,25vw" loading={n < 4 ? "eager" : "lazy"} /></div>
            <div className="wf-svc-body"><h3>{i.title}</h3><p>{i.short}</p><span className="wf-link">Explore <ArrowRight size={15} /></span></div>
          </Link>
        ))}
      </div></div></section>
      <CtaBand title="Don't see your industry?" text="Tell us about your workforce and we'll tell you honestly whether we can help." primary={["Contact us", "/contact"]} secondary={["Post a requirement", "/employers#requirement"]} />
    </main>
  );
}
