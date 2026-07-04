import type { Metadata } from "next";
import { ContactPageLayout } from "@/components/contact-page-layout";
import { GeneralContactForm } from "@/components/send-requirement-form";
import { JsonLd } from "@/components/seo/json-ld";
import { company, pages } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const breadcrumb = [
  { label: "Home", href: "/en" },
  { label: "Contact", href: "/en/contact" },
];

export function generateMetadata(): Metadata {
  return buildMetadata(pages.contact.seo);
}

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <ContactPageLayout
        title={pages.contact.title}
        text="For general questions, company information or partnership conversations, send a short message to A3. Product sourcing and quote requests can be routed through the dedicated quote page."
        image="/media/home/company-trade-snapshot.webp"
        imageAlt="Food sourcing coordination table with packaged products, samples and trade documents"
        formTitle="Send a general message"
        formText="Share the topic, your company details and the best way to reply. A prepared email draft will open for review before sending."
        infoTitle="Direct contact"
        infoText="A3 operates from London and supports commercial food trade conversations through direct, relationship-led follow-up."
        infoGroups={[
          {
            title: "Reach the team",
            items: [
              { label: "Email", value: company.email, href: `mailto:${company.email}` },
              { label: "Phone / WhatsApp", value: company.phone, href: `tel:${company.phone.replace(/\s+/g, "")}` },
            ],
          },
          {
            title: "Registered office",
            text: company.registeredOffice.display,
            items: [
              { label: "Company No.", value: company.companyNumber },
              { label: "VAT", value: company.vatNumber },
              { label: "D-U-N-S", value: company.dunsNumber },
            ],
          },
        ]}
        supportTitle="Need a product quote?"
        supportText="If your message includes product, origin, packing, volume or destination details, use the quote route so A3 receives the commercial context in one place."
        supportPrimary={{ label: "Request a Quote", href: "/en/request-a-quote" }}
      >
        <GeneralContactForm />
      </ContactPageLayout>
    </>
  );
}
