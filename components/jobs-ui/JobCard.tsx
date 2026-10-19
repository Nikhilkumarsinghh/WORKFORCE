"use client";

import { useState } from "react";
import ApplyModal from "./ApplyModal";

type JobProps = {
  title: string;
  location: string;
  salary: string;
  type: string;
};

export default function JobCard({
  title,
  location,
  salary,
  type,
}: JobProps) {

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-[var(--card)] rounded-3xl p-8 border border-black/10 hover:shadow-2xl transition">

        <div className="flex justify-between items-center mb-6">

          <span className="bg-blue-500 text-[var(--text)] px-4 py-2 rounded-full text-sm">
            {type}
          </span>

          <span className="text-gray-500">
            {location}
          </span>

        </div>

        <h2 className="text-3xl font-black mb-5">
          {title}
        </h2>

        <p className="text-gray-500 mb-8">
          Salary: {salary}
        </p>

        <div className="flex gap-4">

          <button
            onClick={() => setOpen(true)}
            className="btn-primary"
          >
            Apply Now
          </button>

          <button className="border border-black px-6 py-3 rounded-full font-semibold hover:bg-[var(--bg)] hover:text-[var(--text)] transition">
            WhatsApp
          </button>

        </div>

      </div>

      <ApplyModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}