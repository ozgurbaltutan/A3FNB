import type { Metadata } from "next";
import type { NavigationItem, PageSeo } from "@/lib/types";
import { company } from "@/content/site";

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (configuredUrl) return configuredUrl.replace(/\/$/, "");

  if (process.env.VERCEL === "1") {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL must be configured for Vercel deployments. Use the preview or production public URL.",
    );
  }

  return "http://localhost:3000";
}

export function isSiteIndexable() {
  return process.env.SITE_INDEXABLE === "true";
}

export function absoluteUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}

export function buildMetadata(seo: PageSeo): Metadata {
  const indexable = isSiteIndexable();
  const socialImage = seo.ogImage?.src ?? "/brand/a3-social-card.png";
  const socialImageAlt = seo.ogImage?.alt ?? "A3 Food & Beverage";

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    alternates: {
      canonical: absoluteUrl(seo.canonicalPath),
      languages: seo.alternateLocales,
    },
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription,
      url: absoluteUrl(seo.canonicalPath),
      siteName: company.name,
      locale: "en_GB",
      type: "website",
      images: [
        {
          url: absoluteUrl(socialImage),
          alt: socialImageAlt,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.ogTitle,
      description: seo.ogDescription,
      images: [absoluteUrl(socialImage)],
    },
    robots: {
      index: indexable && seo.robots.index,
      follow: indexable && seo.robots.follow,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: getSiteUrl(),
    email: company.email,
    telephone: company.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.registeredOffice.street,
      addressLocality: company.registeredOffice.city,
      postalCode: company.registeredOffice.postalCode,
      addressCountry: company.registeredOffice.country,
    },
    identifier: [
      {
        "@type": "PropertyValue",
        name: "UK Company Number",
        value: company.companyNumber,
      },
      {
        "@type": "PropertyValue",
        name: "VAT Number",
        value: company.vatNumber,
      },
      {
        "@type": "PropertyValue",
        name: "D-U-N-S Number",
        value: company.dunsNumber,
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: company.name,
    url: getSiteUrl(),
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: company.name,
    },
  };
}

export function breadcrumbJsonLd(items: NavigationItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}

export function itemListJsonLd(items: { title: string; href: string; summary: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(item.href),
      name: item.title,
      description: item.summary,
    })),
  };
}

export function productFamilyJsonLd(product: {
  title: string;
  summary: string;
  href: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.summary,
    url: absoluteUrl(product.href),
    brand: {
      "@type": "Brand",
      name: company.name,
    },
    image: absoluteUrl(product.image),
  };
}
