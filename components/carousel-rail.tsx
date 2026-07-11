"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode, type RefObject } from "react";

type CarouselRailState = {
  canScrollNext: boolean;
  canScrollPrevious: boolean;
};

type UseCarouselRailOptions = {
  itemCount: number;
};

type CarouselRailProps = {
  ariaLabel: string;
  children: ReactNode;
  className?: string;
  stageClassName?: string;
  viewportClassName?: string;
  trackClassName?: string;
  viewportRef: RefObject<HTMLDivElement | null>;
  onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
};

function clampScrollTarget(target: number, viewport: HTMLElement) {
  const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
  return Math.min(maxScroll, Math.max(0, target));
}

function getSnapPositions(viewport: HTMLElement) {
  const track = viewport.firstElementChild;
  if (!(track instanceof HTMLElement)) return [viewport.scrollLeft];

  const positions = Array.from(track.children)
    .filter((child): child is HTMLElement => child instanceof HTMLElement)
    .map((card) => clampScrollTarget(card.offsetLeft - track.offsetLeft, viewport));

  return positions.reduce<number[]>((uniquePositions, position) => {
    const previousPosition = uniquePositions.at(-1);
    if (previousPosition === undefined || Math.abs(previousPosition - position) > 1) {
      uniquePositions.push(position);
    }
    return uniquePositions;
  }, []);
}

function closestSnapIndex(positions: number[], scrollLeft: number) {
  return positions.reduce((closestIndex, position, index) => {
    return Math.abs(position - scrollLeft) < Math.abs(positions[closestIndex] - scrollLeft)
      ? index
      : closestIndex;
  }, 0);
}

export function useCarouselRail({ itemCount }: UseCarouselRailOptions) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const targetIndexRef = useRef<number | null>(null);
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [controls, setControls] = useState<CarouselRailState>({
    canScrollNext: true,
    canScrollPrevious: false,
  });

  const clearTarget = useCallback(() => {
    targetIndexRef.current = null;
    if (settleTimerRef.current) {
      clearTimeout(settleTimerRef.current);
      settleTimerRef.current = null;
    }
  }, []);

  const updateControls = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const snapPositions = getSnapPositions(viewport);
    const firstSnap = snapPositions[0] ?? 0;
    const lastSnap = snapPositions.at(-1) ?? 0;
    const scrollLeft = Math.max(0, viewport.scrollLeft);
    const targetIndex = targetIndexRef.current;
    const targetPosition = targetIndex === null ? null : snapPositions[targetIndex];
    const nextState = {
      canScrollNext: targetPosition === null ? scrollLeft < lastSnap - 2 : targetPosition < lastSnap - 1,
      canScrollPrevious: targetPosition === null ? scrollLeft > firstSnap + 2 : targetPosition > firstSnap + 1,
    };

    setControls((current) =>
      current.canScrollNext === nextState.canScrollNext && current.canScrollPrevious === nextState.canScrollPrevious
        ? current
        : nextState,
    );
  }, []);

  const scrollByDirection = useCallback((direction: "previous" | "next") => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const snapPositions = getSnapPositions(viewport);
    const currentIndex = targetIndexRef.current ?? closestSnapIndex(snapPositions, viewport.scrollLeft);
    const targetIndex = direction === "next"
      ? Math.min(snapPositions.length - 1, currentIndex + 1)
      : Math.max(0, currentIndex - 1);
    const target = snapPositions[targetIndex] ?? viewport.scrollLeft;

    if (Math.abs(target - viewport.scrollLeft) < 1) {
      clearTarget();
      updateControls();
      return;
    }

    targetIndexRef.current = targetIndex;
    updateControls();
    viewport.scrollTo({
      left: target,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });

    if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
    settleTimerRef.current = setTimeout(() => {
      targetIndexRef.current = null;
      settleTimerRef.current = null;
      updateControls();
    }, 520);
  }, [clearTarget, updateControls]);

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    scrollByDirection(event.key === "ArrowRight" ? "next" : "previous");
  }, [scrollByDirection]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = viewport?.firstElementChild;
    if (!viewport || !(track instanceof HTMLElement)) return undefined;

    const handleScroll = () => updateControls();
    const handleUserInput = () => {
      clearTarget();
      updateControls();
    };
    const resizeObserver = new ResizeObserver(updateControls);

    updateControls();
    viewport.addEventListener("scroll", handleScroll, { passive: true });
    viewport.addEventListener("pointerdown", handleUserInput, { passive: true });
    viewport.addEventListener("touchstart", handleUserInput, { passive: true });
    viewport.addEventListener("wheel", handleUserInput, { passive: true });
    resizeObserver.observe(viewport);
    resizeObserver.observe(track);

    return () => {
      clearTarget();
      viewport.removeEventListener("scroll", handleScroll);
      viewport.removeEventListener("pointerdown", handleUserInput);
      viewport.removeEventListener("touchstart", handleUserInput);
      viewport.removeEventListener("wheel", handleUserInput);
      resizeObserver.disconnect();
    };
  }, [clearTarget, itemCount, updateControls]);

  return {
    ...controls,
    handleKeyDown,
    scrollNext: () => scrollByDirection("next"),
    scrollPrevious: () => scrollByDirection("previous"),
    viewportRef,
  };
}

export function CarouselRail({
  ariaLabel,
  children,
  className = "",
  stageClassName = "",
  viewportClassName = "",
  trackClassName = "",
  viewportRef,
  onKeyDown,
}: CarouselRailProps) {
  return (
    <div className={className}>
      <div className={stageClassName}>
        <div
          aria-label={ariaLabel}
          className={viewportClassName}
          onKeyDown={onKeyDown}
          ref={viewportRef}
          role="region"
        >
          <div className={trackClassName}>{children}</div>
        </div>
      </div>
    </div>
  );
}
