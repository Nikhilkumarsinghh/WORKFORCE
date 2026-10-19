import type { MetadataRoute } from "next";
import { WORKFORCE_POSTS } from "../data/blog-posts";
import { GUIDES } from "../data/candidate-guides";
import { SERVICES } from "../lib/content/services";
import { INDUSTRIES } from "../lib/content/industries";
import { ROLES } from "../lib/content/roles";
import { CITIES } from "../lib/content/cities";
import { connectMongo } from "../lib/mongodb";
import { Job } from "../lib/models/Job";

const BASE = "https://uniquetoo.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const core: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    ["/", 1, "weekly"], ["/employers", 0.9, "monthly"], ["/candidates", 0.9, "weekly"], ["/campus-hiring", 0.9, "monthly"],
    ["/services", 0.85, "monthly"], ["/industries", 0.8, "monthly"], ["/roles", 0.8, "monthly"], ["/locations", 0.75, "monthly"],
    ["/about", 0.7, "monthly"], ["/about/vision", 0.6, "yearly"], ["/trust", 0.6, "yearly"], ["/join-us", 0.5, "monthly"], ["/contact", 0.8, "monthly"],
    ["/blog", 0.75, "weekly"], ["/faq", 0.6, "monthly"], ["/site-map", 0.3, "monthly"],
    ["/privacy-policy", 0.3, "yearly"], ["/terms", 0.3, "yearly"], ["/cookie-policy", 0.3, "yearly"], ["/accessibility", 0.3, "yearly"],
  ];
  const mk = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly") => ({ url: `${BASE}${path}`, lastModified: now, changeFrequency, priority });
  const out: MetadataRoute.Sitemap = [
    ...core.map(([p, pr, cf]) => mk(p, pr, cf)),
    ...SERVICES.map((s) => mk(`/services/${s.slug}`, 0.8)),
    ...INDUSTRIES.map((i) => mk(`/industries/${i.slug}`, 0.7)),
    ...ROLES.map((r) => mk(`/roles/${r.slug}`, 0.7)),
    ...CITIES.map((c) => mk(`/locations/${c.slug}`, 0.65)),
    ...GUIDES.map((g) => mk(`/candidates/${g.slug}`, 0.7)),
    ...WORKFORCE_POSTS.map((p) => mk(`/blog/${p.slug}`, 0.6)),
  ];
  try {
    const mongo = await connectMongo();
    if (mongo) { const count = await Job.countDocuments({ published: true, verified: true }); if (count > 0) out.push(mk("/jobs", 0.9, "daily")); }
  } catch { /* jobs page is only listed when verified vacancies exist */ }
  return out;
}
