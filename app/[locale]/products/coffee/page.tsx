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

const specialtySpecs = [
  { parameter: "Species", specification: "Arabica" },
  { parameter: "Cup / profile basis", specification: "Distinctive attributes and lot evaluation" },
  { parameter: "Process", specification: "Natural, pulped natural or washed; lot confirmed" },
  { parameter: "Physical grade", specification: "Screen, defects and moisture by lot" },
  { parameter: "ICO reference", specification: "Arabica baseline: <=86 defects/300 g; 8-12.5% moisture" },
  { parameter: "Crop / lot", specification: "Crop, producer, region and traceability by offer" },
  { parameter: "Commercial form", specification: "Green coffee" },
  { parameter: "Packing", specification: "60 kg export bags or lot-specific format" },
];

const fineCupSpecs = [
  { parameter: "Species", specification: "Arabica" },
  { parameter: "Cup / profile basis", specification: "Fine Cup trade profile; supplier and lot confirmed" },
  { parameter: "Process", specification: "Natural or other offer-specific process" },
  { parameter: "Physical grade", specification: "Screen distribution and defect count by offer" },
  { parameter: "ICO reference", specification: "Arabica baseline: <=86 defects/300 g; 8-12.5% moisture" },
  { parameter: "Crop / lot", specification: "Current crop and lot information confirmed with offer" },
  { parameter: "Commercial form", specification: "Green Arabica coffee" },
  { parameter: "Packing", specification: "60 kg bags; liner option by programme" },
];

const goodCupSpecs = [
  { parameter: "Species", specification: "Arabica" },
  { parameter: "Cup / profile basis", specification: "Good Cup trade profile; supplier and lot confirmed" },
  { parameter: "Process", specification: "Offer-specific, commonly natural" },
  { parameter: "Physical grade", specification: "Screen distribution and defects by offer" },
  { parameter: "ICO reference", specification: "Arabica baseline: <=86 defects/300 g; 8-12.5% moisture" },
  { parameter: "Crop / lot", specification: "Crop, availability and lot information confirmed" },
  { parameter: "Commercial form", specification: "Green Arabica coffee" },
  { parameter: "Packing", specification: "60 kg export bags or agreed format" },
];

const rioMinasSpecs = [
  { parameter: "Species", specification: "Arabica" },
  { parameter: "Cup / profile basis", specification: "Rio Minas trade profile; blend target confirmed" },
  { parameter: "Process", specification: "Supplier and lot specific" },
  { parameter: "Physical grade", specification: "Screen, defects and moisture by offer" },
  { parameter: "ICO reference", specification: "Arabica baseline: <=86 defects/300 g; 8-12.5% moisture" },
  { parameter: "Crop / lot", specification: "Crop and lot details confirmed before approval" },
  { parameter: "Commercial form", specification: "Green Arabica coffee" },
  { parameter: "Packing", specification: "60 kg export bags or agreed format" },
];

const conilonSpecs = [
  { parameter: "Species", specification: "Coffea canephora / Conilon" },
  { parameter: "Cup / profile basis", specification: "Blend or soluble-coffee target" },
  { parameter: "Process", specification: "Supplier and lot specific" },
  { parameter: "Physical grade", specification: "Type, screen and defects by offer" },
  { parameter: "ICO reference", specification: "Robusta baseline: <=150 defects/300 g; 8-12.5% moisture" },
  { parameter: "Crop / lot", specification: "Crop, origin and lot information confirmed" },
  { parameter: "Commercial form", specification: "Green Coffea canephora coffee" },
  { parameter: "Packing", specification: "60 kg bags or supplier-specific export format" },
];

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
          imageAlt: "Brazilian green coffee sourcing for commercial buyers",
        })}
      />
      <ProductDetailLayout
        pageTreatment="polished"
        breadcrumb={breadcrumb}
        hero={{
          title: "Connecting the farm gate to the global coffee market.",
          text: [
            "A3 supports international coffee buyers with quality-focused sourcing across selected Brazilian Arabica, Conilon and specialty coffee opportunities.",
            "We align the buyer brief with origin availability, lot review, commercial terms, packing, export documentation and shipment coordination.",
          ],
          image: "/media/products/coffee/brazil-coffee-landscape.webp",
          imageAlt: "Coffee fields across a Brazilian mountain landscape",
          hideBreadcrumb: true,
          variant: "compact",
        }}
        sectionNavigation={[
          { label: "Overview", href: "#overview" },
          { label: "Coffee profiles", href: "#range" },
          { label: "Key facts", href: "#key-facts" },
          { label: "Specifications", href: "#technical-specifications" },
          { label: "Services", href: "#integrated-value-chain" },
          { label: "Contact", href: "#contact" },
        ]}
        productPortfolio={{
          id: "range",
          title: "Brazilian coffee profiles",
          text: "A3 reviews selected Brazilian green coffee profiles against cup target, physical grade, process, crop, packing, volume and destination requirements.",
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
              overview: "Selected specialty coffee is organised lot by lot for buyers seeking distinctive attributes, clearer origin information and differentiated market positioning.",
              bestFit: "Choose a selected specialty lot when the buying decision depends on distinctive cup attributes, process, traceability and lot-specific approval rather than a broad commercial profile.",
              profile: [
                { title: "Species", description: "Arabica" },
                { title: "Process", description: "Natural, pulped natural or washed, subject to lot" },
                { title: "Origin availability", description: "Brazilian region and producer confirmed by lot" },
                { title: "Trade profile", description: "Selected specialty lot" },
              ],
              applications: ["Specialty roasting", "Single-origin or traceable programmes", "Differentiated wholesale ranges", "Lot-led seasonal offers"],
              supplyFormats: ["60 kg export bags", "Liner options subject to supplier", "Lot-specific formats where available"],
              documentPackage: "Cup notes, physical analysis, crop, process, lot identity, supplier specification and supporting documents are confirmed against the offered lot.",
              specs: specialtySpecs,
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
              overview: "Arabica Santos Fine Cup is a clean, balanced Brazilian trade profile reviewed against the buyer's cup target, physical grade and roasting programme.",
              bestFit: "Choose this profile for a balanced commercial Arabica route where clean cup character, consistency and repeatable roasting performance are important.",
              profile: [
                { title: "Species", description: "Arabica" },
                { title: "Process", description: "Offer-specific; commonly natural" },
                { title: "Origin availability", description: "Brazilian supply route confirmed with offer" },
                { title: "Trade profile", description: "Santos Fine Cup" },
              ],
              applications: ["Consistent roasting programmes", "Wholesale coffee", "Balanced blends", "Foodservice and distribution"],
              supplyFormats: ["60 kg export bags", "GrainPro or supplier liner by enquiry", "Container plan aligned to route and volume"],
              documentPackage: "Cup profile, screen, defect count, crop, moisture, supplier specification, COA and export documents are tied to the offered lot.",
              specs: fineCupSpecs,
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
              overview: "Arabica Santos Good Cup provides a practical commercial Arabica route for buyers balancing cup requirement, dependable availability and programme economics.",
              bestFit: "Choose this profile for volume-led commercial roasting or blend use where a defined, workable Arabica specification matters more than differentiated lot attributes.",
              profile: [
                { title: "Species", description: "Arabica" },
                { title: "Process", description: "Offer-specific; commonly natural" },
                { title: "Origin availability", description: "Brazilian route subject to crop and supplier availability" },
                { title: "Trade profile", description: "Santos Good Cup" },
              ],
              applications: ["Commercial roasting", "Volume-led blends", "Wholesale and distribution", "Private-label coffee programmes"],
              supplyFormats: ["60 kg export bags", "Supplier-specific liner options", "Agreed container or programme format"],
              documentPackage: "Screen distribution, defects, moisture, crop, lot details, supplier specification, COA and route documents are confirmed with the offer.",
              specs: goodCupSpecs,
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
              overview: "Arabica Rio Minas is reviewed as a traditional commercial trade profile for buyers that have a clearly defined cup target and blend application.",
              bestFit: "Choose this route only where the intended blend calls for the supplier-confirmed Rio Minas cup profile; final sensory and physical approval remains lot specific.",
              profile: [
                { title: "Species", description: "Arabica" },
                { title: "Process", description: "Supplier and lot specific" },
                { title: "Origin availability", description: "Brazilian origin and route confirmed with offer" },
                { title: "Trade profile", description: "Rio Minas" },
              ],
              applications: ["Traditional commercial blends", "Defined stronger-cup targets", "Roasting programmes with an approved reference", "Wholesale supply"],
              supplyFormats: ["60 kg export bags", "Liner subject to supplier", "Loading plan confirmed against destination"],
              documentPackage: "Descriptive cup information, screen, defects, crop, moisture, supplier specification and lot documents are reviewed before approval.",
              specs: rioMinasSpecs,
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
              overview: "Brazilian Conilon is reviewed by supplier-confirmed type, physical grade, crop, cup requirement and the performance needed in the final blend or soluble-coffee programme.",
              bestFit: "Choose Conilon when the programme needs Coffea canephora body, intensity, blend structure or soluble-coffee suitability against a defined commercial specification.",
              profile: [
                { title: "Species", description: "Coffea canephora / Conilon" },
                { title: "Process", description: "Supplier and lot specific" },
                { title: "Origin availability", description: "Espírito Santo, Bahia or Rondônia routes subject to offer" },
                { title: "Trade profile", description: "Supplier-confirmed Conilon type" },
              ],
              applications: ["Espresso and commercial blends", "Soluble coffee", "Volume-led roasting", "Programmes requiring Canephora structure"],
              supplyFormats: ["60 kg export bags", "Supplier-specific export formats", "Container and liner plan confirmed by route"],
              documentPackage: "Type, screen, defects, crop, moisture, cup requirement, specification, COA and origin/export documents are confirmed with the offered lot.",
              specs: conilonSpecs,
              cta: { label: "Request availability for this profile", href: coffeeQuoteHref("robusta-conilon") },
            },
          ],
        }}
        editorialFacts={{
          title: "Coffee key facts",
          text: "Current market context and the production diversity behind Brazilian coffee supply.",
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
              title: "Arabica and Conilon diversity",
              description: "Brazil produces both Arabica and Coffea canephora / Conilon across multiple states. A3 reviews opportunities in Minas Gerais, Bahia, Espírito Santo, Paraná, São Paulo and Rondônia subject to crop, producer and lot availability.",
              slot: "secondary-bottom",
              tone: "warm",
            },
          ],
        }}
        technicalSpecs={{
          title: "Technical specifications",
          text: "Compare the selection references used to organise an initial Brazilian green coffee discussion.",
          selectorLabel: "Select a coffee profile",
          disclaimer: "Trade names and ICO values are selection references, not guaranteed lot specifications. Final cup profile, physical analysis, crop, origin, supplier specification, certificate of analysis, packing and document set are confirmed with the commercial offer.",
          catalogue: {
            label: "Download UK coffee catalogue",
            href: "/assets/a3/resources/a3-coffee-catalogue.pdf",
          },
          profiles: [
            { title: "Specialty Coffee", subtitle: "Selected Arabica lots", rows: specialtySpecs },
            { title: "Santos Fine Cup", subtitle: "Commercial Arabica", rows: fineCupSpecs },
            { title: "Santos Good Cup", subtitle: "Commercial Arabica", rows: goodCupSpecs },
            { title: "Rio Minas", subtitle: "Traditional trade profile", rows: rioMinasSpecs },
            { title: "Robusta Conilon", subtitle: "Coffea canephora", rows: conilonSpecs },
          ],
        }}
        shipmentOptions={{
          id: "integrated-value-chain",
          title: "Integrated Value Chain Services",
          text: "A3 connects the coffee brief, available origin lots, commercial structure and export route from first requirement through shipment follow-through.",
          image: "/media/home/process-define-requirement-v3.webp",
          imageAlt: "Commercial food commodity samples and packing formats arranged for review",
          items: [
            {
              title: "Define the requirement",
              description: "Species, cup target, process, crop, screen, defects, volume, packing, destination and shipment window are converted into a clear coffee sourcing brief.",
              image: "/media/home/process-define-requirement-v3.webp",
              imageAlt: "Commodity samples and formats arranged to define a commercial requirement",
            },
            {
              title: "Source & match",
              description: "Available producer, supplier and origin opportunities are compared against the required cup, physical grade, volume and route.",
              image: "/media/products/coffee/brazil-coffee-field.webp",
              imageAlt: "Rows of coffee plants at a Brazilian producing origin",
            },
            {
              title: "Sample, cup & grade review",
              description: "Representative samples, descriptive cupping information, screen, moisture, defect count and supplier quality documents are reviewed before commitment.",
              image: "/media/products/coffee/green-beans-hands.webp",
              imageAlt: "Green coffee beans being reviewed by hand",
            },
            {
              title: "Qualify & structure",
              description: "Lot fit, availability, price basis, payment structure, Incoterms and shipment timing are assessed as one workable trade.",
              image: "/media/home/process-qualify-structure-v3.webp",
              imageAlt: "Palletised commodity cargo prepared for international shipment",
            },
            {
              title: "Prepare, pack & document",
              description: "Approved lot details, bag and liner format, container preparation, certificates, COA and export documents are aligned to destination requirements.",
              image: "/media/home/process-prepare-document-v3.webp",
              imageAlt: "Commodity samples, document sleeves, labels and cargo seal",
            },
            {
              title: "Move & follow through",
              description: "Origin handling, booking, loading, port movement, shipment milestones and agreed delivery conditions are coordinated through the route.",
              image: "/media/home/process-move-follow-v3.webp",
              imageAlt: "Container ship moving through a working commercial port",
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
