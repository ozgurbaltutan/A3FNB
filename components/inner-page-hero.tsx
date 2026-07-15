import Image from "next/image";
import { clsx } from "clsx";
import type { ReactNode } from "react";
import { Breadcrumb } from "@/components/breadcrumb";
import { Container } from "@/components/ui";
import type { NavigationItem } from "@/lib/types";

export type PageHeroProps = {
  title: string;
  text?: string | string[];
  image?: string;
  imageAlt: string;
  breadcrumb?: NavigationItem[];
  children?: ReactNode;
  className?: string;
  id?: string;
  variant?: "overlay" | "product";
  productLayout?: "default" | "masthead" | "split";
};

export function PageHero({
  title,
  text,
  image,
  imageAlt,
  breadcrumb,
  children,
  className,
  id,
  variant = "overlay",
  productLayout = "default",
}: PageHeroProps) {
  const paragraphs = typeof text === "string" ? [text] : (text ?? []);

  if (variant === "product") {
    return (
      <section
        className={clsx(
          "page-hero page-hero--product product-detail-hero",
          productLayout === "masthead" && "product-detail-hero--masthead",
          productLayout === "split" && "product-detail-hero--split",
          className,
        )}
        id={id}
      >
        <Container className="a3-container product-detail-hero__inner">
          {breadcrumb?.length ? (
            <div className="product-detail-hero__breadcrumb">
              <Breadcrumb items={breadcrumb} />
            </div>
          ) : null}
          {image ? (
            <figure className="product-detail-hero__media">
              <Image src={image} alt={imageAlt} fill priority sizes="(min-width: 1024px) 1180px, 100vw" className="object-cover" />
            </figure>
          ) : null}
          <div className="page-hero__copy product-detail-hero__copy">
            <h1 className="type-hero product-detail-hero__title">{title}</h1>
            {paragraphs.length ? (
              <div className="page-hero__text type-hero-body product-detail-hero__text">
                {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            ) : null}
            {children}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className={clsx("page-hero page-hero--overlay inner-page-hero text-surface", className)} id={id}>
      {image ? <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="inner-page-hero__image object-cover" /> : null}
      <div className="inner-page-hero__overlay" aria-hidden="true" />
      <Container className="a3-container inner-page-hero__inner">
        {breadcrumb?.length ? (
          <div className="inner-page-hero__breadcrumb">
            <Breadcrumb items={breadcrumb} />
          </div>
        ) : null}
        <div className="page-hero__copy inner-page-hero__copy">
          <h1 className="type-section inner-page-hero__title">{title}</h1>
          {paragraphs.length ? (
            <div className="page-hero__text inner-page-hero__text">
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

export function InnerPageHero(props: Omit<PageHeroProps, "variant" | "productLayout"> & { image: string }) {
  return <PageHero {...props} variant="overlay" />;
}
