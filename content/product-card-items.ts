import { CATEGORY_CARD_IMAGES } from "@/content/product-card-assets";
import {
  homeAssets,
  homeLanding,
  productCategories,
  productCategoryHref,
} from "@/content/site";
import type { ProductCategory } from "@/lib/types";

export type CategoryCardItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
};

export function categoryCardItem(category: ProductCategory): CategoryCardItem {
  const featuredProduct = homeLanding.featuredProducts.find((product) => product.id === category.slug);

  return {
    id: category.slug,
    title: category.title,
    description: category.shortDescription,
    href: productCategoryHref(category),
    image: CATEGORY_CARD_IMAGES[category.slug] ?? homeAssets.media.companyFoodFeastEditorial,
    imageAlt: featuredProduct?.imageAlt ?? `${category.title} sourcing category for commercial buyers`,
  };
}

export function categoryCardItemBySlug(slug: string) {
  const category = productCategories.find((item) => item.slug === slug);
  return category ? categoryCardItem(category) : null;
}
