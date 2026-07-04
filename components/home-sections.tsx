"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { homeAssets, homeLanding } from "@/content/site";
import { LinkButton } from "@/components/ui";

type FeaturedProduct = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
  image?: string;
  imageAlt?: string;
  highlights?: readonly string[];
};

type MarketMarker = {
  name: string;
  role: "base" | "source" | "destination" | "dual";
  x: number;
  y: number;
};

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

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <Image
      aria-hidden="true"
      className={`h-6 w-6 shrink-0 ${className}`}
      src={homeAssets.icons.arrowRight}
      alt=""
      width={24}
      height={24}
      unoptimized
    />
  );
}

function IconImage({
  src,
  className,
  size = 32,
}: {
  src: string;
  className?: string;
  size?: number;
}) {
  return (
    <Image
      aria-hidden="true"
      className={className}
      src={src}
      alt=""
      width={size}
      height={size}
      unoptimized
    />
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
      <p className={`type-p1 mt-6 max-w-[871px] ${light ? "text-surface" : "text-ink/80"}`}>
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
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-deep-dark text-surface">
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        aria-label="Food and beverage sourcing background video"
      >
        <source src={homeAssets.media.heroVideo} type="video/webm" />
      </video>
      <div className="absolute inset-0 -z-10 bg-deep-dark/68" aria-hidden="true" />
      <HomeShell className="flex min-h-[100svh] items-center pb-16 pt-32 lg:pb-20 lg:pt-40">
        <div className="max-w-[930px]">
          <h1 className="type-hero max-w-[850px] text-surface">
            {hero.title}
          </h1>
          <p className="type-p1 mt-6 max-w-[867px] text-surface">
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
  const { companySnapshot, sourcingSteps } = homeLanding;

  return (
    <section className="bg-paper py-12 lg:py-14">
      <HomeShell className="company-intro-grid">
        <article className="company-intro-panel reveal reveal--up reveal-delay-1">
          <h2>{companySnapshot.title}</h2>
          <p>{companySnapshot.text}</p>

          <div className="company-intro-evidence" aria-label="A3 support areas">
            {sourcingSteps.map((item) => (
              <div className="company-intro-evidence__row" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </article>

        <div className="company-intro-media reveal reveal--fade">
          <Image
            src={companySnapshot.image}
            alt={companySnapshot.imageAlt}
            fill
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="object-cover"
          />
        </div>
      </HomeShell>
    </section>
  );
}

function FeaturedSourcingCategories() {
  const featuredProducts: readonly FeaturedProduct[] = homeLanding.featuredProducts;
  const defaultProductId = "coffee";
  const [activeProductId, setActiveProductId] = useState<string>(defaultProductId);
  const activeProduct =
    featuredProducts.find((product) => product.id === activeProductId) ??
    featuredProducts[0];
  const activeHighlights = activeProduct.highlights?.slice(0, 5) ?? [];
  const [, ...products] = featuredProducts;
  const resetActiveProduct = () => setActiveProductId(defaultProductId);

  return (
    <section className="bg-surface py-12 lg:py-16">
      <HomeShell>
        <SectionIntro
          title="Featured sourcing categories"
          text="A3 sources food commodities, ingredients and packaged products across priority categories, with options shaped around origin, specification, packing, volume and shipment needs."
          className="mb-7"
        />
        <div className="featured-categories-grid grid gap-4 bg-surface lg:grid-cols-[minmax(360px,0.85fr)_minmax(0,1.15fr)] lg:items-stretch">
          <Link
            href={activeProduct.href}
            className="featured-preview-card reveal reveal--up premium-focus group flex min-h-[430px] overflow-hidden rounded-[var(--radius-card)] border border-border sm:min-h-[500px] lg:min-h-0"
          >
            <article className="relative flex w-full flex-col justify-end overflow-hidden">
              {activeProduct.image ? (
                <Image
                  key={activeProduct.image}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[var(--motion-slow)] ease-[var(--ease-premium)] group-hover:scale-[1.03]"
                  src={activeProduct.image}
                  alt={activeProduct.imageAlt ?? activeProduct.title}
                  fill
                  sizes="(min-width: 1024px) 648px, 100vw"
                  priority
                />
              ) : null}
              <div className="featured-preview-content relative z-10 bg-surface">
                <div className="featured-preview-heading flex items-center justify-between gap-4 bg-teal">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <IconImage className="h-7 w-7" src={activeProduct.icon} />
                    <h3 className="featured-preview-title type-p2 font-medium text-surface">{activeProduct.title}</h3>
                  </div>
                  <ArrowIcon />
                </div>
                <p className="featured-preview-description type-p3 text-ink/82">
                  {activeProduct.description}
                </p>
                {activeHighlights.length ? (
                  <ul className="featured-preview-highlights" aria-label={`${activeProduct.title} examples`}>
                    {activeHighlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                <span className="featured-preview-action" aria-hidden="true">
                  View category
                  <span>→</span>
                </span>
              </div>
            </article>
          </Link>
          <div
            className="featured-category-grid grid gap-3 sm:grid-cols-2 lg:gap-4"
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                resetActiveProduct();
              }
            }}
            onMouseLeave={resetActiveProduct}
          >
            {products.map((product) => (
              <ProductCategoryCard
                active={product.id === activeProductId}
                item={product}
                key={product.id}
                onActivate={() => setActiveProductId(product.id)}
              />
            ))}
          </div>
        </div>
      </HomeShell>
    </section>
  );
}

function ProductCategoryCard({
  active,
  item,
  onActivate,
}: {
  active: boolean;
  item: FeaturedProduct;
  onActivate: () => void;
}) {
  return (
    <Link
      href={item.href}
      className={`featured-category-card premium-focus group block h-full overflow-hidden rounded-[var(--radius-card)] border bg-surface ${
        active ? "is-active border-teal" : "border-border"
      }`}
      onFocus={onActivate}
      onMouseEnter={onActivate}
    >
      <article className="flex h-full min-h-[118px] flex-col overflow-hidden">
        <div className="featured-category-card__header border-b border-border">
          <div className="flex min-h-8 items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <IconImage className="featured-category-card__icon h-7 w-7 shrink-0 object-contain" src={item.icon} />
              <h3 className="featured-category-card__title type-p2 font-medium text-ink">{item.title}</h3>
            </div>
            <ArrowIcon className="featured-category-card__arrow" />
          </div>
        </div>
        <p className="featured-category-card__description type-p3 text-ink/82">
          {item.description}
        </p>
      </article>
    </Link>
  );
}

function MarketsPreview() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeLayer, setActiveLayer] = useState(1);
  const marketMarkers: MarketMarker[] = [
    { name: "London, United Kingdom", role: "base", x: 50.7, y: 39.7 },
    { name: "Turkiye", role: "source", x: 57.9, y: 47.0 },
    { name: "Ukraine", role: "source", x: 55.9, y: 40.8 },
    { name: "Argentina", role: "dual", x: 36.6, y: 83.0 },
    { name: "Brazil", role: "dual", x: 38.6, y: 71.8 },
    { name: "China", role: "dual", x: 73.2, y: 48.2 },
    { name: "Poland", role: "dual", x: 53.2, y: 39.2 },
    { name: "USA", role: "destination", x: 26.8, y: 43.2 },
    { name: "Canada", role: "destination", x: 25.8, y: 32.8 },
    { name: "Germany", role: "destination", x: 51.7, y: 40.3 },
    { name: "France", role: "destination", x: 50.6, y: 43.6 },
    { name: "Mauritania", role: "destination", x: 45.8, y: 58.8 },
    { name: "Senegal", role: "destination", x: 45.4, y: 62.0 },
    { name: "Togo", role: "destination", x: 49.8, y: 66.4 },
    { name: "Ghana", role: "destination", x: 48.9, y: 65.8 },
    { name: "Niger", role: "destination", x: 51.8, y: 59.8 },
    { name: "Cameroon", role: "destination", x: 52.8, y: 67.0 },
    { name: "Madagascar", role: "destination", x: 60.4, y: 83.4 },
    { name: "Mozambique", role: "destination", x: 57.5, y: 79.6 },
    { name: "Taiwan", role: "destination", x: 79.2, y: 55.8 },
  ];
  const marketLayers = [
    {
      number: "01",
      title: "Operating base",
      text: "London, United Kingdom",
    },
    {
      number: "02",
      title: "Source countries",
      text: "Turkiye, Poland, Argentina, China, Brazil and Ukraine",
    },
    {
      number: "03",
      title: "Destination markets",
      text: "Europe, Africa, North America, South America and Asia",
    },
  ];

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactViewport = window.matchMedia("(max-width: 1023px)");

    const updateLayer = () => {
      if (reducedMotion.matches || compactViewport.matches) {
        setActiveLayer(3);
        return;
      }

      const section = sectionRef.current;
      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollableDistance = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / scrollableDistance));

      if (progress < 0.34) {
        setActiveLayer(1);
      } else if (progress < 0.68) {
        setActiveLayer(2);
      } else {
        setActiveLayer(3);
      }
    };

    updateLayer();
    window.addEventListener("scroll", updateLayer, { passive: true });
    window.addEventListener("resize", updateLayer);
    reducedMotion.addEventListener("change", updateLayer);
    compactViewport.addEventListener("change", updateLayer);

    return () => {
      window.removeEventListener("scroll", updateLayer);
      window.removeEventListener("resize", updateLayer);
      reducedMotion.removeEventListener("change", updateLayer);
      compactViewport.removeEventListener("change", updateLayer);
    };
  }, []);

  const isMarkerVisible = (role: MarketMarker["role"]) => {
    if (role === "base") {
      return activeLayer >= 1;
    }

    if (role === "source" || role === "dual") {
      return activeLayer >= 2;
    }

    return activeLayer >= 3;
  };

  const isMarkerPulsing = (role: MarketMarker["role"]) => {
    if (activeLayer === 1) {
      return role === "base";
    }

    if (activeLayer === 2) {
      return role === "source" || role === "dual";
    }

    return true;
  };

  return (
    <section ref={sectionRef} className="markets-layer-section bg-deep-dark text-surface">
      <HomeShell className="markets-layer-stage grid items-center gap-8 py-16 lg:grid-cols-2 lg:py-20">
        <div>
          <div className="reveal reveal--up flex items-center gap-6">
            <IconImage className="h-20 w-20 shrink-0 object-contain sm:h-28 sm:w-28" src="/brand/a3logomark.svg" size={112} />
            <h2 className="type-section text-surface">
              Source markets and destination experience
            </h2>
          </div>
          <p className="reveal reveal--up reveal-delay-1 type-p1 mt-6 text-surface">
            A3 operates from London, working with selected supplier countries and commercial buyer markets across Europe, Africa, North America, South America and Asia.
          </p>
          <p className="reveal reveal--up reveal-delay-2 type-p2 mt-6 text-surface">
            Source countries include Turkiye, Poland, Argentina, China, Brazil and Ukraine. Destination experience includes the USA, Canada, Germany, France, Ghana, Senegal, China, Taiwan and other commercial markets.
          </p>
          <ol className="reveal reveal--up reveal-delay-3 mt-8 grid gap-3">
            {marketLayers.map((layer, index) => (
              <li
                className={`markets-layer-item ${activeLayer === index + 1 ? "is-active" : ""}`}
                key={layer.number}
              >
                <span className="type-kicker text-brand-blue">{layer.number}</span>
                <div>
                  <h3 className="type-p2 font-medium text-surface">{layer.title}</h3>
                  <p className="type-p3 mt-1 text-surface/72">{layer.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="markets-map reveal reveal--fade reveal-delay-2 relative min-h-[260px] min-w-0 overflow-hidden lg:min-h-[464px]" role="img" aria-label="World map showing A3 sourcing markets and destination experience">
          <Image
            aria-hidden="true"
            className="h-full min-h-[260px] w-full object-contain"
            src={homeLanding.markets.map}
            alt=""
            width={640}
            height={464}
            unoptimized
          />
          <div className="absolute inset-0" aria-hidden="true">
            {marketMarkers.map((marker) => (
              <span
                className={`markets-map-marker markets-map-marker--${marker.role} ${
                  isMarkerVisible(marker.role) ? "is-visible" : ""
                } ${isMarkerPulsing(marker.role) ? "is-pulsing" : ""} ${
                  marker.role === "dual" && activeLayer >= 3 ? "is-destination-complete" : ""
                }`}
                key={marker.name}
                style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
              />
            ))}
          </div>
        </div>
      </HomeShell>
    </section>
  );
}

function HowA3Works() {
  const [activeStep, setActiveStep] = useState<string>(homeLanding.process.steps[0].number);

  return (
    <section className="bg-paper py-16 lg:py-24">
      <HomeShell className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="process-content">
          <SectionIntro title={homeLanding.process.title} text={homeLanding.process.text} />
          <div className="process-cta-group reveal reveal--up reveal-delay-1" aria-label="How A3 works actions">
            <LinkButton href={homeLanding.process.cta.href} variant="primary">
              {homeLanding.process.cta.label}
            </LinkButton>
            <LinkButton href="/en/contact" variant="text">
              Get in Touch
            </LinkButton>
          </div>
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
                    onClick={() => setActiveStep(step.number)}
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
  const [activeBuyerId, setActiveBuyerId] = useState<string | null>(null);

  return (
    <section className="bg-paper py-16 lg:py-20">
      <HomeShell>
        <SectionIntro
          title="Who A3 works with"
          text="A3 works with buyers who need clear product options, supplier communication and practical trade follow-up across different channels."
          className="mb-8"
        />
        <div
          className={`buyer-segment-panel ${activeBuyerId ? "has-active-card" : ""}`}
          onMouseLeave={() => setActiveBuyerId(null)}
          onBlurCapture={(event) => {
            const nextFocus = event.relatedTarget instanceof Node ? event.relatedTarget : null;
            if (!nextFocus || !event.currentTarget.contains(nextFocus)) {
              setActiveBuyerId(null);
            }
          }}
        >
          {homeLanding.buyerPaths.map((path) => (
            <article
              className={`buyer-segment-card ${activeBuyerId === path.id ? "is-active" : ""}`}
              key={path.id}
              onMouseEnter={() => setActiveBuyerId(path.id)}
              onFocus={() => setActiveBuyerId(path.id)}
              onClick={() => setActiveBuyerId(path.id)}
              tabIndex={0}
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
                  <h3 className="buyer-segment-card__title">{path.title}</h3>
                  <p className="buyer-segment-card__hint">{path.shortHint}</p>
                </div>
                <div className="buyer-segment-card__details">
                  <div className="buyer-segment-card__cta">
                    <LinkButton href={path.href} variant="primary">
                      Start a Request
                    </LinkButton>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </HomeShell>
    </section>
  );
}

function BeforeYouEnquire() {
  return (
    <section className="before-enquire-band bg-paper py-10 lg:py-12">
      <HomeShell className="grid gap-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
        <div className="reveal reveal--up max-w-[520px]">
          <h2 className="type-h2 text-ink">
            Before you enquire
          </h2>
          <p className="type-p2 mt-4 text-ink/76">
            Review the available product catalogues before starting a trade discussion with A3.
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
          <p className="type-p1 mt-5 max-w-[760px] text-surface">{homeLanding.cta.text}</p>
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
