import Image from "next/image";
import { clsx } from "clsx";
import type { ReactNode } from "react";

type EditorialTone = "paper" | "surface" | "warm";
type EditorialLayout = "media-right" | "media-left" | "media-wide";

type EditorialMediaProps = {
  src: string;
  alt: string;
  priority?: boolean;
  position?: string;
  className?: string;
};

type EditorialSupportItem = {
  title: string;
  description: string;
};

export function EditorialSection({
  children,
  tone = "paper",
  className,
  innerClassName,
}: {
  children: ReactNode;
  tone?: EditorialTone;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <section className={clsx("editorial-section", `editorial-section--${tone}`, className)}>
      <div className={clsx("a3-container editorial-section__inner", innerClassName)}>
        {children}
      </div>
    </section>
  );
}

export function EditorialBridge({
  children,
  tone = "warm",
  className,
}: {
  children: ReactNode;
  tone?: EditorialTone;
  className?: string;
}) {
  return (
    <section className={clsx("editorial-bridge", `editorial-section--${tone}`, className)}>
      <div className="a3-container editorial-bridge__inner">
        {children}
      </div>
    </section>
  );
}

export function EditorialMedia({
  src,
  alt,
  priority = false,
  position,
  className,
}: EditorialMediaProps) {
  return (
    <figure className={clsx("editorial-media reveal reveal--fade", className)}>
      <span className="editorial-media__clip">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover"
          style={position ? { objectPosition: position } : undefined}
        />
      </span>
    </figure>
  );
}

export function EditorialCopy({
  title,
  text,
  supportItems,
  children,
  className,
}: {
  title: string;
  text: string | readonly string[];
  supportItems?: readonly EditorialSupportItem[];
  children?: ReactNode;
  className?: string;
}) {
  const paragraphs = Array.isArray(text) ? text : [text];

  return (
    <article className={clsx("editorial-copy reveal reveal--up", className)}>
      <h2>{title}</h2>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {supportItems?.length ? (
        <div className="editorial-support" aria-label="Supporting details">
          {supportItems.map((item) => (
            <section className="editorial-support__item" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </section>
          ))}
        </div>
      ) : null}
      {children}
    </article>
  );
}

export function EditorialLayout({
  children,
  layout = "media-right",
  className,
}: {
  children: ReactNode;
  layout?: EditorialLayout;
  className?: string;
}) {
  return (
    <div className={clsx("editorial-layout", `editorial-layout--${layout}`, className)}>
      {children}
    </div>
  );
}
