import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { CTASection } from "@/components/sections";
import { Container, LinkButton } from "@/components/ui";
import { elleMinaProducts, pages } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata, itemListJsonLd } from "@/lib/seo";

const breadcrumb = [
  { label: "Home", href: "/en" },
  { label: "Products", href: "/en/products" },
  { label: "Elle Mina", href: "/en/products/elle-mina" },
];

const tradePoints = [
  { title: "Packing formats", text: "200g consumer and butter formats, plus professional margarine bucket format by inquiry." },
  { title: "Buyer channels", text: "Retail, wholesale, foodservice, bakery and distribution conversations reviewed by market fit." },
  { title: "Documentation", text: "Product specifications, label information and supplier-held documents reviewed before commercial follow-up." },
  { title: "Availability model", text: "Inquiry-led supply depending on product, volume, destination and timing." },
];

const applicationGroups = [
  "Retail shelves and consumer distribution",
  "Foodservice and wholesale channels",
  "Bakery, pastry and professional kitchens",
];

export function generateMetadata(): Metadata {
  return buildMetadata(pages.elleMina.seo);
}

export default function ElleMinaPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <JsonLd
        data={itemListJsonLd(
          elleMinaProducts.map((product) => ({
            title: product.title,
            href: `/en/products/elle-mina#${product.id}`,
            summary: product.summary,
          })),
        )}
      />
      <section className="elle-mina-page-hero bg-paper">
        <Container className="a3-container elle-mina-page-hero__inner">
          <div className="elle-mina-page-hero__copy">
            <nav className="type-p3 mb-8 flex flex-wrap gap-2 text-ink/64" aria-label="Breadcrumb">
              {breadcrumb.map((item, index) => (
                <span className="inline-flex items-center gap-2" key={item.href}>
                  {index > 0 ? <span aria-hidden="true">/</span> : null}
                  <Link className="premium-focus hover:text-teal" href={item.href}>{item.label}</Link>
                </span>
              ))}
            </nav>
            <p className="type-kicker text-teal">Own Brand</p>
            <h1 className="type-h1 mt-4 max-w-[760px] text-ink">{pages.elleMina.title}</h1>
            <p className="type-p1 mt-6 max-w-[760px] text-ink/78">{pages.elleMina.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="#range" size="large">
                Explore Range
              </LinkButton>
              <LinkButton href="/en/request-a-quote" variant="outline" size="large">
                Send Product Requirement
              </LinkButton>
            </div>
          </div>
          <div className="elle-mina-page-hero__media" aria-label="Elle Mina professional margarine and consumer range imagery">
            <Image
              className="object-cover"
              src="/media/brands/elle-mina/professional-margarine-bakery.webp"
              alt="Elle Mina professional butter flavoured margarine in a bakery setting"
              fill
              priority
              sizes="(min-width: 1024px) 600px, 100vw"
            />
          </div>
        </Container>
      </section>

      <section id="range" className="elle-mina-range-section bg-surface">
        <Container className="a3-container">
          <div className="elle-mina-section-heading">
            <p className="type-kicker text-teal">Product range</p>
            <h2 className="type-section mt-4 text-ink">Consumer and professional formats.</h2>
            <p className="type-section-lead mt-5 max-w-[760px] text-ink/76">
              Elle Mina brings margarine and butter products into commercial conversations around channel, packing, volume and destination market.
            </p>
          </div>
          <div className="elle-mina-range-grid">
            {elleMinaProducts.map((product) => (
              <article className="elle-mina-range-card" id={product.id} key={product.id}>
                <div className="elle-mina-range-card__media">
                  <Image
                    className="object-cover"
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 390px, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="elle-mina-range-card__body">
                  <p className="type-kicker text-teal">{product.packing}</p>
                  <h3 className="type-h3 mt-3 text-ink">{product.title}</h3>
                  <p className="type-p2 mt-4 text-ink/76">{product.description}</p>
                  <ul className="elle-mina-chip-list" aria-label={`${product.title} applications`}>
                    {product.applications.map((application) => (
                      <li key={application}>{application}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="elle-mina-application-band bg-deep-dark text-surface">
        <Container className="a3-container elle-mina-application-band__inner">
          <div>
            <p className="type-kicker text-brand-blue">Applications</p>
            <h2 className="type-section mt-4 max-w-[720px] text-surface">Built for commercial buyer conversations.</h2>
          </div>
          <div className="elle-mina-application-list">
            {applicationGroups.map((item) => (
              <p className="type-p2" key={item}>{item}</p>
            ))}
          </div>
        </Container>
      </section>

      <section className="elle-mina-trade-section bg-paper">
        <Container className="a3-container">
          <div className="elle-mina-section-heading">
            <p className="type-kicker text-teal">Trade information</p>
            <h2 className="type-section mt-4 text-ink">Practical details reviewed before quotation.</h2>
          </div>
          <div className="elle-mina-trade-grid">
            {tradePoints.map((point) => (
              <article className="elle-mina-trade-card" key={point.title}>
                <h3>{point.title}</h3>
                <p>{point.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="Discuss Elle Mina product requirements."
        text="Send the product type, packing format, estimated volume and destination market so A3 can review the best commercial next step."
        primary={{ label: "Send Product Requirement", href: "/en/request-a-quote" }}
        secondary={{ label: "Contact A3", href: "/en/contact" }}
      />
    </>
  );
}
