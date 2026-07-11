import type {
  MarketRegion,
  NavigationItem,
  PageContent,
  ProductCategory,
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
    "A UK-headquartered food sourcing and trade partner connecting producers, suppliers and commercial buyers across selected international markets.",
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
      { label: "View All Products", href: "/en/products" },
      { label: "Sugar", href: "/en/products/sugar", featured: true },
      { label: "Green Coffee Beans", href: "/en/products/green-coffee-beans", featured: true },
      { label: "Cocoa Products", href: "/en/products/cocoa-products" },
      { label: "Grains & Seeds", href: "/en/products/grains-seeds" },
      { label: "Dairy & Milk Powders", href: "/en/products/dairy-milk-powders" },
      { label: "Fats & Oils", href: "/en/products/oils-fats" },
      { label: "Starches & Sweeteners", href: "/en/products/starches-sweeteners" },
      { label: "Dried Fruit & Nuts", href: "/en/products/dried-fruit-nuts" },
      { label: "Frozen Foods", href: "/en/products/frozen-foods" },
      { label: "Consumer Foods", href: "/en/products/consumer-foods" },
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
    companyFoodFeastEditorial: "/media/home/company-food-feast-editorial.webp",
    companyStillLifeEditorial: "/media/home/company-still-life-editorial.webp",
    companyTradeEditorial: "/media/home/company-trade-editorial.webp",
    companyTradeSnapshot: "/media/home/company-trade-snapshot.webp",
    companyFieldLandscape: "/media/home/who-we-are-field-landscape.webp",
    elleMinaButter: "/media/brands/elle-mina/butter-breakfast.webp",
    elleMinaConsumerMargarine: "/media/brands/elle-mina/consumer-margarine-picnic.webp",
    elleMinaConsumerMargarineTable: "/media/brands/elle-mina/consumer-margarine-table.webp",
    elleMinaProfessionalMargarine: "/media/brands/elle-mina/professional-margarine-bakery.webp",
    featuredCannedFoods: "/media/home/featured-canned-foods.webp",
    featuredCoffee: "/media/home/featured-coffee.webp",
    featuredCoffeeCard: "/media/home/featured-coffee-card.png",
    featuredConsumerFoods: "/media/home/featured-consumer-foods.webp",
    featuredCocoaCard: "/media/home/featured-cocoa-card.png",
    featuredDairyIngredients: "/media/home/product-dairy-milk-powders.webp",
    featuredDriedFruitNuts: "/media/home/product-dried-fruit-nuts.webp",
    featuredEdibleOilsFats: "/media/home/product-edible-oils-fats.webp",
    featuredFrozenFoods: "/media/home/product-frozen-foods.webp",
    featuredGrainsCard: "/media/home/featured-grains-card.png",
    featuredStarchesIndustrial: "/media/home/product-starches-sweeteners.webp",
    featuredSugar: "/media/home/featured-sugar.webp",
    featuredSugarCard: "/media/home/featured-sugar-card.png",
    featuredSweetenersSyrups: "/media/home/featured-sweeteners-syrups.webp",
    featuredPackagedConsumerFoods: "/media/home/product-consumer-foods.webp",
    homeProductSugar: "/media/home/products/sugar.webp",
    homeProductCoffee: "/media/home/products/green-coffee-beans.webp",
    homeProductCocoa: "/media/home/products/cocoa-products.webp",
    homeProductGrains: "/media/home/products/grains-seeds.webp",
    homeProductDairy: "/media/home/products/dairy-milk-powders.webp",
    homeProductOils: "/media/home/products/oils-fats.webp",
    homeProductStarches: "/media/home/products/starches-sweeteners.webp",
    homeProductDriedFruit: "/media/home/products/dried-fruit-nuts.webp",
    homeProductFrozen: "/media/home/products/frozen-foods.webp",
    homeProductConsumer: "/media/home/products/consumer-foods.webp",
    processProductFit: "/media/home/process/product-fit.webp",
    processProducerCapability: "/media/home/process/producer-capability.webp",
    processMarketAccess: "/media/home/process/market-access.webp",
    processCommercialTerms: "/media/home/process/commercial-terms.webp",
    processShipmentReadiness: "/media/home/process/shipment-readiness.webp",
    howA3Works: "/media/home/how-a3-works.webp",
    finalCta: "/media/home/final-cta-market-hall.webp",
    heroVideo: "/media/hero.webm",
  },
  icons: {
    sourceProducers: "/icons/home/source-producers.svg",
    reviewDocuments: "/icons/home/review-documents.svg",
    coordinateTrade: "/icons/home/coordinate-trade.svg",
    coffeeIcon: "/icons/home/coffee-icon.svg",
    cocoaIcon: "/icons/home/cocoa-icon.svg",
    grainsIcon: "/icons/home/grains-icon.svg",
    greenCoffee: "/icons/home/green-coffee.svg",
    arrowRight: "/icons/home/arrow-right.svg",
    sugar: "/icons/home/sugar.svg",
    sugarIcon: "/icons/home/sugar-icon.svg",
    frozenFoods: "/icons/home/frozen-foods.svg",
    sweetenersSyrups: "/icons/home/sweeteners-syrups.svg",
    edibleOilsFats: "/icons/home/edible-oils-fats.svg",
    grainsOilseeds: "/icons/home/grains-oilseeds.svg",
    starchesIndustrial: "/icons/home/starches-industrial.svg",
    dairyIngredients: "/icons/home/dairy-ingredients.svg",
    cocoa: "/icons/home/cocoa.svg",
    driedFruitNuts: "/icons/home/dried-fruit-nuts.svg",
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

export type MarketLocation = {
  name: string;
  displayName?: string;
  longitude: number;
  latitude: number;
  visualLongitude?: number;
  visualLatitude?: number;
  isHub?: boolean;
  labelAlign?: "left" | "center" | "right";
};

export const marketLocations: MarketLocation[] = [
  { name: "United Kingdom / London", displayName: "England - London", longitude: -0.1276, latitude: 51.5072, isHub: true, labelAlign: "center" },
  { name: "Turkey / Istanbul", displayName: "Turkey", longitude: 28.9784, latitude: 41.0082, visualLongitude: 32.8597, visualLatitude: 39.9334, labelAlign: "left" },
  { name: "Poland", longitude: 19.1451, latitude: 51.9194, visualLongitude: 21.0122, visualLatitude: 52.2297, labelAlign: "left" },
  { name: "Belgium", longitude: 4.4699, latitude: 50.5039, visualLongitude: 3.7174, visualLatitude: 51.0543, labelAlign: "right" },
  { name: "Netherlands", longitude: 5.2913, latitude: 52.1326, visualLongitude: 6.5665, visualLatitude: 53.2194, labelAlign: "left" },
  { name: "Morocco", longitude: -7.0926, latitude: 31.7917, labelAlign: "right" },
  { name: "Argentina", longitude: -63.6167, latitude: -38.4161, labelAlign: "right" },
  { name: "China", longitude: 104.1954, latitude: 35.8617, labelAlign: "right" },
  { name: "Brazil", longitude: -51.9253, latitude: -14.235, labelAlign: "right" },
  { name: "Guyana", longitude: -58.9302, latitude: 4.8604, visualLongitude: -58.1551, visualLatitude: 6.8013, labelAlign: "left" },
  { name: "Suriname", longitude: -56.0278, latitude: 3.9193, visualLongitude: -55.2038, visualLatitude: 5.852, labelAlign: "right" },
  { name: "Ukraine", longitude: 31.1656, latitude: 48.3794, visualLongitude: 30.5234, visualLatitude: 50.4501, labelAlign: "left" },
  { name: "USA", longitude: -95.7129, latitude: 37.0902, labelAlign: "left" },
  { name: "Canada", longitude: -106.3468, latitude: 56.1304, labelAlign: "left" },
  { name: "Germany", longitude: 10.4515, latitude: 51.1657, visualLongitude: 13.405, visualLatitude: 52.52, labelAlign: "left" },
  { name: "France", longitude: 2.2137, latitude: 46.2276, visualLongitude: -0.5792, visualLatitude: 44.8378, labelAlign: "right" },
  { name: "Mauritania", longitude: -10.9408, latitude: 21.0079, labelAlign: "right" },
  { name: "Senegal", longitude: -14.4524, latitude: 14.4974, labelAlign: "right" },
  { name: "Togo", longitude: 0.8248, latitude: 8.6195, visualLongitude: 1.1861, visualLatitude: 9.5511, labelAlign: "left" },
  { name: "Ghana", longitude: -1.0232, latitude: 7.9465, visualLongitude: -1.6163, visualLatitude: 6.6666, labelAlign: "right" },
  { name: "Niger", longitude: 8.0817, latitude: 17.6078, labelAlign: "left" },
  { name: "Cameroon", longitude: 12.3547, latitude: 7.3697, visualLongitude: 11.5021, visualLatitude: 3.848, labelAlign: "left" },
  { name: "Angola", longitude: 17.8739, latitude: -11.2027, labelAlign: "left" },
  { name: "Madagascar", longitude: 46.8691, latitude: -18.7669, visualLongitude: 47.5079, visualLatitude: -18.8792, labelAlign: "right" },
  { name: "Mauritius", longitude: 57.5522, latitude: -20.3484, visualLongitude: 57.5522, visualLatitude: -20.3484, labelAlign: "left" },
  { name: "Mozambique", longitude: 35.5296, latitude: -18.6657, visualLongitude: 32.5832, visualLatitude: -25.9655, labelAlign: "left" },
  { name: "Taiwan", longitude: 120.9605, latitude: 23.6978, labelAlign: "right" },
  { name: "Australia / Sydney", displayName: "Australia", longitude: 151.2093, latitude: -33.8688, labelAlign: "right" },
];

export const productCategories: ProductCategory[] = [
  {
    title: "Sugar",
    slug: "sugar",
    shortDescription: "Grades, origins and packing options for commercial sugar requirements.",
    longDescription:
      "A3 reviews commercial sugar requirements by grade, origin, packing format, shipment model and documentation need.",
    iconKey: "sugar",
    imageKey: "featuredSugar",
    exampleProducts: ["Refined White Sugar", "ICUMSA 45", "ICUMSA 150", "Cane Sugar", "Beet Sugar"],
    ctaLabel: "Request Sugar Quote",
  },
  {
    title: "Green Coffee Beans",
    slug: "green-coffee-beans",
    shortDescription: "Green coffee options by origin, grade, profile and buyer requirement.",
    longDescription:
      "A3 supports inquiry-led green coffee sourcing for commercial buyers by origin, grade, profile, packing and documentation availability.",
    iconKey: "greenCoffee",
    imageKey: "featuredCoffee",
    exampleProducts: ["Selected Specialty Lots", "Arabica Santos Fine Cup", "Arabica Santos Good Cup", "Arabica Rio Minas", "Robusta / Conilon"],
    ctaLabel: "Request Coffee Availability",
  },
  {
    title: "Cocoa Products",
    slug: "cocoa-products",
    shortDescription: "Cocoa products by type, origin, specification and packing need.",
    longDescription:
      "A3 reviews selected cocoa product requirements by product type, origin options, specification, packing and destination market.",
    iconKey: "cocoa",
    exampleProducts: ["Cocoa Beans", "Cocoa Powder", "Cocoa Butter", "Cocoa Mass (Cocoa Liquor)"],
    ctaLabel: "Send Cocoa Requirement",
  },
  {
    title: "Grains & Seeds",
    slug: "grains-seeds",
    shortDescription: "Bulk grains and seeds by crop, origin and shipment requirement.",
    longDescription:
      "A3 reviews bulk grain and seed requirements by crop, origin, shipment model, documentation and commercial fit.",
    iconKey: "grainsOilseeds",
    exampleProducts: ["Milling Wheat", "Durum Wheat for Pasta", "Corn / Maize", "Sunflower Seed"],
    ctaLabel: "Send Grain Requirement",
  },
  {
    title: "Dairy & Milk Powders",
    slug: "dairy-milk-powders",
    shortDescription: "Dairy ingredients and milk powders by product type and certification need.",
    longDescription:
      "A3 reviews dairy ingredient and milk powder requirements by product type, specification, certification need and destination market.",
    iconKey: "dairyIngredients",
    imageKey: "featuredDairyIngredients",
    exampleProducts: ["Whole Milk Powder", "Skimmed Milk Powder", "Instant Milk Powder", "Fat-Filled Milk Powder", "Whey Powder", "Lactose", "Dairy / Whey Permeate Powder", "Butter", "Cheese", "Cheese Analogues", "UHT Milk"],
    ctaLabel: "Send Dairy Requirement",
  },
  {
    title: "Fats & Oils",
    slug: "oils-fats",
    shortDescription: "Edible oils and fats for retail, foodservice, wholesale and manufacturing.",
    longDescription:
      "A3 reviews edible oils and fats by product type, origin, packing format, channel requirement and destination market.",
    iconKey: "edibleOilsFats",
    imageKey: "featuredEdibleOilsFats",
    exampleProducts: ["Sunflower Oil", "Corn / Maize Oil", "Olive Oil", "Palm Oil", "Palm Olein", "Margarines", "Bakery & Pastry Fats", "Specialty Fats"],
    ctaLabel: "Request Oil Availability",
  },
  {
    title: "Starches & Sweeteners",
    slug: "starches-sweeteners",
    shortDescription: "Starches and sweeteners by application, specification and packing need.",
    longDescription:
      "A3 reviews starch and sweetener requirements by application, specification, packing format and commercial use case.",
    iconKey: "starchesIndustrial",
    imageKey: "featuredStarchesIndustrial",
    exampleProducts: ["Corn Starch", "Tapioca Starch", "Wheat Starch", "Potato Starch", "Rice Starch", "Pea Starch", "Modified Starches", "Vital Wheat Gluten", "Pea Protein", "Glucose Syrup", "Fructose Syrup", "Maltodextrin", "Dextrose Monohydrate", "Dextrose Anhydrous", "Sorbitol", "Maltitol", "Xylitol", "Erythritol", "Glycerol", "Allulose", "Stevia"],
    ctaLabel: "Send Ingredient Requirement",
  },
  {
    title: "Dried Fruit & Nuts",
    slug: "dried-fruit-nuts",
    shortDescription: "Dried fruits and nuts by type, grade, origin and application need.",
    longDescription:
      "A3 reviews dried fruit and nut requirements by product type, grade, origin, application, packing and documentation need.",
    iconKey: "driedFruitNuts",
    imageKey: "featuredDriedFruitNuts",
    exampleProducts: ["Raisins & Sultanas", "Dried Apricots", "Dates", "Dried Figs", "In-Shell Pistachios", "Pistachio Kernels", "Walnuts"],
    ctaLabel: "Send Dried Fruit & Nuts Requirement",
  },
  {
    title: "Frozen Foods",
    slug: "frozen-foods",
    shortDescription: "Frozen food products by category, packing and temperature-control need.",
    longDescription:
      "A3 reviews frozen food product requirements by category, packing format, producer availability and temperature-control needs.",
    iconKey: "frozenFoods",
    imageKey: "featuredFrozenFoods",
    exampleProducts: ["French Fries / Frozen Potato Products", "Frozen Poultry", "Frozen Seafood", "Frozen Fruit & Vegetables", "Frozen Pastry & Bakery Products"],
    ctaLabel: "Send Frozen Food Requirement",
  },
  {
    title: "Consumer Foods",
    slug: "consumer-foods",
    shortDescription: "Consumer products by brand, packing, market fit and private-label potential.",
    longDescription:
      "A3 reviews consumer food requirements by brand, packing, target market, private-label potential and commercial channel fit.",
    iconKey: "consumerFoods",
    imageKey: "featuredPackagedConsumerFoods",
    exampleProducts: ["Ketchup", "Mayonnaise", "Canned Foods", "Pasta", "Tomato Paste"],
    ctaLabel: "Send Consumer Food Requirement",
  },
];

export function productCategoryHref(category: ProductCategory) {
  return `/en/products/${category.slug}`;
}

export function getProductCategory(slug: string) {
  return productCategories.find((category) => category.slug === slug);
}

export const elleMinaProducts = [
  {
    id: "consumer-margarine",
    title: "Consumer Margarine",
    summary: "200g table margarine for cooking, baking and breakfast.",
    description:
      "200g table margarine for cooking, baking and breakfast, suitable for retail shelves, distribution and everyday foodservice use.",
    cardSummary:
      "200g table margarine for cooking, baking and breakfast, suited to retail, distribution and foodservice.",
    applications: ["Retail", "Wholesale", "Foodservice"],
    packing: "200g brick format",
    image: homeAssets.media.elleMinaConsumerMargarine,
    imageAlt: "Elle Mina 200g consumer margarine served on a picnic table with bread and jam",
  },
  {
    id: "professional-margarine",
    title: "Professional Margarine",
    summary: "Butter-flavoured margarine for bakery, pastry and professional kitchen use.",
    description:
      "Butter-flavoured margarine for bakery, pastry and professional kitchen use, available in bucket and carton formats from 900g to 20kg.",
    cardSummary:
      "Butter-flavoured margarine for bakery, pastry and professional kitchens, available from 900g to 20kg.",
    applications: ["Bakery", "Pastry", "Professional kitchens"],
    packing: "Professional bucket format",
    image: homeAssets.media.elleMinaProfessionalMargarine,
    imageAlt: "Elle Mina professional butter flavoured margarine bucket in a bakery setting",
  },
  {
    id: "butter",
    title: "Butter",
    summary: "Real butter with 83% milk fat content.",
    description:
      "Real butter with 83% milk fat content, available in 200g bricks and 20kg cartons for retail, foodservice and distribution buyers.",
    cardSummary:
      "Real butter with 83% milk fat, available in 200g bricks and 20kg cartons for retail and foodservice.",
    applications: ["Retail", "Foodservice", "Distribution"],
    packing: "200g brick format",
    image: homeAssets.media.elleMinaButter,
    imageAlt: "Elle Mina 200g unsalted butter on a breakfast table with bread and honey",
  },
] as const;

export const homeLanding = {
  hero: {
    title: "Global food sourcing, built around your market.",
    text:
      "A3 connects commercial buyers with vetted producers and coordinates product specifications, documentation, payment terms and delivery—making each supply option workable from source to destination.",
    primary: { label: "Explore Products", href: "/en/products" },
    secondary: { label: "Request a Quote", href: "/en/request-a-quote" },
  },
  companySnapshot: {
    title: "Making food supply work in practice.",
    text:
      "A3 brings together product fit, producer capability and trade conditions before presenting a supply option. The result is a practical route from source to destination, not availability in isolation.",
    image: homeAssets.media.companyFieldLandscape,
    imageAlt: "Rolling green agricultural fields and tree-lined hills in morning light",
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
      id: "sugar",
      title: "Sugar",
      description:
        "Cane and beet sugar options for commercial buyers, including Brazilian cane sugar and Ukrainian beet sugar. Supply can be reviewed by ICUMSA grade, origin, volume, packing and destination market.",
      cardSummary:
        "Cane and beet sugar options, including Brazilian cane sugar and Ukrainian beet sugar, reviewed by grade, packing and destination.",
      href: "/en/products/sugar",
      icon: homeAssets.icons.sugarIcon,
      image: homeAssets.media.featuredSugarCard,
      imageAlt: "Sugar samples and commercial sacks prepared for sourcing review",
      ctaLabel: "View category",
      featured: true,
    },
    {
      id: "green-coffee-beans",
      title: "Green Coffee Beans",
      description:
        "Green coffee beans for commercial buyers, shaped around origin, bean type, grade, cup profile, volume and shipment requirement.",
      cardSummary:
        "Green coffee beans from selected origins, shaped around bean type, grade, cup profile, volume and shipment need.",
      href: "/en/products/green-coffee-beans",
      icon: homeAssets.icons.coffeeIcon,
      image: homeAssets.media.featuredCoffeeCard,
      imageAlt: "Green coffee beans shown as a featured sourcing category",
      ctaLabel: "View category",
    },
    {
      id: "cocoa-products",
      title: "Cocoa Products",
      description:
        "Cocoa powder, cocoa butter and cocoa mass/liquor for food production and ingredient buyers, reviewed by specification, packing format and commercial suitability.",
      cardSummary:
        "Cocoa powder, butter and mass/liquor for food producers, reviewed by specification, packing and commercial fit.",
      href: "/en/products/cocoa-products",
      icon: homeAssets.icons.cocoaIcon,
      image: homeAssets.media.featuredCocoaCard,
      imageAlt: "Cocoa products prepared for commercial sourcing review",
      ctaLabel: "View category",
    },
    {
      id: "grains-seeds",
      title: "Grains & Seeds",
      description:
        "Bulk grains and seeds including wheat for milling and pasta, corn and sunflower seed, shaped around crop type, origin, volume and shipping requirement.",
      cardSummary:
        "Wheat for milling and pasta, corn and sunflower seed, shaped around crop, origin, volume and shipment need.",
      href: "/en/products/grains-seeds",
      icon: homeAssets.icons.grainsIcon,
      image: homeAssets.media.featuredGrainsCard,
      imageAlt: "Grains and oilseeds prepared for commercial sourcing review",
      ctaLabel: "View category",
    },
  ],
  ownBrand: {
    kicker: "Own brand",
    title: "Elle Mina",
    text:
      "Elle Mina is A3's own margarine and butter range, covering consumer table margarine, professional butter-flavoured margarine and real butter products for retail, bakery, foodservice and distribution buyers.",
    href: "/en/products/elle-mina",
    ctaLabel: "Explore Elle Mina Products",
    image: homeAssets.media.elleMinaProfessionalMargarine,
    imageAlt: "Elle Mina professional butter flavoured margarine in a bakery setting",
    products: elleMinaProducts,
  },
  markets: {
    title: "Sourcing markets and destination experience",
    text:
      "A3 works through focused producer relationships, market experience and commercial buyer connections across selected food and beverage categories.",
    note:
      "From source markets to buyer destinations, we help bring together product access, documentation, payment terms and delivery conditions in a commercially workable way.",
    map: homeAssets.icons.marketsMap,
    metrics: [
      { value: "74", label: "Product lines" },
      { value: String(marketLocations.length), label: "Connected source and buyer markets" },
      { value: "29+", label: "Years of trade experience" },
    ],
  },
  process: {
    title: "What makes a trade workable.",
    text:
      "Availability is only the starting point. A3 brings product fit, producer capability, market access, commercial terms and shipment readiness into one coordinated trade route.",
    image: homeAssets.media.processProductFit,
    imageAlt: "Food product samples and specifications under commercial review",
    cta: { label: "Request a Quote", href: "/en/request-a-quote" },
    steps: [
      {
        number: "01",
        title: "Product fit",
        description:
          "We begin with the commercial use, technical specification, grade, origin preference and packing format. Available options are assessed against the real buying requirement so the proposed product is suitable for the intended industrial, foodservice, wholesale or retail route.",
        icon: homeAssets.icons.processSource,
        image: homeAssets.media.processProductFit,
        imageAlt: "Food product samples and specification sheets being reviewed",
      },
      {
        number: "02",
        title: "Producer capability",
        description:
          "Producer capacity, production consistency, available volume and export readiness are reviewed together. This establishes whether the supplier can support the required programme, timing and repeat-supply expectations under commercially stable conditions.",
        icon: homeAssets.icons.processVerify,
        image: homeAssets.media.processProducerCapability,
        imageAlt: "Food production and warehouse capacity prepared for commercial supply",
      },
      {
        number: "03",
        title: "Market access",
        description:
          "Origin documents, certifications, labelling requirements and destination import conditions are checked before an option progresses. The route is shaped around the market that will receive the goods, rather than product availability in isolation.",
        icon: homeAssets.icons.processMatch,
        image: homeAssets.media.processMarketAccess,
        imageAlt: "Trade documentation and destination market preparation",
      },
      {
        number: "04",
        title: "Commercial terms",
        description:
          "Pricing basis, Incoterms, payment structure, shipment size and delivery responsibilities are aligned into one workable offer. Where appropriate, financing and flexible payment solutions can be incorporated to support cash flow and reduce transaction risk.",
        icon: homeAssets.icons.processCoordinate,
        image: homeAssets.media.processCommercialTerms,
        imageAlt: "Commercial trade terms being coordinated at a professional workspace",
      },
      {
        number: "05",
        title: "Shipment readiness",
        description:
          "Final packing, production timing, loading plan, export documents and logistics are coordinated against the agreed shipment window. A3 follows the movement from origin to destination so the approved commercial and technical conditions remain connected through delivery.",
        icon: homeAssets.icons.processFollowThrough,
        image: homeAssets.media.processShipmentReadiness,
        imageAlt: "Food cargo packed and ready for shipment loading",
      },
    ],
  },
  buyerPaths: [
    {
      id: "buyers",
      title: "For Buyers & Distribution Partners",
      description:
        "Commercial buyers, manufacturers, distributors, wholesalers, retailers and foodservice teams can review suitable product options and workable supply conditions.",
      cardSummary:
        "Product options, supplier capability and workable trade structures for commercial buying and distribution teams.",
      shortHint: "Product options and workable trade structures for buyers and distribution partners.",
      ctaLabel: "Request product options",
      needs: "Product / Origin / Volume / Destination",
      href: "/en/request-a-quote",
      image: "/media/home/buyer-wholesale-market-warehouse.webp",
      imageAlt: "Commercial wholesale warehouse prepared for buyer and distribution activity",
    },
    {
      id: "producers",
      title: "For Producers & Suppliers",
      description:
        "Farmers, producer networks and export-ready suppliers can introduce products, available capacity and target market opportunities to A3.",
      cardSummary:
        "Producer-side routes shaped around product fit, capacity, export readiness and suitable buyer demand.",
      shortHint: "Introduce products, capacity and export-ready supply opportunities.",
      ctaLabel: "Introduce your products",
      needs: "Products / Capacity / Export markets",
      href: "/en/supplier-enquiry",
      image: "/media/home/buyer-producer-coffee-harvest.webp",
      imageAlt: "Coffee producer inspecting crop quality during harvest at origin",
    },
  ],
  resources: [
    {
      title: "Coffee Catalogue",
      description:
        "Green coffee catalogue with product profiles, origins and commercial details.",
      ctaLabel: "View catalogue",
      image: "/media/home/catalogues/coffee-catalogue-cover.webp",
      href: "/assets/a3/resources/a3-coffee-catalogue.pdf",
      ariaLabel: "Open Coffee Catalogue PDF",
    },
    {
      title: "Sugar Catalogue",
      description:
        "Sugar catalogue covering cane and beet sugar options by origin, grade and packing requirement.",
      ctaLabel: "View catalogue",
      image: "/media/home/catalogues/sugar-catalogue-cover.webp",
      href: "/assets/a3/resources/a3-sugar-catalogue.pdf",
      ariaLabel: "Open Sugar Catalogue PDF",
    },
  ],
  cta: {
    title: "Tell us what you need.",
    text:
      "Send your product, origin, packing, volume or destination requirement and A3 will review suitable supply options and trade conditions.",
    image: homeAssets.media.finalCta,
    imageAlt: "Busy covered food market hall with shoppers, fresh produce and food stalls",
    primary: { label: "Request a Quote", href: "/en/request-a-quote" },
  },
} as const;

export const pages: Record<string, PageContent> = {
  home: {
    locale: "en",
    slug: "/en",
    title: "Trusted food sourcing and trade for commercial buyers.",
    description:
      "A3 connects selected producers with wholesalers, distributors, foodservice, retail and industrial buyers across selected international markets.",
    sections: ["proof", "what-a3-does", "products", "process", "markets", "buyers", "documentation", "resources", "cta"],
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
        "Explore selected food and beverage categories sourced for commercial buyers, including sugar, coffee, cocoa products, grains and oilseeds, dairy and milk powders, oils and fats, starches and sweeteners, dried fruit and nuts, frozen foods and consumer foods.",
      canonicalPath: "/en/products",
      ogTitle: "Products sourced for commercial food buyers",
      ogDescription:
        "Product discovery for A3's main food and beverage sourcing categories for commercial buyers.",
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
    slug: "/en/products/green-coffee-beans",
    title: "Green coffee sourcing for commercial buyers.",
    description:
      "A3 supports selected green coffee sourcing opportunities, with a current focus on South American origins and Brazilian coffee profiles where available.",
    sections: ["overview", "buyer-fields", "products", "documentation", "cta"],
    seo: {
      metaTitle: "Green Coffee Sourcing | A3 Food & Beverage",
      metaDescription:
        "A3 supports selected green coffee sourcing opportunities for commercial buyers, including South American and Brazilian coffee profiles where available.",
      canonicalPath: "/en/products/green-coffee-beans",
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
  elleMina: {
    locale: "en",
    slug: "/en/products/elle-mina",
    title: "Elle Mina consumer and professional margarine and butter.",
    description:
      "Elle Mina is A3's own consumer and professional margarine and butter range for retail, foodservice, bakery and distribution buyers.",
    sections: ["overview", "range", "applications", "trade-information", "cta"],
    seo: {
      metaTitle: "Elle Mina | A3 Food & Beverage",
      metaDescription:
        "Explore Elle Mina, A3's own consumer and professional margarine and butter range for retail, foodservice, bakery and distribution buyers.",
      canonicalPath: "/en/products/elle-mina",
      ogTitle: "Elle Mina",
      ogDescription:
        "A3's own consumer and professional margarine and butter range for commercial food buyers.",
      ogImage: {
        src: homeAssets.media.elleMinaProfessionalMargarine,
        alt: "Elle Mina professional butter flavoured margarine in a bakery setting",
      },
      robots,
      locale: "en",
      sitemapInclude: true,
      structuredDataType: "Product",
      targetKeyword: "Elle Mina margarine",
      secondaryKeywords: ["consumer margarine", "professional margarine", "butter supplier"],
    },
  },
  markets: {
    locale: "en",
    slug: "/en/markets-sourcing",
    title: "Markets shaped by product, origin and demand.",
    description:
      "A3 works across source and sales markets to connect commercial buyers with suitable food producers, manufacturers and suppliers.",
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
    title: "How We Work",
    description:
      "A3 reviews product fit, producer capability, market access, commercial terms and shipment readiness before presenting workable food supply options.",
    sections: ["hero", "intro", "framework", "flow", "routes", "cta"],
    seo: {
      metaTitle: "How We Work | A3 Food & Beverage",
      metaDescription:
        "Learn how A3 reviews product requirements, supplier capability, market access, commercial terms and shipment readiness before presenting workable supply routes.",
      canonicalPath: "/en/how-we-work",
      ogTitle: "How We Work",
      ogDescription: "A practical framework for turning food product requirements into workable supply routes.",
      robots,
      locale: "en",
      sitemapInclude: true,
      structuredDataType: "WebPage",
      targetKeyword: "food supply route review",
      secondaryKeywords: ["food sourcing process", "workable food trade", "international food trade coordination"],
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
    title: "Contact A3 Food & Beverage.",
    description:
      "Reach A3 for general company questions, partnership conversations and direct contact details.",
    sections: ["form", "direct-contact"],
    seo: {
      metaTitle: "Contact | A3 Food & Beverage",
      metaDescription:
        "Contact A3 Food & Beverage for company information, partnership conversations and direct commercial inquiries.",
      canonicalPath: "/en/contact",
      ogTitle: "Contact A3 Food & Beverage",
      ogDescription: "Direct contact details and general inquiry route for A3 Food & Beverage.",
      robots,
      locale: "en",
      sitemapInclude: true,
      structuredDataType: "ContactPage",
      targetKeyword: "A3 Food & Beverage contact",
      secondaryKeywords: ["food trade contact", "A3 company information", "A3 partnership inquiry"],
    },
  },
  cookiePolicy: {
    locale: "en",
    slug: "/en/cookie-policy",
    title: "Cookie Policy.",
    description:
      "How A3 Food & Beverage uses cookies and similar technologies on its website.",
    sections: ["overview", "cookies-used", "control", "contact"],
    seo: {
      metaTitle: "Cookie Policy | A3 Food & Beverage",
      metaDescription:
        "Read the A3 Food & Beverage cookie policy, including how cookies may be used and how visitors can control browser settings.",
      canonicalPath: "/en/cookie-policy",
      ogTitle: "Cookie Policy",
      ogDescription: "Cookie information for the A3 Food & Beverage website.",
      robots,
      locale: "en",
      lastModified: "2026-07-08",
      sitemapInclude: true,
      structuredDataType: "WebPage",
      targetKeyword: "A3 Food & Beverage cookie policy",
      secondaryKeywords: ["website cookies", "cookie settings", "A3 cookies"],
    },
  },
  privacyPolicy: {
    locale: "en",
    slug: "/en/privacy-policy",
    title: "Privacy Policy.",
    description:
      "How A3 Food & Beverage collects, uses and protects personal information shared through its website and business inquiries.",
    sections: ["overview", "data-collected", "use", "sharing", "rights", "contact"],
    seo: {
      metaTitle: "Privacy Policy | A3 Food & Beverage",
      metaDescription:
        "Read the A3 Food & Beverage privacy policy covering business inquiries, contact data, website usage and data protection rights.",
      canonicalPath: "/en/privacy-policy",
      ogTitle: "Privacy Policy",
      ogDescription: "Privacy information for A3 Food & Beverage website visitors and business contacts.",
      robots,
      locale: "en",
      lastModified: "2026-07-08",
      sitemapInclude: true,
      structuredDataType: "WebPage",
      targetKeyword: "A3 Food & Beverage privacy policy",
      secondaryKeywords: ["data protection", "business inquiry privacy", "personal information"],
    },
  },
  modernSlaveryAct: {
    locale: "en",
    slug: "/en/modern-slavery-act",
    title: "Modern Slavery Act Statement.",
    description:
      "A3 Food & Beverage's draft statement on modern slavery, human trafficking risk awareness and supplier expectations.",
    sections: ["statement", "supply-chain", "expectations", "review", "contact"],
    seo: {
      metaTitle: "Modern Slavery Act Statement | A3 Food & Beverage",
      metaDescription:
        "Read A3 Food & Beverage's Modern Slavery Act statement covering supplier expectations, trade relationships and risk awareness.",
      canonicalPath: "/en/modern-slavery-act",
      ogTitle: "Modern Slavery Act Statement",
      ogDescription: "Modern slavery and human trafficking statement for A3 Food & Beverage.",
      robots,
      locale: "en",
      lastModified: "2026-07-08",
      sitemapInclude: true,
      structuredDataType: "WebPage",
      targetKeyword: "A3 Food & Beverage modern slavery statement",
      secondaryKeywords: ["Modern Slavery Act", "supplier expectations", "human trafficking statement"],
    },
  },
  requestQuote: {
    locale: "en",
    slug: "/en/request-a-quote",
    title: "Request a food sourcing quote.",
    description:
      "Share your product, origin, packing, volume, destination and documentation requirements so A3 can review the best commercial next step.",
    sections: ["form", "direct-contact", "thank-you"],
    seo: {
      metaTitle: "Request a Quote | A3 Food & Beverage",
      metaDescription:
        "Request a food sourcing quote from A3 with product, origin, packing, volume, destination market and documentation details.",
      canonicalPath: "/en/request-a-quote",
      ogTitle: "Request a Food Sourcing Quote",
      ogDescription: "Share a commercial food sourcing requirement with A3 Food & Beverage.",
      robots,
      locale: "en",
      sitemapInclude: true,
      structuredDataType: "WebPage",
      targetKeyword: "request food sourcing quote",
      secondaryKeywords: ["request quote", "product sourcing inquiry", "send requirement"],
    },
  },
};

export const productFamilies: ProductFamily[] = productCategories.map((category) => ({
  id: category.slug,
  slug: category.slug,
  title: category.title,
  summary: category.shortDescription,
  description: category.longDescription,
  buyerFit: "Commercial buyers, distributors, food manufacturers, foodservice groups and retail teams where relevant.",
  availabilityModel:
    category.slug === "green-coffee-beans"
      ? "Regularly sourced and inquiry-led depending on origin, crop, grade and volume."
      : "Available on request depending on product, origin, specification, volume and destination.",
  applications: ["Wholesale", "Food manufacturing", "Foodservice", "Retail / distribution"],
  origins: ["Selected origins by requirement"],
  packingOptions: ["Supplier-specific formats", "Packing reviewed by inquiry"],
  supplyModels: ["Source on request", "Spot / seasonal where available", "Contract supply by inquiry"],
  documentationAvailable: ["Specification sheets", "Supplier-held certifications", "Shipment documentation"],
  ctaLabel: category.ctaLabel,
  featured: ["green-coffee-beans", "sugar"].includes(category.slug),
  futureChildren: category.exampleProducts,
  image: { alt: `${category.title} sourcing category for commercial buyers` },
  seo: category.slug === "green-coffee-beans" ? pages.coffee.seo : category.slug === "sugar" ? pages.sugar.seo : pages.products.seo,
  relatedPages: ["/en/products", "/en/markets-sourcing", "/en/request-a-quote"],
  relatedResources:
    category.slug === "green-coffee-beans" ? ["coffee-catalogue"] : category.slug === "sugar" ? ["sugar-catalogue"] : ["product-specifications"],
}));

export const productDetails: ProductDetail[] = [
  {
    id: "brazilian-green-coffee",
    slug: "brazil-green-coffee",
    family: "green-coffee-beans",
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
    relatedProducts: ["green-coffee-beans", "sugar", "consumer-foods"],
    visibleOnHome: true,
  },
  {
    id: "south-america",
    title: "South America Sourcing",
    role: "sourceMarket",
    description: "Selected soft commodity sourcing opportunities, especially green coffee and sugar.",
    relatedProducts: ["green-coffee-beans", "sugar"],
    visibleOnHome: true,
  },
  {
    id: "selected-markets",
    title: "Selected International Markets",
    role: "destinationMarket",
    description: "Buyer relationships and opportunities depending on product, documentation and requirement.",
    relatedProducts: ["green-coffee-beans", "sugar", "oils-fats"],
    visibleOnHome: true,
  },
];

export const services: ServiceItem[] = [
  {
    id: "sourcing",
    title: "Sourcing",
    description: "Identify selected producers and product availability based on buyer requirement, origin and market fit.",
    relatedProductFamilies: ["green-coffee-beans", "sugar"],
  },
  {
    id: "producer-selection",
    title: "Producer Selection",
    description: "Review producer fit, commercial credibility, specification capability and documentation availability.",
    relatedProductFamilies: ["green-coffee-beans", "sugar", "oils-fats"],
  },
  {
    id: "product-matching",
    title: "Product Matching",
    description: "Match grade, packing, application, shipment model and buyer expectations before moving to quote flow.",
    relatedProductFamilies: ["green-coffee-beans", "sugar", "starches-sweeteners"],
  },
  {
    id: "quality-inspection",
    title: "Quality & Inspection",
    description: "Support product specifications, loading checks and inspection needs where applicable to the shipment.",
    relatedProductFamilies: ["green-coffee-beans", "sugar"],
  },
  {
    id: "documentation",
    title: "Documentation & Certifications",
    description: "Coordinate supplier-held certifications, product documents and shipment documentation where available.",
    relatedProductFamilies: ["green-coffee-beans", "sugar", "dairy-milk-powders"],
  },
  {
    id: "logistics",
    title: "Logistics Coordination",
    description: "Support origin-to-destination shipment coordination with practical attention to trade requirements.",
    relatedProductFamilies: ["green-coffee-beans", "sugar", "frozen-foods"],
  },
  {
    id: "private-label",
    title: "Private Label",
    description: "Review private label possibilities by product, supplier capability, packing and target market.",
    relatedProductFamilies: ["consumer-foods", "dried-fruit-nuts", "oils-fats"],
  },
  {
    id: "after-sales",
    title: "After-sales Support",
    description: "Support commercial follow-through and repeat trade through personal buyer and supplier relationships.",
    relatedProductFamilies: ["green-coffee-beans", "sugar"],
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
    relatedProducts: ["green-coffee-beans"],
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
    relatedProducts: ["green-coffee-beans", "sugar"],
  },
  {
    id: "product-specifications",
    title: "Product Specifications",
    type: "specification",
    summary: "A future resource structure for product specifications and technical data sheets.",
    filePlaceholder: "product-specifications.pdf",
    gated: true,
    relatedProducts: ["green-coffee-beans", "sugar", "starches-sweeteners", "dried-fruit-nuts"],
  },
  {
    id: "market-notes",
    title: "Market Notes",
    type: "marketNote",
    summary: "Future notes on origin, sourcing conditions and trade documentation topics.",
    filePlaceholder: "market-notes.pdf",
    gated: false,
    relatedProducts: ["green-coffee-beans", "sugar"],
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
