import type { Metadata } from "next";
import { ProductDetailLayout } from "@/components/product-detail-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { categoryCardItemBySlug } from "@/content/product-card-items";
import { pages } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata, productFamilyJsonLd } from "@/lib/seo";

const breadcrumb = [
  { label: "Home", href: "/en" },
  { label: "Products", href: "/en/products" },
  { label: "Fats & Oils", href: "/en/products/oils-fats" },
];

function oilsQuoteHref(product?: string) {
  const params = new URLSearchParams({ category: "oils-fats" });
  if (product) params.set("product", product);
  return `/en/request-a-quote?${params.toString()}`;
}

const oilsRelated = ["dairy-milk-powders", "frozen-foods", "consumer-foods"]
  .map(categoryCardItemBySlug)
  .filter((item): item is NonNullable<typeof item> => Boolean(item))
  .map((item) => ({
    label: item.title,
    href: item.href,
    description: item.description,
    image: item.image,
    imageAlt: item.imageAlt,
  }));

export function generateMetadata(): Metadata {
  return buildMetadata(pages.oils.seo);
}

export default function OilsFatsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <JsonLd
        data={productFamilyJsonLd({
          title: "Fats & Oils",
          summary: pages.oils.description,
          href: "/en/products/oils-fats",
          image: "/media/products/oils-fats/oils-fats-hero-stock-v1.webp",
        })}
      />
      <ProductDetailLayout
        pageTreatment="polished"
        breadcrumb={breadcrumb}
        hero={{
          title: "Connecting global oil crops to the industries that depend on them.",
          text: [
            "A3 coordinates sunflower, corn, olive and palm-based oil supply alongside margarines and functional fats, matching product identity, processing route, application, packing and destination.",
            "Quality profile, certification needs, temperature handling, tank or pack format, documentation and shipment requirements are aligned before commercial commitment.",
          ],
          image: "/media/products/oils-fats/oils-fats-hero-stock-v1.webp",
          imageAlt: "Wide sunflower field extending toward a muted summer horizon",
          hideBreadcrumb: true,
          variant: "compact",
        }}
        sectionNavigation={[
          { label: "Overview", href: "#overview" },
          { label: "Products", href: "#range" },
          { label: "Market context", href: "#key-facts" },
          { label: "Services", href: "#integrated-value-chain" },
          { label: "Contact", href: "#contact" },
        ]}
        productPortfolio={{
          id: "range",
          title: "Fats & Oils Portfolio",
          text: "Eight commercial routes separated by oil identity, refining or fractionation status, functional performance, delivery form and end use.",
          cardTreatment: "category-overlay",
          modalTreatment: "decision-summary",
          items: [
            {
              id: "sunflower-oil",
              title: "Sunflower Oil",
              description: "Standard or high-oleic sunflower oil for retail, frying and manufacturing.",
              image: "/media/products/oils-fats/sunflower-oil-light-v3.webp",
              imageAlt: "Pale golden sunflower oil with sunflower seeds presented as a commercial sample",
              decisionSummary: {
                lead: "Oil profile and refining status determine flavour, oxidative stability and application fit.",
                facts: [
                  { title: "Oil profile", description: "Standard or high-oleic by offer" },
                  { title: "Processing route", description: "Crude or refined" },
                  { title: "High-oleic reference", description: "Codex reference: at least 75% oleic acid" },
                ],
                points: [
                  "Fatty-acid profile",
                  "FFA, peroxide value, colour and odour",
                  "Oxidation stability",
                  "Pack format and destination",
                ],
                supply: "Retail packs, jerrycans, drums, IBC, flexitank or bulk, subject to the offered route.",
              },
              cta: { label: "Request a sunflower oil offer", href: oilsQuoteHref("sunflower-oil") },
            },
            {
              id: "corn-maize-oil",
              title: "Corn / Maize Oil",
              description: "Maize-germ oil for retail, foodservice and food manufacturing.",
              image: "/media/products/oils-fats/corn-maize-oil-light-v1.webp",
              imageAlt: "Clear pale-gold maize-germ oil with corn kernels presented as a commercial sample",
              decisionSummary: {
                lead: "Refining, clarity and sensory neutrality shape the commercial fit of maize-germ oil.",
                facts: [
                  { title: "Source", description: "Derived from maize germ" },
                  { title: "Processing route", description: "Crude or refined" },
                  { title: "Physical form", description: "Liquid vegetable oil" },
                ],
                points: [
                  "Identity profile",
                  "FFA and peroxide value",
                  "Colour, clarity and odour",
                  "Application and pack format",
                ],
                supply: "Retail packs, drums, IBC, flexitank or bulk by volume and route.",
              },
              cta: { label: "Request a corn or maize oil offer", href: oilsQuoteHref("corn-maize-oil") },
            },
            {
              id: "olive-oil",
              title: "Olive Oil",
              description: "Olive oil selected by grade, origin, sensory profile and pack.",
              image: "/media/products/oils-fats/olive-oil-light-v1.webp",
              imageAlt: "Green-gold olive oil with olives and leaves presented as a commercial sample",
              decisionSummary: {
                lead: "Virgin, refined and blended olive-oil categories are distinct commercial identities and are not interchangeable.",
                facts: [
                  { title: "Source", description: "Obtained from olive fruit" },
                  { title: "Commercial identity", description: "Category confirmed by offer" },
                  { title: "Review basis", description: "Analytical and sensory review where applicable" },
                ],
                points: [
                  "Declared category and acidity",
                  "Authenticity and analytical profile",
                  "Origin and harvest",
                  "Light- and oxygen-compatible packing",
                ],
                supply: "Glass, PET, tins, drums, IBC or bulk according to category and programme.",
              },
              cta: { label: "Request an olive oil offer", href: oilsQuoteHref("olive-oil") },
            },
            {
              id: "palm-oil",
              title: "Palm Oil",
              description: "Crude or refined palm oil for manufacturing and fat formulation.",
              image: "/media/products/oils-fats/palm-oil-light-v1.webp",
              imageAlt: "Golden-orange semi-solid palm oil presented as a commercial sample",
              decisionSummary: {
                lead: "Palm oil is the parent oil; palm olein is its separately traded liquid fraction.",
                facts: [
                  { title: "Source", description: "Obtained from oil-palm fruit mesocarp" },
                  { title: "Processing route", description: "Crude or refined" },
                  { title: "Physical behaviour", description: "Semi-solid behaviour depends on temperature" },
                ],
                points: [
                  "FFA, peroxide value and colour",
                  "Melting profile",
                  "Intended formulation",
                  "Certification where required",
                ],
                supply: "Drums, lined cartons, flexitank or heated bulk with route-compatible handling.",
              },
              cta: { label: "Request a palm oil offer", href: oilsQuoteHref("palm-oil") },
            },
            {
              id: "palm-olein",
              title: "Palm Olein",
              description: "Liquid palm fraction for frying and liquid-oil applications.",
              image: "/media/products/oils-fats/palm-olein-light-v1.webp",
              imageAlt: "Clear golden liquid palm olein presented as a commercial sample",
              decisionSummary: {
                lead: "Fractionation creates palm olein; iodine value, cloud behaviour and grade determine handling and use.",
                facts: [
                  { title: "Product identity", description: "Liquid fraction of palm oil" },
                  { title: "Grade", description: "Standard or superolein by offer" },
                  { title: "Physical form", description: "Liquid within the planned temperature route" },
                ],
                points: [
                  "Iodine value and cloud point",
                  "Oxidation controls",
                  "Frying stability",
                  "Crystallisation risk during storage",
                ],
                supply: "PET, jerrycans, drums, flexitank or bulk with temperature planning where required.",
              },
              cta: { label: "Request a palm olein offer", href: oilsQuoteHref("palm-olein") },
            },
            {
              id: "margarines",
              title: "Margarines",
              description: "Table, cooking and industrial margarines selected by function.",
              image: "/media/products/oils-fats/margarines-light-v1.webp",
              imageAlt: "Pale yellow margarine blocks presented as an unbranded commercial sample",
              decisionSummary: {
                lead: "Margarine selection begins with product identity and fat content, then tests texture, melt and emulsion stability.",
                facts: [
                  { title: "Product form", description: "Plastic or fluid fat-and-water emulsion" },
                  { title: "Commercial identity", description: "Margarine or fat spread confirmed by offer" },
                  { title: "Formats", description: "Tub, brick, sheet or block" },
                ],
                points: [
                  "Fat, water and salt composition",
                  "Plasticity and spreadability",
                  "Melting behaviour and flavour",
                  "Label and certification needs",
                ],
                supply: "Retail tubs or bricks, sheets, blocks or industrial cartons under the formulation-compatible route.",
              },
              cta: { label: "Request a margarine offer", href: oilsQuoteHref("margarines") },
            },
            {
              id: "bakery-pastry-fats",
              title: "Bakery & Pastry Fats",
              description: "Functional fats for lamination, creaming, shortening and fillings.",
              image: "/media/products/oils-fats/bakery-pastry-fats-light-v1.webp",
              imageAlt: "Bakery-fat sheet and shortening blocks presented as commercial ingredient samples",
              decisionSummary: {
                lead: "The required process and working temperature matter more than a generic fat name.",
                facts: [
                  { title: "Product type", description: "Application-specific formulated fat" },
                  { title: "Physical form", description: "Block, sheet, flake or shortening" },
                  { title: "Formulation", description: "Supplier-specific and confirmed by offer" },
                ],
                points: [
                  "Solid-fat and melting profile",
                  "Plasticity window",
                  "Aeration or layering performance",
                  "Hydrogenation or trans-fat declaration and destination rules",
                ],
                supply: "Sheets, lined cartons or pails under the temperature conditions required by the formulation.",
              },
              cta: { label: "Request a bakery or pastry fat offer", href: oilsQuoteHref("bakery-pastry-fats") },
            },
            {
              id: "specialty-fats",
              title: "Specialty Fats",
              description: "Tailored fat systems for confectionery, coatings and dairy alternatives.",
              image: "/media/products/oils-fats/specialty-fats-light-v1.webp",
              imageAlt: "Specialty fat blocks, flakes and liquid sample presented as technical ingredients",
              decisionSummary: {
                lead: "Compatibility and crystallisation behaviour must be matched to the complete fat phase of the recipe.",
                facts: [
                  { title: "Fat system", description: "Lauric, non-lauric or another system by offer" },
                  { title: "Applications", description: "Coating, filling or confectionery" },
                  { title: "Physical form", description: "Block, flake or liquid" },
                ],
                points: [
                  "Melting curve and crystallisation",
                  "Fat-system compatibility",
                  "Texture and heat resistance",
                  "Declaration and certification requirements",
                ],
                supply: "Lined cartons, bags, drums, IBC or heated bulk according to product behaviour.",
              },
              cta: { label: "Request a specialty fat offer", href: oilsQuoteHref("specialty-fats") },
            },
          ],
        }}
        editorialFacts={{
          title: "Fats & Oils Market Context",
          text: "2026/27 forecast — July 2026. USDA projections provide dated market context and are not a live price indicator.",
          sources: [
            {
              label: "USDA Oilseeds: World Markets and Trade",
              href: "https://apps.fas.usda.gov/psdonline/circulars/oilseeds.pdf",
            },
          ],
          items: [
            {
              metric: "244.7m",
              title: "Global vegetable-oil output expands again",
              description: "USDA forecasts 244.67 million tonnes of major vegetable oils, 2.6% above the 2025/26 estimate of 238.48 million tonnes.",
            },
            {
              metric: "≈50%",
              title: "Palm oil anchors global trade",
              description: "Palm oil accounts for 45.66 million tonnes of the 92.00 million-tonne export forecast—just under half of global major vegetable-oil exports.",
            },
            {
              metric: "23.6m",
              title: "Sunflower oil rebounds",
              description: "Production is forecast at 23.59 million tonnes, 11.7% above the 2025/26 estimate of 21.12 million tonnes; exports are forecast at 15.62 million tonnes.",
            },
          ],
        }}
        shipmentOptions={{
          id: "integrated-value-chain",
          title: "Integrated Fats & Oils Sourcing",
          text: "Product identity, technical approval, pack or tank model and shipment execution are handled as one connected supply route.",
          image: "/media/products/oils-fats/oils-service-product-matching-stock-v1.webp",
          imageAlt: "Farmer assessing sunflower heads in a field",
          items: [
            {
              title: "Product, Process & Application Matching",
              description: "We define the named oil or fat, crude, refined, fractionated or formulated route, intended use, volume, destination and required commercial form.",
              image: "/media/products/oils-fats/oils-service-product-matching-stock-v1.webp",
              imageAlt: "Farmer assessing sunflower heads in a field",
            },
            {
              title: "Quality, Safety & Certification",
              description: "Identity profile, FFA, peroxide value, colour, odour, moisture or impurities, melting or cloud behaviour, food-safety documents and offer-specific certifications are aligned as relevant.",
              image: "/media/products/oils-fats/oils-service-quality-stock-v1.webp",
              imageAlt: "Gloved laboratory technician reviewing an amber oil sample in a beaker",
            },
            {
              title: "Packing, Tank & Temperature Route",
              description: "Retail, foodservice and industrial packs, drums, IBC, flexitank or heated bulk are reviewed with oxygen, light, cleanliness, previous-cargo and temperature controls.",
              image: "/media/products/oils-fats/oils-service-route-stock-v1.webp",
              imageAlt: "Stainless-steel tanks and pipework inside an industrial processing plant",
            },
            {
              title: "Documentation & Shipment Coordination",
              description: "Specification or COA, origin, certification and destination documents, labels, booking, loading and delivery milestones are coordinated with the commercial terms.",
              image: "/media/products/oils-fats/oils-service-shipment-stock-v1.webp",
              imageAlt: "Commercial port with cargo terminals, storage tanks and loading infrastructure",
            },
          ],
        }}
        related={oilsRelated}
        finalCta={{
          title: "For fats & oils enquiries",
          text: "Share the oil or fat, processing route or application, quality target, pack or tank model, volume, destination and shipment window with A3.",
          primary: { label: "Discuss a fats & oils requirement", href: oilsQuoteHref() },
          variant: "compact-reminder",
        }}
      />
    </>
  );
}
