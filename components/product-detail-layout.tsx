"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { clsx } from "clsx";
import { Breadcrumb } from "@/components/breadcrumb";
import { InnerPageHero } from "@/components/inner-page-hero";
import { Container, LinkButton } from "@/components/ui";
import { homeAssets, productCategories, productCategoryHref } from "@/content/site";
import type { NavigationItem } from "@/lib/types";

type ProductDetailItem = {
  title: string;
  description: string;
};

type ProductDetailLink = {
  label: string;
  href: string;
};

type ProductDetailHero = {
  title: string;
  text: string | string[];
  image?: string;
  imageAlt: string;
  note?: string;
  hideBreadcrumb?: boolean;
  variant?: "default" | "masthead" | "split" | "compact";
  cta?: ProductDetailLink;
};

type ProductDetailSection = {
  title: string;
  text?: string;
  items: ProductDetailItem[];
  image?: string;
  imageAlt?: string;
  variant?: "list" | "compact";
};

type ProductVisualItem = ProductDetailItem & {
  image: string;
  imageAlt: string;
};

type ProductSpecRow = {
  parameter: string;
  specification: string;
};

type ProductRangeOffering = {
  title: string;
  description: string;
  facts?: ProductSpecRow[];
  specs?: ProductSpecRow[];
  cta?: ProductDetailLink;
};

type ProductRangeGroup = {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  summary?: ProductSpecRow[];
  offerings: ProductRangeOffering[];
};

type ProductPortfolioItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  source: string;
  fit: string;
  overview: string;
  keyDetails?: ProductDetailItem[];
  applications: string[];
  specs?: ProductSpecRow[];
  packing: ProductDetailItem[];
  origin: ProductDetailItem[];
  cta?: ProductDetailLink;
};

type ProductPortfolioGroup = {
  title: string;
  description: string;
  itemIds: string[];
};

type ProductPortfolio = {
  id?: string;
  title: string;
  text: string;
  display?: "lineup";
  initialVisibleCount?: number;
  filters?: { id: string; label: string; itemIds: string[] }[];
  groups?: ProductPortfolioGroup[];
  items: ProductPortfolioItem[];
};

type ProductTechnicalSpecProfile = {
  title: string;
  subtitle?: string;
  rows: ProductSpecRow[];
};

type ProductDocumentItem = ProductDetailItem & {
  href?: string;
  linkLabel?: string;
};

type ProductOriginSection = {
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  facts: ProductDetailItem[];
  regions?: string[];
};

type ProductSupportSection = {
  title: string;
  text: string;
  image?: string;
  imageAlt?: string;
  steps: ProductDetailItem[];
  resource?: ProductDetailLink;
  variant?: "compact" | "media";
};

type ProductShipmentOptions = {
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  items: ProductDetailItem[];
};

type ProductStorySection = {
  title: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
};

type ProductDetailProps = {
  breadcrumb: NavigationItem[];
  hero?: ProductDetailHero;
  intro?: {
    title: string;
    paragraphs: string[];
    note?: string;
  };
  storySections?: ProductStorySection[];
  afterSupportStorySections?: ProductStorySection[];
  profiles?: {
    title: string;
    text: string;
    items: ProductVisualItem[];
  };
  productRange?: {
    title: string;
    text: string;
    variant?: "default" | "simple";
    groups: ProductRangeGroup[];
  };
  productPortfolio?: ProductPortfolio;
  technicalSpecs?: {
    title: string;
    text?: string;
    profiles: ProductTechnicalSpecProfile[];
  };
  documents?: {
    title: string;
    text: string;
    items: ProductDocumentItem[];
  };
  origin?: ProductOriginSection;
  shipmentOptions?: ProductShipmentOptions;
  sections?: ProductDetailSection[];
  support?: ProductSupportSection;
  faq?: ProductDetailItem[];
  related?: ProductDetailLink[];
  finalCta: {
    title: string;
    text: string;
    primary: ProductDetailLink;
    secondary?: ProductDetailLink;
    image?: string;
    imageAlt?: string;
    tone?: "teal" | "ink";
  };
};

export function ProductDetailLayout({
  breadcrumb,
  hero,
  intro,
  storySections,
  afterSupportStorySections,
  profiles,
  productRange,
  productPortfolio,
  technicalSpecs,
  documents,
  origin,
  shipmentOptions,
  sections = [],
  support,
  related,
  finalCta,
}: ProductDetailProps) {
  const useBuyerInformation = Boolean(technicalSpecs && (productRange || productPortfolio) && (sections.length || documents || support));
  const storyHero = !hero && !productPortfolio ? storySections?.[0] : undefined;
  const leadingStorySections = productPortfolio ? [] : (storyHero ? (storySections?.slice(1) ?? []) : (storySections ?? []));
  const portfolioStorySections = productPortfolio ? (storySections ?? []) : [];

  return (
    <>
      {hero ? <ProductDetailHero hero={hero} breadcrumb={breadcrumb} /> : null}
      {storyHero ? (
        <InnerPageHero
          title={storyHero.title}
          text={storyHero.paragraphs}
          image={storyHero.image}
          imageAlt={storyHero.imageAlt}
          breadcrumb={breadcrumb}
        />
      ) : null}
      {leadingStorySections.map((section, index) => (
        <ProductStory key={section.title} priority={index === 0} section={section} />
      ))}
      {intro ? <ProductIntro intro={intro} /> : null}
      {productRange ? (
        <ProductRange profiles={productRange} />
      ) : profiles ? (
        <ProductProfiles profiles={profiles} />
      ) : null}
      {productPortfolio ? <ProductPortfolioSection portfolio={productPortfolio} /> : null}
      {portfolioStorySections.map((section, index) => (
        <ProductStory key={section.title} priority={index === 0} section={section} />
      ))}
      {technicalSpecs ? <ProductTechnicalSpecs specs={technicalSpecs} /> : null}
      {shipmentOptions ? <ShipmentOptions options={shipmentOptions} /> : null}
      {origin ? <ProductOrigin origin={origin} /> : null}
      {useBuyerInformation ? (
        <BuyerInformation sections={sections} documents={documents} support={support} />
      ) : (
        <>
          {sections.map((section) => (
            <ProductInfoSection key={section.title} section={section} />
          ))}
          {documents ? <ProductDocuments documents={documents} /> : null}
          {support ? <ProductSupport support={support} /> : null}
        </>
      )}
      {afterSupportStorySections?.map((section) => (
        <ProductStory key={section.title} section={section} />
      ))}
      {related?.length ? <RelatedProducts links={related} /> : null}
      <ProductFinalCta cta={finalCta} />
    </>
  );
}

function ProductStory({
  section,
  priority = false,
}: {
  section: ProductStorySection;
  priority?: boolean;
}) {
  const media = (
    <figure className="product-detail-story__media">
      <Image
        src={section.image}
        alt={section.imageAlt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 42vw, 100vw"
        className="object-cover"
      />
    </figure>
  );

  const copy = (
    <div className="product-detail-story__copy">
      <h2 className="type-section">{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );

  return (
    <section className="product-detail-section product-detail-story">
      <Container className={clsx("a3-container product-detail-story__inner", section.imagePosition === "left" && "is-reversed")}>
        {section.imagePosition === "left" ? media : copy}
        {section.imagePosition === "left" ? copy : media}
      </Container>
    </section>
  );
}

function ProductDetailHero({
  hero,
  breadcrumb,
}: {
  hero: ProductDetailHero;
  breadcrumb: NavigationItem[];
}) {
  const paragraphs = Array.isArray(hero.text) ? hero.text : [hero.text];

  if (hero.variant === "compact") {
    return (
      <InnerPageHero
        title={hero.title}
        text={paragraphs}
        image={hero.image ?? homeAssets.media.companyFoodFeastEditorial}
        imageAlt={hero.imageAlt}
        breadcrumb={hero.hideBreadcrumb ? undefined : breadcrumb}
        className="product-detail-opening"
      >
        {hero.note ? <p className="product-detail-note inner-page-hero__note">{hero.note}</p> : null}
      </InnerPageHero>
    );
  }

  return (
    <section
      className={clsx(
        "product-detail-hero",
        hero.variant === "masthead" && "product-detail-hero--masthead",
        hero.variant === "split" && "product-detail-hero--split",
      )}
    >
      <Container className="a3-container product-detail-hero__inner">
        {!hero.hideBreadcrumb ? (
          <div className="product-detail-hero__breadcrumb">
            <Breadcrumb items={breadcrumb} />
          </div>
        ) : null}
        {hero.image ? (
          <figure className="product-detail-hero__media">
            <Image src={hero.image} alt={hero.imageAlt} fill priority sizes="(min-width: 1024px) 1180px, 100vw" className="object-cover" />
          </figure>
        ) : null}
        <div className="product-detail-hero__copy">
          <h1 className="type-hero product-detail-hero__title">{hero.title}</h1>
          <div className="type-hero-body product-detail-hero__text">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {hero.note ? <p className="product-detail-note">{hero.note}</p> : null}
          {hero.cta ? (
            <LinkButton href={hero.cta.href} variant="primary" className="product-detail-hero__cta">
              {hero.cta.label}
            </LinkButton>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

function ProductIntro({ intro }: { intro: NonNullable<ProductDetailProps["intro"]> }) {
  return (
    <section className="product-detail-intro">
      <Container className="a3-container product-detail-intro__inner">
        <h2 className="type-section">{intro.title}</h2>
        <div className="product-detail-intro__copy">
          {intro.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {intro.note ? <p className="product-detail-note">{intro.note}</p> : null}
        </div>
      </Container>
    </section>
  );
}

function ProductRange({ profiles }: { profiles: NonNullable<ProductDetailProps["productRange"]> }) {
  if (profiles.variant === "simple") {
    return <ProductRangeSimple profiles={profiles} />;
  }

  return (
    <section className="product-detail-section product-range-section" id="range">
      <Container className="a3-container product-range-section__inner">
        <div className="product-detail-section__header product-range-section__header">
          <h2 className="type-section">{profiles.title}</h2>
          <p className="type-section-lead">{profiles.text}</p>
        </div>
        <div className="product-range-groups">
          {profiles.groups.map((group) => (
            <article className="product-range-group" key={group.title}>
              <aside className="product-range-group__header">
                {group.image ? (
                  <figure className="product-range-group__media">
                    <Image
                      src={group.image}
                      alt={group.imageAlt ?? ""}
                      fill
                      sizes="(min-width: 1024px) 320px, 100vw"
                      className="object-cover"
                    />
                  </figure>
                ) : null}
                <div className="product-range-group__copy">
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                </div>
                {group.summary?.length ? <ProductRangeMeta className="product-range-group__meta" rows={group.summary} /> : null}
              </aside>
              <div className="product-range-offerings">
                {group.offerings.map((offering) => (
                  <article className="product-range-offering" key={offering.title}>
                    <div className="product-range-offering__copy">
                      <h4>{offering.title}</h4>
                      <p>{offering.description}</p>
                    </div>
                    {offering.facts?.length ? <ProductRangeMeta className="product-range-offering__meta" rows={offering.facts.slice(0, 2)} /> : null}
                    {offering.cta ? (
                      <Link className="product-range-offering__link premium-focus" href={offering.cta.href}>
                        {offering.cta.label}
                      </Link>
                    ) : null}
                  </article>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProductRangeSimple({ profiles }: { profiles: NonNullable<ProductDetailProps["productRange"]> }) {
  return (
    <section className="product-detail-section product-range-section product-range-section--simple" id="range">
      <Container className="a3-container product-range-section__inner">
        <div className="product-detail-section__header product-range-section__header">
          <h2 className="type-section">{profiles.title}</h2>
          <p className="type-section-lead">{profiles.text}</p>
        </div>
        <div className="product-range-simple" role="table" aria-label={profiles.title}>
          <div className="product-range-simple__head" role="row">
            <span role="columnheader">Product</span>
            <span role="columnheader">Source</span>
            <span role="columnheader">Fit</span>
          </div>
          {profiles.groups.map((group) => {
            const source =
              findSpecValue(group.summary, "Source") ??
              findSpecValue(group.summary, "Origin") ??
              group.title;

            return (
              <div className="product-range-simple__group" key={group.title}>
                <div className="product-range-simple__group-title">{group.title}</div>
                {group.offerings.map((offering) => (
                  <div className="product-range-simple__row" role="row" key={offering.title}>
                    <strong role="cell">{offering.title}</strong>
                    <span role="cell">{source}</span>
                    <span role="cell">
                      {findSpecValue(offering.facts, "Common fit") ??
                        findSpecValue(offering.facts, "Applications") ??
                        offering.description}
                    </span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function ProductPortfolioSection({ portfolio }: { portfolio: ProductPortfolio }) {
  const initialVisibleCount = portfolio.initialVisibleCount ?? 4;
  const [revealedProductId, setRevealedProductId] = useState<string | null>(null);
  const [activeFilterId, setActiveFilterId] = useState<string>(portfolio.filters?.[0]?.id ?? "all");
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);
  const pointerStartedCollapsedId = useRef<string | null>(null);
  const revealSentinelRef = useRef<HTMLDivElement | null>(null);
  const revealLockRef = useRef(false);
  const filteredItemIds =
    portfolio.filters?.find((filter) => filter.id === activeFilterId)?.itemIds ?? portfolio.items.map((item) => item.id);
  const filteredItems = filteredItemIds
    .map((id) => portfolio.items.find((item) => item.id === id))
    .filter((item): item is ProductPortfolioItem => Boolean(item));
  const visibleItems = filteredItems.slice(0, visibleCount);

  useEffect(() => {
    setVisibleCount(initialVisibleCount);
    setRevealedProductId(null);
    revealLockRef.current = false;
  }, [activeFilterId, initialVisibleCount]);

  useEffect(() => {
    const sentinel = revealSentinelRef.current;
    if (!sentinel || visibleCount >= filteredItems.length) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || revealLockRef.current) return;

        revealLockRef.current = true;
        setVisibleCount((currentCount) => Math.min(currentCount + 4, filteredItems.length));
        window.setTimeout(() => {
          revealLockRef.current = false;
        }, 260);
      },
      { rootMargin: "120px 0px" },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [filteredItems.length, visibleCount]);

  return (
    <section className="product-detail-section product-portfolio-section" id={portfolio.id ?? "range"}>
      <Container className="a3-container product-portfolio-section__inner">
        <div className="product-portfolio-section__header">
          <h2 className="type-section">{portfolio.title}</h2>
          <p className="type-section-lead">{portfolio.text}</p>
        </div>
        {portfolio.filters?.length ? (
          <div className="product-portfolio-filters" aria-label={`${portfolio.title} filters`} role="tablist">
            {portfolio.filters.map((filter) => (
              <button
                aria-selected={activeFilterId === filter.id}
                className={clsx("product-portfolio-filter premium-focus", activeFilterId === filter.id && "is-active")}
                key={filter.id}
                onClick={() => {
                  setActiveFilterId(filter.id);
                  setRevealedProductId(null);
                }}
                role="tab"
                type="button"
              >
                {filter.label}
              </button>
            ))}
          </div>
        ) : null}
        <div className="product-portfolio-lineup">
          {visibleItems.map((item, index) => {
            const isRevealed = revealedProductId === item.id;
            const revealDetails = getPortfolioRevealDetails(item);

            return (
              <article
                className={clsx("product-portfolio-card", isRevealed && "is-revealed")}
                id={item.id}
                key={item.id}
                style={{ "--portfolio-reveal-index": index % 4 } as CSSProperties}
                onBlurCapture={(event) => {
                  const nextTarget = event.relatedTarget;
                  if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
                    setRevealedProductId((currentId) => (currentId === item.id ? null : currentId));
                  }
                }}
                onFocusCapture={() => setRevealedProductId(item.id)}
                onMouseEnter={() => setRevealedProductId(item.id)}
                onMouseLeave={(event) => {
                  if (event.currentTarget.contains(document.activeElement)) {
                    return;
                  }
                  setRevealedProductId((currentId) => (currentId === item.id ? null : currentId));
                }}
              >
                <div className="product-portfolio-card__media">
                  <Image alt={item.imageAlt} fill sizes="(max-width: 767px) 100vw, 25vw" src={item.image} />
                </div>
                <div className="product-portfolio-card__body">
                  <div className="product-portfolio-card__copy">
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                  </div>
                  <div aria-hidden={!isRevealed} className="product-portfolio-card__reveal">
                    {revealDetails.map((detail) => (
                      <div className="product-portfolio-card__detail" key={detail.title}>
                        <span>{detail.title}</span>
                        <strong>{detail.description}</strong>
                      </div>
                    ))}
                  </div>
                </div>
                <Link
                  aria-expanded={isRevealed}
                  aria-label={`${isRevealed && item.cta ? item.cta.label : "View details"}: ${item.title}`}
                  className="product-portfolio-card__trigger premium-focus"
                  href={item.cta?.href ?? "#"}
                  onPointerDownCapture={() => {
                    pointerStartedCollapsedId.current = revealedProductId === item.id ? null : item.id;
                  }}
                  onClick={(event) => {
                    const shouldReveal = pointerStartedCollapsedId.current === item.id || !isRevealed || !item.cta;
                    pointerStartedCollapsedId.current = null;

                    if (shouldReveal) {
                      event.preventDefault();
                      setRevealedProductId(item.id);
                    }
                  }}
                >
                  {isRevealed && item.cta ? item.cta.label : "View details"}
                </Link>
              </article>
            );
          })}
        </div>
        {filteredItems.length > visibleItems.length ? (
          <div aria-hidden="true" className="product-portfolio-reveal-sentinel" ref={revealSentinelRef} />
        ) : null}
      </Container>
    </section>
  );
}

function getPortfolioRevealDetails(product: ProductPortfolioItem) {
  const details = product.keyDetails?.length
    ? product.keyDetails
    : [
        { title: "Source", description: product.source },
        { title: "Typical uses", description: product.fit },
        ...product.packing.slice(0, 1),
      ];

  return ["Source", "Typical uses", "Packing"]
    .map((title) => details.find((detail) => detail.title.toLowerCase() === title.toLowerCase()))
    .filter((detail): detail is ProductDetailItem => Boolean(detail));
}

function findSpecValue(rows: ProductSpecRow[] | undefined, parameter: string) {
  return rows?.find((row) => row.parameter.toLowerCase() === parameter.toLowerCase())?.specification;
}

function ProductRangeMeta({ rows, className }: { rows: ProductSpecRow[]; className?: string }) {
  return (
    <dl className={clsx("product-range-meta", className)}>
      {rows.map((row) => (
        <div className="product-range-meta__row" key={row.parameter}>
          <dt>{row.parameter}</dt>
          <dd>{row.specification}</dd>
        </div>
      ))}
    </dl>
  );
}

function ProductTechnicalSpecs({ specs }: { specs: NonNullable<ProductDetailProps["technicalSpecs"]> }) {
  const parameters = Array.from(new Set(specs.profiles.flatMap((profile) => profile.rows.map((row) => row.parameter))));

  return (
    <section className="product-detail-section product-technical-specs" id="technical-specifications">
      <Container className="a3-container product-technical-specs__inner">
        <div className="product-detail-section__header">
          <h2 className="type-section">{specs.title}</h2>
          {specs.text ? <p className="type-section-lead">{specs.text}</p> : null}
        </div>
        <div className="product-technical-specs__matrix" role="table" aria-label={specs.title}>
          <div className="product-technical-specs__head" role="row">
            <span role="columnheader">Parameter</span>
            {specs.profiles.map((profile) => (
              <strong role="columnheader" key={profile.title}>
                {profile.title}
                {profile.subtitle ? <small>{profile.subtitle}</small> : null}
              </strong>
            ))}
          </div>
          {parameters.map((parameter) => (
            <div className="product-technical-specs__row" role="row" key={parameter}>
              <span role="rowheader">{parameter}</span>
              {specs.profiles.map((profile) => {
                const value = profile.rows.find((row) => row.parameter === parameter)?.specification ?? "-";
                return (
                  <strong role="cell" key={`${profile.title}-${parameter}`}>
                    {value}
                  </strong>
                );
              })}
            </div>
          ))}
        </div>
        <div className="product-technical-specs__cards">
          {specs.profiles.map((profile) => (
            <article key={profile.title}>
              <h3>
                {profile.title}
                {profile.subtitle ? <span>{profile.subtitle}</span> : null}
              </h3>
              <ProductSpecTable rows={profile.rows} />
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ShipmentOptions({ options }: { options: ProductShipmentOptions }) {
  const [activeItem, setActiveItem] = useState<string | null>(options.items[0]?.title ?? null);

  return (
    <section className="product-detail-section shipment-options-section" id="shipment-options">
      <Container className="a3-container shipment-options-section__inner">
        <div className="shipment-options-section__copy">
          <h2 className="type-section">{options.title}</h2>
          <p className="type-section-lead">{options.text}</p>
          <div className="process-accordion shipment-options-section__steps">
            {options.items.map((item, index) => {
              const isActive = activeItem === item.title;
              const panelId = `shipment-option-${index + 1}`;
              const number = String(index + 1).padStart(2, "0");

              return (
                <article className={clsx("process-accordion-item", isActive && "is-active")} key={item.title}>
                  <button
                    aria-controls={panelId}
                    aria-expanded={isActive}
                    className="process-accordion-trigger"
                    onClick={() => setActiveItem((currentItem) => (currentItem === item.title ? null : item.title))}
                    type="button"
                  >
                    <span className="process-accordion-index">{number}</span>
                    <span className="process-accordion-title">{item.title}</span>
                    <span className="process-accordion-arrow" aria-hidden="true" />
                  </button>
                  <div className="process-accordion-panel" id={panelId}>
                    <p>{item.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <figure className="shipment-options-section__media">
          <Image src={options.image} alt={options.imageAlt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
        </figure>
      </Container>
    </section>
  );
}

function ProductProfiles({ profiles }: { profiles: NonNullable<ProductDetailProps["profiles"]> }) {
  return (
    <section className="product-detail-section product-detail-profiles">
      <Container className="a3-container">
        <div className="product-detail-section__header">
          <h2 className="type-section">{profiles.title}</h2>
          <p className="type-section-lead">{profiles.text}</p>
        </div>
        <div className="product-profile-list">
          {profiles.items.map((item) => (
            <article className="product-profile-row" key={item.title}>
              <div className="product-profile-row__media">
                <Image src={item.image} alt={item.imageAlt} fill sizes="(min-width: 1024px) 280px, 100vw" className="object-cover" />
              </div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProductSpecTable({ rows, className }: { rows: ProductSpecRow[]; className?: string }) {
  return (
    <div className={clsx("product-spec-table", className)} role="table">
      {rows.map((row) => (
        <div className="product-spec-table__row" key={row.parameter} role="row">
          <span role="rowheader">{row.parameter}</span>
          <strong role="cell">{row.specification}</strong>
        </div>
      ))}
    </div>
  );
}

function ProductOrigin({ origin }: { origin: ProductOriginSection }) {
  return (
    <section className="product-detail-section product-detail-origin">
      <Container className="a3-container product-detail-origin__inner">
        <div className="product-detail-origin__copy">
          <h2 className="type-section">{origin.title}</h2>
          <p className="type-section-lead">{origin.text}</p>
          <div className="product-detail-origin__facts">
            {origin.facts.map((fact) => (
              <article key={fact.title}>
                <h3>{fact.title}</h3>
                <p>{fact.description}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="product-detail-origin__visual">
          <div className="product-detail-origin__media">
            <Image src={origin.image} alt={origin.imageAlt} fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProductInfoSection({ section }: { section: ProductDetailSection }) {
  return (
    <section className={clsx("product-detail-section", section.variant === "compact" && "product-detail-section--compact")}>
      <Container className="a3-container product-detail-editorial">
        {section.image ? (
          <figure className="product-detail-editorial__media">
            <Image
              src={section.image}
              alt={section.imageAlt ?? ""}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </figure>
        ) : null}
        <div className="product-detail-editorial__copy">
          <h2 className="type-section">{section.title}</h2>
          {section.text ? <p className="type-section-lead">{section.text}</p> : null}
          <div className="product-detail-checklist">
            {section.items.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function BuyerInformation({
  sections,
  documents,
  support,
}: {
  sections: ProductDetailSection[];
  documents?: NonNullable<ProductDetailProps["documents"]>;
  support?: ProductSupportSection;
}) {
  const requirement = sections[0];

  return (
    <section className="product-detail-section product-buyer-info" id="documents">
      <Container className="a3-container product-buyer-info__inner">
        <div className="product-buyer-info__intro">
          <h2 className="type-section">Commercial review</h2>
          <p className="type-section-lead">
            A3 reviews supply, documents and route before moving a requirement toward quotation.
          </p>
        </div>
        <div className="product-buyer-info__columns">
          {requirement ? (
            <article className="product-buyer-info__column">
              <h3>Supply and packing</h3>
              <p>{requirement.text}</p>
              <div className="product-buyer-info__list">
                {requirement.items.map((item) => (
                  <section key={item.title}>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </section>
                ))}
              </div>
            </article>
          ) : null}
          {documents ? (
            <article className="product-buyer-info__column">
              <h3>Documents and quality</h3>
              <p>{documents.text}</p>
              <div className="product-buyer-info__list">
                {documents.items.map((item) => (
                  <section key={item.title}>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                    {item.href ? (
                      <Link className="product-documents-item__link premium-focus" href={item.href}>
                        {item.linkLabel ?? "View resource"}
                      </Link>
                    ) : null}
                  </section>
                ))}
              </div>
            </article>
          ) : null}
          {support ? (
            <article className="product-buyer-info__column">
              <h3>Requirement review</h3>
              <p>{support.text}</p>
              <div className="product-buyer-info__list product-buyer-info__steps">
                {support.steps.map((step, index) => (
                  <section key={step.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h4>{step.title}</h4>
                      <p>{step.description}</p>
                    </div>
                  </section>
                ))}
              </div>
            </article>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

function ProductDocuments({ documents }: { documents: NonNullable<ProductDetailProps["documents"]> }) {
  return (
    <section className="product-detail-section product-documents-section" id="documents">
      <Container className="a3-container product-documents-section__inner">
        <div className="product-documents-section__copy">
          <h2 className="type-section">{documents.title}</h2>
          <p className="type-section-lead">{documents.text}</p>
        </div>
        <div className="product-documents-list">
          {documents.items.map((item) => (
            <article className="product-documents-item" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {item.href ? (
                <Link className="product-documents-item__link premium-focus" href={item.href}>
                  {item.linkLabel ?? "View resource"}
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProductSupport({ support }: { support: ProductSupportSection }) {
  const [activeStep, setActiveStep] = useState<string | null>("01");
  const useMediaLayout = support.variant === "media" && support.image;

  return (
    <section className={clsx("product-detail-section product-detail-support", !useMediaLayout && "product-detail-support--compact")}>
      <Container className="a3-container product-detail-support__inner">
        <div className="product-detail-support__copy">
          <h2 className="type-section">{support.title}</h2>
          <p className="type-section-lead">{support.text}</p>
          {useMediaLayout ? (
            <div className="process-accordion product-detail-support__steps">
              {support.steps.map((step, index) => {
                const number = String(index + 1).padStart(2, "0");
                const isActive = activeStep === number;
                const panelId = `product-support-step-${number}`;

                return (
                <article className={clsx("process-accordion-item", isActive && "is-active")} key={step.title}>
                  <button
                    aria-controls={panelId}
                    aria-expanded={isActive}
                    className="process-accordion-trigger"
                    onClick={() => setActiveStep((currentStep) => (currentStep === number ? null : number))}
                    type="button"
                  >
                    <span className="process-accordion-index">{number}</span>
                    <span className="process-accordion-title">{step.title}</span>
                    <span className="process-accordion-arrow" aria-hidden="true" />
                  </button>
                  <div className="process-accordion-panel" id={panelId}>
                    <p>{step.description}</p>
                  </div>
                </article>
                );
              })}
            </div>
          ) : (
            <div className="product-detail-support__list">
              {support.steps.map((step, index) => (
                <article key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
        {useMediaLayout ? (
          <figure className="product-detail-support__media">
            <Image src={support.image!} alt={support.imageAlt ?? ""} fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
          </figure>
        ) : null}
      </Container>
    </section>
  );
}

function RelatedProducts({ links }: { links: ProductDetailLink[] }) {
  return (
    <section className="product-detail-related">
      <Container className="a3-container product-detail-related__inner">
        <h2 className="type-panel-title">You may be interested in</h2>
        <div className="product-detail-related__links">
          {links.map((link) => (
            <RelatedProductLink link={link} key={link.href} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function RelatedProductLink({ link }: { link: ProductDetailLink }) {
  const category = productCategories.find((item) => productCategoryHref(item) === link.href);
  const description =
    category?.shortDescription ??
    (link.href.includes("markets-sourcing")
      ? "Origin and destination market context for commercial sourcing requirements."
      : "Continue the sourcing conversation with A3.");

  return (
    <Link className="product-detail-related__link premium-focus" href={link.href}>
      <span>{category?.title ?? link.label}</span>
      <small>{description}</small>
    </Link>
  );
}

function ProductFinalCta({ cta }: { cta: ProductDetailProps["finalCta"] }) {
  const image = cta.image ?? homeAssets.media.finalCta;
  const imageAlt = cta.imageAlt ?? "Commercial food market and buyer activity";

  return (
    <section className={clsx("final-cta-section product-detail-final-cta text-surface", cta.tone === "ink" ? "bg-ink" : "bg-teal")}>
      <Container className="a3-container final-cta-shell grid items-center gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.62fr)]">
        <div className="final-cta-copy">
          <h2 className="type-section max-w-[620px] text-surface">{cta.title}</h2>
          <p className="type-section-lead mt-5 max-w-[760px] text-surface">{cta.text}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <LinkButton href={cta.primary.href} variant="light">
              {cta.primary.label}
            </LinkButton>
            {cta.secondary ? (
              <LinkButton href={cta.secondary.href} variant="darkOutline">
                {cta.secondary.label}
              </LinkButton>
            ) : null}
          </div>
        </div>
        <div className="final-cta-media">
          <Image className="object-cover" src={image} alt={imageAlt} fill sizes="(min-width: 1024px) 520px, 100vw" />
        </div>
      </Container>
    </section>
  );
}
