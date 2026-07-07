import type { Metadata } from "next";
import { ProductDetailLayout } from "@/components/product-detail-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { elleMinaProducts, homeAssets, pages } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata, itemListJsonLd } from "@/lib/seo";

const breadcrumb = [
  { label: "Home", href: "/en" },
  { label: "Products", href: "/en/products" },
  { label: "Elle Mina", href: "/en/products/elle-mina" },
];

function elleMinaQuoteHref(product?: string) {
  const params = new URLSearchParams({ category: "consumer-foods" });
  if (product) params.set("product", product);
  return `/en/request-a-quote?${params.toString()}`;
}

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
      <ProductDetailLayout
        breadcrumb={breadcrumb}
        hero={{
          title: "Elle Mina",
          text: [
            pages.elleMina.description,
            "A3 reviews Elle Mina requirements by product, packing format, buyer channel, destination market, volume and timing.",
          ],
          image: homeAssets.media.elleMinaProfessionalMargarine,
          imageAlt: "Elle Mina professional butter flavoured margarine in a bakery setting",
          hideBreadcrumb: true,
          variant: "compact",
        }}
        productPortfolio={{
          id: "range",
          title: "Elle Mina portfolio",
          text:
            "Explore consumer and professional margarine and butter formats for retail, foodservice, bakery and distribution buyers.",
          display: "lineup",
          initialVisibleCount: 4,
          items: elleMinaProducts.map((product) => {
            const fit = product.applications.join(", ");

            return {
              id: product.id,
              title: product.title,
              description: product.cardSummary,
              image: product.image,
              imageAlt: product.imageAlt,
              source: "Elle Mina range",
              fit,
              overview: product.description,
              keyDetails: [
                { title: "Source", description: "Elle Mina range" },
                { title: "Typical uses", description: fit },
                { title: "Packing", description: product.packing },
              ],
              applications: [...product.applications],
              packing: [
                { title: "Packing", description: product.packing },
                { title: "Channel fit", description: fit },
              ],
              origin: [
                { title: "Brand", description: "Elle Mina product range reviewed by inquiry." },
                { title: "Market fit", description: "Destination market, label needs and commercial route are checked before quotation." },
              ],
              cta: { label: "Request this product", href: elleMinaQuoteHref(product.id) },
            };
          }),
        }}
        shipmentOptions={{
          title: "Packing and channel context",
          text:
            "Elle Mina product requirements become workable when format, channel, label needs, volume and destination market are clear.",
          image: homeAssets.media.elleMinaConsumerMargarineTable,
          imageAlt: "Elle Mina consumer margarine served at a table",
          items: [
            {
              title: "Packing format",
              description: "Share consumer brick, butter format or professional bucket needs, including carton and volume expectations.",
            },
            {
              title: "Buyer channel",
              description: "Retail, wholesale, foodservice, bakery and distribution channels are reviewed by market fit.",
            },
            {
              title: "Destination market",
              description: "Destination, label expectations, shelf-life needs and timing shape the commercial review.",
            },
            {
              title: "Documents",
              description: "Product specifications, label information and supplier-held documents are checked before follow-up.",
            },
          ],
        }}
        related={[
          { label: "Consumer Foods", href: "/en/products/consumer-foods" },
          { label: "Fats & Oils", href: "/en/products/oils-fats" },
          { label: "Request a Quote", href: "/en/request-a-quote" },
        ]}
        finalCta={{
          title: "Discuss Elle Mina product requirements.",
          text:
            "Send the product type, packing format, estimated volume and destination market so A3 can review the best commercial next step.",
          primary: { label: "Send Product Requirement", href: elleMinaQuoteHref("elle-mina") },
          secondary: { label: "Contact A3", href: "/en/contact" },
          image: homeAssets.media.elleMinaButter,
          imageAlt: "Elle Mina butter on a breakfast table",
        }}
      />
    </>
  );
}
