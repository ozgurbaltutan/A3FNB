import type { Metadata } from "next";
import { ProductDetailLayout } from "@/components/product-detail-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { categoryCardItemBySlug } from "@/content/product-card-items";
import { pages } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata, productFamilyJsonLd } from "@/lib/seo";

const breadcrumb = [
  { label: "Home", href: "/en" },
  { label: "Products", href: "/en/products" },
  { label: "Cocoa Products", href: "/en/products/cocoa-products" },
];

function cocoaQuoteHref(product?: string) {
  const params = new URLSearchParams({ category: "cocoa-products" });
  if (product) params.set("product", product);
  return `/en/request-a-quote?${params.toString()}`;
}

const cocoaRelated = ["sugar", "dairy-milk-powders", "oils-fats"]
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
  return buildMetadata(pages.cocoa.seo);
}

export default function CocoaProductsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <JsonLd
        data={productFamilyJsonLd({
          title: "Cocoa Products",
          summary: pages.cocoa.description,
          href: "/en/products/cocoa-products",
          image: "/media/products/cocoa-products/cocoa-hero-stock-v2.webp",
        })}
      />
      <ProductDetailLayout
        pageTreatment="polished"
        breadcrumb={breadcrumb}
        hero={{
          title: "Connecting cocoa origins to modern production.",
          text: [
            "A3 acts as an independent partner in global cocoa trade, connecting origin supply and processor capability with the technical and commercial requirements of food manufacturers.",
            "From origin sourcing and technical processing to documentation, packing and final delivery, we coordinate the value chain to provide “cocoa as it is” for demanding applications.",
          ],
          image: "/media/products/cocoa-products/cocoa-hero-stock-v2.webp",
          imageAlt: "Ripe cocoa pods growing on a cocoa tree in a tropical farm landscape",
          hideBreadcrumb: true,
          variant: "compact",
        }}
        sectionNavigation={[
          { label: "Overview", href: "#overview" },
          { label: "Cocoa products", href: "#range" },
          { label: "Origins", href: "#origins" },
          { label: "Key facts", href: "#key-facts" },
          { label: "Services", href: "#integrated-value-chain" },
          { label: "Contact", href: "#contact" },
        ]}
        productPortfolio={{
          id: "range",
          title: "Cocoa Products Portfolio",
          text: "Four commercial routes matched to the buyer's processing capability, formulation, technical specification and finished-product objective.",
          cardTreatment: "category-overlay",
          modalTreatment: "decision-summary",
          items: [
            {
              id: "cocoa-beans",
              title: "Cocoa Beans",
              description: "Fermented and dried cocoa beans for chocolate and cocoa processing.",
              image: "/media/products/cocoa-products/cocoa-beans-light-v2.webp",
              imageAlt: "Fermented and dried cocoa beans arranged as a commercial product sample",
              decisionSummary: {
                lead: "Origin and post-harvest quality determine downstream processing performance.",
                facts: [
                  { title: "Product form", description: "Whole fermented and dried beans" },
                  { title: "Supply basis", description: "Crop, supplier and lot confirmed" },
                  { title: "Buyer capability", description: "Cleaning, roasting and grinding" },
                ],
                points: [
                  "Fermentation, cut test and bean count",
                  "Moisture, defects and flavour profile",
                  "Chocolate and primary cocoa processing",
                ],
                supply: "Jute export bags; lined or bulk options by route.",
              },
              cta: { label: "Request quote for cocoa beans", href: cocoaQuoteHref("cocoa-beans") },
            },
            {
              id: "cocoa-powder",
              title: "Cocoa Powder",
              description: "Natural or alkalised cocoa powder for food and beverage applications.",
              image: "/media/products/cocoa-products/cocoa-powder-light-v2.webp",
              imageAlt: "Fine cocoa powder presented as a commercial ingredient sample",
              decisionSummary: {
                lead: "Select by processing route and the colour, flavour and functionality required in the recipe.",
                facts: [
                  { title: "Process", description: "Natural or alkalised" },
                  { title: "Fat class", description: "10–12% or 20–22%, by offer" },
                  { title: "Application fit", description: "Food and beverage formulations" },
                ],
                points: [
                  "Colour and pH",
                  "Fineness and solubility",
                  "Flavour and microbiology",
                  "Bakery, beverage, dairy and confectionery",
                ],
                supply: "Food-grade lined bags or supplier-specific industrial formats.",
              },
              cta: { label: "Request quote for cocoa powder", href: cocoaQuoteHref("cocoa-powder") },
            },
            {
              id: "cocoa-butter",
              title: "Cocoa Butter",
              description: "Natural or deodorised cocoa butter for food and specialist applications.",
              image: "/media/products/cocoa-products/cocoa-butter-light-v2.webp",
              imageAlt: "Pale golden cocoa butter blocks arranged as a commercial ingredient sample",
              decisionSummary: {
                lead: "Natural formats retain cocoa character; deodorised formats support a more neutral formulation.",
                facts: [
                  { title: "Grade", description: "Pure Prime Pressed (PPP)" },
                  { title: "Process route", description: "Natural or deodorised" },
                  { title: "Delivery form", description: "Solid or heated liquid" },
                ],
                points: [
                  "FFA and unsaponifiable matter",
                  "Colour, flavour and odour",
                  "Melting profile for the formulation",
                  "Chocolate, fillings and specialist applications",
                ],
                supply: "Lined blocks or cartons, drums, or route-compatible heated bulk.",
              },
              cta: { label: "Request quote for cocoa butter", href: cocoaQuoteHref("cocoa-butter") },
            },
            {
              id: "cocoa-mass-liquor",
              title: "Cocoa Mass / Cocoa Liquor",
              cardTitle: "Cocoa Mass / Liquor",
              description: "Ground cocoa nibs containing both cocoa solids and cocoa butter.",
              image: "/media/products/cocoa-products/cocoa-mass-liquor-light-v2.webp",
              imageAlt: "Dark cocoa mass blocks and cocoa nibs arranged as a commercial ingredient sample",
              decisionSummary: {
                lead: "Available in forms matched to the manufacturer's handling and chocolate process.",
                facts: [
                  { title: "Process route", description: "Natural or alkalised" },
                  { title: "Product form", description: "Blocks, kibbled mass or liquid" },
                  { title: "Approval basis", description: "Origin, roast and sensory profile" },
                ],
                points: [
                  "Fineness, fat and microbiology",
                  "Chocolate and coating manufacture",
                  "Fillings and industrial cocoa recipes",
                ],
                supply: "Lined cartons or bags; heated liquid route where available.",
              },
              cta: { label: "Request quote for cocoa mass", href: cocoaQuoteHref("cocoa-mass-liquor") },
            },
          ],
        }}
        originsPosition="after-portfolio"
        origins={{
          title: "Global Origins & Source Control",
          text: "Explore seven cocoa origins across West and Central Africa, from the region's largest producing countries to smaller established cocoa-growing areas.",
          mapVariant: "africa-pins",
          mapAriaLabel: "Africa map with selected cocoa sourcing countries",
          selectionAriaLabel: "Select an African cocoa origin",
          focusLabel: "Cocoa focus",
          contextLabel: "Region",
          regionsLabel: "Selected cocoa areas",
          items: [
            {
              id: "cote-divoire",
              countryId: "384",
              title: "Côte d’Ivoire",
              species: "Beans and processed cocoa",
              tradeContext: "West African cocoa origin",
              description: "West Africa’s largest cocoa origin, with a broad production base and established processing and export infrastructure.",
              regions: ["Soubré", "Daloa", "Duékoué", "Issia"],
              image: "/media/products/cocoa-products/cocoa-origin-cote-divoire-v2.webp",
              imageAlt: "Cocoa pod growing among dense foliage in a Côte d’Ivoire cocoa farm",
            },
            {
              id: "ghana",
              countryId: "288",
              title: "Ghana",
              species: "Beans and selected processed cocoa",
              tradeContext: "West African cocoa origin",
              description: "One of West Africa’s best-known cocoa origins, with established growing areas across the country’s forest zone.",
              regions: ["Western South", "Ashanti", "Western North", "Central"],
              image: "/media/products/cocoa-products/cocoa-origin-ghana-v2.webp",
              imageAlt: "Dense green cocoa trees across a rural cocoa farm in Ghana",
            },
            {
              id: "nigeria",
              countryId: "566",
              title: "Nigeria",
              species: "Beans and selected processing routes",
              tradeContext: "West African cocoa origin",
              description: "Cocoa growing spans several southern states, with Ondo and Cross River among the best-known production areas.",
              regions: ["Ondo", "Cross River", "Osun", "Edo"],
              image: "/media/products/cocoa-products/cocoa-origin-nigeria-v2.webp",
              imageAlt: "Cocoa tree with pods and blossoms in dense Nigerian greenery",
            },
            {
              id: "cameroon",
              countryId: "120",
              title: "Cameroon",
              species: "Bean supply",
              tradeContext: "Central African cocoa origin",
              description: "Cocoa growing is concentrated in Centre and South-West, with additional areas in Littoral and South.",
              regions: ["Centre", "South-West", "Littoral", "South"],
              image: "/media/products/cocoa-products/cocoa-origin-cameroon-v2.webp",
              imageAlt: "Ripe cocoa pods growing through a lush plantation in Cameroon",
            },
            {
              id: "togo",
              countryId: "768",
              title: "Togo",
              species: "Cocoa beans",
              tradeContext: "West African cocoa origin",
              description: "Cocoa growing is concentrated in the forested Plateaux Region around the country’s western cocoa belt.",
              regions: ["Plateaux", "Kloto", "Litimé", "Badou"],
              image: "/media/products/cocoa-products/cocoa-hero-stock-v2.webp",
              imageAlt: "Cocoa pods growing on a tree",
            },
            {
              id: "sierra-leone",
              countryId: "694",
              title: "Sierra Leone",
              species: "Cocoa beans",
              tradeContext: "West African cocoa origin",
              description: "An established cocoa origin centred on the humid growing areas of eastern and southern Sierra Leone.",
              regions: ["Kailahun", "Kenema", "Kono", "Pujehun"],
              image: "/media/products/cocoa-products/cocoa-service-definition-stock-v2.webp",
              imageAlt: "Fresh cocoa pod held after harvest",
            },
            {
              id: "liberia",
              countryId: "430",
              title: "Liberia",
              species: "Cocoa beans",
              tradeContext: "West African cocoa origin",
              description: "Cocoa is grown across Liberia’s forest-zone counties, including key areas in the north and centre of the country.",
              regions: ["Lofa", "Nimba", "Bong"],
              image: "/media/products/cocoa-products/cocoa-beans-light-v2.webp",
              imageAlt: "Cocoa beans prepared for product assessment",
            },
          ],
        }}
        editorialFacts={{
          title: "From Pod to Cocoa",
          text: "Three practical reference points that explain cocoa at origin without relying on crop-year production, grinding or stock estimates.",
          sources: [
            {
              label: "Cocoa Life — Cocoa Growing",
              href: "https://www.cocoalife.org/en/in-the-cocoa-origins/",
            },
            {
              label: "FAO/WHO Codex — Code of Practice for Cocoa",
              href: "https://www.fao.org/fao-who-codexalimentarius/sh-proxy/en/?lnk=1&url=https%253A%252F%252Fworkspace.fao.org%252Fsites%252Fcodex%252FMeetings%252FCX-735-07%252FREP13_CFe.pdf",
            },
          ],
          items: [
            {
              metric: "30–40",
              title: "Each pod carries its own potential",
              description: "A typical cocoa pod contains around 30–40 beans, surrounded by pulp before fermentation and drying.",
            },
            {
              metric: "≈400",
              title: "A useful cocoa-input reference",
              description: "Around 400 dried cocoa beans are needed to produce one pound of cocoa. This is a cocoa-input reference, not a fixed bean-to-chocolate-bar conversion; recipes and cocoa percentages vary.",
            },
            {
              metric: "5–7 days",
              title: "Flavour starts at origin",
              description: "A typical cocoa fermentation takes 5–7 days, helping develop flavour precursors that later become recognisable cocoa and chocolate notes during roasting.",
            },
          ],
        }}
        shipmentOptions={{
          id: "integrated-value-chain",
          title: "Sourcing & Technical Excellence",
          text: "A3 moves beyond transactional trading to coordinate certified sourcing, quality control, compliance and commercially practical delivery from origin to destination.",
          image: "/media/products/cocoa-products/cocoa-service-definition-stock-v2.webp",
          imageAlt: "Farmer holding a ripe cocoa pod during an origin review",
          items: [
            {
              title: "Sustainable & Certified Sourcing",
              description: "A3 provides Fairtrade and Rainforest Alliance certified cocoa products, supporting responsible procurement and more resilient cocoa communities and supply chains.",
              image: "/media/products/cocoa-products/cocoa-service-definition-stock-v2.webp",
              imageAlt: "Farmer holding a ripe cocoa pod during an origin review",
            },
            {
              title: "Verified Quality & Traceability",
              description: "A3 tracks cocoa from plantation and origin through processor and delivery point, providing non-GMO supply and lot-specific quality documentation for technical approval.",
              image: "/media/products/cocoa-products/cocoa-service-quality-stock-v2.webp",
              imageAlt: "Cocoa beans being dried and reviewed at origin in Ghana",
            },
            {
              title: "Global Safety Compliance",
              description: "A3 coordinates cocoa supply backed by ISO 9001:2015, HACCP, Halal and Kosher certification where applicable, together with the required food-safety and destination documentation.",
              image: "/media/products/cocoa-products/cocoa-service-packing-stock-v2.webp",
              imageAlt: "Cocoa crop sacks moving through a warehouse handling system",
            },
            {
              title: "Commercial De-risking",
              description: "A3 coordinates trade terms, logistics, flexible financing and adaptable payment structures. Availability and terms depend on the transaction, destination, customer and credit assessment.",
              image: "/media/products/cocoa-products/cocoa-service-shipment-stock-v2.webp",
              imageAlt: "Cargo ship and container terminal supporting international shipment coordination",
            },
          ],
        }}
        related={cocoaRelated}
        finalCta={{
          title: "For cocoa enquiries",
          text: "Share the ingredient, application, key technical targets, packing, volume, destination and shipment window with A3.",
          primary: { label: "Discuss a cocoa requirement", href: cocoaQuoteHref() },
          variant: "compact-reminder",
        }}
      />
    </>
  );
}
