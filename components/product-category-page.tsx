import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { ProductDetailLayout } from "@/components/product-detail-layout";
import { categoryCardItem } from "@/content/product-card-items";
import { getProductCategoryDetail, productCriteria } from "@/content/product-details";
import { getProductCategory, productCategories, productCategoryHref } from "@/content/site";
import type { PageSeo, ProductCategory } from "@/lib/types";
import { breadcrumbJsonLd, buildMetadata, productFamilyJsonLd } from "@/lib/seo";

const robots = { index: true, follow: true };

const relatedByCategory: Record<string, string[]> = {
  coffee: ["cocoa-products", "dried-fruit-nuts", "consumer-foods"],
  "cocoa-products": ["sugar", "dairy-milk-powders", "oils-fats"],
  "grains-seeds": ["sugar", "oils-fats", "starches-sweeteners"],
  "dairy-milk-powders": ["cocoa-products", "oils-fats", "starches-sweeteners"],
  "oils-fats": ["dairy-milk-powders", "frozen-foods", "consumer-foods"],
  "starches-sweeteners": ["sugar", "dairy-milk-powders", "consumer-foods"],
  "dried-fruit-nuts": ["consumer-foods", "cocoa-products", "frozen-foods"],
  "frozen-foods": ["consumer-foods", "oils-fats", "dairy-milk-powders"],
  "consumer-foods": ["frozen-foods", "oils-fats", "starches-sweeteners"],
};

function quoteHref(category: ProductCategory, product?: string) {
  const params = new URLSearchParams({ category: category.slug });
  if (product) params.set("product", product);
  return `/en/request-a-quote?${params.toString()}`;
}

export function categorySeo(category: ProductCategory): PageSeo {
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

export function buildCategoryMetadata(slug: string) {
  const category = getProductCategory(slug);
  return category ? buildMetadata(categorySeo(category)) : {};
}

function relatedCategories(category: ProductCategory) {
  return (relatedByCategory[category.slug] ?? [])
    .map((slug) => productCategories.find((item) => item.slug === slug))
    .filter((item): item is ProductCategory => Boolean(item))
    .map((item) => {
      const card = categoryCardItem(item);
      return {
        label: card.title,
        href: card.href,
        description: card.description,
        image: card.image,
        imageAlt: card.imageAlt,
      };
    });
}

export function ProductCategoryDetailPage({ slug }: { slug: string }) {
  const category = getProductCategory(slug);
  const detail = getProductCategoryDetail(slug);

  if (!category || !detail) notFound();

  const breadcrumb = [
    { label: "Home", href: "/en" },
    { label: "Products", href: "/en/products" },
    { label: category.title, href: productCategoryHref(category) },
  ];

  const portfolioItems = detail.products.map((item) => {
    return {
      id: item.id,
      title: item.title,
      cardTitle: item.cardTitle,
      description: item.description,
      image: item.image,
      imageAlt: item.imageAlt,
      decisionSummary: {
        lead: item.description,
        facts: [
          { title: "Source", description: item.source },
          { title: "Product form", description: item.format },
          { title: "Packing", description: item.packing },
        ],
        points: [
          item.fit,
          item.selection,
          item.documents ?? "Final documents are confirmed with the commercial offer.",
        ],
        supply: `${item.packing} Volume, destination, timing and route are checked before quotation.`,
      },
      cta: { label: "Request quote for this product", href: quoteHref(category, item.id) },
    };
  });

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <JsonLd
        data={productFamilyJsonLd({
          title: category.title,
          summary: category.shortDescription,
          href: productCategoryHref(category),
          image: detail.image,
        })}
      />
      <ProductDetailLayout
        pageTreatment="surface-flow"
        breadcrumb={breadcrumb}
        hero={{
          title: category.title,
          text: detail.heroText,
          image: detail.image,
          imageAlt: detail.imageAlt,
          hideBreadcrumb: true,
          variant: "compact",
        }}
        sectionNavigation={[
          { label: "Overview", href: "#overview" },
          { label: "Portfolio", href: "#range" },
          { label: "Category context", href: "#market-context" },
          { label: "Selection criteria", href: "#technical-specifications" },
          { label: "Supply", href: "#shipment-options" },
          { label: "Contact", href: "#contact" },
        ]}
        keyFactsPosition="after-portfolio"
        productPortfolio={{
          id: "range",
          title: detail.portfolioTitle,
          text: detail.portfolioText,
          groups: detail.groups.map((group) => ({
            id: group.id,
            title: group.title,
            description: group.description,
            itemIds: detail.products.filter((item) => item.group === group.id).map((item) => item.id),
          })),
          items: portfolioItems,
        }}
        keyFacts={detail.context}
        technicalSpecs={{
          title: "Product selection criteria",
          text: "Compare the criteria used to organise an initial product discussion. Supplier-specific values are confirmed with the offer.",
          selectorLabel: `Select a ${category.title.toLowerCase()} product`,
          disclaimer: "Selection guidance only. Final specification, certificate of analysis, approvals and document set are confirmed against the offered product and destination market.",
          groups: detail.groups.map((group) => ({
            id: group.id,
            title: group.title,
            text: group.description,
            selectorLabel: `Select a ${group.title.toLowerCase()} product`,
            profiles: detail.products.filter((item) => item.group === group.id).map((item) => ({
              title: item.title,
              rows: productCriteria(item),
            })),
          })),
        }}
        shipmentOptions={{
          ...detail.shipment,
        }}
        related={relatedCategories(category)}
        finalCta={{
          title: `For ${category.title.toLowerCase()} enquiries`,
          text: "Share the product, application, packing, volume and destination requirements with A3.",
          primary: { label: category.ctaLabel, href: quoteHref(category) },
          image: detail.image,
          imageAlt: detail.imageAlt,
          tone: "ink",
        }}
      />
    </>
  );
}
