import type { Metadata } from "next";
import { HomeFigmaLanding } from "@/components/home-sections";
import { JsonLd } from "@/components/seo/json-ld";
import { homeLanding, pages } from "@/content/site";
import { buildMetadata, itemListJsonLd } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildMetadata(pages.home.seo);
}

export default function HomePage() {
  const featuredProducts = homeLanding.featuredProducts;

  return (
    <>
      <JsonLd
        data={itemListJsonLd(
          featuredProducts.map((product) => ({
            title: product.title,
            href: product.href,
            summary: product.description,
          })),
        )}
      />
      <HomeFigmaLanding />
    </>
  );
}
