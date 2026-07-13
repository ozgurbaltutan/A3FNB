import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { pages, productCategories, productCategoryHref } from "@/content/site";
import { categoryCardItem } from "@/content/product-card-items";
import type { ProductCategory } from "@/lib/types";
import { breadcrumbJsonLd, buildMetadata, itemListJsonLd } from "@/lib/seo";
import { ProductsLineupPage, type ProductLineupItem } from "./products-lineup";

const breadcrumb = [
  { label: "Home", href: "/en" },
  { label: "Products", href: "/en/products" },
];

const categoryGroups: Record<string, ProductLineupItem["group"]> = {
  sugar: "commodities",
  coffee: "commodities",
  "cocoa-products": "commodities",
  "grains-seeds": "commodities",
  "dairy-milk-powders": "ingredients",
  "oils-fats": "ingredients",
  "starches-sweeteners": "ingredients",
  "dried-fruit-nuts": "ingredients",
  "frozen-foods": "retail-foodservice",
  "consumer-foods": "retail-foodservice",
};

function productLineupItem(category: ProductCategory): ProductLineupItem {
  const sharedCard = categoryCardItem(category);

  return {
    ...sharedCard,
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
