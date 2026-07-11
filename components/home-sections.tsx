"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { geoNaturalEarth1, geoPath, type GeoPermissibleObjects } from "d3-geo";
import { feature } from "topojson-client";
import type { GeometryObject, Topology } from "topojson-specification";
import countriesAtlas from "world-atlas/countries-110m.json";
import { homeAssets, homeLanding, marketLocations, productCategories, productCategoryHref, type MarketLocation } from "@/content/site";
import { EditorialCopy, EditorialLayout, EditorialMedia, EditorialSection } from "@/components/editorial-section";
import { ProductImageCarousel } from "@/components/product-image-carousel";
import { ProcessAccordion } from "@/components/process-accordion";
import { LinkButton } from "@/components/ui";
import { CountUpMetric } from "@/components/count-up-metric";

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

const MARKET_MAP_WIDTH = 1280;
const MARKET_MAP_HEIGHT = 620;
const ANTARCTICA_COUNTRY_ID = "010";
const COUNTRY_TOPOLOGY = countriesAtlas as unknown as Topology;
const COUNTRY_FEATURES = feature(COUNTRY_TOPOLOGY, COUNTRY_TOPOLOGY.objects.countries as GeometryObject) as {
  type: "FeatureCollection";
  features: GeoPermissibleObjects[];
};
const MARKET_LAND_FEATURE = {
  type: "FeatureCollection",
  features: COUNTRY_FEATURES.features.filter(
    (country) => String((country as { id?: number | string }).id).padStart(3, "0") !== ANTARCTICA_COUNTRY_ID,
  ),
} as GeoPermissibleObjects;
const MARKET_FIT_BOUNDS = {
  type: "MultiPoint",
  coordinates: [[-166, -56], [178, 77]],
} as GeoPermissibleObjects;
const MARKET_PROJECTION = geoNaturalEarth1().fitExtent(
  [[12, 12], [MARKET_MAP_WIDTH - 12, MARKET_MAP_HEIGHT - 12]],
  MARKET_FIT_BOUNDS,
);
const MARKET_LAND_PATH = geoPath(MARKET_PROJECTION)(MARKET_LAND_FEATURE) ?? "";

function projectMarketLocation(location: MarketLocation) {
  const displayPoint = MARKET_PROJECTION([
    location.visualLongitude ?? location.longitude,
    location.visualLatitude ?? location.latitude,
  ]);

  return displayPoint ? { x: displayPoint[0], y: displayPoint[1] } : null;
}

type ProjectedMarket = {
  market: MarketLocation;
  point: { x: number; y: number };
};

function spreadProjectedMarkets(markets: ProjectedMarket[], minimumDistance = 23) {
  const placed: ProjectedMarket[] = [];

  return markets.map((item) => {
    const original = item.point;
    let resolved = original;

    for (let radius = 0; radius <= 28; radius += 7) {
      const attempts = radius === 0 ? 1 : 12;
      let found = false;

      for (let attempt = 0; attempt < attempts; attempt += 1) {
        const angle = (Math.PI * 2 * attempt) / attempts;
        const candidate = {
          x: original.x + Math.cos(angle) * radius,
          y: original.y + Math.sin(angle) * radius,
        };
        const isClear = placed.every(({ point }) => Math.hypot(candidate.x - point.x, candidate.y - point.y) >= minimumDistance);

        if (isClear) {
          resolved = candidate;
          found = true;
          break;
        }
      }

      if (found) break;
    }

    const next = { ...item, point: resolved };
    placed.push(next);
    return next;
  });
}

const HOME_PRODUCT_IMAGES: Record<string, string> = {
  "sugar": homeAssets.media.homeProductSugar,
  "green-coffee-beans": homeAssets.media.homeProductCoffee,
  "cocoa-products": homeAssets.media.homeProductCocoa,
  "grains-seeds": homeAssets.media.homeProductGrains,
  "dairy-milk-powders": homeAssets.media.homeProductDairy,
  "oils-fats": homeAssets.media.homeProductOils,
  "starches-sweeteners": homeAssets.media.homeProductStarches,
  "dried-fruit-nuts": homeAssets.media.homeProductDriedFruit,
  "frozen-foods": homeAssets.media.homeProductFrozen,
  "consumer-foods": homeAssets.media.homeProductConsumer,
};

function productRailItem(category: (typeof productCategories)[number]): ProductRailItem {
  const featuredProduct = homeLanding.featuredProducts.find((product) => product.id === category.slug);
  const imageKey = category.imageKey as keyof typeof homeAssets.media | undefined;
  const image = HOME_PRODUCT_IMAGES[category.slug]
    ?? featuredProduct?.image
    ?? (imageKey ? homeAssets.media[imageKey] : homeAssets.media.companyFoodFeastEditorial);
  const icon = featuredProduct?.icon ?? homeAssets.icons[category.iconKey as keyof typeof homeAssets.icons];

  return {
    id: category.slug,
    title: category.title,
    description: category.shortDescription,
    cardSummary: category.shortDescription,
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
        aria-hidden="true"
        tabIndex={-1}
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
  const products = productCategories.map(productRailItem).map((product) => ({
    ...product,
    image: product.image ?? homeAssets.media.companyFoodFeastEditorial,
    imageAlt: product.imageAlt ?? `${product.title} sourcing category for commercial buyers`,
  }));

  return (
    <section className="featured-sourcing-section">
      <HomeShell>
        <ProductImageCarousel
          ariaLabel="Products"
          className="reveal reveal--up"
          getHref={(product) => product.href}
          getItemLabel={(product) => `View ${product.title} category`}
          header={(
            <div className="home-products-carousel__intro">
              <h2 className="type-section text-ink">Explore product categories.</h2>
              <p className="type-section-lead text-ink/80">
                A3 helps buyers access selected food commodities, ingredients and packaged products, with options shaped around origin, specification, packing, volume and shipping requirements.
              </p>
            </div>
          )}
          items={products}
          mode="link"
        />
      </HomeShell>
    </section>
  );
}

function MarketsPreview() {
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);
  const projectedMarkets = spreadProjectedMarkets(marketLocations
    .map((market) => ({ market, point: projectMarketLocation(market) }))
    .filter((item): item is ProjectedMarket => Boolean(item.point)));

  function handleMarketKeyDown(event: KeyboardEvent<SVGGElement>, marketName: string) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    setSelectedMarket((current) => current === marketName ? null : marketName);
  }

  return (
    <section className="home-section home-section--markets markets-layer-section bg-deep-dark text-surface">
      <HomeShell className="markets-layer-stage grid items-center gap-5 lg:grid-cols-2">
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
            preserveAspectRatio="xMinYMid meet"
            role="img"
            viewBox={`0 0 ${MARKET_MAP_WIDTH} ${MARKET_MAP_HEIGHT}`}
          >
            <title>World map showing London and selected connected markets</title>
            <path className="markets-map__land" d={MARKET_LAND_PATH} />
            <g className="markets-map__pins" role="list">
              {projectedMarkets.map(({ market, point }, index) => {
                const labelX = market.labelAlign === "left" ? 16 : market.labelAlign === "right" ? -16 : 0;
                const labelAnchor: "start" | "middle" | "end" =
                  market.labelAlign === "left" ? "start" : market.labelAlign === "right" ? "end" : "middle";
                const displayName = market.displayName ?? market.name;
                const isSelected = selectedMarket === market.name;

                return (
                  <g
                    aria-label={displayName}
                    aria-pressed={isSelected}
                    className={`markets-map-pin ${market.isHub ? "is-hub" : ""} ${isSelected ? "is-selected" : ""}`}
                    focusable="true"
                    key={market.name}
                    onClick={() => setSelectedMarket((current) => current === market.name ? null : market.name)}
                    onKeyDown={(event) => handleMarketKeyDown(event, market.name)}
                    role="button"
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
  return (
    <section className="home-section home-section--process">
      <HomeShell>
        <SectionIntro title={homeLanding.process.title} text={homeLanding.process.text} />
        <ProcessAccordion
          ariaLabel={`${homeLanding.process.title} steps`}
          className="reveal reveal--up reveal-delay-2"
          presentation="showcase"
          items={homeLanding.process.steps.map((step, index) => ({
            id: step.number,
            number: step.number,
            title: step.title,
            description: step.description,
            media: (
              <Image
                alt={step.imageAlt}
                className="object-cover"
                fill
                priority={index === 0}
                sizes="(min-width: 1024px) 54vw, 100vw"
                src={step.image}
              />
            ),
          }))}
        />
      </HomeShell>
    </section>
  );
}

const WORK_WITH_ROLES = [
  {
    id: "producers",
    title: "Producers & farming groups",
    description: "Origin-side partners supplying agricultural products and primary food commodities.",
  },
  {
    id: "processors",
    title: "Primary processors",
    description: "Businesses turning raw materials into trade-ready food products and ingredients.",
  },
  {
    id: "manufacturers",
    title: "Food & beverage manufacturers",
    description: "Production teams sourcing ingredients and products for formulation and finished goods.",
  },
  {
    id: "commercial",
    title: "Distribution & commercial buying teams",
    description: "Importers, distributors, wholesalers, retailers and foodservice procurement teams.",
  },
] as const;

function SupplyRoleIcon({ id }: { id: (typeof WORK_WITH_ROLES)[number]["id"] }) {
  const paths: Record<typeof id, ReactNode> = {
    producers: <><path d="M4 18V9m0 5 4-4m-4 3-3-3M12 19v-8m0 3 4-4m-4 2-3-3M2 21h16" /></>,
    processors: <><path d="M3 21V9l5 3V8l5 3V5h4v16M6 17h2m3 0h2m3 0h1" /></>,
    manufacturers: <><path d="M3 21V8h5v4l5-4v4l6-4v13M6 17h2m3 0h2m3 0h2" /></>,
    commercial: <><path d="M3 8h14l2 5H5L3 8Zm2 5v8m12-8v8M8 17h6m-7-9 2-4h5l2 4" /></>,
  };

  return (
    <svg aria-hidden="true" className="work-with-role__icon" viewBox="0 0 22 24">
      {paths[id]}
    </svg>
  );
}

function DirectionArrow() {
  return (
    <svg aria-hidden="true" className="work-with-arrow" viewBox="0 0 20 20">
      <path d="M4 10h11M11 6l4 4-4 4" />
    </svg>
  );
}

function BuyerPaths() {
  const buyers = homeLanding.buyerPaths.find((path) => path.id === "buyers");
  const producers = homeLanding.buyerPaths.find((path) => path.id === "producers");

  return (
    <section className="home-section home-section--buyer-paths">
      <HomeShell>
        <SectionIntro
          title="Who we work with"
          text="A3 works across the food and beverage supply chain, connecting origin-side capability with commercial demand in destination markets."
          className="work-with-intro"
        />
        <ol aria-label="Food and beverage supply chain roles" className="work-with-roles reveal reveal--up reveal-delay-1">
          {WORK_WITH_ROLES.map((role, index) => (
            <li className="work-with-role" key={role.id}>
              <div className="work-with-role__topline">
                <SupplyRoleIcon id={role.id} />
                <span className="work-with-role__index">0{index + 1}</span>
              </div>
              <h3>{role.title}</h3>
              <p>{role.description}</p>
            </li>
          ))}
        </ol>
        <div className="work-with-actions reveal reveal--up reveal-delay-2">
          {buyers ? (
            <Link className="work-with-action premium-focus" href={buyers.href}>
              <span>
                <strong>Need product options?</strong>
                <small>Product / Origin / Volume / Destination</small>
              </span>
              <span className="work-with-action__link">Request product options <DirectionArrow /></span>
            </Link>
          ) : null}
          {producers ? (
            <Link className="work-with-action premium-focus" href={producers.href}>
              <span>
                <strong>Have products or capacity to introduce?</strong>
                <small>Products / Capacity / Export markets</small>
              </span>
              <span className="work-with-action__link">Introduce your supply <DirectionArrow /></span>
            </Link>
          ) : null}
        </div>
      </HomeShell>
    </section>
  );
}

function BeforeYouEnquire() {
  return (
    <section className="home-section home-section--catalogues before-enquire-band">
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
              <span className="before-enquire-card__media" aria-hidden="true">
                <Image src={resource.image} alt="" fill sizes="160px" />
              </span>
              <span className="before-enquire-card__copy">
                <span className="before-enquire-card__title">{resource.title}</span>
                <span className="before-enquire-card__description">{resource.description}</span>
              </span>
              <span className="before-enquire-card__action" aria-hidden="true">
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
    <section className="home-section--final-cta final-cta-section bg-teal text-surface">
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
