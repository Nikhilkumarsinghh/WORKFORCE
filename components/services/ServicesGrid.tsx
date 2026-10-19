const services = [
  "Recruitment",
  "Industrial Staffing",
  "Housekeeping",
  "Security Services",
  "Workforce Solutions",
  "Warehouse Staffing",
];

export default function ServicesGrid() {
  return (
    <section className="py-24 bg-[var(--card)]">

      <div className="container-custom">

        <div className="grid md:grid-cols-3 gap-8">

          {services.map((service) => (

            <div
              key={service}
              className="p-10 rounded-3xl border border-black/10 hover:shadow-2xl transition"
            >

              <h2 className="text-3xl font-black mb-4">
                {service}
              </h2>

              <p className="text-gray-500 leading-8">
                Professional workforce and staffing
                solutions for modern industries.
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}