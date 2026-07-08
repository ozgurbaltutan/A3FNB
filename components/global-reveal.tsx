"use client";

import { useEffect } from "react";

const AUTO_REVEAL_SELECTORS = [
  "main .type-hero",
  "main .type-hero-body",
  "main .type-section",
  "main .type-section-lead",
  "main .editorial-copy",
  "main .editorial-media",
  "main .card-title",
  "main .product-category-card",
  "main .commodity-bento__card",
  "main .buyer-segment-card",
  "main .elle-mina-segment-card",
  "main .before-enquire-card",
  "main .products-lineup-card",
  "main .private-label-card",
  "main .products-support-panel",
  "main .product-detail-hero__media",
  "main .product-detail-story__media",
  "main .product-profile-row",
  "main .product-range-group",
  "main .product-range-offering",
  "main .product-documents-item",
  "main .product-buyer-info__column",
  "main .product-portfolio-card",
  "main .contact-form-panel",
  "main .contact-info-panel",
  "main .legal-page__notice",
  "main .legal-page__section",
  "main .legal-page__contact",
].join(",");

export function GlobalReveal() {
  useEffect(() => {
    const explicitItems = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const autoItems = Array.from(document.querySelectorAll<HTMLElement>(AUTO_REVEAL_SELECTORS));
    const items = Array.from(new Set([...explicitItems, ...autoItems]));

    if (items.length === 0) return;

    items.forEach((item) => {
      if (!item.classList.contains("reveal")) {
        item.classList.add("reveal", "reveal--auto");
      }
    });

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.14,
      },
    );

    items.forEach((item) => {
      const parent = item.parentElement;
      const siblingIndex = parent ? Array.from(parent.children).indexOf(item) : 0;
      const delayIndex = Math.max(0, siblingIndex % 6);

      if (!item.style.getPropertyValue("--reveal-delay")) {
        item.style.setProperty("--reveal-delay", `calc(var(--reveal-stagger) * ${delayIndex})`);
      }

      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
