"use client";

import { clsx } from "clsx";
import { useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent, type ReactNode } from "react";

export type ProcessAccordionItem = {
  id: string;
  number: string;
  title: string;
  description: ReactNode;
  media?: ReactNode;
};

type ProcessAccordionProps = {
  ariaLabel: string;
  items: ProcessAccordionItem[];
  className?: string;
  presentation?: "accordion" | "stable" | "showcase";
  onActiveChange?: (activeId: string | null) => void;
};

type AccordionMode = "compact" | "desktop";

type AccordionSelection = {
  mode: AccordionMode;
  activeId: string | null;
};

const COMPACT_ACCORDION_QUERY = "(max-width: 1023px)";

function subscribeToAccordionBreakpoint(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(COMPACT_ACCORDION_QUERY);
  mediaQuery.addEventListener("change", onStoreChange);

  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getAccordionBreakpointSnapshot() {
  return window.matchMedia(COMPACT_ACCORDION_QUERY).matches;
}

function getAccordionBreakpointServerSnapshot() {
  return false;
}

function useCompactAccordion() {
  return useSyncExternalStore(
    subscribeToAccordionBreakpoint,
    getAccordionBreakpointSnapshot,
    getAccordionBreakpointServerSnapshot,
  );
}

export function ProcessAccordion({
  ariaLabel,
  items,
  className,
  presentation = "accordion",
  onActiveChange,
}: ProcessAccordionProps) {
  const generatedId = useId().replaceAll(":", "");
  const isCompact = useCompactAccordion();
  const mode: AccordionMode = presentation === "showcase" ? "desktop" : isCompact ? "compact" : "desktop";
  const firstItemId = items[0]?.id ?? null;
  const [selection, setSelection] = useState<AccordionSelection>({ mode: "desktop", activeId: firstItemId });
  const [lastOpenId, setLastOpenId] = useState<string | null>(firstItemId);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const panelRefs = useRef(new Map<string, HTMLDivElement>());
  const selectionIsValid =
    selection.activeId === null || items.some((item) => item.id === selection.activeId);
  const activeId =
    selection.mode === mode && selectionIsValid
      ? selection.activeId
      : isCompact
        ? null
        : firstItemId;

  useEffect(() => {
    onActiveChange?.(activeId);
  }, [activeId, onActiveChange]);

  function focusTrigger(index: number) {
    triggerRefs.current[index]?.focus();
  }

  function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (items.length === 0) return;

    let targetIndex: number | null = null;

    if (event.key === "ArrowDown") targetIndex = (index + 1) % items.length;
    if (event.key === "ArrowUp") targetIndex = (index - 1 + items.length) % items.length;
    if (event.key === "Home") targetIndex = 0;
    if (event.key === "End") targetIndex = items.length - 1;

    if (targetIndex === null) return;

    event.preventDefault();
    focusTrigger(targetIndex);
  }

  function handleToggle(itemId: string, index: number) {
    const nextActiveId = activeId === itemId ? null : itemId;

    if (nextActiveId === activeId) return;

    if (activeId) {
      const activePanel = panelRefs.current.get(activeId);

      if (activePanel?.contains(document.activeElement)) {
        const activeIndex = items.findIndex((item) => item.id === activeId);
        focusTrigger(activeIndex >= 0 ? activeIndex : index);
      }
    }

    setSelection({ mode, activeId: nextActiveId });
    if (nextActiveId) setLastOpenId(nextActiveId);
  }

  function renderAccordionItems(extraClassName?: string) {
    return (
      <div className={extraClassName}>
        {items.map((item, index) => {
          const isActive = activeId === item.id;
          const triggerId = `${generatedId}-${index + 1}-trigger`;
          const panelId = `${generatedId}-${index + 1}-panel`;

          return (
            <article className={clsx("process-accordion-item", isActive && "is-active")} key={item.id}>
              <h3 className="process-accordion-heading">
                <button
                  aria-controls={panelId}
                  aria-expanded={isActive}
                  className="process-accordion-trigger"
                  id={triggerId}
                  onClick={() => handleToggle(item.id, index)}
                  onKeyDown={(event) => handleTriggerKeyDown(event, index)}
                  ref={(node) => {
                    triggerRefs.current[index] = node;
                  }}
                  type="button"
                >
                  <span className="process-accordion-index">{item.number}</span>
                  <span className="process-accordion-title">{item.title}</span>
                  <span className="process-accordion-arrow" aria-hidden="true" />
                </button>
              </h3>
              <div
                aria-hidden={!isActive}
                aria-labelledby={triggerId}
                className="process-accordion-panel"
                id={panelId}
                inert={!isActive ? true : undefined}
                ref={(node) => {
                  if (node) panelRefs.current.set(item.id, node);
                  else panelRefs.current.delete(item.id);
                }}
                role="region"
              >
                <div className="process-accordion-panel__inner">
                  <p>{item.description}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    );
  }

  if (presentation === "showcase") {
    const visibleMediaId = activeId ?? lastOpenId ?? firstItemId;

    return (
      <div
        aria-label={ariaLabel}
        className={clsx("process-accordion process-accordion--showcase", className)}
        role="group"
      >
        {renderAccordionItems("process-showcase-list")}
        <div aria-live="polite" className="process-showcase-media media-edge">
          {items.map((item) => item.media ? (
            <div
              aria-hidden={visibleMediaId !== item.id}
              className={clsx("process-showcase-media__item", visibleMediaId === item.id && "is-active")}
              key={item.id}
            >
              {item.media}
            </div>
          ) : null)}
        </div>
      </div>
    );
  }

  if (presentation === "stable" && !isCompact) {
    const activeItem = items.find((item) => item.id === activeId) ?? null;

    return (
      <div aria-label={ariaLabel} className={clsx("process-accordion process-accordion--stable", className)} role="group">
        <div className="process-stable-triggers">
          {items.map((item, index) => {
            const isActive = activeId === item.id;
            const triggerId = `${generatedId}-${index + 1}-trigger`;
            const panelId = `${generatedId}-stable-panel`;

            return (
              <h3 className={clsx("process-accordion-heading", isActive && "is-active")} key={item.id}>
                <button
                  aria-controls={panelId}
                  aria-expanded={isActive}
                  className="process-accordion-trigger"
                  id={triggerId}
                  onClick={() => handleToggle(item.id, index)}
                  onKeyDown={(event) => handleTriggerKeyDown(event, index)}
                  ref={(node) => {
                    triggerRefs.current[index] = node;
                  }}
                  type="button"
                >
                  <span className="process-accordion-index">{item.number}</span>
                  <span className="process-accordion-title">{item.title}</span>
                  <span className="process-accordion-arrow" aria-hidden="true" />
                </button>
              </h3>
            );
          })}
        </div>
        <div
          aria-live="polite"
          className={clsx("process-stable-detail", activeItem && "is-visible")}
          id={`${generatedId}-stable-panel`}
          role="region"
        >
          <p key={activeItem?.id ?? "closed"}>{activeItem?.description ?? "Select a step to review its role in the trade route."}</p>
        </div>
      </div>
    );
  }

  return (
    <div aria-label={ariaLabel} className={clsx("process-accordion", className)} data-mode={mode} role="group">
      {renderAccordionItems()}
    </div>
  );
}
