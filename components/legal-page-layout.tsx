import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
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
      <section className="legal-page__hero">
        <Container className="a3-container legal-page__hero-inner">
          <Breadcrumb items={breadcrumb} />
          <div className="legal-page__intro">
            <p className="legal-page__kicker">Legal</p>
            <h1 className="type-section">{title}</h1>
            <p className="type-section-lead">{description}</p>
            <p className="legal-page__updated">Last updated: {lastUpdated}</p>
          </div>
        </Container>
      </section>

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
