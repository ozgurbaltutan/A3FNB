import type { Metadata } from "next";
import { ProductDetailLayout } from "@/components/product-detail-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { categoryCardItemBySlug } from "@/content/product-card-items";
import { pages } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata, productFamilyJsonLd } from "@/lib/seo";

const breadcrumb = [
  { label: "Home", href: "/en" },
  { label: "Products", href: "/en/products" },
  { label: "Sugar", href: "/en/products/sugar" },
];

function sugarQuoteHref(product?: string) {
  const params = new URLSearchParams({ category: "sugar" });
  if (product) params.set("product", product);
  return `/en/request-a-quote?${params.toString()}`;
}

const sugarRelated = ["starches-sweeteners", "grains-seeds", "consumer-foods"]
  .map(categoryCardItemBySlug)
  .filter((item): item is NonNullable<typeof item> => Boolean(item))
  .map((item) => ({
    label: item.title,
    href: item.href,
    description: item.description,
    image: item.image,
    imageAlt: item.imageAlt,
  }));

const icumsa45Specs = [
  { parameter: "Commercial form", specification: "Refined white cane sugar" },
  { parameter: "Moisture", specification: "0.04% max." },
  { parameter: "Ash content", specification: "0.04% max." },
  { parameter: "Polarisation", specification: "99.8° min." },
  { parameter: "Solubility", specification: "100% dry and free flow" },
  { parameter: "Radiation", specification: "Normal certified" },
  { parameter: "Colour", specification: "Sparkling white" },
  { parameter: "Granulation", specification: "Fine" },
];

const icumsa150Specs = [
  { parameter: "Commercial form", specification: "Crystal cane sugar" },
  { parameter: "Moisture", specification: "0.10% max." },
  { parameter: "Ash content", specification: "0.10% max." },
  { parameter: "Polarisation", specification: "99.5° min." },
  { parameter: "Solubility", specification: "100% dry and free flow" },
  { parameter: "Radiation", specification: "Normal certified" },
  { parameter: "Colour", specification: "Sparkling white" },
  { parameter: "Granulation", specification: "Fine" },
];

const icumsa600Specs = [
  { parameter: "Commercial form", specification: "Raw or less-refined brown cane sugar" },
  { parameter: "Moisture", specification: "0.15% max." },
  { parameter: "Ash content", specification: "0.15% max." },
  { parameter: "Polarisation", specification: "97.8° to 99.2°" },
  { parameter: "Solubility", specification: "95% dry and free flow" },
  { parameter: "Radiation", specification: "Normal certified" },
  { parameter: "Colour", specification: "Brown" },
  { parameter: "Granulation", specification: "6 mm regular size" },
];

const icumsa60Specs = [
  { parameter: "Commercial form", specification: "White beet sugar" },
  { parameter: "Moisture", specification: "0.06% max." },
  { parameter: "Ash content", specification: "0.08% max." },
  { parameter: "Polarisation", specification: "99.8° min." },
  { parameter: "Solubility", specification: "100% dry and free flow" },
  { parameter: "Radiation", specification: "Normal certified" },
  { parameter: "Colour", specification: "White at 20°" },
  { parameter: "Granulation", specification: "Fine" },
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
          image: "/media/products/sugar/sugarcane-field-barbados.webp",
        })}
      />
      <ProductDetailLayout
        pageTreatment="polished"
        breadcrumb={breadcrumb}
        hero={{
          title: "Creating a seamless flow in global sugar markets.",
          text: [
            "A3 acts as a strategic partner in the international sugar trade, connecting supply and demand effectively across cane and beet sugar markets.",
            "We manage the entire value chain—from sourcing at origin and technical specification matching to logistics, finance and final delivery.",
          ],
          image: "/media/products/sugar/sugarcane-field-barbados.webp",
          imageAlt: "Sugarcane field beneath misty green mountains in Saint George, Barbados",
          hideBreadcrumb: true,
          variant: "compact",
        }}
        sectionNavigation={[
          { label: "Overview", href: "#overview" },
          { label: "Grades", href: "#range" },
          { label: "Key facts", href: "#key-facts" },
          { label: "Specifications", href: "#technical-specifications" },
          { label: "Services", href: "#integrated-value-chain" },
          { label: "Contact", href: "#contact" },
        ]}
        productPortfolio={{
          id: "range",
          title: "Sugar grades",
          text:
            "We source high-quality Brazilian cane sugar and European beet sugar by origin and specific ICUMSA grade. Each supply option is rigorously assessed against the technical requirements of food manufacturers, primary processors and industrial consumers worldwide.",
          cardTreatment: "category-overlay",
          modalTreatment: "decision-summary",
          items: [
            {
              id: "icumsa-45",
              title: "ICUMSA 45 / White Refined Sugar",
              cardTitle: "ICUMSA 45",
              description:
                "Refined white cane sugar for food, beverages and retail packing.",
              image: "/media/products/sugar/icumsa-45-v3.png",
              imageAlt: "Bright white refined cane sugar crystals with cut sugar cane",
              decisionSummary: {
                lead: "Low-colour refined cane sugar for programmes where a clean finished appearance matters.",
                facts: [
                  { title: "Feedstock", description: "Sugar cane" },
                  { title: "Origin", description: "Brazil" },
                ],
                points: [
                  "Clear and light-coloured beverages",
                  "Confectionery and bakery programmes",
                  "Retail packing and direct consumption",
                ],
                supply: "25–50 kg export bags, retail formats, big bags or bulk by programme.",
              },
              cta: { label: "Request quote for this product", href: sugarQuoteHref("icumsa-45") },
            },
            {
              id: "icumsa-150",
              title: "ICUMSA 150 / Crystal Sugar",
              cardTitle: "ICUMSA 150",
              description:
                "White crystal cane sugar for bakery, beverages and food manufacturing.",
              image: "/media/products/sugar/icumsa-150-v3.png",
              imageAlt: "Warm white crystal cane sugar with cut sugar cane",
              decisionSummary: {
                lead: "A general-purpose crystal route balancing food-manufacturing performance and commercial value.",
                facts: [
                  { title: "Feedstock", description: "Sugar cane" },
                  { title: "Origin", description: "Brazil" },
                ],
                points: [
                  "Bakery and confectionery production",
                  "Beverage production",
                  "General food manufacturing",
                ],
                supply: "Standard export bags, big bags or bulk formats where available.",
              },
              cta: { label: "Request quote for this product", href: sugarQuoteHref("icumsa-150") },
            },
            {
              id: "icumsa-600-1200",
              title: "ICUMSA 600-1200 / Brown Raw Sugar",
              cardTitle: "ICUMSA 600-1200",
              description:
                "Raw brown cane sugar for refining and industrial processing.",
              image: "/media/products/sugar/icumsa-600-1200-v3.png",
              imageAlt: "Dark amber VHP raw cane sugar crystals with cut sugar cane",
              decisionSummary: {
                lead: "Choose this route where refined-white appearance is not the primary requirement.",
                facts: [
                  { title: "Feedstock", description: "Sugar cane" },
                  { title: "Form", description: "Raw / VHP" },
                  { title: "Origin", description: "Brazil" },
                ],
                points: [
                  "Further refining",
                  "Bulk industrial processing",
                  "Applications accepting a stronger cane colour",
                ],
                supply: "Bulk-oriented programmes or large bags, subject to the route.",
              },
              cta: { label: "Request quote for this product", href: sugarQuoteHref("icumsa-600-1200") },
            },
            {
              id: "icumsa-60-100",
              title: "ICUMSA 60-100 / White Beet Sugar",
              cardTitle: "ICUMSA 60-100",
              description:
                "White beet sugar for food, beverage and industrial use.",
              image: "/media/products/sugar/icumsa-60-100-v3.png",
              imageAlt: "White beet sugar crystals with whole and sliced sugar beet",
              decisionSummary: {
                lead: "A European beet-origin option where feedstock or regional supply route matters.",
                facts: [
                  { title: "Feedstock", description: "Sugar beet" },
                  { title: "Origin", description: "European options" },
                ],
                points: [
                  "Food production and beverages",
                  "Bakery and confectionery",
                  "Industrial applications",
                ],
                supply: "Standard export bags, big bags or retail formats by programme.",
              },
              cta: { label: "Request quote for this product", href: sugarQuoteHref("icumsa-60-100") },
            },
          ],
        }}
        editorialFacts={{
          title: "Sugar key facts",
          text: "A few milestones that show the scale and wider role of sugar in global trade and industry.",
          items: [
            {
              metric: "189m+",
              title: "A global food commodity",
              description: "USDA forecasts global sugar production above 189 million metric tons in 2025/26, reflecting the scale of supply required across food, beverage and industrial markets.",
            },
            {
              metric: "59%",
              title: "Brazil leads world exports",
              description: "Brazil accounted for 59% of global sugar exports in calendar year 2025, confirming its leading position in international trade, according to USDA FAS.",
            },
            {
              metric: "1908",
              title: "Ford Model T and early fuel research",
              description: "Introduced in 1908, the Ford Model T could run on different fuels, including alcohol. In the 1910s, Ford also investigated fuels made from sugar and other agricultural products.",
            },
          ],
        }}
        technicalSpecs={{
          title: "Technical specifications",
          text:
            "Compare the main indicative sugar grade values before requesting a quotation.",
          selectorLabel: "Select a sugar grade",
          disclaimer:
            "All values are indicative selection references. The supplier specification, certificate of analysis, origin and document set are confirmed with the commercial offer.",
          catalogue: {
            label: "Download sugar catalogue",
            href: "/assets/a3/resources/a3-sugar-catalogue.pdf",
          },
          profiles: [
            { title: "ICUMSA 45", subtitle: "White refined cane sugar", rows: icumsa45Specs },
            { title: "ICUMSA 150", subtitle: "Crystal cane sugar", rows: icumsa150Specs },
            { title: "ICUMSA 600-1200", subtitle: "Brown raw cane sugar", rows: icumsa600Specs },
            { title: "ICUMSA 60-100", subtitle: "White beet sugar", rows: icumsa60Specs },
          ],
        }}
        shipmentOptions={{
          id: "integrated-value-chain",
          title: "Integrated Value Chain Services",
          text:
            "Beyond sourcing, A3 provides the commercial and operational support needed to move sugar supply chains from origin to destination. We support our clients with:",
          image: "/media/products/sugar/sugar-service-market-intelligence.webp",
          imageAlt: "Harvested sugarcane bundled for movement at origin",
          items: [
            {
              title: "Market Intelligence",
              description: "Origin availability, grade-specific sourcing insight and relevant market information support informed procurement decisions across cane and beet sugar markets.",
              image: "/media/products/sugar/sugar-service-market-intelligence.webp",
              imageAlt: "Harvested sugarcane bundled for movement at origin",
            },
            {
              title: "Specification & Quality Assurance",
              description: "ICUMSA grade, supplier specifications, certificates of analysis, packing details and destination requirements are reviewed together before an offer is confirmed.",
              image: "/media/products/sugar/sugar-service-quality-assurance.webp",
              imageAlt: "Laboratory technician preparing a sample for technical analysis",
            },
            {
              title: "Commercial De-risking",
              description: "Price basis, payment structure and, where appropriate, partner-supported trade finance options are assessed to improve procurement flexibility and manage commercial exposure.",
              image: "/media/products/sugar/sugar-service-commercial-derisking.webp",
              imageAlt: "Working sugar production facility reviewed as part of supplier capability assessment",
            },
            {
              title: "Integrated Logistics",
              description: "Packing, documentation, booking, loading and shipment milestones are coordinated from origin through destination follow-through.",
              image: "/media/products/sugar/sugar-service-integrated-logistics.webp",
              imageAlt: "Sugarcane being transported from the field as part of the origin logistics flow",
            },
          ],
        }}
        related={sugarRelated}
        finalCta={{
          title: "For sugar enquiries",
          text:
            "Contact A3 to discuss product grade, packing, volume and destination requirements.",
          primary: { label: "Discuss a sugar requirement", href: sugarQuoteHref() },
          variant: "compact-reminder",
        }}
      />
    </>
  );
}
