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
  { parameter: "Moisture", specification: "0.04% Max." },
  { parameter: "Ash Content", specification: "0.04% Max." },
  { parameter: "Polarization", specification: "99.8\u00b0 Min." },
  { parameter: "Solubility", specification: "100% Dry and Free Flow" },
  { parameter: "Radiation", specification: "Normal Certified" },
  { parameter: "Color", specification: "Sparkling White" },
  { parameter: "Granulation", specification: "Fine" },
];

const icumsa150Specs = [
  { parameter: "Moisture", specification: "0.10% Max." },
  { parameter: "Ash Content", specification: "0.10% Max." },
  { parameter: "Polarization", specification: "99.5\u00b0 Min." },
  { parameter: "Solubility", specification: "100% Dry and Free Flow" },
  { parameter: "Radiation", specification: "Normal Certified" },
  { parameter: "Color", specification: "Sparkling White" },
  { parameter: "Granulation", specification: "Fine" },
];

const icumsa600Specs = [
  { parameter: "Moisture", specification: "0.15% Max." },
  { parameter: "Ash Content", specification: "0.15% Max." },
  { parameter: "Polarization", specification: "97.8\u00b0 to 99.2\u00b0" },
  { parameter: "Solubility", specification: "95% Dry and Free Flow" },
  { parameter: "Radiation", specification: "Normal Certified" },
  { parameter: "Color", specification: "Brown" },
  { parameter: "Granulation", specification: "6 mm regular size" },
];

const icumsa60Specs = [
  { parameter: "Moisture", specification: "0.06% Max." },
  { parameter: "Ash Content", specification: "0.08% Max." },
  { parameter: "Polarization", specification: "99.8\u00b0 Min." },
  { parameter: "Solubility", specification: "100% Dry and Free Flow" },
  { parameter: "Radiation", specification: "Normal Certified" },
  { parameter: "Color", specification: "White at 20\u00b0" },
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
          title: "Sugar",
          text: [
            "From industrial food production to retail packaging, sugar remains one of the world's most widely traded food commodities. We supply refined, raw and specialty sugar for a wide range of applications, working with established producers to deliver consistent quality, reliable availability and commercial terms that fit each programme.",
            "Whether you require container loads, ongoing supply contracts or product specifications tailored to your market, we help connect demand with dependable production across international supply chains.",
          ],
          image: "/media/products/sugar/sugar-cane-hero.webp",
          imageAlt: "Cut sugar cane with sugar crystals",
          hideBreadcrumb: true,
          variant: "compact",
        }}
        keyFacts={{
          title: "Sugar key facts",
          edition: "Market figures: USDA FAS, May 2026 · 2026/27 forecast",
          items: [
            {
              value: "8,000",
              label: "BC",
              description: "Sugar cane was first domesticated around this time, probably in New Guinea.",
            },
            {
              value: "80%",
              description: "Of the world’s sugar comes from sugar cane; 20% comes from sugar beet.",
            },
            {
              value: "184.9",
              label: "million metric tons",
              description: "Forecast global sugar production for 2026/27.",
            },
            {
              value: "About 54%",
              description: "Brazil’s forecast share of global sugar exports for 2026/27—33.6 million of 62.3 million metric tons.",
            },
            {
              value: "1908",
              description: "The Ford Model T could run on ethanol, gasoline, or a blend of the two.",
            },
          ],
          sources: [
            {
              label: "USDA FAS Sugar: World Markets and Trade",
              href: "https://apps.fas.usda.gov/psdonline/circulars/sugar.pdf",
            },
            {
              label: "U.S. Department of Energy Bioenergy Technologies Office",
              href: "https://www.energy.gov/sites/prod/files/2015/03/f20/beto_coloring_activity_book.pdf",
            },
            {
              label: "USDA ERS Ethanol’s Evolving Role",
              href: "https://ers.usda.gov/sites/default/files/_laserfiche/outlooks/37284/33109_ius1d_002.pdf",
            },
          ],
        }}
        productPortfolio={{
          id: "range",
          title: "Sugar portfolio",
          text:
            "We source high-quality Brazilian cane sugar and European beet sugar by origin and specific ICUMSA grade. Every supply option is rigorously assessed to ensure it meets the technical standards required by food manufacturers, primary processors, and industrial consumers worldwide.",
          items: [
            {
              id: "icumsa-45",
              title: "ICUMSA 45 / White Refined Sugar",
              cardTitle: "ICUMSA 45",
              description:
                "A refined white cane sugar for food production, beverages, retail packing and direct consumption.",
              image: "/media/products/sugar/white-sugar-cubes.webp",
              imageAlt: "White refined sugar crystals with confectionery pieces",
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
              cta: { label: "Request this grade", href: sugarQuoteHref("icumsa-45") },
            },
            {
              id: "icumsa-150",
              title: "ICUMSA 150 / Crystal Sugar",
              cardTitle: "ICUMSA 150",
              description:
                "A crystal cane sugar option for bakery, beverage and general food manufacturing.",
              image: "/media/products/sugar/raw-sugar-bowl.webp",
              imageAlt: "Crystal sugar in a wooden bowl",
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
              cta: { label: "Request this grade", href: sugarQuoteHref("icumsa-150") },
            },
            {
              id: "icumsa-600-1200",
              title: "ICUMSA 600-1200 / Brown Raw Sugar",
              cardTitle: "ICUMSA 600-1200",
              description:
                "A brown raw cane sugar option for industrial use, food production and further refining.",
              image: "/media/products/sugar/sugarcane-field.webp",
              imageAlt: "Sugar cane field for raw sugar production",
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
              cta: { label: "Request this grade", href: sugarQuoteHref("icumsa-600-1200") },
            },
            {
              id: "icumsa-60-100",
              title: "ICUMSA 60-100 / White Beet Sugar",
              cardTitle: "ICUMSA 60-100",
              description:
                "A white beet sugar option for food production, beverages, bakery, confectionery and industrial applications.",
              image: "/media/products/sugar/beet-sugar-bowl.webp",
              imageAlt: "White beet sugar in a bowl with beet root",
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
              cta: { label: "Request this grade", href: sugarQuoteHref("icumsa-60-100") },
            },
          ],
        }}
        technicalSpecs={{
          title: "Technical specifications",
          text:
            "The main sugar grade values for comparison before requesting a quotation.",
          profiles: [
            { title: "ICUMSA 45", subtitle: "White refined cane sugar", rows: icumsa45Specs },
            { title: "ICUMSA 150", subtitle: "Crystal cane sugar", rows: icumsa150Specs },
            { title: "ICUMSA 600-1200", subtitle: "Brown raw cane sugar", rows: icumsa600Specs },
            { title: "ICUMSA 60-100", subtitle: "White beet sugar", rows: icumsa60Specs },
          ],
        }}
        shipmentOptions={{
          title: "From grade to workable supply",
          text:
            "A3 connects cane and beet sugar supply with grade-specific market insight, flexible commercial support and end-to-end coordination from origin to final delivery.",
          image: "/media/products/sugar/sugar-big-bags-warehouse.webp",
          imageAlt: "Sugar big bags prepared in a warehouse",
          items: [
            {
              title: "Market intelligence",
              description: "Sourcing insight and grade-specific information to support better procurement decisions.",
            },
            {
              title: "Commercial de-risking",
              description: "Flexible financing and payment solutions designed to optimise procurement and manage costs.",
            },
            {
              title: "Packing options",
              description: "Review retail bags, 50kg bags, big bags or bulk needs according to grade, destination and loading model.",
            },
            {
              title: "Volume and loading",
              description: "Share expected monthly or one-off volume, timing and preferred loading format so workable supply can be checked.",
            },
            {
              title: "Route and integrated logistics",
              description: "Share the destination market and port so availability, route and end-to-end shipment coordination can be reviewed.",
            },
            {
              title: "Documents and shipment follow-up",
              description: "Specification, COA, origin and shipment documents are checked by request, with follow-up from loading through delivery.",
            },
          ],
        }}
        related={[
          { label: "Starches & Sweeteners", href: "/en/products/starches-sweeteners" },
          { label: "Grains & Seeds", href: "/en/products/grains-seeds" },
          { label: "Consumer Foods", href: "/en/products/consumer-foods" },
        ]}
        finalCta={{
          title: "Send sugar requirement",
          text:
            "Share the sugar type, ICUMSA level, packing, volume and destination market. A3 will review the requirement and respond with a workable supply route.",
          primary: { label: "Send Sugar Requirement", href: sugarQuoteHref() },
          image: "/media/products/sugar/beet-sugar-bowl.webp",
          imageAlt: "White sugar in a bowl with beet sugar root",
        }}
      />
    </>
  );
}
