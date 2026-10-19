import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CITIES } from "../../lib/content/cities";
import { CtaBand, PageHero } from "../../components/wf/blocks";

export const metadata: Metadata = {
  title: "Locations: Manpower & Recruitment Across India",
  description: "UniqueToo is headquartered in Pune and supports recruitment, staffing and campus placement in Maharashtra and key industrial regions across India.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  return (
    <main id="main">
      <PageHero crumbs={[["Locations"]]} eyebrow="Locations" title={<>Headquartered in Pune. <em>Hiring across India.</em></>} text="We support requirements in Maharashtra's industrial belts and key regions across the country. Coverage is confirmed for each requirement." />
      <section className="wf-section"><div className="wf-shell"><div className="wf-grid3">
        {CITIES.map((c, n) => <Link key={c.slug} href={`/locations/${c.slug}`} className="wf-tile" data-reveal="" style={{ ["--d" as string]: `${(n % 3) * 0.06}s` }}><small>{c.state}</small><h3>{c.name}</h3><p>{c.intro}</p><span className="wf-link">View region <ArrowRight size={15} /></span></Link>)}
      </div></div></section>
      <CtaBand title="Your city not listed?" text="Share your location and requirement. We'll tell you honestly what's possible." primary={["Contact us", "/contact"]} secondary={["Post a requirement", "/employers#requirement"]} />
    </main>
  );
}
