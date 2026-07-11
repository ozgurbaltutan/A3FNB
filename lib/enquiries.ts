import { findEnquiryCategory, findEnquiryProduct } from "@/lib/enquiry-catalog";

export type QuoteEnquiry = {
  kind: "quote";
  categorySlug: string;
  productId?: string;
  productDetail?: string;
  name: string;
  company: string;
  email: string;
  country: string;
  estimatedVolume: string;
  destination: string;
  originPreference?: string;
  timing?: string;
  packingFormat?: string;
  orderType?: string;
  certificationNeed?: string;
  documentsRequired?: string;
  message?: string;
  fax?: string;
};

export type SupplierEnquiry = {
  kind: "supplier";
  company: string;
  name: string;
  email: string;
  country: string;
  mainProducts: string;
  website?: string;
  currentExportMarkets?: string;
  certifications?: string;
  message?: string;
  fax?: string;
};

export type EnquiryPayload = QuoteEnquiry | SupplierEnquiry;

export type EnquiryValidationResult =
  | { ok: true; data: EnquiryPayload }
  | { ok: false; fieldErrors: Record<string, string>; message: string };

const limits: Record<string, number> = {
  name: 120,
  company: 160,
  email: 254,
  country: 120,
  categorySlug: 80,
  productId: 120,
  productDetail: 180,
  estimatedVolume: 160,
  destination: 160,
  originPreference: 160,
  timing: 160,
  packingFormat: 160,
  orderType: 80,
  certificationNeed: 240,
  documentsRequired: 240,
  mainProducts: 500,
  website: 240,
  currentExportMarkets: 300,
  certifications: 300,
  message: 3000,
  fax: 200,
};

function text(source: Record<string, unknown>, key: string) {
  const value = typeof source[key] === "string" ? source[key].trim() : "";
  return value.slice(0, limits[key] ?? 500);
}

function required(errors: Record<string, string>, data: Record<string, string>, key: string, label: string) {
  if (!data[key]) errors[key] = `${label} is required.`;
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateEnquiryPayload(input: unknown): EnquiryValidationResult {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { ok: false, fieldErrors: {}, message: "The request could not be read." };
  }

  const source = input as Record<string, unknown>;
  const kind = source.kind === "supplier" ? "supplier" : source.kind === "quote" ? "quote" : undefined;
  if (!kind) return { ok: false, fieldErrors: {}, message: "Unknown enquiry type." };

  if (text(source, "fax")) {
    return { ok: false, fieldErrors: {}, message: "The request could not be submitted." };
  }

  const common = {
    name: text(source, "name"),
    company: text(source, "company"),
    email: text(source, "email").toLowerCase(),
    country: text(source, "country"),
  };
  const errors: Record<string, string> = {};
  required(errors, common, "name", "Name");
  required(errors, common, "company", "Company");
  required(errors, common, "email", "Business email");
  required(errors, common, "country", "Country / target market");
  if (common.email && !validEmail(common.email)) errors.email = "Enter a valid business email address.";

  if (kind === "supplier") {
    const data: SupplierEnquiry = {
      kind,
      ...common,
      mainProducts: text(source, "mainProducts"),
      website: text(source, "website") || undefined,
      currentExportMarkets: text(source, "currentExportMarkets") || undefined,
      certifications: text(source, "certifications") || undefined,
      message: text(source, "message") || undefined,
    };
    if (!data.mainProducts) errors.mainProducts = "Main products are required.";
    if (Object.keys(errors).length) return { ok: false, fieldErrors: errors, message: "Check the highlighted fields." };
    return { ok: true, data };
  }

  const categorySlug = text(source, "categorySlug");
  const productId = text(source, "productId");
  const estimatedVolume = text(source, "estimatedVolume");
  const destination = text(source, "destination");
  if (!findEnquiryCategory(categorySlug)) errors.categorySlug = "Select a valid product category.";
  if (productId && !findEnquiryProduct(productId, categorySlug)) errors.productId = "Select a product from the chosen category.";
  if (!estimatedVolume) errors.estimatedVolume = "Estimated volume is required.";
  if (!destination) errors.destination = "Destination country or port is required.";

  const data: QuoteEnquiry = {
    kind,
    ...common,
    categorySlug,
    productId: productId || undefined,
    productDetail: text(source, "productDetail") || undefined,
    estimatedVolume,
    destination,
    originPreference: text(source, "originPreference") || undefined,
    timing: text(source, "timing") || undefined,
    packingFormat: text(source, "packingFormat") || undefined,
    orderType: text(source, "orderType") || undefined,
    certificationNeed: text(source, "certificationNeed") || undefined,
    documentsRequired: text(source, "documentsRequired") || undefined,
    message: text(source, "message") || undefined,
  };
  if (Object.keys(errors).length) return { ok: false, fieldErrors: errors, message: "Check the highlighted fields." };
  return { ok: true, data };
}

export function enquiryEmailContent(data: EnquiryPayload, requestId: string) {
  const category = data.kind === "quote" ? findEnquiryCategory(data.categorySlug) : undefined;
  const product = data.kind === "quote" ? findEnquiryProduct(data.productId, data.categorySlug) : undefined;
  const entries = data.kind === "quote"
    ? [
        ["Reference", requestId], ["Category", category?.title], ["Product", product?.title || data.productDetail],
        ["Name", data.name], ["Company", data.company], ["Business email", data.email], ["Country / market", data.country],
        ["Estimated volume", data.estimatedVolume], ["Destination", data.destination], ["Origin preference", data.originPreference],
        ["Timing", data.timing], ["Packing format", data.packingFormat], ["Order type", data.orderType],
        ["Certification need", data.certificationNeed], ["Documents required", data.documentsRequired], ["Additional notes", data.message],
      ]
    : [
        ["Reference", requestId], ["Company", data.company], ["Contact name", data.name], ["Business email", data.email],
        ["Country", data.country], ["Main products", data.mainProducts], ["Website", data.website],
        ["Current export markets", data.currentExportMarkets], ["Certifications", data.certifications], ["Message", data.message],
      ];
  const clean = entries.filter((entry): entry is [string, string] => Boolean(entry[1]));
  const escape = (value: string) => value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character] ?? character);
  const subject = data.kind === "quote"
    ? `Quote request ${requestId} - ${product?.title || category?.title || "Food sourcing"} - ${data.company}`
    : `Supplier introduction ${requestId} - ${data.company}`;
  return {
    subject,
    text: clean.map(([label, value]) => `${label}: ${value}`).join("\n"),
    html: `<h1>${escape(data.kind === "quote" ? "Quote request" : "Supplier introduction")}</h1><table>${clean.map(([label, value]) => `<tr><th align="left" valign="top" style="padding:6px 16px 6px 0">${escape(label)}</th><td style="padding:6px 0">${escape(value).replace(/\n/g, "<br>")}</td></tr>`).join("")}</table>`,
  };
}
