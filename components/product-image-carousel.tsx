"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { CarouselRail, useCarouselRail } from "@/components/carousel-rail";

export type ProductImageCarouselItem = {
  id: string;
  title: string;
  cardTitle?: string;
  description: string;
  image: string;
  imageAlt: string;
};

type ProductImageCarouselBaseProps<TItem extends ProductImageCarouselItem> = {
  appearance?: "light" | "legacy-dark";
  ariaLabel: string;
  className?: string;
  contentMode?: "default" | "title-only";
  getItemLabel?: (item: TItem) => string;
  header?: ReactNode;
  items: TItem[];
  treatment?: "default" | "category-overlay";
};

type ProductImageCarouselLinkProps<TItem extends ProductImageCarouselItem> =
  ProductImageCarouselBaseProps<TItem> & {
    getHref: (item: TItem) => string;
    mode: "link";
    onItemActivate?: never;
    setItemRef?: never;
  };

type ProductImageCarouselButtonProps<TItem extends ProductImageCarouselItem> =
  ProductImageCarouselBaseProps<TItem> & {
    getHref?: never;
    mode: "button";
    onItemActivate: (item: TItem) => void;
    setItemRef?: (id: string, node: HTMLElement | null) => void;
  };

export type ProductImageCarouselProps<TItem extends ProductImageCarouselItem> =
  | ProductImageCarouselLinkProps<TItem>
  | ProductImageCarouselButtonProps<TItem>;

type ProductImageCardProps<TItem extends ProductImageCarouselItem> = {
  appearance?: "light" | "legacy-dark";
  getItemLabel?: (item: TItem) => string;
  href?: string;
  imageSizes?: string;
  item: TItem;
  mode: "link" | "button";
  contentMode?: "default" | "title-only";
  onActivate?: (item: TItem) => void;
  priority?: boolean;
  setItemRef?: (id: string, node: HTMLElement | null) => void;
  treatment?: "default" | "category-overlay";
};

function ProductImageCard<TItem extends ProductImageCarouselItem>({
  getItemLabel,
  href,
  imageSizes = "(max-width: 767px) 82vw, (max-width: 1199px) 38vw, 24vw",
  item,
  mode,
  contentMode = "default",
  appearance = "light",
  onActivate,
  priority = false,
  setItemRef,
  treatment = "default",
}: ProductImageCardProps<TItem>) {
  const label = getItemLabel?.(item) ?? item.title;
  const cardTitle = item.cardTitle ?? item.title;
  const cardClassName = `product-image-card product-image-card--${appearance}${contentMode === "title-only" ? " product-image-card--title-only" : ""}`;
  const content = (
    <>
      <div className="product-image-card__media">
        <Image alt={item.imageAlt} fill priority={priority} sizes={imageSizes} src={item.image} />
      </div>
      <div className="product-image-card__body">
        <div className="product-image-card__copy">
          <div className="product-image-card__title-row">
            <strong>{cardTitle}</strong>
            <svg
              aria-hidden="true"
              className="product-image-card__chevron"
              fill="none"
              height="20"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.6"
              viewBox="0 0 20 20"
              width="20"
            >
              <path d="M4 10h11M11 6l4 4-4 4" />
            </svg>
          </div>
          {contentMode === "default" ? <p>{item.description}</p> : null}
        </div>
      </div>
    </>
  );

  if (mode === "link") {
    return <Link aria-label={label} className={cardClassName} data-appearance={appearance} data-treatment={treatment} href={href ?? "#"}>{content}</Link>;
  }

  return (
    <button
      aria-label={label}
      className={cardClassName}
      data-appearance={appearance}
      data-treatment={treatment}
      onClick={() => onActivate?.(item)}
      ref={(node) => setItemRef?.(item.id, node)}
      type="button"
    >
      {content}
    </button>
  );
}

function CarouselControls({
  ariaLabel,
  canScrollNext,
  canScrollPrevious,
  onNext,
  onPrevious,
}: {
  ariaLabel: string;
  canScrollNext: boolean;
  canScrollPrevious: boolean;
  onNext: () => void;
  onPrevious: () => void;
}) {
  return (
    <div className="product-image-carousel__controls" aria-label={`${ariaLabel} controls`}>
      <button
        aria-label={`Previous ${ariaLabel}`}
        className="product-image-carousel__control product-image-carousel__control--previous"
        disabled={!canScrollPrevious}
        onClick={onPrevious}
        type="button"
      />
      <button
        aria-label={`Next ${ariaLabel}`}
        className="product-image-carousel__control product-image-carousel__control--next"
        disabled={!canScrollNext}
        onClick={onNext}
        type="button"
      />
    </div>
  );
}

export function ProductImageCarousel<TItem extends ProductImageCarouselItem>(props: ProductImageCarouselProps<TItem>) {
  const { appearance = "light", ariaLabel, className = "", contentMode = "default", getItemLabel, header, items, treatment = "default" } = props;
  const rail = useCarouselRail({ itemCount: items.length });
  const hasControls = items.length > 1;

  return (
    <div className={`product-image-carousel ${className}`}>
      {header || hasControls ? (
        <div className="product-image-carousel__header">
          <div className="product-image-carousel__intro">{header}</div>
          {hasControls ? (
            <CarouselControls
              ariaLabel={ariaLabel}
              canScrollNext={rail.canScrollNext}
              canScrollPrevious={rail.canScrollPrevious}
              onNext={rail.scrollNext}
              onPrevious={rail.scrollPrevious}
            />
          ) : null}
        </div>
      ) : null}
      <CarouselRail
        ariaLabel={ariaLabel}
        className="product-image-carousel__rail"
        onKeyDown={rail.handleKeyDown}
        stageClassName="product-image-carousel__stage"
        trackClassName="product-image-carousel__track"
        viewportClassName="product-image-carousel__viewport"
        viewportRef={rail.viewportRef}
      >
        {items.map((item, index) => props.mode === "link" ? (
          <ProductImageCard
            contentMode={contentMode}
            appearance={appearance}
            getItemLabel={getItemLabel}
            href={props.getHref(item)}
            item={item}
            key={item.id}
            mode="link"
            priority={index < 2}
            treatment={treatment}
          />
        ) : (
          <ProductImageCard
            contentMode={contentMode}
            appearance={appearance}
            getItemLabel={getItemLabel}
            item={item}
            key={item.id}
            mode="button"
            onActivate={props.onItemActivate}
            priority={index < 2}
            setItemRef={props.setItemRef}
            treatment={treatment}
          />
        ))}
      </CarouselRail>
    </div>
  );
}

export type ProductImageGridProps<TItem extends ProductImageCarouselItem> = ProductImageCarouselProps<TItem>;

export function ProductImageGrid<TItem extends ProductImageCarouselItem>(props: ProductImageGridProps<TItem>) {
  const { appearance = "light", ariaLabel, className = "", contentMode = "default", getItemLabel, items, treatment = "default" } = props;

  return (
    <ul aria-label={ariaLabel} className={`product-card-grid product-image-grid ${className}`.trim()}>
      {items.map((item, index) => (
        <li className="product-image-grid__item" key={item.id}>
          {props.mode === "link" ? (
            <ProductImageCard
              contentMode={contentMode}
              appearance={appearance}
              getItemLabel={getItemLabel}
              href={props.getHref(item)}
              imageSizes="(min-width: 1181px) 25vw, (min-width: 768px) 50vw, 100vw"
              item={item}
              mode="link"
              priority={index < 4}
              treatment={treatment}
            />
          ) : (
            <ProductImageCard
              contentMode={contentMode}
              appearance={appearance}
              getItemLabel={getItemLabel}
              imageSizes="(min-width: 1181px) 25vw, (min-width: 768px) 50vw, 100vw"
              item={item}
              mode="button"
              onActivate={props.onItemActivate}
              priority={index < 4}
              setItemRef={props.setItemRef}
              treatment={treatment}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
