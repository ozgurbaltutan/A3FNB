"use client";

import { useId, useMemo, useState } from "react";
import {
  ProductImageGrid,
  type ProductImageCarouselItem,
} from "@/components/product-image-carousel";

export type ProductGridGroup = {
  id: string;
  label: string;
  itemIds: string[];
};

type FilteredProductGridBaseProps<TItem extends ProductImageCarouselItem> = {
  ariaLabel: string;
  className?: string;
  contentMode?: "default" | "title-only";
  filterThreshold?: number;
  groups?: ProductGridGroup[];
  items: TItem[];
  showFilters?: boolean;
  getItemLabel?: (item: TItem) => string;
};

type FilteredProductGridLinkProps<TItem extends ProductImageCarouselItem> =
  FilteredProductGridBaseProps<TItem> & {
    getHref: (item: TItem) => string;
    mode: "link";
    onItemActivate?: never;
    setItemRef?: never;
  };

type FilteredProductGridButtonProps<TItem extends ProductImageCarouselItem> =
  FilteredProductGridBaseProps<TItem> & {
    getHref?: never;
    mode: "button";
    onItemActivate: (item: TItem) => void;
    setItemRef?: (id: string, node: HTMLElement | null) => void;
  };

export type FilteredProductGridProps<TItem extends ProductImageCarouselItem> =
  | FilteredProductGridLinkProps<TItem>
  | FilteredProductGridButtonProps<TItem>;

export function FilteredProductGrid<TItem extends ProductImageCarouselItem>(
  props: FilteredProductGridProps<TItem>,
) {
  const generatedId = useId().replaceAll(":", "");
  const {
    ariaLabel,
    className = "",
    contentMode = "default",
    filterThreshold = 8,
    getItemLabel,
    groups = [],
    items,
    showFilters = items.length > filterThreshold,
  } = props;
  const availableGroups = useMemo(
    () => groups
      .map((group) => ({
        ...group,
        itemIds: group.itemIds.filter((id) => items.some((item) => item.id === id)),
      }))
      .filter((group) => group.itemIds.length > 0),
    [groups, items],
  );
  const filters = showFilters && availableGroups.length > 1
    ? [{ id: "all", label: "All", itemIds: items.map((item) => item.id) }, ...availableGroups]
    : [];
  const [activeFilter, setActiveFilter] = useState("all");
  const resolvedFilter = filters.find((filter) => filter.id === activeFilter) ?? filters[0];
  const visibleItems = resolvedFilter
    ? items.filter((item) => resolvedFilter.itemIds.includes(item.id))
    : items;
  const panelId = `${generatedId}-panel`;

  return (
    <div className={`filtered-product-grid ${className}`.trim()}>
      {filters.length ? (
        <div aria-label={`${ariaLabel} filters`} className="product-filter-tabs" role="tablist">
          {filters.map((filter) => (
            <button
              aria-controls={panelId}
              aria-selected={filter.id === resolvedFilter?.id}
              className="product-filter-tab premium-focus"
              data-active={filter.id === resolvedFilter?.id}
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              role="tab"
              type="button"
            >
              {filter.label}
            </button>
          ))}
        </div>
      ) : null}
      <div aria-live="polite" id={panelId} role={filters.length ? "tabpanel" : undefined}>
        {props.mode === "link" ? (
          <ProductImageGrid
            ariaLabel={ariaLabel}
            contentMode={contentMode}
            getHref={props.getHref}
            getItemLabel={getItemLabel}
            items={visibleItems}
            mode="link"
          />
        ) : (
          <ProductImageGrid
            ariaLabel={ariaLabel}
            contentMode={contentMode}
            getItemLabel={getItemLabel}
            items={visibleItems}
            mode="button"
            onItemActivate={props.onItemActivate}
            setItemRef={props.setItemRef}
          />
        )}
      </div>
    </div>
  );
}
