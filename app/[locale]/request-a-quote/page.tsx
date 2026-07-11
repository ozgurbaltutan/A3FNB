import type { Metadata } from "next";
import { EnquiryPageLayout } from "@/components/enquiry-page-layout";
import { QuoteEnquiryForm } from "@/components/enquiry-forms";
import { JsonLd } from "@/components/seo/json-ld";
import { pages } from "@/content/site";
import { enquiryCatalog, resolveEnquiryContext } from "@/lib/enquiry-catalog";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const breadcrumb = [
  { label: "Home", href: "/en" },
  { label: "Request a Quote", href: "/en/request-a-quote" },
];

export function generateMetadata(): Metadata {
  return buildMetadata(pages.requestQuote.seo);
}

export default async function RequestAQuotePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[]; product?: string | string[] }>;
}) {
  const query = await searchParams;
  const categoryValue = Array.isArray(query.category) ? query.category[0] : query.category;
  const productValue = Array.isArray(query.product) ? query.product[0] : query.product;
  const { category, product } = resolveEnquiryContext(categoryValue, productValue);
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <EnquiryPageLayout
        title={product ? undefined : "Request a food sourcing quote"}
        text={product ? undefined : "Select a product category and share the essential details needed for a focused sourcing review."}
      >
        <QuoteEnquiryForm
          catalog={enquiryCatalog}
          initialCategorySlug={category?.slug}
          initialProductId={product?.id}
        />
      </EnquiryPageLayout>
    </>
  );
}
