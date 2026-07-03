import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { CTASection, FeatureGrid, PageHero, ProofStrip, SplitSection } from "@/components/sections";
import { company, pages } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const breadcrumb = [
  { label: "Home", href: "/en" },
  { label: "About", href: "/en/about" },
];

export function generateMetadata(): Metadata {
  return buildMetadata(pages.about.seo);
}

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <PageHero title={pages.about.title} text={pages.about.description} breadcrumb={breadcrumb} />
      <SplitSection
        title="Who we are"
        text="A3 is not positioned as a mass-scale commodity house and not as a local wholesaler. It is a focused sourcing and trade partner connecting selected producers with commercial buyers."
        points={["UK-headquartered", "Relationship-led international food trade", "Selected producer access", "Commercial buyer requirements"]}
        visualLabel="A3 company profile and sourcing model placeholder"
      />
      <FeatureGrid
        title="Relationship-led trade"
        text="Commercial trust is built through direct relationships, field experience, producer access, market knowledge and clear buyer communication."
        muted
        items={[
          { title: "Direct relationships", description: "Personal commercial relationships support sourcing discussions and repeat trade." },
          { title: "Producer access", description: "Selected producers are reviewed by product, capability and documentation availability." },
          { title: "Buyer trust", description: "A3 focuses on what can be reviewed, documented and coordinated." },
        ]}
      />
      <ProofStrip
        items={[
          `Company No. ${company.companyNumber}`,
          `VAT ${company.vatNumber}`,
          `D-U-N-S ${company.dunsNumber}`,
          "Registered office in London",
          "Official documents available where required",
        ]}
      />
      <CTASection
        title="Start a commercial conversation with A3."
        primary={{ label: "Contact A3", href: "/en/contact" }}
      />
    </>
  );
}
