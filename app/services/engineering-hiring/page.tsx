import type { Metadata } from "next";
import ServiceDetail from "../../../components/services/ServiceDetail";

export const metadata: Metadata = {
  title: "Engineering Hiring | UniqueToo",
  description: "Engineering and technical recruitment planning shaped around role requirements, qualifications and hands-on skills.",
  alternates: { canonical: "/services/engineering-hiring" },
  openGraph: { title: "Engineering Hiring | UniqueToo", description: "Engineering and technical recruitment planning shaped around role requirements, qualifications and hands-on skills.", url: "/services/engineering-hiring", type: "website" },
};

export default function EngineeringHiringRoute() {
  return <ServiceDetail slug="engineering-hiring" />;
}
