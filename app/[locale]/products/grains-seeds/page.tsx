import type { Metadata } from "next";
import { ProductDetailLayout } from "@/components/product-detail-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { categoryCardItemBySlug } from "@/content/product-card-items";
import { pages } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata, productFamilyJsonLd } from "@/lib/seo";

const breadcrumb = [
  { label: "Home", href: "/en" },
  { label: "Products", href: "/en/products" },
  { label: "Grains & Seeds", href: "/en/products/grains-seeds" },
];

function grainsQuoteHref(product?: string) {
  const params = new URLSearchParams({ category: "grains-seeds" });
  if (product) params.set("product", product);
  return `/en/request-a-quote?${params.toString()}`;
}

const grainsRelated = ["sugar", "oils-fats", "starches-sweeteners"]
  .map(categoryCardItemBySlug)
  .filter((item): item is NonNullable<typeof item> => Boolean(item))
  .map((item) => ({
    label: item.title,
    href: item.href,
    description: item.description,
    image: item.image,
    imageAlt: item.imageAlt,
  }));

export function generateMetadata(): Metadata {
  return buildMetadata(pages.grains.seo);
}

export default function GrainsSeedsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <JsonLd
        data={productFamilyJsonLd({
          title: "Grains & Seeds",
          summary: pages.grains.description,
          href: "/en/products/grains-seeds",
          image: "/media/products/grains-seeds/grains-seeds-hero-stock-v1.webp",
        })}
      />
      <ProductDetailLayout
        pageTreatment="polished"
        breadcrumb={breadcrumb}
        hero={{
          title: "Connecting global harvests to the industries that depend on them.",
          text: [
            "A3 coordinates milling wheat, durum wheat, corn or maize and sunflower seed sourcing by crop, end use, quality target, volume and destination.",
            "Quality and safety controls, documentation, loading model and shipment requirements are aligned before commercial commitment.",
          ],
          image: "/media/products/grains-seeds/grains-seeds-hero-stock-v1.webp",
          imageAlt: "Vibrant green wheat field stretching toward a mountain horizon",
          hideBreadcrumb: true,
          variant: "compact",
        }}
        sectionNavigation={[
          { label: "Overview", href: "#overview" },
          { label: "Products", href: "#range" },
          { label: "Market context", href: "#key-facts" },
          { label: "Services", href: "#integrated-value-chain" },
          { label: "Contact", href: "#contact" },
        ]}
        productPortfolio={{
          id: "range",
          title: "Grains & Seeds Portfolio",
          text: "Four sourcing routes defined by crop, end use, functional quality, safety requirements and the intended loading model.",
          cardTreatment: "category-overlay",
          items: [
            {
              id: "milling-wheat",
              title: "Milling Wheat",
              description: "Common wheat selected for flour milling and the required processing performance.",
              image: "/media/products/grains-seeds/milling-wheat-light-v1.webp",
              imageAlt: "Pale golden common wheat kernels and ears presented as a commercial sample",
              decisionSummary: {
                lead: "Class and functional performance—not the crop name alone—determine mill fit.",
                facts: [
                  { title: "Product form", description: "Whole common wheat" },
                  { title: "End use", description: "Flour milling" },
                  { title: "Supply basis", description: "Crop, origin and lot confirmed by offer" },
                ],
                points: [
                  "Protein and gluten performance",
                  "Test weight, moisture and falling number",
                  "Defects and impurities",
                  "Mycotoxin and destination requirements",
                ],
                supply: "Bulk vessel, container or bagged loading by volume and route.",
              },
              cta: { label: "Request a milling wheat offer", href: grainsQuoteHref("milling-wheat") },
            },
            {
              id: "durum-wheat-pasta",
              title: "Durum Wheat for Pasta",
              cardTitle: "Durum Wheat",
              description: "Amber durum wheat selected for semolina and pasta performance.",
              image: "/media/products/grains-seeds/durum-wheat-light-v1.webp",
              imageAlt: "Amber vitreous durum wheat kernels and ears presented as a commercial sample",
              decisionSummary: {
                lead: "Vitreousness, protein, colour and semolina yield shape pasta-processing fit.",
                facts: [
                  { title: "Product species", description: "Triticum durum" },
                  { title: "End use", description: "Semolina and pasta" },
                  { title: "Supply basis", description: "Crop, origin and lot confirmed by offer" },
                ],
                points: [
                  "Vitreous kernel content",
                  "Protein and gluten performance",
                  "Test weight, moisture and colour",
                  "Defects and relevant safety controls",
                ],
                supply: "Bulk vessel, container or bagged loading by programme.",
              },
              cta: { label: "Request a durum wheat offer", href: grainsQuoteHref("durum-wheat-pasta") },
            },
            {
              id: "corn-maize",
              title: "Corn / Maize",
              description: "Whole maize programmes defined for food, feed or processing use.",
              image: "/media/products/grains-seeds/corn-maize-light-v1.webp",
              imageAlt: "Dry yellow dent and flint maize kernels presented as a commercial sample",
              decisionSummary: {
                lead: "Grade, end use and destination requirements must be defined before the offer.",
                facts: [
                  { title: "Product form", description: "Whole shelled maize" },
                  { title: "End use", description: "Food, feed or processing, as offered" },
                  { title: "Supply basis", description: "Crop, origin and lot confirmed by offer" },
                ],
                points: [
                  "Grade, moisture and test weight",
                  "Broken kernels and foreign material",
                  "Mycotoxin requirements",
                  "GMO status where relevant",
                ],
                supply: "Bulk vessel, container or bagged loading by route.",
              },
              cta: { label: "Request a corn or maize offer", href: grainsQuoteHref("corn-maize") },
            },
            {
              id: "sunflower-seed",
              title: "Sunflower Seed",
              description: "In-shell seed selected first by oilseed or confectionery use.",
              image: "/media/products/grains-seeds/sunflower-seed-light-v1.webp",
              imageAlt: "Striped in-shell sunflower seeds presented as a commercial sample",
              decisionSummary: {
                lead: "Oilseed and confectionery routes require different product and acceptance criteria.",
                facts: [
                  { title: "Product type", description: "Oilseed or confectionery" },
                  { title: "Product form", description: "In-shell seed" },
                  { title: "End use", description: "Crushing, food or confectionery" },
                ],
                points: [
                  "Oil content or seed size",
                  "Moisture and admixture",
                  "Kernel condition and damaged or dehulled seed",
                  "Residue, mycotoxin and destination controls",
                ],
                supply: "Bulk, big bags or bags by application and route.",
              },
              cta: { label: "Request a sunflower seed offer", href: grainsQuoteHref("sunflower-seed") },
            },
          ],
        }}
        editorialFacts={{
          title: "Grains & Seeds Market Context",
          text: "2026/27 forecast — July 2026. USDA projections provide a dated market snapshot for wheat, corn and sunflowerseed; they are context rather than a live price indicator.",
          sources: [
            {
              label: "USDA Grain: World Markets and Trade",
              href: "https://apps.fas.usda.gov/psdonline/circulars/grain.pdf",
            },
            {
              label: "USDA Oilseeds: World Markets and Trade",
              href: "https://apps.fas.usda.gov/psdonline/circulars/oilseeds.pdf",
            },
          ],
          items: [
            {
              metric: "820m",
              title: "Wheat production below projected use",
              description: "World wheat production is forecast at about 820 million tonnes, around 3% below the prior year and below projected consumption of 826.2 million tonnes.",
            },
            {
              metric: "1.30bn",
              title: "Corn stocks tighten in the forecast",
              description: "Production is forecast at 1.297 billion tonnes against 1.315 billion tonnes of consumption, with ending stocks falling from 298.7 million to 275.3 million tonnes.",
            },
            {
              metric: "62.7m",
              title: "Sunflowerseed output rebounds",
              description: "World sunflowerseed production is forecast at 62.66 million tonnes, about 13% above the prior-year estimate of 55.28 million tonnes.",
            },
          ],
        }}
        services={{
          title: "Our Global Origination Network",
          text: "We identify and capture business opportunities across main global markets, ensuring supply security through trusted relationships in key producing territories.",
          variant: "media-grid",
          items: [
            {
              title: "The Black Sea & Europe",
              description: "Accessing high-quality supply from leading exporters like France, Poland, and Ukraine to serve international milling and industrial demands.",
              imageSrc: "/media/products/grains-seeds/origination-europe-harvest-user-v1.webp",
              imageAlt: "Combine harvester cutting a broad golden grain field",
            },
            {
              title: "The Americas",
              description: "Sourcing dominant origins for corn and oilseeds to meet diverse global requirements for food and animal nutrition.",
              imageSrc: "/media/products/grains-seeds/origination-americas-farm-user-v1.webp",
              imageAlt: "Farmer tending rows of young corn plants in the field",
            },
            {
              title: "Strategic Export Hubs",
              description: "Coordinating flows through major international ports to ensure efficient maritime and inland waterway logistics.",
              imageSrc: "/media/products/grains-seeds/origination-export-hubs-user-v1.webp",
              imageAlt: "Bulk grain beside cargo ships at an export port",
            },
          ],
        }}
        servicesPosition="before-shipment"
        shipmentOptions={{
          id: "integrated-value-chain",
          title: "High-Volume Execution Excellence",
          text: "A3 utilizes years of experience in risk mitigation and maritime logistics to ensure maximum returns without complication.",
          image: "/media/products/grains-seeds/grains-seeds-hero-stock-v1.webp",
          imageAlt: "Vibrant green wheat field stretching toward a mountain horizon",
          items: [
            {
              title: "Requirement",
              description: "We establish technical baselines by identifying specific moisture levels, protein content, and bulk volume needs for your facility.",
              image: "/media/products/grains-seeds/grains-seeds-hero-stock-v1.webp",
              imageAlt: "Vibrant green wheat field stretching toward a mountain horizon",
            },
            {
              title: "Matching",
              description: "We leverage our global network to identify the right producer or supplier that matches your origin and timing requirements.",
              image: "/media/products/grains-seeds/grain-service-crop-matching-stock-v1.webp",
              imageAlt: "Combine harvesters working across a wheat field",
            },
            {
              title: "Vetting",
              description: "We conduct a rigorous assessment of documentation and certifications to ensure every supply option is secure and market-compliant.",
              image: "/media/products/grains-seeds/grain-service-quality-stock-v1.webp",
              imageAlt: "Hands conducting a physical review of grain kernels",
            },
            {
              title: "Commercials",
              description: "We structure trades using optimized Incoterms and price management strategies to safeguard your prosperity against market volatility.",
              image: "/media/products/grains-seeds/grain-service-structuring-stock-v1.webp",
              imageAlt: "Metal grain storage silos in an open agricultural landscape",
            },
            {
              title: "Execution",
              description: "We coordinate end-to-end logistics, from inland warehouse management to international shipping and freight forwarding.",
              image: "/media/products/grains-seeds/grain-service-shipment-stock-v1.webp",
              imageAlt: "Cargo ship alongside a container terminal during shipment coordination",
            },
          ],
        }}
        related={grainsRelated}
        finalCta={{
          title: "For grains & seeds enquiries",
          text: "Share the product, crop, end use, quality targets, volume, loading model, destination and shipment window with A3.",
          primary: { label: "Discuss a grain or seed requirement", href: grainsQuoteHref() },
          variant: "compact-reminder",
        }}
      />
    </>
  );
}
