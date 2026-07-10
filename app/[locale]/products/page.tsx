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

const categoryGroups: Record<string, ProductLineupItem["group"]> = {
  sugar: "commodities",
  "green-coffee-beans": "commodities",
  "cocoa-products": "commodities",
  "grains-seeds": "commodities",
  "dairy-milk-powders": "ingredients",
  "oils-fats": "ingredients",
  "starches-sweeteners": "ingredients",
  "dried-fruit-nuts": "ingredients",
  "frozen-foods": "retail-foodservice",
  "consumer-foods": "retail-foodservice",
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

  return {
    id: category.slug,
    title: category.title,
    description: categoryCardCopy[category.slug] ?? category.shortDescription,
    href: productCategoryHref(category),
    image,
    imageAlt: featuredProduct?.imageAlt ?? `${category.title} sourcing category for commercial buyers`,
    group: categoryGroups[category.slug] ?? "commodities",
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
