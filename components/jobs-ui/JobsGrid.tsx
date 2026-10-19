import JobCard from "./JobCard";

const jobs = [
  {
    title: "Warehouse Associate",
    location: "Pune",
    salary: "₹18,000 - ₹25,000",
    type: "Full Time",
  },
  {
    title: "Factory Operator",
    location: "Chakan",
    salary: "₹20,000 - ₹28,000",
    type: "Urgent Hiring",
  },
  {
    title: "Security Guard",
    location: "Mumbai",
    salary: "₹16,000 - ₹22,000",
    type: "Full Time",
  },
  {
    title: "Housekeeping Staff",
    location: "Pimpri",
    salary: "₹15,000 - ₹20,000",
    type: "Immediate Join",
  },
];

export default function JobsGrid() {
  return (
    <section className="section-padding bg-gray-100">

      <div className="container-custom">

        <div className="grid md:grid-cols-2 gap-8">

          {jobs.map((job, index) => (
            <JobCard
              key={index}
              title={job.title}
              location={job.location}
              salary={job.salary}
              type={job.type}
            />
          ))}

        </div>

      </div>

    </section>
  );
}