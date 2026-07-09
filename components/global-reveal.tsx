"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

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
  "main .product-image-card",
  "main .contact-form-panel",
  "main .contact-info-panel",
  "main .legal-page__notice",
  "main .legal-page__section",
  "main .legal-page__contact",
].join(",");

export function GlobalReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observedItems = new Set<HTMLElement>();
    let frame = 0;
    let observer: IntersectionObserver | null = null;

    function revealItem(item: Element) {
      item.classList.add("is-visible");
      if (observer) {
        observer.unobserve(item);
      }
      observedItems.delete(item as HTMLElement);
    }

    function prepareItem(item: HTMLElement) {
      if (!item.classList.contains("reveal")) {
        item.classList.add("reveal", "reveal--auto");
      }

      const parent = item.parentElement;
      const siblingIndex = parent ? Array.from(parent.children).indexOf(item) : 0;
      const delayIndex = Math.max(0, siblingIndex % 6);

      if (!item.style.getPropertyValue("--reveal-delay")) {
        item.style.setProperty("--reveal-delay", `calc(var(--reveal-stagger) * ${delayIndex})`);
      }
    }

    function isAlreadyInView(item: HTMLElement) {
      const rect = item.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      return rect.top <= viewportHeight * 0.96 && rect.bottom >= 0;
    }

    function collectItems() {
      const explicitItems = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
      const autoItems = Array.from(document.querySelectorAll<HTMLElement>(AUTO_REVEAL_SELECTORS));
      return Array.from(new Set([...explicitItems, ...autoItems]));
    }

    function scan() {
      const items = collectItems();

      if (items.length === 0) return;

      items.forEach((item) => {
        prepareItem(item);

        if (item.classList.contains("is-visible")) return;

        if (reducedMotion.matches || !observer || isAlreadyInView(item)) {
          revealItem(item);
          return;
        }

        if (!observedItems.has(item)) {
          observedItems.add(item);
          observer.observe(item);
        }
      });
    }

    function scheduleScan() {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        scan();
      });
    }

    if (!reducedMotion.matches && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            revealItem(entry.target);
          });
        },
        {
          rootMargin: "0px 0px -6% 0px",
          threshold: 0.06,
        },
      );
    }

    const mutationObserver = new MutationObserver(scheduleScan);
    const mutationRoot = document.querySelector("main") ?? document.body;

    mutationObserver.observe(mutationRoot, {
      childList: true,
      subtree: true,
    });

    scan();
    window.requestAnimationFrame(scan);
    window.setTimeout(scan, 120);
    window.setTimeout(scan, 600);

    window.addEventListener("scroll", scheduleScan, { passive: true });
    window.addEventListener("resize", scheduleScan);
    window.addEventListener("pageshow", scheduleScan);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      mutationObserver.disconnect();
      observer?.disconnect();
      window.removeEventListener("scroll", scheduleScan);
      window.removeEventListener("resize", scheduleScan);
      window.removeEventListener("pageshow", scheduleScan);
    };
  }, [pathname]);

  return null;
}
