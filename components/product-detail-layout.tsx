"use client";

import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { clsx } from "clsx";
import { geoCentroid, geoNaturalEarth1, geoPath, type GeoPermissibleObjects } from "d3-geo";
import { feature } from "topojson-client";
import type { GeometryObject, Topology } from "topojson-specification";
import countriesAtlas from "world-atlas/countries-110m.json";
import { FilteredProductGrid } from "@/components/filtered-product-grid";
import { FinalCta } from "@/components/final-cta";
import { InnerPageHero, PageHero } from "@/components/inner-page-hero";
import { MetricBand } from "@/components/metric-band";
import { ProcessAccordion } from "@/components/process-accordion";
import { ProductCollection } from "@/components/product-collection";
import { TradeProcessShowcase } from "@/components/trade-process-showcase";
import { Container, LinkButton, SectionHeader } from "@/components/ui";
import { homeAssets } from "@/content/site";
import type { NavigationItem } from "@/lib/types";

type ProductDetailItem = {
  title: string;
  description: string;
};

type ProductDetailLink = {
  label: string;
  href: string;
  description?: string;
  image?: string;
  imageAlt?: string;
};

type ProductDetailHero = {
  title: string;
  text: string | string[];
  image?: string;
  imageAlt: string;
  note?: string;
  hideBreadcrumb?: boolean;
  variant?: "default" | "masthead" | "split" | "compact";
  cta?: ProductDetailLink;
};

type ProductDetailSection = {
  title: string;
  text?: string;
  items: ProductDetailItem[];
  image?: string;
  imageAlt?: string;
  variant?: "list" | "compact";
};

type ProductVisualItem = ProductDetailItem & {
  image: string;
  imageAlt: string;
};

type ProductSpecRow = {
  parameter: string;
  specification: string;
};

type ProductRangeOffering = {
  title: string;
  description: string;
  facts?: ProductSpecRow[];
  specs?: ProductSpecRow[];
  cta?: ProductDetailLink;
};

type ProductRangeGroup = {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  summary?: ProductSpecRow[];
  offerings: ProductRangeOffering[];
};

type ProductDecisionSummary = {
  lead?: string;
  facts?: ProductDetailItem[];
  points?: string[];
  supply?: string;
};

type ProductPortfolioItem = {
  id: string;
  title: string;
  cardTitle?: string;
  description: string;
  image: string;
  imageAlt: string;
  decisionSummary: ProductDecisionSummary;
  cta: ProductDetailLink;
};

type ProductPortfolio = {
  id?: string;
  title: string;
  text: string;
  cardTreatment?: "default" | "category-overlay";
  compactCardCopy?: boolean;
  showAllFilter?: boolean;
  groups?: {
    id: string;
    title: string;
    description?: string;
    itemIds: string[];
  }[];
  filters?: { id: string; label: string; itemIds: string[] }[];
  items: ProductPortfolioItem[];
};

type ProductTechnicalSpecProfile = {
  title: string;
  subtitle?: string;
  rows: ProductSpecRow[];
};

type ProductTechnicalSpecGroup = {
  id: string;
  title: string;
  text?: string;
  selectorLabel?: string;
  profiles: ProductTechnicalSpecProfile[];
};

type ProductSectionNavigationItem = {
  label: string;
  href: string;
};

type ProductDocumentItem = ProductDetailItem & {
  href?: string;
  linkLabel?: string;
};

type ProductOriginSection = {
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  facts: ProductDetailItem[];
  regions?: string[];
};

type ProductSupportSection = {
  title: string;
  text: string;
  image?: string;
  imageAlt?: string;
  steps: ProductDetailItem[];
  resource?: ProductDetailLink;
  variant?: "compact" | "media";
};

type ProductShipmentOptions = {
  id?: string;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  items: Array<ProductDetailItem & { image?: string; imageAlt?: string }>;
};

type ProductStorySection = {
  title: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
};

type ProductKeyFacts = {
  title: string;
  edition?: string;
  items: {
    value: string;
    label?: string;
    description: string;
  }[];
  sources?: ProductDetailLink[];
};

type ProductEditorialFacts = {
  title: string;
  text?: string;
  sources?: ProductDetailLink[];
  catalogue?: ProductDetailLink;
  items: Array<ProductDetailItem & {
    metric: string;
  }>;
};

type ProductFlowchart = {
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  resource?: ProductDetailLink;
};

type ProductOrigins = {
  title: string;
  text: string;
  mapVariant?: "brazil-pins" | "africa-pins";
  mapAriaLabel?: string;
  selectionAriaLabel?: string;
  focusLabel?: string;
  contextLabel?: string;
  regionsLabel?: string;
  items: Array<ProductDetailItem & {
    id: string;
    species: string;
    tradeContext: string;
    regions: string[];
    image: string;
    imageAlt: string;
    countryId?: string;
    point?: {
      x: number;
      y: number;
      labelX: number;
      labelY: number;
      labelAnchor?: "start" | "middle" | "end";
    };
  }>;
};

const METRIC_NUMBER_PATTERN = /\d+(?:\.\d+)?/g;

function formatAnimatedMetric(metric: string, progress: number) {
  return metric.replace(METRIC_NUMBER_PATTERN, (numberText) => {
    const decimalPlaces = numberText.includes(".") ? numberText.split(".")[1].length : 0;
    const target = Number(numberText);
    const current = target * progress;
    return decimalPlaces > 0 ? current.toFixed(decimalPlaces) : String(Math.round(current));
  });
}

function AnimatedMetric({ value }: { value: string }) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const hasAnimatedRef = useRef(false);
  const [displayValue, setDisplayValue] = useState(() => formatAnimatedMetric(value, 0));

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasAnimatedRef.current) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      hasAnimatedRef.current = true;
      setDisplayValue(value);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasAnimatedRef.current) return;

      hasAnimatedRef.current = true;
      observer.disconnect();
      const startedAt = performance.now();
      const duration = 1200;

      const animate = (timestamp: number) => {
        const linearProgress = Math.min((timestamp - startedAt) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - linearProgress, 3);
        setDisplayValue(formatAnimatedMetric(value, easedProgress));

        if (linearProgress < 1) {
          animationFrameRef.current = window.requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
          animationFrameRef.current = null;
        }
      };

      animationFrameRef.current = window.requestAnimationFrame(animate);
    }, { threshold: 0.35 });

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [value]);

  return (
    <p aria-label={value} className="product-editorial-facts__metric type-metric" data-final-metric={value}>
      <span aria-hidden="true" ref={elementRef}>{displayValue}</span>
    </p>
  );
}

const AFRICA_COUNTRY_IDS = new Set([
  "012", "024", "072", "108", "120", "132", "140", "148", "174", "178", "180", "204", "226", "231",
  "232", "262", "266", "270", "288", "324", "384", "404", "426", "430", "434", "450", "454", "466",
  "478", "480", "504", "508", "516", "562", "566", "624", "638", "646", "654", "678", "686", "690",
  "694", "706", "710", "716", "728", "729", "732", "748", "768", "788", "800", "818", "834", "854",
  "894",
]);
const ORIGIN_COUNTRY_TOPOLOGY = countriesAtlas as unknown as Topology;
const ORIGIN_COUNTRY_FEATURES = feature(
  ORIGIN_COUNTRY_TOPOLOGY,
  ORIGIN_COUNTRY_TOPOLOGY.objects.countries as GeometryObject,
) as {
  type: "FeatureCollection";
  features: Array<GeoPermissibleObjects & { id?: number | string }>;
};
const AFRICA_FEATURES = ORIGIN_COUNTRY_FEATURES.features.filter((country) =>
  AFRICA_COUNTRY_IDS.has(String(country.id).padStart(3, "0")),
);
const AFRICA_FEATURE_COLLECTION = {
  type: "FeatureCollection",
  features: AFRICA_FEATURES,
} as GeoPermissibleObjects;
const AFRICA_PROJECTION = geoNaturalEarth1().fitExtent(
  [[34, 24], [486, 496]],
  AFRICA_FEATURE_COLLECTION,
);
const AFRICA_PATH = geoPath(AFRICA_PROJECTION);
const AFRICA_LAND_PATH = AFRICA_PATH(AFRICA_FEATURE_COLLECTION) ?? "";
const AFRICA_LABEL_OFFSETS: Record<string, { x: number; y: number; anchor: "start" | "end" }> = {
  "120": { x: 42, y: 24, anchor: "start" },
  "288": { x: 34, y: -20, anchor: "start" },
  "384": { x: -36, y: 22, anchor: "end" },
  "430": { x: -42, y: 30, anchor: "end" },
  "566": { x: 42, y: -14, anchor: "start" },
  "694": { x: -42, y: -22, anchor: "end" },
  "768": { x: 38, y: 28, anchor: "start" },
};
const AFRICA_POINT_OFFSETS: Record<string, { x: number; y: number }> = {
  "288": { x: 0, y: -5 },
  "430": { x: 2, y: 5 },
  "694": { x: -2, y: -5 },
  "768": { x: 5, y: 6 },
};

type ProductServices = {
  title: string;
  text: string;
  items: ProductDetailItem[];
};

type ProductDetailProps = {
  pageTreatment?: "polished" | "surface-flow";
  cardAppearance?: "light" | "dark";
  breadcrumb: NavigationItem[];
  hero?: ProductDetailHero;
  intro?: {
    title: string;
    paragraphs: string[];
    note?: string;
  };
  storySections?: ProductStorySection[];
  afterSupportStorySections?: ProductStorySection[];
  keyFacts?: ProductKeyFacts;
  keyFactsPosition?: "before-portfolio" | "after-portfolio";
  editorialFacts?: ProductEditorialFacts;
  flowchart?: ProductFlowchart;
  origins?: ProductOrigins;
  originsPosition?: "before-portfolio" | "after-portfolio";
  services?: ProductServices;
  servicesPosition?: "before-shipment" | "after-shipment";
  sectionNavigation?: ProductSectionNavigationItem[];
  profiles?: {
    title: string;
    text: string;
    items: ProductVisualItem[];
  };
  productRange?: {
    title: string;
    text: string;
    variant?: "default" | "simple";
    groups: ProductRangeGroup[];
  };
  productPortfolio?: ProductPortfolio;
  technicalSpecs?: {
    title: string;
    text?: string;
    selectorLabel?: string;
    disclaimer?: string;
    catalogue?: ProductDetailLink;
    profiles?: ProductTechnicalSpecProfile[];
    groups?: ProductTechnicalSpecGroup[];
  };
  documents?: {
    title: string;
    text: string;
    items: ProductDocumentItem[];
  };
  origin?: ProductOriginSection;
  shipmentOptions?: ProductShipmentOptions;
  sections?: ProductDetailSection[];
  support?: ProductSupportSection;
  faq?: ProductDetailItem[];
  related?: ProductDetailLink[];
  finalCta: {
    title: string;
    text: string;
    primary: ProductDetailLink;
    secondary?: ProductDetailLink;
    image?: string;
    imageAlt?: string;
    tone?: "teal" | "ink";
    compact?: boolean;
    variant?: "default" | "compact-reminder";
  };
};

export function ProductDetailLayout({
  pageTreatment,
  cardAppearance = "light",
  breadcrumb,
  hero,
  intro,
  storySections,
  afterSupportStorySections,
  keyFacts,
  keyFactsPosition = "after-portfolio",
  editorialFacts,
  flowchart,
  origins,
  originsPosition = "before-portfolio",
  services,
  servicesPosition = "after-shipment",
  sectionNavigation,
  profiles,
  productRange,
  productPortfolio,
  technicalSpecs,
  documents,
  origin,
  shipmentOptions,
  sections = [],
  support,
  related,
  finalCta,
}: ProductDetailProps) {
  const useBuyerInformation = Boolean(technicalSpecs && (productRange || productPortfolio) && (sections.length || support));
  const storyHero = !hero && !productPortfolio ? storySections?.[0] : undefined;
  const leadingStorySections = productPortfolio ? [] : (storyHero ? (storySections?.slice(1) ?? []) : (storySections ?? []));
  const portfolioStorySections = productPortfolio ? (storySections ?? []) : [];

  const content = (
    <>
      {hero ? <ProductDetailHero hero={hero} breadcrumb={breadcrumb} /> : null}
      {sectionNavigation?.length ? <ProductSectionNavigation items={sectionNavigation} /> : null}
      {storyHero ? (
        <InnerPageHero
          title={storyHero.title}
          text={storyHero.paragraphs}
          image={storyHero.image}
          imageAlt={storyHero.imageAlt}
          breadcrumb={breadcrumb}
        />
      ) : null}
      {leadingStorySections.map((section, index) => (
        <ProductStory key={section.title} priority={index === 0} section={section} />
      ))}
      {intro ? <ProductIntro intro={intro} /> : null}
      {origins && originsPosition === "before-portfolio" ? <ProductOriginsSection origins={origins} /> : null}
      {keyFacts && keyFactsPosition === "before-portfolio" ? <ProductKeyFactsSection facts={keyFacts} /> : null}
      {productRange ? (
        <ProductRange profiles={productRange} />
      ) : profiles ? (
        <ProductProfiles profiles={profiles} />
      ) : null}
      {productPortfolio ? <ProductPortfolioSection appearance={cardAppearance} portfolio={productPortfolio} /> : null}
      {origins && originsPosition === "after-portfolio" ? <ProductOriginsSection origins={origins} /> : null}
      {keyFacts && keyFactsPosition === "after-portfolio" ? <ProductKeyFactsSection facts={keyFacts} /> : null}
      {editorialFacts ? <ProductEditorialFactsSection facts={editorialFacts} /> : null}
      {flowchart ? <ProductFlowchartSection flowchart={flowchart} /> : null}
      {documents ? <ProductDocuments documents={documents} /> : null}
      {portfolioStorySections.map((section, index) => (
        <ProductStory key={section.title} priority={index === 0} section={section} />
      ))}
      {technicalSpecs ? <ProductTechnicalSpecs specs={technicalSpecs} /> : null}
      {services && servicesPosition === "before-shipment" ? <ProductServicesSection services={services} /> : null}
      {shipmentOptions ? <ShipmentOptions options={shipmentOptions} /> : null}
      {services && servicesPosition === "after-shipment" ? <ProductServicesSection services={services} /> : null}
      {origin ? <ProductOrigin origin={origin} /> : null}
      {useBuyerInformation ? (
        <BuyerInformation sections={sections} support={support} />
      ) : (
        <>
          {sections.map((section) => (
            <ProductInfoSection key={section.title} section={section} />
          ))}
          {support ? <ProductSupport support={support} /> : null}
        </>
      )}
      {afterSupportStorySections?.map((section) => (
        <ProductStory key={section.title} section={section} />
      ))}
      {related?.length ? <RelatedProducts appearance={cardAppearance} links={related} /> : null}
      <ProductFinalCta cta={finalCta} />
    </>
  );

  return pageTreatment
    ? <div className={clsx("product-detail-layout", `product-detail-layout--${pageTreatment}`)}>{content}</div>
    : content;
}

function ProductKeyFactsSection({ facts }: { facts: ProductKeyFacts }) {
  return <MetricBand edition={facts.edition} id="market-context" items={facts.items} sources={facts.sources} title={facts.title} />;
}

function ProductEditorialFactsSection({ facts }: { facts: ProductEditorialFacts }) {
  return (
    <section className="product-detail-section product-editorial-facts" id="key-facts">
      <Container className="a3-container product-editorial-facts__inner">
        <SectionHeader className="product-section-heading" text={facts.text} title={facts.title} />
        <div className="product-editorial-facts__bento">
          {facts.items.map((item) => (
            <article className="product-editorial-facts__card surface-panel" key={item.title}>
              <div className="product-editorial-facts__content">
                <AnimatedMetric value={item.metric} />
                <h3 className="type-panel-title">{item.title}</h3>
                <p className="type-body">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
        {facts.sources?.length || facts.catalogue ? (
          <div className="product-editorial-facts__sources" aria-label={`${facts.title} sources`}>
            <div className="product-editorial-facts__source-list">
              {facts.sources?.length ? <span>Sources:</span> : null}
              {facts.sources?.map((source) => (
                <Link href={source.href} key={source.href} rel="noreferrer" target="_blank">
                  {source.label}
                </Link>
              ))}
            </div>
            {facts.catalogue ? (
              <Link className="product-editorial-facts__catalogue premium-focus" href={facts.catalogue.href} target="_blank">
                {facts.catalogue.label}
              </Link>
            ) : null}
          </div>
        ) : null}
      </Container>
    </section>
  );
}

function ProductFlowchartSection({ flowchart }: { flowchart: ProductFlowchart }) {
  return (
    <section className="product-detail-section product-flowchart" id="process-flowchart">
      <Container className="a3-container product-flowchart__inner">
        <div className="product-section-heading">
          <h2 className="type-section">{flowchart.title}</h2>
          <p className="type-section-lead">{flowchart.text}</p>
          {flowchart.resource ? (
            <LinkButton href={flowchart.resource.href} variant="outline">
              {flowchart.resource.label}
            </LinkButton>
          ) : null}
        </div>
        <figure className="product-flowchart__media media-edge">
          <Image alt={flowchart.imageAlt} fill sizes="(min-width: 1024px) 62vw, 100vw" src={flowchart.image} />
        </figure>
      </Container>
    </section>
  );
}

function ProductAfricaOriginsMap({
  activeOriginId,
  mapAriaLabel,
  origins,
  onSelect,
}: {
  activeOriginId: string;
  mapAriaLabel: string;
  origins: ProductOrigins;
  onSelect: (originId: string) => void;
}) {
  function handleCountryKeyDown(event: ReactKeyboardEvent<SVGGElement>, originId: string) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    onSelect(originId);
  }

  return (
    <svg aria-label={mapAriaLabel} className="product-origins__map" role="group" viewBox="0 0 520 520">
      <path className="product-origins__land" d={AFRICA_LAND_PATH} />
      {origins.items.map((item) => {
        if (!item.countryId) return null;
        const country = AFRICA_FEATURES.find(
          (featureItem) => String(featureItem.id).padStart(3, "0") === item.countryId,
        );
        if (!country) return null;
        const projectedPoint = AFRICA_PROJECTION(geoCentroid(country));
        if (!projectedPoint) return null;
        // Stable SVG attributes prevent tiny server/client floating-point differences during hydration.
        const pointOffset = AFRICA_POINT_OFFSETS[item.countryId] ?? { x: 0, y: 0 };
        const point = projectedPoint.map((coordinate, index) => Number(
          (coordinate + (index === 0 ? pointOffset.x : pointOffset.y)).toFixed(3),
        )) as [number, number];
        const offset = AFRICA_LABEL_OFFSETS[item.countryId] ?? { x: 30, y: -16, anchor: "start" as const };
        const selected = item.id === activeOriginId;
        return (
          <g
            aria-label={`Show ${item.title} cocoa origin information`}
            aria-pressed={selected}
            className={`product-origins__pin${selected ? " is-selected" : ""}`}
            key={item.id}
            onClick={() => onSelect(item.id)}
            onKeyDown={(event) => handleCountryKeyDown(event, item.id)}
            role="button"
            tabIndex={0}
          >
            <line x1={point[0]} x2={point[0] + offset.x} y1={point[1]} y2={point[1] + offset.y - 5} />
            <circle className="product-origins__pin-halo" cx={point[0]} cy={point[1]} r="11.5" />
            <circle className="product-origins__pin-dot" cx={point[0]} cy={point[1]} r="6.2" />
            <text textAnchor={offset.anchor} x={point[0] + offset.x} y={point[1] + offset.y}>{item.title}</text>
          </g>
        );
      })}
    </svg>
  );
}

function ProductOriginsSection({ origins }: { origins: ProductOrigins }) {
  const [activeOriginId, setActiveOriginId] = useState(origins.items[0]?.id ?? "");
  const activeOrigin = origins.items.find((item) => item.id === activeOriginId) ?? origins.items[0];

  if (!activeOrigin) return null;

  function handleMapKeyDown(event: ReactKeyboardEvent<SVGGElement>, originId: string) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    setActiveOriginId(originId);
  }

  return (
    <section
      className="product-detail-section product-origins"
      data-map-variant={origins.mapVariant ?? "brazil-pins"}
      id="origins"
    >
      <Container className="a3-container product-origins__inner">
        <div className="product-section-heading">
          <h2 className="type-section">{origins.title}</h2>
          <p className="type-section-lead">{origins.text}</p>
        </div>
        <div className="product-origins__showcase">
          <div className="product-origins__map-panel">
            {origins.mapVariant === "africa-pins" ? (
              <ProductAfricaOriginsMap
                activeOriginId={activeOrigin.id}
                mapAriaLabel={origins.mapAriaLabel ?? "Africa map with selected sourcing countries"}
                onSelect={setActiveOriginId}
                origins={origins}
              />
            ) : (
              <svg
              aria-label={origins.mapAriaLabel ?? "Brazil map with selected coffee sourcing states"}
              className="product-origins__map"
              role="img"
              viewBox="0 0 520 520"
            >
              <path
                className="product-origins__land"
                d="M270.784,485L267.753,477.59L272.555,471.415L266.258,462.606L257.678,455.489L246.422,447.293L242.368,447.681L231.388,437.867L224.304,439.215L238.866,422.073L251.224,410.024L258.544,404.988L267.753,398.206L267.989,388.445L262.519,381.435L257.088,383.775L259.213,376.787L260.708,369.649L260.708,363.051L256.773,360.885L252.68,362.828L248.626,362.302L247.327,357.692L246.304,346.808L244.258,343.263L236.898,340.065L232.411,342.383L220.88,340.125L221.588,324.184L218.361,317.687L221.785,315.284L220.723,308.661L223.753,303.587L225.681,294.51L223.084,287.376L217.141,284.157L215.96,279.646L217.574,273.044L196.597,272.581L192.386,259.359L195.574,259.167L195.456,254.285L193.291,250.998L192.819,244.474L186.483,241.142L179.595,241.257L175.069,237.986L167.67,235.763L163.381,231.588L151.141,229.731L139.255,219.723L140.16,212.253L138.822,207.978L139.964,199.651L125.677,201.529L119.892,205.702L110.328,210.199L107.888,213.572L102.26,213.817L94.153,212.874L87.974,214.797L83.015,213.515L83.724,196.629L74.75,203.164L65.108,202.882L60.976,196.967L53.734,196.329L56.056,191.567L49.956,184.847L45.43,174.907L48.303,172.892L48.303,168.23L54.915,165.043L53.813,159.104L56.607,155.272L57.394,150.16L69.91,142.694L78.843,140.578L80.3,138.927L90.178,139.446L95.098,109.429L95.334,104.691L93.641,98.417L88.801,94.439L88.84,86.482L94.98,84.687L97.183,85.816L97.538,81.634L91.162,80.505L91.005,73.657L112.296,73.898L115.917,70.139L118.947,73.601L121.112,80.061L123.159,78.71L129.18,84.484L137.681,83.781L139.806,80.431L147.914,77.877L152.44,76.082L153.699,71.454L161.491,68.343L160.901,66.047L151.652,65.102L150.118,58.211L150.59,50.87L145.67,48.032L147.717,47.012L155.824,48.422L164.522,51.167L167.67,48.57L175.542,46.864L187.742,42.763L191.756,38.585L190.3,35.483L196.007,35L198.526,37.527L197.109,42.336L200.887,44.006L203.366,49.09L200.336,52.965L198.604,62.268L201.399,67.806L202.186,72.879L208.916,78.007L214.307,78.543L215.488,76.396L218.951,75.934L223.91,74.009L227.452,71.102L233.513,72.028L236.15,71.639L242.093,72.528L243.077,70.306L241.266,68.121L242.368,64.954L246.776,65.936L251.932,64.806L258.19,67.121L262.952,69.38L266.336,66.417L268.776,66.88L270.272,69.954L275.506,69.177L279.717,65.028L283.063,56.951L289.517,46.938L293.256,46.418L295.972,52.483L302.072,71.62L307.936,73.416L308.211,80.968L300.025,89.98L303.41,93.273L322.734,94.975L323.127,105.949L331.431,98.769L345.167,102.692L363.349,109.373L368.662,115.779L366.891,121.835L379.603,118.464L400.856,124.261L417.189,123.835L433.364,132.898L447.335,145.182L455.758,148.339L465.085,148.785L469.06,152.242L472.76,166.236L474.57,172.91L470.241,191.174L464.652,198.393L449.264,213.855L442.298,226.473L434.19,236.2L431.475,236.409L428.405,244.684L429.192,265.864L426.162,283.42L424.981,290.988L421.518,295.523L419.589,310.977L408.491,326.184L406.641,338.308L397.786,343.423L395.228,350.542L383.342,350.501L366.144,355.07L358.469,360.379L346.229,363.882L333.36,373.438L324.111,385.44L322.498,394.538L324.308,401.302L322.301,413.776L319.821,419.857L312.147,426.73L300.025,448.975L290.422,459.118L282.984,465.163L277.986,477.524Z"
              />
              {origins.items.map((item) => {
                if (!item.point) return null;
                const selected = item.id === activeOrigin.id;
                return (
                  <g
                    aria-label={`Show ${item.title} origin information`}
                    aria-pressed={selected}
                    className={`product-origins__pin${selected ? " is-selected" : ""}`}
                    key={item.id}
                    onClick={() => setActiveOriginId(item.id)}
                    onKeyDown={(event) => handleMapKeyDown(event, item.id)}
                    role="button"
                    tabIndex={0}
                  >
                    <line x1={item.point.x} x2={item.point.labelX} y1={item.point.y} y2={item.point.labelY - 6} />
                    <circle className="product-origins__pin-halo" cx={item.point.x} cy={item.point.y} r="11.5" />
                    <circle className="product-origins__pin-dot" cx={item.point.x} cy={item.point.y} r="6.2" />
                    <text textAnchor={item.point.labelAnchor ?? "start"} x={item.point.labelX} y={item.point.labelY}>{item.title}</text>
                  </g>
                );
              })}
              </svg>
            )}
          </div>

          <article aria-live="polite" className="product-origins__detail">
            <figure className="product-origins__detail-media media-edge">
              <Image
                alt={activeOrigin.imageAlt}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                src={activeOrigin.image}
              />
            </figure>
            <div className="product-origins__detail-copy-stack">
              {origins.items.map((item) => {
                const selected = item.id === activeOrigin.id;
                return (
                  <div
                    aria-hidden={!selected}
                    className={clsx("product-origins__detail-content", selected && "is-active")}
                    key={item.id}
                  >
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <dl className="product-origins__facts">
                      <div>
                        <dt>{origins.focusLabel ?? "Coffee focus"}</dt>
                        <dd>{item.species}</dd>
                      </div>
                      <div>
                        <dt>{origins.contextLabel ?? "Trade context"}</dt>
                        <dd>{item.tradeContext}</dd>
                      </div>
                    </dl>
                    <div className="product-origins__selected-label">{origins.regionsLabel ?? "Selected origins"}</div>
                    <ul>{item.regions.map((region) => <li key={region}>{region}</li>)}</ul>
                  </div>
                );
              })}
            </div>
          </article>
        </div>
        <div aria-label={origins.selectionAriaLabel ?? "Select a Brazilian coffee origin"} className="product-origins__tabs">
          {origins.items.map((item) => (
            <button
              aria-pressed={item.id === activeOrigin.id}
              className="premium-focus"
              data-active={item.id === activeOrigin.id}
              key={item.id}
              onClick={() => setActiveOriginId(item.id)}
              type="button"
            >
              {item.title}
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProductServicesSection({ services }: { services: ProductServices }) {
  return (
    <section className="product-detail-section product-services" id="services">
      <Container className="a3-container product-services__inner">
        <div className="product-section-heading">
          <h2 className="type-section">{services.title}</h2>
          <p className="type-section-lead">{services.text}</p>
        </div>
        <div className="product-services__grid">
          {services.items.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProductSectionNavigation({ items }: { items: ProductSectionNavigationItem[] }) {
  return (
    <nav aria-label="On this product page" className="product-section-nav">
      <Container className="a3-container product-section-nav__inner">
        <div className="product-section-nav__links">
          {items.map((item) => (
            <a
              className="premium-focus type-nav"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>
      </Container>
    </nav>
  );
}

function ProductStory({
  section,
  priority = false,
}: {
  section: ProductStorySection;
  priority?: boolean;
}) {
  const media = (
    <figure className="product-detail-story__media media-edge">
      <Image
        src={section.image}
        alt={section.imageAlt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 42vw, 100vw"
        className="object-cover"
      />
    </figure>
  );

  const copy = (
    <div className="product-detail-story__copy">
      <h2 className="type-section">{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );

  return (
    <section className="product-detail-section product-detail-story">
      <Container className={clsx("a3-container product-detail-story__inner", section.imagePosition === "left" && "is-reversed")}>
        {section.imagePosition === "left" ? media : copy}
        {section.imagePosition === "left" ? copy : media}
      </Container>
    </section>
  );
}

function ProductDetailHero({
  hero,
  breadcrumb,
}: {
  hero: ProductDetailHero;
  breadcrumb: NavigationItem[];
}) {
  const paragraphs = Array.isArray(hero.text) ? hero.text : [hero.text];

  if (hero.variant === "compact") {
    return (
      <InnerPageHero
        title={hero.title}
        text={paragraphs}
        image={hero.image ?? homeAssets.media.companyFoodFeastEditorial}
        imageAlt={hero.imageAlt}
        breadcrumb={hero.hideBreadcrumb ? undefined : breadcrumb}
        className="product-detail-opening"
        id="overview"
      >
        {hero.note ? <p className="product-detail-note inner-page-hero__note">{hero.note}</p> : null}
      </InnerPageHero>
    );
  }

  return (
    <PageHero
      breadcrumb={hero.hideBreadcrumb ? undefined : breadcrumb}
      image={hero.image}
      imageAlt={hero.imageAlt}
      productLayout={hero.variant === "masthead" || hero.variant === "split" ? hero.variant : "default"}
      text={paragraphs}
      title={hero.title}
      variant="product"
    >
      {hero.note ? <p className="product-detail-note">{hero.note}</p> : null}
      {hero.cta ? (
        <LinkButton href={hero.cta.href} variant="primary" className="product-detail-hero__cta">
          {hero.cta.label}
        </LinkButton>
      ) : null}
    </PageHero>
  );
}

function ProductIntro({ intro }: { intro: NonNullable<ProductDetailProps["intro"]> }) {
  return (
    <section className="product-detail-intro">
      <Container className="a3-container product-detail-intro__inner">
        <h2 className="type-section">{intro.title}</h2>
        <div className="product-detail-intro__copy">
          {intro.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {intro.note ? <p className="product-detail-note">{intro.note}</p> : null}
        </div>
      </Container>
    </section>
  );
}

function ProductRange({ profiles }: { profiles: NonNullable<ProductDetailProps["productRange"]> }) {
  if (profiles.variant === "simple") {
    return <ProductRangeSimple profiles={profiles} />;
  }

  return (
    <section className="product-detail-section product-range-section" id="range">
      <Container className="a3-container product-range-section__inner">
        <div className="product-detail-section__header product-range-section__header">
          <h2 className="type-section">{profiles.title}</h2>
          <p className="type-section-lead">{profiles.text}</p>
        </div>
        <div className="product-range-groups">
          {profiles.groups.map((group) => (
            <article className="product-range-group" key={group.title}>
              <aside className="product-range-group__header">
                {group.image ? (
                  <figure className="product-range-group__media">
                    <Image
                      src={group.image}
                      alt={group.imageAlt ?? ""}
                      fill
                      sizes="(min-width: 1024px) 320px, 100vw"
                      className="object-cover"
                    />
                  </figure>
                ) : null}
                <div className="product-range-group__copy">
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                </div>
                {group.summary?.length ? <ProductRangeMeta className="product-range-group__meta" rows={group.summary} /> : null}
              </aside>
              <div className="product-range-offerings">
                {group.offerings.map((offering) => (
                  <article className="product-range-offering" key={offering.title}>
                    <div className="product-range-offering__copy">
                      <h4>{offering.title}</h4>
                      <p>{offering.description}</p>
                    </div>
                    {offering.facts?.length ? <ProductRangeMeta className="product-range-offering__meta" rows={offering.facts.slice(0, 2)} /> : null}
                    {offering.cta ? (
                      <Link className="product-range-offering__link premium-focus" href={offering.cta.href}>
                        {offering.cta.label}
                      </Link>
                    ) : null}
                  </article>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProductRangeSimple({ profiles }: { profiles: NonNullable<ProductDetailProps["productRange"]> }) {
  return (
    <section className="product-detail-section product-range-section product-range-section--simple" id="range">
      <Container className="a3-container product-range-section__inner">
        <div className="product-detail-section__header product-range-section__header">
          <h2 className="type-section">{profiles.title}</h2>
          <p className="type-section-lead">{profiles.text}</p>
        </div>
        <div className="product-range-simple" role="table" aria-label={profiles.title}>
          <div className="product-range-simple__head" role="row">
            <span role="columnheader">Product</span>
            <span role="columnheader">Source</span>
            <span role="columnheader">Fit</span>
          </div>
          {profiles.groups.map((group) => {
            const source =
              findSpecValue(group.summary, "Source") ??
              findSpecValue(group.summary, "Origin") ??
              group.title;

            return (
              <div className="product-range-simple__group" key={group.title}>
                <div className="product-range-simple__group-title">{group.title}</div>
                {group.offerings.map((offering) => (
                  <div className="product-range-simple__row" role="row" key={offering.title}>
                    <strong role="cell">{offering.title}</strong>
                    <span role="cell">{source}</span>
                    <span role="cell">
                      {findSpecValue(offering.facts, "Common fit") ??
                        findSpecValue(offering.facts, "Applications") ??
                        offering.description}
                    </span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function getProductPortfolioModalId(itemId: string) {
  return `product-portfolio-modal-${itemId}`;
}

function ProductPortfolioSection({
  appearance,
  portfolio,
}: {
  appearance: "light" | "dark";
  portfolio: ProductPortfolio;
}) {
  const [activePortfolioItemId, setActivePortfolioItemId] = useState<string | null>(null);
  const modalTriggerRefs = useRef<Record<string, HTMLElement | null>>({});
  const activePortfolioItem = portfolio.items.find((item) => item.id === activePortfolioItemId) ?? null;
  const filterGroups = (portfolio.filters ?? portfolio.groups?.map((group) => ({
    id: group.id,
    label: group.title,
    itemIds: group.itemIds,
  })) ?? []);

  useEffect(() => {
    if (!activePortfolioItem) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
    };
  }, [activePortfolioItem]);

  function closePortfolioModal() {
    const itemId = activePortfolioItemId;
    setActivePortfolioItemId(null);

    window.setTimeout(() => {
      if (itemId) modalTriggerRefs.current[itemId]?.focus();
    }, 0);
  }

  function openPortfolioModal(itemId: string) {
    setActivePortfolioItemId(itemId);
  }

  return (
    <section
      className={clsx(
        "product-detail-section product-portfolio-section",
        portfolio.cardTreatment === "category-overlay" && "product-portfolio-section--category-overlay",
        portfolio.compactCardCopy && "product-portfolio-section--compact-card-copy",
      )}
      id={portfolio.id ?? "range"}
    >
      <Container className="a3-container product-portfolio-section__inner">
        <ProductCollection
          headerClassName="product-portfolio-section__header"
          title={portfolio.title}
          text={portfolio.text}
        >
          <FilteredProductGrid
            activeItemId={activePortfolioItemId}
            appearance={appearance}
            ariaLabel={`${portfolio.title} products`}
            getDialogId={(item) => getProductPortfolioModalId(item.id)}
            getItemLabel={(item) => `View commercial details for ${item.title}`}
            groups={filterGroups}
            includeAllFilter={portfolio.showAllFilter ?? true}
            items={portfolio.items}
            mode="button"
            treatment={portfolio.cardTreatment ?? "default"}
            onItemActivate={(item) => openPortfolioModal(item.id)}
            setItemRef={(id, node) => {
              modalTriggerRefs.current[id] = node;
            }}
          />
        </ProductCollection>
        {activePortfolioItem ? (
          <ProductPortfolioModal
            product={activePortfolioItem}
            onClose={closePortfolioModal}
          />
        ) : null}
      </Container>
    </section>
  );
}

function ProductPortfolioModal({
  product,
  onClose,
}: {
  product: ProductPortfolioItem;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const modalId = getProductPortfolioModalId(product.id);
  const titleId = `${modalId}-title`;
  const descriptionId = `${titleId}-description`;
  const modalDescription = product.decisionSummary.lead || product.description;

  useEffect(() => {
    titleRef.current?.focus();
  }, [product.id]);

  useEffect(() => () => {
    if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
  }, []);

  function requestClose() {
    if (isClosing) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onClose();
      return;
    }

    setIsClosing(true);
    closeTimerRef.current = window.setTimeout(onClose, 180);
  }

  function handleDialogKeyDown(event: ReactKeyboardEvent<HTMLElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      requestClose();
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = Array.from(
      panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ) ?? [],
    ).filter((element) => !element.hasAttribute("hidden") && element.getAttribute("aria-hidden") !== "true");

    if (!focusable.length) {
      event.preventDefault();
      return;
    }

    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];

    if (event.shiftKey && (document.activeElement === firstFocusable || document.activeElement === titleRef.current)) {
      event.preventDefault();
      lastFocusable.focus();
    } else if (!event.shiftKey && document.activeElement === lastFocusable) {
      event.preventDefault();
      firstFocusable.focus();
    }
  }

  return (
    <div
      className={clsx("product-info-modal product-info-modal--portfolio", isClosing && "is-closing")}
      onClick={requestClose}
      role="presentation"
    >
      <section
        aria-describedby={modalDescription ? descriptionId : undefined}
        aria-labelledby={titleId}
        aria-modal="true"
        className="product-info-modal__panel product-info-modal__panel--decision"
        id={modalId}
        onClick={(event) => event.stopPropagation()}
        onKeyDown={handleDialogKeyDown}
        ref={panelRef}
        role="dialog"
      >
        <header className="product-info-modal__decision-header">
          <div className="product-info-modal__decision-heading">
            <h2 id={titleId} ref={titleRef} tabIndex={-1}>{product.title}</h2>
            {modalDescription ? <p id={descriptionId}>{modalDescription}</p> : null}
          </div>
          <button
            aria-label="Close product details"
            className="product-info-modal__close premium-focus"
            onClick={requestClose}
            ref={closeButtonRef}
            type="button"
          />
        </header>

        <div className="product-info-modal__decision-body">
          {product.decisionSummary.facts?.length ? (
            <section className="product-info-modal__decision-section product-info-modal__decision-glance">
              <h3>At a glance</h3>
              <dl className="product-info-modal__decision-attributes">
                {product.decisionSummary.facts.map((detail) => (
                  <div key={detail.title}>
                    <dt>{detail.title}</dt>
                    <dd>{detail.description}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}

          {product.decisionSummary.points?.length ? (
            <section className="product-info-modal__decision-section product-info-modal__decision-points">
              <h3>Key considerations</h3>
              <ul>{product.decisionSummary.points.map((point) => <li key={point}>{point}</li>)}</ul>
            </section>
          ) : null}

          {product.decisionSummary.supply ? (
            <section className="product-info-modal__decision-section product-info-modal__decision-supply">
              <h3>Supply</h3>
              <p>{product.decisionSummary.supply}</p>
            </section>
          ) : null}
        </div>

        <footer className="product-info-modal__decision-actions">
          <LinkButton href={product.cta.href} variant="primary">
            Request a quote
            <span className="product-info-modal__visually-hidden"> for {product.title}</span>
          </LinkButton>
        </footer>
      </section>
    </div>
  );
}

function findSpecValue(rows: ProductSpecRow[] | undefined, parameter: string) {
  return rows?.find((row) => row.parameter.toLowerCase() === parameter.toLowerCase())?.specification;
}

function ProductRangeMeta({ rows, className }: { rows: ProductSpecRow[]; className?: string }) {
  return (
    <dl className={clsx("product-range-meta", className)}>
      {rows.map((row) => (
        <div className="product-range-meta__row" key={row.parameter}>
          <dt>{row.parameter}</dt>
          <dd>{row.specification}</dd>
        </div>
      ))}
    </dl>
  );
}

function ProductTechnicalSpecs({ specs }: { specs: NonNullable<ProductDetailProps["technicalSpecs"]> }) {
  const groups: ProductTechnicalSpecGroup[] = specs.groups?.length
    ? specs.groups
    : [{ id: "all-products", title: specs.title, selectorLabel: specs.selectorLabel, profiles: specs.profiles ?? [] }];
  const [activeGroupId, setActiveGroupId] = useState(groups[0]?.id ?? "");
  const activeGroup = groups.find((group) => group.id === activeGroupId) ?? groups[0];

  return (
    <section className="product-detail-section product-technical-specs" id="technical-specifications">
      <Container className="a3-container product-technical-specs__inner">
        <SectionHeader className="product-detail-section__header" text={specs.text} title={specs.title} />
        {groups.length > 1 ? (
          <div aria-label="Specification groups" className="product-filter-tabs product-technical-specs__tabs" role="tablist">
            {groups.map((group) => (
              <button
                aria-controls={`technical-panel-${group.id}`}
                aria-selected={activeGroup?.id === group.id}
                className="product-filter-tab premium-focus"
                data-active={activeGroup?.id === group.id}
                key={group.id}
                onClick={() => setActiveGroupId(group.id)}
                role="tab"
                type="button"
              >
                {group.title}
              </button>
            ))}
          </div>
        ) : null}
        {activeGroup ? (
          <div className="product-technical-specs__groups" id={`technical-panel-${activeGroup.id}`} role={groups.length > 1 ? "tabpanel" : undefined}>
            <ProductTechnicalSpecMatrix group={activeGroup} />
          </div>
        ) : null}
        {specs.disclaimer || specs.catalogue ? (
          <footer className="product-technical-specs__footer">
            {specs.disclaimer ? <p className="product-technical-specs__disclaimer">{specs.disclaimer}</p> : null}
            {specs.catalogue ? (
              <Link className="product-technical-specs__catalogue premium-focus" href={specs.catalogue.href} target="_blank">
                {specs.catalogue.label}
              </Link>
            ) : null}
          </footer>
        ) : null}
      </Container>
    </section>
  );
}

function ProductTechnicalSpecMatrix({ group }: { group: ProductTechnicalSpecGroup }) {
  const parameters = Array.from(new Set(group.profiles.flatMap((profile) => profile.rows.map((row) => row.parameter))));
  const [activeProfileTitle, setActiveProfileTitle] = useState(group.profiles[0]?.title ?? "");
  const activeProfile = group.profiles.find((profile) => profile.title === activeProfileTitle) ?? group.profiles[0];
  const selectorId = `mobile-technical-profile-${group.id}`;

  if (!group.profiles.length) return null;

  return (
    <section aria-label={group.title} className="product-technical-specs__group">
      {group.text ? <p className="product-technical-specs__group-note" id={`technical-group-${group.id}`}>{group.text}</p> : null}
      <div className="product-technical-specs__matrix">
        <table>
          <caption>{group.title}</caption>
          <thead>
            <tr>
              <th scope="col">Parameter</th>
              {group.profiles.map((profile) => (
                <th scope="col" key={profile.title}>
                  {profile.title}
                  {profile.subtitle ? <small>{profile.subtitle}</small> : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {parameters.map((parameter) => (
              <tr key={parameter}>
                <th scope="row">{parameter}</th>
                {group.profiles.map((profile) => {
                  const value = profile.rows.find((row) => row.parameter === parameter)?.specification ?? "—";
                  return <td key={`${profile.title}-${parameter}`}>{value}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="product-technical-specs__cards">
        <label htmlFor={selectorId}>{group.selectorLabel ?? `Select a ${group.title.toLowerCase()} product`}</label>
        <select id={selectorId} onChange={(event) => setActiveProfileTitle(event.target.value)} value={activeProfileTitle}>
          {group.profiles.map((profile) => (
            <option key={profile.title} value={profile.title}>{profile.title}</option>
          ))}
        </select>
        {activeProfile ? (
          <article>
            <h3>
              {activeProfile.title}
              {activeProfile.subtitle ? <span>{activeProfile.subtitle}</span> : null}
            </h3>
            <ProductSpecTable rows={activeProfile.rows} />
          </article>
        ) : null}
      </div>
    </section>
  );
}

function ShipmentOptions({ options }: { options: ProductShipmentOptions }) {
  return (
    <TradeProcessShowcase
      className="shipment-options-section"
      id={options.id ?? "shipment-options"}
      title={options.title}
      text={options.text}
      items={options.items.map((item, index) => ({
        id: item.title,
        number: String(index + 1).padStart(2, "0"),
        title: item.title,
        description: item.description,
        image: item.image ?? options.image,
        imageAlt: item.imageAlt ?? options.imageAlt,
      }))}
    />
  );
}

function ProductProfiles({ profiles }: { profiles: NonNullable<ProductDetailProps["profiles"]> }) {
  return (
    <section className="product-detail-section product-detail-profiles">
      <Container className="a3-container">
        <div className="product-detail-section__header">
          <h2 className="type-section">{profiles.title}</h2>
          <p className="type-section-lead">{profiles.text}</p>
        </div>
        <div className="product-profile-list">
          {profiles.items.map((item) => (
            <article className="product-profile-row" key={item.title}>
              <div className="product-profile-row__media">
                <Image src={item.image} alt={item.imageAlt} fill sizes="(min-width: 1024px) 280px, 100vw" className="object-cover" />
              </div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProductSpecTable({ rows, className }: { rows: ProductSpecRow[]; className?: string }) {
  return (
    <div className={clsx("product-spec-table", className)} role="table">
      {rows.map((row) => (
        <div className="product-spec-table__row" key={row.parameter} role="row">
          <span role="rowheader">{row.parameter}</span>
          <strong role="cell">{row.specification}</strong>
        </div>
      ))}
    </div>
  );
}

function ProductOrigin({ origin }: { origin: ProductOriginSection }) {
  return (
    <section className="product-detail-section product-detail-origin">
      <Container className="a3-container product-detail-origin__inner">
        <div className="product-detail-origin__copy">
          <h2 className="type-section">{origin.title}</h2>
          <p className="type-section-lead">{origin.text}</p>
          <div className="product-detail-origin__facts">
            {origin.facts.map((fact) => (
              <article key={fact.title}>
                <h3>{fact.title}</h3>
                <p>{fact.description}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="product-detail-origin__visual">
          <div className="product-detail-origin__media">
            <Image src={origin.image} alt={origin.imageAlt} fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProductInfoSection({ section }: { section: ProductDetailSection }) {
  return (
    <section className={clsx("product-detail-section", section.variant === "compact" && "product-detail-section--compact")}>
      <Container className="a3-container product-detail-editorial">
        {section.image ? (
          <figure className="product-detail-editorial__media">
            <Image
              src={section.image}
              alt={section.imageAlt ?? ""}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </figure>
        ) : null}
        <div className="product-detail-editorial__copy">
          <h2 className="type-section">{section.title}</h2>
          {section.text ? <p className="type-section-lead">{section.text}</p> : null}
          <div className="product-detail-checklist">
            {section.items.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function BuyerInformation({
  sections,
  support,
}: {
  sections: ProductDetailSection[];
  support?: ProductSupportSection;
}) {
  const requirement = sections[0];

  return (
    <section className="product-detail-section product-buyer-info" id="documents">
      <Container className="a3-container product-buyer-info__inner">
        <div className="product-buyer-info__intro">
          <h2 className="type-section">Commercial review</h2>
          <p className="type-section-lead">
            A3 reviews supply, documents and route before moving a requirement toward quotation.
          </p>
        </div>
        <div className="product-buyer-info__columns">
          {requirement ? (
            <article className="product-buyer-info__column">
              <h3>Supply and packing</h3>
              <p>{requirement.text}</p>
              <div className="product-buyer-info__list">
                {requirement.items.map((item) => (
                  <section key={item.title}>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </section>
                ))}
              </div>
            </article>
          ) : null}
          {support ? (
            <article className="product-buyer-info__column">
              <h3>Requirement review</h3>
              <p>{support.text}</p>
              <div className="product-buyer-info__list product-buyer-info__steps">
                {support.steps.map((step, index) => (
                  <section key={step.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h4>{step.title}</h4>
                      <p>{step.description}</p>
                    </div>
                  </section>
                ))}
              </div>
            </article>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

function ProductDocuments({ documents }: { documents: NonNullable<ProductDetailProps["documents"]> }) {
  return (
    <section className="product-detail-section product-documents-section" id="documents">
      <Container className="a3-container product-documents-section__inner">
        <div className="product-documents-section__copy">
          <h2 className="type-section">{documents.title}</h2>
          <p className="type-section-lead">{documents.text}</p>
        </div>
        <div className="product-documents-list">
          {documents.items.map((item) => (
            <article className="product-documents-item" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {item.href ? (
                <Link className="product-documents-item__link premium-focus" href={item.href}>
                  {item.linkLabel ?? "View resource"}
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProductSupport({ support }: { support: ProductSupportSection }) {
  const useMediaLayout = support.variant === "media" && support.image;

  return (
    <section className={clsx("product-detail-section product-detail-support", !useMediaLayout && "product-detail-support--compact")}>
      <Container className="a3-container product-detail-support__inner">
        <div className="product-detail-support__copy">
          <h2 className="type-section">{support.title}</h2>
          <p className="type-section-lead">{support.text}</p>
          {useMediaLayout ? (
            <ProcessAccordion
              ariaLabel={`${support.title} steps`}
              className="product-detail-support__steps"
              items={support.steps.map((step, index) => ({
                id: step.title,
                number: String(index + 1).padStart(2, "0"),
                title: step.title,
                description: step.description,
              }))}
            />
          ) : (
            <div className="product-detail-support__list">
              {support.steps.map((step, index) => (
                <article key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
        {useMediaLayout ? (
          <figure className="product-detail-support__media">
            <Image src={support.image!} alt={support.imageAlt ?? ""} fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
          </figure>
        ) : null}
      </Container>
    </section>
  );
}

function RelatedProducts({
  links,
}: {
  appearance: "light" | "dark";
  links: ProductDetailLink[];
}) {
  return (
    <section className="product-detail-related">
      <Container className="a3-container product-detail-related__inner">
        <SectionHeader
          className="product-section-heading"
          title="Related categories"
          text="Continue exploring product families that may fit the same sourcing programme."
        />
        <div className="product-detail-related__compact-grid">
          {links.map((link) => (
            <Link className="product-detail-related__compact-card premium-focus" href={link.href} key={link.href}>
              <figure>
                <Image
                  alt={link.imageAlt ?? `${link.label} product category`}
                  fill
                  sizes="(min-width: 1024px) 180px, (min-width: 640px) 140px, 112px"
                  src={link.image ?? homeAssets.media.companyFoodFeastEditorial}
                />
              </figure>
              <div>
                <h3>{link.label}</h3>
                <p>{link.description ?? "Explore this product category."}</p>
              </div>
              <span aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProductFinalCta({ cta }: { cta: ProductDetailProps["finalCta"] }) {
  return (
    <FinalCta
      id="contact"
      image={cta.image ?? homeAssets.media.finalCta}
      imageAlt={cta.imageAlt ?? "Commercial food market and buyer activity"}
      primary={cta.primary}
      secondary={cta.secondary}
      text={cta.text}
      title={cta.title}
      tone={cta.tone === "ink" ? "ink" : "teal"}
      variant={cta.variant === "compact-reminder" ? "compact" : "feature"}
    />
  );
}
