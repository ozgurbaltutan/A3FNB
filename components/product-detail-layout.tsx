"use client";

import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { clsx } from "clsx";
import { Breadcrumb } from "@/components/breadcrumb";
import { FilteredProductGrid } from "@/components/filtered-product-grid";
import { InnerPageHero } from "@/components/inner-page-hero";
import { MetricBand } from "@/components/metric-band";
import { ProcessAccordion } from "@/components/process-accordion";
import { Container, LinkButton } from "@/components/ui";
import { homeAssets } from "@/content/site";
import type { NavigationItem } from "@/lib/types";

type ProductDetailItem = {
  title: string;
  description: string;
};

type ProductDetailLink = {
  label: string;
  href: string;
  description?: string;
  image?: string;
  imageAlt?: string;
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
  cardTitle?: string;
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

type ProductPortfolio = {
  id?: string;
  title: string;
  text: string;
  groups?: {
    id: string;
    title: string;
    description?: string;
    itemIds: string[];
  }[];
  filters?: { id: string; label: string; itemIds: string[] }[];
  items: ProductPortfolioItem[];
};

type ProductTechnicalSpecProfile = {
  title: string;
  subtitle?: string;
  rows: ProductSpecRow[];
};

type ProductTechnicalSpecGroup = {
  id: string;
  title: string;
  text?: string;
  selectorLabel?: string;
  profiles: ProductTechnicalSpecProfile[];
};

type ProductSectionNavigationItem = {
  label: string;
  href: string;
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

type ProductKeyFacts = {
  title: string;
  edition?: string;
  items: {
    value: string;
    label?: string;
    description: string;
  }[];
  sources?: ProductDetailLink[];
};

type ProductEditorialFacts = {
  title: string;
  text?: string;
  items: ProductDetailItem[];
};

type ProductFlowchart = {
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  resource?: ProductDetailLink;
};

type ProductOrigins = {
  title: string;
  text: string;
  items: Array<ProductDetailItem & { regions: string[] }>;
};

type ProductServices = {
  title: string;
  text: string;
  items: ProductDetailItem[];
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
  keyFacts?: ProductKeyFacts;
  keyFactsPosition?: "before-portfolio" | "after-portfolio";
  editorialFacts?: ProductEditorialFacts;
  flowchart?: ProductFlowchart;
  origins?: ProductOrigins;
  services?: ProductServices;
  servicesPosition?: "before-shipment" | "after-shipment";
  sectionNavigation?: ProductSectionNavigationItem[];
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
    selectorLabel?: string;
    disclaimer?: string;
    catalogue?: ProductDetailLink;
    profiles?: ProductTechnicalSpecProfile[];
    groups?: ProductTechnicalSpecGroup[];
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
    compact?: boolean;
  };
};

export function ProductDetailLayout({
  breadcrumb,
  hero,
  intro,
  storySections,
  afterSupportStorySections,
  keyFacts,
  keyFactsPosition = "after-portfolio",
  editorialFacts,
  flowchart,
  origins,
  services,
  servicesPosition = "after-shipment",
  sectionNavigation,
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
  const useBuyerInformation = Boolean(technicalSpecs && (productRange || productPortfolio) && (sections.length || support));
  const storyHero = !hero && !productPortfolio ? storySections?.[0] : undefined;
  const leadingStorySections = productPortfolio ? [] : (storyHero ? (storySections?.slice(1) ?? []) : (storySections ?? []));
  const portfolioStorySections = productPortfolio ? (storySections ?? []) : [];

  return (
    <>
      {hero ? <ProductDetailHero hero={hero} breadcrumb={breadcrumb} /> : null}
      {sectionNavigation?.length ? <ProductSectionNavigation items={sectionNavigation} /> : null}
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
      {origins ? <ProductOriginsSection origins={origins} /> : null}
      {keyFacts && keyFactsPosition === "before-portfolio" ? <ProductKeyFactsSection facts={keyFacts} /> : null}
      {productRange ? (
        <ProductRange profiles={productRange} />
      ) : profiles ? (
        <ProductProfiles profiles={profiles} />
      ) : null}
      {productPortfolio ? <ProductPortfolioSection portfolio={productPortfolio} /> : null}
      {keyFacts && keyFactsPosition === "after-portfolio" ? <ProductKeyFactsSection facts={keyFacts} /> : null}
      {editorialFacts ? <ProductEditorialFactsSection facts={editorialFacts} /> : null}
      {flowchart ? <ProductFlowchartSection flowchart={flowchart} /> : null}
      {documents ? <ProductDocuments documents={documents} /> : null}
      {portfolioStorySections.map((section, index) => (
        <ProductStory key={section.title} priority={index === 0} section={section} />
      ))}
      {technicalSpecs ? <ProductTechnicalSpecs specs={technicalSpecs} /> : null}
      {services && servicesPosition === "before-shipment" ? <ProductServicesSection services={services} /> : null}
      {shipmentOptions ? <ShipmentOptions options={shipmentOptions} /> : null}
      {services && servicesPosition === "after-shipment" ? <ProductServicesSection services={services} /> : null}
      {origin ? <ProductOrigin origin={origin} /> : null}
      {useBuyerInformation ? (
        <BuyerInformation sections={sections} support={support} />
      ) : (
        <>
          {sections.map((section) => (
            <ProductInfoSection key={section.title} section={section} />
          ))}
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

function ProductKeyFactsSection({ facts }: { facts: ProductKeyFacts }) {
  return <MetricBand edition={facts.edition} id="market-context" items={facts.items} sources={facts.sources} title={facts.title} />;
}

function ProductEditorialFactsSection({ facts }: { facts: ProductEditorialFacts }) {
  return (
    <section className="product-detail-section product-editorial-facts" id="key-facts">
      <Container className="a3-container product-editorial-facts__inner">
        <div className="product-section-heading">
          <h2 className="type-section">{facts.title}</h2>
          {facts.text ? <p className="type-section-lead">{facts.text}</p> : null}
        </div>
        <div className="product-editorial-facts__grid">
          {facts.items.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProductFlowchartSection({ flowchart }: { flowchart: ProductFlowchart }) {
  return (
    <section className="product-detail-section product-flowchart" id="process-flowchart">
      <Container className="a3-container product-flowchart__inner">
        <div className="product-section-heading">
          <h2 className="type-section">{flowchart.title}</h2>
          <p className="type-section-lead">{flowchart.text}</p>
          {flowchart.resource ? (
            <LinkButton href={flowchart.resource.href} variant="outline">
              {flowchart.resource.label}
            </LinkButton>
          ) : null}
        </div>
        <figure className="product-flowchart__media">
          <Image alt={flowchart.imageAlt} fill sizes="(min-width: 1024px) 62vw, 100vw" src={flowchart.image} />
        </figure>
      </Container>
    </section>
  );
}

function ProductOriginsSection({ origins }: { origins: ProductOrigins }) {
  return (
    <section className="product-detail-section product-origins" id="origins">
      <Container className="a3-container product-origins__inner">
        <div className="product-section-heading">
          <h2 className="type-section">{origins.title}</h2>
          <p className="type-section-lead">{origins.text}</p>
        </div>
        <div className="product-origins__grid">
          {origins.items.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <ul>{item.regions.map((region) => <li key={region}>{region}</li>)}</ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProductServicesSection({ services }: { services: ProductServices }) {
  return (
    <section className="product-detail-section product-services" id="services">
      <Container className="a3-container product-services__inner">
        <div className="product-section-heading">
          <h2 className="type-section">{services.title}</h2>
          <p className="type-section-lead">{services.text}</p>
        </div>
        <div className="product-services__grid">
          {services.items.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProductSectionNavigation({ items }: { items: ProductSectionNavigationItem[] }) {
  return (
    <nav aria-label="On this product page" className="product-section-nav">
      <Container className="a3-container product-section-nav__inner">
        <div className="product-section-nav__links">
          {items.map((item) => (
            <a className="premium-focus type-nav" href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </div>
      </Container>
    </nav>
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
        id="overview"
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
  const [activePortfolioItemId, setActivePortfolioItemId] = useState<string | null>(null);
  const modalTriggerRefs = useRef<Record<string, HTMLElement | null>>({});
  const activePortfolioItem = portfolio.items.find((item) => item.id === activePortfolioItemId) ?? null;
  const filterGroups = (portfolio.filters ?? portfolio.groups?.map((group) => ({
    id: group.id,
    label: group.title,
    itemIds: group.itemIds,
  })) ?? []);

  useEffect(() => {
    if (!activePortfolioItem) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
    };
  }, [activePortfolioItem]);

  function closePortfolioModal() {
    const itemId = activePortfolioItemId;
    setActivePortfolioItemId(null);

    window.setTimeout(() => {
      if (itemId) modalTriggerRefs.current[itemId]?.focus();
    }, 0);
  }

  function openPortfolioModal(itemId: string) {
    setActivePortfolioItemId(itemId);
  }

  return (
    <section className="product-detail-section product-portfolio-section" id={portfolio.id ?? "range"}>
      <Container className="a3-container product-portfolio-section__inner">
        <div className="product-portfolio-section__header">
          <h2 className="type-section">{portfolio.title}</h2>
          <p className="type-section-lead">{portfolio.text}</p>
        </div>
        <FilteredProductGrid
          ariaLabel={`${portfolio.title} products`}
          getItemLabel={(item) => `View commercial details for ${item.title}`}
          groups={filterGroups}
          items={portfolio.items}
          mode="button"
          onItemActivate={(item) => openPortfolioModal(item.id)}
          setItemRef={(id, node) => {
            modalTriggerRefs.current[id] = node;
          }}
        />
        {activePortfolioItem ? (
          <ProductPortfolioModal product={activePortfolioItem} onClose={closePortfolioModal} />
        ) : null}
      </Container>
    </section>
  );
}

function ProductPortfolioModal({
  product,
  onClose,
}: {
  product: ProductPortfolioItem;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const titleId = `product-portfolio-modal-${product.id}`;
  const descriptionId = `${titleId}-description`;
  const details = getPortfolioModalDetails(product);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, [product.id]);

  function handleDialogKeyDown(event: ReactKeyboardEvent<HTMLElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = Array.from(
      panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ) ?? [],
    ).filter((element) => !element.hasAttribute("hidden") && element.getAttribute("aria-hidden") !== "true");

    if (!focusable.length) {
      event.preventDefault();
      return;
    }

    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === firstFocusable) {
      event.preventDefault();
      lastFocusable.focus();
    } else if (!event.shiftKey && document.activeElement === lastFocusable) {
      event.preventDefault();
      firstFocusable.focus();
    }
  }

  return (
    <div
      className="product-info-modal product-info-modal--portfolio"
      onClick={onClose}
      role="presentation"
    >
      <section
        aria-describedby={descriptionId}
        aria-labelledby={titleId}
        aria-modal="true"
        className="product-info-modal__panel product-info-modal__panel--technical"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={handleDialogKeyDown}
        ref={panelRef}
        role="dialog"
      >
        <button
          aria-label="Close product details"
          className="product-info-modal__close premium-focus"
          onClick={onClose}
          ref={closeButtonRef}
          type="button"
        />
        <div className="product-info-modal__technical">
          <header className="product-info-modal__technical-header">
            <h2 id={titleId}>{product.title}</h2>
            <p id={descriptionId}>{product.overview || product.fit}</p>
          </header>

          {details.length ? (
            <section className="product-info-modal__technical-section">
              <h3>Commercial details</h3>
              <dl className="product-info-modal__facts product-info-modal__facts--technical">
                {details.map((detail) => (
                  <div key={detail.title}>
                    <dt>{detail.title}</dt>
                    <dd>{detail.description}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}

          {product.cta ? (
            <footer className="product-info-modal__technical-actions">
              <LinkButton href={product.cta.href} variant="primary">
                {product.cta.label}
              </LinkButton>
            </footer>
          ) : null}
        </div>
      </section>
    </div>
  );
}

function getPortfolioModalDetails(product: ProductPortfolioItem) {
  return product.keyDetails?.length
    ? product.keyDetails
    : [
        { title: "Source", description: product.source },
        { title: "Typical uses", description: product.fit },
        ...product.packing.slice(0, 1),
      ];
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
  const groups: ProductTechnicalSpecGroup[] = specs.groups?.length
    ? specs.groups
    : [{ id: "all-products", title: specs.title, selectorLabel: specs.selectorLabel, profiles: specs.profiles ?? [] }];
  const [activeGroupId, setActiveGroupId] = useState(groups[0]?.id ?? "");
  const activeGroup = groups.find((group) => group.id === activeGroupId) ?? groups[0];

  return (
    <section className="product-detail-section product-technical-specs" id="technical-specifications">
      <Container className="a3-container product-technical-specs__inner">
        <div className="product-detail-section__header">
          <h2 className="type-section">{specs.title}</h2>
          {specs.text ? <p className="type-section-lead">{specs.text}</p> : null}
        </div>
        {groups.length > 1 ? (
          <div aria-label="Specification groups" className="product-filter-tabs product-technical-specs__tabs" role="tablist">
            {groups.map((group) => (
              <button
                aria-controls={`technical-panel-${group.id}`}
                aria-selected={activeGroup?.id === group.id}
                className="product-filter-tab premium-focus"
                data-active={activeGroup?.id === group.id}
                key={group.id}
                onClick={() => setActiveGroupId(group.id)}
                role="tab"
                type="button"
              >
                {group.title}
              </button>
            ))}
          </div>
        ) : null}
        {activeGroup ? (
          <div className="product-technical-specs__groups" id={`technical-panel-${activeGroup.id}`} role={groups.length > 1 ? "tabpanel" : undefined}>
            <ProductTechnicalSpecMatrix group={activeGroup} />
          </div>
        ) : null}
        {specs.disclaimer || specs.catalogue ? (
          <footer className="product-technical-specs__footer">
            {specs.disclaimer ? <p className="product-technical-specs__disclaimer">{specs.disclaimer}</p> : null}
            {specs.catalogue ? (
              <Link className="product-technical-specs__catalogue premium-focus" href={specs.catalogue.href} target="_blank">
                {specs.catalogue.label}
              </Link>
            ) : null}
          </footer>
        ) : null}
      </Container>
    </section>
  );
}

function ProductTechnicalSpecMatrix({ group }: { group: ProductTechnicalSpecGroup }) {
  const parameters = Array.from(new Set(group.profiles.flatMap((profile) => profile.rows.map((row) => row.parameter))));
  const [activeProfileTitle, setActiveProfileTitle] = useState(group.profiles[0]?.title ?? "");
  const activeProfile = group.profiles.find((profile) => profile.title === activeProfileTitle) ?? group.profiles[0];
  const selectorId = `mobile-technical-profile-${group.id}`;

  if (!group.profiles.length) return null;

  return (
    <section aria-labelledby={`technical-group-${group.id}`} className="product-technical-specs__group">
      <header className="product-technical-specs__group-header">
        <h3 id={`technical-group-${group.id}`}>{group.title}</h3>
        {group.text ? <p>{group.text}</p> : null}
      </header>
      <div className="product-technical-specs__matrix">
        <table>
          <caption>{group.title}</caption>
          <thead>
            <tr>
              <th scope="col">Parameter</th>
              {group.profiles.map((profile) => (
                <th scope="col" key={profile.title}>
                  {profile.title}
                  {profile.subtitle ? <small>{profile.subtitle}</small> : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {parameters.map((parameter) => (
              <tr key={parameter}>
                <th scope="row">{parameter}</th>
                {group.profiles.map((profile) => {
                  const value = profile.rows.find((row) => row.parameter === parameter)?.specification ?? "—";
                  return <td key={`${profile.title}-${parameter}`}>{value}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="product-technical-specs__cards">
        <label htmlFor={selectorId}>{group.selectorLabel ?? `Select a ${group.title.toLowerCase()} product`}</label>
        <select id={selectorId} onChange={(event) => setActiveProfileTitle(event.target.value)} value={activeProfileTitle}>
          {group.profiles.map((profile) => (
            <option key={profile.title} value={profile.title}>{profile.title}</option>
          ))}
        </select>
        {activeProfile ? (
          <article>
            <h3>
              {activeProfile.title}
              {activeProfile.subtitle ? <span>{activeProfile.subtitle}</span> : null}
            </h3>
            <ProductSpecTable rows={activeProfile.rows} />
          </article>
        ) : null}
      </div>
    </section>
  );
}

function ShipmentOptions({ options }: { options: ProductShipmentOptions }) {
  return (
    <section className="product-detail-section shipment-options-section" id="shipment-options">
      <Container className="a3-container shipment-options-section__inner">
        <div className="product-section-heading shipment-options-section__copy">
          <h2 className="type-section">{options.title}</h2>
          <p className="type-section-lead">{options.text}</p>
        </div>
        <ProcessAccordion
          ariaLabel={`${options.title} details`}
          className="shipment-options-section__steps"
          presentation="showcase"
          items={options.items.map((item, index) => ({
            id: item.title,
            number: String(index + 1).padStart(2, "0"),
            title: item.title,
            description: item.description,
            media: (
              <Image
                alt={options.imageAlt}
                className="object-cover"
                fill
                sizes="(min-width: 1024px) 54vw, 100vw"
                src={options.image}
              />
            ),
          }))}
        />
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
  support,
}: {
  sections: ProductDetailSection[];
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
  const useMediaLayout = support.variant === "media" && support.image;

  return (
    <section className={clsx("product-detail-section product-detail-support", !useMediaLayout && "product-detail-support--compact")}>
      <Container className="a3-container product-detail-support__inner">
        <div className="product-detail-support__copy">
          <h2 className="type-section">{support.title}</h2>
          <p className="type-section-lead">{support.text}</p>
          {useMediaLayout ? (
            <ProcessAccordion
              ariaLabel={`${support.title} steps`}
              className="product-detail-support__steps"
              items={support.steps.map((step, index) => ({
                id: step.title,
                number: String(index + 1).padStart(2, "0"),
                title: step.title,
                description: step.description,
              }))}
            />
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
  const items = links.map((link) => ({
    id: link.href,
    title: link.label,
    description: link.description ?? "Explore product options, specifications and commercial sourcing context.",
    image: link.image ?? homeAssets.media.companyFoodFeastEditorial,
    imageAlt: link.imageAlt ?? `${link.label} product category`,
    href: link.href,
  }));

  return (
    <section className="product-detail-related">
      <Container className="a3-container product-detail-related__inner">
        <div className="product-section-heading">
          <h2 className="type-section">Related categories</h2>
          <p className="type-section-lead">Continue exploring product families that may fit the same sourcing programme.</p>
        </div>
        <FilteredProductGrid
          ariaLabel="Related product categories"
          getHref={(item) => item.href}
          items={items}
          mode="link"
        />
      </Container>
    </section>
  );
}

function ProductFinalCta({ cta }: { cta: ProductDetailProps["finalCta"] }) {
  const image = cta.image ?? homeAssets.media.finalCta;
  const imageAlt = cta.imageAlt ?? "Commercial food market and buyer activity";

  return (
    <section className={clsx("final-cta-section product-detail-final-cta text-surface", cta.tone === "ink" ? "bg-ink" : "bg-teal")} id="contact">
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
