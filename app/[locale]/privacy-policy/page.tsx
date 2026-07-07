import type { Metadata } from "next";
import { LegalPageLayout, type LegalPageSection } from "@/components/legal-page-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { company, pages } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const breadcrumb = [
  { label: "Home", href: "/en" },
  { label: "Privacy Policy", href: "/en/privacy-policy" },
];

const sections: LegalPageSection[] = [
  {
    title: "Overview",
    paragraphs: [
      `${company.legalName} is a UK-headquartered food sourcing and trade business. This Privacy Policy explains how A3 may collect, use and protect personal information shared through the website, email, forms, calls and business communications.`,
      "A3 primarily handles business contact information and commercial inquiry details. We aim to collect only the information needed to respond to inquiries, review product requirements, coordinate commercial discussions and maintain business records.",
    ],
  },
  {
    title: "Information we may collect",
    paragraphs: [
      "The information collected may depend on how a visitor or business contact interacts with A3. Information may be provided directly through a form, email, telephone call, meeting or commercial document exchange.",
    ],
    items: [
      "Name, company name, role, email address, telephone number and country.",
      "Product requirements, destination market, volume, timing, packing, certification or documentation needs.",
      "Supplier, producer or buyer information shared for commercial review.",
      "Technical website data such as device, browser, approximate location, page usage and security logs where applicable.",
      "Business correspondence, inquiry history and follow-up notes.",
    ],
  },
  {
    title: "How we use information",
    paragraphs: [
      "A3 may use personal information to respond to inquiries, review product and sourcing requirements, assess supplier or buyer fit, prepare commercial follow-up, coordinate documentation and maintain ordinary business records.",
      "We may also use limited information to improve website performance, protect website security, comply with legal obligations and manage company administration.",
    ],
  },
  {
    title: "Sharing information",
    paragraphs: [
      "Where required for a commercial inquiry, A3 may share relevant business information with producers, suppliers, buyers, logistics partners, professional advisers or service providers. Information is shared only where it is reasonably necessary for the inquiry, trade review, documentation process or legal/commercial administration.",
      "A3 does not sell personal information. If information is transferred internationally as part of a trade inquiry or supplier review, A3 aims to use appropriate care and share only the information needed for the relevant business purpose.",
    ],
  },
  {
    title: "Retention and security",
    paragraphs: [
      "A3 keeps information for as long as reasonably needed for the purpose it was collected, including inquiry follow-up, commercial records, legal compliance, accounting, dispute prevention and relationship management.",
      "We use reasonable administrative and technical measures intended to protect information from unauthorised access, loss, misuse or alteration. No website or communication method can be guaranteed to be completely secure.",
    ],
  },
  {
    title: "Your rights",
    paragraphs: [
      "Depending on applicable law, individuals may have rights to request access, correction, deletion, restriction or objection to certain uses of personal information. Requests can be sent to A3 using the contact details on this page.",
      "A3 may need to verify a request before responding and may retain certain information where required for legal, accounting or legitimate business reasons.",
    ],
  },
];

export function generateMetadata(): Metadata {
  return buildMetadata(pages.privacyPolicy.seo);
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <LegalPageLayout
        breadcrumb={breadcrumb}
        title={pages.privacyPolicy.title}
        description={pages.privacyPolicy.description}
        lastUpdated="8 July 2026"
        sections={sections}
      />
    </>
  );
}
