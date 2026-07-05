import type { Metadata } from "next";
import { ProductDetailLayout } from "@/components/product-detail-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { pages } from "@/content/site";
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
      <ProductDetailLayout
        breadcrumb={breadcrumb}
        storySections={[
          {
            title: "Markets shaped by product, origin and demand.",
            paragraphs: [
              "A3 works across source and sales markets to connect commercial buyers with suitable food producers, manufacturers and suppliers.",
              "The right route depends on the product. Some requirements are driven by origin, some by manufacturer capability, and others by access to a buyer's destination market. A3 reviews each opportunity through the conditions that matter in real trade: product suitability, supplier reliability, commercial terms and shipment timing.",
            ],
            image: "/media/markets-sourcing/grain-loading-origin.jpg",
            imageAlt: "Grain being loaded into a trailer at origin for commercial supply",
          },
          {
            title: "Source markets and sales markets are not the same.",
            paragraphs: [
              "A source market is where a product can be produced, packed or supplied under the right conditions. A sales market is where commercial buyers need that product in the right form, volume and price structure.",
              "A3 looks at both sides together. The question is not only where a product is available, but whether that market can support the buyer's requirement with the right supplier, documents, timing and commercial structure.",
              "This keeps sourcing practical, instead of reducing it to a fixed country list.",
            ],
            image: "/media/markets-sourcing/wholesale-market-warehouse.jpg",
            imageAlt: "Wholesale market warehouse with stacked food products and buyer activity",
            imagePosition: "left",
          },
        ]}
        sections={[
          {
            title: "Market directions",
            text:
              "A3's work is built around selected market relationships and product-led opportunities. Each region can play a different role depending on the product category, buyer requirement and supply conditions.",
            image: "/media/markets-sourcing/uk-commercial-market.jpg",
            imageAlt: "UK commercial market street representing European buyer and supplier routes",
            items: [
              {
                title: "Europe",
                description:
                  "Producer and manufacturer-led supply routes for packaged food, edible oils, flour, grains, canned goods, frozen food and other food categories where European supply is commercially suitable.",
              },
              {
                title: "Africa",
                description:
                  "Long-standing commercial experience across selected African markets, especially in wholesale, distribution and buyer-side relationships.",
              },
              {
                title: "South America",
                description:
                  "Origin-led opportunities for products such as coffee and sugar, where grade, crop availability, producer capability and shipment conditions shape the route.",
              },
              {
                title: "Other origins",
                description:
                  "Alternative origins can be reviewed when a buyer's requirement points to a more suitable product, supplier or commercial route outside the main market directions.",
              },
            ],
          },
        ]}
        support={{
          title: "The route follows the requirement.",
          text:
            "A3 does not begin with a fixed supplier list and force the buyer into it. The starting point is the requirement: what product is needed, where it needs to go, and under which commercial conditions the trade can move forward.",
          image: "/media/markets-sourcing/food-processing-line.jpg",
          imageAlt: "Food processing line showing product handling and supplier capability",
          steps: [
            {
              title: "Product reality",
              description:
                "The origin or supplier must match the product's grade, format, quantity and intended use.",
            },
            {
              title: "Market fit",
              description:
                "The route must make sense for the destination market, including buyer expectations, documents and price level.",
            },
            {
              title: "Commercial path",
              description:
                "Payment terms, delivery terms, timing and shipment planning need to support the trade before it moves forward.",
            },
          ],
        }}
        afterSupportStorySections={[
          {
            title: "Sourcing starts with the product.",
            paragraphs: [
              "Coffee, sugar, edible oils, grains, flour, canned goods and frozen food do not follow the same sourcing logic. Each category has different producers, specifications, documents, shipment patterns and price conditions.",
              "A3 reviews the product first, then considers which market or origin can support the requirement most realistically.",
            ],
            image: "/media/markets-sourcing/packed-sweet-potatoes.jpg",
            imageAlt: "Packed sweet potatoes in boxes representing product-led sourcing decisions",
          },
        ]}
        related={[{ label: "Explore Product Categories", href: "/en/products" }]}
        finalCta={{
          title: "Looking for a product from a specific market or origin?",
          text:
            "Share the product you are looking for and the market you need to supply. A3 will review whether a suitable sourcing route can be built around your requirement.",
          primary: { label: "Share Your Requirement", href: "/en/request-a-quote" },
          image: "/media/markets-sourcing/boxed-food-supply.jpg",
          imageAlt: "Boxed food products in warehouse storage for supply review",
        }}
      />
    </>
  );
}
