import type { Metadata } from "next";
import { LegalPageLayout, type LegalPageSection } from "@/components/legal-page-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { company, pages } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const breadcrumb = [
  { label: "Home", href: "/en" },
  { label: "Modern Slavery Act", href: "/en/modern-slavery-act" },
];

const sections: LegalPageSection[] = [
  {
    title: "Statement",
    paragraphs: [
      `${company.legalName} recognises the importance of preventing modern slavery, forced labour, human trafficking and exploitative labour practices within business operations and supply relationships.`,
      "A3 operates in international food sourcing and trade, where supply chains may involve farmers, producers, processors, suppliers, logistics providers, distributors and commercial buyers across multiple markets. This statement sets out A3's draft approach to risk awareness and responsible supplier expectations.",
    ],
  },
  {
    title: "Business and supply chain context",
    paragraphs: [
      "A3 is a UK-headquartered food sourcing and trade partner connecting commercial buyers with suitable producers and suppliers across selected food and beverage categories.",
      "Supply chain risk can vary by product, origin, producer structure, labour conditions, logistics route and destination market. A3's role is to review product fit, producer capability, documentation, commercial terms and shipment readiness before a trade route moves forward.",
    ],
  },
  {
    title: "Supplier expectations",
    paragraphs: [
      "A3 expects producers, suppliers and commercial partners to comply with applicable labour, employment, health, safety and human rights laws in the countries where they operate.",
      "Where appropriate for the product, market or inquiry, A3 may ask suppliers to provide information about certifications, production practices, documentation, origin, facility details or other indicators relevant to responsible trade review.",
    ],
    items: [
      "No forced, bonded, trafficked or involuntary labour.",
      "No child labour in breach of applicable law.",
      "Fair and lawful employment practices.",
      "Safe and suitable working conditions.",
      "Accurate documentation and transparent communication where requested.",
    ],
  },
  {
    title: "Risk awareness and escalation",
    paragraphs: [
      "If A3 becomes aware of credible concerns relating to modern slavery or serious labour abuse in a supply relationship, A3 may pause, review or discontinue engagement with the relevant party depending on the circumstances.",
      "A3 aims to handle concerns proportionately, taking into account the seriousness of the issue, the ability to obtain reliable information and the possibility of corrective action where appropriate.",
    ],
  },
  {
    title: "Review",
    paragraphs: [
      "This statement should be reviewed periodically as A3's business, supply relationships, product categories and market activity develop.",
      "Further detail may be added as supplier due diligence processes, documentation expectations and internal review procedures mature.",
    ],
  },
];

export function generateMetadata(): Metadata {
  return buildMetadata(pages.modernSlaveryAct.seo);
}

export default function ModernSlaveryActPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <LegalPageLayout
        breadcrumb={breadcrumb}
        title={pages.modernSlaveryAct.title}
        description={pages.modernSlaveryAct.description}
        lastUpdated="8 July 2026"
        sections={sections}
      />
    </>
  );
}
