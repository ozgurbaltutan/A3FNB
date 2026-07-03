import type { MetadataRoute } from "next";
import { pages } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(pages)
    .filter((page) => page.seo.sitemapInclude && page.seo.robots.index)
    .map((page) => ({
      url: absoluteUrl(page.seo.canonicalPath),
      lastModified: page.seo.lastModified ? new Date(page.seo.lastModified) : new Date(),
      changeFrequency: page.slug === "/en" ? "weekly" : "monthly",
      priority: page.slug === "/en" ? 1 : page.slug.includes("/products") ? 0.85 : 0.7,
    }));
}
