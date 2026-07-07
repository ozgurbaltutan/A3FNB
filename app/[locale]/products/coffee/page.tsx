import type { Metadata } from "next";
import { ProductDetailLayout } from "@/components/product-detail-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { pages } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata, productFamilyJsonLd } from "@/lib/seo";

const breadcrumb = [
  { label: "Home", href: "/en" },
  { label: "Products", href: "/en/products" },
  { label: "Green Coffee Beans", href: "/en/products/green-coffee-beans" },
];

function coffeeQuoteHref(product?: string) {
  const params = new URLSearchParams({ category: "green-coffee-beans" });
  if (product) params.set("product", product);
  return `/en/request-a-quote?${params.toString()}`;
}

const coffeeProfiles = [
  {
    id: "selected-specialty-lots",
    title: "Selected Specialty Lots",
    description:
      "Distinctive Brazilian lots with cup notes, process, lot information and supporting quality details.",
    image: "/media/products/coffee/coffee-cherries-leaf.webp",
    imageAlt: "Coffee cherries on a branch for specialty coffee lot review",
    fit: "Specialty roasting and differentiated programs",
  },
  {
    id: "arabica-santos-fine-cup",
    title: "Arabica Santos Fine Cup",
    description:
      "A cleaner Brazilian Arabica profile for buyers looking for balanced cup character and reliable commercial use.",
    image: "/media/products/coffee/green-beans-close.webp",
    imageAlt: "Green coffee beans close up for Arabica profile review",
    fit: "Roasting, wholesale and distribution",
  },
  {
    id: "arabica-santos-good-cup",
    title: "Arabica Santos Good Cup",
    description:
      "A practical commercial Arabica route for consistent Brazilian coffee requirements and blend applications.",
    image: "/media/products/coffee/coffee-drying-beds.webp",
    imageAlt: "Coffee drying beds for Brazilian commercial coffee review",
    fit: "Commercial roasting and blends",
  },
  {
    id: "arabica-rio-minas",
    title: "Arabica Rio Minas",
    description:
      "A traditional Brazilian profile with stronger cup character for suitable blend applications.",
    image: "/media/products/coffee/coffee-cherries-hands.webp",
    imageAlt: "Coffee cherries held in hands during origin review",
    fit: "Cup profile, grade and intended blend use",
  },
  {
    id: "robusta-conilon",
    title: "Robusta Conilon",
    description:
      "Brazilian Conilon Robusta options, including commercial grades, lot details and volume context.",
    image: "/media/products/coffee/coffee-plant-green-cherries.webp",
    imageAlt: "Green coffee cherries on a coffee plant for Robusta Conilon review",
    fit: "Blends, soluble coffee and commercial programs",
  },
];

export function generateMetadata(): Metadata {
  return buildMetadata(pages.coffee.seo);
}

export default function CoffeePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <JsonLd
        data={productFamilyJsonLd({
          title: "Green Coffee Beans",
          summary: pages.coffee.description,
          href: "/en/products/green-coffee-beans",
          imageAlt: "Brazilian green coffee beans sourcing category for commercial buyers",
        })}
      />
      <ProductDetailLayout
        breadcrumb={breadcrumb}
        hero={{
          title: "Green Coffee Beans",
          text: [
            "Brazilian green coffee options organized by type, profile, lot detail, packing and documents.",
            "A3 reviews coffee requirements by origin, grade, cup profile, volume, shipment route and document readiness before moving toward quotation.",
          ],
          image: "/media/products/coffee/brazil-coffee-landscape.webp",
          imageAlt: "Brazilian coffee landscape at sunrise with planted hills and fields",
          hideBreadcrumb: true,
          variant: "compact",
        }}
        productPortfolio={{
          id: "range",
          title: "Coffee portfolio",
          text:
            "Explore Brazilian green coffee profiles by type, cup profile, lot context, packing and export document readiness.",
          display: "lineup",
          initialVisibleCount: 4,
          items: coffeeProfiles.map((profile) => ({
            id: profile.id,
            title: profile.title,
            description: profile.description,
            image: profile.image,
            imageAlt: profile.imageAlt,
            source: "Brazil",
            fit: profile.fit,
            overview: profile.description,
            keyDetails: [
              { title: "Source", description: "Brazil" },
              { title: "Typical uses", description: profile.fit },
              { title: "Packing", description: "60kg bags and supplier-specific formats reviewed by lot, route and volume." },
            ],
            applications: [profile.fit],
            packing: [
              { title: "Packing", description: "60kg bags and supplier-specific formats reviewed by lot, route and volume." },
              { title: "Lot context", description: "Lot size, cup notes, grade and document readiness are checked by inquiry." },
            ],
            origin: [
              { title: "Source", description: "Brazilian coffee options reviewed by profile, lot information and shipment window." },
              { title: "Route context", description: "Destination market, port and export documents are reviewed before quotation." },
            ],
            cta: { label: "Request this profile", href: coffeeQuoteHref(profile.id) },
          })),
        }}
        shipmentOptions={{
          title: "Packing and shipment context",
          text:
            "Coffee options become workable when lot information, packing, volume, destination route and export documents are clear.",
          image: "/media/products/coffee/green-beans-hands.webp",
          imageAlt: "Green coffee beans held in hands for quality review",
          items: [
            {
              title: "Packing format",
              description: "Share preferred packing, expected volume and whether the requirement is spot, seasonal or recurring.",
            },
            {
              title: "Lot information",
              description: "Available lot details, cup notes and quality information are reviewed according to buyer need.",
            },
            {
              title: "Destination route",
              description: "Destination market, port and timing help define whether the export route can work.",
            },
            {
              title: "Documents",
              description: "Origin paperwork, certificates and shipment documents are checked before a coffee offer moves forward.",
            },
          ],
        }}
        related={[
          { label: "Cocoa Products", href: "/en/products/cocoa-products" },
          { label: "Dried Fruit & Nuts", href: "/en/products/dried-fruit-nuts" },
          { label: "Request a Quote", href: "/en/request-a-quote" },
        ]}
        finalCta={{
          title: "Send a coffee requirement.",
          text:
            "Share coffee type, origin, grade, volume, packing and destination market.",
          primary: { label: "Send Coffee Requirement", href: coffeeQuoteHref() },
          secondary: { label: "View All Products", href: "/en/products" },
          image: "/media/products/coffee/brazil-coffee-valley.webp",
          imageAlt: "Brazilian coffee growing region with mountains, valleys and planted fields",
        }}
      />
    </>
  );
}
