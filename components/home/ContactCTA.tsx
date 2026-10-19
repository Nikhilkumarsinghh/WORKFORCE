import Link from "next/link";

export default function ContactCTA() {
  return (
    <section
      style={{ background: "var(--bg)" }}
      className="py-28 border-t border-white/5"
    >
      <div className="max-w-4xl mx-auto px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-red-600/20 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-blue-400 text-xs font-semibold uppercase tracking-[4px]">Get Started Today</span>
        </div>
        <h2 className="text-5xl lg:text-7xl font-black text-[var(--text)] leading-tight">
          Ready to Scale Your<br/><span className="text-red-600">Workforce?</span>
        </h2>
        <p className="text-[var(--text2)] mt-6 text-xl leading-relaxed">
          Share your requirement and the team will review the next steps with you.
        </p>
        <div className="flex flex-wrap gap-5 justify-center mt-12">
          <Link href="/contact" className="primary-btn text-lg px-10 py-5">Hire Workforce →</Link>
          <a href="https://wa.me/919975315002?text=Hi%20UniqueToo%2C%20I%20would%20like%20to%20discuss%20a%20workforce%20requirement." target="_blank" rel="noopener noreferrer"
            className="secondary-btn text-lg px-10 py-5 flex items-center gap-2">
            💬 WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
