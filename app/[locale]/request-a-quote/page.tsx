import type { Metadata } from "next";
import { ContactPageLayout } from "@/components/contact-page-layout";
import { SendRequirementForm } from "@/components/send-requirement-form";
import { JsonLd } from "@/components/seo/json-ld";
import { company, pages } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const breadcrumb = [
  { label: "Home", href: "/en" },
  { label: "Request a Quote", href: "/en/request-a-quote" },
];

export function generateMetadata(): Metadata {
  return buildMetadata(pages.requestQuote.seo);
}

export default function RequestAQuotePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <ContactPageLayout
        title={pages.requestQuote.title}
        text="Share the product, origin, packing, volume and destination details A3 needs to review supplier fit and the best commercial next step."
        image="/media/home/final-cta.webp"
        imageAlt="Food sourcing and product handling used to represent a sourcing request"
        formTitle="Send your requirement"
        formText="Use the fields below to give A3 enough context for a focused sourcing or quote discussion. A prepared email draft will open for review before sending."
        infoTitle="What helps A3 respond"
        infoText="Clear product and shipment context helps the team review availability, documentation needs and realistic next steps."
        infoGroups={[
          {
            title: "Helpful details",
            items: [
              { label: "Product", value: "Category, grade or specification" },
              { label: "Supply context", value: "Origin, packing, volume and timing" },
              { label: "Destination", value: "Country, port or target market" },
              { label: "Documents", value: "Certification and specification needs" },
            ],
          },
          {
            title: "Direct contact",
            items: [
              { label: "Email", value: company.email, href: `mailto:${company.email}` },
              { label: "Phone / WhatsApp", value: company.phone, href: `tel:${company.phone.replace(/\s+/g, "")}` },
            ],
          },
        ]}
        supportTitle="Looking for general contact?"
        supportText="For company information, partnership conversations or non-product enquiries, use the shorter contact route."
        supportPrimary={{ label: "Contact A3", href: "/en/contact" }}
        supportSecondary={{ label: "Explore Products", href: "/en/products" }}
      >
        <SendRequirementForm />
      </ContactPageLayout>
    </>
  );
}
