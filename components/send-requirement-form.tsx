"use client";

import { useEffect, useMemo, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { company, contactIntents, productCategories } from "@/content/site";
import { Button, TextArea, TextInput } from "@/components/ui";

const buyerIntents = contactIntents.filter((intent) => intent !== "I want to contact A3 directly");
const supplierIntent = "I am a producer / supplier";
const productLabels: Record<string, string> = {
  "icumsa-45": "ICUMSA 45 / White Refined Sugar",
  "icumsa-150": "ICUMSA 150 / Crystal Sugar",
  "icumsa-600-1200": "ICUMSA 600-1200 / Brown Raw Sugar",
  "icumsa-60-100": "ICUMSA 60-100 / White Beet Sugar",
  "selected-specialty-lots": "Selected Specialty Lots",
  "arabica-santos-fine-cup": "Arabica Santos Fine Cup",
  "arabica-santos-good-cup": "Arabica Santos Good Cup",
  "arabica-rio-minas": "Arabica Rio Minas",
  "robusta-conilon": "Robusta Conilon",
  "elle-mina": "Elle Mina",
  "consumer-margarine": "Elle Mina Consumer Margarine",
  "professional-margarine": "Elle Mina Professional Margarine",
  butter: "Elle Mina Butter",
};

function valueFrom(formData: FormData, name: string) {
  return String(formData.get(name) || "").trim();
}

function buildMailto(subject: string, lines: string[]) {
  const body = lines.filter(Boolean).join("\n");
  return `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function openMailDraft(href: string) {
  window.location.href = href;
}

function titleFromSlug(value: string) {
  return value
    .replace(/-/g, " ")
    .replace(/\band\b/g, "&")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function categoryTitleFromParam(value: string | null) {
  if (!value) return productCategories[0]?.title ?? "";

  const match = productCategories.find((category) => category.slug === value || category.title.toLowerCase() === value.toLowerCase());
  return match?.title ?? productCategories[0]?.title ?? "";
}

function productTitleFromParam(value: string | null) {
  if (!value) return "";
  return productLabels[value] ?? titleFromSlug(value);
}

function SummaryNotice({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="contact-form-success">
      <h2 className="type-h3 text-ink">{title}</h2>
      <p className="type-p2 mt-3 text-ink/78">{text}</p>
      <p className="type-p3 mt-4">
        Prefer to send it manually? Email{" "}
        <a className="font-semibold text-teal premium-focus" href={`mailto:${company.email}`}>
          {company.email}
        </a>
        .
      </p>
    </div>
  );
}

function FormStep({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="trade-form-step">
      <legend>
        <span>{number}</span>
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

function CustomSelect({
  label,
  name,
  options,
  required,
  value,
  onChange,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}) {
  const initialValue = value ?? (required ? options[0] ?? "" : "");
  const [internalValue, setInternalValue] = useState(initialValue);
  const [open, setOpen] = useState(false);
  const selectedValue = value ?? internalValue;
  const activeIndex = useMemo(() => Math.max(0, options.indexOf(selectedValue)), [options, selectedValue]);
  const buttonId = `${name}-select-button`;
  const listId = `${name}-select-list`;

  function selectOption(option: string) {
    setInternalValue(option);
    onChange?.(option);
    setOpen(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (open) {
        selectOption(options[activeIndex] ?? options[0] ?? "");
      } else {
        setOpen(true);
      }
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      const nextIndex = (activeIndex + direction + options.length) % options.length;
      selectOption(options[nextIndex] ?? "");
      setOpen(true);
    }
  }

  return (
    <label
      className="custom-select-field"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false);
        }
      }}
    >
      <span>
        {label}
        {required ? <span> *</span> : null}
      </span>
      <input name={name} type="hidden" value={selectedValue} />
      <div className="custom-select" onKeyDown={handleKeyDown}>
        <button
          aria-controls={listId}
          aria-expanded={open}
          aria-haspopup="listbox"
          className="custom-select__button premium-focus"
          id={buttonId}
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          <span>{selectedValue || "Select"}</span>
          <span aria-hidden="true" className="custom-select__chevron" />
        </button>
        {open ? (
          <div aria-labelledby={buttonId} className="custom-select__menu" id={listId} role="listbox" tabIndex={-1}>
            {options.map((option) => {
              const selected = option === selectedValue;
              return (
                <button
                  aria-selected={selected}
                  className={`custom-select__option ${selected ? "is-selected" : ""}`}
                  key={option}
                  onClick={() => selectOption(option)}
                  role="option"
                  type="button"
                >
                  {option}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </label>
  );
}

export function GeneralContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = valueFrom(formData, "name");
    const companyName = valueFrom(formData, "company");
    const reason = valueFrom(formData, "reason");
    const subject = `A3 contact inquiry - ${reason || name || companyName || "General"}`;

    openMailDraft(
      buildMailto(subject, [
        "General contact inquiry",
        "",
        `Name: ${name}`,
        `Company: ${companyName}`,
        `Email: ${valueFrom(formData, "email")}`,
        `Reason: ${reason}`,
        "",
        "Message:",
        valueFrom(formData, "message"),
      ]),
    );
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <SummaryNotice
        title="Email draft prepared."
        text="Your email app should now show a prepared message to A3. You can review the text and send it when ready."
      />
    );
  }

  return (
    <form className="contact-form contact-form--compact" onSubmit={handleSubmit}>
      <div className="grid gap-5 md:grid-cols-2">
        <TextInput label="Name" name="name" required autoComplete="name" />
        <TextInput label="Company" name="company" autoComplete="organization" />
        <TextInput label="Business email" name="email" type="email" required autoComplete="email" />
        <CustomSelect
          label="Reason"
          name="reason"
          required
          options={["General contact", "Company information", "Partnership discussion", "Supplier introduction", "Other"]}
        />
      </div>
      <TextArea
        label="Message"
        name="message"
        required
        placeholder="Tell A3 what you would like to discuss."
        rows={5}
      />
      <div>
        <Button type="submit" size="large">
          Prepare Email
        </Button>
      </div>
    </form>
  );
}

export function SendRequirementForm() {
  const [submitted, setSubmitted] = useState(false);
  const [requestType, setRequestType] = useState(buyerIntents[0]);
  const [productCategory, setProductCategory] = useState(productCategories[0]?.title ?? "");
  const [productDetail, setProductDetail] = useState("");
  const supplier = requestType === supplierIntent;
  const hasSelectedProduct = !supplier && productDetail.trim().length > 0;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setProductCategory(categoryTitleFromParam(params.get("category")));
    setProductDetail(productTitleFromParam(params.get("product")));
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const companyName = valueFrom(formData, "company");
    const selectedProductCategory = valueFrom(formData, "productCategory");
    const selectedProductDetail = valueFrom(formData, "productDetail");
    const subject = supplier
      ? `Supplier introduction - ${companyName || "A3"}`
      : `Quote request - ${selectedProductDetail || selectedProductCategory || "Food sourcing"} - ${companyName || "A3"}`;

    const commonLines = [
      supplier ? "Supplier introduction" : "Quote / sourcing request",
      "",
      `Request type: ${requestType}`,
      `Name: ${valueFrom(formData, "name")}`,
      `Company: ${companyName}`,
      `Business email: ${valueFrom(formData, "email")}`,
      `Country / market: ${valueFrom(formData, "country")}`,
      `Product / category: ${selectedProductCategory}`,
      `Product / grade: ${selectedProductDetail}`,
      "",
    ];

    const buyerLines = [
      "Product requirement",
      `Origin preference: ${valueFrom(formData, "originPreference")}`,
      `Estimated volume: ${valueFrom(formData, "estimatedVolume")}`,
      `Timing: ${valueFrom(formData, "timing")}`,
      `Packing format: ${valueFrom(formData, "packingFormat")}`,
      `Destination country / port: ${valueFrom(formData, "destination")}`,
      `Order type: ${valueFrom(formData, "orderType")}`,
      `Certification need: ${valueFrom(formData, "certificationNeed")}`,
      `Documents required: ${valueFrom(formData, "documentsRequired")}`,
      "",
    ];

    const supplierLines = [
      "Supplier details",
      `Company country: ${valueFrom(formData, "companyCountry")}`,
      `Main products: ${valueFrom(formData, "mainProducts")}`,
      `Current export markets: ${valueFrom(formData, "currentExportMarkets")}`,
      `Certifications: ${valueFrom(formData, "certifications")}`,
      `Capacity / MOQ: ${valueFrom(formData, "capacity")}`,
      `Available documents: ${valueFrom(formData, "availableDocuments")}`,
      `Target markets: ${valueFrom(formData, "targetMarkets")}`,
      "",
    ];

    openMailDraft(
      buildMailto(subject, [
        ...commonLines,
        ...(supplier ? supplierLines : buyerLines),
        "Additional notes",
        valueFrom(formData, "message"),
      ]),
    );
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <SummaryNotice
        title="Quote email draft prepared."
        text="Your email app should now show a prepared request to A3 with the details you entered. Review it, add attachments if needed, and send when ready."
      />
    );
  }

  return (
    <form className="contact-form contact-form--quote" onSubmit={handleSubmit}>
      <FormStep number="01" title="Contact details">
        {hasSelectedProduct ? (
          <div className="trade-form-selection" aria-live="polite">
            <span>Selected product</span>
            <strong>
              {productCategory}
              {" / "}
              {productDetail}
            </strong>
          </div>
        ) : null}
        <div className="grid gap-5 md:grid-cols-2">
          <CustomSelect
            label="Request type"
            name="requestType"
            options={buyerIntents}
            required
            value={requestType}
            onChange={setRequestType}
          />
          <CustomSelect
            label="Product / category"
            name="productCategory"
            options={productCategories.map((category) => category.title)}
            required
            value={productCategory}
            onChange={setProductCategory}
          />
          <TextInput
            label="Product / grade"
            name="productDetail"
            placeholder="ICUMSA 45, cocoa powder, frozen potato products..."
            value={productDetail}
            onChange={(event) => setProductDetail(event.target.value)}
          />
          <TextInput label="Name" name="name" required autoComplete="name" />
          <TextInput label="Company" name="company" required autoComplete="organization" />
          <TextInput label="Business email" name="email" type="email" required autoComplete="email" />
          <TextInput label="Country / target market" name="country" required autoComplete="country-name" />
        </div>
      </FormStep>

      {supplier ? (
        <FormStep number="02" title="Supplier profile">
          <div className="grid gap-5 md:grid-cols-2">
            <TextInput label="Company country" name="companyCountry" />
            <TextInput label="Main products" name="mainProducts" required />
            <TextInput label="Current export markets" name="currentExportMarkets" />
            <TextInput label="Certifications" name="certifications" />
            <TextInput label="Capacity / MOQ" name="capacity" />
            <TextInput label="Available documents" name="availableDocuments" />
            <TextInput label="Target markets" name="targetMarkets" />
          </div>
        </FormStep>
      ) : (
        <>
          <FormStep number="02" title="Product requirement">
            <div className="grid gap-5 md:grid-cols-2">
              <TextInput label="Origin preference" name="originPreference" placeholder="Brazil, Europe, selected origin..." />
              <TextInput label="Estimated volume" name="estimatedVolume" required placeholder="Monthly, one-off, container volume..." />
              <TextInput label="Timing" name="timing" placeholder="Spot, seasonal, recurring, target date..." />
              <TextInput label="Packing format" name="packingFormat" placeholder="25kg bags, 60kg bags, retail pack..." />
            </div>
          </FormStep>
          <FormStep number="03" title="Trade details">
            <div className="grid gap-5 md:grid-cols-2">
              <TextInput label="Destination country / port" name="destination" required />
              <CustomSelect
                label="Order type"
                name="orderType"
                options={["Spot", "Seasonal", "Recurring", "Contract discussion"]}
              />
              <TextInput label="Certification need" name="certificationNeed" placeholder="Organic, Halal, ISO, supplier-held..." />
              <TextInput label="Documents required" name="documentsRequired" placeholder="Specification, COA, origin documents..." />
            </div>
          </FormStep>
        </>
      )}

      <FormStep number={supplier ? "03" : "04"} title="Additional notes">
        <TextArea
          label="Message"
          name="message"
          required
          placeholder="Share any commercial context, target price, shipment preference, documents, samples, or attachments you plan to include."
          rows={6}
        />
      </FormStep>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="large">
          Prepare Quote Email
        </Button>
        <p className="type-micro text-ink/68">A prefilled email will open so you can review and send the request.</p>
      </div>
    </form>
  );
}
