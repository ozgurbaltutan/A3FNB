"use client";

/* eslint-disable @next/next/no-img-element */

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { InnerPageHero } from "@/components/inner-page-hero";
import { Container, LinkButton } from "@/components/ui";
import { homeLanding } from "@/content/site";

type ProductLineupGroup = "commodities" | "ingredients" | "retail-foodservice";

type ProductLineupFact = {
  label: string;
  value: string;
};

export type ProductLineupItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
  image: string;
  imageAlt: string;
  group: ProductLineupGroup;
  facts: ProductLineupFact[];
};

const filters: { id: "all" | ProductLineupGroup; label: string }[] = [
  { id: "all", label: "All" },
  { id: "commodities", label: "Commodities" },
  { id: "ingredients", label: "Ingredients" },
  { id: "retail-foodservice", label: "Retail & Foodservice" },
];

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

const initialVisibleCount = 4;
const compactIconProductIds = new Set([
  "oils-fats",
  "dried-fruit-nuts",
  "frozen-foods",
  "consumer-foods",
]);

export function ProductsLineupPage({ products }: { products: ProductLineupItem[] }) {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]["id"]>("all");
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);
  const [activeSupport, setActiveSupport] = useState<string>(supportItems[0].title);
  const revealSentinelRef = useRef<HTMLDivElement | null>(null);
  const revealLockRef = useRef(false);

  const filteredProducts = useMemo(
    () =>
      activeFilter === "all"
        ? products
        : products.filter((product) => product.group === activeFilter),
    [activeFilter, products],
  );
  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const activeSupportItem = supportItems.find((item) => item.title === activeSupport) ?? supportItems[0];

  useEffect(() => {
    setVisibleCount(initialVisibleCount);
  }, [activeFilter]);

  useEffect(() => {
    if (visibleCount >= filteredProducts.length) return;
    const sentinel = revealSentinelRef.current;
    if (!sentinel) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisibleCount(filteredProducts.length);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        if (revealLockRef.current) return;
        revealLockRef.current = true;
        setVisibleCount((current) => Math.min(current + 4, filteredProducts.length));
        window.setTimeout(() => {
          revealLockRef.current = false;
        }, 360);
      },
      { rootMargin: "96px 0px 96px", threshold: 0.01 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [filteredProducts.length, visibleCount]);

  function selectFilter(filterId: (typeof filters)[number]["id"]) {
    revealLockRef.current = false;
    setActiveFilter(filterId);
    setVisibleCount(initialVisibleCount);
  }

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
          <div className="products-lineup-heading">
            <h2 className="type-section">Explore the product lineup</h2>
            <p className="type-section-lead">
              Browse A3 product categories by commercial role, then open the category that best matches the sourcing requirement.
            </p>
          </div>

          <div className="products-lineup-filters" aria-label="Product category filters" role="tablist">
            {filters.map((filter) => (
              <button
                aria-selected={activeFilter === filter.id}
                className={`products-lineup-filter premium-focus ${activeFilter === filter.id ? "is-active" : ""}`}
                key={filter.id}
                onClick={() => selectFilter(filter.id)}
                role="tab"
                type="button"
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="products-lineup-grid">
            {visibleProducts.map((product, index) => (
              <Link
                className="products-lineup-card premium-focus"
                href={product.href}
                key={product.id}
                style={{ "--reveal-index": String(index % 4) } as CSSProperties}
              >
                <span className="products-lineup-card__media">
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    priority={index < 4}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                </span>
                <div className="products-lineup-card__body">
                  <div className="products-lineup-card__title-row">
                    <span
                      className="products-lineup-card__icon"
                      data-icon-size={compactIconProductIds.has(product.id) ? "compact" : "default"}
                      aria-hidden="true"
                    >
                      <img src={product.icon} alt="" loading="eager" />
                    </span>
                    <h2>{product.title}</h2>
                  </div>
                  <p>{product.description}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="products-lineup-reveal-sentinel" ref={revealSentinelRef} aria-hidden="true" />
        </Container>
      </section>

      <section className="private-label-band">
        <Container className="a3-container private-label-band__inner">
          <div className="private-label-band__copy">
            <h2 className="type-section">{homeLanding.ownBrand.title}</h2>
            <p className="type-section-lead">{homeLanding.ownBrand.text}</p>
            <div className="private-label-band__actions">
              <LinkButton href={homeLanding.ownBrand.href} variant="primary">
                {homeLanding.ownBrand.ctaLabel}
              </LinkButton>
              <LinkButton href="/en/request-a-quote?product=elle-mina" variant="outline">
                Discuss Private Label
              </LinkButton>
            </div>
          </div>
          <Link className="private-label-card premium-focus" href={homeLanding.ownBrand.href}>
            <Image
              className="private-label-card__media"
              src={homeLanding.ownBrand.image}
              alt={homeLanding.ownBrand.imageAlt}
              fill
              sizes="(min-width: 1024px) 520px, 100vw"
            />
            <span className="private-label-card__overlay" aria-hidden="true" />
            <span className="private-label-card__content">
              <span className="private-label-card__title">Elle Mina margarine &amp; butter</span>
              <span className="private-label-card__text">
                Consumer, professional and butter formats reviewed by channel, packing, destination and timing.
              </span>
              <span className="private-label-card__link">View own brand range</span>
            </span>
          </Link>
        </Container>
      </section>

      <section className="products-support-band">
        <Container className="a3-container products-support-band__inner">
          <div className="products-support-band__heading">
            <h2 className="type-section">How A3 supports product sourcing</h2>
            <p className="type-section-lead">
              Product availability is only useful when specification, supplier fit, documentation and shipment route can work together.
            </p>
          </div>
          <div className="products-support-panel">
            <div className="process-accordion products-support-panel__accordion">
              {supportItems.map((item, index) => {
                const isActive = activeSupport === item.title;
                const panelId = `products-support-${index + 1}`;
                const number = String(index + 1).padStart(2, "0");

                return (
                  <article className={`process-accordion-item products-support-panel__item ${isActive ? "is-active" : ""}`} key={item.title}>
                    <button
                      aria-controls={panelId}
                      aria-expanded={isActive}
                      className="process-accordion-trigger products-support-panel__trigger premium-focus"
                      onClick={() => setActiveSupport(item.title)}
                      type="button"
                    >
                      <span className="process-accordion-index">{number}</span>
                      <span className="process-accordion-title">{item.title}</span>
                      <span className="process-accordion-arrow products-support-panel__arrow" aria-hidden="true" />
                    </button>
                    <div className="process-accordion-panel products-support-panel__panel" id={panelId}>
                      <p>{item.text}</p>
                    </div>
                  </article>
                );
              })}
            </div>
            <figure className="products-support-panel__media">
              <Image
                key={activeSupportItem.image}
                src={activeSupportItem.image}
                alt={activeSupportItem.imageAlt}
                fill
                sizes="(min-width: 1024px) 620px, 100vw"
                className="object-cover"
              />
            </figure>
          </div>
        </Container>
      </section>

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
              src="/media/home/final-cta.webp"
              alt="Commercial food market and buyer activity"
              fill
              sizes="(min-width: 1024px) 520px, 100vw"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
