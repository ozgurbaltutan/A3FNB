"use client";

import Image from "next/image";
import { EditorialCopy, EditorialLayout, EditorialMedia, EditorialSection } from "@/components/editorial-section";
import { FinalCta } from "@/components/final-cta";
import { FilteredProductGrid, type ProductGridGroup } from "@/components/filtered-product-grid";
import { InnerPageHero } from "@/components/inner-page-hero";
import { ProcessAccordion } from "@/components/process-accordion";
import { ProductCollection } from "@/components/product-collection";
import { Container, LinkButton, SectionHeader } from "@/components/ui";
import { homeLanding } from "@/content/site";

type ProductLineupGroup = "commodities" | "ingredients" | "retail-foodservice";

export type ProductLineupItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
  group: ProductLineupGroup;
};

const groupLabels: Record<ProductLineupGroup, string> = {
  commodities: "Commodities",
  ingredients: "Ingredients",
  "retail-foodservice": "Retail & Foodservice",
};

const supportItems = [
  {
    title: "Product sourcing",
    text: "Product options are reviewed by type, origin, specification, volume and destination market before a route is considered workable.",
    image: "/media/home/company-food-feast-editorial.webp",
    imageAlt: "Commercial food categories arranged for sourcing review",
  },
  {
    title: "Supplier review",
    text: "A3 checks whether supplier capability, availability and trade conditions fit the buyer requirement before moving into detailed follow-up.",
    image: "/media/home/how-a3-works.webp",
    imageAlt: "A3 sourcing workflow and product review setting",
  },
  {
    title: "Documentation",
    text: "Specifications, certificates and shipment documents are reviewed according to the product, supplier and destination market needs.",
    image: "/media/home/company-trade-editorial.webp",
    imageAlt: "Trade documentation and commercial product review",
  },
  {
    title: "Shipment coordination",
    text: "Packing, loading model, shipment timing and commercial follow-up are coordinated where the opportunity is workable.",
    image: "/media/how-we-work/container-yard-coordination.webp",
    imageAlt: "Container yard and shipment coordination for food trade",
  },
];

export function ProductsLineupPage({ products }: { products: ProductLineupItem[] }) {
  const groups: ProductGridGroup[] = (Object.keys(groupLabels) as ProductLineupGroup[]).map((id) => ({
    id,
    label: groupLabels[id],
    itemIds: products.filter((product) => product.group === id).map((product) => product.id),
  }));

  return (
    <>
      <InnerPageHero
        title="Food products for commercial supply."
        text={[
          "A3 works across selected food categories for wholesalers, distributors, food manufacturers, retailers and commercial buyers.",
          "Each requirement is reviewed by product type, specification, origin, volume, packing format, destination market and shipment timing.",
        ]}
        image="/media/home/products-opening-flour.webp"
        imageAlt="Food preparation and flour used for commercial product supply"
      />

      <section className="products-lineup-page">
        <Container className="a3-container products-lineup-page__inner">
          <ProductCollection
            headerClassName="products-lineup-heading product-section-heading"
            title="Explore the product lineup"
            text="Browse A3 product categories by commercial role, then open the category that best matches the sourcing requirement."
          >
            <FilteredProductGrid
              ariaLabel="Product categories"
              getHref={(product) => product.href}
              getItemLabel={(product) => `Open ${product.title} category`}
              groups={groups}
              items={products}
              mode="link"
              showFilters
              treatment="category-overlay"
            />
          </ProductCollection>
        </Container>
      </section>

      <EditorialSection className="products-own-brand" tone="paper">
        <EditorialLayout className="products-own-brand__layout">
          <EditorialCopy className="products-own-brand__copy" text={homeLanding.ownBrand.text} title={homeLanding.ownBrand.title}>
            <div className="products-own-brand__actions">
              <LinkButton href={homeLanding.ownBrand.href} variant="primary">
                {homeLanding.ownBrand.ctaLabel}
              </LinkButton>
              <LinkButton href="/en/request-a-quote?product=elle-mina" variant="outline">
                Discuss Private Label
              </LinkButton>
            </div>
          </EditorialCopy>
          <EditorialMedia
            alt={homeLanding.ownBrand.imageAlt}
            className="products-own-brand__media"
            position="center center"
            src={homeLanding.ownBrand.image}
          />
        </EditorialLayout>
      </EditorialSection>

      <section className="products-support-band">
        <Container className="a3-container products-support-band__inner">
          <SectionHeader
            className="products-support-band__heading product-section-heading"
            title="How A3 supports product sourcing"
            text="Product availability is only useful when specification, supplier fit, documentation and shipment route can work together."
          />
          <ProcessAccordion
            ariaLabel="How A3 supports product sourcing"
            className="products-support-showcase"
            items={supportItems.map((item, index) => ({
              id: item.title,
              number: String(index + 1).padStart(2, "0"),
              title: item.title,
              description: item.text,
              media: (
                <Image
                  alt={item.imageAlt}
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 54vw, 100vw"
                  src={item.image}
                />
              ),
            }))}
            presentation="showcase"
          />
        </Container>
      </section>

      <FinalCta
        className="products-final-cta"
        image="/media/home/final-cta.webp"
        imageAlt="Commercial food market and buyer activity"
        primary={{ href: "/en/request-a-quote", label: "Share Your Requirement" }}
        text="Share the product category, destination market and commercial requirement. A3 will review whether a suitable supply route can be built around your need."
        title="Looking for a specific food product?"
      />
    </>
  );
}
