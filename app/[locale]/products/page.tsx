import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { CTASection, FeatureGrid, FilteredContentSection, PageHero, ProductGrid, SplitSection } from "@/components/sections";
import { availabilityModels, pages, productFamilies } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata, itemListJsonLd } from "@/lib/seo";

const breadcrumb = [
  { label: "Home", href: "/en" },
  { label: "Products", href: "/en/products" },
];

export function generateMetadata(): Metadata {
  return buildMetadata(pages.products.seo);
}

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <JsonLd
        data={itemListJsonLd(
          productFamilies.map((product) => ({
            title: product.title,
            href: product.featured ? `/en/products/${product.slug}` : `/en/products#${product.slug}`,
            summary: product.summary,
          })),
        )}
      />
      <PageHero title={pages.products.title} text={pages.products.description} breadcrumb={breadcrumb} />
      <FeatureGrid
        title="Product availability models"
        text="A3 is not presenting fake stock. Availability depends on product, origin, specification, volume, timing and destination market."
        items={availabilityModels}
      />
      <ProductGrid title="Product families" products={productFamilies} compact muted />
      <FilteredContentSection
        title="Browse by application"
        text="Buyers can approach A3 by product category or by the commercial use case behind the requirement."
        items={[
          { title: "Wholesale & Distribution", description: "Repeat trade, packing, origin and market requirements for commercial channels." },
          { title: "Food Manufacturing", description: "Specifications, documentation, certifications and volume planning for ingredient buyers." },
          { title: "Foodservice", description: "Practical sourcing conversations around format, consistency and shipment needs." },
          { title: "Retail & Private Label", description: "Product, label, packing and supplier capability reviewed by case." },
          { title: "Industrial Ingredients", description: "Technical ingredient needs reviewed by application and documentation requirements." },
        ]}
      />
      <SplitSection
        title="Browse by origin and sourcing role"
        text="A3 uses selected sourcing regions and selected commercial market experience. Product availability is reviewed through origin, supplier fit and destination needs."
        points={["South America", "West Africa", "Europe", "Selected origins depending on product"]}
        visualLabel="Origin, product and destination requirement map placeholder"
        muted
      />
      <CTASection
        title="Cannot find the product you need?"
        text="Send A3 your product requirement, target origin, packing format, volume and destination market."
        primary={{ label: "Send Requirement", href: "/en/contact" }}
      />
    </>
  );
}
