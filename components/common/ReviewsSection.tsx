export default function ReviewsSection() {
  return (
    <section className="bg-[var(--bg)] py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          <span className="text-red-600 text-xs tracking-[3px] uppercase font-bold">Trust & evidence</span>
          <h2 className="text-4xl md:text-5xl font-black text-[var(--text)] mt-4">Real feedback. <span className="text-red-600">With permission.</span></h2>
          <p className="mt-5 text-[var(--text2)] text-sm md:text-base leading-8">Client reviews and testimonials should be published only when they are genuine, attributable and approved for public use. Until verified reviews are available, we explain our process and invite visitors to discuss their requirements directly.</p>
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {[ ["Scope", "Agree what is included and what is outside the engagement."], ["Ownership", "Document responsibilities, timelines and escalation paths."], ["Evidence", "Use verifiable work examples and measurable results when available." ] ].map(([title, text]) => <div key={title} className="border border-[var(--border)] p-5"><strong className="block text-[var(--text)] text-sm">{title}</strong><p className="text-[var(--text2)] text-xs leading-6 mt-2">{text}</p></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}
