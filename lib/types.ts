export type Locale = "en" | "fr" | "es";

export type ImageAsset = {
  src?: string;
  alt: string;
  caption?: string;
  focalPoint?: {
    x: number;
    y: number;
  };
};

export type PageSeo = {
  metaTitle: string;
  metaDescription: string;
  canonicalPath: string;
  ogTitle: string;
  ogDescription: string;
  ogImage?: ImageAsset;
  robots: {
    index: boolean;
    follow: boolean;
  };
  locale: Locale;
  alternateLocales?: Partial<Record<Locale, string>>;
  lastModified?: string;
  sitemapInclude: boolean;
  structuredDataType?: "WebPage" | "CollectionPage" | "ContactPage" | "AboutPage" | "Product";
  targetKeyword?: string;
  secondaryKeywords?: string[];
};

export type PageContent = {
  locale: Locale;
  slug: string;
  title: string;
  description: string;
  seo: PageSeo;
  sections: string[];
};

export type NavigationItem = {
  label: string;
  href: string;
  children?: NavigationItem[];
  featured?: boolean;
};

export type ProductFamily = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  buyerFit: string;
  availabilityModel: string;
  applications: string[];
  origins: string[];
  packingOptions?: string[];
  supplyModels?: string[];
  documentationAvailable: string[];
  ctaLabel: string;
  featured: boolean;
  futureChildren: string[];
  image: ImageAsset;
  seo: PageSeo;
  relatedPages: string[];
  relatedResources: string[];
};

export type ProductCategory = {
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  iconKey: string;
  imageKey?: string;
  exampleProducts: string[];
  ctaLabel: string;
};

export type ProductDetail = {
  id: string;
  slug: string;
  family: string;
  title: string;
  summary: string;
  originOptions: string[];
  gradeOrSpec: string[];
  packingOptions: string[];
  applications: string[];
  certificationsAvailable: string[];
  documentationAvailable: string[];
  supplyModels: string[];
  ctaLabel: string;
};

export type MarketRegionRole =
  | "headquarters"
  | "sourceMarket"
  | "destinationMarket"
  | "marketExperience"
  | "emergingSource";

export type MarketRegion = {
  id: string;
  title: string;
  role: MarketRegionRole;
  description: string;
  relatedProducts: string[];
  visibleOnHome: boolean;
};

export type ProcessStep = {
  id: string;
  title: string;
  description: string;
};

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  relatedProductFamilies: string[];
};

export type ResourceItem = {
  id: string;
  title: string;
  type: "catalogue" | "companyProfile" | "specification" | "marketNote" | "documentation";
  summary: string;
  filePlaceholder: string;
  gated: boolean;
  relatedProducts: string[];
  seo?: PageSeo;
};

export type FormRequirement = {
  requestType: string;
  productCategory: string;
  name: string;
  company: string;
  email: string;
  country: string;
  estimatedVolume: string;
  timing: string;
  originPreference: string;
  packingFormat: string;
  destination: string;
  certificationNeed: string;
  orderType: string;
  documentsRequired: string;
  message: string;
};

export type StructuredDataConfig = {
  organization: boolean;
  website: boolean;
  breadcrumb: boolean;
  itemList?: boolean;
  product?: boolean;
  faq?: boolean;
};
