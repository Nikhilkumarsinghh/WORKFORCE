import type { Metadata } from "next";

const industryMeta: Record<string, { title: string; description: string }> = {
  manufacturing: { title: "Manufacturing", description: "Workforce, technical hiring and operational technology considerations for manufacturing environments." },
  "engineering-it": { title: "Engineering & IT", description: "Explore engineering talent, software delivery and technology capability for engineering and IT teams." },
  logistics: { title: "Logistics & Supply Chain", description: "Workforce and operational workflow considerations for logistics, warehousing and distribution." },
  warehouse: { title: "Warehouse & Fulfilment", description: "Staffing, shift continuity and workflow visibility for warehouse and fulfilment operations." },
  construction: { title: "Construction & Infrastructure", description: "Site workforce, skilled trades, engineering hiring and project mobilisation considerations." },
  hospitality: { title: "Hospitality", description: "Workforce, facilities and guest-service operating considerations for hospitality environments." },
  "it-call-centers": { title: "IT & Call Centers", description: "Volume hiring, customer operations and digital workflow support for contact centres and IT-enabled services." },
  retail: { title: "Retail & FMCG", description: "Frontline workforce and distribution support for retail and fast-moving consumer goods operations." },
  healthcare: { title: "Healthcare & Facilities", description: "Workforce continuity and operational support considerations for healthcare and facilities environments." },
  automotive: { title: "Automotive & Mobility", description: "Technical hiring, production, quality and workforce considerations for automotive and mobility operations." },
  agriculture: { title: "Agri & Food Operations", description: "Seasonal workforce, processing, packaging and logistics considerations for agriculture and food operations." },
  education: { title: "Education & Campus", description: "Campus hiring, early careers, learning and operational support for education environments." },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = industryMeta[slug];
  if (!item) return { title: "Industry Practice Not Found | UniqueToo", robots: { index: false, follow: false } };
  return {
    title: `${item.title} | Industries | UniqueToo`,
    description: item.description,
    alternates: { canonical: `/industries/${slug}` },
    openGraph: { title: `${item.title} | Industries | UniqueToo`, description: item.description, url: `/industries/${slug}`, type: "website" },
  };
}

export default function IndustrySlugLayout({ children }: { children: React.ReactNode }) {
  return children;
}
