import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { CTASection, FeatureGrid, MapMetricsSection, PageHero, ProcessSteps, SplitSection } from "@/components/sections";
import { pages, processSteps, regions } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const breadcrumb = [
  { label: "Home", href: "/en" },
  { label: "Markets & Sourcing", href: "/en/markets-sourcing" },
];

export function generateMetadata(): Metadata {
  return buildMetadata(pages.markets.seo);
}

export default function MarketsSourcingPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <PageHero title={pages.markets.title} text={pages.markets.description} breadcrumb={breadcrumb} />
      <FeatureGrid
        title="Source markets and buyer markets are different"
        text="A3 avoids broad global-coverage language. The sourcing model separates where products may be sourced from where buyer relationships and market experience exist."
        items={[
          {
            title: "Where we source",
            description: "Selected origins and producer relationships reviewed by product, documentation, volume and destination needs.",
          },
          {
            title: "Where we serve",
            description: "Commercial buyer markets and opportunities that depend on product fit, logistics and documentation requirements.",
          },
          {
            title: "How A3 connects them",
            description: "A3 matches product availability at origin with buyer demand, commercial requirements and shipment coordination.",
          },
        ]}
      />
      <MapMetricsSection
        title="Regional roles"
        text="The map is intentionally future-ready and restrained. It identifies role types without pretending every market is actively covered."
        regions={regions}
        dark
      />
      <ProcessSteps
        title="Trade network logic"
        text="The same sourcing rhythm applies across regions, product families and buyer types."
        steps={[
          processSteps[0],
          { title: "Supplier relationships", description: "Review producer access, product capability and documentation availability." },
          { title: "Product requirements", description: "Clarify grade, packing, destination, volume, timing and commercial need." },
          processSteps[3],
          processSteps[4],
        ]}
      />
      <SplitSection
        title="Selected international markets"
        text="A3 can discuss buyer relationships and opportunities depending on product and requirement. The site deliberately avoids any-market-anywhere language."
        points={["Headquarters", "Source market", "Destination market", "Market experience", "Emerging sourcing region"]}
        visualLabel="Market role legend and future map interaction placeholder"
        muted
      />
      <CTASection
        title="Discuss a sourcing or market requirement."
        primary={{ label: "Send Requirement", href: "/en/request-a-quote" }}
      />
    </>
  );
}
