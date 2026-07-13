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
          imageAlt: "Sugar sourcing category for commercial buyers",
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
          image: "/media/products/sugar/hero-v2.webp",
          imageAlt: "White and raw sugar crystals with sugar cane and sugar beet",
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
            "A3 supplies cane sugar from Brazil and beet sugar from Europe for food, beverage, retail and industrial buyers.",
          cardTreatment: "category-overlay",
          modalTreatment: "decision-summary",
          items: [
            {
              id: "icumsa-45",
              title: "ICUMSA 45 / White Refined Sugar",
              cardTitle: "ICUMSA 45",
              description:
                "A refined white cane sugar for food production, beverages, retail packing and direct consumption.",
              image: "/media/products/sugar/icumsa-45-v3.png",
              imageAlt: "Bright white refined cane sugar crystals with cut sugar cane",
              source: "Brazil",
              fit: "Food, beverage and retail packing",
              overview:
                "ICUMSA 45 is a refined white cane sugar option for buyers that need a clean, consistent profile for food, beverage or consumer packing use.",
              bestFit: "Choose this low-colour refined grade when the finished product needs a clean visual profile, neutral sweetness and consistent performance in direct food use.",
              profile: [
                { title: "Feedstock", description: "Sugar cane" },
                { title: "Processing", description: "Refined white sugar" },
                { title: "Origin", description: "Brazil, subject to mill availability" },
                { title: "Trade designation", description: "ICUMSA 45" },
              ],
              applications: [
                "Clear and light-coloured beverages",
                "Confectionery and bakery programmes",
                "Retail packing and direct consumption",
                "General food manufacturing where colour matters",
              ],
              supplyFormats: ["Retail or private-label formats, subject to programme", "25–50 kg export bags", "Big bags or bulk routes where supplier and destination allow"],
              documentPackage: "Supplier specification and COA are reviewed with origin, packing, labelling and destination-document requirements before the commercial offer is finalised.",
              specs: icumsa45Specs,
              cta: { label: "Request quote for this product", href: sugarQuoteHref("icumsa-45") },
            },
            {
              id: "icumsa-150",
              title: "ICUMSA 150 / Crystal Sugar",
              cardTitle: "ICUMSA 150",
              description:
                "A crystal cane sugar option for bakery, beverage and general food manufacturing.",
              image: "/media/products/sugar/icumsa-150-v3.png",
              imageAlt: "Warm white crystal cane sugar with cut sugar cane",
              source: "Brazil",
              fit: "Bakery, beverages and manufacturing",
              overview:
                "ICUMSA 150 is a crystal cane sugar option for buyers that need a practical grade for bakery, beverage and food manufacturing use.",
              bestFit: "Choose this general-purpose white/crystal cane sugar when application fit, dependable supply and commercial value matter more than the very lowest colour class.",
              profile: [
                { title: "Feedstock", description: "Sugar cane" },
                { title: "Processing", description: "White crystal sugar" },
                { title: "Origin", description: "Brazil, subject to availability" },
                { title: "Trade designation", description: "ICUMSA 150" },
              ],
              applications: [
                "Bakery and confectionery production",
                "Beverage production",
                "General food manufacturing",
                "Foodservice and ingredient distribution",
              ],
              supplyFormats: ["Standard export bags", "Big bags for industrial handling", "Bulk formats where available and route-compatible"],
              documentPackage: "Supplier TDS and COA are matched with origin, packing, shipping and destination requirements at offer stage.",
              specs: icumsa150Specs,
              cta: { label: "Request quote for this product", href: sugarQuoteHref("icumsa-150") },
            },
            {
              id: "icumsa-600-1200",
              title: "ICUMSA 600-1200 / Brown Raw Sugar",
              cardTitle: "ICUMSA 600-1200",
              description:
                "A brown raw cane sugar option for industrial use, food production and further refining.",
              image: "/media/products/sugar/icumsa-600-1200-v3.png",
              imageAlt: "Golden raw cane sugar crystals with cut sugar cane",
              source: "Brazil",
              fit: "Industrial use and refining",
              overview:
                "ICUMSA 600-1200 is a brown raw cane sugar option for buyers that need raw or less-refined sugar for industrial use, food production or further refining.",
              bestFit: "Choose this raw/VHP range for refining, bulk industrial programmes or applications where a darker cane profile is acceptable and refined-white appearance is not the primary requirement.",
              profile: [
                { title: "Feedstock", description: "Sugar cane" },
                { title: "Processing", description: "Raw or VHP cane sugar" },
                { title: "Origin", description: "Brazil, subject to crop and mill availability" },
                { title: "Trade designation", description: "ICUMSA 600–1200" },
              ],
              applications: [
                "Further refining",
                "Bulk industrial food production",
                "Raw sugar programmes",
                "Applications accepting a stronger cane colour profile",
              ],
              supplyFormats: ["Bulk-oriented export programmes", "Large bags where available", "Packing and loading model confirmed against handling and route"],
              documentPackage: "The offered mill TDS and lot COA govern polarisation, moisture and ash values; origin, phytosanitary or destination documents are confirmed by route.",
              specs: icumsa600Specs,
              cta: { label: "Request quote for this product", href: sugarQuoteHref("icumsa-600-1200") },
            },
            {
              id: "icumsa-60-100",
              title: "ICUMSA 60-100 / White Beet Sugar",
              cardTitle: "ICUMSA 60-100",
              description:
                "A white beet sugar option for food production, beverages, bakery, confectionery and industrial applications.",
              image: "/media/products/sugar/icumsa-60-100-v3.png",
              imageAlt: "White beet sugar crystals with whole and sliced sugar beet",
              source: "European options, subject to availability",
              fit: "Food, beverage and industrial use",
              overview:
                "ICUMSA 60-100 is a white beet sugar option for buyers reviewing beet-origin supply for food, beverage, bakery or industrial use.",
              bestFit: "Choose this option when beet feedstock or a European supply route is commercially relevant and a white sugar profile is required.",
              profile: [
                { title: "Feedstock", description: "Sugar beet" },
                { title: "Processing", description: "White beet sugar" },
                { title: "Origin", description: "European options, subject to availability" },
                { title: "Trade designation", description: "ICUMSA 60–100" },
              ],
              applications: [
                "Food production and beverages",
                "Bakery and confectionery",
                "Industrial applications",
                "Retail and foodservice packing programmes",
              ],
              supplyFormats: ["Standard export bags", "Big bags where available", "Retail or private-label formats subject to supplier capability"],
              documentPackage: "Supplier specification and COA are reviewed alongside origin, labelling, packing and destination documentation before offer confirmation.",
              specs: icumsa60Specs,
              cta: { label: "Request quote for this product", href: sugarQuoteHref("icumsa-60-100") },
            },
          ],
        }}
        editorialFacts={{
          title: "Sugar key facts",
          text: "A few milestones that show the scale and wider role of sugar in global trade and industry.",
          items: [
            {
              title: "A global food commodity",
              description: "USDA forecasts world sugar production at more than 189 million metric tons for 2025/26, reflecting the scale of supply required across food, beverage and industrial markets.",
              slot: "primary",
              tone: "dark",
            },
            {
              title: "Brazil leads world exports",
              description: "Brazil was the world’s largest sugar exporter in calendar year 2025, accounting for approximately 59% of global sugar exports according to USDA FAS.",
              slot: "secondary-top",
              tone: "sage",
            },
            {
              title: "Sugar and early fuel research",
              description: "The Model T was introduced in 1908 and could run on different fuels, including alcohol. In the 1910s, Ford also investigated fuels made from sugar and other agricultural products.",
              slot: "secondary-bottom",
              tone: "warm",
            },
          ],
        }}
        technicalSpecs={{
          title: "Technical specifications",
          text:
            "Compare the indicative values used to organise an initial grade discussion.",
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
            "A3 aligns the right sugar grade and producer with commercial terms, market requirements and delivery from origin to destination.",
          image: "/media/home/process-define-requirement-v3.webp",
          imageAlt: "Food commodity lots and packing formats arranged in a working warehouse",
          items: [
            {
              title: "Define the requirement",
              description: "Intended use, ICUMSA grade, origin preference, packing, volume and destination are converted into a clear sugar sourcing brief.",
              image: "/media/home/process-define-requirement-v3.webp",
              imageAlt: "Food commodity lots, sacks and packing formats arranged in a working warehouse",
            },
            {
              title: "Source & match",
              description: "Available sugar grades, origins and producer routes are compared against the brief and destination market.",
              image: "/media/home/process-source-match-v3.webp",
              imageAlt: "Rows of stacked commodity sacks in an export warehouse",
            },
            {
              title: "Qualify & structure",
              description: "Capacity, product fit, price basis, Incoterms, payment structure and timing are assessed together.",
              image: "/media/home/process-qualify-structure-v3.webp",
              imageAlt: "Palletised food commodity cargo prepared for international shipment",
            },
            {
              title: "Prepare & document",
              description: "Samples, specifications, certificates, labels and import–export documents are matched to destination requirements.",
              image: "/media/home/process-prepare-document-v3.webp",
              imageAlt: "Commodity samples, document sleeves, inspection labels and a cargo seal",
            },
            {
              title: "Pack & load",
              description: "Packing format, palletisation, container requirements and loading readiness are coordinated before dispatch.",
              image: "/media/home/process-pack-load-v3.webp",
              imageAlt: "Palletised food commodity sacks being loaded into a shipping container",
            },
            {
              title: "Move & follow through",
              description: "Booking, shipment milestones, logistics and agreed delivery conditions are followed through to destination.",
              image: "/media/home/process-move-follow-v3.webp",
              imageAlt: "International container ship moving through a working commercial port",
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
