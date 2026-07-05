import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailLayout } from "@/components/product-detail-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { getProductCategory, homeAssets, productCategories, productCategoryHref } from "@/content/site";
import type { PageSeo, ProductCategory } from "@/lib/types";
import { breadcrumbJsonLd, buildMetadata, productFamilyJsonLd } from "@/lib/seo";

const robots = { index: true, follow: true };

function categorySeo(category: ProductCategory): PageSeo {
  return {
    metaTitle: `${category.title} Sourcing | A3 Food & Beverage`,
    metaDescription: category.shortDescription,
    canonicalPath: productCategoryHref(category),
    ogTitle: `${category.title} Sourcing`,
    ogDescription: category.longDescription,
    robots,
    locale: "en",
    sitemapInclude: true,
    structuredDataType: "Product",
    targetKeyword: `${category.title.toLowerCase()} sourcing`,
    secondaryKeywords: [`${category.title.toLowerCase()} supplier`, "commercial food sourcing", "B2B food sourcing"],
  };
}

function categoryBreadcrumb(category: ProductCategory) {
  return [
    { label: "Home", href: "/en" },
    { label: "Products", href: "/en/products" },
    { label: category.title, href: productCategoryHref(category) },
  ];
}

function categoryImage(category: ProductCategory) {
  if (!category.imageKey) return undefined;

  return homeAssets.media[category.imageKey as keyof typeof homeAssets.media];
}

function relatedCategories(category: ProductCategory) {
  return productCategories
    .filter((item) => item.slug !== category.slug)
    .slice(0, 3)
    .map((item) => ({ label: item.title, href: productCategoryHref(item) }));
}

export function generateStaticParams() {
  return productCategories
    .filter((category) => !["green-coffee-beans", "sugar"].includes(category.slug))
    .map((category) => ({ locale: "en", category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getProductCategory(slug);

  if (!category) return {};

  return buildMetadata(categorySeo(category));
}

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = getProductCategory(slug);

  if (!category || ["green-coffee-beans", "sugar"].includes(category.slug)) {
    notFound();
  }

  const breadcrumb = categoryBreadcrumb(category);
  const image = categoryImage(category);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <JsonLd
        data={productFamilyJsonLd({
          title: category.title,
          summary: category.shortDescription,
          href: productCategoryHref(category),
          imageAlt: `${category.title} sourcing category for commercial food buyers`,
        })}
      />
      <ProductDetailLayout
        breadcrumb={breadcrumb}
        hero={{
          title: category.title,
          text: category.longDescription,
          image,
          imageAlt: `${category.title} sourcing category for commercial food buyers`,
          note: "Availability depends on product, origin, specification, volume, timing and destination market.",
        }}
        intro={{
          title: `${category.title} sourcing shaped around buyer requirements.`,
          paragraphs: [
            category.longDescription,
            "A3 reviews each requirement through product type, specification, origin preference, packing format, expected volume, documentation needs and destination market before suggesting a workable next step.",
          ],
          note: "Availability depends on product, origin, specification, volume, timing and destination market.",
        }}
        sections={[
          {
            title: `${category.title} examples`,
            text:
              "These examples are used to start a sourcing review. Availability depends on origin, specification, volume, timing and destination market.",
            image,
            imageAlt: `${category.title} examples for commercial sourcing review`,
            items: category.exampleProducts.map((product) => ({
              title: product,
              description: `${product} requirements can be reviewed by specification, packing, documentation and commercial fit.`,
            })),
          },
          {
            title: "Buyer information to share",
            text:
              "The clearer the requirement, the easier it is to check whether suitable producer or supplier options are commercially workable.",
            items: [
              {
                title: "Product details",
                description: "Share product type, grade, specification, use case and any required documents.",
              },
              {
                title: "Commercial requirement",
                description: "Include volume, packing, timing, order model and destination market.",
              },
              {
                title: "Availability review",
                description: "A3 checks whether suitable producer or supplier options are commercially workable.",
              },
            ],
          },
        ]}
        support={{
          title: "How A3 reviews requirements.",
          text:
            "A3 treats each category as an inquiry-led sourcing conversation. Product fit is checked before quotation or supplier discussion moves forward.",
          image: homeAssets.media.howA3Works,
          imageAlt: "Food trade requirement review and documentation materials",
          steps: [
            {
              title: "Product fit",
              description: "Product type, grade, specification, packing format, volume and buyer requirements are checked.",
            },
            {
              title: "Producer capability",
              description: "Supplier availability and capability are reviewed against the required volume and documentation.",
            },
            {
              title: "Market access",
              description: "Destination market, import needs and timing are considered before moving forward.",
            },
            {
              title: "Trade coordination",
              description: "Documentation, shipment and follow-up needs are coordinated where the opportunity is workable.",
            },
          ],
        }}
        faq={[
          {
            title: `${category.title} availability`,
            description:
              "A3 can review the requirement and confirm whether suitable producer or supplier options are commercially workable.",
          },
          {
            title: "Inquiry details",
            description:
              "Share product type, specification, origin preference, packing, volume, destination market, timing and any documentation needs.",
          },
          {
            title: "Stock confirmation",
            description:
              "No. A3 reviews availability by inquiry and confirms supplier fit, documentation and commercial terms before moving forward.",
          },
        ]}
        related={[...relatedCategories(category), { label: "Request a Quote", href: "/en/request-a-quote" }]}
        finalCta={{
          title: `Discuss ${category.title.toLowerCase()} sourcing.`,
          text:
            "Send your requirement so A3 can review the best next step for product, origin, packing, documentation and destination market.",
          primary: { label: category.ctaLabel, href: "/en/request-a-quote" },
          secondary: { label: "View All Products", href: "/en/products" },
        }}
      />
    </>
  );
}
