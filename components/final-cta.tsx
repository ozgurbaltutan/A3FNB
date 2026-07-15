import Image from "next/image";
import { clsx } from "clsx";
import { Container, LinkButton } from "@/components/ui";

type FinalCtaLink = {
  label: string;
  href: string;
};

export function FinalCta({
  title,
  text,
  primary,
  secondary,
  image,
  imageAlt,
  tone = "teal",
  variant = "feature",
  id,
  className,
}: {
  title: string;
  text: string;
  primary: FinalCtaLink;
  secondary?: FinalCtaLink;
  image?: string;
  imageAlt?: string;
  tone?: "teal" | "ink";
  variant?: "feature" | "compact";
  id?: string;
  className?: string;
}) {
  if (variant === "compact") {
    return (
      <section className={clsx("product-detail-final-cta product-detail-final-cta--compact", className)} id={id}>
        <Container className="a3-container product-detail-final-cta__compact-inner">
          <div className="compact-cta-copy">
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <LinkButton href={primary.href} variant="light">{primary.label}</LinkButton>
        </Container>
      </section>
    );
  }

  return (
    <section
      className={clsx("final-cta-section product-detail-final-cta text-surface", tone === "ink" ? "bg-ink" : "bg-teal", className)}
      id={id}
    >
      <Container className="a3-container final-cta-shell grid items-center lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.62fr)]">
        <div className="final-cta-copy feature-cta-copy">
          <h2 className="type-section max-w-[620px] text-surface">{title}</h2>
          <p className="type-section-lead max-w-[760px] text-surface">{text}</p>
          <div className="feature-cta-copy__actions flex flex-col sm:flex-row">
            <LinkButton href={primary.href} variant="light">{primary.label}</LinkButton>
            {secondary ? <LinkButton href={secondary.href} variant="darkOutline">{secondary.label}</LinkButton> : null}
          </div>
        </div>
        {image ? (
          <div className="final-cta-media media-edge media-edge--dark">
            <Image className="object-cover" src={image} alt={imageAlt ?? ""} fill sizes="(min-width: 1024px) 520px, 100vw" />
          </div>
        ) : null}
      </Container>
    </section>
  );
}
