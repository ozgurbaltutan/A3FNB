import type { Metadata } from "next";
import { ProductDetailLayout } from "@/components/product-detail-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { buildCategoryMetadata } from "@/components/product-category-page";
import { categoryCardItemBySlug } from "@/content/product-card-items";
import { breadcrumbJsonLd, productFamilyJsonLd } from "@/lib/seo";

const breadcrumb = [
  { label: "Home", href: "/en" },
  { label: "Products", href: "/en/products" },
  { label: "Dried Fruit & Nuts", href: "/en/products/dried-fruit-nuts" },
];

function driedFruitNutsQuoteHref(product?: string) {
  const params = new URLSearchParams({ category: "dried-fruit-nuts" });
  if (product) params.set("product", product);
  return `/en/request-a-quote?${params.toString()}`;
}

const driedFruitNutsRelated = ["consumer-foods", "cocoa-products", "frozen-foods"]
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
  return buildCategoryMetadata("dried-fruit-nuts");
}

export default function DriedFruitNutsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <JsonLd
        data={productFamilyJsonLd({
          title: "Dried Fruit & Nuts",
          summary: "Dried fruits and nuts selected by crop, variety, grade, format, application and destination requirements.",
          href: "/en/products/dried-fruit-nuts",
          image: "/media/products/dried-fruit-nuts/dried-fruit-nuts-hero-stock-v1.webp",
        })}
      />
      <ProductDetailLayout
        pageTreatment="polished"
        breadcrumb={breadcrumb}
        hero={{
          title: "Connecting dried fruit and nut crops to the products and markets that depend on them.",
          text: [
            "A3 coordinates raisins and sultanas, dried apricots, dates, dried figs, pistachios and walnuts for retail, snacking, bakery, confectionery, foodservice and manufacturing.",
            "Crop, variety, grade, size, treatment, food-safety controls, packing, documentation and shipment requirements are aligned before commercial commitment.",
          ],
          image: "/media/products/dried-fruit-nuts/dried-fruit-nuts-hero-stock-v1.webp",
          imageAlt: "Dried apricots, dates, raisins and walnuts arranged in a dark serving dish",
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
          title: "Dried Fruit & Nuts Portfolio",
          text: "Seven sourcing routes defined by product form, crop and variety, size, treatment, application, packing and destination requirements.",
          cardTreatment: "category-overlay",
          compactCardCopy: true,
          modalTreatment: "decision-summary",
          showAllFilter: false,
          groups: [
            {
              id: "dried-fruit",
              title: "Dried Fruit",
              description: "Dried fruit selected by variety, crop, grade, treatment, size and processing format.",
              itemIds: ["raisins-sultanas", "dried-apricots", "dates", "dried-figs"],
            },
            {
              id: "nuts",
              title: "Nuts",
              description: "Pistachio and walnut products selected by shell or kernel form, size, colour and intended use.",
              itemIds: ["in-shell-pistachios", "pistachio-kernels", "walnuts"],
            },
          ],
          items: [
            {
              id: "raisins-sultanas",
              title: "Raisins & Sultanas",
              description: "Dried grapes selected by variety, colour, berry size and treatment for snacking or food production.",
              image: "/media/products/dried-fruit-nuts/raisins-sultanas-light-v1.webp",
              imageAlt: "Golden sultanas and dark raisins presented as separate commercial samples",
              decisionSummary: {
                lead: "Variety, colour, size and treatment determine both appearance and application fit.",
                facts: [
                  { title: "Product form", description: "Whole dried grapes" },
                  { title: "Typical use", description: "Bakery, cereals, retail and snacking" },
                  { title: "Supply basis", description: "Crop, origin and lot confirmed by offer" },
                ],
                points: [
                  "Commercial type and berry size",
                  "Natural or treated finish and colour",
                  "Moisture, texture and defects",
                  "Residue, microbiology and foreign-matter requirements",
                ],
                supply: "Cartons or food-grade lined bags; pack size and pallet format are confirmed with the offered crop and route.",
              },
              cta: { label: "Request a raisins or sultanas offer", href: driedFruitNutsQuoteHref("raisins-sultanas") },
            },
            {
              id: "dried-apricots",
              title: "Dried Apricots",
              description: "Natural or sulphured dried apricots in whole, half, diced or paste formats.",
              image: "/media/products/dried-fruit-nuts/dried-apricots-light-v1.webp",
              imageAlt: "Sulphured golden-orange and natural amber-brown dried apricots presented separately",
              decisionSummary: {
                lead: "Treatment status, colour, moisture and size must be defined together; natural apricots are normally darker than sulphured product.",
                facts: [
                  { title: "Product form", description: "Whole, halves, diced or paste" },
                  { title: "Typical use", description: "Retail, snacking, bakery and food manufacturing" },
                  { title: "Supply basis", description: "Crop, treatment and lot confirmed by offer" },
                ],
                points: [
                  "Natural or unsulphured, or sulphured",
                  "Size count or diameter and grade",
                  "Moisture and texture",
                  "Defects, microbiology, residues and preservative declaration",
                ],
                supply: "Cartons or lined industrial bags are matched to whole, diced or paste format and the destination route.",
              },
              cta: { label: "Request a dried apricots offer", href: driedFruitNutsQuoteHref("dried-apricots") },
            },
            {
              id: "dates",
              title: "Dates",
              description: "Dates selected by variety, size, texture and pit status for retail, foodservice or ingredient use.",
              image: "/media/products/dried-fruit-nuts/dates-light-v1.webp",
              imageAlt: "Whole and pitted dried dates presented as a commercial sample",
              decisionSummary: {
                lead: "Variety sets the natural size, colour, sweetness and texture; pit status and moisture then shape handling and channel fit.",
                facts: [
                  { title: "Product form", description: "Whole, pitted, chopped or paste" },
                  { title: "Typical use", description: "Retail, foodservice, bakery and ingredients" },
                  { title: "Supply basis", description: "Variety, crop, origin and lot confirmed by offer" },
                ],
                points: [
                  "Variety and crop",
                  "Pitted or unpitted format",
                  "Size and moisture",
                  "Skin condition, defects and infestation controls",
                ],
                supply: "Retail packs, cartons or bulk cases are available by programme; chopped and paste formats are confirmed separately.",
              },
              cta: { label: "Request a dates offer", href: driedFruitNutsQuoteHref("dates") },
            },
            {
              id: "dried-figs",
              title: "Dried Figs",
              description: "Whole, shaped, diced or paste-format dried figs selected by size, grade and intended use.",
              image: "/media/products/dried-fruit-nuts/dried-figs-light-v1.webp",
              imageAlt: "Whole and split dried figs with naturally wrinkled skins and seeded interiors",
              decisionSummary: {
                lead: "Size and appearance matter, but every offer also needs a clear defect and mycotoxin-control plan.",
                facts: [
                  { title: "Product form", description: "Whole, shaped, diced or paste" },
                  { title: "Typical use", description: "Retail, bakery, snacking and ingredients" },
                  { title: "Supply basis", description: "Variety, crop, origin and lot confirmed by offer" },
                ],
                points: [
                  "Variety or commercial type and size",
                  "Softness, sugary tissue and moisture",
                  "Skin damage, mould or fermentation",
                  "Aflatoxin and inspection requirements",
                ],
                supply: "Cartons or lined bags use protective packing appropriate to whole, diced or paste format.",
              },
              cta: { label: "Request a dried figs offer", href: driedFruitNutsQuoteHref("dried-figs") },
            },
            {
              id: "in-shell-pistachios",
              title: "In-Shell Pistachios",
              description: "In-shell pistachios selected by size, shell opening, crop and raw or roasted format.",
              image: "/media/products/dried-fruit-nuts/in-shell-pistachios-light-v1.webp",
              imageAlt: "Naturally opened and closed in-shell pistachios presented as a commercial sample",
              decisionSummary: {
                lead: "Shell opening, size and defect profile are the main commercial differences between in-shell offers.",
                facts: [
                  { title: "Product form", description: "Raw or roasted in-shell pistachios" },
                  { title: "Typical use", description: "Retail, roasting and snacking" },
                  { title: "Supply basis", description: "Crop, origin and lot confirmed by offer" },
                ],
                points: [
                  "Size count",
                  "Naturally open, mechanically opened and closed-shell tolerances",
                  "Moisture and defects",
                  "Aflatoxin, residue and microbiological requirements",
                ],
                supply: "Vacuum bags, cartons or sacks are selected according to treatment, programme volume and route.",
              },
              cta: { label: "Request an in-shell pistachios offer", href: driedFruitNutsQuoteHref("in-shell-pistachios") },
            },
            {
              id: "pistachio-kernels",
              title: "Pistachio Kernels",
              description: "Whole or broken pistachio kernels selected by colour, peeled status and application.",
              image: "/media/products/dried-fruit-nuts/pistachio-kernels-light-v1.webp",
              imageAlt: "Whole and broken pistachio kernels in natural green and purple-brown tones",
              decisionSummary: {
                lead: "Colour, peeled status and whole-or-piece format determine whether kernels suit premium decoration or industrial use.",
                facts: [
                  { title: "Product form", description: "Whole, pieces, peeled or unpeeled kernels" },
                  { title: "Typical use", description: "Bakery, confectionery, gelato and ingredient processing" },
                  { title: "Supply basis", description: "Crop, origin and lot confirmed by offer" },
                ],
                points: [
                  "Whole or pieces and peeled or unpeeled",
                  "Colour and size",
                  "Moisture and defects",
                  "Aflatoxin and microbiological controls",
                ],
                supply: "Vacuum bags or food-grade lined cartons are matched to kernel format and destination requirements.",
              },
              cta: { label: "Request a pistachio kernels offer", href: driedFruitNutsQuoteHref("pistachio-kernels") },
            },
            {
              id: "walnuts",
              title: "Walnuts",
              description: "In-shell walnuts and walnut kernels selected by size, colour, fraction and crop condition.",
              image: "/media/products/dried-fruit-nuts/walnuts-light-v1.webp",
              imageAlt: "In-shell walnuts and light-coloured walnut halves and pieces",
              decisionSummary: {
                lead: "In-shell walnuts and kernels are different buying routes; kernel fraction and colour must be stated clearly.",
                facts: [
                  { title: "Product form", description: "In-shell walnuts or kernel halves, quarters and pieces" },
                  { title: "Typical use", description: "Retail, bakery, confectionery and snacking" },
                  { title: "Supply basis", description: "Variety, crop, origin and lot confirmed by offer" },
                ],
                points: [
                  "Variety, crop and in-shell diameter",
                  "Halves, quarters or pieces",
                  "Kernel colour, moisture and rancidity",
                  "Shell fragments, defects and food-safety requirements",
                ],
                supply: "Vacuum bags, cartons or sacks are selected according to the in-shell or kernel format.",
              },
              cta: { label: "Request a walnuts offer", href: driedFruitNutsQuoteHref("walnuts") },
            },
          ],
        }}
        editorialFacts={{
          title: "Dried Fruit & Nuts Market Context",
          text: "2024/25 industry estimates — INC 2025 Global Statistical Review. These figures provide a dated view of category scale and product mix; they are not live price or availability indicators.",
          sources: [
            {
              label: "INC Nuts & Dried Fruit Global Statistical Review 2025",
              href: "https://inc.nutfruit.org/inc-nuts-and-dried-fruit-global-statistical-review-2025-edition-available-now/",
            },
            {
              label: "INC 2025 Annual Report",
              href: "https://inc.nutfruit.org/wp-content/uploads/2026/01/2025-ANNUAL-REPORT.pdf",
            },
          ],
          items: [
            {
              metric: "6.02m",
              title: "Global tree nut production",
              description: "World production reached 6.02 million tonnes in 2024/25 on a kernel basis, except pistachios reported in-shell.",
            },
            {
              metric: "3.25m",
              title: "Global dried fruit production",
              description: "World dried fruit production totalled about 3.25 million tonnes in 2024/25, remaining close to the category's long-term range.",
            },
            {
              metric: "78%",
              title: "Dates and dried grapes lead the category",
              description: "Dried grapes represented 41% and dates 37% of 2024/25 world dried fruit production.",
            },
          ],
        }}
        shipmentOptions={{
          id: "integrated-value-chain",
          title: "Structured Dried Fruit & Nut Sourcing",
          text: "Product definition, crop condition, food-safety controls, protective packing and shipment execution are reviewed as one connected commercial route.",
          image: "/media/products/dried-fruit-nuts/dried-fruit-nuts-service-matching-stock-v1.webp",
          imageAlt: "Pistachio clusters ripening on a tree",
          items: [
            {
              title: "Crop, Variety & Application Matching",
              description: "We define the product, crop, origin, variety, grade, size, treatment, format, intended use, volume and destination before approaching supply.",
              image: "/media/products/dried-fruit-nuts/dried-fruit-nuts-service-matching-stock-v1.webp",
              imageAlt: "Pistachio clusters ripening on a tree",
            },
            {
              title: "Quality, Treatment & Food-Safety Review",
              description: "Moisture, colour, defects, foreign matter, sulphur or other treatment, residues, microbiology, allergens and aflatoxin controls are aligned as relevant to the product and destination.",
              image: "/media/products/dried-fruit-nuts/dried-fruit-nuts-service-quality-stock-v1.webp",
              imageAlt: "Dried apricots arranged on outdoor drying trays",
            },
            {
              title: "Packing & Commercial Structuring",
              description: "Sample approval, pack size, liner or vacuum protection, carton and pallet configuration, Incoterm, shipment window and route are evaluated together.",
              image: "/media/products/dried-fruit-nuts/dried-fruit-nuts-service-packing-stock-v1.webp",
              imageAlt: "Warehouse team coordinating boxed goods and pallets",
            },
            {
              title: "Documents & Dispatch Coordination",
              description: "Final specification or COA, allergen and treatment declarations, origin, phytosanitary, health or fumigation documents where required are coordinated with booking and loading milestones.",
              image: "/media/products/dried-fruit-nuts/dried-fruit-nuts-service-shipment-stock-v1.webp",
              imageAlt: "Cargo ship alongside a container terminal during dispatch coordination",
            },
          ],
        }}
        related={driedFruitNutsRelated}
        finalCta={{
          title: "For dried fruit & nuts enquiries",
          text: "Share the product, crop or variety, grade, size, treatment, format, packing, volume, destination and shipment window with A3.",
          primary: { label: "Discuss a dried fruit or nut requirement", href: driedFruitNutsQuoteHref() },
          variant: "compact-reminder",
        }}
      />
    </>
  );
}
