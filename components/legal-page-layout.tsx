import Link from "next/link";
import { InnerPageHero } from "@/components/inner-page-hero";
import { Container } from "@/components/ui";
import type { NavigationItem } from "@/lib/types";

export type LegalPageSection = {
  title: string;
  paragraphs: string[];
  items?: string[];
};

export function LegalPageLayout({
  breadcrumb,
  title,
  description,
  lastUpdated,
  sections,
}: {
  breadcrumb: NavigationItem[];
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalPageSection[];
}) {
  return (
    <main className="legal-page">
      <InnerPageHero
        title={title}
        text={description}
        image="/media/home/company-trade-editorial.webp"
        imageAlt="Trade documents and food products prepared for commercial review"
        breadcrumb={breadcrumb}
        className="legal-page__hero"
      >
        <p className="legal-page__updated inner-page-hero__note">Last updated: {lastUpdated}</p>
      </InnerPageHero>

      <section className="legal-page__body">
        <Container className="a3-container legal-page__body-inner">
          <div className="legal-page__notice">
            <p>
              This page is a detailed draft prepared for website publication and should be reviewed against current legal requirements before formal reliance.
            </p>
          </div>
          <div className="legal-page__sections">
            {sections.map((section) => (
              <article className="legal-page__section" key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.items ? (
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
          <div className="legal-page__contact">
            <h2>Contact</h2>
            <p>
              Questions about this page can be sent to{" "}
              <a className="premium-focus" href="mailto:info@a3fnb.com">
                info@a3fnb.com
              </a>
              . You can also use the{" "}
              <Link className="premium-focus" href="/en/contact">
                contact page
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
