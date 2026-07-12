import type { Metadata } from "next";
import { ProductCategoryDetailPage, buildCategoryMetadata } from "@/components/product-category-page";

export function generateMetadata(): Metadata {
  return buildCategoryMetadata("coffee");
}

export default function CoffeePage() {
  return <ProductCategoryDetailPage slug="coffee" />;
}
