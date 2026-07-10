"use client";

import { useEffect, useRef, useState } from "react";

type ParsedMetric = {
  prefix: string;
  target: number;
  suffix: string;
  decimals: number;
  useGrouping: boolean;
};

function parseMetric(value: string): ParsedMetric | null {
  const match = value.match(/^(.*?)(-?\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!match) return null;

  const numericToken = match[2];
  const target = Number(numericToken.replaceAll(",", ""));
  if (!Number.isFinite(target)) return null;

  return {
    prefix: match[1] ?? "",
    target,
    suffix: match[3] ?? "",
    decimals: numericToken.split(".")[1]?.length ?? 0,
    useGrouping: numericToken.includes(","),
  };
}

function formatMetricNumber(value: number, decimals: number, useGrouping: boolean) {
  return new Intl.NumberFormat("en-GB", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
    useGrouping,
  }).format(value);
}

export function CountUpMetric({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const parsed = parseMetric(value);
    if (!parsed) {
      setDisplayValue(value);
      return;
    }

    const node = ref.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let started = false;
    let observer: IntersectionObserver | null = null;

    const finalValue = `${parsed.prefix}${formatMetricNumber(parsed.target, parsed.decimals, parsed.useGrouping)}${parsed.suffix}`;

    if (reducedMotion.matches) {
      setDisplayValue(finalValue);
      return;
    }

    const animate = () => {
      const duration = 950;
      const start = performance.now();

      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        const animatedValue = parsed.decimals
          ? Number((parsed.target * eased).toFixed(parsed.decimals))
          : Math.round(parsed.target * eased);

        setDisplayValue(
          `${parsed.prefix}${formatMetricNumber(animatedValue, parsed.decimals, parsed.useGrouping)}${parsed.suffix}`,
        );

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
        if (!entry?.isIntersecting || started) return;

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

  return (
    <span aria-label={value} aria-live="off" ref={ref}>
      {displayValue}
    </span>
  );
}
