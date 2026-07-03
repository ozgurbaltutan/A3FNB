import type {
  MarketRegion,
  NavigationItem,
  PageContent,
  ProductDetail,
  ProductFamily,
  ResourceItem,
  ServiceItem,
} from "@/lib/types";

const robots = { index: true, follow: true };

export const supportedLocales = ["en", "fr", "es"] as const;
export const activeLocale = "en";

export const company = {
  name: "A3 Food & Beverage",
  legalName: "A3 Food & Beverage LTD",
  positioning:
    "A UK-headquartered food sourcing and trade partner connecting selected producers with commercial buyers across selected international markets.",
  companyNumber: "14317783",
  vatNumber: "480103919",
  dunsNumber: "229472875",
  email: "info@a3fnb.com",
  phone: "+44 7393 680611",
  registeredOffice: {
    street: "Unit 408 Screenworks 22 Highbury Grove",
    city: "London",
    postalCode: "N5 2ER",
    country: "GB",
    display: "Unit 408 Screenworks 22 Highbury Grove, London, England, N5 2ER",
  },
};

export const navigation: NavigationItem[] = [
  { label: "Home", href: "/en" },
  {
    label: "Products",
    href: "/en/products",
    featured: true,
    children: [
      { label: "Coffee", href: "/en/products/coffee", featured: true },
      { label: "Sugar", href: "/en/products/sugar", featured: true },
      { label: "Sweeteners & Syrups", href: "/en/products#sweeteners-syrups" },
      { label: "Edible Oils & Fats", href: "/en/products#edible-oils-fats" },
      { label: "Starches & Industrial Ingredients", href: "/en/products#starches-industrial-ingredients" },
      { label: "Dairy Ingredients", href: "/en/products#dairy-ingredients" },
      { label: "Frozen Foods", href: "/en/products#frozen-foods" },
      { label: "Canned Foods", href: "/en/products#canned-foods" },
      { label: "Consumer Foods", href: "/en/products#consumer-foods" },
    ],
  },
  { label: "Markets & Sourcing", href: "/en/markets-sourcing" },
  { label: "How We Work", href: "/en/how-we-work" },
  { label: "About", href: "/en/about" },
  { label: "Resources", href: "/en/resources" },
  { label: "Contact", href: "/en/contact" },
];

export const homeAssets = {
  media: {
    companyTradeSnapshot: "/media/home/company-trade-snapshot.webp",
    featuredCoffee: "/media/home/featured-coffee.webp",
    howA3Works: "/media/home/how-a3-works.webp",
    finalCta: "/media/home/final-cta.webp",
    heroVideo: "/media/hero.webm",
  },
  icons: {
    sourceProducers: "/icons/home/source-producers.svg",
    reviewDocuments: "/icons/home/review-documents.svg",
    coordinateTrade: "/icons/home/coordinate-trade.svg",
    greenCoffee: "/icons/home/green-coffee.svg",
    arrowRight: "/icons/home/arrow-right.svg",
    sugar: "/icons/home/sugar.svg",
    frozenFoods: "/icons/home/frozen-foods.svg",
    sweetenersSyrups: "/icons/home/sweeteners-syrups.svg",
    edibleOilsFats: "/icons/home/edible-oils-fats.svg",
    starchesIndustrial: "/icons/home/starches-industrial.svg",
    dairyIngredients: "/icons/home/dairy-ingredients.svg",
    cannedFoods: "/icons/home/canned-foods.svg",
    consumerFoods: "/icons/home/consumer-foods.svg",
    marketsMap: "/icons/home/markets-map.svg",
    processSource: "/icons/home/process-source.svg",
    processVerify: "/icons/home/process-verify.svg",
    processMatch: "/icons/home/process-match.svg",
    processCoordinate: "/icons/home/process-coordinate.svg",
    processFollowThrough: "/icons/home/process-follow-through.svg",
    buyerWholesalers: "/icons/home/buyer-wholesalers.svg",
    buyerManufacturers: "/icons/home/buyer-manufacturers.svg",
    buyerRetailFoodservice: "/icons/home/buyer-retail-foodservice.svg",
    resourceCoffeeCatalogue: "/icons/home/resource-coffee-catalogue.svg",
    resourceCompanyProfile: "/icons/home/resource-company-profile.svg",
    resourceDocumentation: "/icons/home/resource-documentation.svg",
  },
} as const;

export const homeLanding = {
  hero: {
    title: "Source food products from trusted producers.",
    text:
      "A3 Food & Beverage helps wholesalers, importers, distributors and food businesses source products such as coffee, sugar, edible oils and packaged foods. We support the process from supplier communication and product documents to shipment coordination.",
    primary: { label: "Request a Quote", href: "/en/contact" },
    secondary: { label: "Explore Products", href: "/en/products" },
  },
  companySnapshot: {
    title: "A3 Food & Beverage",
    text:
      "Established in 1997 and headquartered in London, A3 Food & Beverage is a UK-based food trade partner connecting selected producers, suppliers and commercial buyers across international markets. The company supports product options, supplier communication, documentation review and shipment follow-up based on buyer requirements.",
    image: homeAssets.media.companyTradeSnapshot,
    imageAlt: "Food sourcing coordination table with packaged products, samples and trade documents",
  },
  sourcingSteps: [
    {
      title: "Selected producer options",
      description:
        "Suitable producer and supplier options are reviewed by origin, grade, packing and buyer requirement.",
      icon: homeAssets.icons.sourceProducers,
    },
    {
      title: "Product checks and documents",
      description:
        "Product details, certificates, packing options and key documents are checked before quotation.",
      icon: homeAssets.icons.reviewDocuments,
    },
    {
      title: "Trade follow-up",
      description:
        "Supplier communication, trade terms and shipment follow-up are managed from origin to destination.",
      icon: homeAssets.icons.coordinateTrade,
    },
  ],
  featuredProducts: [
    {
      id: "coffee",
      title: "Green Coffee Beans",
      description:
        "Green coffee beans sourced by origin, profile and grade, including Brazilian and South American options.",
      href: "/en/products/coffee",
      icon: homeAssets.icons.greenCoffee,
      image: homeAssets.media.featuredCoffee,
      imageAlt: "Green coffee beans shown as a featured sourcing category",
      featured: true,
    },
    {
      id: "sugar",
      title: "Sugar",
      description:
        "Cane and beet sugar sourced by origin and ICUMSA grade, including Brazilian cane sugar.",
      href: "/en/products/sugar",
      icon: homeAssets.icons.sugar,
      image: "/media/home/featured-sugar.webp",
      imageAlt: "Sugar samples and commercial sacks prepared for sourcing review",
    },
    {
      id: "frozen-foods",
      title: "Frozen Foods",
      description:
        "Frozen food sourcing by product and temperature-control needs for commercial buyers.",
      href: "/en/products#frozen-foods",
      icon: homeAssets.icons.frozenFoods,
      image: "/media/home/featured-frozen-foods.webp",
      imageAlt: "Frozen food samples and cold-chain packaging prepared for buyer review",
    },
    {
      id: "sweeteners-syrups",
      title: "Sweeteners & Syrups",
      description:
        "Glucose syrup, fructose syrup and selected sweeteners reviewed by application and packing.",
      href: "/en/products#sweeteners-syrups",
      icon: homeAssets.icons.sweetenersSyrups,
      image: "/media/home/featured-sweeteners-syrups.webp",
      imageAlt: "Sweetener and syrup samples in commercial ingredient sourcing setting",
    },
    {
      id: "edible-oils-fats",
      title: "Edible Oils & Fats",
      description:
        "Edible oils and fats reviewed by origin, format, documentation and destination market.",
      href: "/en/products#edible-oils-fats",
      icon: homeAssets.icons.edibleOilsFats,
      image: "/media/home/featured-edible-oils-fats.webp",
      imageAlt: "Edible oil and fat samples prepared for commercial sourcing review",
    },
    {
      id: "starches-industrial-ingredients",
      title: "Starches & Industrial Ingredients",
      description:
        "Starches and industrial ingredients sourced by technical use case and specification.",
      href: "/en/products#starches-industrial-ingredients",
      icon: homeAssets.icons.starchesIndustrial,
      image: "/media/home/featured-starches-industrial.webp",
      imageAlt: "Starch and industrial ingredient samples arranged for specification review",
    },
    {
      id: "dairy-ingredients",
      title: "Dairy Ingredients",
      description:
        "Selected dairy ingredients reviewed by product, certification and buyer requirement.",
      href: "/en/products#dairy-ingredients",
      icon: homeAssets.icons.dairyIngredients,
      image: "/media/home/featured-dairy-ingredients.webp",
      imageAlt: "Dairy ingredient powders and food-grade containers for sourcing review",
    },
    {
      id: "canned-foods",
      title: "Canned Foods",
      description:
        "Canned food sourcing for wholesale, retail, foodservice and private label discussions.",
      href: "/en/products#canned-foods",
      icon: homeAssets.icons.cannedFoods,
      image: "/media/home/featured-canned-foods.webp",
      imageAlt: "Canned food products and samples prepared for commercial buyer review",
    },
    {
      id: "consumer-foods",
      title: "Consumer Foods",
      description:
        "Consumer food products reviewed by brand, packing, market fit and private label potential.",
      href: "/en/products#consumer-foods",
      icon: homeAssets.icons.consumerFoods,
      image: "/media/home/featured-consumer-foods.webp",
      imageAlt: "Assorted consumer food products in plain packaging for sourcing review",
    },
  ],
  markets: {
    title: "Sourcing markets and destination experience",
    text:
      "A3 operates from London, sourcing products from selected supplier countries and supporting commercial buyers across destination markets in Europe, Africa, North America, South America and Asia.",
    note:
      "Source countries include Turkiye, Poland, Argentina, China, Brazil and Ukraine. Destination experience spans Europe, Africa, North America, South America and Asia.",
    map: homeAssets.icons.marketsMap,
  },
  process: {
    title: "How A3 works",
    text:
      "A3 follows a practical sourcing workflow for commercial buyers, from product requirement and supplier matching to documentation, trade coordination and shipment follow up.",
    image: "/media/home/how-a3-works-process.webp",
    imageAlt: "Food sourcing quality control table with packaged products and warehouse coordination",
    cta: { label: "Request a Quote", href: "/en/contact" },
    steps: [
      {
        number: "01",
        title: "Share your requirement",
        description:
          "Tell us the product, grade, volume, packing format, destination and preferred shipment terms.",
        icon: homeAssets.icons.processSource,
      },
      {
        number: "02",
        title: "Source suitable options",
        description:
          "We identify producer and supplier options that match origin, availability, specification and commercial fit.",
        icon: homeAssets.icons.processVerify,
      },
      {
        number: "03",
        title: "Review specifications",
        description:
          "We check product details, certifications, packing options and key documents before preparing a quote.",
        icon: homeAssets.icons.processMatch,
      },
      {
        number: "04",
        title: "Align trade terms",
        description:
          "We coordinate price, quantity, packing, shipment model and commercial terms with the supplier.",
        icon: homeAssets.icons.processCoordinate,
      },
      {
        number: "05",
        title: "Follow through",
        description:
          "We support communication, documentation and shipment follow-up from origin to destination.",
        icon: homeAssets.icons.processFollowThrough,
      },
    ],
  },
  buyerPaths: [
    {
      id: "wholesalers-distributors",
      title: "Wholesalers & Distributors",
      description:
        "Product options by origin, grade, packing format and volume for resale and distribution channels.",
      shortHint: "Product options for resale and distribution channels.",
      needs: "Origin · Grade · Packing · Volume",
      href: "/en/contact",
      image: "/media/home/buyer-wholesalers-distributors.webp",
      imageAlt: "Warehouse with palletized packaged food products prepared for distribution",
    },
    {
      id: "food-manufacturers",
      title: "Food Manufacturers",
      description:
        "Ingredients and food commodities matched to specification, application and recurring supply needs.",
      shortHint: "Ingredients matched to specification and recurring supply needs.",
      needs: "Specification · Application · Repeat supply",
      href: "/en/contact",
      image: "/media/home/buyer-food-manufacturers.webp",
      imageAlt: "Food manufacturing quality control with ingredient handling and production equipment",
    },
    {
      id: "retail-foodservice",
      title: "Retail & Foodservice Buyers",
      description:
        "Packaged, frozen, canned and ingredient options shaped around format, market fit and channel requirements.",
      shortHint: "Packaged and channel-ready options shaped around market fit.",
      needs: "Format · Market fit · Channel · Private label",
      href: "/en/contact",
      image: "/media/home/buyer-retail-foodservice.webp",
      imageAlt: "Packaged food and foodservice products arranged for commercial buyer review",
    },
  ],
  resources: [
    {
      title: "Coffee Catalogue",
      description:
        "Download the green coffee catalogue with product profiles and origin information.",
      href: "/assets/a3/resources/a3-coffee-catalogue.pdf",
      ariaLabel: "Open Coffee Catalogue PDF",
    },
    {
      title: "Sugar Catalogue",
      description:
        "Download the sugar catalogue with cane and beet sugar options by grade and origin.",
      href: "/assets/a3/resources/a3-sugar-catalogue.pdf",
      ariaLabel: "Open Sugar Catalogue PDF",
    },
  ],
  cta: {
    title: "Tell us what you need to source.",
    text:
      "Send your product, origin, packing, volume or destination requirement and A3 will review the best way to support your request.",
    image: homeAssets.media.finalCta,
    imageAlt: "Food sourcing and product handling used to represent a sourcing request",
    primary: { label: "Request a Quote", href: "/en/contact" },
  },
} as const;

export const pages: Record<string, PageContent> = {
  home: {
    locale: "en",
    slug: "/en",
    title: "Trusted food sourcing and trade for commercial buyers.",
    description:
      "A3 connects selected producers with wholesalers, distributors, foodservice, retail and industrial buyers across selected international markets.",
    sections: ["proof", "what-a3-does", "featured-products", "process", "markets", "buyers", "documentation", "resources", "cta"],
    seo: {
      metaTitle: "A3 Food & Beverage | Food Sourcing & Trade Partner",
      metaDescription:
        "A3 Food & Beverage connects selected producers with commercial food buyers, supporting sourcing, documentation and supply coordination from origin to destination.",
      canonicalPath: "/en",
      ogTitle: "A3 Food & Beverage | Food Sourcing & Trade Partner",
      ogDescription:
        "Origin-connected food sourcing and trade support for commercial buyers.",
      robots,
      locale: "en",
      sitemapInclude: true,
      structuredDataType: "WebPage",
      targetKeyword: "food sourcing partner",
      secondaryKeywords: ["international food sourcing", "food trade partner", "B2B food sourcing"],
    },
  },
  products: {
    locale: "en",
    slug: "/en/products",
    title: "Products sourced for commercial food buyers.",
    description:
      "A3 works across selected food and beverage categories, with some products regularly sourced and others available on request depending on origin, specification, volume and destination market.",
    sections: ["availability", "families", "applications", "origins", "cta"],
    seo: {
      metaTitle: "Products | A3 Food & Beverage",
      metaDescription:
        "Explore selected food and beverage categories sourced for commercial buyers, including coffee, sugar, edible oils, sweeteners, starches, frozen foods and canned foods.",
      canonicalPath: "/en/products",
      ogTitle: "Products sourced for commercial food buyers",
      ogDescription:
        "Product discovery for coffee, sugar, edible oils, sweeteners, starches and selected food categories.",
      robots,
      locale: "en",
      sitemapInclude: true,
      structuredDataType: "CollectionPage",
      targetKeyword: "B2B food products",
      secondaryKeywords: ["food product sourcing", "commercial food sourcing", "food products supplier"],
    },
  },
  coffee: {
    locale: "en",
    slug: "/en/products/coffee",
    title: "Green coffee sourcing for commercial buyers.",
    description:
      "A3 supports selected green coffee sourcing opportunities, with a current focus on South American origins and Brazilian coffee profiles where available.",
    sections: ["overview", "buyer-fields", "products", "documentation", "cta"],
    seo: {
      metaTitle: "Green Coffee Sourcing | A3 Food & Beverage",
      metaDescription:
        "A3 supports selected green coffee sourcing opportunities for commercial buyers, including South American and Brazilian coffee profiles where available.",
      canonicalPath: "/en/products/coffee",
      ogTitle: "Green Coffee Sourcing",
      ogDescription:
        "Commercial green coffee sourcing support with South American and Brazilian origin focus where available.",
      robots,
      locale: "en",
      sitemapInclude: true,
      structuredDataType: "Product",
      targetKeyword: "green coffee supplier",
      secondaryKeywords: ["Brazilian green coffee", "Arabica green coffee", "Robusta coffee supplier"],
    },
  },
  sugar: {
    locale: "en",
    slug: "/en/products/sugar",
    title: "Sugar sourcing and supply coordination.",
    description:
      "A3 supports selected sugar sourcing opportunities for commercial buyers, with grade, origin, packing, shipment model and documentation requirements reviewed by product and destination market.",
    sections: ["types", "commercial-info", "supply-model", "documentation", "cta"],
    seo: {
      metaTitle: "Sugar Sourcing & Supply Coordination | A3 Food & Beverage",
      metaDescription:
        "A3 supports selected sugar sourcing opportunities for commercial buyers, including refined sugar, ICUMSA grades, cane sugar, beet sugar and shipment documentation support.",
      canonicalPath: "/en/products/sugar",
      ogTitle: "Sugar Sourcing & Supply Coordination",
      ogDescription:
        "Commercial sugar sourcing support for refined sugar, ICUMSA grades, cane sugar, beet sugar and shipment documentation.",
      robots,
      locale: "en",
      sitemapInclude: true,
      structuredDataType: "Product",
      targetKeyword: "sugar supplier",
      secondaryKeywords: ["ICUMSA 45 sugar", "bulk sugar supplier", "sugar sourcing"],
    },
  },
  markets: {
    locale: "en",
    slug: "/en/markets-sourcing",
    title: "Sourcing from selected origins. Serving selected commercial markets.",
    description:
      "A3 works across selected sourcing regions and buyer markets, connecting product availability at origin with commercial demand, documentation requirements and delivery needs.",
    sections: ["source-vs-serve", "regions", "map", "network", "cta"],
    seo: {
      metaTitle: "Markets & Sourcing | A3 Food & Beverage",
      metaDescription:
        "Understand how A3 connects selected sourcing regions with commercial buyer markets through origin access, documentation and shipment coordination.",
      canonicalPath: "/en/markets-sourcing",
      ogTitle: "Markets & Sourcing",
      ogDescription: "Selected origin sourcing and market experience for commercial food trade.",
      robots,
      locale: "en",
      sitemapInclude: true,
      structuredDataType: "WebPage",
      targetKeyword: "food sourcing regions",
      secondaryKeywords: ["South America coffee sourcing", "West Africa food trade", "origin market food sourcing"],
    },
  },
  howWeWork: {
    locale: "en",
    slug: "/en/how-we-work",
    title: "How A3 works from origin to destination.",
    description:
      "A3 supports commercial food trade through sourcing, producer selection, product matching, documentation, logistics coordination and follow-through.",
    sections: ["process", "services", "split", "cta"],
    seo: {
      metaTitle: "How We Work | A3 Food & Beverage",
      metaDescription:
        "Learn how A3 supports commercial food trade through sourcing, producer selection, documentation, logistics coordination and follow-through.",
      canonicalPath: "/en/how-we-work",
      ogTitle: "How A3 Works",
      ogDescription: "A clear operating model for sourcing, documentation and trade coordination.",
      robots,
      locale: "en",
      sitemapInclude: true,
      structuredDataType: "WebPage",
      targetKeyword: "food sourcing process",
      secondaryKeywords: ["food trade documentation", "sourcing and logistics support", "food import export process"],
    },
  },
  about: {
    locale: "en",
    slug: "/en/about",
    title: "A focused food sourcing and trade partner.",
    description:
      "A3 Food & Beverage is a UK-headquartered company built around relationship-led international food trade, selected producer access and commercial buyer requirements.",
    sections: ["who-we-are", "relationship-led", "verification", "cta"],
    seo: {
      metaTitle: "About A3 Food & Beverage",
      metaDescription:
        "A3 Food & Beverage is a UK-headquartered food sourcing and trade partner connecting selected producers with commercial buyers.",
      canonicalPath: "/en/about",
      ogTitle: "About A3 Food & Beverage",
      ogDescription: "A focused, relationship-led food sourcing and trade partner.",
      robots,
      locale: "en",
      sitemapInclude: true,
      structuredDataType: "AboutPage",
      targetKeyword: "food trading company UK",
      secondaryKeywords: ["food sourcing partner", "international food trade partner"],
    },
  },
  resources: {
    locale: "en",
    slug: "/en/resources",
    title: "Product catalogues and trade resources.",
    description:
      "Access selected product catalogues, company information and documentation support resources. Detailed commercial documents may be shared after inquiry depending on product and requirement.",
    sections: ["resources", "future-content", "cta"],
    seo: {
      metaTitle: "Resources & Catalogues | A3 Food & Beverage",
      metaDescription:
        "Access A3 product catalogues, company information and documentation support resources for coffee, sugar and commercial food sourcing.",
      canonicalPath: "/en/resources",
      ogTitle: "Product Catalogues and Trade Resources",
      ogDescription: "Catalogues, company information and documentation resources for commercial buyers.",
      robots,
      locale: "en",
      sitemapInclude: true,
      structuredDataType: "CollectionPage",
      targetKeyword: "food trade resources",
      secondaryKeywords: ["coffee catalogue", "sugar catalogue", "product specifications"],
    },
  },
  contact: {
    locale: "en",
    slug: "/en/contact",
    title: "Send your product or sourcing requirement.",
    description:
      "Tell A3 what you are looking for - product, origin, packing, volume, destination market or documentation requirement - and the team will review how it can support the trade.",
    sections: ["intent", "form", "direct-contact", "thank-you"],
    seo: {
      metaTitle: "Send Requirement | A3 Food & Beverage",
      metaDescription:
        "Send A3 your product, origin, packing, volume, destination market or documentation requirement for commercial food sourcing review.",
      canonicalPath: "/en/contact",
      ogTitle: "Send a Product or Sourcing Requirement",
      ogDescription: "Share your commercial food sourcing requirement with A3.",
      robots,
      locale: "en",
      sitemapInclude: true,
      structuredDataType: "ContactPage",
      targetKeyword: "food sourcing contact",
      secondaryKeywords: ["request quote", "product sourcing inquiry", "send requirement"],
    },
  },
};

export const productFamilies: ProductFamily[] = [
  {
    id: "coffee",
    slug: "coffee",
    title: "Coffee",
    summary: "Green coffee sourcing with a focus on selected South American and Brazilian profiles where available.",
    description:
      "A3 supports inquiry-led green coffee sourcing for commercial buyers, including Arabica, Robusta / Conilon and certified profiles where available.",
    buyerFit: "Roasters, distributors, wholesalers and commercial coffee buyers.",
    availabilityModel: "Regularly sourced and inquiry-led depending on origin, crop, grade and volume.",
    applications: ["Wholesale", "Roasting", "Distribution", "Foodservice"],
    origins: ["South America", "Brazil", "Selected origins by requirement"],
    packingOptions: ["60kg bags", "Bulk shipment by inquiry", "Supplier-specific formats"],
    supplyModels: ["Spot / seasonal", "Contract supply by inquiry", "Current offers / inquiry"],
    documentationAvailable: ["Specification sheets", "Supplier-held certifications", "Sample or lot information", "Shipment documentation"],
    ctaLabel: "Request Coffee Availability",
    featured: true,
    futureChildren: ["Brazilian Green Coffee", "Arabica", "Robusta / Conilon", "Certified Coffee", "Current Offers / Inquiry"],
    image: { alt: "Green coffee beans prepared for commercial sourcing review" },
    seo: pages.coffee.seo,
    relatedPages: ["/en/products", "/en/markets-sourcing", "/en/resources", "/en/contact"],
    relatedResources: ["coffee-catalogue"],
  },
  {
    id: "sugar",
    slug: "sugar",
    title: "Sugar",
    summary: "Sugar sourcing and supply coordination by grade, origin, packing, shipment model and documentation need.",
    description:
      "A3 supports selected sugar sourcing opportunities for refined white sugar, ICUMSA grades, cane sugar, beet sugar and shipment-led requirements.",
    buyerFit: "Distributors, food manufacturers, wholesalers, foodservice groups and industrial buyers.",
    availabilityModel: "Source on request, spot / seasonal and contract supply depending on grade and destination.",
    applications: ["Food manufacturing", "Wholesale", "Industrial use", "Foodservice"],
    origins: ["South America", "Europe", "Selected origins by requirement"],
    packingOptions: ["25kg / 50kg bags", "Container supply", "Bulk vessel by inquiry"],
    supplyModels: ["Container supply", "Vessel supply", "Contract supply", "Source on request"],
    documentationAvailable: ["Product specifications", "Origin documentation", "Supplier-held certifications", "Shipment documentation", "Loading checks where applicable"],
    ctaLabel: "Request Sugar Quote",
    featured: true,
    futureChildren: ["Refined White Sugar", "ICUMSA 45", "ICUMSA 150", "Cane Sugar", "Beet Sugar", "Container Supply", "Vessel Supply"],
    image: { alt: "Refined white sugar sample for B2B supply discussion" },
    seo: pages.sugar.seo,
    relatedPages: ["/en/products", "/en/markets-sourcing", "/en/resources", "/en/contact"],
    relatedResources: ["sugar-catalogue"],
  },
  {
    id: "sweeteners-syrups",
    slug: "sweeteners-syrups",
    title: "Sweeteners & Syrups",
    summary: "Selected sweeteners and syrups sourced by application, specification and commercial requirement.",
    description: "Glucose syrup, fructose syrup and other sweeteners can be reviewed by use case, packing and destination market.",
    buyerFit: "Food manufacturers, distributors and ingredient buyers.",
    availabilityModel: "Available on request.",
    applications: ["Bakery", "Confectionery", "Beverages", "Industrial ingredients"],
    origins: ["Europe", "Selected origins"],
    documentationAvailable: ["Specification sheets", "Supplier-held certifications", "Shipment documentation"],
    ctaLabel: "Send Requirement",
    featured: false,
    futureChildren: ["Glucose Syrup", "Fructose Syrup", "Other Sweeteners"],
    image: { alt: "Sweetener ingredient samples for commercial sourcing review" },
    seo: pages.products.seo,
    relatedPages: ["/en/products", "/en/contact"],
    relatedResources: ["product-specifications"],
  },
  {
    id: "edible-oils-fats",
    slug: "edible-oils-fats",
    title: "Edible Oils & Fats",
    summary: "Edible oil and fat sourcing for foodservice, retail, manufacturing and wholesale buyers.",
    description: "Sunflower oil, olive oil, palm / blends and specialty oils can be reviewed by origin, packing and destination market.",
    buyerFit: "Foodservice groups, retailers, wholesalers and food manufacturers.",
    availabilityModel: "Regularly sourced or available on request depending on product and origin.",
    applications: ["Foodservice", "Retail", "Manufacturing", "Wholesale"],
    origins: ["Europe", "Mediterranean", "Selected origins"],
    documentationAvailable: ["Specification sheets", "Supplier-held certifications", "Shipment documentation"],
    ctaLabel: "Request Availability",
    featured: false,
    futureChildren: ["Sunflower Oil", "Olive Oil", "Palm / Blends", "Specialty Oils"],
    image: { alt: "Edible oil samples prepared for buyer specification review" },
    seo: pages.products.seo,
    relatedPages: ["/en/products", "/en/contact"],
    relatedResources: ["product-specifications"],
  },
  {
    id: "starches-industrial-ingredients",
    slug: "starches-industrial-ingredients",
    title: "Starches & Industrial Ingredients",
    summary: "Starches and industrial food ingredients sourced by grade, application and documentation requirements.",
    description: "Corn starch, potato starch, modified starches and maltodextrin can be reviewed for industrial and food manufacturing use.",
    buyerFit: "Food manufacturers and industrial ingredient buyers.",
    availabilityModel: "Available on request.",
    applications: ["Food manufacturing", "Industrial ingredients", "Private label"],
    origins: ["Europe", "Selected origins"],
    documentationAvailable: ["Product specifications", "Technical sheets", "Supplier-held certifications"],
    ctaLabel: "Send Requirement",
    featured: false,
    futureChildren: ["Corn Starch", "Potato Starch", "Modified Starches", "Maltodextrin"],
    image: { alt: "Starch and industrial ingredient samples for technical specification review" },
    seo: pages.products.seo,
    relatedPages: ["/en/products", "/en/contact"],
    relatedResources: ["product-specifications"],
  },
  {
    id: "dairy-ingredients",
    slug: "dairy-ingredients",
    title: "Dairy Ingredients",
    summary: "Selected dairy ingredients reviewed by product, specification, certification and destination market.",
    description: "Whole milk powder and skimmed milk powder can be reviewed for commercial buyer requirements where available.",
    buyerFit: "Food manufacturers, distributors and industrial ingredient buyers.",
    availabilityModel: "Available on request.",
    applications: ["Food manufacturing", "Wholesale", "Industrial ingredients"],
    origins: ["Europe", "Selected origins"],
    documentationAvailable: ["Specification sheets", "Supplier-held certifications", "Shipment documentation"],
    ctaLabel: "Send Requirement",
    featured: false,
    futureChildren: ["Whole Milk Powder", "Skimmed Milk Powder"],
    image: { alt: "Dairy ingredient documentation and product specification review" },
    seo: pages.products.seo,
    relatedPages: ["/en/products", "/en/contact"],
    relatedResources: ["product-specifications"],
  },
  {
    id: "frozen-foods",
    slug: "frozen-foods",
    title: "Frozen Foods",
    summary: "Selected frozen foods reviewed by category, packing, cold-chain needs and destination market.",
    description: "Frozen food sourcing can be reviewed by buyer requirement, producer availability and shipment conditions.",
    buyerFit: "Foodservice, distributors, retail buyers and wholesalers.",
    availabilityModel: "Available on request.",
    applications: ["Foodservice", "Retail", "Wholesale", "Distribution"],
    origins: ["Europe", "Selected origins"],
    documentationAvailable: ["Product specifications", "Temperature and shipment documentation", "Supplier-held certifications"],
    ctaLabel: "Send Requirement",
    featured: false,
    futureChildren: [],
    image: { alt: "Frozen food supply documentation and logistics coordination materials" },
    seo: pages.products.seo,
    relatedPages: ["/en/products", "/en/contact"],
    relatedResources: ["documentation-support"],
  },
  {
    id: "canned-foods",
    slug: "canned-foods",
    title: "Canned Foods",
    summary: "Canned food sourcing for commercial buyers by product, packing format, label and destination market.",
    description: "Selected canned food products can be reviewed for wholesale, retail and foodservice requirements.",
    buyerFit: "Wholesalers, retailers, foodservice and distributors.",
    availabilityModel: "Available on request.",
    applications: ["Retail", "Foodservice", "Wholesale", "Private label"],
    origins: ["Europe", "Selected origins"],
    documentationAvailable: ["Product specifications", "Supplier-held certifications", "Shipment documentation"],
    ctaLabel: "Send Requirement",
    featured: false,
    futureChildren: [],
    image: { alt: "Canned food products prepared for commercial buyer review" },
    seo: pages.products.seo,
    relatedPages: ["/en/products", "/en/contact"],
    relatedResources: ["company-profile"],
  },
  {
    id: "consumer-foods",
    slug: "consumer-foods",
    title: "Consumer Foods",
    summary: "Selected consumer food products reviewed by brand, packing, market fit and private label potential.",
    description: "Consumer food sourcing can support retail, distribution and private label discussions where suitable.",
    buyerFit: "Retail buyers, distributors and private label teams.",
    availabilityModel: "Available on request.",
    applications: ["Retail", "Private label", "Distribution"],
    origins: ["Europe", "Selected origins"],
    documentationAvailable: ["Product specifications", "Label information", "Supplier-held certifications"],
    ctaLabel: "Send Requirement",
    featured: false,
    futureChildren: [],
    image: { alt: "Consumer food products reviewed for retail and private label sourcing" },
    seo: pages.products.seo,
    relatedPages: ["/en/products", "/en/contact"],
    relatedResources: ["company-profile"],
  },
];

export const productDetails: ProductDetail[] = [
  {
    id: "brazilian-green-coffee",
    slug: "brazil-green-coffee",
    family: "coffee",
    title: "Brazilian Green Coffee",
    summary: "Brazilian green coffee profiles reviewed by grade, process, certification and availability.",
    originOptions: ["Brazil", "South America"],
    gradeOrSpec: ["Arabica", "Robusta / Conilon", "Commercial grades by inquiry"],
    packingOptions: ["60kg bags", "Supplier-specific formats"],
    applications: ["Roasting", "Wholesale", "Distribution"],
    certificationsAvailable: ["Supplier-held certifications where available"],
    documentationAvailable: ["Specification sheets", "Lot information", "Shipment documentation"],
    supplyModels: ["Current offers / inquiry", "Spot / seasonal"],
    ctaLabel: "Request Coffee Availability",
  },
  {
    id: "icumsa-45",
    slug: "icumsa-45",
    family: "sugar",
    title: "ICUMSA 45 Sugar",
    summary: "Refined white sugar reviewed by ICUMSA grade, origin, packing and shipment documentation.",
    originOptions: ["South America", "Selected origins"],
    gradeOrSpec: ["ICUMSA 45"],
    packingOptions: ["25kg / 50kg bags", "Container supply", "Bulk shipment by inquiry"],
    applications: ["Food manufacturing", "Wholesale", "Industrial use"],
    certificationsAvailable: ["Supplier-held certifications where available"],
    documentationAvailable: ["Product specification", "Origin documentation", "Shipment documentation"],
    supplyModels: ["Container supply", "Vessel supply", "Contract supply"],
    ctaLabel: "Request Sugar Quote",
  },
];

export const processSteps = [
  {
    id: "source",
    title: "Source",
    description: "Review the product need, origin preference, packing, volume, destination and commercial context.",
  },
  {
    id: "verify",
    title: "Verify",
    description: "Check producer fit, product specification, documentation availability and trade constraints.",
  },
  {
    id: "match",
    title: "Match",
    description: "Connect available supply with buyer requirements before moving toward quote or sample discussions.",
  },
  {
    id: "coordinate",
    title: "Coordinate",
    description: "Support documentation, inspection, shipment and logistics coordination from origin to destination.",
  },
  {
    id: "follow-through",
    title: "Follow through",
    description: "Maintain the commercial relationship after shipment and support repeat trade where suitable.",
  },
];

export const regions: MarketRegion[] = [
  {
    id: "uk-headquarters",
    title: "UK Headquarters",
    role: "headquarters",
    description: "Commercial coordination and company base in London.",
    relatedProducts: [],
    visibleOnHome: true,
  },
  {
    id: "ghana-west-africa",
    title: "Ghana & West Africa Market Experience",
    role: "marketExperience",
    description: "Buyer-side market knowledge and relationship-led commercial experience.",
    relatedProducts: ["coffee", "sugar", "consumer-foods"],
    visibleOnHome: true,
  },
  {
    id: "south-america",
    title: "South America Sourcing",
    role: "sourceMarket",
    description: "Selected soft commodity sourcing opportunities, especially green coffee and sugar.",
    relatedProducts: ["coffee", "sugar"],
    visibleOnHome: true,
  },
  {
    id: "selected-markets",
    title: "Selected International Markets",
    role: "destinationMarket",
    description: "Buyer relationships and opportunities depending on product, documentation and requirement.",
    relatedProducts: ["coffee", "sugar", "edible-oils-fats"],
    visibleOnHome: true,
  },
];

export const services: ServiceItem[] = [
  {
    id: "sourcing",
    title: "Sourcing",
    description: "Identify selected producers and product availability based on buyer requirement, origin and market fit.",
    relatedProductFamilies: ["coffee", "sugar"],
  },
  {
    id: "producer-selection",
    title: "Producer Selection",
    description: "Review producer fit, commercial credibility, specification capability and documentation availability.",
    relatedProductFamilies: ["coffee", "sugar", "edible-oils-fats"],
  },
  {
    id: "product-matching",
    title: "Product Matching",
    description: "Match grade, packing, application, shipment model and buyer expectations before moving to quote flow.",
    relatedProductFamilies: ["coffee", "sugar", "starches-industrial-ingredients"],
  },
  {
    id: "quality-inspection",
    title: "Quality & Inspection",
    description: "Support product specifications, loading checks and inspection needs where applicable to the shipment.",
    relatedProductFamilies: ["coffee", "sugar"],
  },
  {
    id: "documentation",
    title: "Documentation & Certifications",
    description: "Coordinate supplier-held certifications, product documents and shipment documentation where available.",
    relatedProductFamilies: ["coffee", "sugar", "dairy-ingredients"],
  },
  {
    id: "logistics",
    title: "Logistics Coordination",
    description: "Support origin-to-destination shipment coordination with practical attention to trade requirements.",
    relatedProductFamilies: ["coffee", "sugar", "frozen-foods"],
  },
  {
    id: "private-label",
    title: "Private Label",
    description: "Review private label possibilities by product, supplier capability, packing and target market.",
    relatedProductFamilies: ["consumer-foods", "canned-foods", "edible-oils-fats"],
  },
  {
    id: "after-sales",
    title: "After-sales Support",
    description: "Support commercial follow-through and repeat trade through personal buyer and supplier relationships.",
    relatedProductFamilies: ["coffee", "sugar"],
  },
];

export const resources: ResourceItem[] = [
  {
    id: "coffee-catalogue",
    title: "Coffee Catalogue",
    type: "catalogue",
    summary: "A future catalogue for selected green coffee sourcing profiles and buyer information fields.",
    filePlaceholder: "coffee-catalogue.pdf",
    gated: true,
    relatedProducts: ["coffee"],
  },
  {
    id: "sugar-catalogue",
    title: "Sugar Catalogue",
    type: "catalogue",
    summary: "A future catalogue for sugar grades, shipment models and commercial sourcing requirements.",
    filePlaceholder: "sugar-catalogue.pdf",
    gated: true,
    relatedProducts: ["sugar"],
  },
  {
    id: "company-profile",
    title: "Company Profile",
    type: "companyProfile",
    summary: "Company positioning, verification details and sourcing/trade support overview.",
    filePlaceholder: "a3-company-profile.pdf",
    gated: false,
    relatedProducts: [],
  },
  {
    id: "documentation-support",
    title: "Documentation Support",
    type: "documentation",
    summary: "An overview of product specifications, supplier-held certifications and shipment documentation support.",
    filePlaceholder: "documentation-support.pdf",
    gated: false,
    relatedProducts: ["coffee", "sugar"],
  },
  {
    id: "product-specifications",
    title: "Product Specifications",
    type: "specification",
    summary: "A future resource structure for product specifications and technical data sheets.",
    filePlaceholder: "product-specifications.pdf",
    gated: true,
    relatedProducts: ["coffee", "sugar", "starches-industrial-ingredients"],
  },
  {
    id: "market-notes",
    title: "Market Notes",
    type: "marketNote",
    summary: "Future notes on origin, sourcing conditions and trade documentation topics.",
    filePlaceholder: "market-notes.pdf",
    gated: false,
    relatedProducts: ["coffee", "sugar"],
  },
];

export const buyerPaths = [
  {
    title: "For wholesalers and distributors",
    description: "Review product availability, origin, packing, documentation and repeat-supply potential.",
  },
  {
    title: "For food manufacturers",
    description: "Discuss specification, grade, application, documentation and recurring commercial needs.",
  },
  {
    title: "For foodservice and retail buyers",
    description: "Explore products by format, packing, supplier capability and private label possibility.",
  },
  {
    title: "For producers and suppliers",
    description: "Introduce available products, export markets, certifications, capacity and target buyers.",
  },
];

export const proofPoints = [
  "UK-headquartered",
  "Origin-connected sourcing",
  "Ghana & West Africa market experience",
  "South America coffee and sugar sourcing",
  "Documentation and logistics coordination",
];

export const availabilityModels = [
  {
    title: "Regularly Sourced",
    description: "Categories that can be reviewed repeatedly through known relationships and origin availability.",
  },
  {
    title: "Available on Request",
    description: "Products sourced when specification, origin, volume and destination are commercially workable.",
  },
  {
    title: "Spot / Seasonal",
    description: "Opportunities dependent on crop cycles, producer availability and market timing.",
  },
  {
    title: "Contract Supply",
    description: "Structured supply discussions for repeat buyers where product and documentation fit.",
  },
  {
    title: "Private Label Possible",
    description: "Considered product by product depending on supplier capability and buyer requirements.",
  },
];

export const contactIntents = [
  "I am looking for a product",
  "I need sourcing support",
  "I need documentation or specification information",
  "I want to discuss private label",
  "I am a producer / supplier",
  "I want to contact A3 directly",
];
