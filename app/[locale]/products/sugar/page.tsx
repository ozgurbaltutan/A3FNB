import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { CTASection, FeatureGrid, PageHero, ResourceGrid, SplitSection } from "@/components/sections";
import { pages, resources } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const breadcrumb = [
  { label: "Home", href: "/en" },
  { label: "Products", href: "/en/products" },
  { label: "Sugar", href: "/en/products/sugar" },
];

export function generateMetadata(): Metadata {
  return buildMetadata(pages.sugar.seo);
}

export default function SugarPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <PageHero title={pages.sugar.title} text={pages.sugar.description} breadcrumb={breadcrumb} />
      <FeatureGrid
        title="Sugar product types"
        items={[
          { title: "Refined White Sugar", description: "Reviewed by grade, origin, packing and shipment model." },
          { title: "ICUMSA 45", description: "High-intent refined sugar inquiry route with documentation review." },
          { title: "ICUMSA 150", description: "Grade-specific sourcing discussions depending on origin and buyer use." },
          { title: "Cane Sugar", description: "Origin and availability reviewed by requirement." },
          { title: "Beet Sugar", description: "Supplier and market availability reviewed where applicable." },
          { title: "Container Supply", description: "Commercial requirements reviewed by packing, destination and timing." },
          { title: "Vessel Supply", description: "Bulk shipment discussions handled only where product and buyer need align." },
        ]}
      />
      <SplitSection
        title="Commercial supply information"
        text="Sugar inquiries should be specific. A3 reviews type, cane or beet source, grade, ICUMSA band, origin options, packaging, MOQ approach, shipment type, certification availability, use cases and documentation."
        points={["Sugar type and grade", "ICUMSA band", "Origin options", "Packaging and shipment type", "Documentation and certification availability"]}
        visualLabel="Refined sugar grade, shipment and documentation review placeholder"
        muted
      />
      <FeatureGrid
        title="Supply model"
        items={[
          { title: "Container supply", description: "For buyers requiring packed sugar shipment by container." },
          { title: "Vessel supply", description: "For larger commercial requirements where bulk shipment is appropriate." },
          { title: "Contract supply", description: "For recurring buyer needs after product and documentation fit is reviewed." },
          { title: "Source on request", description: "For specific grades, origins or shipment requirements not always available." },
        ]}
      />
      <ResourceGrid
        title="Documentation and quality support"
        text="A3 does not invent certification or stock claims. Documentation is reviewed product by product and shipment by shipment."
        resources={resources.filter((resource) => resource.relatedProducts.includes("sugar") || resource.id === "documentation-support")}
        muted
      />
      <CTASection
        title="Request a sugar quote."
        text="Send grade, ICUMSA band, origin preference, packing, volume, destination and documentation requirements."
        primary={{ label: "Request Sugar Quote", href: "/en/contact" }}
        secondary={{ label: "Send Requirement", href: "/en/contact" }}
      />
    </>
  );
}
