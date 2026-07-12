import type { Metadata } from "next";
import { ProductCategoryDetailPage, buildCategoryMetadata } from "@/components/product-category-page";
import { productCategories } from "@/content/site";

export function generateStaticParams() {
  return productCategories
    .filter((category) => !["coffee", "sugar"].includes(category.slug))
    .map((category) => ({ locale: "en", category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  return buildCategoryMetadata(category);
}

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return <ProductCategoryDetailPage slug={category} />;
}
