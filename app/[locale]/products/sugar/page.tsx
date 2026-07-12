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

function sugarQuoteHref(product?: string) {
  const params = new URLSearchParams({ category: "sugar" });
  if (product) params.set("product", product);
  return `/en/request-a-quote?${params.toString()}`;
}

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
          { label: "Process", href: "#process-flowchart" },
          { label: "Specifications", href: "#technical-specifications" },
          { label: "Supply", href: "#shipment-options" },
          { label: "Contact", href: "#contact" },
        ]}
        productPortfolio={{
          id: "range",
          title: "Sugar grades",
          text:
            "A3 Food & Beverage supplies cane sugar from Brazil and beet sugar from Europe directly from mills for food, beverage, retail and industrial buyers.",
          items: [
            {
              id: "icumsa-45",
              title: "ICUMSA 45 / White Refined Sugar",
              cardTitle: "ICUMSA 45",
              description:
                "A refined white cane sugar for food production, beverages, retail packing and direct consumption.",
              image: "/media/products/sugar/icumsa-45.webp",
              imageAlt: "Bright white refined cane sugar crystals with cut sugar cane",
              source: "Brazil",
              fit: "Food, beverage and retail packing",
              overview:
                "ICUMSA 45 is a refined white cane sugar option for buyers that need a clean, consistent profile for food, beverage or consumer packing use.",
              keyDetails: [
                { title: "Source", description: "Brazil" },
                { title: "Sugar type", description: "Refined white cane sugar" },
                { title: "ICUMSA grade", description: "ICUMSA 45" },
                { title: "Typical uses", description: "Food manufacturing, beverages, confectionery, bakery, retail packing and direct consumption" },
                { title: "Packing", description: "Retail bags, 50 kg bags, big bags or bulk shipment can be reviewed according to buyer requirement." },
              ],
              applications: [
                "Beverage and food production",
                "Retail packing and direct consumption",
                "Confectionery and bakery programmes",
              ],
              specs: icumsa45Specs,
              packing: [
                { title: "Common packing", description: "Reviewed for retail bags, 50kg bags, big bags or bulk shipment according to buyer requirement." },
                { title: "Commercial use", description: "Suitable for ongoing supply programmes where consistent refined sugar quality and documentation are important." },
              ],
              origin: [
                { title: "Source", description: "Brazilian cane sugar supply is reviewed according to grade, volume, route and export-ready availability." },
                { title: "Route context", description: "Destination market, port and documentation requirements are checked before quotation." },
              ],
              cta: { label: "Request quote for this product", href: sugarQuoteHref("icumsa-45") },
            },
            {
              id: "icumsa-150",
              title: "ICUMSA 150 / Crystal Sugar",
              cardTitle: "ICUMSA 150",
              description:
                "A crystal cane sugar option for bakery, beverage and general food manufacturing.",
              image: "/media/products/sugar/icumsa-150.webp",
              imageAlt: "Warm white crystal cane sugar with cut sugar cane",
              source: "Brazil",
              fit: "Bakery, beverages and manufacturing",
              overview:
                "ICUMSA 150 is a crystal cane sugar option for buyers that need a practical grade for bakery, beverage and food manufacturing use.",
              keyDetails: [
                { title: "Source", description: "Brazil" },
                { title: "Sugar type", description: "Crystal cane sugar" },
                { title: "ICUMSA grade", description: "ICUMSA 150" },
                { title: "Typical uses", description: "Bakery, confectionery, beverages and general food manufacturing" },
                { title: "Packing", description: "Standard export bags, big bags or bulk formats can be reviewed according to volume and availability." },
              ],
              applications: [
                "Bakery and confectionery production",
                "Beverage production",
                "General food manufacturing",
              ],
              specs: icumsa150Specs,
              packing: [
                { title: "Packing options", description: "Packing is reviewed by route and volume, including standard export bags and bulk formats where available." },
                { title: "Programme fit", description: "A practical option for buyers balancing grade, price, application and supply availability." },
              ],
              origin: [
                { title: "Source", description: "Brazilian cane sugar availability is reviewed by ICUMSA level, supplier capability and shipment window." },
                { title: "Documentation", description: "Specification and quality documents are checked by request before moving toward quotation." },
              ],
              cta: { label: "Request quote for this product", href: sugarQuoteHref("icumsa-150") },
            },
            {
              id: "icumsa-600-1200",
              title: "ICUMSA 600-1200 / Brown Raw Sugar",
              cardTitle: "ICUMSA 600-1200",
              description:
                "A brown raw cane sugar option for industrial use, food production and further refining.",
              image: "/media/products/sugar/icumsa-600-1200.webp",
              imageAlt: "Golden raw cane sugar crystals with cut sugar cane",
              source: "Brazil",
              fit: "Industrial use and refining",
              overview:
                "ICUMSA 600-1200 is a brown raw cane sugar option for buyers that need raw or less-refined sugar for industrial use, food production or further refining.",
              keyDetails: [
                { title: "Source", description: "Brazil" },
                { title: "Sugar type", description: "Brown raw cane sugar" },
                { title: "ICUMSA range", description: "ICUMSA 600-1200" },
                { title: "Typical uses", description: "Industrial food production, raw sugar programmes, refining and large-volume use" },
                { title: "Packing", description: "Bulk-oriented export packing can be reviewed according to volume and handling requirement." },
              ],
              applications: [
                "Industrial food production",
                "Further refining",
                "Raw sugar programmes",
              ],
              specs: icumsa600Specs,
              packing: [
                { title: "Bulk-oriented route", description: "Reviewed for export packing and shipment models that fit raw sugar volume and handling requirements." },
                { title: "Commercial fit", description: "Final packing and loading model depends on destination, supplier capability and agreed volume." },
              ],
              origin: [
                { title: "Source", description: "Brazilian raw cane sugar options are reviewed according to ICUMSA range, route and shipment conditions." },
                { title: "Market fit", description: "Best suited to buyers where application and refining needs matter more than a sparkling white colour profile." },
              ],
              cta: { label: "Request quote for this product", href: sugarQuoteHref("icumsa-600-1200") },
            },
            {
              id: "icumsa-60-100",
              title: "ICUMSA 60-100 / White Beet Sugar",
              cardTitle: "ICUMSA 60-100",
              description:
                "A white beet sugar option for food production, beverages, bakery, confectionery and industrial applications.",
              image: "/media/products/sugar/icumsa-60-100.webp",
              imageAlt: "White beet sugar crystals with whole and sliced sugar beet",
              source: "Ukraine",
              fit: "Food, beverage and industrial use",
              overview:
                "ICUMSA 60-100 is a white beet sugar option for buyers reviewing beet-origin supply for food, beverage, bakery or industrial use.",
              keyDetails: [
                { title: "Source", description: "Ukraine" },
                { title: "Sugar type", description: "White beet sugar" },
                { title: "ICUMSA range", description: "ICUMSA 60-100" },
                { title: "Typical uses", description: "Food manufacturing, beverages, bakery, confectionery and industrial applications" },
                { title: "Packing", description: "Export packing can be reviewed according to volume, availability and buyer requirement." },
              ],
              applications: [
                "Food production and beverages",
                "Bakery and confectionery",
                "Industrial applications",
              ],
              specs: icumsa60Specs,
              packing: [
                { title: "Export-ready packing", description: "Packing options are reviewed according to volume, route and buyer documentation needs." },
                { title: "Supply format", description: "Suitable for programmes where white beet sugar, destination fit and document readiness are key selection points." },
              ],
              origin: [
                { title: "Source", description: "Ukrainian beet sugar options are reviewed according to availability, shipment route and market requirements." },
                { title: "Document review", description: "Specification, origin and supporting shipment documents are checked when needed for the buyer or destination." },
              ],
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
            },
            {
              title: "Brazil leads world exports",
              description: "Brazil was the world’s largest sugar exporter in calendar year 2025, accounting for approximately 59% of global sugar exports according to USDA FAS.",
            },
            {
              title: "An early role for ethanol",
              description: "The 1908 Ford Model T was designed to run on a gasoline-and-alcohol fuel mixture—an early chapter in ethanol’s history as a transport fuel.",
            },
          ],
        }}
        flowchart={{
          title: "Cane sugar production process",
          text: "From cultivation and harvest through milling, purification, crystallisation and drying, the production route prepares cane sugar for export-ready supply.",
          image: "/media/products/sugar/cane-production-flowchart.png",
          imageAlt: "Nine-step cane sugar production process from cultivation to drying",
          resource: {
            label: "Download the sugar catalogue",
            href: "/assets/a3/resources/a3-sugar-catalogue.pdf",
          },
        }}
        technicalSpecs={{
          title: "Technical specifications",
          text:
            "Compare the indicative values used to organise an initial grade discussion.",
          selectorLabel: "Select a sugar grade",
          disclaimer:
            "Indicative specifications only. Final specification, certificate of analysis and document set are confirmed with the commercial offer.",
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
          title: "From requirement to supply",
          text:
            "A3 coordinates the product, documentation, packing and route details needed to review and progress a workable sugar programme.",
          image: "/media/products/sugar/supply-v2.webp",
          imageAlt: "Plain sugar sacks and bulk bag with white and raw sugar samples",
          items: [
            {
              title: "Product and origin review",
              description: "Share the required sugar type, ICUMSA level, application and preferred origin so suitable producer options can be reviewed.",
            },
            {
              title: "Quality and documents",
              description: "Specification, COA, origin and destination document needs are checked before an offer is progressed.",
            },
            {
              title: "Packing and logistics",
              description: "Share packing, volume, destination market and port so loading format, availability and shipment routing can be reviewed together.",
            },
            {
              title: "Commercial coordination",
              description: "A3 aligns the selected grade, shipment window and commercial terms with the producer and follows the agreed route through delivery.",
            },
          ],
        }}
        services={{
          title: "Integrated Value Chain Services",
          text: "Beyond sourcing, A3 provides the professional support needed to move vital supply chains.",
          items: [
            {
              title: "Market Intelligence",
              description: "Sourcing insight and grade-specific information to support better decisions.",
            },
            {
              title: "Commercial De-risking",
              description: "Flexible financing and payment solutions designed to optimise procurement and manage costs.",
            },
            {
              title: "Integrated Logistics",
              description: "End-to-end coordination of global trade flows, managing documentation and shipping follow-up from origin to destination.",
            },
          ],
        }}
        related={[
          {
            label: "Starches & Sweeteners",
            href: "/en/products/starches-sweeteners",
            description: "Functional starches, carbohydrate ingredients, polyols and specialty sweeteners.",
            image: "/media/home/product-starches-sweeteners.webp",
            imageAlt: "Starches and sweetener ingredients",
          },
          {
            label: "Grains & Seeds",
            href: "/en/products/grains-seeds",
            description: "Wheat, maize and sunflower seed for processing and trade.",
            image: "/media/home/products/grains-seeds.webp",
            imageAlt: "Commercial grains and seeds",
          },
          {
            label: "Consumer Foods",
            href: "/en/products/consumer-foods",
            description: "Packaged food options for retail, wholesale and foodservice.",
            image: "/media/home/product-consumer-foods.webp",
            imageAlt: "Consumer food products",
          },
        ]}
        finalCta={{
          title: "For sugar enquiries",
          text:
            "Contact A3 to discuss product grade, packing, volume and destination requirements.",
          primary: { label: "Discuss a sugar requirement", href: sugarQuoteHref() },
          image: "/media/products/sugar/sugar-cane-hero.webp",
          imageAlt: "Sugar cane field and commercial sugar supply",
          tone: "ink",
        }}
      />
    </>
  );
}
