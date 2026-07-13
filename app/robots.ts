import type { MetadataRoute } from "next";
import { absoluteUrl, isSiteIndexable } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  if (!isSiteIndexable()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/preview/", "/drafts/", "/studio/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
