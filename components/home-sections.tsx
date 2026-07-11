"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type CSSProperties, type KeyboardEvent } from "react";
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

function DirectionArrow() {
  return (
    <svg aria-hidden="true" className="work-with-arrow" viewBox="0 0 20 20">
      <path d="M4 10h11M11 6l4 4-4 4" />
    </svg>
  );
}

function WorkWithScene({ variant }: { variant: "buyers" | "producers" | "route" }) {
  if (variant === "buyers") {
    return (
      <svg aria-hidden="true" className="work-with-scene" viewBox="0 0 360 220">
        <path d="M38 180V80h176v100M28 180h208M58 104h136M58 130h136M58 156h136" />
        <path d="M72 88h28v16H72zm40 0h34v16h-34zm46 0h24v16h-24zM70 110h42v20H70zm54 0h28v20h-28zm40 0h20v20h-20zM72 136h26v20H72zm38 0h40v20h-40zm52 0h22v20h-22z" />
        <path d="M244 112h68l20 24v44h-88zM312 112v24h20M260 180v-22h56v22" />
        <circle cx="268" cy="181" r="10" /><circle cx="314" cy="181" r="10" />
        <path className="work-with-scene__route" d="M206 58c36-24 74-23 112 2" />
        <path d="m308 50 12 10-14 7" />
      </svg>
    );
  }

  if (variant === "producers") {
    return (
      <svg aria-hidden="true" className="work-with-scene" viewBox="0 0 360 220">
        <path d="M34 182h292M54 182v-68h104v68M74 114V86h64v28M84 86l11-31m33 31-10-31" />
        <path d="M176 182v-92l44 24V88l44 25V76h36v106M200 144h22m18 0h22m18 0h12" />
        <path d="M75 157c0-15 9-25 22-25s22 10 22 25v25H75zM122 160c0-12 8-21 19-21s19 9 19 21v22h-38z" />
        <path className="work-with-scene__route" d="M46 44c68-25 135-24 201 2" />
        <path d="m237 36 12 10-14 7" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="work-with-scene work-with-scene--route" viewBox="0 0 420 150">
      <path className="work-with-scene__route" d="M62 75h296" />
      <path d="m346 64 14 11-14 11" />
      <circle cx="68" cy="75" r="28" /><circle cx="210" cy="75" r="28" /><circle cx="352" cy="75" r="28" />
      <path d="M56 84V66m0 8 9-9m-9 6-8-8m19 21H47M195 88V67l15 8V64l15 8v16m-22-1h5m7 0h5M338 68h28l5 12h-38l5-12zm0 12v12m28-12v12m-20-3h12" />
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
          text="A3 works with producers, processors, manufacturers, distributors and commercial buying teams—bringing origin-side capability and destination demand into one workable trade route."
          className="work-with-intro"
        />
        <div className="work-with-bento reveal reveal--up reveal-delay-1">
          {buyers ? (
            <Link className="work-with-tile work-with-tile--buyers premium-focus" href={buyers.href}>
              <span className="work-with-tile__eyebrow">Destination-side demand</span>
              <h3>For buyers &amp; distribution teams</h3>
              <p>Product options shaped around specification, origin, packing, volume and destination.</p>
              <span className="work-with-tile__context">Manufacturers · Importers · Distributors · Wholesalers · Retail &amp; foodservice</span>
              <WorkWithScene variant="buyers" />
              <span className="work-with-tile__link">Request product options <DirectionArrow /></span>
            </Link>
          ) : null}
          {producers ? (
            <Link className="work-with-tile work-with-tile--producers premium-focus" href={producers.href}>
              <span className="work-with-tile__eyebrow">Origin-side capability</span>
              <h3>For producers &amp; processors</h3>
              <p>Routes for products and available capacity that are technically ready, commercially workable and suited to buyer demand.</p>
              <span className="work-with-tile__context">Farming groups · Primary processors · Export-ready manufacturers</span>
              <WorkWithScene variant="producers" />
              <span className="work-with-tile__link">Introduce your supply <DirectionArrow /></span>
            </Link>
          ) : null}
          <article className="work-with-tile work-with-tile--route">
            <div className="work-with-tile__route-copy">
              <span className="work-with-tile__eyebrow">A3 coordination</span>
              <h3>Across the route</h3>
              <p>Product fit, commercial structure, documentation and delivery coordination connect both sides.</p>
            </div>
            <WorkWithScene variant="route" />
          </article>
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
