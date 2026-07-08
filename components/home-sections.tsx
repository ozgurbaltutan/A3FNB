"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { geoNaturalEarth1, geoPath, type GeoPermissibleObjects } from "d3-geo";
import { feature } from "topojson-client";
import type { GeometryObject, Topology } from "topojson-specification";
import landAtlas from "world-atlas/land-110m.json";
import { homeAssets, homeLanding, marketLocations, productCategories, productCategoryHref, type MarketLocation } from "@/content/site";
import { EditorialBridge, EditorialCopy, EditorialLayout, EditorialMedia, EditorialSection } from "@/components/editorial-section";
import { LinkButton } from "@/components/ui";

type FeaturedProduct = {
  id: string;
  title: string;
  description: string;
  cardSummary?: string;
  href: string;
  icon: string;
  image?: string;
  imageAlt?: string;
  ctaLabel?: string;
};

type ProductRailItem = FeaturedProduct & {
  href: string;
};

const MARKET_MAP_WIDTH = 1484.26;
const MARKET_MAP_HEIGHT = 692.68;
const LAND_TOPOLOGY = landAtlas as unknown as Topology;
const LAND_FEATURE = feature(LAND_TOPOLOGY, LAND_TOPOLOGY.objects.land as GeometryObject) as GeoPermissibleObjects;
const MARKET_PROJECTION = geoNaturalEarth1().fitSize([MARKET_MAP_WIDTH, MARKET_MAP_HEIGHT], LAND_FEATURE);
const MARKET_LAND_PATH = geoPath(MARKET_PROJECTION)(LAND_FEATURE) ?? "";

function cardCopy(item: { cardSummary?: string; description: string }) {
  return item.cardSummary ?? item.description;
}

function projectMarketLocation(location: MarketLocation) {
  const point = MARKET_PROJECTION([
    location.visualLongitude ?? location.longitude,
    location.visualLatitude ?? location.latitude,
  ]);

  return point ? { x: point[0], y: point[1] } : null;
}

function productRailItem(category: (typeof productCategories)[number]): ProductRailItem {
  const featuredProduct = homeLanding.featuredProducts.find((product) => product.id === category.slug);
  const imageKey = category.imageKey as keyof typeof homeAssets.media | undefined;
  const image = featuredProduct?.image ?? (imageKey ? homeAssets.media[imageKey] : homeAssets.media.companyFoodFeastEditorial);
  const icon = featuredProduct?.icon ?? homeAssets.icons[category.iconKey as keyof typeof homeAssets.icons];

  return {
    id: category.slug,
    title: category.title,
    description: featuredProduct ? cardCopy(featuredProduct) : category.shortDescription,
    cardSummary: featuredProduct?.cardSummary ?? category.shortDescription,
    href: productCategoryHref(category),
    icon,
    image,
    imageAlt: featuredProduct?.imageAlt ?? `${category.title} sourcing category for commercial buyers`,
    ctaLabel: "View category",
  };
}

function HomeShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`a3-container ${className}`}>
      {children}
    </div>
  );
}

function useHomepageReveal() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

    if (items.length === 0) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.16,
      },
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);
}

function CountUpMetric({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const match = value.match(/^(\d+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const target = Number(match[1]);
    const suffix = match[2] ?? "";
    const node = ref.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let started = false;
    let observer: IntersectionObserver | null = null;

    if (reducedMotion.matches) {
      setDisplayValue(value);
      return;
    }

    const animate = () => {
      const duration = 950;
      const start = performance.now();

      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(`${Math.round(target * eased)}${suffix}`);

        if (progress < 1) {
          frame = requestAnimationFrame(tick);
        }
      };

      frame = requestAnimationFrame(tick);
    };

    if (!node || !("IntersectionObserver" in window)) {
      animate();
      return () => cancelAnimationFrame(frame);
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || started) {
          return;
        }

        started = true;
        animate();
        observer?.disconnect();
      },
      { threshold: 0.4 },
    );

    observer.observe(node);

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [value]);

  return <span ref={ref}>{displayValue}</span>;
}

function SectionIntro({
  title,
  text,
  light = false,
  className = "",
}: {
  title: string;
  text: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={`reveal reveal--up max-w-[871px] ${className}`}>
      <h2 className={`type-section ${light ? "text-surface" : "text-ink"}`}>
        {title}
      </h2>
      <p className={`type-section-lead mt-6 max-w-[871px] ${light ? "text-surface" : "text-ink/80"}`}>
        {text}
      </p>
    </div>
  );
}

export function HomeFigmaLanding() {
  useHomepageReveal();

  return (
    <>
      <HomeHero />
      <WhatA3Does />
      <FeaturedSourcingCategories />
      <MarketsPreview />
      <HowA3Works />
      <BuyerPaths />
      <BeforeYouEnquire />
      <FinalCta />
    </>
  );
}

function HomeHero() {
  const { hero } = homeLanding;

  return (
    <section className="home-hero relative isolate min-h-[100svh] overflow-hidden bg-deep-dark text-surface">
      <Image
        className="home-hero-fallback absolute inset-0 z-0 h-full w-full object-cover"
        src={homeAssets.media.companyTradeEditorial}
        alt=""
        fill
        priority
        sizes="100vw"
        aria-hidden="true"
      />
      <video
        className="home-hero-video absolute inset-0 z-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={homeAssets.media.companyTradeEditorial}
        aria-label="Food and beverage sourcing background video"
      >
        <source src={homeAssets.media.heroVideo} type="video/webm" />
      </video>
      <div className="home-hero-overlay absolute inset-0 z-10" aria-hidden="true" />
      <HomeShell className="relative z-20 flex min-h-[100svh] items-center pb-16 pt-32 lg:pb-20 lg:pt-40">
        <div className="max-w-[1020px]">
          <h1 className="home-hero-title type-hero max-w-[1020px] text-surface">
            {hero.title.split("\n").map((line, index, lines) => (
              <span className="home-hero-title__line" key={line}>
                {line}
                {index < lines.length - 1 ? <br /> : null}
              </span>
            ))}
          </h1>
          <p className="type-hero-body mt-6 max-w-[867px] text-surface">
            {hero.text}
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:gap-6">
            <LinkButton href={hero.primary.href} variant="mediaPrimary">
              {hero.primary.label}
            </LinkButton>
            <LinkButton href={hero.secondary.href} variant="mediaSecondary">
              {hero.secondary.label}
            </LinkButton>
          </div>
        </div>
      </HomeShell>
    </section>
  );
}

function WhatA3Does() {
  const { companySnapshot } = homeLanding;

  return (
    <EditorialSection tone="surface" className="company-story-section">
      <EditorialLayout className="company-story-layout">
        <EditorialCopy
          title={companySnapshot.title}
          text={companySnapshot.text}
          className="company-story-copy"
        />
        <EditorialMedia
          src={companySnapshot.image}
          alt={companySnapshot.imageAlt}
          priority
          position="center center"
          className="company-story-media"
        />
      </EditorialLayout>
    </EditorialSection>
  );
}

function FeaturedSourcingCategories() {
  const products = productCategories.map(productRailItem);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const firstCardRef = useRef<HTMLAnchorElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [railMetrics, setRailMetrics] = useState({ step: 0, visibleCount: 1 });
  const maxIndex = Math.max(0, products.length - 1);
  const safeActiveIndex = Math.min(activeIndex, maxIndex);
  const railOffset = safeActiveIndex * railMetrics.step;
  const loopedProducts = [
    ...products,
    ...products.slice(0, Math.min(products.length, Math.max(1, railMetrics.visibleCount))),
  ];

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const firstCard = firstCardRef.current;

    if (!viewport || !track || !firstCard) {
      return undefined;
    }

    const viewportElement = viewport;
    const trackElement = track;
    const firstCardElement = firstCard;

    function updateRailMetrics() {
      const cardWidth = firstCardElement.getBoundingClientRect().width;
      const trackStyle = window.getComputedStyle(trackElement);
      const gap = Number.parseFloat(trackStyle.columnGap || trackStyle.gap || "0") || 0;
      const step = cardWidth + gap;
      const visibleCount = step > 0 ? Math.max(1, Math.floor((viewportElement.clientWidth + gap) / step)) : 1;

      setRailMetrics((current) =>
        Math.abs(current.step - step) < 0.5 && current.visibleCount === visibleCount
          ? current
          : { step, visibleCount },
      );
      setActiveIndex((current) => Math.min(current, Math.max(0, products.length - 1)));
    }

    updateRailMetrics();

    const resizeObserver = new ResizeObserver(updateRailMetrics);
    resizeObserver.observe(viewportElement);
    resizeObserver.observe(firstCardElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [products.length]);

  function handleProductClick(event: React.MouseEvent<HTMLButtonElement>, direction: "previous" | "next") {
    event.preventDefault();

    setActiveIndex((current) => {
      const lastIndex = Math.max(0, products.length - 1);
      const currentIndex = Math.min(current, lastIndex);

      if (direction === "next") {
        return currentIndex >= lastIndex ? 0 : currentIndex + 1;
      }

      return currentIndex <= 0 ? lastIndex : currentIndex - 1;
    });
  }

  return (
    <>
      <EditorialBridge tone="surface" className="featured-sourcing-bridge">
        <div className="product-rail__header reveal reveal--up">
          <div className="product-rail__intro">
            <h2 className="type-section text-ink">Products</h2>
            <p className="type-section-lead text-ink/80">
              A3 helps buyers access selected food commodities, ingredients and packaged products, with options shaped around origin, specification, packing, volume and shipping requirements.
            </p>
          </div>
          <div className="product-rail__controls" aria-label="Product carousel controls">
            <button
              aria-label="Previous products"
              className="product-rail__control premium-focus"
              onClick={(event) => handleProductClick(event, "previous")}
              type="button"
            >
              <span aria-hidden="true">‹</span>
            </button>
            <button
              aria-label="Next products"
              className="product-rail__control premium-focus"
              onClick={(event) => handleProductClick(event, "next")}
              type="button"
            >
              <span aria-hidden="true">›</span>
            </button>
          </div>
        </div>
      </EditorialBridge>
      <section className="featured-sourcing-section">
        <HomeShell>
          <div className="product-rail reveal reveal--up">
            <div className="product-rail__stage">
              <div className="product-rail__viewport" ref={viewportRef}>
                <div
                  className="product-rail__track"
                  ref={trackRef}
                  style={{ "--product-rail-offset": `${-railOffset}px` } as React.CSSProperties}
                >
                {loopedProducts.map((product, index) => (
                  <Link
                    href={product.href}
                    className="commodity-bento__card product-rail__card premium-focus group"
                    key={`${product.id}-${index}`}
                    ref={index === 0 ? firstCardRef : undefined}
                  >
                    <article className="commodity-bento__card-inner">
                      {product.image ? (
                        <Image
                          className="commodity-bento__media"
                          src={product.image}
                          alt={product.imageAlt ?? ""}
                          fill
                          sizes="(min-width: 1280px) 34vw, (min-width: 768px) 48vw, 86vw"
                          priority={index < 2}
                        />
                      ) : null}
                      <div className="commodity-bento__overlay" aria-hidden="true" />
                      <div className="commodity-bento__content">
                        <div className="commodity-bento__heading">
                          <h3 className="commodity-bento__title">{product.title}</h3>
                        </div>
                        <p className="commodity-bento__description">{cardCopy(product)}</p>
                      </div>
                    </article>
                  </Link>
                ))}
                </div>
              </div>
            </div>
          </div>
        </HomeShell>
      </section>
    </>
  );
}

function MarketsPreview() {
  const projectedMarkets = marketLocations
    .map((market) => ({ market, point: projectMarketLocation(market) }))
    .filter((item): item is { market: MarketLocation; point: { x: number; y: number } } => Boolean(item.point));

  return (
    <section className="markets-layer-section bg-deep-dark text-surface">
      <HomeShell className="markets-layer-stage grid items-center gap-8 py-16 lg:grid-cols-2 lg:py-20">
        <div className="markets-copy">
          <h2 className="reveal reveal--up type-section text-surface">
            Markets we connect.
          </h2>
          <p className="markets-copy__body reveal reveal--up reveal-delay-1 mt-6 text-surface">
            {homeLanding.markets.text}
          </p>
          <p className="markets-copy__body reveal reveal--up reveal-delay-2 mt-5 text-surface">
            {homeLanding.markets.note}
          </p>
          <div className="markets-metrics reveal reveal--up reveal-delay-3">
            {homeLanding.markets.metrics.map((metric) => (
              <div className="markets-metric" key={metric.label}>
                <span className="markets-metric__value">
                  <CountUpMetric value={metric.value} />
                </span>
                <span className="markets-metric__label">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="markets-map reveal reveal--fade reveal-delay-2 relative min-w-0">
          <svg
            aria-label="World map showing London and selected connected markets"
            className="markets-map__svg"
            role="img"
            viewBox={`0 0 ${MARKET_MAP_WIDTH} ${MARKET_MAP_HEIGHT}`}
          >
            <title>World map showing London and selected connected markets</title>
            <defs>
              <clipPath id="markets-map-land-clip">
                <rect x="0" y="0" width={MARKET_MAP_WIDTH} height="540" />
              </clipPath>
            </defs>
            <path className="markets-map__land" clipPath="url(#markets-map-land-clip)" d={MARKET_LAND_PATH} />
            <g className="markets-map__pins" role="list">
              {projectedMarkets.map(({ market, point }, index) => {
                const labelX = market.labelAlign === "left" ? 16 : market.labelAlign === "right" ? -16 : 0;
                const labelAnchor: "start" | "middle" | "end" =
                  market.labelAlign === "left" ? "start" : market.labelAlign === "right" ? "end" : "middle";
                const displayName = market.displayName ?? market.name;

                return (
                  <g
                    aria-label={displayName}
                    className={`markets-map-pin ${market.isHub ? "is-hub" : ""}`}
                    focusable="true"
                    key={market.name}
                    role="listitem"
                    style={{ "--pin-delay": `${(index % 7) * 0.16}s` } as CSSProperties}
                    tabIndex={0}
                    transform={`translate(${point.x} ${point.y})`}
                  >
                    <title>{displayName}</title>
                    <line className="markets-map-pin__leader" x1="0" x2={labelX} y1="-12" y2="-29" />
                    <circle className="markets-map-pin__halo" r="11.5" />
                    <circle className="markets-map-pin__dot" r={market.isHub ? 7.2 : 6.2} />
                    <text className="markets-map-pin__label" textAnchor={labelAnchor} x={labelX} y="-34">
                      {displayName}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
      </HomeShell>
    </section>
  );
}

function HowA3Works() {
  const [activeStep, setActiveStep] = useState<string | null>(homeLanding.process.steps[0].number);

  return (
    <section className="py-16 lg:py-24">
      <HomeShell className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="process-content">
          <SectionIntro title={homeLanding.process.title} text={homeLanding.process.text} />
          <div className="process-accordion reveal reveal--up reveal-delay-2">
            {homeLanding.process.steps.map((step) => {
              const isActive = activeStep === step.number;
              const panelId = `process-step-${step.number}`;

              return (
                <article className={`process-accordion-item ${isActive ? "is-active" : ""}`} key={step.number}>
                  <button
                    aria-controls={panelId}
                    aria-expanded={isActive}
                    className="process-accordion-trigger"
                    onClick={() => setActiveStep((currentStep) => (currentStep === step.number ? null : step.number))}
                    type="button"
                  >
                    <span className="process-accordion-index">{step.number}</span>
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
        <div className="process-media reveal reveal--fade reveal-delay-1">
          <Image
            className="object-cover"
            src={homeLanding.process.image}
            alt={homeLanding.process.imageAlt}
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
          />
        </div>
      </HomeShell>
    </section>
  );
}

function BuyerPaths() {
  return (
    <section className="py-16 lg:py-20">
      <HomeShell>
        <SectionIntro
          title="Who A3 works with"
          text="A3 works with farmers, commercial buyers, distributors, retailers, foodservice teams and manufacturers that need reliable product options, supplier coordination and workable trade conditions."
          className="mb-8"
        />
        <div className="buyer-segment-panel">
          {homeLanding.buyerPaths.map((path) => (
            <Link
              className="buyer-segment-card premium-focus"
              href={path.href}
              key={path.id}
            >
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
                    <span className="image-card-cta" aria-hidden="true">→</span>
                  </div>
                  <p className="buyer-segment-card__hint">{cardCopy(path)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </HomeShell>
    </section>
  );
}

function BeforeYouEnquire() {
  return (
    <section className="before-enquire-band py-14 lg:py-16">
      <HomeShell className="grid gap-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
        <div className="reveal reveal--up max-w-[520px]">
          <h2 className="type-section text-ink">
            Product catalogues
          </h2>
          <p className="type-section-lead mt-4 text-ink/76">
            Explore available coffee and sugar catalogues before starting a product or sourcing discussion with A3.
          </p>
        </div>
        <div className="before-enquire-grid">
          {homeLanding.resources.map((resource, index) => (
            <Link
              href={resource.href}
              className={`before-enquire-card reveal reveal--up reveal-delay-${index + 1} premium-focus`}
              key={resource.title}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={resource.ariaLabel}
            >
              <span className="before-enquire-card__copy">
                <span className="before-enquire-card__title">{resource.title}</span>
                <span className="before-enquire-card__description">{resource.description}</span>
              </span>
              <span className="before-enquire-card__action" aria-hidden="true">
                <span className="before-enquire-card__file">PDF</span>
                <span>{resource.ctaLabel ?? "View PDF"}</span>
                <span className="before-enquire-card__arrow">→</span>
              </span>
            </Link>
          ))}
        </div>
      </HomeShell>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="final-cta-section bg-teal text-surface">
      <HomeShell className="final-cta-shell grid items-center gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.62fr)]">
        <div className="final-cta-copy reveal reveal--up">
          <h2 className="type-section max-w-[520px] text-surface">
            {homeLanding.cta.title}
          </h2>
          <p className="type-section-lead mt-5 max-w-[760px] text-surface">{homeLanding.cta.text}</p>
          <div className="mt-6">
            <LinkButton href={homeLanding.cta.primary.href} variant="light">
              {homeLanding.cta.primary.label}
            </LinkButton>
          </div>
        </div>
        <div className="final-cta-media reveal reveal--fade reveal-delay-1">
          <Image
            className="object-cover"
            src={homeLanding.cta.image}
            alt={homeLanding.cta.imageAlt}
            fill
            sizes="(min-width: 1024px) 520px, 100vw"
          />
        </div>
      </HomeShell>
    </section>
  );
}
