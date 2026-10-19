export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.startsWith("https://") ? process.env.NEXT_PUBLIC_SITE_URL : "https://uniquetoo.in";
export const COMPANY = "UniqueToo Workforce Pvt. Ltd.";
export const EMAIL = "contact@uniquetoo.in";
export const PHONE_DISPLAY = "+91 99753 15002";
export const PHONE_TEL = "+919975315002";
export const WHATSAPP = "https://wa.me/919975315002";
export const ADDRESS = "Chimbli, Pune, Maharashtra 412105";

export const SERVICES = [
  { slug: "recruitment", title: "Recruitment Services", text: "Permanent and contract hiring for professional, technical and frontline roles.", image: "/media/user/recruitment.webp" },
  { slug: "staffing", title: "Industrial Staffing", text: "Skilled, semi-skilled and contract staff for plants, warehouses and projects.", image: "/media/user/industrial-staffing.webp" },
  { slug: "engineering-hiring", title: "Engineering Hiring", text: "Mechanical, electrical, civil, electronics and production engineers and technicians.", image: "/media/user/engineering-hiring.webp" },
  { slug: "blue-collar-recruitment", title: "Blue-Collar Recruitment", text: "ITI, diploma and frontline hiring: operators, helpers, drivers and trades.", image: "/media/user/call-center.webp" },
  { slug: "security", title: "Security Services", text: "Trained guards and supervisors with shift planning and reporting.", image: "/media/user/security-services.webp" },
  { slug: "housekeeping", title: "Facilities & Housekeeping", text: "Housekeeping teams, supervisors and routines for consistent service standards.", image: "/media/user/facility-housekeeping.webp" },
  { slug: "workforce-solutions", title: "Workforce Solutions", text: "Planning, onboarding, deployment and support for multi-location teams.", image: "/media/user/workforce-solutions.webp" },
  { slug: "payroll-workforce-management", title: "Payroll & Compliance Support", text: "Attendance, workforce records and payroll coordination for deployed teams.", image: "/media/user/business-team.webp" },
] as const;

export const INDUSTRY_LINKS = [
  ["Manufacturing", "manufacturing"], ["Logistics", "logistics"], ["Warehouse & Fulfilment", "warehouse"], ["Construction", "construction"],
  ["Automotive", "automotive"], ["Healthcare", "healthcare"], ["Hospitality", "hospitality"], ["Retail & FMCG", "retail"],
  ["IT & Call Centers", "it-call-centers"], ["Engineering & IT", "engineering-it"], ["Agri & Food", "agriculture"], ["Education & Campus", "education"],
] as const;
