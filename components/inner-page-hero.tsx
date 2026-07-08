import Image from "next/image";
import { clsx } from "clsx";
import type { ReactNode } from "react";
import { Breadcrumb } from "@/components/breadcrumb";
import { Container } from "@/components/ui";
import type { NavigationItem } from "@/lib/types";

export function InnerPageHero({
  title,
  text,
  image,
  imageAlt,
  breadcrumb,
  children,
  className,
}: {
  title: string;
  text?: string | string[];
  image: string;
  imageAlt: string;
  breadcrumb?: NavigationItem[];
  children?: ReactNode;
  className?: string;
}) {
  const paragraphs = typeof text === "string" ? [text] : (text ?? []);

  return (
    <section className={clsx("inner-page-hero text-surface", className)}>
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="inner-page-hero__image object-cover"
      />
      <div className="inner-page-hero__overlay" aria-hidden="true" />
      <Container className="a3-container inner-page-hero__inner">
        {breadcrumb?.length ? (
          <div className="inner-page-hero__breadcrumb">
            <Breadcrumb items={breadcrumb} />
          </div>
        ) : null}
        <div className="inner-page-hero__copy">
          <h1 className="type-section inner-page-hero__title">{title}</h1>
          {paragraphs.length ? (
            <div className="inner-page-hero__text">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ) : null}
          {children}
        </div>
      </Container>
    </section>
  );
}
