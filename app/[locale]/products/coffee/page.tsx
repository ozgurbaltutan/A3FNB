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
        storySections={[
          {
            title: "Brazilian Coffee in Global Trade",
            paragraphs: [
              "Brazil has shaped the global coffee market for generations and remains the world's largest coffee producer. Its coffee sector covers a wide range of regions, profiles and commercial grades, from high-volume Arabica and Conilon programs to more defined lots selected by screen size, cup profile, process or certification.",
              "For international buyers, Brazilian coffee should not be treated as a generic origin. The right option depends on grade, cup profile, volume, timing, documentation and commercial terms, while crop cycles, weather conditions and currency movements can affect availability and pricing from season to season. A3 works from the buyer's requirement backwards, reviewing the required coffee type, target market, volume and shipment window before presenting a workable supply option.",
            ],
            image: "/media/products/coffee/brazil-coffee-landscape.webp",
            imageAlt: "Brazilian coffee landscape at sunrise with planted hills and fields",
          },
        ]}
        profiles={{
          title: "Coffee profiles reviewed by requirement.",
          text:
            "A3 keeps the coffee conversation practical: profile, grade, origin, volume and documentation are reviewed before an option is treated as workable.",
          items: [
            {
              title: "Selected specialty lots",
              description:
                "Distinctive Brazilian lots may be reviewed where available, with cup notes, process, lot information and supporting quality details.",
              image: "/media/products/coffee/coffee-cherry-picking.webp",
              imageAlt: "Hand selecting ripe red coffee cherries on a coffee plant",
            },
            {
              title: "Arabica Santos Fine Cup",
              description:
                "A cleaner Brazilian Arabica profile for buyers looking for balanced cup character and reliable commercial use.",
              image: "/media/products/coffee/coffee-plant-green-cherries.webp",
              imageAlt: "Green coffee cherries growing among coffee leaves",
            },
            {
              title: "Arabica Santos Good Cup",
              description:
                "A practical commercial Arabica route for consistent Brazilian coffee requirements and blend applications.",
              image: "/media/products/coffee/green-beans-close.webp",
              imageAlt: "Close-up of green coffee beans",
            },
            {
              title: "Arabica Rio Minas",
              description:
                "A traditional Brazilian profile with stronger cup character, reviewed where the buyer requirement fits the application.",
              image: "/media/products/coffee/brazil-coffee-valley.webp",
              imageAlt: "Wide Brazilian coffee valley with mountains and planted fields",
            },
            {
              title: "Robusta Conilon",
              description:
                "Brazilian Conilon Robusta options, including commercial grades, reviewed by origin, lot details, volume and availability.",
              image: "/media/products/coffee/coffee-drying-beds.webp",
              imageAlt: "Coffee cherries drying on raised beds",
            },
          ],
        }}
        origin={{
          title: "Brazilian origin context.",
          text:
            "Brazil has shaped global coffee trade for more than a century. Its scale, varied regions and established processing routes create a wide range of commercial Arabica, Conilon Robusta and selected specialty possibilities. A3 uses this context to help buyers frame the right inquiry, not to imply confirmed stock.",
          image: "/media/products/coffee/brazil-coffee-valley.webp",
          imageAlt: "Brazilian coffee growing region with mountains, valleys and planted fields",
          facts: [
            {
              title: "Regions",
              description: "Minas Gerais, Sao Paulo, Bahia, Espirito Santo and Parana can each point to different profiles and supply routes.",
            },
            {
              title: "Processing",
              description: "Natural and pulped natural coffees are common reference points, with lot details checked by inquiry.",
            },
            {
              title: "Movement",
              description: "Commercial review may include origin handling, packing, documentation and port movement through established export routes.",
            },
          ],
        }}
        support={{
          title: "What makes a coffee option workable.",
          text:
            "A coffee option is not just a name on a list. A3 reviews the buyer requirement against product fit, lot information, origin availability, documents and export follow-up before moving toward quotation.",
          image: "/media/products/coffee/coffee-drying-beds.webp",
          imageAlt: "Coffee cherries drying as part of origin processing",
          steps: [
            {
              title: "Product fit",
              description: "Coffee type, origin, grade, profile, lot size and buyer requirements are reviewed before shortlisting options.",
            },
            {
              title: "Lot review",
              description: "Available lot details are organized so buyers can compare coffee options with more clarity before commitment.",
            },
            {
              title: "Origin availability",
              description: "Supply availability is checked across selected Brazilian coffee regions according to the inquiry.",
            },
            {
              title: "Documentation",
              description: "Export paperwork, certificates and supporting documents are reviewed according to destination and shipment requirement.",
            },
            {
              title: "Export follow-up",
              description: "Origin handling, loading, port movement and shipment updates are coordinated through the export process.",
            },
          ],
        }}
        related={[
          { label: "Sugar", href: "/en/products/sugar" },
          { label: "Cocoa Products", href: "/en/products/cocoa-products" },
          { label: "Grains & Seeds", href: "/en/products/grains-seeds" },
        ]}
        finalCta={{
          title: "Request Brazilian coffee options.",
          text:
            "Tell us the coffee type, origin, grade, volume, packing format and destination market you need. A3 will review available options, lot information and workable trade conditions.",
          primary: { label: "Request Coffee Options", href: "/en/request-a-quote" },
          secondary: { label: "View All Products", href: "/en/products" },
          image: "/media/products/coffee/green-beans-close.webp",
          imageAlt: "Green coffee beans prepared for review",
        }}
      />
    </>
  );
}
