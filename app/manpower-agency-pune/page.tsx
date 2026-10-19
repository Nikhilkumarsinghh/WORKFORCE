import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CaseStudySection from "../../components/common/CaseStudySection";

export const metadata: Metadata = {
  title: "Manpower Agency in Pune | UniqueToo Workforce Solutions",
  description:
    "Discuss industrial staffing, recruitment and workforce requirements for factories, warehouses, logistics and facilities across Pune, PCMC, Chakan and Talegaon.",
  keywords:
    "manpower agency in pune, manpower supplier pune, labour contractor pune, manpower company pune, industrial manpower pune",
  alternates: {
    canonical: "https://uniquetoo.in/manpower-agency-pune",
  },
};

const faqs = [
  {
    q: "What is a manpower agency in Pune?",
    a: "A manpower agency in Pune is a company that provides workers to other businesses on a contractual or permanent basis. They handle sourcing, screening, and deploying workers for industries like manufacturing, logistics, and hospitality.",
  },
  {
    q: "How quickly can Unique Too deploy workers?",
    a: "Timelines depend on role, location, screening needs and headcount. Once the requirement is understood, the team can confirm a realistic sourcing and mobilisation plan.",
  },
  {
    q: "Does Unique Too handle PF, ESIC, and compliance?",
    a: "Compliance responsibilities should be defined in the written service scope and reviewed against current applicable requirements. Share your location, worker category and engagement model so the team can clarify what support is available.",
  },
  {
    q: "Which areas in Pune does Unique Too serve?",
    a: "Share your site location and workforce requirement. We can review whether the requested area, role mix and timeline are within the scope we can support.",
  },
];

export default function ManpowerAgencyPunePage() {
  return (
    <main className="bg-[var(--bg)] text-[var(--text)] pt-8">

      {/* HERO */}
      <section className="py-16 lg:py-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-[1.05fr_.95fr] gap-10 lg:gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-5"><div className="w-6 h-px bg-red-500"/><span className="text-red-500 text-xs font-semibold uppercase tracking-[3px]">Workforce solutions · Pune</span></div>
            <h1 className="text-5xl lg:text-7xl font-black leading-tight">Manpower Agency <span className="block text-red-500">in Pune</span></h1>
            <p className="mt-6 text-[var(--muted)] text-lg max-w-2xl leading-relaxed">Discuss skilled, semi-skilled and frontline workforce requirements for manufacturing, warehouses, logistics, facilities and engineering operations across Pune and nearby industrial areas.</p>
            <div className="flex flex-wrap gap-3 mt-8"><Link href="/contact?type=workforce" className="inline-flex items-center bg-red-600 hover:bg-red-700 px-6 py-3.5 rounded-sm text-white font-bold transition-colors">Discuss workforce needs →</Link><a href="https://wa.me/919975315002?text=Hi%20UniqueToo%2C%20I%20have%20a%20workforce%20requirement." target="_blank" rel="noopener noreferrer" className="inline-flex items-center border border-gray-300 hover:border-gray-500 px-6 py-3.5 rounded-sm text-gray-800 font-bold transition-colors">WhatsApp the team</a></div>
          </div>
          <div className="relative min-h-[320px] lg:min-h-[430px] overflow-hidden rounded-sm bg-slate-900">
            <Image src="/media/user/industrial-staffing.webp" alt="Industrial workforce team coordinating on site" fill priority sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" quality={88}/>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent"/>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white"><span className="text-xs uppercase tracking-[.18em] text-red-300 font-bold">Workforce planning</span><p className="text-xl md:text-2xl font-bold mt-2 max-w-md">Clear roles. Realistic timelines. Defined responsibilities.</p></div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <h2 className="text-3xl font-black text-[var(--text)] mb-6">Why Choose UniqueToo for Workforce Requirements in Pune?</h2>
          <div className="prose max-w-none text-[var(--text2)] leading-relaxed space-y-4">
            <p>
              UniqueToo can discuss industrial staffing, contract workforce and recruitment requirements for businesses in Pune, Pimpri-Chinchwad (PCMC), Chakan, Talegaon and Ranjangaon. Availability and scope are confirmed for each requirement.
            </p>
            <p>
              A workforce engagement is easier to manage when role definitions, sourcing, screening, onboarding, compliance responsibilities and on-site coordination are agreed before deployment.
            </p>
            <p>
              Whether you need a small team or a larger deployment, share the role mix, location, shift pattern, timeline and operating context so the right scope can be discussed. Applicable compliance responsibilities should be confirmed in writing before an engagement begins.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
            {[["01", "Define the requirement", "Roles, headcount, location, shifts and expected start date."], ["02", "Agree the scope", "Screening, onboarding, reporting and compliance responsibilities."], ["03", "Plan mobilisation", "Confirm a realistic timeline after role and location review."], ["04", "Review delivery", "Agree communication, replacement and operating review points."]].map(([n,title,desc]) => <article key={n} className="border border-[var(--border)] bg-[var(--card)] rounded-sm p-5"><span className="text-red-600 text-xs font-bold tracking-widest">{n}</span><h3 className="font-bold text-lg mt-3">{title}</h3><p className="text-[var(--muted)] text-sm leading-relaxed mt-2">{desc}</p></article>)}
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="py-16 border-t border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <h2 className="text-3xl font-black text-[var(--text)] mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-[var(--card)] border border-[var(--border)] rounded-sm p-6">
                <h3 className="text-[var(--text)] font-bold mb-3">{faq.q}</h3>
                <p className="text-[var(--text2)] text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="text-3xl font-black text-[var(--text)]">Need Manpower in Pune? Contact Us Today</h2>
          <p className="text-[var(--text2)] mt-3 mb-8">Discuss the requirement, delivery timeline and compliance responsibilities with the team.</p>
          <Link href="/contact" className="inline-flex bg-red-600 hover:bg-red-700 px-10 py-4 rounded-sm text-white font-bold transition-colors">
            Request Manpower →
          </Link>
        </div>
      </section>

    
      <CaseStudySection variant="manpower-agency-pune" />
    </main>
  );
}
