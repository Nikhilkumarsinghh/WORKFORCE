export default function Testimonials() {
  return (
    <section className="bg-[var(--bg)] py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-red-600" />
            <span className="text-red-600 text-xs tracking-[3px] uppercase font-bold">Trust & transparency</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[var(--text)]">Proof should be <span className="text-red-600">verifiable.</span></h2>
          <p className="mt-5 text-[var(--text2)] text-sm md:text-base leading-8">We publish client testimonials, logos, case studies and outcome metrics only when the details are genuine and approved for public use. Until then, review the service scope, delivery process and contact details before deciding whether to work with us.</p>
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            {[ ["Clear scope", "Understand what is included before work begins."], ["Defined ownership", "Agree who is responsible for each step."], ["Real evidence", "Use verified examples and outcomes, not invented claims."] ].map(([title, body]) => <div key={title} className="border border-[var(--border)] p-5"><strong className="block text-[var(--text)] text-sm">{title}</strong><span className="block text-[var(--text2)] text-xs leading-6 mt-2">{body}</span></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}
