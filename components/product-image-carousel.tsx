"use client";

import Image from "next/image";
import Link from "next/link";
import { CarouselRail, useCarouselRail } from "@/components/carousel-rail";

export type ProductImageCarouselItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

type ProductImageCarouselBaseProps<TItem extends ProductImageCarouselItem> = {
  ariaLabel: string;
  className?: string;
  getItemLabel?: (item: TItem) => string;
  items: TItem[];
  showPlus?: boolean;
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
  getItemLabel?: (item: TItem) => string;
  href?: string;
  imageSizes?: string;
  item: TItem;
  mode: "link" | "button";
  onActivate?: (item: TItem) => void;
  priority?: boolean;
  setItemRef?: (id: string, node: HTMLElement | null) => void;
  showPlus?: boolean;
};

function ProductImageCard<TItem extends ProductImageCarouselItem>({
  getItemLabel,
  href,
  imageSizes = "(max-width: 767px) 82vw, (max-width: 1199px) 38vw, 24vw",
  item,
  mode,
  onActivate,
  priority = false,
  setItemRef,
  showPlus = false,
}: ProductImageCardProps<TItem>) {
  const label = getItemLabel?.(item) ?? item.title;
  const content = (
    <>
      <div className="product-image-card__media">
        <Image
          alt={item.imageAlt}
          fill
          priority={priority}
          sizes={imageSizes}
          src={item.image}
        />
      </div>
      <div className="product-image-card__body">
        <div className="product-image-card__copy">
          <strong>{item.title}</strong>
          <p>{item.description}</p>
        </div>
      </div>
      {showPlus ? (
        <span className="card-plus-button product-image-card__trigger" aria-hidden="true">
          <span aria-hidden="true" />
        </span>
      ) : null}
    </>
  );

  if (mode === "link") {
    return (
      <Link aria-label={label} className="product-image-card" href={href ?? "#"}>
        {content}
      </Link>
    );
  }

  return (
    <button
      aria-label={label}
      className="product-image-card"
      onClick={() => onActivate?.(item)}
      ref={(node) => setItemRef?.(item.id, node)}
      type="button"
    >
      {content}
    </button>
  );
}

export function ProductImageCarousel<TItem extends ProductImageCarouselItem>(props: ProductImageCarouselProps<TItem>) {
  const { ariaLabel, className = "", getItemLabel, items, showPlus = false } = props;
  const rail = useCarouselRail({ itemCount: items.length });
  const hasControls = items.length > 1;

  return (
    <div className={`product-image-carousel ${className}`}>
      <CarouselRail
        ariaLabel={ariaLabel}
        className="product-image-carousel__rail"
        stageClassName="product-image-carousel__stage"
        trackClassName="product-image-carousel__track"
        viewportClassName="product-image-carousel__viewport"
        viewportRef={rail.viewportRef}
      >
        {items.map((item, index) => {
          if (props.mode === "link") {
            return (
              <ProductImageCard
                getItemLabel={getItemLabel}
                href={props.getHref(item)}
                item={item}
                key={item.id}
                mode="link"
                priority={index < 2}
                showPlus={showPlus}
              />
            );
          }

          return (
            <ProductImageCard
              getItemLabel={getItemLabel}
              item={item}
              key={item.id}
              mode="button"
              onActivate={props.onItemActivate}
              priority={index < 2}
              setItemRef={props.setItemRef}
              showPlus={showPlus}
            />
          );
        })}
      </CarouselRail>
      {hasControls ? (
        <div className="product-image-carousel__controls" aria-label={`${ariaLabel} controls`}>
          <button
            aria-label={`Previous ${ariaLabel}`}
            className="product-image-carousel__control product-image-carousel__control--previous"
            disabled={!rail.canScrollPrevious}
            onClick={rail.scrollPrevious}
            type="button"
          />
          <button
            aria-label={`Next ${ariaLabel}`}
            className="product-image-carousel__control product-image-carousel__control--next"
            disabled={!rail.canScrollNext}
            onClick={rail.scrollNext}
            type="button"
          />
        </div>
      ) : null}
    </div>
  );
}

export type ProductImageGridProps<TItem extends ProductImageCarouselItem> = ProductImageCarouselProps<TItem>;

export function ProductImageGrid<TItem extends ProductImageCarouselItem>(props: ProductImageGridProps<TItem>) {
  const { ariaLabel, className = "", getItemLabel, items, showPlus = false } = props;

  return (
    <ul aria-label={ariaLabel} className={`product-card-grid product-image-grid ${className}`.trim()}>
      {items.map((item, index) => (
        <li className="product-image-grid__item" key={item.id}>
          {props.mode === "link" ? (
            <ProductImageCard
              getItemLabel={getItemLabel}
              href={props.getHref(item)}
              imageSizes="(min-width: 1181px) 25vw, (min-width: 768px) 50vw, 100vw"
              item={item}
              mode="link"
              priority={index < 4}
              showPlus={showPlus}
            />
          ) : (
            <ProductImageCard
              getItemLabel={getItemLabel}
              imageSizes="(min-width: 1181px) 25vw, (min-width: 768px) 50vw, 100vw"
              item={item}
              mode="button"
              onActivate={props.onItemActivate}
              priority={index < 4}
              setItemRef={props.setItemRef}
              showPlus={showPlus}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
