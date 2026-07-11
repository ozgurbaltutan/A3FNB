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
  { parameter: "Colour target", specification: "ICUMSA ≤45 IU; confirmed with offer" },
  { parameter: "Codex reference", specification: "White sugar polarisation ≥99.7 °Z" },
  { parameter: "Offer controls", specification: "Moisture, conductivity ash, granulation and microbiology" },
];

const icumsa150Specs = [
  { parameter: "Commercial form", specification: "Crystal cane sugar" },
  { parameter: "Colour target", specification: "ICUMSA ≤150 IU; confirmed with offer" },
  { parameter: "Codex reference", specification: "Plantation/mill white polarisation ≥99.5 °Z" },
  { parameter: "Offer controls", specification: "Moisture, conductivity ash, granulation and microbiology" },
];

const icumsa600Specs = [
  { parameter: "Commercial form", specification: "Raw or less-refined brown cane sugar" },
  { parameter: "Colour target", specification: "ICUMSA 600–1200 IU range; offer confirmed" },
  { parameter: "Processing fit", specification: "Industrial use or further refining" },
  { parameter: "Offer controls", specification: "Polarisation, moisture, ash, colour and foreign matter" },
];

const icumsa60Specs = [
  { parameter: "Commercial form", specification: "White beet sugar" },
  { parameter: "Colour target", specification: "ICUMSA 60–100 IU range; offer confirmed" },
  { parameter: "Codex reference", specification: "White sugar polarisation ≥99.7 °Z" },
  { parameter: "Offer controls", specification: "Moisture, conductivity ash, granulation and microbiology" },
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
          title: "Sugar",
          text: [
            "Refined, raw and specialty sugar supply organised around grade, origin, packing and destination requirements.",
            "A3 reviews each enquiry with established producers and coordinates the commercial, document and shipment details needed to establish a workable supply route.",
          ],
          image: "/media/products/sugar/hero-v2.webp",
          imageAlt: "White and raw sugar crystals with sugar cane and sugar beet",
          hideBreadcrumb: true,
          variant: "compact",
        }}
        sectionNavigation={[
          { label: "Overview", href: "#overview" },
          { label: "Grades", href: "#range" },
          { label: "Market context", href: "#market-context" },
          { label: "Specifications", href: "#technical-specifications" },
          { label: "Supply", href: "#shipment-options" },
          { label: "Contact", href: "#contact" },
        ]}
        keyFacts={{
          title: "Sugar market context",
          edition: "USDA FAS 2025/26 forecast and Sucden crop context · reviewed July 2026",
          items: [
            {
              value: "80%",
              description: "Of global sugar production comes from cane; the balance is primarily beet sugar.",
            },
            {
              value: "20%",
              description: "Approximate share of world sugar production derived from beet.",
            },
            {
              value: "189.3",
              label: "million metric tons",
              description: "USDA forecast global sugar production for 2025/26.",
            },
          ],
          sources: [
            {
              label: "USDA FAS Sugar: World Markets and Trade",
              href: "https://apps.fas.usda.gov/psdonline/circulars/sugar.pdf",
            },
            { label: "Sucden sugar market overview", href: "https://www.sucden.com/en/products-and-activities/sugar/" },
          ],
        }}
        productPortfolio={{
          id: "range",
          title: "Sugar grades",
          text:
            "Our sugar range covers Brazilian cane and European beet options, organised by origin, ICUMSA grade and intended application.",
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
          groups: [
            {
              id: "cane-sugar-specifications",
              title: "Brazilian Cane Sugar",
              text: "Trade colour designations organise the initial discussion; the complete producer specification is confirmed with the offer.",
              selectorLabel: "Select a cane sugar profile",
              profiles: [
                { title: "ICUMSA 45", subtitle: "White refined cane sugar", rows: icumsa45Specs },
                { title: "ICUMSA 150", subtitle: "Crystal cane sugar", rows: icumsa150Specs },
                { title: "ICUMSA 600-1200", subtitle: "Brown raw cane sugar", rows: icumsa600Specs },
              ],
            },
            {
              id: "beet-sugar-specifications",
              title: "Ukrainian Beet Sugar",
              text: "Origin, producer availability, colour, polarisation and route documents are confirmed for the offered lot.",
              selectorLabel: "Select a beet sugar profile",
              profiles: [{ title: "ICUMSA 60-100", subtitle: "White beet sugar", rows: icumsa60Specs }],
            },
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
        related={[
          { label: "Starches & Sweeteners", href: "/en/products/starches-sweeteners" },
          { label: "Grains & Seeds", href: "/en/products/grains-seeds" },
          { label: "Consumer Foods", href: "/en/products/consumer-foods" },
        ]}
        finalCta={{
          title: "For sugar enquiries",
          text:
            "Contact A3 to discuss product grade, packing, volume and destination requirements.",
          primary: { label: "Discuss a sugar requirement", href: sugarQuoteHref() },
          compact: true,
          tone: "ink",
        }}
      />
    </>
  );
}
