import type { MetadataRoute } from "next";
import { pages, productCategories, productCategoryHref } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pageEntries: MetadataRoute.Sitemap = Object.values(pages)
    .filter((page) => page.seo.sitemapInclude && page.seo.robots.index)
    .map((page) => ({
      url: absoluteUrl(page.seo.canonicalPath),
      lastModified: page.seo.lastModified ? new Date(page.seo.lastModified) : new Date(),
      changeFrequency: page.slug === "/en" ? "weekly" : "monthly",
      priority: page.slug === "/en" ? 1 : page.slug.includes("/products") ? 0.85 : 0.7,
    }));

  const existingPageUrls = new Set(pageEntries.map((entry) => entry.url));
  const categoryEntries: MetadataRoute.Sitemap = productCategories
    .map((category) => ({
      url: absoluteUrl(productCategoryHref(category)),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
    .filter((entry) => !existingPageUrls.has(entry.url));

  const supplierEntry: MetadataRoute.Sitemap[number] = {
    url: absoluteUrl("/en/supplier-enquiry"),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.65,
  };

  return [...pageEntries, ...categoryEntries, supplierEntry];
}
