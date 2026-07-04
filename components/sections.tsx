import Link from "next/link";
import { clsx } from "clsx";
import type { MarketRegion, NavigationItem, ProductFamily, ResourceItem, ServiceItem } from "@/lib/types";
import { Breadcrumb } from "@/components/breadcrumb";
import { Card, Container, Heading, LinkButton, Paragraph, PlaceholderVisual, Section } from "@/components/ui";

export function FullHeightHero({
  title,
  text,
  primary,
  secondary,
  backgroundVideo,
}: {
  title: string;
  text: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  backgroundVideo?: {
    src: string;
    label: string;
  };
}) {
  if (backgroundVideo) {
    return (
      <section className="relative min-h-[calc(100svh-var(--header-height))] overflow-hidden bg-deep-dark text-surface">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          aria-label={backgroundVideo.label}
        >
          <source src={backgroundVideo.src} type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-deep-dark opacity-80" aria-hidden="true" />
        <Container className="relative z-10 flex min-h-[calc(100svh-var(--header-height))] items-center py-20 sm:py-24">
          <div className="max-w-4xl">
            <Heading level={1} className="text-surface">
              {title}
            </Heading>
            <p className="type-p1 mt-7 max-w-3xl text-surface">
              {text}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <LinkButton href={primary.href} variant="light" size="large">
                {primary.label}
              </LinkButton>
              <LinkButton href={secondary.href} variant="darkOutline" size="large">
                {secondary.label}
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-paper">
      <Container className="grid min-h-[calc(100svh-var(--header-height))] items-center gap-10 py-16 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="max-w-4xl">
          <Heading level={1}>{title}</Heading>
          <Paragraph size="p1" className="mt-7 max-w-3xl">
            {text}
          </Paragraph>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <LinkButton href={primary.href} size="large">
              {primary.label}
            </LinkButton>
            <LinkButton href={secondary.href} variant="outline" size="large">
              {secondary.label}
            </LinkButton>
          </div>
        </div>
        <PlaceholderVisual
          label="Food sourcing documentation, product samples and shipment coordination materials"
          className="min-h-[440px]"
        />
      </Container>
    </section>
  );
}

export function PageHero({
  title,
  text,
  breadcrumb,
}: {
  title: string;
  text: string;
  breadcrumb: NavigationItem[];
}) {
  return (
    <section className="border-b border-border bg-paper">
      <Container className="py-16 lg:py-24">
        <Breadcrumb items={breadcrumb} />
        <div className="mt-8 max-w-4xl">
          <Heading level={1}>{title}</Heading>
          <Paragraph size="p1" className="mt-6">
            {text}
          </Paragraph>
        </div>
      </Container>
    </section>
  );
}

export function ProofStrip({ items }: { items: string[] }) {
  return (
    <section className="relative border-y border-border bg-deep-dark text-surface">
      <div className="absolute inset-x-0 top-0 h-1 bg-brand-blue" aria-hidden="true" />
      <Container className="grid gap-0 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((item) => (
          <div className="border-border py-5 sm:border-r sm:px-5 last:border-r-0" key={item}>
            <p className="type-p3 font-medium text-surface">{item}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}

export function SectionHeader({
  title,
  text,
  align = "left",
}: {
  title: string;
  text?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={clsx("mb-10 max-w-3xl", align === "center" && "mx-auto text-center")}>
      <Heading level={2}>{title}</Heading>
      {text ? (
        <Paragraph size="p1" className="mt-4">
          {text}
        </Paragraph>
      ) : null}
    </div>
  );
}

export function FeatureGrid({
  title,
  text,
  items,
  muted,
}: {
  title: string;
  text?: string;
  items: { title: string; description: string }[];
  muted?: boolean;
}) {
  return (
    <Section muted={muted}>
      <Container>
        <SectionHeader title={title} text={text} />
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <Card key={item.title}>
              <h3 className="card-title text-ink">{item.title}</h3>
              <Paragraph size="p3" className="mt-4">{item.description}</Paragraph>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function ProductGrid({
  title,
  text,
  products,
  compact = false,
  muted,
}: {
  title: string;
  text?: string;
  products: ProductFamily[];
  compact?: boolean;
  muted?: boolean;
}) {
  return (
    <Section muted={muted}>
      <Container>
        <SectionHeader title={title} text={text} />
        <div className={clsx("grid gap-4", compact ? "md:grid-cols-2 xl:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-3")}>
          {products.map((product) => (
            <Link
              key={product.id}
              href={product.featured ? `/en/products/${product.slug}` : `/en/products#${product.slug}`}
              className="premium-focus group block"
            >
              <Card
                id={product.featured ? undefined : product.slug}
                className={clsx(
                  "h-full transition duration-[var(--motion-base)] ease-[var(--ease-premium)] group-hover:-translate-y-1 group-hover:border-teal",
                  product.featured && "bg-surface",
                )}
              >
                {product.featured ? <div className="mb-5 h-1 w-16 bg-brand-blue" aria-hidden="true" /> : null}
                <div className="mb-5 h-28 rounded-[var(--radius-control)] border border-border bg-paper" role="img" aria-label={product.image.alt}>
                  <div className="h-full w-full placeholder-field" />
                </div>
                <h3 className="card-title text-ink">{product.title}</h3>
                <Paragraph size="p3" className="mt-3">{product.summary}</Paragraph>
                <p className="type-p3 mt-5 font-medium text-teal">{product.availabilityModel}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function ProcessSteps({
  title,
  text,
  steps,
  muted,
}: {
  title: string;
  text?: string;
  steps: { title: string; description: string }[];
  muted?: boolean;
}) {
  return (
    <Section muted={muted}>
      <Container>
        <SectionHeader title={title} text={text} />
        <div className="grid gap-4 md:grid-cols-5">
          {steps.map((step, index) => (
            <Card className="relative" key={step.title}>
              <span className="type-p3 text-brand-blue">0{index + 1}</span>
              <h3 className="card-title mt-4 text-ink">
                {step.title}
              </h3>
              <Paragraph size="p3" className="mt-4">{step.description}</Paragraph>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function SplitSection({
  title,
  text,
  points,
  visualLabel,
  reverse,
  muted,
}: {
  title: string;
  text: string;
  points?: string[];
  visualLabel: string;
  reverse?: boolean;
  muted?: boolean;
}) {
  return (
    <Section muted={muted}>
      <Container className={clsx("grid items-center gap-10 lg:grid-cols-2", reverse && "lg:[&>*:first-child]:order-2")}>
        <div>
          <Heading level={2}>{title}</Heading>
          <Paragraph size="p1" className="mt-5">
            {text}
          </Paragraph>
          {points ? (
            <ul className="mt-7 grid gap-3">
              {points.map((point) => (
                <li className="type-p2 border-l-2 border-teal pl-4" key={point}>
                  {point}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <PlaceholderVisual label={visualLabel} className="min-h-[360px]" />
      </Container>
    </Section>
  );
}

export function MapMetricsSection({
  title,
  text,
  regions,
  muted,
  dark,
}: {
  title: string;
  text: string;
  regions: MarketRegion[];
  muted?: boolean;
  dark?: boolean;
}) {
  return (
    <Section muted={muted} className={dark ? "bg-deep-dark text-surface" : undefined}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            {dark ? (
              <div className="mb-10 max-w-3xl">
                <Heading level={2} className="text-surface">{title}</Heading>
                <p className="type-p1 mt-4 text-surface">{text}</p>
              </div>
            ) : (
              <SectionHeader title={title} text={text} />
            )}
            {dark ? (
              <NetworkVisual label="Future-ready sourcing and market network visual" />
            ) : (
              <PlaceholderVisual label="Future-ready sourcing and market map placeholder" className="min-h-[360px] border-sage" />
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {regions.map((region) => (
              <Card key={region.id} className={dark ? "border-sage bg-deep-dark" : undefined}>
                <p className={clsx("type-p3 mb-3 font-medium capitalize", dark ? "text-brand-blue" : "text-teal")}>
                  {region.role.replace(/([A-Z])/g, " $1")}
                </p>
                <h3 className={clsx("card-title", dark ? "text-surface" : "text-ink")}>{region.title}</h3>
                <p className={clsx("card-copy mt-4", dark ? "text-surface" : undefined)}>{region.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function ResourceGrid({
  title,
  text,
  resources,
  muted,
}: {
  title: string;
  text?: string;
  resources: ResourceItem[];
  muted?: boolean;
}) {
  return (
    <Section muted={muted}>
      <Container>
        <SectionHeader title={title} text={text} />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <Card key={resource.id}>
              <p className="type-p3 mb-4 font-medium text-teal">{formatResourceType(resource.type)}</p>
              <h3 className="card-title text-ink">{resource.title}</h3>
              <Paragraph size="p3" className="mt-4">{resource.summary}</Paragraph>
              <p className="type-p3 mt-5">{resource.gated ? "Shared after inquiry where applicable." : "Available as public company information."}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function formatResourceType(type: ResourceItem["type"]) {
  const labels: Record<ResourceItem["type"], string> = {
    catalogue: "Catalogue",
    companyProfile: "Company Profile",
    specification: "Specification",
    marketNote: "Market Note",
    documentation: "Documentation",
  };

  return labels[type];
}

function NetworkVisual({ label }: { label: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="relative min-h-[360px] overflow-hidden rounded-[var(--radius-card)] border border-sage bg-deep-dark p-6"
    >
      <div className="absolute left-[12%] top-[24%] h-3 w-3 rounded-full bg-brand-blue" />
      <div className="absolute left-[42%] top-[38%] h-3 w-3 rounded-full bg-teal" />
      <div className="absolute right-[18%] top-[24%] h-3 w-3 rounded-full bg-sage" />
      <div className="absolute bottom-[24%] left-[30%] h-3 w-3 rounded-full bg-sage" />
      <div className="absolute bottom-[22%] right-[28%] h-3 w-3 rounded-full bg-brand-blue" />
      <div className="absolute left-[12%] right-[18%] top-[27%] h-px bg-sage" />
      <div className="absolute left-[30%] right-[28%] bottom-[25%] h-px bg-teal" />
      <div className="absolute left-[42%] top-[38%] h-[38%] w-px bg-sage" />
      <div className="absolute bottom-6 left-6 max-w-xs">
        <p className="type-p3 font-medium text-surface">Selected sourcing regions</p>
        <p className="type-p3 mt-2 text-surface">Origin, market experience and destination roles prepared for a future map layer.</p>
      </div>
    </div>
  );
}

export function ServiceGrid({
  title,
  text,
  services,
}: {
  title: string;
  text?: string;
  services: ServiceItem[];
}) {
  return (
    <Section>
      <Container>
        <SectionHeader title={title} text={text} />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card key={service.id}>
              <h3 className="card-title text-ink">{service.title}</h3>
              <Paragraph size="p3" className="mt-4">{service.description}</Paragraph>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function FilteredContentSection({
  title,
  text,
  items,
  muted,
}: {
  title: string;
  text?: string;
  items: { title: string; description: string }[];
  muted?: boolean;
}) {
  return (
    <FeatureGrid title={title} text={text} items={items} muted={muted} />
  );
}

export function MetricsSection({
  title,
  items,
}: {
  title: string;
  items: { value: string; label: string }[];
}) {
  return (
    <Section muted>
      <Container>
        <SectionHeader title={title} />
        <div className="grid gap-4 md:grid-cols-4">
          {items.map((item) => (
            <Card key={item.label}>
              <p className="type-metric text-teal">{item.value}</p>
              <p className="type-p3 mt-3">{item.label}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function Accordion({
  title,
  items,
}: {
  title: string;
  items: { title: string; description: string }[];
}) {
  return (
    <Section muted>
      <Container>
        <SectionHeader title={title} />
        <div className="grid gap-3">
          {items.map((item) => (
            <details className="rounded-[var(--radius-card)] border border-border bg-surface p-5" key={item.title}>
              <summary className="card-title cursor-pointer">{item.title}</summary>
              <Paragraph size="p3" className="mt-4">{item.description}</Paragraph>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function CTASection({
  title,
  text,
  primary,
  secondary,
}: {
  title: string;
  text?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="bg-deep-dark text-surface">
      <Container className="grid gap-8 py-16 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="max-w-3xl">
          <Heading level={2} className="text-surface">
            {title}
          </Heading>
          {text ? (
            <p className="type-p1 mt-4 text-surface">
              {text}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <LinkButton href={primary.href} variant="light">
            {primary.label}
          </LinkButton>
          {secondary ? (
            <LinkButton href={secondary.href} variant="darkOutline">
              {secondary.label}
            </LinkButton>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
