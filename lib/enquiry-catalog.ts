import { productCategoryDetails } from "@/content/product-details";
import { productCategories } from "@/content/site";

export type EnquiryProductOption = {
  id: string;
  title: string;
  categorySlug: string;
  categoryTitle: string;
  image: string;
  imageAlt: string;
};

export type EnquiryCategoryOption = {
  slug: string;
  title: string;
  products: EnquiryProductOption[];
};

const sugarProducts: EnquiryProductOption[] = [
  ["icumsa-45", "ICUMSA 45 / White Refined Sugar"],
  ["icumsa-150", "ICUMSA 150 / Crystal Sugar"],
  ["icumsa-600-1200", "ICUMSA 600-1200 / Brown Raw Sugar"],
  ["icumsa-60-100", "ICUMSA 60-100 / White Beet Sugar"],
].map(([id, title]) => ({
  id,
  title,
  categorySlug: "sugar",
  categoryTitle: "Sugar",
  image: `/media/products/sugar/${id}.webp`,
  imageAlt: `${title} in its commercial product form`,
}));

const elleMinaProducts: EnquiryProductOption[] = [
  ["elle-mina", "Elle Mina"],
  ["consumer-margarine", "Elle Mina Consumer Margarine"],
  ["professional-margarine", "Elle Mina Professional Margarine"],
  ["butter", "Elle Mina Butter"],
].map(([id, title]) => ({
  id,
  title,
  categorySlug: "consumer-foods",
  categoryTitle: "Consumer Foods",
  image: "/media/brands/elle-mina/consumer-margarine-picnic.webp",
  imageAlt: `${title} product`,
}));

export const enquiryCatalog: EnquiryCategoryOption[] = productCategories.map((category) => {
  const detail = productCategoryDetails[category.slug];
  const products = category.slug === "sugar"
    ? sugarProducts
    : (detail?.products ?? []).map((product) => ({
        id: product.id,
        title: product.title,
        categorySlug: category.slug,
        categoryTitle: category.title,
        image: product.image,
        imageAlt: product.imageAlt,
      }));

  return {
    slug: category.slug,
    title: category.title,
    products: category.slug === "consumer-foods" ? [...products, ...elleMinaProducts] : products,
  };
});

export function findEnquiryCategory(value?: string | null) {
  if (!value) return undefined;
  return enquiryCatalog.find(
    (category) => category.slug === value || category.title.toLowerCase() === value.toLowerCase(),
  );
}

export function findEnquiryProduct(productId?: string | null, categorySlug?: string | null) {
  if (!productId) return undefined;
  const categories = categorySlug ? enquiryCatalog.filter((category) => category.slug === categorySlug) : enquiryCatalog;
  return categories.flatMap((category) => category.products).find((product) => product.id === productId);
}

export function resolveEnquiryContext(categoryValue?: string | null, productValue?: string | null) {
  const directCategory = findEnquiryCategory(categoryValue);
  const product = findEnquiryProduct(productValue, directCategory?.slug) ?? findEnquiryProduct(productValue);
  const category = directCategory ?? findEnquiryCategory(product?.categorySlug);
  return { category, product };
}
