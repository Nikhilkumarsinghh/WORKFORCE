export default function ServicesHero() {
  return (
    <section className="pt-40 pb-32 bg-[var(--bg)] text-[var(--text)]">

      <div className="container-custom">

        <p className="uppercase tracking-[4px] text-red-600 mb-4">
          Our Services
        </p>

        <h1 className="text-6xl md:text-8xl font-black leading-tight max-w-6xl">
          Workforce &
          <span className="text-red-600">
            {" "}Recruitment Solutions
          </span>
        </h1>

        <p className="mt-10 text-gray-300 text-xl max-w-4xl leading-9">
          UNIQUE TOO delivers professional staffing, recruitment,
          workforce and industrial hiring solutions across India.
        </p>

      </div>

    </section>
  );
}