"use client";

import Image from "next/image";
import { ProcessAccordion } from "@/components/process-accordion";
import { Container } from "@/components/ui";

export type TradeProcessShowcaseItem = {
  id?: string;
  number?: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

type TradeProcessShowcaseProps = {
  id?: string;
  title: string;
  text: string;
  items: TradeProcessShowcaseItem[];
  className?: string;
};

export function TradeProcessShowcase({ id, title, text, items, className = "" }: TradeProcessShowcaseProps) {
  return (
    <section className={`home-section home-section--process trade-process-showcase ${className}`.trim()} id={id}>
      <Container className="a3-container">
        <div className="reveal reveal--up max-w-[871px] trade-process-showcase__intro">
          <h2 className="type-section text-ink">{title}</h2>
          <p className="type-section-lead mt-6 max-w-[871px] text-ink/80">{text}</p>
        </div>
        <ProcessAccordion
          ariaLabel={`${title} steps`}
          className="reveal reveal--up reveal-delay-2"
          presentation="showcase"
          items={items.map((item, index) => ({
            id: item.id ?? item.title,
            number: item.number ?? String(index + 1).padStart(2, "0"),
            title: item.title,
            description: item.description,
            media: (
              <Image
                alt={item.imageAlt}
                className="object-cover"
                fill
                priority={index === 0}
                sizes="(min-width: 1024px) 54vw, 100vw"
                src={item.image}
              />
            ),
          }))}
        />
      </Container>
    </section>
  );
}
