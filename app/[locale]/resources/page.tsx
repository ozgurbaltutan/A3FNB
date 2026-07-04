import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { CTASection, FeatureGrid, PageHero, ResourceGrid } from "@/components/sections";
import { pages, resources } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata, itemListJsonLd } from "@/lib/seo";

const breadcrumb = [
  { label: "Home", href: "/en" },
  { label: "Resources", href: "/en/resources" },
];

export function generateMetadata(): Metadata {
  return buildMetadata(pages.resources.seo);
}

export default function ResourcesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <JsonLd
        data={itemListJsonLd(
          resources.map((resource) => ({
            title: resource.title,
            href: "/en/resources",
            summary: resource.summary,
          })),
        )}
      />
      <PageHero title={pages.resources.title} text={pages.resources.description} breadcrumb={breadcrumb} />
      <ResourceGrid
        title="Product catalogues and trade resources"
        text="Detailed commercial documents may be shared after inquiry depending on product and requirement."
        resources={resources}
      />
      <FeatureGrid
        title="Future resource structure"
        text="The resource page is prepared for future SEO content without turning the site into a generic blog."
        muted
        items={[
          { title: "Brazilian Green Coffee Sourcing", description: "Future origin page supporting coffee buyers and internal links." },
          { title: "ICUMSA Sugar Grades Explained", description: "Future educational resource for sugar grade search intent." },
          { title: "Sugar Documentation Requirements", description: "Future documentation guide for commercial sugar sourcing." },
          { title: "Coffee Origin and Traceability Notes", description: "Future resource for origin and traceability questions." },
          { title: "How A3 Handles Product Requirements", description: "Future process article supporting conversion and trust." },
        ]}
      />
      <CTASection
        title="Need a specific product document?"
        primary={{ label: "Send Requirement", href: "/en/request-a-quote" }}
      />
    </>
  );
}
