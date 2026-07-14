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
              description: "Selected Arabica lots with distinctive cup profiles and traceable origins.",
              image: "/media/products/coffee/selected-specialty-lots-light-v3.webp",
              imageAlt: "Selected unroasted specialty Arabica beans on dark coffee wood with ripe cherries and leaves",
              decisionSummary: {
                lead: "Lot character, process and traceability—not a broad trade name—define the buying decision.",
                facts: [
                  { title: "Species", description: "Arabica" },
                  { title: "Process", description: "Natural, pulped natural or washed" },
                  { title: "Origin basis", description: "Brazilian region and producer by lot" },
                ],
                points: [
                  "Cupping notes and score",
                  "Variety, crop and altitude",
                  "Screen, moisture and defect count",
                  "Producer and lot traceability",
                ],
                supply: "60 kg export bags; liner and other formats confirmed with the offered lot.",
              },
              cta: { label: "Request availability for this profile", href: coffeeQuoteHref("selected-specialty-lots") },
            },
            {
              id: "arabica-santos-fine-cup",
              title: "Arabica Santos Fine Cup",
              cardTitle: "Arabica / Santos Fine Cup",
              description: "Clean, balanced Brazilian Arabica for consistent roasting and blends.",
              image: "/media/products/coffee/arabica-santos-fine-cup-light-v3.webp",
              imageAlt: "Unroasted Arabica Santos Fine Cup beans in a commercial metal sampling scoop",
              decisionSummary: {
                facts: [
                  { title: "Species", description: "Arabica" },
                  { title: "Origin", description: "Brazil" },
                  { title: "Process", description: "Commonly natural; confirmed by offer" },
                  { title: "Cup character", description: "Clean and balanced" },
                ],
                points: [
                  "Screen and defect count confirmed by lot",
                  "Moisture and crop confirmed by lot",
                  "Sample matched to the approved cup reference",
                ],
                supply: "60 kg export bags; GrainPro or supplier liner by enquiry.",
              },
              cta: { label: "Request availability for this profile", href: coffeeQuoteHref("arabica-santos-fine-cup") },
            },
            {
              id: "arabica-santos-good-cup",
              title: "Arabica Santos Good Cup",
              cardTitle: "Arabica / Santos Good Cup",
              description: "Commercial Brazilian Arabica for dependable, volume-led roasting.",
              image: "/media/products/coffee/arabica-santos-good-cup-light-v3.webp",
              imageAlt: "Unroasted Arabica Santos Good Cup beans spilling from a natural jute export sack",
              decisionSummary: {
                facts: [
                  { title: "Species", description: "Arabica" },
                  { title: "Origin", description: "Brazil" },
                  { title: "Process", description: "Commonly natural; confirmed by offer" },
                  { title: "Programme", description: "Commercial roasting and blends" },
                ],
                points: [
                  "Screen distribution and defects confirmed by lot",
                  "Moisture and crop confirmed by lot",
                  "Cup reference approved before programme supply",
                ],
                supply: "60 kg export bags; liner and programme format confirmed by offer.",
              },
              cta: { label: "Request availability for this profile", href: coffeeQuoteHref("arabica-santos-good-cup") },
            },
            {
              id: "arabica-rio-minas",
              title: "Arabica Rio Minas",
              cardTitle: "Arabica / Rio Minas",
              description: "Traditional Brazilian Arabica with a stronger profile for blends.",
              image: "/media/products/coffee/arabica-rio-minas-light-v3.webp",
              imageAlt: "Unroasted Arabica Rio Minas beans in a worn hand-carved wooden coffee scoop",
              decisionSummary: {
                facts: [
                  { title: "Species", description: "Arabica" },
                  { title: "Origin", description: "Brazil" },
                  { title: "Process", description: "Supplier and lot specific" },
                  { title: "Cup character", description: "Traditional, stronger profile" },
                ],
                points: [
                  "Sensory reference approved before selection",
                  "Screen, defects and moisture confirmed by lot",
                  "Designed for defined commercial blend targets",
                ],
                supply: "60 kg export bags; liner and loading plan confirmed by route.",
              },
              cta: { label: "Request availability for this profile", href: coffeeQuoteHref("arabica-rio-minas") },
            },
            {
              id: "robusta-conilon",
              title: "Robusta Conilon",
              cardTitle: "Robusta / Conilon",
              description: "Brazilian Canephora for espresso blends, soluble coffee and volume roasting.",
              image: "/media/products/coffee/robusta-conilon-light-v3.webp",
              imageAlt: "Brazilian unroasted Conilon beans with Coffea canephora leaves and ripe cherries",
              decisionSummary: {
                lead: "A Canephora route where physical grade and cup requirement are approved for the intended programme.",
                facts: [
                  { title: "Species", description: "Coffea canephora / Conilon" },
                  { title: "Available grades", description: "7, 7/8 and 8" },
                  { title: "Origin routes", description: "Espírito Santo, Bahia or Rondônia" },
                  { title: "Process", description: "Supplier and lot specific" },
                ],
                points: [
                  "Espresso and commercial blends",
                  "Soluble coffee and volume roasting",
                  "Screen, moisture and cup requirement confirmed by lot",
                ],
                supply: "60 kg export bags; liner and container plan confirmed by route.",
              },
              cta: { label: "Request availability for this profile", href: coffeeQuoteHref("robusta-conilon") },
            },
          ],
        }}
        editorialFacts={{
          title: "Coffee Market Context",
          text: "A market shaped by tight global inventories, Brazil’s changing crop cycle and the distinct commercial roles of Arabica and Conilon.",
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
              label: "USDA FAS — Brazil Coffee Annual 2026",
              href: "https://apps.fas.usda.gov/newgainapi/api/Report/DownloadReportByFileName?fileName=Coffee+Annual_Brasilia_Brazil_BR2026-0025.pdf",
            },
          ],
          items: [
            {
              metric: "178.8m / 173.9m",
              title: "Record demand keeps the buffer tight",
              description: "Global production of 178.8 million 60 kg bags is largely absorbed by consumption of 173.9 million bags, while a fifth consecutive decline in ending stocks keeps the supply cushion limited.",
            },
            {
              metric: "71.9m",
              title: "Brazil enters a stronger Arabica cycle",
              description: "USDA’s May outlook places Brazil’s 2026/27 crop at 71.9 million 60 kg bags, reflecting the positive Arabica biennial cycle and improved weather across the supply base.",
            },
            {
              metric: "47.5m / 24.4m",
              title: "Two commercial supply bases",
              description: "Brazil’s 2026/27 forecast combines 47.5 million 60 kg bags of Arabica with 24.4 million bags of Conilon, serving different sensory, blending and processing requirements.",
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
