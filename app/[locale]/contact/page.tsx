import type { Metadata } from "next";
import { SendRequirementForm } from "@/components/send-requirement-form";
import { JsonLd } from "@/components/seo/json-ld";
import { FeatureGrid, PageHero } from "@/components/sections";
import { Card, Container, Heading, Paragraph, Section } from "@/components/ui";
import { company, contactIntents, pages } from "@/content/site";
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
      <PageHero title={pages.contact.title} text={pages.contact.description} breadcrumb={breadcrumb} />
      <FeatureGrid
        title="Choose the right intent"
        text="This page routes commercial requirements more clearly than a generic contact form."
        items={contactIntents.slice(0, 6).map((intent) => ({
          title: intent,
          description: "The form below adapts the conversation toward product, sourcing, documentation, private label, supplier or direct contact needs.",
        }))}
      />
      <Section muted>
        <Container className="grid gap-8 lg:grid-cols-[1fr_0.45fr]">
          <Card>
            <Heading level={2}>Send Requirement</Heading>
            <Paragraph className="mt-4">
              No backend submission is connected yet. The UI is ready for a future secure form integration.
            </Paragraph>
            <div className="mt-8">
              <SendRequirementForm />
            </div>
          </Card>
          <Card>
            <Heading level={2}>Direct contact</Heading>
            <div className="mt-6 grid gap-4">
              <ContactLine label="Email" value={company.email} />
              <ContactLine label="Phone / WhatsApp" value={company.phone} />
              <ContactLine label="Registered office" value={company.registeredOffice.display} />
              <ContactLine label="Company No." value={company.companyNumber} />
              <ContactLine label="VAT" value={company.vatNumber} />
              <ContactLine label="D-U-N-S" value={company.dunsNumber} />
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}

function ContactLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-border pb-3 last:border-b-0">
      <p className="type-p3 font-semibold text-teal">{label}</p>
      <p className="type-p2 mt-1">{value}</p>
    </div>
  );
}
