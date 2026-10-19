import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/data", "/account", "/login", "/signup"],
      },
    ],
    sitemap: "https://uniquetoo.in/sitemap.xml",
    host: "https://uniquetoo.in",
  };
}
