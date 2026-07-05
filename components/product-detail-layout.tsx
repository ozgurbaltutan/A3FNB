"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { clsx } from "clsx";
import { Breadcrumb } from "@/components/breadcrumb";
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
  text: string;
  image?: string;
  imageAlt: string;
  note?: string;
  hideBreadcrumb?: boolean;
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
  image: string;
  imageAlt: string;
  steps: ProductDetailItem[];
  resource?: ProductDetailLink;
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
  origin?: ProductOriginSection;
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
  origin,
  sections = [],
  support,
  related,
  finalCta,
}: ProductDetailProps) {
  return (
    <>
      {hero ? <ProductDetailHero hero={hero} breadcrumb={breadcrumb} /> : null}
      {storySections?.map((section, index) => (
        <ProductStory key={section.title} priority={index === 0} section={section} />
      ))}
      {intro ? <ProductIntro intro={intro} /> : null}
      {profiles ? <ProductProfiles profiles={profiles} /> : null}
      {origin ? <ProductOrigin origin={origin} /> : null}
      {sections.map((section) => (
        <ProductInfoSection key={section.title} section={section} />
      ))}
      {support ? <ProductSupport support={support} /> : null}
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
  return (
    <section className="product-detail-hero">
      {!hero.hideBreadcrumb ? (
        <Container className="a3-container product-detail-hero__breadcrumb">
          <Breadcrumb items={breadcrumb} />
        </Container>
      ) : null}
      <Container className="a3-container product-detail-hero__inner">
        <div className="product-detail-hero__copy">
          <h1 className="type-hero product-detail-hero__title">{hero.title}</h1>
          <p className="type-hero-body product-detail-hero__text">{hero.text}</p>
          {hero.note ? <p className="product-detail-note">{hero.note}</p> : null}
        </div>
        <figure className="product-detail-hero__media">
          {hero.image ? (
            <Image
              src={hero.image}
              alt={hero.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover"
            />
          ) : null}
        </figure>
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

function ProductSupport({ support }: { support: ProductSupportSection }) {
  const [activeStep, setActiveStep] = useState<string | null>("01");

  return (
    <section className="product-detail-section product-detail-support">
      <Container className="a3-container product-detail-support__inner">
        <div className="product-detail-support__copy">
          <h2 className="type-section">{support.title}</h2>
          <p className="type-section-lead">{support.text}</p>
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
        </div>
        <figure className="product-detail-support__media">
          <Image src={support.image} alt={support.imageAlt} fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
        </figure>
      </Container>
    </section>
  );
}

function RelatedProducts({ links }: { links: ProductDetailLink[] }) {
  return (
    <section className="product-detail-related">
      <Container className="a3-container product-detail-related__inner">
        <h2 className="type-panel-title">Continue with related paths.</h2>
        <div className="product-detail-related__cards">
          {links.map((link) => (
            <RelatedProductCard link={link} key={link.href} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function RelatedProductCard({ link }: { link: ProductDetailLink }) {
  const category = productCategories.find((item) => productCategoryHref(item) === link.href);
  const icon =
    category?.slug === "cocoa-products"
      ? homeAssets.icons.cocoaIcon
      : category?.slug === "grains-seeds"
        ? homeAssets.icons.grainsIcon
      : category
        ? homeAssets.icons[category.iconKey as keyof typeof homeAssets.icons]
        : homeAssets.icons.marketsMap;
  const description =
    category?.shortDescription ??
    (link.href.includes("markets-sourcing")
      ? "Origin and destination market context for commercial sourcing requirements."
      : "Continue the sourcing conversation with A3.");

  return (
    <Link className="product-category-card premium-focus" href={link.href}>
      <span className="product-category-card__top">
        <span className="product-category-card__heading">
          <span className="product-category-card__icon" aria-hidden="true">
            <Image src={icon} alt="" width={24} height={24} />
          </span>
          <span className="product-category-card__title">{category?.title ?? link.label}</span>
        </span>
        <span className="product-category-card__arrow" aria-hidden="true">
          -&gt;
        </span>
      </span>
      <span className="product-category-card__description">{description}</span>
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
