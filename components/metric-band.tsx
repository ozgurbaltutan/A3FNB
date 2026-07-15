import Link from "next/link";
import { CountUpMetric } from "@/components/count-up-metric";
import { Container, SectionHeader } from "@/components/ui";

export type MetricBandItem = {
  value: string;
  label?: string;
  description: string;
};

export type MetricBandSource = {
  label: string;
  href: string;
};

export function MetricBand({
  title,
  edition,
  items,
  sources = [],
  id,
}: {
  title: string;
  edition?: string;
  items: MetricBandItem[];
  sources?: MetricBandSource[];
  id?: string;
}) {
  return (
    <section className="metric-band" id={id}>
      <Container className="a3-container metric-band__inner">
        <SectionHeader className="metric-band__header" text={edition} title={title} tone="dark" />
        <div className="metric-band__grid">
          {items.map((item) => (
            <article className="metric-band__item" key={`${item.value}-${item.description}`}>
              <strong className="metric-band__value">
                <CountUpMetric value={item.value} />
              </strong>
              {item.label ? <span className="metric-band__label">{item.label}</span> : null}
              <p>{item.description}</p>
            </article>
          ))}
        </div>
        {sources.length ? (
          <div className="metric-band__sources">
            <span>Sources:</span>
            {sources.map((source) => (
              <Link href={source.href} key={source.href} rel="noreferrer" target="_blank">
                {source.label}
              </Link>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
