import type { Metadata } from "next";
import { ProductDetailLayout } from "@/components/product-detail-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { categoryCardItemBySlug } from "@/content/product-card-items";
import { breadcrumbJsonLd, buildMetadata, productFamilyJsonLd } from "@/lib/seo";
import type { PageSeo } from "@/lib/types";

const breadcrumb = [
  { label: "Home", href: "/en" },
  { label: "Products", href: "/en/products" },
  { label: "Dairy & Milk Powders", href: "/en/products/dairy-milk-powders" },
];

const dairySeo = {
  metaTitle: "Dairy Ingredients & Milk Powders | A3 Food & Beverage",
  metaDescription:
    "Source milk powders, whey, lactose, permeate, butter, cheese products and UHT milk through a specification-led dairy supply route.",
  canonicalPath: "/en/products/dairy-milk-powders",
  ogTitle: "Dairy Ingredients & Milk Powders | A3 Food & Beverage",
  ogDescription:
    "Dairy ingredients and products matched by identity, composition, application, packing and ambient or cold-chain route.",
  ogImage: {
    src: "/media/products/dairy-milk-powders/dairy-hero-pasture-stock-v1.webp",
    alt: "Holstein dairy cows grazing in a green pasture",
  },
  robots: { index: true, follow: true },
  locale: "en",
  sitemapInclude: true,
  structuredDataType: "Product",
} satisfies PageSeo;

function dairyQuoteHref(product?: string) {
  const params = new URLSearchParams({ category: "dairy-milk-powders" });
  if (product) params.set("product", product);
  return `/en/request-a-quote?${params.toString()}`;
}

const dairyRelated = ["cocoa-products", "oils-fats", "starches-sweeteners"]
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
  return buildMetadata(dairySeo);
}

export default function DairyMilkPowdersPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <JsonLd
        data={productFamilyJsonLd({
          title: "Dairy & Milk Powders",
          summary:
            "Milk powders, whey and permeate ingredients, dairy fats, cheese products and UHT milk organised by identity, composition, functionality, packing and route.",
          href: "/en/products/dairy-milk-powders",
          image: "/media/products/dairy-milk-powders/dairy-hero-pasture-stock-v1.webp",
        })}
      />
      <ProductDetailLayout
        pageTreatment="polished"
        breadcrumb={breadcrumb}
        hero={{
          title: "Connecting dairy ingredients to the products and markets that depend on them.",
          text: [
            "A3 coordinates milk powders, whey and permeate ingredients, dairy fats, cheese products and UHT milk by composition, functionality, packing and destination requirements.",
            "Product identity, application performance, plant approval, food-safety documentation and ambient or cold-chain handling are aligned before commercial commitment.",
          ],
          image: "/media/products/dairy-milk-powders/dairy-hero-pasture-stock-v1.webp",
          imageAlt: "Holstein dairy cows grazing together in a green pasture",
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
          title: "Dairy & Milk Powder Portfolio",
          text: "Eleven product routes separated by dairy identity, composition, functional performance, packing and temperature requirements.",
          cardTreatment: "category-overlay",
          filters: [
            {
              id: "milk-powders",
              label: "Milk Powders",
              itemIds: [
                "whole-milk-powder",
                "skimmed-milk-powder",
                "instant-milk-powder",
                "fat-filled-milk-powder",
              ],
            },
            {
              id: "whey-lactose-permeate",
              label: "Whey, Lactose & Permeate",
              itemIds: ["whey-powder", "lactose", "dairy-whey-permeate"],
            },
            {
              id: "dairy-products",
              label: "Dairy Products",
              itemIds: ["butter", "cheese", "cheese-analogues", "uht-milk"],
            },
          ],
          items: [
            {
              id: "whole-milk-powder",
              title: "Whole Milk Powder",
              description: "Full-fat powder for recombined dairy, beverages and foods.",
              image: "/media/products/dairy-milk-powders/whole-milk-powder-light-v3.webp",
              imageAlt: "Warm ivory whole milk powder in a bowl and stainless sample scoop",
              decisionSummary: {
                lead: "Whole milk powder combines milk fat and milk solids for recombined dairy, beverage, bakery and confectionery systems.",
                facts: [
                  { title: "Codex identity", description: "26–<42% milk fat; ≤5% water" },
                  { title: "Protein basis", description: "≥34% in milk solids-not-fat" },
                  { title: "Commercial form", description: "Regular or instant, as offered" },
                ],
                points: [
                  "Fat–protein balance and intended application",
                  "Regular or instant structure and reconstitution target",
                  "Solubility, heat profile and scorched particles",
                  "Microbiology and offer-specific COA limits",
                ],
                supply: "Lined industrial bags or big bags by offer; final specification and COA are confirmed for each lot.",
              },
              cta: { label: "Request a whole milk powder offer", href: dairyQuoteHref("whole-milk-powder") },
            },
            {
              id: "skimmed-milk-powder",
              title: "Skimmed Milk Powder",
              description: "Low-fat powder selected by heat class and application.",
              image: "/media/products/dairy-milk-powders/skimmed-milk-powder-light-v3.webp",
              imageAlt: "Bright white skimmed milk powder in a bowl and stainless sample scoop",
              decisionSummary: {
                lead: "Skimmed milk powder is chosen by heat treatment and functional behaviour as much as by basic composition.",
                facts: [
                  { title: "Codex identity", description: "≤1.5% milk fat; ≤5% water" },
                  { title: "Heat class", description: "Low, medium or high heat" },
                  { title: "Typical fit", description: "Bakery or recombined dairy" },
                ],
                points: [
                  "WPNI and declared heat class",
                  "Protein basis and any standardisation",
                  "Solubility, scorched particles and microbiology",
                  "Bakery, beverage or recombined-dairy performance",
                ],
                supply: "Lined industrial bags or big bags; heat class, specification and COA are verified by offer.",
              },
              cta: { label: "Request a skimmed milk powder offer", href: dairyQuoteHref("skimmed-milk-powder") },
            },
            {
              id: "instant-milk-powder",
              title: "Instant Milk Powder",
              description: "Agglomerated powder for faster wetting and dispersion.",
              image: "/media/products/dairy-milk-powders/instant-milk-powder-light-v3.webp",
              imageAlt: "Porous agglomerated instant milk powder granules in a bowl and scoop",
              decisionSummary: {
                lead: "Instant performance depends on the base powder, agglomeration route and any declared wetting aid.",
                facts: [
                  { title: "Base", description: "Whole or skim milk powder" },
                  { title: "Process", description: "Agglomerated; lecithinated if specified" },
                  { title: "Supply route", description: "Consumer or industrial" },
                ],
                points: [
                  "Wettability and sinkability",
                  "Dispersibility and final solubility",
                  "Agglomerate size, bulk density and flow",
                  "Lecithin status and target reconstitution method",
                ],
                supply: "Retail packs or lined industrial bags by programme; packing and instantisation are confirmed before offer.",
              },
              cta: { label: "Request an instant milk powder offer", href: dairyQuoteHref("instant-milk-powder") },
            },
            {
              id: "fat-filled-milk-powder",
              title: "Fat-Filled Milk Powder",
              description: "Dairy solids with a declared vegetable-fat system.",
              image: "/media/products/dairy-milk-powders/fat-filled-milk-powder-light-v3.webp",
              imageAlt: "Pale cream fat-filled milk powder with a small neutral oil sample",
              decisionSummary: {
                lead: "Fat-filled milk powder is a formulated product and is not presented as Codex whole milk powder.",
                facts: [
                  { title: "Product system", description: "Dairy solids + declared vegetable fat" },
                  { title: "Identity", description: "Formulated; destination naming applies" },
                  { title: "Typical fit", description: "Beverages, bakery and formulated foods" },
                ],
                points: [
                  "Vegetable-fat type, level and declaration",
                  "Emulsion quality, solubility and application test",
                  "Flavour and oxidative stability",
                  "Destination naming, ingredient and label rules",
                ],
                supply: "Lined industrial bags or big bags; composition, naming and destination acceptance are confirmed by offer.",
              },
              cta: { label: "Request a fat-filled powder offer", href: dairyQuoteHref("fat-filled-milk-powder") },
            },
            {
              id: "whey-powder",
              title: "Whey Powder",
              description: "Sweet or acid whey selected by composition and use.",
              image: "/media/products/dairy-milk-powders/whey-powder-light-v3.webp",
              imageAlt: "Warm cream whey powder beside a pale liquid whey sample",
              decisionSummary: {
                lead: "Sweet and acid whey powders have different mineral, acidity and flavour profiles that affect food applications.",
                facts: [
                  { title: "Type", description: "Sweet or acid whey" },
                  { title: "Product form", description: "Spray-dried whey powder" },
                  { title: "Typical fit", description: "Bakery, confectionery and seasoning" },
                ],
                points: [
                  "Lactose, protein, ash and pH profile",
                  "Moisture and microbiological limits",
                  "Browning and flavour contribution",
                  "Application and destination requirements",
                ],
                supply: "Lined multiwall bags or big bags; sweet/acid identity and final analytical limits are offer-specific.",
              },
              cta: { label: "Request a whey powder offer", href: dairyQuoteHref("whey-powder") },
            },
            {
              id: "lactose",
              title: "Lactose",
              description: "Crystalline milk sugar selected by assay and mesh.",
              image: "/media/products/dairy-milk-powders/lactose-light-v3.webp",
              imageAlt: "Bright white crystalline lactose granules in a clear dish and scoop",
              decisionSummary: {
                lead: "Lactose form, particle profile and use-class approval must be aligned with the destination application.",
                facts: [
                  { title: "Form", description: "Monohydrate, anhydrous or mixture" },
                  { title: "Codex assay", description: "≥99% anhydrous lactose, dry basis" },
                  { title: "Product form", description: "Crystalline ingredient" },
                ],
                points: [
                  "Assay, water and ash",
                  "Mesh distribution and bulk density",
                  "Microbiological specification",
                  "Food or other intended-use grade approval",
                ],
                supply: "Lined bags or drums by grade; use class, particle size and specification are confirmed with the producer.",
              },
              cta: { label: "Request a lactose offer", href: dairyQuoteHref("lactose") },
            },
            {
              id: "dairy-whey-permeate",
              title: "Dairy / Whey Permeate Powder",
              cardTitle: "Dairy / Whey Permeate",
              description: "Lactose-rich dairy solids selected by source and profile.",
              image: "/media/products/dairy-milk-powders/dairy-whey-permeate-light-v3.webp",
              imageAlt: "Pale cream dairy permeate powder with a stainless filtration mesh cue",
              decisionSummary: {
                lead: "Milk and whey permeates differ in nitrogen and mineral profile even when both are lactose-rich powders.",
                facts: [
                  { title: "Source", description: "Milk or whey permeate" },
                  { title: "Codex lactose", description: "≥76% anhydrous lactose" },
                  { title: "Codex moisture", description: "≤5%" },
                ],
                points: [
                  "Nitrogen, ash and mineral profile",
                  "Source and demineralisation status",
                  "Browning, flavour and salt contribution",
                  "Target solids and application performance",
                ],
                supply: "Lined bags or big bags; source, mineral profile and final specification are confirmed by offer.",
              },
              cta: { label: "Request a dairy permeate offer", href: dairyQuoteHref("dairy-whey-permeate") },
            },
            {
              id: "butter",
              title: "Butter",
              description: "Milk fat selected by salt status, format and cold chain.",
              image: "/media/products/dairy-milk-powders/butter-light-v3.webp",
              imageAlt: "Unbranded pale yellow butter blocks and a clean butter sheet",
              decisionSummary: {
                lead: "Butter identity, format and remaining shelf life are evaluated together with the controlled-temperature route.",
                facts: [
                  { title: "Product identity", description: "Exclusively milk-derived fat product" },
                  { title: "Codex composition", description: "≥80% milk fat; ≤16% water" },
                  { title: "Salt status", description: "Salted or unsalted" },
                ],
                points: [
                  "Sweet-cream or cultured route, as offered",
                  "Milk fat, moisture, salt and microbiology",
                  "Block, sheet or portion format",
                  "Cold chain and remaining shelf life at loading",
                ],
                supply: "Blocks, sheets or portions in cartons under controlled temperature; lot shelf life is confirmed before booking.",
              },
              cta: { label: "Request a butter offer", href: dairyQuoteHref("butter") },
            },
            {
              id: "cheese",
              title: "Cheese",
              description: "Natural cheese selected by variety, maturity and function.",
              image: "/media/products/dairy-milk-powders/cheese-light-v3.webp",
              imageAlt: "Natural semi-hard cheese blocks with rind, matured texture and slices",
              decisionSummary: {
                lead: "Natural cheese selection begins with variety and maturity, then tests composition, function and shipment life.",
                facts: [
                  { title: "Identity", description: "Natural cheese" },
                  { title: "Product definition", description: "Variety and maturity specified" },
                  { title: "Formats", description: "Block, slice, shred or portion" },
                ],
                points: [
                  "Fat-in-dry-matter, moisture and salt",
                  "Melt, stretch, slice or shred performance",
                  "Microbiology and remaining shelf life",
                  "Format, packing and cold-chain milestones",
                ],
                supply: "Blocks, loaves, slices, shreds or portions under cold chain; variety and lot life are offer-specific.",
              },
              cta: { label: "Request a natural cheese offer", href: dairyQuoteHref("cheese") },
            },
            {
              id: "cheese-analogues",
              title: "Cheese Analogues",
              description: "Formulated cheese-like products selected by performance.",
              image: "/media/products/dairy-milk-powders/cheese-analogues-light-v3.webp",
              imageAlt: "Uniform rindless cheese analogue block with precise slices and shreds",
              decisionSummary: {
                lead: "Cheese analogues are formulated products and are not presented as natural cheese.",
                facts: [
                  { title: "Product system", description: "Dairy and/or vegetable-fat formulation" },
                  { title: "Selection basis", description: "Application performance" },
                  { title: "Typical fit", description: "Pizza, bakery and foodservice" },
                ],
                points: [
                  "Protein, fat, starch and emulsifying system",
                  "Melt, stretch, browning and oiling-off",
                  "Destination naming and ingredient declaration",
                  "Block or shred format, temperature and shelf life",
                ],
                supply: "Blocks, slices or shreds under the required temperature route; formulation and legal name are confirmed by offer.",
              },
              cta: { label: "Request a cheese analogue offer", href: dairyQuoteHref("cheese-analogues") },
            },
            {
              id: "uht-milk",
              title: "UHT Milk",
              description: "Commercially sterile milk in an aseptic ambient pack.",
              image: "/media/products/dairy-milk-powders/uht-milk-light-v3.webp",
              imageAlt: "Plain white aseptic UHT milk cartons with a clear glass of milk",
              decisionSummary: {
                lead: "UHT milk combines the selected fat class with validated thermal processing and aseptic packaging.",
                facts: [
                  { title: "Class", description: "Whole, semi-skimmed or skimmed" },
                  { title: "Safety basis", description: "Commercial sterility" },
                  { title: "Pack", description: "Aseptic shelf-stable carton" },
                ],
                points: [
                  "Fat class and any declared fortification",
                  "Pack size, barrier structure and closure",
                  "Manufacturer-validated unopened shelf life",
                  "Ambient route and destination label approval",
                ],
                supply: "Aseptic cartons in shipping cases; pack, label, shelf life and ambient route are confirmed before commitment.",
              },
              cta: { label: "Request a UHT milk offer", href: dairyQuoteHref("uht-milk") },
            },
          ],
        }}
        editorialFacts={{
          title: "Dairy Market Context",
          text: "June 2026 price context and the 2026–2035 medium-term outlook. These published indicators are dated market context, not a live price quotation.",
          sources: [
            {
              label: "FAO Dairy Price Index",
              href: "https://www.fao.org/markets-and-trade/commodities-overview/basic-foods/fao-dairy-price-index/en",
            },
            {
              label: "OECD–FAO Agricultural Outlook 2026–2035",
              href: "https://www.oecd.org/en/publications/oecd-fao-agricultural-outlook-2026-2035_47874669-en/full-report/dairy-and-dairy-products_5e1ae8f8.html",
            },
          ],
          items: [
            {
              metric: "117.4",
              title: "Dairy prices softened in June",
              description:
                "The June 2026 FAO Dairy Price Index fell 1.5% month on month and 24.5% year on year. SMP remained firm annually while weaker Chinese demand weighed on WMP.",
            },
            {
              metric: "~50%",
              title: "Milk powders are highly trade-oriented",
              description: "Around half of world whole and skim milk powder production enters international trade.",
            },
            {
              metric: "13.7m",
              title: "Dairy trade still expands long term",
              description: "Global dairy trade is projected to reach 13.7 million tonnes in 2035, 11% above the 2023–25 base period.",
            },
          ],
        }}
        shipmentOptions={{
          id: "integrated-value-chain",
          title: "Integrated Dairy Sourcing & Supply",
          text: "Identity, technical approval, commercial structure and temperature route are handled as one connected dairy programme.",
          image: "/media/products/dairy-milk-powders/dairy-service-product-matching-stock-v1.webp",
          imageAlt: "Stainless dairy processing equipment inside a milk production facility",
          items: [
            {
              title: "Product & Application Matching",
              description:
                "We define identity, composition, function, application, volume and destination, including the distinction between natural dairy and formulated or analogue products.",
              image: "/media/products/dairy-milk-powders/dairy-service-product-matching-stock-v1.webp",
              imageAlt: "Stainless dairy processing equipment inside a milk production facility",
            },
            {
              title: "Quality, Food Safety & Plant Approval",
              description:
                "Fat, protein, heat class, solubility, microbiology and allergens are aligned with plant eligibility, specification, COA and required certifications.",
              image: "/media/products/dairy-milk-powders/dairy-service-quality-stock-v1.webp",
              imageAlt: "Laboratory technician handling samples in test tubes",
            },
            {
              title: "Commercial, Packing & Temperature Route",
              description:
                "Price basis, Incoterm, payment and packing are reviewed with ambient routing for powders or UHT and controlled-temperature routing for butter or cheese.",
              image: "/media/products/dairy-milk-powders/dairy-service-route-stock-v1.webp",
              imageAlt: "Clean food storage room illustrating controlled-temperature handling",
            },
            {
              title: "Documentation & Shipment Coordination",
              description:
                "COA, health and origin documents, Halal or destination documents where required, labels, booking, loading and temperature milestones are coordinated.",
              image: "/media/products/dairy-milk-powders/dairy-service-shipment-stock-v1.webp",
              imageAlt: "Cargo vessel and containers at a commercial shipping terminal",
            },
          ],
        }}
        related={dairyRelated}
        finalCta={{
          title: "For dairy & milk powder enquiries",
          text: "Share the product, application, composition target, packing, volume, destination, temperature route and shipment window with A3.",
          primary: { label: "Discuss a dairy requirement", href: dairyQuoteHref() },
          variant: "compact-reminder",
        }}
      />
    </>
  );
}
