import type { Metadata } from "next";

const serviceMeta: Record<string, { title: string; description: string }> = {
  "workforce-solutions": { title: "Workforce Solutions", description: "Explore workforce planning, recruitment, onboarding, deployment and workforce coordination services from UniqueToo." },
  recruitment: { title: "Recruitment Services", description: "Role definition, talent sourcing, candidate screening and interview coordination for professional and operational hiring." },
  staffing: { title: "Industrial Staffing", description: "Industrial and frontline staffing support for plants, warehouses, logistics and project operations." },
  security: { title: "Security Services", description: "Site-focused security staffing, supervision, shift planning and operational reporting." },
  housekeeping: { title: "Housekeeping & Facilities", description: "Facilities and housekeeping staffing structured around site routines, supervision and quality checks." },
  "engineering-hiring": { title: "Engineering Hiring", description: "Technical recruitment for mechanical, electrical, electronics, civil, production and engineering operations roles." },
  "campus-hiring": { title: "Campus Hiring", description: "Structured campus hiring programmes, candidate registration, assessments and joining coordination." },
  "payroll-workforce-management": { title: "Payroll & Workforce Management", description: "Workforce administration, attendance coordination, payroll inputs and recurring operational reporting." },
  "blue-collar-recruitment": { title: "Blue-Collar Recruitment", description: "Trade-focused sourcing and screening for ITI, diploma and frontline operational positions." },
  technology: { title: "Software Development & Technology", description: "Business websites, applications, portals, integrations and software built around operational requirements." },
  "ai-automation": { title: "AI & Workflow Automation", description: "Practical workflow automation with validation, exception handling and human oversight." },
  "business-analytics": { title: "Business Analytics", description: "Dashboards, reporting and operational intelligence for clearer management decisions." },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = serviceMeta[slug];
  if (!item) return { title: "Service Not Found | UniqueToo", robots: { index: false, follow: false } };
  return {
    title: `${item.title} | UniqueToo`,
    description: item.description,
    alternates: { canonical: `/services/${slug}` },
    openGraph: { title: `${item.title} | UniqueToo`, description: item.description, url: `/services/${slug}`, type: "website" },
  };
}

export default function ServiceSlugLayout({ children }: { children: React.ReactNode }) {
  return children;
}
