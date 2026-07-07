import type { Metadata } from "next";
import { LegalPageLayout, type LegalPageSection } from "@/components/legal-page-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { pages } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const breadcrumb = [
  { label: "Home", href: "/en" },
  { label: "Cookie Policy", href: "/en/cookie-policy" },
];

const sections: LegalPageSection[] = [
  {
    title: "Overview",
    paragraphs: [
      "This Cookie Policy explains how A3 Food & Beverage LTD may use cookies and similar technologies on its website. Cookies are small text files placed on a device when a visitor accesses a website.",
      "Cookies can help a website function, remember limited preferences, understand how pages are used and support security, performance or analytics activities.",
    ],
  },
  {
    title: "Types of cookies we may use",
    paragraphs: [
      "A3 may use essential cookies required for the website to operate correctly, including cookies that support routing, page loading, security and form behaviour.",
      "Where analytics or performance tools are enabled, cookies may help us understand aggregate website usage, such as which pages are visited and whether users encounter technical issues.",
    ],
    items: [
      "Essential cookies: required for core website operation.",
      "Preference cookies: used only if the website stores optional visitor preferences.",
      "Analytics cookies: used only where analytics tooling is enabled to review aggregated website performance.",
      "Third-party cookies: may be set by embedded services if they are used on the website.",
    ],
  },
  {
    title: "Managing cookies",
    paragraphs: [
      "Most browsers allow visitors to block, delete or restrict cookies through browser settings. Blocking some cookies may affect how parts of the website work.",
      "If a consent banner or cookie control is provided on the website, visitors can use it to manage optional cookie preferences where applicable.",
    ],
  },
  {
    title: "Changes to this policy",
    paragraphs: [
      "A3 may update this Cookie Policy from time to time to reflect changes in website functionality, technology, legal requirements or business practices.",
    ],
  },
];

export function generateMetadata(): Metadata {
  return buildMetadata(pages.cookiePolicy.seo);
}

export default function CookiePolicyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <LegalPageLayout
        breadcrumb={breadcrumb}
        title={pages.cookiePolicy.title}
        description={pages.cookiePolicy.description}
        lastUpdated="8 July 2026"
        sections={sections}
      />
    </>
  );
}
