const services = [
  {
    title: "Workforce Solutions",
    description:
      "End-to-end workforce management for industries and businesses.",
  },
  {
    title: "Recruitment Services",
    description:
      "Professional recruitment support for skilled hiring.",
  },
  {
    title: "Industrial Staffing",
    description:
      "Reliable staffing solutions for factories and production units.",
  },
  {
    title: "Security Services",
    description:
      "Professional security personnel for workplace safety.",
  },
  {
    title: "Housekeeping",
    description:
      "Trained housekeeping staff for facilities and operations.",
  },
  {
    title: "Campus Hiring",
    description:
      "Modern campus recruitment and fresher hiring programs.",
  },
];

export default function ServicesGrid() {
  return (
    <section className="section-padding bg-[var(--card)] text-[var(--text)]">

      <div className="container-custom">

        <div className="grid md:grid-cols-3 gap-8">

          {services.map((service, index) => (
            <div
              key={index}
              className="rounded-3xl border border-black/10 p-10 hover:bg-[var(--bg)] hover:text-[var(--text)] transition duration-300"
            >
              <h2 className="text-3xl font-black mb-6">
                {service.title}
              </h2>

              <p className="text-gray-500 leading-8">
                {service.description}
              </p>

              <button className="btn-primary mt-8">
                Learn More
              </button>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}
