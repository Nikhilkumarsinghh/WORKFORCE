import Link from "next/link";

const R = [
  { n:"01", t:"Clear requirements", d:"Start with role, location, volume, shift and timeline so the scope is understood." },
  { n:"02", t:"Defined delivery model", d:"Agree responsibilities, screening, reporting and milestones before work begins." },
  { n:"03", t:"Transparent compliance scope", d:"Document which party owns each statutory, payroll, safety and onboarding responsibility." },
  { n:"04", t:"Campus program planning", d:"Plan eligibility, assessment, interview flow and institution coordination around each program." },
  { n:"05", t:"Context-led solutions", d:"Shape workforce and technology decisions around the actual operating environment." },
  { n:"06", t:"Clear communication", d:"Define a point of contact, escalation route and review cadence for each engagement." },
];

export default function WhyChooseUs() {
  return (
    <section
  style={{ background: "var(--bg)" }}
  className="py-28"
>
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-20 items-start">

          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-blue-500" />
              <span className="text-red-600 text-xs tracking-[4px] uppercase font-semibold">Why Unique Too</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-[var(--text)] leading-tight">
              Why Top Companies<br/><span className="text-red-600">Choose Us</span>
            </h2>
            <p className="text-[var(--text2)] mt-6 leading-relaxed max-w-sm">
              We help businesses clarify workforce and technology requirements, agree a practical scope and identify the right next step.
            </p>
            <div className="mt-10 flex flex-col gap-4">
              {[{v:"01",l:"Understand the requirement"},{v:"02",l:"Agree scope and ownership"},{v:"03",l:"Review delivery and improve"}].map((b,i)=>( 
                <div key={i} className="flex items-center gap-4 py-3 border-b border-white/5">
                  <div className="text-3xl font-black text-red-600">{b.v}</div>
                  <div className="text-[var(--text2)] text-sm">{b.l}</div>
                </div>
              ))}
            </div>
            <Link href="/contact"
              className="mt-10 inline-flex items-center gap-2 primary-btn">
              Partner With Us →
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {R.map((r,i)=>(
              <div key={i}
                className="group flex gap-5 bg-[var(--card)]/[0.02] hover:bg-[var(--card)]/[0.05] border border-white/8 hover:border-blue-500/20 rounded-2xl p-6 transition">
                <div className="text-red-600/30 group-hover:text-red-600/50 font-black text-5xl leading-none select-none shrink-0 transition">{r.n}</div>
                <div>
                  <h3 className="text-[var(--text)] font-bold text-lg mb-1.5 group-hover:text-blue-400 transition">{r.t}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-[var(--text2)] transition">{r.d}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
