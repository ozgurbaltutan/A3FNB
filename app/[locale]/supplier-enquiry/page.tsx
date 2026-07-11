import type { Metadata } from "next";
import { EnquiryPageLayout } from "@/components/enquiry-page-layout";
import { SupplierEnquiryForm } from "@/components/enquiry-forms";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const breadcrumb = [
  { label: "Home", href: "/en" },
  { label: "Supplier Enquiry", href: "/en/supplier-enquiry" },
];

export function generateMetadata(): Metadata {
  return buildMetadata({
    metaTitle: "Supplier Enquiry | A3 Food & Beverage",
    metaDescription: "Introduce your food production company, products, export markets and certifications to A3 Food & Beverage.",
    canonicalPath: "/en/supplier-enquiry",
    ogTitle: "Supplier Enquiry | A3 Food & Beverage",
    ogDescription: "Share a concise supplier introduction with A3 Food & Beverage.",
    robots: { index: true, follow: true },
    locale: "en",
    sitemapInclude: true,
    structuredDataType: "WebPage",
    targetKeyword: "food supplier enquiry",
    secondaryKeywords: ["food producer introduction", "supplier application"],
  });
}

export default function SupplierEnquiryPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <EnquiryPageLayout
        supplier
        title="Introduce your company to A3"
        text="Share the essential company and product details needed for an initial supplier review. Certifications and export-market context can be added if available."
      >
        <SupplierEnquiryForm />
      </EnquiryPageLayout>
    </>
  );
}
