import type { Metadata } from "next";
import { ProductDetailLayout } from "@/components/product-detail-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { pages } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const breadcrumb = [
  { label: "Home", href: "/en" },
  { label: "About", href: "/en/about" },
];

export function generateMetadata(): Metadata {
  return buildMetadata(pages.about.seo);
}

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <ProductDetailLayout
        breadcrumb={breadcrumb}
        storySections={[
          {
            title: "International food trade, built around workable supply.",
            paragraphs: [
              "A3 Food & Beverage is a UK-based international food trading and sourcing company built on food trade experience dating back to 1997.",
              "We work with commercial buyers, wholesalers, distributors, food manufacturers, retailers and suppliers across selected food categories. Our role is to help buyers reach the right product, the right producer and the right commercial terms without treating international trade as a simple transaction between two sides.",
              "Food trade depends on more than availability. Product specification, origin, production capacity, documentation, payment terms, shipment timing and market access all need to work together. A3 brings these parts into one practical supply conversation.",
            ],
            image: "/media/about/about-borough-market.webp",
            imageAlt: "Borough Market and London skyline showing A3's UK trading context",
          },
          {
            title: "What A3 does",
            paragraphs: [
              "A3 connects commercial buyers with suitable food producers and suppliers across international markets.",
              "We support trade in categories such as coffee, sugar, edible oils, grains, flour, canned goods, frozen food and other food products depending on buyer demand and supplier availability.",
              "For each request, we look beyond the question of whether a product exists. We review the required specification, available quantity, producer capability, price level, documentation needs and shipment window before presenting a supply option.",
              "This allows buyers to move faster, avoid unsuitable offers and focus on supply routes that are commercially workable.",
            ],
            image: "/media/about/about-market-bakery.webp",
            imageAlt: "Food market bakery counter with commercial food buyers",
            imagePosition: "left",
          },
          {
            title: "More than buying and selling",
            paragraphs: [
              "A3 is not built around a simple buy-from-one-side, sell-to-the-other model.",
              "The value comes from knowing how food trade actually works in different markets. That includes understanding local producers, knowing which suppliers can meet specific requirements, checking whether the product fits the buyer's market, and coordinating the commercial and logistical details that make the trade possible.",
              "In some cases, one producer can meet the full requirement. In others, the right answer may involve more than one source, different shipment windows or a more careful matching process.",
              "A3 helps buyers find the most realistic route, not just the first available offer.",
            ],
            image: "/media/about/about-market-stalls.webp",
            imageAlt: "Busy Borough Market food stalls with shoppers and suppliers",
          },
        ]}
        origin={{
          title: "Producer relationships and market knowledge",
          text:
            "A3's work has grown through long-term relationships with producers, suppliers and commercial buyers across different source and sales markets.",
          image: "/media/about/about-container-shipping.webp",
          imageAlt: "Container vessel and port cranes representing international food trade movement",
          facts: [
            {
              title: "Connected markets",
              description:
                "Strong connections in Turkiye, Africa and selected international origins including South America give A3 flexibility across product categories and regions.",
            },
            {
              title: "Supplier fit",
              description:
                "The focus is to understand what the buyer needs and identify which suppliers can realistically meet it.",
            },
            {
              title: "Workable structure",
              description:
                "A3 helps structure trade in a way that works for both sides, rather than forcing every request into one fixed route.",
            },
          ],
        }}
        support={{
          title: "How we approach each trade",
          text:
            "Each request is reviewed through the practical checks that determine whether a supply option can move from conversation to shipment.",
          image: "/media/about/about-london-station.webp",
          imageAlt: "London station with trains and passengers representing coordinated trade movement",
          steps: [
            {
              title: "Product fit",
              description:
                "We review the product type, grade, specification, packaging, origin and buyer requirements before moving forward.",
            },
            {
              title: "Producer capability",
              description:
                "We look at whether the supplier can meet the required quantity, consistency, documentation and timing.",
            },
            {
              title: "Market access",
              description:
                "We consider whether the product is suitable for the buyer's destination market, including commercial expectations and documentation needs.",
            },
            {
              title: "Commercial terms",
              description:
                "We help align price level, payment terms, delivery terms and buyer expectations before the trade progresses.",
            },
            {
              title: "Shipment readiness",
              description:
                "We check whether the product, supplier and timeline are ready for a realistic shipment process.",
            },
          ],
        }}
        sections={[
          {
            title: "Who we work with",
            text:
              "A3 works with commercial buyers and suppliers who need a practical route into food trade, whether they have a clear specification or need help shaping the right source, grade, packaging or commercial structure.",
            image: "/media/about/about-london-building.webp",
            imageAlt: "London commercial building facade representing A3's UK business base",
            items: [
              {
                title: "Wholesalers and distributors",
                description:
                  "Product availability, origin, packing, documentation and repeat-supply potential for resale and distribution channels.",
              },
              {
                title: "Food and ingredient manufacturers",
                description:
                  "Supply options shaped around specification, grade, application, consistency and recurring commercial needs.",
              },
              {
                title: "Retailers, supermarkets and foodservice buyers",
                description:
                  "Consumer-ready, packaged and foodservice product routes reviewed by format, market fit and supplier capability.",
              },
              {
                title: "Procurement teams, producers and suppliers",
                description:
                  "Clearer trade conversations around available products, export markets, capacity, certifications and target buyers.",
              },
            ],
          },
          {
            title: "Built for long-term trade",
            text:
              "International food trade works best when both sides understand the product, the market and the conditions behind the deal.",
            image: "/media/about/about-london-docks.webp",
            imageAlt: "London docks and cranes at sunset representing long-term trade connections",
            items: [
              {
                title: "Reduce uncertainty",
                description:
                  "A3 helps buyers review supplier fit, documents, timing and commercial structure before commitment.",
              },
              {
                title: "Connect the right parties",
                description:
                  "The goal is to bring producer capability and buyer requirement into a clearer, more realistic supply conversation.",
              },
              {
                title: "Support smoother flow",
                description:
                  "A3 aims to build practical, transparent and commercially sustainable supply relationships rather than one-off transactions.",
              },
            ],
          },
        ]}
        related={[
          { label: "Products", href: "/en/products" },
          { label: "Markets & Sourcing", href: "/en/markets-sourcing" },
          { label: "How We Work", href: "/en/how-we-work" },
        ]}
        finalCta={{
          title: "Talk to A3 about your next requirement.",
          text:
            "Whether you are looking for a specific product, comparing supply options or trying to find a producer that can meet your required specification, A3 can help you review the route forward.",
          primary: { label: "Share Your Requirement", href: "/en/request-a-quote" },
          secondary: { label: "Contact A3", href: "/en/contact" },
          image: "/media/about/about-seafood-products.webp",
          imageAlt: "Fresh seafood and food products displayed in a commercial market",
        }}
      />
    </>
  );
}
