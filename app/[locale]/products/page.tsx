import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { Container, LinkButton } from "@/components/ui";
import { homeAssets, homeLanding, pages, productCategories, productCategoryHref } from "@/content/site";
import type { ProductCategory } from "@/lib/types";
import { breadcrumbJsonLd, buildMetadata, itemListJsonLd } from "@/lib/seo";

const breadcrumb = [
  { label: "Home", href: "/en" },
  { label: "Products", href: "/en/products" },
];

const availabilityItems = [
  {
    title: "Regularly Sourced",
    description: "Product categories that can be reviewed repeatedly through known producer, supplier or origin relationships.",
  },
  {
    title: "Available on Request",
    description: "Products assessed case by case when specification, volume, destination and commercial conditions align.",
  },
  {
    title: "Seasonal or Spot Opportunities",
    description: "Products shaped by crop cycles, producer availability, market timing or shipment windows.",
  },
];

type ProductGridItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
  image: string;
  imageAlt: string;
};

function cardCopy(item: { cardSummary?: string; description: string }) {
  return item.cardSummary ?? item.description;
}

function productGridItem(category: ProductCategory): ProductGridItem {
  const featuredProduct = homeLanding.featuredProducts.find((product) => product.id === category.slug);
  const imageKey = category.imageKey as keyof typeof homeAssets.media | undefined;
  const image = featuredProduct?.image ?? (imageKey ? homeAssets.media[imageKey] : homeAssets.media.companyFoodFeastEditorial);
  const icon = featuredProduct?.icon ?? homeAssets.icons[category.iconKey as keyof typeof homeAssets.icons];

  return {
    id: category.slug,
    title: category.title,
    description: featuredProduct ? cardCopy(featuredProduct) : category.shortDescription,
    href: productCategoryHref(category),
    icon,
    image,
    imageAlt: featuredProduct?.imageAlt ?? `${category.title} sourcing category for commercial buyers`,
  };
}

export function generateMetadata(): Metadata {
  return buildMetadata(pages.products.seo);
}

export default function ProductsPage() {
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
      <ProductsOpeningSection />
      <ProductsCategorySection categories={productCategories} />
      <CommercialUseSection />
      <ProductsFinalCta />
    </>
  );
}

function ProductsOpeningSection() {
  return (
    <section className="products-opening">
      <Container className="a3-container products-opening__inner">
        <div className="products-opening__copy">
          <h1 className="type-section products-opening__title">Food products for commercial supply.</h1>
          <div className="products-opening__body">
            <p>A3 works across selected food categories for wholesalers, distributors, food manufacturers, retailers and commercial buyers.</p>
            <p>
              Product availability is not treated as fixed stock. Each requirement is reviewed by product type, specification, origin,
              volume, packing format, destination market and shipment timing. Depending on the category and market conditions, a product may
              be regularly sourced, available on request or shaped by seasonal and spot opportunities.
            </p>
          </div>
          <div className="products-opening__points">
            {availabilityItems.map((item) => (
              <article className="products-opening-point" key={item.title}>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
        <figure className="products-opening__media">
          <Image
            src="/media/home/products-opening-flour.webp"
            alt="Chef dusting flour over fresh ingredients in a professional kitchen"
            fill
            priority
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover"
          />
        </figure>
      </Container>
    </section>
  );
}

function ProductsCategorySection({ categories }: { categories: ProductCategory[] }) {
  const products = categories.map(productGridItem);

  return (
    <section className="products-categories-section">
      <Container className="a3-container">
        <div className="products-section-intro">
          <h2 className="type-section text-ink">Product categories</h2>
          <p className="type-section-lead">
            A3 helps buyers access selected food commodities, ingredients and packaged products, with options shaped around origin,
            specification, packing, volume and shipping requirements.
          </p>
        </div>
        <div className="commodity-bento">
          <div className="commodity-bento__grid">
            {products.map((product, index) => (
              <Link href={product.href} className="commodity-bento__card premium-focus group" key={product.id}>
                <article className="commodity-bento__card-inner">
                  <Image
                    className="commodity-bento__media"
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw"
                    priority={index < 2}
                  />
                  <div className="commodity-bento__overlay" aria-hidden="true" />
                  <div className="commodity-bento__content">
                    <div className="commodity-bento__heading">
                      <span className="commodity-bento__icon-frame" aria-hidden="true">
                        <Image className="commodity-bento__icon" src={product.icon} alt="" width={32} height={32} />
                      </span>
                      <h3 className="commodity-bento__title">{product.title}</h3>
                      <span className="image-card-cta" aria-hidden="true">
                        -&gt;
                      </span>
                    </div>
                    <p className="commodity-bento__description">{product.description}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function CommercialUseSection() {
  return (
    <section className="products-commercial-section">
      <Container className="a3-container">
        <div className="products-section-intro">
          <h2 className="type-section text-ink">Browse by commercial use</h2>
          <p className="type-section-lead">
            Buyers can approach A3 by product category or by the commercial use case behind the requirement.
          </p>
        </div>
        <div className="buyer-segment-panel">
          {homeLanding.buyerPaths.map((path) => (
            <Link className="buyer-segment-card premium-focus" href={path.href} key={path.id}>
              <Image
                className="buyer-segment-card__media"
                src={path.image}
                alt={path.imageAlt}
                fill
                sizes="(min-width: 1024px) 48vw, (min-width: 768px) 33vw, 100vw"
              />
              <div className="buyer-segment-card__overlay" aria-hidden="true" />
              <div className="buyer-segment-card__content">
                <div>
                  <div className="buyer-segment-card__title-row">
                    <h3 className="buyer-segment-card__title">{path.title}</h3>
                    <span className="image-card-cta" aria-hidden="true">
                      -&gt;
                    </span>
                  </div>
                  <p className="buyer-segment-card__hint">{cardCopy(path)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProductsFinalCta() {
  return (
    <section className="final-cta-section products-final-cta bg-teal text-surface">
      <Container className="a3-container final-cta-shell grid items-center gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.62fr)]">
        <div className="final-cta-copy">
          <h2 className="type-section max-w-[620px] text-surface">Looking for a specific food product?</h2>
          <p className="type-section-lead mt-5 max-w-[760px] text-surface">
            Share the product category, destination market and commercial requirement. A3 will review whether a suitable supply route can be
            built around your need.
          </p>
          <div className="mt-6">
            <LinkButton href="/en/request-a-quote" variant="light">
              Share Your Requirement
            </LinkButton>
          </div>
        </div>
        <div className="final-cta-media">
          <Image
            className="object-cover"
            src={homeAssets.media.finalCta}
            alt="Commercial food market and buyer activity"
            fill
            sizes="(min-width: 1024px) 520px, 100vw"
          />
        </div>
      </Container>
    </section>
  );
}
