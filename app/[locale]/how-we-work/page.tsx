import type { Metadata } from "next";
import { ProductDetailLayout } from "@/components/product-detail-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { pages } from "@/content/site";
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
      <ProductDetailLayout
        breadcrumb={breadcrumb}
        storySections={[
          {
            title: "We turn product requirements into workable supply options.",
            paragraphs: [
              "International food trade depends on more than availability. A supplier may have the product and a buyer may have the demand, but that does not always mean the trade is ready to move forward. Before presenting a supplier or product route, A3 reviews the conditions behind the deal - product fit, producer capability, market access, commercial terms, documentation and shipment timing - to understand whether a realistic and commercially workable route can be built around the buyer's requirement.",
            ],
            image: "/media/how-we-work/port-cranes-shipment.webp",
            imageAlt: "Container ship being loaded by port cranes for international trade",
          },
        ]}
        sections={[
          {
            title: "What makes a trade workable",
            text:
              "Every requirement is reviewed through the practical conditions that shape international food trade. A3 checks the product, the supplier, the market and the commercial structure before moving a conversation forward.",
            image: "/media/how-we-work/warehouse-trade-review.webp",
            imageAlt: "Large warehouse with packed goods prepared for commercial trade review",
            items: [
              {
                title: "Product fit",
                description:
                  "Product type, grade, specification, origin, packaging and intended use are reviewed before a supplier route is considered.",
              },
              {
                title: "Producer capability",
                description:
                  "A3 checks whether the supplier can meet the required quantity, consistency, documentation and timing.",
              },
              {
                title: "Market access",
                description:
                  "The destination market, required documents, commercial expectations and product suitability are considered together.",
              },
              {
                title: "Commercial terms",
                description:
                  "Price level, payment terms, delivery terms and buyer expectations are aligned before the trade progresses.",
              },
              {
                title: "Shipment readiness",
                description:
                  "Product availability, realistic timing, documentation and shipment coordination are reviewed before moving forward.",
              },
            ],
          },
        ]}
        support={{
          title: "From requirement to supply route",
          text:
            "A3's process is built to reduce unsuitable offers and focus the conversation on supply routes that can realistically work.",
          image: "/media/how-we-work/container-yard-coordination.webp",
          imageAlt: "Container yard with stacked shipping containers and forklift coordination",
          steps: [
            {
              title: "Share the requirement",
              description:
                "The buyer explains the product, quantity, destination market and commercial need.",
            },
            {
              title: "A3 reviews the route",
              description:
                "We check product fit, producer capability, market access, commercial terms and shipment feasibility.",
            },
            {
              title: "Workable options are presented",
              description:
                "Suitable supply options are shared only when the conditions behind the trade make sense.",
            },
            {
              title: "Terms are aligned",
              description:
                "Price, payment, delivery terms, documentation and timing are clarified before moving forward.",
            },
            {
              title: "Trade moves into coordination",
              description:
                "Once agreed, the process moves into supplier-buyer coordination, documentation and shipment planning.",
            },
          ],
        }}
        afterSupportStorySections={[
          {
            title: "Different requirements need different routes.",
            paragraphs: [
              "Some buyers need a single producer for a clearly defined product. Others may need volume from more than one source, alternative origins, different shipment windows or adjusted specifications.",
              "A3 does not work from a fixed supplier list alone. Each requirement is reviewed according to the product, market and trade conditions behind it.",
              "The result may be a direct producer route, a multi-source option or a more suitable alternative based on availability, timing and commercial fit.",
            ],
            image: "/media/how-we-work/origin-field-silos.webp",
            imageAlt: "Agricultural field with storage silos representing origin and supply route options",
            imagePosition: "left",
          },
        ]}
        finalCta={{
          title: "Have a product requirement? Let's review the route.",
          text:
            "Share the product you are looking for and the market you need to supply. A3 will review whether a suitable route can be built around your requirement.",
          primary: { label: "Share Your Requirement", href: "/en/request-a-quote" },
          image: "/media/how-we-work/container-ship-route.webp",
          imageAlt: "Container ship moving through open water as part of an international supply route",
        }}
      />
    </>
  );
}
