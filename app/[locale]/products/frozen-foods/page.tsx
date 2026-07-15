import type { Metadata } from "next";
import { ProductDetailLayout } from "@/components/product-detail-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { buildCategoryMetadata } from "@/components/product-category-page";
import { categoryCardItemBySlug } from "@/content/product-card-items";
import { breadcrumbJsonLd, productFamilyJsonLd } from "@/lib/seo";

const breadcrumb = [
  { label: "Home", href: "/en" },
  { label: "Products", href: "/en/products" },
  { label: "Frozen Foods", href: "/en/products/frozen-foods" },
];

function frozenFoodsQuoteHref(product?: string) {
  const params = new URLSearchParams({ category: "frozen-foods" });
  if (product) params.set("product", product);
  return `/en/request-a-quote?${params.toString()}`;
}

const frozenFoodsRelated = ["consumer-foods", "oils-fats", "dairy-milk-powders"]
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
  return buildCategoryMetadata("frozen-foods");
}

export default function FrozenFoodsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <JsonLd
        data={productFamilyJsonLd({
          title: "Frozen Foods",
          summary:
            "Frozen potato products, fruit and vegetables, poultry, seafood and bakery lines matched by format, end use, approval, packing and cold-chain requirements.",
          href: "/en/products/frozen-foods",
          image: "/media/products/frozen-foods/frozen-foods-hero-user-v2.webp",
        })}
      />
      <ProductDetailLayout
        pageTreatment="polished"
        breadcrumb={breadcrumb}
        hero={{
          title: "Frozen food sourcing built around a reliable cold chain.",
          text: [
            "A3 coordinates frozen potato, produce, poultry, seafood and bakery programmes, aligning product format, approvals, packing, shelf life and temperature-controlled delivery before quotation.",
          ],
          image: "/media/products/frozen-foods/frozen-foods-hero-user-v2.webp",
          imageAlt:
            "Assorted frozen poultry, fish, seafood, vegetables and prepared products",
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
          title: "Frozen Food Portfolio",
          text: "Five sourcing routes, each defined by different product, performance, approval and cold-chain requirements.",
          cardTreatment: "category-overlay",
          compactCardCopy: true,
          items: [
            {
              id: "french-fries",
              title: "Frozen Potato Products",
              description:
                "French fries, wedges, hash browns and formed potato products selected for the intended kitchen, fryer and service model.",
              image: "/media/products/frozen-foods/frozen-potato-products-light-v1.webp",
              imageAlt:
                "Uncooked frozen French fries, wedges, hash browns and formed potato products presented as a commercial sample",
              decisionSummary: {
                lead:
                  "The right potato product depends on more than cut size; coating, cook method and holding performance shape the final result.",
                facts: [
                  {
                    title: "Product formats",
                    description: "French fries, wedges, hash browns and formed products",
                  },
                  {
                    title: "Typical use",
                    description: "QSR, foodservice, retail and distribution",
                  },
                  {
                    title: "Supply basis",
                    description: "Producer, origin and recipe confirmed by offer",
                  },
                ],
                points: [
                  "Cut and skin status",
                  "Coating or seasoning",
                  "Fryer or oven instructions, finished texture and hold time",
                  "Size distribution, colour, defects and pack configuration",
                ],
                supply:
                  "Foodservice or retail bags in export cartons, with the pallet and reefer plan confirmed by programme.",
              },
              cta: {
                label: "Request a frozen potato products offer",
                href: frozenFoodsQuoteHref("french-fries"),
              },
            },
            {
              id: "frozen-fruit-vegetables",
              title: "Frozen Fruit & Vegetables",
              description:
                "IQF and other frozen fruit and vegetable formats selected by variety, cut, grade and end use.",
              image: "/media/products/frozen-foods/frozen-fruit-vegetables-light-v1.webp",
              imageAlt:
                "IQF fruit and vegetables with visible natural frost presented as separate commercial samples",
              decisionSummary: {
                lead:
                  "Variety, preparation and freezing format determine how the product portions, processes and performs after thawing or cooking.",
                facts: [
                  { title: "Product formats", description: "IQF pieces, cuts, blends, purée or block" },
                  { title: "Typical use", description: "Retail, foodservice and manufacturing" },
                  {
                    title: "Supply basis",
                    description: "Crop, origin and processor confirmed by offer",
                  },
                ],
                points: [
                  "Species and variety",
                  "Cut and size",
                  "IQF/free-flowing or block format",
                  "Blanching or other treatment, colour, texture and defects",
                  "Microbiological, residue and foreign-material requirements",
                ],
                supply: "Retail, foodservice or industrial bags in cartons.",
              },
              cta: {
                label: "Request a frozen fruit and vegetables offer",
                href: frozenFoodsQuoteHref("frozen-fruit-vegetables"),
              },
            },
            {
              id: "frozen-poultry",
              title: "Frozen Poultry",
              description:
                "Whole birds, cuts, boneless meat and selected processed poultry matched to channel and destination approval.",
              image: "/media/products/frozen-foods/frozen-poultry-light-v1.webp",
              imageAlt:
                "Uncooked frozen poultry breasts, boneless thigh pieces and calibrated strips presented separately",
              decisionSummary: {
                lead:
                  "Product definition and market eligibility must be confirmed together before a poultry route can be offered.",
                facts: [
                  { title: "Product formats", description: "Whole, cuts, boneless or processed" },
                  { title: "Typical use", description: "Retail, foodservice and processing" },
                  {
                    title: "Supply basis",
                    description: "Approved country, establishment and product confirmed by offer",
                  },
                ],
                points: [
                  "Species and cut",
                  "Bone and skin status",
                  "Raw, cooked, seasoned or marinated form",
                  "Unit weight or calibration and added water where relevant",
                  "Halal, health, label and destination-eligibility requirements",
                ],
                supply:
                  "Fixed- or catch-weight formats in food-grade inner packaging and export cartons, as offered.",
              },
              cta: {
                label: "Request a frozen poultry offer",
                href: frozenFoodsQuoteHref("frozen-poultry"),
              },
            },
            {
              id: "frozen-seafood",
              title: "Frozen Seafood",
              description:
                "Fish and seafood products defined by species, origin, production method, size and processing form.",
              image: "/media/products/frozen-foods/frozen-seafood-light-v1.webp",
              imageAlt:
                "Frozen white-fish portions, glazed shrimp and squid rings presented as commercial samples",
              decisionSummary: {
                lead:
                  "Commercial and scientific identity, production route and net product content are central to an accurate seafood offer.",
                facts: [
                  {
                    title: "Product formats",
                    description: "Whole, fillet, portion, block or value-added",
                  },
                  { title: "Typical use", description: "Foodservice, retail and processing" },
                  {
                    title: "Supply basis",
                    description: "Species, wild/farmed status and origin confirmed by offer",
                  },
                ],
                points: [
                  "Catch area or farming country",
                  "Size/count",
                  "Skin, bone and processing form",
                  "Glaze and net weight",
                  "Treatment or additives, establishment approval, health documents and requested sustainability certification",
                ],
                supply:
                  "IQF, block, glazed, unglazed or individually packed formats according to the offered product.",
              },
              cta: {
                label: "Request a frozen seafood offer",
                href: frozenFoodsQuoteHref("frozen-seafood"),
              },
            },
            {
              id: "frozen-pastry-bakery",
              title: "Frozen Pastry & Bakery",
              description:
                "Ready-to-bake, proof-and-bake, part-baked and finished bakery products selected for service and retail.",
              image: "/media/products/frozen-foods/frozen-pastry-bakery-light-v1.webp",
              imageAlt:
                "Unbaked frozen croissants, laminated pastry, puff-pastry squares and dough portions",
              decisionSummary: {
                lead:
                  "Preparation stage, recipe and equipment instructions determine whether a bakery line fits the customer’s operation.",
                facts: [
                  {
                    title: "Product formats",
                    description: "Laminated pastry, frozen dough, part-baked or finished",
                  },
                  {
                    title: "Typical use",
                    description: "Hospitality, foodservice and retail",
                  },
                  {
                    title: "Supply basis",
                    description: "Recipe and production method confirmed by offer",
                  },
                ],
                points: [
                  "Product type and recipe",
                  "Butter or vegetable-fat route where relevant",
                  "Allergens and unit size",
                  "Thawing, proofing and baking instructions",
                  "Finished consistency, shelf life and case configuration",
                ],
                supply: "Trays, bags or inner packs in frozen cartons.",
              },
              cta: {
                label: "Request a frozen pastry and bakery offer",
                href: frozenFoodsQuoteHref("frozen-pastry-bakery"),
              },
            },
          ],
        }}
        editorialFacts={{
          title: "Frozen Food Market Context",
          text: "2025 market estimate and 2026–2034 forecast, published June 2026. Third-party market sizing provides context, not a live price or A3 volume indicator.",
          sources: [
            {
              label: "Fortune Business Insights — Frozen Food Market",
              href: "https://www.fortunebusinessinsights.com/frozen-food-market-104138",
            },
          ],
          items: [
            {
              metric: "US$325.09bn",
              title: "A broad global category",
              description:
                "The global frozen food market was estimated at US$325.09 billion in 2025 across ready meals, seafood and meat, snacks and bakery, and other categories.",
            },
            {
              metric: "38.78%",
              title: "Europe holds the largest regional share",
              description:
                "Europe accounted for 38.78% of the market estimate in 2025, reflecting the depth of its frozen retail and foodservice channels.",
            },
            {
              metric: "5.14%",
              title: "Growth remains forecast",
              description:
                "The same report projects a 5.14% compound annual growth rate from 2026 to 2034. This is a forecast, not a guarantee or live price indicator.",
            },
          ],
        }}
        shipmentOptions={{
          id: "integrated-value-chain",
          title: "Frozen Supply, Structured End to End",
          text: "Frozen programmes require product definition, market eligibility and temperature control to work as one connected route.",
          image: "/media/products/frozen-foods/frozen-service-product-matching-stock-v1.webp",
          imageAlt: "Worker monitoring frozen potato production in a food factory",
          items: [
            {
              title: "Product, Format & Channel Matching",
              description:
                "We define the exact product, preparation stage, intended use, performance target, pack size, volume and destination before approaching producers.",
              image: "/media/products/frozen-foods/frozen-service-product-matching-stock-v1.webp",
              imageAlt: "Worker monitoring frozen potato production in a food factory",
            },
            {
              title: "Producer, Quality & Market Approval",
              description:
                "We align the producer or establishment, certifications, specification, sample, COA and product-specific food-safety or regulatory requirements before commitment.",
              image: "/media/products/frozen-foods/frozen-service-quality-stock-v1.webp",
              imageAlt: "Laboratory worker reviewing frozen-food quality samples",
            },
            {
              title: "Packing, Shelf Life & Cold Chain",
              description:
                "We confirm inner pack and carton configuration, palletisation, production date, required remaining shelf life, −18°C handling and temperature-recording expectations.",
              image: "/media/products/frozen-foods/frozen-service-cold-chain-stock-v1.webp",
              imageAlt: "Warehouse worker moving palletised goods in temperature-controlled storage",
            },
            {
              title: "Reefer Route, Documents & Delivery",
              description:
                "We coordinate Incoterm, pre-cooled reefer equipment, loading checks, booking, health, origin, catch or plant documents as applicable, and delivery milestones.",
              image: "/media/products/frozen-foods/frozen-service-shipment-stock-v1.webp",
              imageAlt: "Unbranded container ship carrying cargo across open water",
            },
          ],
        }}
        related={frozenFoodsRelated}
        finalCta={{
          title: "For frozen food enquiries",
          text: "Share the product, format, end use, pack size, volume, destination, required certifications and delivery window with A3.",
          primary: {
            label: "Discuss a frozen food requirement",
            href: frozenFoodsQuoteHref(),
          },
          variant: "compact-reminder",
        }}
      />
    </>
  );
}
