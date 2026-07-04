import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { CTASection, FeatureGrid, PageHero, ProductGrid, ResourceGrid, SplitSection } from "@/components/sections";
import { pages, productFamilies, resources } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const breadcrumb = [
  { label: "Home", href: "/en" },
  { label: "Products", href: "/en/products" },
  { label: "Coffee", href: "/en/products/coffee" },
];

export function generateMetadata(): Metadata {
  return buildMetadata(pages.coffee.seo);
}

export default function CoffeePage() {
  const coffee = productFamilies.find((product) => product.id === "coffee");

  if (!coffee) return null;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <PageHero title={pages.coffee.title} text={pages.coffee.description} breadcrumb={breadcrumb} />
      <SplitSection
        title="Coffee sourcing options"
        text="Coffee sourcing is handled through commercial buyer requirements. A3 reviews origin, type, grade, process, bag size, certifications and current offer mode before moving toward availability or quote discussions."
        points={["Green coffee", "Arabica", "Robusta / Conilon", "Commercial coffee", "Certified coffee where available", "Current offers / inquiry-led supply"]}
        visualLabel={coffee.image.alt}
      />
      <FeatureGrid
        title="Information buyers may need"
        text="Future product entries are structured around the fields buyers naturally ask for before requesting quote, sample or specification."
        muted
        items={[
          { title: "Origin and region", description: "Country, region or subregion where available, including Brazilian profiles by inquiry." },
          { title: "Coffee type and grade", description: "Arabica, Robusta / Conilon, commercial grades and supplier-specific specifications." },
          { title: "Process and bag size", description: "Process details, packing format and shipment model reviewed by supplier availability." },
          { title: "Certification and traceability", description: "Supplier-held certifications and traceability level reviewed only where available." },
          { title: "Cup profile", description: "Cup information can be shared when supplied with offer or lot documentation." },
          { title: "Request route", description: "Buyers can request quote, availability, sample or specification depending on the opportunity." },
        ]}
      />
      <ProductGrid title="Coffee product cards" products={[coffee]} />
      <ResourceGrid
        title="Documentation and trade support"
        text="A3 treats documentation as part of commercial credibility, not a decorative claim."
        resources={resources.filter((resource) => resource.relatedProducts.includes("coffee") || resource.id === "documentation-support")}
        muted
      />
      <CTASection
        title="Request coffee availability."
        text="Share origin preference, grade, volume, packing and destination market so A3 can review available sourcing support."
        primary={{ label: "Request Coffee Availability", href: "/en/request-a-quote" }}
        secondary={{ label: "Send Requirement", href: "/en/request-a-quote" }}
      />
    </>
  );
}
