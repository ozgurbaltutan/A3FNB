import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { homeAssets, homeLanding, pages, productCategories, productCategoryHref } from "@/content/site";
import type { ProductCategory } from "@/lib/types";
import { breadcrumbJsonLd, buildMetadata, itemListJsonLd } from "@/lib/seo";
import { ProductsLineupPage, type ProductLineupItem } from "./products-lineup";

const breadcrumb = [
  { label: "Home", href: "/en" },
  { label: "Products", href: "/en/products" },
];

const categoryMeta: Record<string, {
  group: ProductLineupItem["group"];
  facts: ProductLineupItem["facts"];
}> = {
  sugar: {
    group: "commodities",
    facts: [
      { label: "Formats", value: "Refined, crystal, raw and beet sugar" },
      { label: "Applications", value: "Food production, beverages, retail packing" },
      { label: "Supply focus", value: "Grade, origin, packing and shipment route" },
    ],
  },
  "green-coffee-beans": {
    group: "commodities",
    facts: [
      { label: "Formats", value: "Arabica, Robusta / Conilon and selected lots" },
      { label: "Applications", value: "Roasting, wholesale and distribution" },
      { label: "Supply focus", value: "Origin, cup profile, lot details and documents" },
    ],
  },
  "cocoa-products": {
    group: "commodities",
    facts: [
      { label: "Formats", value: "Beans, powder, butter and liquor" },
      { label: "Applications", value: "Bakery, beverages, chocolate and confectionery" },
      { label: "Supply focus", value: "Specification, origin and packing fit" },
    ],
  },
  "grains-seeds": {
    group: "commodities",
    facts: [
      { label: "Formats", value: "Wheat, corn and sunflower seed" },
      { label: "Applications", value: "Milling, wholesale and food manufacturing" },
      { label: "Supply focus", value: "Crop, origin, route and documents" },
    ],
  },
  "dairy-milk-powders": {
    group: "ingredients",
    facts: [
      { label: "Formats", value: "Whole milk powder, skimmed milk powder, dairy ingredients" },
      { label: "Applications", value: "Bakery, beverages, dairy and confectionery" },
      { label: "Supply focus", value: "Specification, certification and packing" },
    ],
  },
  "oils-fats": {
    group: "ingredients",
    facts: [
      { label: "Formats", value: "Sunflower oil, olive oil, palm olein and specialty fats" },
      { label: "Applications", value: "Retail, foodservice and manufacturing" },
      { label: "Supply focus", value: "Oil profile, channel, packing and destination" },
    ],
  },
  "starches-sweeteners": {
    group: "ingredients",
    facts: [
      { label: "Formats", value: "Corn starch, modified starches, syrups and maltodextrin" },
      { label: "Applications", value: "Sauces, beverages, bakery and dry mixes" },
      { label: "Supply focus", value: "Function, specification and document needs" },
    ],
  },
  "dried-fruit-nuts": {
    group: "ingredients",
    facts: [
      { label: "Formats", value: "Dried fruits, raisins, nuts and application grades" },
      { label: "Applications", value: "Bakery, snacking, retail and manufacturing" },
      { label: "Supply focus", value: "Type, origin, grade and packing" },
    ],
  },
  "frozen-foods": {
    group: "retail-foodservice",
    facts: [
      { label: "Formats", value: "Frozen vegetables, fruits, potato products and bakery" },
      { label: "Applications", value: "Foodservice, retail and distribution" },
      { label: "Supply focus", value: "Cold chain, pack size, storage and channel" },
    ],
  },
  "consumer-foods": {
    group: "retail-foodservice",
    facts: [
      { label: "Formats", value: "Pasta, sauces, condiments, canned foods and tomato paste" },
      { label: "Applications", value: "Retail, wholesale, foodservice and private label" },
      { label: "Supply focus", value: "Brand, packing, shelf life and market fit" },
    ],
  },
};

const categoryCardCopy: Record<string, string> = {
  sugar: "Cane and beet sugar grades for food production, beverages and retail packing.",
  "green-coffee-beans": "Green coffee beans selected for roasters, traders and wholesale programs.",
  "cocoa-products": "Cocoa powder, butter, mass and liquor for food producers.",
  "grains-seeds": "Wheat, corn and sunflower seed options for milling, food manufacturing and trade.",
  "dairy-milk-powders": "Milk powders and dairy ingredients for bakery, beverages and food production.",
  "oils-fats": "Edible oils and fats for retail, foodservice and manufacturing.",
  "starches-sweeteners": "Starches, syrups and sweeteners for texture, body and sweetness control.",
  "dried-fruit-nuts": "Dried fruits, raisins and nuts for bakery, snacking and retail programs.",
  "frozen-foods": "Frozen vegetables, fruits, potato products and bakery items for retail and foodservice.",
  "consumer-foods": "Retail and foodservice products including pasta, sauces, condiments and canned foods.",
};

function productLineupItem(category: ProductCategory): ProductLineupItem {
  const featuredProduct = homeLanding.featuredProducts.find((product) => product.id === category.slug);
  const imageKey = category.imageKey as keyof typeof homeAssets.media | undefined;
  const image = featuredProduct?.image ?? (imageKey ? homeAssets.media[imageKey] : homeAssets.media.companyFoodFeastEditorial);
  const meta = categoryMeta[category.slug];

  return {
    id: category.slug,
    title: category.title,
    description: categoryCardCopy[category.slug] ?? category.shortDescription,
    href: productCategoryHref(category),
    image,
    imageAlt: featuredProduct?.imageAlt ?? `${category.title} sourcing category for commercial buyers`,
    group: meta?.group ?? "commodities",
    quoteHref: `/en/request-a-quote?category=${encodeURIComponent(category.slug)}`,
    quoteLabel: category.ctaLabel,
    facts: meta?.facts ?? [
      { label: "Formats", value: category.exampleProducts.slice(0, 3).join(", ") },
      { label: "Applications", value: "Commercial sourcing by requirement" },
      { label: "Supply focus", value: "Specification, packing and documents" },
    ],
  };
}

export function generateMetadata(): Metadata {
  return buildMetadata(pages.products.seo);
}

export default function ProductsPage() {
  const products = productCategories.map(productLineupItem);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <JsonLd
        data={itemListJsonLd(
          productCategories.map((category) => ({
            title: category.title,
            href: productCategoryHref(category),
            summary: category.shortDescription,
          })),
        )}
      />
      <ProductsLineupPage products={products} />
    </>
  );
}
