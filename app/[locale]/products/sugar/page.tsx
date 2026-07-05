import type { Metadata } from "next";
import { ProductDetailLayout } from "@/components/product-detail-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { pages } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata, productFamilyJsonLd } from "@/lib/seo";

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
      <JsonLd
        data={productFamilyJsonLd({
          title: "Sugar",
          summary: pages.sugar.description,
          href: "/en/products/sugar",
          imageAlt: "Sugar sourcing category for commercial buyers",
        })}
      />
      <ProductDetailLayout
        breadcrumb={breadcrumb}
        storySections={[
          {
            title: "Cane and Beet Sugar for Commercial Supply",
            paragraphs: [
              "A3 Food & Beverage supplies commercial sugar options for food, beverage, retail and industrial buyers. The current range includes Brazilian cane sugar and Ukrainian beet sugar, with available grades selected according to buyer specification, destination market and shipment requirements.",
              "For buyers, the right sugar option depends on more than availability. ICUMSA level, sugar type, colour, granulation, packing format, documentation, payment terms and delivery window all affect whether a supply option is commercially workable.",
            ],
            image: "/media/products/sugar/sugar-cubes-cane.webp",
            imageAlt: "Brown and white sugar cubes with sugarcane",
          },
        ]}
        profiles={{
          title: "Available Sugar Grades",
          text:
            "A3 reviews Brazilian cane sugar and Ukrainian beet sugar options according to required ICUMSA level, intended application, packing format, documentation and shipment conditions.",
          items: [
            {
              title: "Brazilian Cane Sugar",
              description:
                "Brazilian cane sugar can be reviewed for refined, crystal or raw sugar requirements across food, beverage, retail and industrial use.",
              image: "/media/products/sugar/sugarcane-bundles.webp",
              imageAlt: "Bundled sugarcane prepared after harvest",
            },
            {
              title: "ICUMSA 45 / White Refined Sugar",
              description: "High-purity white refined cane sugar suitable for food, beverage, retail packing and direct consumption.",
              image: "/media/products/sugar/white-sugar-cubes.webp",
              imageAlt: "White sugar cubes on a light surface",
            },
            {
              title: "ICUMSA 150 / Crystal Sugar",
              description: "Crystal cane sugar suitable for bakery, beverage production and general food manufacturing.",
              image: "/media/products/sugar/raw-sugar-bowl.webp",
              imageAlt: "Raw sugar crystals in a wooden bowl",
            },
            {
              title: "ICUMSA 600-1200 / Brown Raw Sugar",
              description: "Brownish raw cane sugar suitable for food production, industrial use and further refining.",
              image: "/media/products/sugar/sugarcane-field.webp",
              imageAlt: "Sugarcane field under open sky",
            },
            {
              title: "Ukrainian Beet Sugar",
              description:
                "Ukrainian beet sugar is a refined white sugar option reviewed for food production, beverages, bakery, confectionery and industrial applications.",
              image: "/media/products/sugar/beet-harvest.webp",
              imageAlt: "Fresh beet plants being harvested by hand",
            },
            {
              title: "ICUMSA 60-100 / White Beet Sugar",
              description:
                "White beet sugar suitable for food production, beverages, bakery, confectionery and industrial use, reviewed by availability, documentation and shipment route.",
              image: "/media/products/sugar/beet-sugar-bowl.webp",
              imageAlt: "White sugar in a bowl with beet sugar root",
            },
          ],
        }}
        origin={{
          title: "Cane and beet sugar context.",
          text:
            "Brazilian cane sugar and Ukrainian beet sugar can point to different commercial routes, grade expectations and shipment conditions. A3 uses this context to help buyers frame the right sugar inquiry, not to imply confirmed stock.",
          image: "/media/products/sugar/sugarcane-field.webp",
          imageAlt: "Sugarcane field under open sky",
          facts: [
            {
              title: "Sugar type",
              description: "Cane and beet sugar options are reviewed according to buyer use, source availability and shipment route.",
            },
            {
              title: "Grade and ICUMSA",
              description: "ICUMSA level, colour, granulation, moisture, ash content, polarization and solubility are checked against the intended use.",
            },
            {
              title: "Destination fit",
              description: "Final specification details, certificates and shipment documents are confirmed through supplier documentation before shipment.",
            },
          ],
        }}
        sections={[
          {
            title: "Packing & Shipment Options",
            text:
              "Packing can be selected according to sugar grade, buyer preference, destination market and shipment volume. Available options may include retail bags, standard export bags and bulk big bags.",
            image: "/media/products/sugar/sugar-big-bags-warehouse.webp",
            imageAlt: "Bulk sugar big bags stored on pallets in a warehouse",
            items: [
              { title: "1 KG Bags", description: "Suitable for retail packing, private label requirements and consumer-facing distribution." },
              { title: "50 KG Bags", description: "Suitable for wholesale, food manufacturing, distribution and export shipments." },
              { title: "1 Ton Big Bags", description: "Suitable for bulk handling, industrial use and larger shipment volumes." },
            ],
          },
        ]}
        support={{
          title: "What makes a sugar option workable.",
          text:
            "A sugar option is reviewed against specification, origin availability, packing format, documentation, payment terms and delivery window before moving toward quotation.",
          image: "/media/products/sugar/sugarcane-bundles.webp",
          imageAlt: "Bundled sugarcane prepared for processing",
          steps: [
            {
              title: "Specification fit",
              description: "Sugar type, ICUMSA level, colour, granulation and intended application are clarified before shortlisting options.",
            },
            {
              title: "Origin and availability",
              description: "Brazilian cane sugar or Ukrainian beet sugar availability is reviewed by buyer requirement and shipment route.",
            },
            {
              title: "Packing and volume",
              description: "Retail bags, export bags, big bags, expected volume and loading model are checked for commercial fit.",
            },
            {
              title: "Documentation",
              description: "Certificates, product specifications and destination documents are reviewed through supplier-held information.",
            },
            {
              title: "Shipment readiness",
              description: "Payment terms, delivery window and export movement are coordinated before presenting a workable supply option.",
            },
          ],
        }}
        related={[
          { label: "Green Coffee Beans", href: "/en/products/green-coffee-beans" },
          { label: "Cocoa Products", href: "/en/products/cocoa-products" },
          { label: "Grains & Seeds", href: "/en/products/grains-seeds" },
        ]}
        finalCta={{
          title: "Request Sugar Supply",
          text:
            "Share your required sugar type, ICUMSA level, volume, packing format and destination market. A3 will review the specification and commercial conditions before presenting a workable sugar supply option.",
          primary: { label: "Request Sugar Supply", href: "/en/request-a-quote" },
          secondary: { label: "View All Products", href: "/en/products" },
          image: "/media/products/sugar/beet-sugar-bowl.webp",
          imageAlt: "White sugar in a bowl with beet sugar root",
        }}
      />
    </>
  );
}
