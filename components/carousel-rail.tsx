"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

type CarouselRailState = {
  canScrollNext: boolean;
  canScrollPrevious: boolean;
};

type UseCarouselRailOptions = {
  itemCount: number;
  duration?: number;
};

type CarouselRailProps = {
  ariaLabel: string;
  children: ReactNode;
  className?: string;
  stageClassName?: string;
  viewportClassName?: string;
  trackClassName?: string;
  viewportRef: RefObject<HTMLDivElement | null>;
};

const DEFAULT_SCROLL_DURATION = 580;

function cubicBezier(progress: number, x1: number, y1: number, x2: number, y2: number) {
  const sampleCurveX = (time: number) => ((1 - 3 * x2 + 3 * x1) * time + (3 * x2 - 6 * x1)) * time * time + 3 * x1 * time;
  const sampleCurveY = (time: number) => ((1 - 3 * y2 + 3 * y1) * time + (3 * y2 - 6 * y1)) * time * time + 3 * y1 * time;
  const sampleDerivativeX = (time: number) => (3 * (1 - 3 * x2 + 3 * x1) * time + 2 * (3 * x2 - 6 * x1)) * time + 3 * x1;

  let time = progress;

  for (let index = 0; index < 5; index += 1) {
    const currentX = sampleCurveX(time) - progress;
    const derivative = sampleDerivativeX(time);

    if (Math.abs(currentX) < 0.001 || Math.abs(derivative) < 0.001) {
      break;
    }

    time -= currentX / derivative;
  }

  return sampleCurveY(Math.min(1, Math.max(0, time)));
}

function railEase(progress: number) {
  return cubicBezier(progress, 0.25, 0.1, 0.25, 1);
}

function clampScrollTarget(target: number, viewport: HTMLElement) {
  const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);

  return Math.min(maxScroll, Math.max(0, target));
}

function getSnapPositions(viewport: HTMLElement, track: HTMLElement | null) {
  if (!track) {
    return [viewport.scrollLeft];
  }

  const cards = Array.from(track.children).filter((child): child is HTMLElement => child instanceof HTMLElement);

  return cards.map((card) => clampScrollTarget(card.offsetLeft - track.offsetLeft, viewport));
}

function closestSnapIndex(positions: number[], scrollLeft: number) {
  return positions.reduce((closestIndex, position, index) => {
    const currentDistance = Math.abs(position - scrollLeft);
    const closestDistance = Math.abs(positions[closestIndex] - scrollLeft);

    return currentDistance < closestDistance ? index : closestIndex;
  }, 0);
}

export function useCarouselRail({ itemCount, duration = DEFAULT_SCROLL_DURATION }: UseCarouselRailOptions) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const targetIndexRef = useRef<number | null>(null);
  const [controls, setControls] = useState<CarouselRailState>({
    canScrollNext: true,
    canScrollPrevious: false,
  });

  const cancelScrollAnimation = useCallback((resetTarget = true) => {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    if (viewportRef.current) {
      delete viewportRef.current.dataset.carouselAnimating;
    }

    if (resetTarget) {
      targetIndexRef.current = null;
    }
  }, []);

  const updateControls = useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const scrollLeft = Math.max(0, viewport.scrollLeft);
    const nextState = {
      canScrollNext: scrollLeft < maxScroll - 2,
      canScrollPrevious: scrollLeft > 2,
    };

    setControls((current) =>
      current.canScrollNext === nextState.canScrollNext && current.canScrollPrevious === nextState.canScrollPrevious
        ? current
        : nextState,
    );
  }, []);

  const scrollByDirection = useCallback(
    (direction: "previous" | "next") => {
      const viewport = viewportRef.current;
      const track = viewport?.firstElementChild instanceof HTMLElement ? viewport.firstElementChild : null;

      if (!viewport) {
        return;
      }

      const snapPositions = getSnapPositions(viewport, track);

      if (snapPositions.length === 0) {
        updateControls();
        return;
      }

      const start = viewport.scrollLeft;
      const currentIndex = targetIndexRef.current ?? closestSnapIndex(snapPositions, start);
      const targetIndex = direction === "next"
        ? Math.min(snapPositions.length - 1, currentIndex + 1)
        : Math.max(0, currentIndex - 1);
      const target = snapPositions[targetIndex] ?? start;

      if (frameRef.current !== null) {
        cancelScrollAnimation(false);
      }

      if (Math.abs(target - start) < 1) {
        targetIndexRef.current = null;
        updateControls();
        return;
      }

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reducedMotion) {
        viewport.scrollLeft = target;
        delete viewport.dataset.carouselAnimating;
        targetIndexRef.current = null;
        updateControls();
        return;
      }

      const startedAt = performance.now();
      targetIndexRef.current = targetIndex;
      viewport.dataset.carouselAnimating = "true";

      const tick = (now: number) => {
        const progress = Math.min(1, (now - startedAt) / duration);
        viewport.scrollLeft = start + (target - start) * railEase(progress);

        if (progress < 1) {
          frameRef.current = window.requestAnimationFrame(tick);
          return;
        }

        frameRef.current = null;
        viewport.scrollLeft = target;
        delete viewport.dataset.carouselAnimating;
        targetIndexRef.current = null;
        updateControls();
      };

      frameRef.current = window.requestAnimationFrame(tick);
    },
    [cancelScrollAnimation, duration, updateControls],
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = viewport?.firstElementChild instanceof HTMLElement ? viewport.firstElementChild : null;

    if (!viewport || !track) {
      return undefined;
    }

    updateControls();

    const interruptAnimation = () => cancelScrollAnimation();
    const resizeObserver = new ResizeObserver(updateControls);
    viewport.addEventListener("scroll", updateControls, { passive: true });
    viewport.addEventListener("pointerdown", interruptAnimation, { passive: true });
    viewport.addEventListener("touchstart", interruptAnimation, { passive: true });
    viewport.addEventListener("wheel", interruptAnimation, { passive: true });
    window.addEventListener("resize", updateControls);
    resizeObserver.observe(viewport);
    resizeObserver.observe(track);

    return () => {
      cancelScrollAnimation();
      viewport.removeEventListener("scroll", updateControls);
      viewport.removeEventListener("pointerdown", interruptAnimation);
      viewport.removeEventListener("touchstart", interruptAnimation);
      viewport.removeEventListener("wheel", interruptAnimation);
      window.removeEventListener("resize", updateControls);
      resizeObserver.disconnect();
    };
  }, [cancelScrollAnimation, itemCount, updateControls]);

  return {
    ...controls,
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
}: CarouselRailProps) {
  return (
    <div className={className}>
      <div className={stageClassName}>
        <div aria-label={ariaLabel} className={viewportClassName} ref={viewportRef} role="region">
          <div className={trackClassName}>{children}</div>
        </div>
      </div>
    </div>
  );
}
