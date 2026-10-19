import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "../../lib/content/services";
import { INDUSTRIES } from "../../lib/content/industries";
import { ROLES } from "../../lib/content/roles";
import { CITIES } from "../../lib/content/cities";
import { GUIDES } from "../../data/candidate-guides";
import { WORKFORCE_POSTS } from "../../data/blog-posts";
import { PageHero } from "../../components/wf/blocks";

export const metadata: Metadata = { title: "Site Map", description: "All pages on uniquetoo.in: services, industries, roles, locations, candidate guides, insights and company pages.", alternates: { canonical: "/site-map" } };

export default function SiteMapPage() {
  const sec: [string, [string, string][]][] = [
    ["Main", [["Home", "/"], ["Hire talent", "/employers"], ["Register for jobs", "/candidates"], ["Jobs", "/jobs"], ["Campus placement", "/campus-hiring"], ["Contact", "/contact"], ["FAQ", "/faq"]]],
    ["Company", [["About", "/about"], ["Vision & values", "/about/vision"], ["Trust & compliance", "/trust"], ["Join our team", "/join-us"], ["Privacy Policy", "/privacy-policy"], ["Terms", "/terms"], ["Cookie Policy", "/cookie-policy"], ["Accessibility", "/accessibility"]]],
    ["Services", SERVICES.map((s) => [s.title, `/services/${s.slug}`] as [string, string])],
    ["Industries", INDUSTRIES.map((i) => [i.title, `/industries/${i.slug}`] as [string, string])],
    ["Roles", ROLES.map((r) => [r.title, `/roles/${r.slug}`] as [string, string])],
    ["Locations", CITIES.map((c) => [c.name, `/locations/${c.slug}`] as [string, string])],
    ["Candidate guides", GUIDES.map((g) => [g.h1, `/candidates/${g.slug}`] as [string, string])],
    ["Insights", WORKFORCE_POSTS.map((p) => [p.title, `/blog/${p.slug}`] as [string, string])],
  ];
  return (
    <main id="main">
      <PageHero crumbs={[["Site map"]]} eyebrow="Site map" title="Everything on this site." text="Every page, organised by section." />
      <section className="wf-section"><div className="wf-shell"><div className="wf-sitemap">{sec.map(([t, links]) => <div key={t}><h2>{t}</h2><ul>{links.map(([l, h]) => <li key={h}><Link href={h}>{l}</Link></li>)}</ul></div>)}</div></div></section>
    </main>
  );
}
