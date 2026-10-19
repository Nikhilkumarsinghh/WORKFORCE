import type { Metadata } from "next";
import { connectMongo } from "../../lib/mongodb";
import { Job } from "../../lib/models/Job";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  let hasPublishedJobs = false;
  try {
    const mongo = await connectMongo();
    if (mongo) hasPublishedJobs = (await Job.countDocuments({ published: true, verified: true, $or: [{ expiresAt: { $exists: false } }, { expiresAt: null }, { expiresAt: { $gt: new Date() } }] })) > 0;
  } catch { hasPublishedJobs = false; }
  return {
    title: "Jobs & Career Opportunities",
    description: hasPublishedJobs ? "Explore employer-verified openings, review role requirements and apply through the UniqueToo candidate portal." : "Explore career paths and candidate resources from UniqueToo. Live vacancies will be listed after employer verification.",
    robots: { index: hasPublishedJobs, follow: true },
  };
}

export default function JobsLayout({ children }: { children: React.ReactNode }) { return children; }
