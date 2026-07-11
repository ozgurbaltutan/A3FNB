import type { Metadata } from "next";
import { ProductCategoryDetailPage, buildCategoryMetadata } from "@/components/product-category-page";

export function generateMetadata(): Metadata {
  return buildCategoryMetadata("green-coffee-beans");
}

export default function CoffeePage() {
  return <ProductCategoryDetailPage slug="green-coffee-beans" />;
}
