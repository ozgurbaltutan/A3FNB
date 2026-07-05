"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { homeAssets, homeLanding } from "@/content/site";
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

type MarketPin = {
  name: string;
  x: number;
  y: number;
  isHub?: boolean;
  labelAlign?: "left" | "center" | "right";
};

function cardCopy(item: { cardSummary?: string; description: string }) {
  return item.cardSummary ?? item.description;
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
      <ElleMinaOwnBrand />
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
  const featuredProducts: readonly FeaturedProduct[] = homeLanding.featuredProducts;

  return (
    <>
      <EditorialBridge tone="surface" className="featured-sourcing-bridge">
        <SectionIntro
          title="Priority food categories"
          text="A3 helps buyers access selected food commodities, ingredients and packaged products, with options shaped around origin, specification, packing, volume and shipping requirements."
          className="featured-sourcing-intro"
        />
      </EditorialBridge>
      <section className="featured-sourcing-section">
        <HomeShell>
          <div className="commodity-bento reveal reveal--up">
            <div className="commodity-bento__grid">
              {featuredProducts.map((product, index) => (
                <Link
                  href={product.href}
                  className="commodity-bento__card premium-focus group"
                  key={product.id}
                >
                  <article className="commodity-bento__card-inner">
                    {product.image ? (
                      <Image
                        className="commodity-bento__media"
                        src={product.image}
                        alt={product.imageAlt ?? ""}
                        fill
                        sizes="(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw"
                        priority={index < 2}
                      />
                    ) : null}
                    <div className="commodity-bento__overlay" aria-hidden="true" />
                    <div className="commodity-bento__content">
                      <div className="commodity-bento__heading">
                        <span className="commodity-bento__icon-frame" aria-hidden="true">
                          <IconImage className="commodity-bento__icon" src={product.icon} />
                        </span>
                        <h3 className="commodity-bento__title">{product.title}</h3>
                        <span className="image-card-cta" aria-hidden="true">→</span>
                      </div>
                      <p className="commodity-bento__description">{cardCopy(product)}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </HomeShell>
      </section>
    </>
  );
}

function ElleMinaOwnBrand() {
  const { ownBrand } = homeLanding;

  return (
    <section className="elle-mina-home-section pb-16 pt-10 lg:pb-20 lg:pt-12">
      <HomeShell>
        <div className="reveal reveal--up mb-8 max-w-[760px]">
          <h2 className="type-section text-ink">{ownBrand.title}</h2>
          <p className="type-section-lead mt-5 text-ink/76">{ownBrand.text}</p>
        </div>
        <div className="elle-mina-segment-panel">
          {ownBrand.products.map((product) => (
            <Link
              className="elle-mina-segment-card premium-focus"
              href={ownBrand.href}
              key={product.id}
            >
              <Image
                className="elle-mina-segment-card__media"
                src={product.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 48vw, (min-width: 768px) 33vw, 100vw"
                aria-hidden="true"
              />
              <span className="elle-mina-segment-card__overlay" aria-hidden="true" />
              <span className="elle-mina-segment-card__content">
                <span className="elle-mina-segment-card__title-row">
                  <span className="elle-mina-segment-card__title">{product.title}</span>
                  <span className="image-card-cta" aria-hidden="true">→</span>
                </span>
                <span className="elle-mina-segment-card__hint">{cardCopy(product)}</span>
              </span>
            </Link>
          ))}
        </div>
      </HomeShell>
    </section>
  );
}

function MarketsPreview() {
  const marketPins: readonly MarketPin[] = [
    { name: "United Kingdom / London", x: 45.2, y: 20.2, isHub: true, labelAlign: "center" },
    { name: "Turkiye / Istanbul", x: 56.4, y: 27.4, labelAlign: "left" },
    { name: "Poland", x: 53.2, y: 22.0, labelAlign: "left" },
    { name: "Argentina", x: 31.9, y: 77.0, labelAlign: "right" },
    { name: "China", x: 76.6, y: 35.4, labelAlign: "right" },
    { name: "Brazil", x: 31.6, y: 63.0, labelAlign: "right" },
    { name: "Ukraine", x: 56.8, y: 24.2, labelAlign: "left" },
    { name: "USA", x: 26.0, y: 31.0, labelAlign: "left" },
    { name: "Canada", x: 23.0, y: 19.0, labelAlign: "left" },
    { name: "Germany", x: 50.8, y: 22.8, labelAlign: "left" },
    { name: "France", x: 48.0, y: 25.6, labelAlign: "right" },
    { name: "Mauritania", x: 45.2, y: 39.0, labelAlign: "right" },
    { name: "Senegal", x: 43.6, y: 44.0, labelAlign: "right" },
    { name: "Ghana", x: 47.6, y: 48.2, labelAlign: "right" },
    { name: "Niger", x: 50.2, y: 41.6, labelAlign: "left" },
    { name: "Cameroon", x: 51.0, y: 49.2, labelAlign: "left" },
    { name: "Madagascar", x: 62.8, y: 67.0, labelAlign: "right" },
    { name: "Mozambique", x: 57.8, y: 63.6, labelAlign: "left" },
    { name: "Taiwan", x: 83.1, y: 39.8, labelAlign: "right" },
    { name: "Australia / Sydney", x: 89.2, y: 78.2, labelAlign: "right" },
  ];

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
        <div className="markets-map reveal reveal--fade reveal-delay-2 relative min-w-0" role="img" aria-label="World map showing London and selected connected markets">
          <Image
            aria-hidden="true"
            className="markets-map__image h-full w-full object-contain"
            src={homeLanding.markets.map}
            alt=""
            width={640}
            height={464}
            unoptimized
          />
          <div className="markets-map__pins">
            {marketPins.map((pin) => (
              <button
                aria-label={pin.name}
                className={`markets-map-pin ${pin.isHub ? "is-hub" : ""} ${pin.labelAlign ? `label-${pin.labelAlign}` : ""}`}
                key={pin.name}
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                type="button"
              >
                <span className="markets-map-pin__dot" />
                <span className="markets-map-pin__label">{pin.name}</span>
              </button>
            ))}
          </div>
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
          text="A3 works with commercial buyers, manufacturers, distributors, retailers, foodservice teams and producers that need reliable product options, supplier coordination and workable trade conditions."
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
