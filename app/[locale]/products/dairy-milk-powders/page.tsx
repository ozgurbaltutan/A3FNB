import type { Metadata } from "next";
import { ProductDetailLayout } from "@/components/product-detail-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { categoryCardItemBySlug } from "@/content/product-card-items";
import { breadcrumbJsonLd, buildMetadata, productFamilyJsonLd } from "@/lib/seo";
import type { PageSeo } from "@/lib/types";

const breadcrumb = [
  { label: "Home", href: "/en" },
  { label: "Products", href: "/en/products" },
  { label: "Dairy & Milk Powders", href: "/en/products/dairy-milk-powders" },
];

const dairySeo = {
  metaTitle: "Dairy Ingredients & Milk Powders | A3 Food & Beverage",
  metaDescription:
    "Source milk powders, whey, lactose, permeate, butter, cheese products, UHT milk and infant-grade dairy ingredients through a global supply network.",
  canonicalPath: "/en/products/dairy-milk-powders",
  ogTitle: "Dairy Ingredients & Milk Powders | A3 Food & Beverage",
  ogDescription:
    "Dairy ingredients and products matched by composition, application, packing, origin and commercial requirements.",
  ogImage: {
    src: "/media/products/dairy-milk-powders/dairy-hero-pasture-stock-v1.webp",
    alt: "Holstein dairy cows grazing in a green pasture",
  },
  robots: { index: true, follow: true },
  locale: "en",
  sitemapInclude: true,
  structuredDataType: "Product",
} satisfies PageSeo;

function dairyQuoteHref(product?: string) {
  const params = new URLSearchParams({ category: "dairy-milk-powders" });
  if (product) params.set("product", product);
  return `/en/request-a-quote?${params.toString()}`;
}

const detailedSupply =
  "Ask for more details on the full specification, certificate of analysis, packing, origin and available certifications.";

const dairyPortfolioItems = [
  {
    id: "whole-milk-powder",
    title: "Whole Milk Powder",
    description: "Full-fat milk powder for dairy, bakery, beverage and confectionery systems.",
    image: "/media/products/dairy-milk-powders/whole-milk-powder-light-v4.webp",
    imageAlt: "Warm whole milk powder flowing from a stainless filling chute into an industrial lined bag",
    decisionSummary: {
      lead: "Whole milk powder is produced by spray drying fresh milk while preserving its natural nutritional value and rich dairy flavour. It is widely used in the food industry for confectionery, bakery, dairy products, chocolate, ice cream, and dessert applications. Its long shelf life, excellent functionality, and ease of handling make it a reliable ingredient for industrial food production.",
      facts: [
        { title: "Protein", description: "Confirmed with each offer" },
        { title: "Fat", description: "Confirmed with each offer" },
        { title: "Typical applications", description: "Dairy, bakery, chocolate and ice cream" },
      ],
      supply: detailedSupply,
    },
    cta: { label: "Request a whole milk powder offer", href: dairyQuoteHref("whole-milk-powder") },
  },
  {
    id: "skimmed-milk-powder",
    title: "Skimmed Milk Powder",
    description: "Low-fat dairy solids selected by protein level, heat class and application.",
    image: "/media/products/dairy-milk-powders/skimmed-milk-powder-light-v4.webp",
    imageAlt: "Bright white skimmed milk powder presented as a cool-toned technical dairy sample",
    decisionSummary: {
      lead: "Skimmed milk powder is produced from fresh milk with most of the fat removed, providing a high quality source of dairy protein and solids. It is widely used in bakery, confectionery, dairy products, sauces, desserts, and processed foods. Its excellent stability, long shelf life, and consistent performance make it an essential ingredient for food manufacturers.",
      facts: [
        { title: "Protein", description: "Confirmed with each offer" },
        { title: "Fat", description: "Confirmed with each offer" },
        { title: "Heat class", description: "Low, medium or high heat" },
      ],
      supply: detailedSupply,
    },
    cta: { label: "Request a skimmed milk powder offer", href: dairyQuoteHref("skimmed-milk-powder") },
  },
  {
    id: "buttermilk-powder",
    title: "Buttermilk Powder",
    description: "Spray-dried buttermilk for flavour, texture and moisture management.",
    image: "/media/products/dairy-milk-powders/buttermilk-powder-light-v4.webp",
    imageAlt: "Buttermilk powder beside a restrained liquid buttermilk and butter-making process cue",
    decisionSummary: {
      lead: "Buttermilk powder is produced by spray drying fresh liquid buttermilk obtained during the butter making process. It provides a rich dairy flavour and improves texture, colour, and moisture retention in finished products. It is widely used in bakery, confectionery, dairy products, ice cream, desserts, prepared foods, and dry mix applications due to its excellent functionality and consistent quality.",
      facts: [
        { title: "Protein", description: "Confirmed with each offer" },
        { title: "Fat", description: "Confirmed with each offer" },
        { title: "Typical applications", description: "Bakery, confectionery, ice cream and dry mixes" },
      ],
      supply: detailedSupply,
    },
    cta: { label: "Request a buttermilk powder offer", href: dairyQuoteHref("buttermilk-powder") },
  },
  {
    id: "instant-milk-powder",
    title: "Instant Milk Powders",
    description: "Agglomerated powders developed for rapid wetting and uniform dispersion.",
    image: "/media/products/dairy-milk-powders/instant-milk-powder-light-v4.webp",
    imageAlt: "Porous instant milk powder agglomerates dispersing rapidly in a clear mixing vessel",
    decisionSummary: {
      lead: "Instant milk powders are specially processed to provide rapid and uniform dispersion in industrial mixing systems. They are ideal for high volume production of beverages, dairy drinks, bakery premixes, and ready to mix formulations. Their excellent solubility improves processing efficiency while ensuring consistent texture and flavour.",
      facts: [
        { title: "Base powder", description: "Whole or skim milk powder" },
        { title: "Processing", description: "Agglomerated for faster wetting" },
        { title: "Performance", description: "Dispersion and solubility confirmed with each offer" },
      ],
      supply: detailedSupply,
    },
    cta: { label: "Request an instant milk powder offer", href: dairyQuoteHref("instant-milk-powder") },
  },
  {
    id: "fat-filled-milk-powder",
    title: "Fat Filled Milk Powders",
    description: "Dairy solids and selected vegetable fats tailored by protein and fat level.",
    image: "/media/products/dairy-milk-powders/fat-filled-milk-powder-light-v4.webp",
    imageAlt: "Fat filled milk powder with a clear vegetable-oil sample and controlled emulsion cue",
    decisionSummary: {
      lead: "Fat filled milk powders are produced by combining dairy solids with selected vegetable fats, offering a cost effective alternative to whole milk powder. Available in a range of protein and fat levels, they can be tailored to different production requirements. They provide reliable functionality and are widely used in dairy, bakery, confectionery, beverage, and food manufacturing applications.",
      facts: [
        { title: "Low protein", description: "5–10% available options" },
        { title: "Medium protein", description: "12–20% available options" },
        { title: "High protein", description: "20%+ available options" },
        { title: "Fat", description: "Level and vegetable-fat system confirmed with each offer" },
      ],
      supply: detailedSupply,
    },
    cta: { label: "Request a fat filled milk powder offer", href: dairyQuoteHref("fat-filled-milk-powder") },
  },
  {
    id: "whey-powder",
    title: "Whey Powders",
    description: "Sweet, demineralised and concentrated whey ingredients for food and nutrition.",
    image: "/media/products/dairy-milk-powders/whey-powder-light-v4.webp",
    imageAlt: "Golden liquid whey draining from fresh curds beside a commercial whey powder sample",
    decisionSummary: {
      lead: "Our whey powder range includes sweet whey powder, demineralised whey powder, and whey protein concentrates, including WPC 80. Produced from high quality liquid whey, these products provide excellent nutritional and functional properties. They are widely used in dairy products, bakery, confectionery, beverages, sports nutrition, and processed foods.",
      facts: [
        { title: "Protein concentrates", description: "WPC 30–35, WPC 60 and WPC 80 available options" },
        { title: "Whey powders", description: "Sweet whey and demineralised whey" },
        { title: "Specification", description: "Protein, fat and functional profile confirmed with each offer" },
      ],
      supply: detailedSupply,
    },
    cta: { label: "Request a whey powder offer", href: dairyQuoteHref("whey-powder") },
  },
  {
    id: "lactose",
    title: "Lactose",
    description: "High-quality milk sugar selected by form, purity and application.",
    image: "/media/products/dairy-milk-powders/lactose-light-v4.webp",
    imageAlt: "Macro view of bright crystalline lactose with clearly visible mineral-like facets",
    decisionSummary: {
      lead: "We supply high quality lactose for a wide range of food and nutritional applications. This dairy ingredient provides natural milk sugars and helps improve flavour and texture. It is commonly used in bakery, confectionery, dairy products, beverages, infant nutrition, and processed foods.",
      facts: [
        { title: "Product form", description: "Crystalline dairy ingredient" },
        { title: "Selection basis", description: "Form, purity and particle profile" },
        { title: "Specification", description: "Confirmed with each offer" },
      ],
      supply: detailedSupply,
    },
    cta: { label: "Request a lactose offer", href: dairyQuoteHref("lactose") },
  },
  {
    id: "dairy-whey-permeate",
    title: "Dairy / Whey Permeate",
    description: "Lactose-rich dairy solids selected by source, mineral profile and application.",
    image: "/media/products/dairy-milk-powders/dairy-whey-permeate-light-v4.webp",
    imageAlt: "Pale permeate powder with stainless membrane-filtration equipment and a mineral profile cue",
    decisionSummary: {
      lead: "We supply high quality dairy and whey permeate for a wide range of food and nutritional applications. These dairy ingredients help optimise production costs while contributing natural milk solids, flavour, and texture. They are commonly used in bakery, confectionery, dairy products, beverages, infant nutrition, and processed foods.",
      facts: [
        { title: "Source", description: "Dairy or whey permeate" },
        { title: "Selection basis", description: "Lactose, mineral and solids profile" },
        { title: "Specification", description: "Confirmed with each offer" },
      ],
      supply: detailedSupply,
    },
    cta: { label: "Request a permeate offer", href: dairyQuoteHref("dairy-whey-permeate") },
  },
  {
    id: "infant-grade-ingredients",
    title: "Infant Grade Ingredients",
    description: "Controlled dairy ingredients for wet- and dry-blend infant nutrition systems.",
    image: "/media/products/dairy-milk-powders/infant-grade-ingredients-light-v4.webp",
    imageAlt: "Infant-grade dairy powder in a sealed silver industrial bag inside a sterile quality environment",
    decisionSummary: {
      lead: "Our infant grade dairy ingredients are produced to meet the strict quality and safety standards required for infant nutrition. We offer a range of dairy derivatives suitable for both wet blend and dry blend infant formula production. With consistent quality and full compliance with infant grade requirements, our ingredients provide reliable performance for manufacturers of infant nutrition products.",
      facts: [
        { title: "Production fit", description: "Wet blend or dry blend" },
        { title: "Approval basis", description: "Infant-grade quality and safety requirements" },
        { title: "Documentation", description: "Specification and compliance package confirmed with each offer" },
      ],
      supply: detailedSupply,
    },
    cta: { label: "Request an infant grade ingredient offer", href: dairyQuoteHref("infant-grade-ingredients") },
  },
  {
    id: "butter",
    title: "Butter",
    description: "Premium pasteurised-cream butter supplied in retail and industrial formats.",
    image: "/media/products/dairy-milk-powders/butter-light-v4.webp",
    imageAlt: "Commercial butter presented as clean blocks, sheets and portion formats",
    decisionSummary: {
      lead: "Our butter is produced from pasteurised cream and offers the rich flavour and performance expected from a premium dairy product. It is widely used in bakery, confectionery, food manufacturing, and culinary applications. Available in various formats, it delivers consistent quality, excellent texture, and outstanding taste.",
      facts: [
        { title: "Milk fat", description: "82% minimum available option" },
        { title: "Packaging", description: "Available options from 200 g to 25 kg" },
        { title: "Formats", description: "Blocks, sheets or portions" },
      ],
      supply: detailedSupply,
    },
    cta: { label: "Request a butter offer", href: dairyQuoteHref("butter") },
  },
  {
    id: "cheese",
    title: "Cheese",
    description: "Natural cheeses selected by variety, format, flavour and functional performance.",
    image: "/media/products/dairy-milk-powders/cheese-light-v4.webp",
    imageAlt: "Mozzarella, Edam, Gouda and Cheddar varieties presented in distinct commercial formats",
    decisionSummary: {
      lead: "We supply a wide range of natural cheeses, including popular varieties such as Mozzarella, Edam, Gouda, Cheddar, and many others. Our cheeses are available in various formats to meet the needs of food manufacturers, wholesalers, and the food service sector. They deliver excellent flavour, texture, and melting performance across a wide range of applications.",
      facts: [
        { title: "Popular varieties", description: "Mozzarella, Edam, Gouda and Cheddar" },
        { title: "Formats", description: "Blocks, slices, shreds or portions" },
        { title: "Performance", description: "Flavour, texture and melting profile confirmed with each offer" },
      ],
      supply: detailedSupply,
    },
    cta: { label: "Request a cheese offer", href: dairyQuoteHref("cheese") },
  },
  {
    id: "cheese-analogues",
    title: "Cheese Like (Analog) Products",
    cardTitle: "Cheese Like Products",
    description: "Cost-effective cheese-like products engineered for melt, stretch and slicing.",
    image: "/media/products/dairy-milk-powders/cheese-analogues-light-v4.webp",
    imageAlt: "Uniform cheese-like blocks, precise slices and shreds shown in a controlled melting test",
    decisionSummary: {
      lead: "Our cheese like products are a cost effective alternative to traditional cheese, made from skimmed cow's milk and selected vegetable fats. They offer excellent melting, stretching, and slicing properties while delivering a taste and appearance similar to natural cheese. They are ideal for pizzas, sandwiches, ready meals, bakery products, and other food service applications.",
      facts: [
        { title: "Product system", description: "Skimmed cow's milk and selected vegetable fats" },
        { title: "Performance", description: "Melting, stretching and slicing" },
        { title: "Applications", description: "Pizza, sandwiches, ready meals and bakery" },
      ],
      supply: detailedSupply,
    },
    cta: { label: "Request a cheese like product offer", href: dairyQuoteHref("cheese-analogues") },
  },
  {
    id: "uht-milk",
    title: "UHT Milk",
    description: "Shelf-stable aseptic milk for retail, food service and industrial applications.",
    image: "/media/products/dairy-milk-powders/uht-milk-light-v4.webp",
    imageAlt: "Unbranded aseptic UHT milk cartons arranged with clean industrial shipping cases",
    decisionSummary: {
      lead: "UHT milk is heat treated to achieve a long shelf life while maintaining its nutritional value and fresh dairy taste. It is suitable for retail, food service, and industrial food production. Its stability and convenience make it an ideal choice for storage, transport, and a wide range of food and beverage applications.",
      facts: [
        { title: "Available classes", description: "Whole, semi-skimmed or skimmed" },
        { title: "Packaging", description: "Aseptic shelf-stable cartons" },
        { title: "Applications", description: "Retail, food service and industrial production" },
      ],
      supply: detailedSupply,
    },
    cta: { label: "Request a UHT milk offer", href: dairyQuoteHref("uht-milk") },
  },
];

const dairyRelated = ["cocoa-products", "oils-fats", "starches-sweeteners"]
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
  return buildMetadata(dairySeo);
}

export default function DairyMilkPowdersPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <JsonLd
        data={productFamilyJsonLd({
          title: "Dairy & Milk Powders",
          summary:
            "Milk powders, whey and speciality dairy ingredients, butter, cheese products and UHT milk connected to industrial demand through a global supply network.",
          href: "/en/products/dairy-milk-powders",
          image: "/media/products/dairy-milk-powders/dairy-hero-pasture-stock-v1.webp",
        })}
      />
      <ProductDetailLayout
        pageTreatment="polished"
        breadcrumb={breadcrumb}
        hero={{
          title: "Dairy & Milk Powders: The Essential Link in Global Nutrition",
          text: [
            "Synchronizing world-class production with industrial demand.",
            "A3 acts as a pivotal force in the international dairy value chain, continuously creating innovative supply solutions that bridge the distance between global dairy suppliers and professional customers. By integrating over six decades of collective industry heritage with real-time market intelligence, we add distinctive value to your procurement through high-quality derivatives and tailor-made risk management.",
          ],
          image: "/media/products/dairy-milk-powders/dairy-hero-pasture-stock-v1.webp",
          imageAlt: "Holstein dairy cows grazing together in a green pasture",
          hideBreadcrumb: true,
          variant: "compact",
        }}
        sectionNavigation={[
          { label: "Overview", href: "#overview" },
          { label: "Products", href: "#range" },
          { label: "Origination", href: "#services" },
          { label: "Trade Process", href: "#trade-process" },
          { label: "Contact", href: "#contact" },
        ]}
        productPortfolio={{
          id: "range",
          title: "A Portfolio of Technical Precision",
          text: "We provide a comprehensive range of essential milk powders, dairy ingredients, and liquid dairy, available in a variety of specifications and pack sizes to suit any industrial application.",
          cardTreatment: "category-overlay",
          compactCardCopy: true,
          filters: [
            {
              id: "milk-powders",
              label: "Milk Powders",
              itemIds: [
                "whole-milk-powder",
                "skimmed-milk-powder",
                "buttermilk-powder",
                "instant-milk-powder",
                "fat-filled-milk-powder",
              ],
            },
            {
              id: "whey-speciality-ingredients",
              label: "Whey & Speciality Ingredients",
              itemIds: ["whey-powder", "lactose", "dairy-whey-permeate", "infant-grade-ingredients"],
            },
            {
              id: "dairy-products",
              label: "Dairy Products",
              itemIds: ["butter", "cheese", "cheese-analogues", "uht-milk"],
            },
          ],
          items: dairyPortfolioItems,
        }}
        services={{
          title: "Strategic Origination & Supply Security",
          text: "We oversee the entire dairy market through a strong global business network, ensuring the best dairy product arrives anywhere in the world, on time.",
          variant: "media-grid",
          items: [
            {
              title: "The European Heartland",
              description:
                "Partnering with the largest dairy groups in Central and Eastern Europe to leverage over 80 years of expertise in Polish milk production.",
              imageSrc: "/media/products/dairy-milk-powders/origination-europe-dairy-user-v1.webp",
              imageAlt: "Dairy farmer standing among Holstein cows inside a modern barn",
            },
            {
              title: "South American Grass-Fed Excellence",
              description:
                "Sourcing from traditional cooperatives in Uruguay and Argentina that specialize in natural, grass-fed ingredients with international certifications.",
              imageSrc: "/media/products/dairy-milk-powders/origination-south-america-grass-fed-user-v1.webp",
              imageAlt: "Grazing horse on an Argentine grassland beneath snow-covered mountains",
            },
            {
              title: "Innovative Manufacturing Hubs",
              description:
                "Collaborating with pioneers in Türkiye and China to offer specialized HoReCa and ice cream powders.",
              imageSrc: "/media/products/dairy-milk-powders/origination-manufacturing-hubs-user-v1.webp",
              imageAlt: "Milk tankers unloading at a dairy processing facility in Türkiye",
            },
          ],
        }}
        servicesPosition="before-shipment"
        shipmentOptions={{
          id: "trade-process",
          title: "How A3 Calibrates Your Trade",
          text: "Our sourcing workflow is designed to move each trade forward with clarity, reducing friction for wholesalers and manufacturers alike.",
          image: "/media/products/dairy-milk-powders/dairy-service-product-matching-stock-v1.webp",
          imageAlt: "Stainless dairy processing equipment inside a milk production facility",
          items: [
            {
              title: "Requirement Calibration",
              description:
                "We analyze your specific technical needs—from protein levels to vitaminisation—to ensure a perfect match for your industrial use case.",
              image: "/media/products/dairy-milk-powders/dairy-service-product-matching-stock-v1.webp",
              imageAlt: "Stainless dairy processing equipment inside a milk production facility",
            },
            {
              title: "Origin Integration",
              description:
                "We identify supplier options across our global network that align with your required volume, origin, and commercial fit.",
              image: "/media/products/dairy-milk-powders/dairy-hero-pasture-stock-v1.webp",
              imageAlt: "Holstein dairy cows grazing together in a green pasture",
            },
            {
              title: "Technical Vetting",
              description:
                "We verify all certifications and documentation, ensuring every lot meets ISO, HACCP, Halal, or Kosher standards before moving forward.",
              image: "/media/products/dairy-milk-powders/dairy-service-quality-stock-v1.webp",
              imageAlt: "Laboratory technician handling dairy quality samples in test tubes",
            },
            {
              title: "Commercial Structuring",
              description:
                "We coordinate pricing and payment terms, providing smart logistics and risk management solutions to protect your bottom line.",
              image: "/media/products/dairy-milk-powders/dairy-service-route-stock-v1.webp",
              imageAlt: "Clean food storage room illustrating controlled-temperature handling",
            },
            {
              title: "Execution Excellence",
              description:
                "We manage the end-to-end follow-up, from the farmgate to final delivery, ensuring total supply chain transparency.",
              image: "/media/products/dairy-milk-powders/dairy-service-shipment-stock-v1.webp",
              imageAlt: "Cargo vessel and containers at a commercial shipping terminal",
            },
          ],
        }}
        related={dairyRelated}
        finalCta={{
          title: "For dairy & milk powder enquiries",
          text: "Share the product, application, protein and fat targets, packing, volume, destination and shipment window with A3.",
          primary: { label: "Discuss a dairy requirement", href: dairyQuoteHref() },
          variant: "compact-reminder",
        }}
      />
    </>
  );
}
