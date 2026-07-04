import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { Accordion, CTASection, PageHero, ProcessSteps, ServiceGrid, SplitSection } from "@/components/sections";
import { pages, processSteps, services } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const breadcrumb = [
  { label: "Home", href: "/en" },
  { label: "How We Work", href: "/en/how-we-work" },
];

export function generateMetadata(): Metadata {
  return buildMetadata(pages.howWeWork.seo);
}

export default function HowWeWorkPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <PageHero title={pages.howWeWork.title} text={pages.howWeWork.description} breadcrumb={breadcrumb} />
      <ProcessSteps
        title="Operating model"
        text="A3 replaces generic services with a practical sourcing and trade coordination flow."
        steps={processSteps}
      />
      <ServiceGrid
        title="Services that support the trade"
        text="Each service exists to move from buyer requirement to a realistic commercial next step."
        services={services}
      />
      <SplitSection
        title="Relationship-led sourcing"
        text="A3's value comes from selected producer access, buyer trust, field experience and market knowledge rather than anonymous catalogue selling."
        points={["Direct relationships", "Producer access", "Commercial buyer requirements", "Market knowledge"]}
        visualLabel="Relationship-led sourcing workflow placeholder"
        muted
      />
      <Accordion
        title="Documentation-led credibility"
        items={[
          { title: "Product-specific requirements", description: "Each product family has different specification, certification and shipment needs." },
          { title: "Logistics coordination", description: "Origin-to-destination coordination is treated as part of the commercial offer." },
          { title: "After-sales follow-through", description: "Repeat trade depends on clear communication before and after shipment." },
        ]}
      />
      <CTASection
        title="Send A3 your trade requirement."
        primary={{ label: "Send Requirement", href: "/en/request-a-quote" }}
      />
    </>
  );
}
