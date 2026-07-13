import type { Metadata } from "next";
import { ProductDetailLayout } from "@/components/product-detail-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { categoryCardItemBySlug } from "@/content/product-card-items";
import { pages } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata, productFamilyJsonLd } from "@/lib/seo";

const breadcrumb = [
  { label: "Home", href: "/en" },
  { label: "Products", href: "/en/products" },
  { label: "Coffee", href: "/en/products/coffee" },
];

function coffeeQuoteHref(product?: string) {
  const params = new URLSearchParams({ category: "coffee" });
  if (product) params.set("product", product);
  return `/en/request-a-quote?${params.toString()}`;
}

const coffeeRelated = ["cocoa-products", "dried-fruit-nuts", "consumer-foods"]
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
  return buildMetadata(pages.coffee.seo);
}

export default function CoffeePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <JsonLd
        data={productFamilyJsonLd({
          title: "Coffee",
          summary: pages.coffee.description,
          href: "/en/products/coffee",
          image: "/media/products/coffee/brazil-coffee-landscape.webp",
        })}
      />
      <ProductDetailLayout
        pageTreatment="polished"
        breadcrumb={breadcrumb}
        hero={{
          title: "Connecting the farm gate to the global coffee market.",
          text: [
            "A3 Food & Beverage acts as a strategic link in the coffee value chain, supporting international buyers with quality-focused sourcing and structured export coordination.",
            "We connect suitable origin opportunities with the buyer's quality, commercial and delivery requirements.",
          ],
          image: "/media/products/coffee/brazil-coffee-landscape.webp",
          imageAlt: "Coffee fields across a Brazilian mountain landscape",
          hideBreadcrumb: true,
          variant: "compact",
        }}
        sectionNavigation={[
          { label: "Coffee profiles", href: "#range" },
          { label: "Origins", href: "#origins" },
          { label: "Market context", href: "#key-facts" },
          { label: "Services", href: "#integrated-value-chain" },
          { label: "Contact", href: "#contact" },
        ]}
        origins={{
          title: "Our Brazilian Origins",
          text: "Brazil offers a broad range of Arabica and Coffea canephora profiles across established producing states. A3 reviews selected origin routes according to crop, producer, lot, quality requirement and commercial availability.",
          note: "Map points indicate selected sourcing states, not individual farms or production-area boundaries.",
          items: [
            {
              id: "minas-gerais",
              title: "Minas Gerais",
              species: "Arabica",
              tradeContext: "Broad commercial and differentiated availability",
              description: "Brazil's principal Arabica-producing state, with established supply networks across multiple recognised origins.",
              regions: ["Sul de Minas", "Cerrado Mineiro", "Matas de Minas", "Mantiqueira de Minas"],
              image: "/media/products/coffee/origin-minas-gerais.webp",
              imageAlt: "Hilly Arabica coffee fields and farm landscape in Minas Gerais, Brazil",
              point: { x: 373.9, y: 314.7, labelX: 337, labelY: 292, labelAnchor: "end" },
            },
            {
              id: "bahia",
              title: "Bahia",
              species: "Arabica & Canephora",
              tradeContext: "Highland, western and lower-altitude supply routes",
              description: "A diverse producing state spanning contrasting climates, elevations and coffee production systems.",
              regions: ["Chapada Diamantina", "Oeste da Bahia", "Atlântico Baiano"],
              image: "/media/products/coffee/origin-bahia.webp",
              imageAlt: "Broad irrigated Arabica coffee fields in western Bahia, Brazil",
              point: { x: 433.4, y: 235.4, labelX: 405, labelY: 211, labelAnchor: "end" },
            },
            {
              id: "espirito-santo",
              title: "Espírito Santo",
              species: "Conilon & Arabica",
              tradeContext: "Leading Conilon scale with mountain Arabica",
              description: "A major Brazilian coffee state with strong Canephora capability and established mountain origins.",
              regions: ["Conilon Capixaba", "Montanhas do Espírito Santo", "Caparaó"],
              image: "/media/products/coffee/origin-espirito-santo.webp",
              imageAlt: "Conilon coffee plantation below rocky mountains in Espírito Santo, Brazil",
              point: { x: 413.3, y: 319.4, labelX: 454, labelY: 308, labelAnchor: "start" },
            },
            {
              id: "parana",
              title: "Paraná",
              species: "Arabica",
              tradeContext: "Selected traditional-origin opportunities",
              description: "A traditional Brazilian coffee state with selected regional sourcing opportunities.",
              regions: ["Norte Pioneiro do Paraná"],
              image: "/media/products/coffee/origin-parana.webp",
              imageAlt: "Arabica coffee rows on red soil in Norte Pioneiro do Paraná, Brazil",
              point: { x: 315.6, y: 380, labelX: 278, labelY: 405, labelAnchor: "end" },
            },
            {
              id: "sao-paulo",
              title: "São Paulo",
              species: "Arabica",
              tradeContext: "Production routes with Santos export access",
              description: "An established producing state connected to Brazil's principal coffee export gateway through Santos.",
              regions: ["Alta Mogiana", "Mogiana", "Centro-Oeste Paulista"],
              image: "/media/products/coffee/origin-sao-paulo.webp",
              imageAlt: "Expansive Arabica coffee farm in the Alta Mogiana region of São Paulo, Brazil",
              point: { x: 344.5, y: 357.4, labelX: 293, labelY: 348, labelAnchor: "end" },
            },
            {
              id: "rondonia",
              title: "Rondônia",
              species: "Coffea canephora",
              tradeContext: "Amazon-adapted Robustas Amazônicos",
              description: "A leading origin for Robustas Amazônicos, developed for the conditions of the Amazon region.",
              regions: ["Matas de Rondônia", "Vale do Guaporé"],
              image: "/media/products/coffee/origin-rondonia.webp",
              imageAlt: "Small-scale Robusta Amazônico coffee farm in the humid landscape of Rondônia, Brazil",
              point: { x: 155.7, y: 188.6, labelX: 116, labelY: 166, labelAnchor: "end" },
            },
          ],
        }}
        originsPosition="after-portfolio"
        productPortfolio={{
          id: "range",
          title: "Brazilian Green Coffee Portfolio",
          text: "Selected Brazilian green coffee routes ranging from differentiated Arabica lots to established commercial Arabica and Conilon profiles.",
          cardTreatment: "category-overlay",
          modalTreatment: "decision-summary",
          items: [
            {
              id: "selected-specialty-lots",
              title: "Selected Specialty Coffee",
              cardTitle: "Specialty Coffee",
              description: "Selected Arabica lots reviewed for distinctive attributes, lot information and differentiated roasting programmes.",
              image: "/media/products/coffee/selected-specialty-lots-light-v3.webp",
              imageAlt: "Selected unroasted specialty Arabica beans on dark coffee wood with ripe cherries and leaves",
              source: "Brazil; region and producer by lot",
              fit: "Specialty roasting and differentiated programmes",
              overview: "Selected specialty coffee is organised lot by lot for programmes in which cup character, process and traceability shape the buying decision.",
              bestFit: "Approval should be tied to the offered sample, cupping information and lot documentation rather than a broad trade-name expectation.",
              profile: [
                { title: "Species", description: "Arabica" },
                { title: "Process", description: "Natural, pulped natural or washed, subject to lot" },
                { title: "Origin availability", description: "Brazilian region and producer confirmed by lot" },
                { title: "Trade profile", description: "Selected specialty lot" },
              ],
              applications: ["Specialty roasting", "Single-origin or traceable programmes", "Differentiated wholesale ranges", "Lot-led seasonal offers"],
              supplyFormats: ["60 kg export bags", "Liner options subject to supplier", "Lot-specific formats where available"],
              documentPackage: "Cup notes, physical analysis, crop, process, lot identity, supplier specification and supporting documents are confirmed against the offered lot.",
              cta: { label: "Request availability for this profile", href: coffeeQuoteHref("selected-specialty-lots") },
            },
            {
              id: "arabica-santos-fine-cup",
              title: "Arabica Santos Fine Cup",
              cardTitle: "Santos Fine Cup",
              description: "A clean, balanced Brazilian Arabica route for consistent roasting, wholesale and distribution requirements.",
              image: "/media/products/coffee/arabica-santos-fine-cup-light-v3.webp",
              imageAlt: "Unroasted Arabica Santos Fine Cup beans in a commercial metal sampling scoop",
              source: "Brazil; supplier and lot confirmed",
              fit: "Roasting, wholesale and distribution",
              overview: "Arabica Santos Fine Cup is considered when a commercial roasting programme calls for a clean, balanced Brazilian Arabica profile.",
              bestFit: "The offered sample and physical analysis should confirm that the lot matches the buyer's approved cup reference and roasting programme.",
              profile: [
                { title: "Species", description: "Arabica" },
                { title: "Process", description: "Offer-specific; commonly natural" },
                { title: "Origin availability", description: "Brazilian supply route confirmed with offer" },
                { title: "Trade profile", description: "Santos Fine Cup" },
              ],
              applications: ["Consistent roasting programmes", "Wholesale coffee", "Balanced blends", "Foodservice and distribution"],
              supplyFormats: ["60 kg export bags", "GrainPro or supplier liner by enquiry", "Container plan aligned to route and volume"],
              documentPackage: "Cup profile, screen, defect count, crop, moisture, supplier specification, COA and export documents are tied to the offered lot.",
              cta: { label: "Request availability for this profile", href: coffeeQuoteHref("arabica-santos-fine-cup") },
            },
            {
              id: "arabica-santos-good-cup",
              title: "Arabica Santos Good Cup",
              cardTitle: "Santos Good Cup",
              description: "A practical Brazilian Arabica option for dependable commercial supply and volume-led blend programmes.",
              image: "/media/products/coffee/arabica-santos-good-cup-light-v3.webp",
              imageAlt: "Unroasted Arabica Santos Good Cup beans spilling from a natural jute export sack",
              source: "Brazil; supplier and lot confirmed",
              fit: "Commercial roasting and blends",
              overview: "Arabica Santos Good Cup supports volume-led commercial roasting and blend programmes where supply practicality and programme economics matter.",
              bestFit: "Use an agreed cup reference and physical specification to approve the lot; the trade name alone does not define the final quality.",
              profile: [
                { title: "Species", description: "Arabica" },
                { title: "Process", description: "Offer-specific; commonly natural" },
                { title: "Origin availability", description: "Brazilian route subject to crop and supplier availability" },
                { title: "Trade profile", description: "Santos Good Cup" },
              ],
              applications: ["Commercial roasting", "Volume-led blends", "Wholesale and distribution", "Private-label coffee programmes"],
              supplyFormats: ["60 kg export bags", "Supplier-specific liner options", "Agreed container or programme format"],
              documentPackage: "Screen distribution, defects, moisture, crop, lot details, supplier specification, COA and route documents are confirmed with the offer.",
              cta: { label: "Request availability for this profile", href: coffeeQuoteHref("arabica-santos-good-cup") },
            },
            {
              id: "arabica-rio-minas",
              title: "Arabica Rio Minas",
              cardTitle: "Rio Minas",
              description: "A traditional Brazilian Arabica trade profile for buyers with a defined stronger-cup or blend application.",
              image: "/media/products/coffee/arabica-rio-minas-light-v3.webp",
              imageAlt: "Unroasted Arabica Rio Minas beans in a worn hand-carved wooden coffee scoop",
              source: "Brazil; supplier and lot confirmed",
              fit: "Defined traditional blend applications",
              overview: "Arabica Rio Minas is a traditional commercial route for blends built around a clearly defined, stronger cup profile.",
              bestFit: "Select this route only against an approved sensory reference; final cup and physical acceptance remain specific to the offered lot.",
              profile: [
                { title: "Species", description: "Arabica" },
                { title: "Process", description: "Supplier and lot specific" },
                { title: "Origin availability", description: "Brazilian origin and route confirmed with offer" },
                { title: "Trade profile", description: "Rio Minas" },
              ],
              applications: ["Traditional commercial blends", "Defined stronger-cup targets", "Roasting programmes with an approved reference", "Wholesale supply"],
              supplyFormats: ["60 kg export bags", "Liner subject to supplier", "Loading plan confirmed against destination"],
              documentPackage: "Descriptive cup information, screen, defects, crop, moisture, supplier specification and lot documents are reviewed before approval.",
              cta: { label: "Request availability for this profile", href: coffeeQuoteHref("arabica-rio-minas") },
            },
            {
              id: "robusta-conilon",
              title: "Robusta Conilon",
              cardTitle: "Robusta Conilon",
              description: "Brazilian Conilon options reviewed for blends, soluble coffee and commercial roasting programmes.",
              image: "/media/products/coffee/robusta-conilon-light-v3.webp",
              imageAlt: "Brazilian unroasted Conilon beans with Coffea canephora leaves and ripe cherries",
              source: "Brazil; origin and supplier confirmed",
              fit: "Blends, soluble coffee and commercial programmes",
              overview: "Brazilian Conilon is considered for programmes that need Coffea canephora body, intensity, blend structure or soluble-coffee suitability.",
              bestFit: "Supplier-confirmed type, physical grade and cup requirement must be approved for the intended blend or soluble-coffee programme.",
              profile: [
                { title: "Species", description: "Coffea canephora / Conilon" },
                { title: "Process", description: "Supplier and lot specific" },
                { title: "Origin availability", description: "Espírito Santo, Bahia or Rondônia routes subject to offer" },
                { title: "Trade profile", description: "Supplier-confirmed Conilon type" },
              ],
              applications: ["Espresso and commercial blends", "Soluble coffee", "Volume-led roasting", "Programmes requiring Canephora structure"],
              supplyFormats: ["60 kg export bags", "Supplier-specific export formats", "Container and liner plan confirmed by route"],
              documentPackage: "Type, screen, defects, crop, moisture, cup requirement, specification, COA and origin/export documents are confirmed with the offered lot.",
              cta: { label: "Request availability for this profile", href: coffeeQuoteHref("robusta-conilon") },
            },
          ],
        }}
        editorialFacts={{
          title: "Coffee Market Context",
          text: "The global scale of green coffee trade and the two complementary supply bases behind Brazilian availability.",
          catalogue: {
            label: "Download coffee catalogue",
            href: "/assets/a3/resources/a3-coffee-catalogue.pdf",
          },
          sources: [
            {
              label: "USDA FAS — Coffee: World Markets and Trade",
              href: "https://apps.fas.usda.gov/psdonline/circulars/coffee.pdf",
            },
            {
              label: "Brazil Ministry of Agriculture — Coffee in Brazil",
              href: "https://www.gov.br/agricultura/pt-br/assuntos/politica-agricola/cafe/cafeicultura-brasileira",
            },
          ],
          items: [
            {
              title: "A global agricultural market",
              description: "USDA FAS forecast world coffee production at 178.8 million 60 kg bags for marketing year 2025/26, illustrating the scale of the roasting, soluble and consumer markets served by green coffee trade.",
              slot: "primary",
              tone: "dark",
            },
            {
              title: "Brazil remains the leading origin",
              description: "The same USDA FAS balance forecast Brazilian production at 63.0 million bags for 2025/26 across Arabica and Robusta supply.",
              slot: "secondary-top",
              tone: "sage",
            },
            {
              title: "Two complementary supply bases",
              description: "Brazil's Arabica and Coffea canephora / Conilon supply serves different sensory, blending and processing requirements. Species, cup target and physical grade are assessed at lot level.",
              slot: "secondary-bottom",
              tone: "warm",
            },
          ],
        }}
        shipmentOptions={{
          id: "integrated-value-chain",
          title: "Structured Sourcing & Export Excellence",
          text: "A3 helps coffee buyers evaluate available lots with technical clarity and commercial confidence, then coordinates the route from origin approval through shipment follow-through.",
          image: "/media/products/coffee/coffee-cherry-picking.webp",
          imageAlt: "Coffee cherries being selected during harvest at origin",
          items: [
            {
              title: "Origin & Lot Sourcing",
              description: "Available producer and supplier lots are matched against species, cup target, process, crop, volume, packing and destination requirements.",
              image: "/media/products/coffee/coffee-cherry-picking.webp",
              imageAlt: "Coffee cherries being selected during harvest at origin",
            },
            {
              title: "Quality & Lot Information",
              description: "Representative samples, descriptive cupping information, screen distribution, moisture, defect count, process, crop, supplier specifications and supporting quality documents are reviewed before commercial commitment.",
              image: "/media/products/coffee/green-beans-hands.webp",
              imageAlt: "Green coffee beans being physically reviewed by hand",
            },
            {
              title: "Commercial Structuring & De-risking",
              description: "Lot availability, price basis, payment structure, Incoterms, shipment window and, where appropriate, partner-supported trade-finance options are assessed as one workable trade.",
              image: "/media/products/coffee/coffee-drying-beds.webp",
              imageAlt: "Working coffee processing facility with beans drying on raised beds",
            },
            {
              title: "Export Coordination",
              description: "Origin handling, warehousing checks where applicable, packing, certificates, export documentation, booking, loading and shipment milestones are coordinated through the agreed route.",
              image: "/media/products/coffee/coffee-export-varginha.webp",
              imageAlt: "Green coffee export bags being loaded into a shipping container at a Brazilian warehouse",
            },
          ],
        }}
        related={coffeeRelated}
        finalCta={{
          title: "For coffee enquiries",
          text: "Share the species or trade profile, cup target, physical grade, packing, volume, destination and shipment window with A3.",
          primary: { label: "Discuss a coffee requirement", href: coffeeQuoteHref() },
          variant: "compact-reminder",
        }}
      />
    </>
  );
}
