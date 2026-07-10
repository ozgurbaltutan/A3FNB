import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailLayout } from "@/components/product-detail-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { getProductCategory, homeAssets, homeLanding, productCategories, productCategoryHref } from "@/content/site";
import type { PageSeo, ProductCategory } from "@/lib/types";
import { breadcrumbJsonLd, buildMetadata, productFamilyJsonLd } from "@/lib/seo";

const robots = { index: true, follow: true };

const relatedByCategory: Record<string, string[]> = {
  "cocoa-products": ["dairy-milk-powders", "oils-fats", "consumer-foods"],
  "grains-seeds": ["sugar", "oils-fats", "starches-sweeteners"],
  "dairy-milk-powders": ["cocoa-products", "oils-fats", "consumer-foods"],
  "oils-fats": ["dairy-milk-powders", "cocoa-products", "frozen-foods"],
  "starches-sweeteners": ["sugar", "dairy-milk-powders", "consumer-foods"],
  "dried-fruit-nuts": ["consumer-foods", "cocoa-products", "frozen-foods"],
  "frozen-foods": ["consumer-foods", "oils-fats", "request"],
  "consumer-foods": ["frozen-foods", "oils-fats", "elle-mina"],
};

type OfferingInput = {
  title: string;
  description: string;
  facts: { parameter: string; specification: string }[];
};

function categorySeo(category: ProductCategory): PageSeo {
  return {
    metaTitle: `${category.title} Sourcing | A3 Food & Beverage`,
    metaDescription: category.shortDescription,
    canonicalPath: productCategoryHref(category),
    ogTitle: `${category.title} Sourcing`,
    ogDescription: category.longDescription,
    robots,
    locale: "en",
    sitemapInclude: true,
    structuredDataType: "Product",
    targetKeyword: `${category.title.toLowerCase()} sourcing`,
    secondaryKeywords: [`${category.title.toLowerCase()} supplier`, "commercial food sourcing", "B2B food sourcing"],
  };
}

function categoryBreadcrumb(category: ProductCategory) {
  return [
    { label: "Home", href: "/en" },
    { label: "Products", href: "/en/products" },
    { label: category.title, href: productCategoryHref(category) },
  ];
}

function categoryImage(category: ProductCategory) {
  const featuredProduct = homeLanding.featuredProducts.find((product) => product.id === category.slug);

  if (featuredProduct?.image) return featuredProduct.image;
  if (!category.imageKey) return homeAssets.media.companyFoodFeastEditorial;

  return homeAssets.media[category.imageKey as keyof typeof homeAssets.media];
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function quoteHref(category: ProductCategory, product?: string) {
  const params = new URLSearchParams({ category: category.slug });
  if (product) params.set("product", slugify(product));
  return `/en/request-a-quote?${params.toString()}`;
}

function compactOfferingDescription(description: string) {
  return description
    .replace(/ requirements reviewed by /g, " by ")
    .replace(/ options reviewed by /g, " by ")
    .replace(/ products reviewed by /g, " products by ")
    .replace(/ reviewed by /g, " by ")
    .replace(/ reviewed for /g, " for ")
    .replace(/ reviewed according to /g, " according to ");
}

function offeringsFor(category: ProductCategory): OfferingInput[] {
  const bySlug: Record<string, OfferingInput[]> = {
    "cocoa-products": [
      {
        title: "Cocoa Beans",
        description: "Cocoa bean requirements reviewed by origin, quality expectation, documentation and shipment route.",
        facts: [
          { parameter: "Review focus", specification: "Origin, grade, quality and documents" },
          { parameter: "Common fit", specification: "Processing, trading and ingredient programs" },
        ],
      },
      {
        title: "Cocoa Powder",
        description: "Cocoa powder options reviewed by application, colour, fat level, alkalized or natural profile and packing.",
        facts: [
          { parameter: "Review focus", specification: "Application, colour, fat and specification" },
          { parameter: "Common fit", specification: "Bakery, beverages, desserts and confectionery" },
        ],
      },
      {
        title: "Cocoa Butter",
        description: "Cocoa butter requirements reviewed by format, quality, certification and commercial use case.",
        facts: [
          { parameter: "Review focus", specification: "Format, quality and certification" },
          { parameter: "Common fit", specification: "Chocolate, confectionery and specialty applications" },
        ],
      },
      {
        title: "Cocoa Liquor",
        description: "Cocoa liquor requirements reviewed by product specification, origin options, packing and destination market.",
        facts: [
          { parameter: "Review focus", specification: "Specification, origin and packing" },
          { parameter: "Common fit", specification: "Chocolate and industrial cocoa applications" },
        ],
      },
    ],
    "grains-seeds": [
      {
        title: "Wheat",
        description: "Wheat requirements reviewed by grade, origin, shipment model, documentation and destination market.",
        facts: [
          { parameter: "Review focus", specification: "Grade, origin, shipment and documents" },
          { parameter: "Common fit", specification: "Milling, wholesale and food manufacturing" },
        ],
      },
      {
        title: "Corn",
        description: "Corn requirements reviewed by crop, quality expectation, origin availability and shipment route.",
        facts: [
          { parameter: "Review focus", specification: "Crop, quality, volume and route" },
          { parameter: "Common fit", specification: "Food manufacturing, feed-adjacent and wholesale" },
        ],
      },
      {
        title: "Sunflower Seed",
        description: "Sunflower seed options reviewed by origin, grade, application and commercial shipment fit.",
        facts: [
          { parameter: "Review focus", specification: "Origin, grade and application" },
          { parameter: "Common fit", specification: "Processing, wholesale and ingredient use" },
        ],
      },
    ],
    "dairy-milk-powders": [
      {
        title: "Whole Milk Powder",
        description: "Whole milk powder requirements reviewed by fat content, application, certification and packing.",
        facts: [
          { parameter: "Review focus", specification: "Fat content, certification and packing" },
          { parameter: "Common fit", specification: "Bakery, beverages, dairy and confectionery" },
        ],
      },
      {
        title: "Skimmed Milk Powder",
        description: "Skimmed milk powder requirements reviewed by protein, application, origin and destination needs.",
        facts: [
          { parameter: "Review focus", specification: "Protein, specification and documents" },
          { parameter: "Common fit", specification: "Food manufacturing, bakery and beverages" },
        ],
      },
      {
        title: "Dairy Ingredients",
        description: "Dairy ingredient requirements reviewed by product type, functional use, certification and commercial fit.",
        facts: [
          { parameter: "Review focus", specification: "Function, specification and certification" },
          { parameter: "Common fit", specification: "Manufacturing, foodservice and ingredient programs" },
        ],
      },
    ],
    "oils-fats": [
      {
        title: "Sunflower Oil",
        description: "Sunflower oil options reviewed by refined or crude profile, packing, channel and destination market.",
        facts: [
          { parameter: "Review focus", specification: "Oil profile, packing and destination" },
          { parameter: "Common fit", specification: "Retail, foodservice and manufacturing" },
        ],
      },
      {
        title: "Olive Oil",
        description: "Olive oil requirements reviewed by product grade, packing, brand or private-label fit and market route.",
        facts: [
          { parameter: "Review focus", specification: "Grade, packing and channel" },
          { parameter: "Common fit", specification: "Retail, wholesale and foodservice" },
        ],
      },
      {
        title: "Palm Olein",
        description: "Palm olein requirements reviewed by application, packing format, documentation and destination conditions.",
        facts: [
          { parameter: "Review focus", specification: "Application, packing and documents" },
          { parameter: "Common fit", specification: "Foodservice, frying and manufacturing" },
        ],
      },
      {
        title: "Specialty Fats",
        description: "Specialty fats reviewed by function, application, melting profile, format and certification needs.",
        facts: [
          { parameter: "Review focus", specification: "Function, format and certification" },
          { parameter: "Common fit", specification: "Bakery, confectionery and dairy alternatives" },
        ],
      },
    ],
    "starches-sweeteners": [
      {
        title: "Corn Starch",
        description: "Corn starch requirements reviewed by application, specification, packing and destination market.",
        facts: [
          { parameter: "Review focus", specification: "Application, specification and packing" },
          { parameter: "Common fit", specification: "Food manufacturing, sauces, bakery and dry mixes" },
        ],
      },
      {
        title: "Modified Starches",
        description: "Modified starch options reviewed by functional performance, process conditions and application fit.",
        facts: [
          { parameter: "Review focus", specification: "Function, performance and application" },
          { parameter: "Common fit", specification: "Sauces, dairy, frozen foods and bakery" },
        ],
      },
      {
        title: "Maltodextrin",
        description: "Maltodextrin requirements reviewed by DE range, application, packing and document needs.",
        facts: [
          { parameter: "Review focus", specification: "DE range, application and documentation" },
          { parameter: "Common fit", specification: "Beverages, dry mixes and food manufacturing" },
        ],
      },
      {
        title: "Glucose Syrup",
        description: "Glucose syrup options reviewed by solids, DE, application, logistics and packing format.",
        facts: [
          { parameter: "Review focus", specification: "DE, solids, logistics and packing" },
          { parameter: "Common fit", specification: "Confectionery, bakery and beverages" },
        ],
      },
      {
        title: "Fructose Syrup",
        description: "Fructose syrup requirements reviewed by sweetness target, application, format and shipment conditions.",
        facts: [
          { parameter: "Review focus", specification: "Sweetness, application and shipment" },
          { parameter: "Common fit", specification: "Beverages and food manufacturing" },
        ],
      },
    ],
    "dried-fruit-nuts": [
      {
        title: "Dried Fruits",
        description: "Dried fruit requirements reviewed by type, origin, grade, moisture, packing and application.",
        facts: [
          { parameter: "Review focus", specification: "Type, origin, grade and packing" },
          { parameter: "Common fit", specification: "Bakery, snacking, retail and manufacturing" },
        ],
      },
      {
        title: "Raisins",
        description: "Raisin options reviewed by origin, grade, colour, application and shipment route.",
        facts: [
          { parameter: "Review focus", specification: "Origin, grade, colour and documents" },
          { parameter: "Common fit", specification: "Bakery, cereal, retail and snack use" },
        ],
      },
      {
        title: "Nuts",
        description: "Nut requirements reviewed by type, format, origin, grade, certification and packing.",
        facts: [
          { parameter: "Review focus", specification: "Type, format, origin and grade" },
          { parameter: "Common fit", specification: "Snacking, bakery, confectionery and foodservice" },
        ],
      },
      {
        title: "Application-specific Grades",
        description: "Application-specific dried fruit and nut grades reviewed for production needs, format and commercial fit.",
        facts: [
          { parameter: "Review focus", specification: "Application, format and specification" },
          { parameter: "Common fit", specification: "Food manufacturing and private-label programs" },
        ],
      },
    ],
    "frozen-foods": [
      {
        title: "Frozen Vegetables",
        description: "Frozen vegetable options reviewed by cut, pack size, temperature-control needs and channel fit.",
        facts: [
          { parameter: "Review focus", specification: "Cut, pack size, storage and channel" },
          { parameter: "Common fit", specification: "Foodservice, retail and manufacturing" },
        ],
      },
      {
        title: "Frozen Fruits",
        description: "Frozen fruit requirements reviewed by fruit type, format, packing, application and cold-chain route.",
        facts: [
          { parameter: "Review focus", specification: "Fruit type, format and cold chain" },
          { parameter: "Common fit", specification: "Bakery, beverages, desserts and retail" },
        ],
      },
      {
        title: "Frozen Potato Products",
        description: "Frozen potato products reviewed by cut, format, foodservice performance, packing and storage needs.",
        facts: [
          { parameter: "Review focus", specification: "Format, storage and foodservice fit" },
          { parameter: "Common fit", specification: "Foodservice, retail and distribution" },
        ],
      },
      {
        title: "Frozen Bakery",
        description: "Frozen bakery requirements reviewed by product type, pack size, preparation method and channel route.",
        facts: [
          { parameter: "Review focus", specification: "Product type, pack size and preparation" },
          { parameter: "Common fit", specification: "Foodservice, retail and wholesale" },
        ],
      },
    ],
    "consumer-foods": [
      {
        title: "Pasta",
        description: "Pasta requirements reviewed by format, brand or private-label fit, pack size and target market.",
        facts: [
          { parameter: "Review focus", specification: "Format, pack size and target channel" },
          { parameter: "Common fit", specification: "Retail, wholesale and foodservice" },
        ],
      },
      {
        title: "Sauces",
        description: "Sauce requirements reviewed by product type, recipe fit, packing, shelf life and destination market.",
        facts: [
          { parameter: "Review focus", specification: "Product type, packing and shelf life" },
          { parameter: "Common fit", specification: "Retail, foodservice and private label" },
        ],
      },
      {
        title: "Condiments",
        description: "Condiment options reviewed by format, channel, label needs, carton configuration and commercial fit.",
        facts: [
          { parameter: "Review focus", specification: "Format, channel and label needs" },
          { parameter: "Common fit", specification: "Retail, foodservice and distribution" },
        ],
      },
      {
        title: "Canned Foods",
        description: "Canned food requirements reviewed by product family, can size, shelf life, documents and market fit.",
        facts: [
          { parameter: "Review focus", specification: "Can size, shelf life and documents" },
          { parameter: "Common fit", specification: "Retail, wholesale and institutional buyers" },
        ],
      },
      {
        title: "Tomato Paste",
        description: "Tomato paste requirements reviewed by Brix, packing format, channel and destination market.",
        facts: [
          { parameter: "Review focus", specification: "Brix, packing and destination" },
          { parameter: "Common fit", specification: "Foodservice, retail and manufacturing" },
        ],
      },
    ],
  };

  return bySlug[category.slug] ?? category.exampleProducts.map((product) => ({
    title: product,
    description: `${product} requirements organized by specification, packing, documents and commercial fit.`,
    facts: [
      { parameter: "Review focus", specification: "Specification, packing and documents" },
      { parameter: "Common fit", specification: "Commercial sourcing by inquiry" },
    ],
  }));
}

function factValue(facts: OfferingInput["facts"], parameter: string) {
  return facts.find((fact) => fact.parameter.toLowerCase() === parameter.toLowerCase())?.specification;
}

function sourceForCategory(category: ProductCategory) {
  if (category.slug === "grains-seeds") return "Crop and origin by requirement";
  if (category.slug === "frozen-foods") return "Producer and route by requirement";
  if (category.slug === "consumer-foods") return "Brand, producer or private label";
  return "Selected origins by requirement";
}

function packingForCategory(category: ProductCategory) {
  if (category.slug === "frozen-foods") {
    return "Pack size, carton format and cold-chain handling reviewed by requirement.";
  }

  if (category.slug === "consumer-foods") {
    return "Retail, foodservice or wholesale packing reviewed with label and market fit.";
  }

  return "Supplier-specific packing reviewed by volume, route and buyer requirement.";
}

function productPortfolioFor(category: ProductCategory) {
  const image = categoryImage(category);

  return {
    id: "range",
    title: `${category.title} portfolio`,
    text: `Explore ${category.title.toLowerCase()} options organized by product type, application, packing and commercial requirement.`,
    items: offeringsFor(category).map((offering) => {
      const commonFit = factValue(offering.facts, "Common fit") ?? factValue(offering.facts, "Applications") ?? category.shortDescription;
      const source = sourceForCategory(category);
      const packing = packingForCategory(category);

      return {
        id: slugify(offering.title),
        title: offering.title,
        description: compactOfferingDescription(offering.description),
        image,
        imageAlt: `${offering.title} within ${category.title} sourcing`,
        source,
        fit: commonFit,
        overview: offering.description,
        keyDetails: [
          { title: "Source", description: source },
          { title: "Typical uses", description: commonFit },
          { title: "Packing", description: packing },
        ],
        applications: [commonFit],
        packing: [
          { title: "Packing", description: packing },
          { title: "Commercial fit", description: "Volume, destination and documentation needs are reviewed before quotation." },
        ],
        origin: [
          { title: "Source", description: source },
          { title: "Route context", description: "Destination market, shipment route and document needs are checked by inquiry." },
        ],
        cta: { label: "Request this product", href: quoteHref(category, offering.title) },
      };
    }),
  };
}

function shipmentOptionsFor(category: ProductCategory) {
  if (category.slug === "frozen-foods") {
    return {
      title: "Packing and shipment context",
      text: "Cold-chain requirements, storage expectations and destination route shape whether a frozen food option can move forward.",
      image: categoryImage(category),
      imageAlt: `${category.title} packing and shipment review`,
      items: [
        { title: "Temperature control", description: "Share storage and handling expectations so cold-chain route and supplier fit can be reviewed." },
        { title: "Pack size and channel", description: "Include carton format, pack size and whether the need is retail, foodservice or distribution-led." },
        { title: "Destination route", description: "Destination market, port and timing define the shipment review before quotation." },
        { title: "Documents", description: "Product specifications, origin documents and shipment paperwork are checked by request where needed." },
      ],
    };
  }

  if (category.slug === "consumer-foods") {
    return {
      title: "Packing and market fit",
      text: "Consumer food requirements depend on pack format, shelf life, label needs, channel and destination market expectations.",
      image: categoryImage(category),
      imageAlt: `${category.title} packing and market fit review`,
      items: [
        { title: "Pack format", description: "Share retail, foodservice or wholesale packing expectations, including size and carton configuration." },
        { title: "Label and market needs", description: "Destination market, language, shelf-life and private-label context are reviewed before quotation." },
        { title: "Commercial route", description: "Volume, timing, channel and shipment route shape whether a workable supply path is available." },
        { title: "Documents", description: "Specifications and supporting supplier-held documents are checked according to buyer and market needs." },
      ],
    };
  }

  return {
    title: "Packing and shipment context",
    text: "Packing format, volume, destination and document needs define whether a sourcing option is commercially workable.",
    image: categoryImage(category),
    imageAlt: `${category.title} packing and shipment review`,
    items: [
      { title: "Product format", description: "Share product type, grade or format so supplier capability can be checked against the requirement." },
      { title: "Packing and volume", description: "Include preferred packing, expected volume, order model and timing." },
      { title: "Destination route", description: "Destination market and port help A3 review route, availability and shipment terms." },
      { title: "Documents if needed", description: "Specification, certificate, origin or shipment documents are reviewed by request." },
    ],
  };
}

function relatedCategories(category: ProductCategory) {
  const relatedSlugs = relatedByCategory[category.slug] ?? [];
  const links = relatedSlugs.map((slug) => {
    if (slug === "request") return { label: "Request a Quote", href: "/en/request-a-quote" };
    if (slug === "elle-mina") return { label: "Elle Mina", href: "/en/products/elle-mina" };
    const related = productCategories.find((item) => item.slug === slug);
    return related ? { label: related.title, href: productCategoryHref(related) } : null;
  }).filter(Boolean) as { label: string; href: string }[];

  if (links.length) return links;

  return [
    ...productCategories
      .filter((item) => item.slug !== category.slug)
      .slice(0, 2)
      .map((item) => ({ label: item.title, href: productCategoryHref(item) })),
    { label: "Request a Quote", href: "/en/request-a-quote" },
  ];
}

export function generateStaticParams() {
  return productCategories
    .filter((category) => !["green-coffee-beans", "sugar"].includes(category.slug))
    .map((category) => ({ locale: "en", category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getProductCategory(slug);

  if (!category) return {};

  return buildMetadata(categorySeo(category));
}

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = getProductCategory(slug);

  if (!category || ["green-coffee-beans", "sugar"].includes(category.slug)) {
    notFound();
  }

  const breadcrumb = categoryBreadcrumb(category);
  const image = categoryImage(category);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <JsonLd
        data={productFamilyJsonLd({
          title: category.title,
          summary: category.shortDescription,
          href: productCategoryHref(category),
          imageAlt: `${category.title} sourcing category for commercial food buyers`,
        })}
      />
      <ProductDetailLayout
        breadcrumb={breadcrumb}
        hero={{
          title: category.title,
          text: [
            category.longDescription,
            "A3 organizes the conversation around product type, commercial use, packing format, volume, destination and document needs.",
          ],
          image,
          imageAlt: `${category.title} sourcing category for commercial food buyers`,
          hideBreadcrumb: true,
          variant: "compact",
        }}
        productPortfolio={productPortfolioFor(category)}
        shipmentOptions={shipmentOptionsFor(category)}
        related={relatedCategories(category)}
        finalCta={{
          title: `Send a ${category.title.toLowerCase()} requirement.`,
          text:
            "Share product type, packing format, volume and destination market.",
          primary: { label: category.ctaLabel, href: quoteHref(category) },
          secondary: { label: "View All Products", href: "/en/products" },
          image: categoryImage(category),
          imageAlt: `${category.title} sourcing requirement review`,
        }}
      />
    </>
  );
}
