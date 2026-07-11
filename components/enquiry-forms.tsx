"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { Button, LinkButton } from "@/components/ui";
import type { EnquiryCategoryOption } from "@/lib/enquiry-catalog";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "error"; message: string; fieldErrors: Record<string, string> }
  | { status: "success"; requestId: string };

function formValue(formData: FormData, name: string) {
  return String(formData.get(name) || "").trim();
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  autoComplete,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
}) {
  const errorId = `${name}-error`;
  return (
    <label className="enquiry-field">
      <span>{label}{required ? <b aria-hidden="true"> *</b> : null}</span>
      <input
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        autoComplete={autoComplete}
        name={name}
        placeholder={placeholder}
        required={required}
        type={type}
      />
      {error ? <small id={errorId}>{error}</small> : null}
    </label>
  );
}

function TextAreaField({ label, name, placeholder, error }: { label: string; name: string; placeholder?: string; error?: string }) {
  const errorId = `${name}-error`;
  return (
    <label className="enquiry-field enquiry-field--wide">
      <span>{label}</span>
      <textarea aria-describedby={error ? errorId : undefined} aria-invalid={Boolean(error)} name={name} placeholder={placeholder} rows={4} />
      {error ? <small id={errorId}>{error}</small> : null}
    </label>
  );
}

function CustomSelectField({
  label,
  name,
  options,
  value,
  onChange,
  required,
  error,
  emptyLabel = "Select",
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  emptyLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const fieldId = useId();
  const errorId = `${name}-error`;
  const labelId = `${fieldId}-label`;
  const valueId = `${fieldId}-value`;
  const listId = `${fieldId}-list`;
  const selectedIndex = options.findIndex((option) => option.value === value);

  useEffect(() => {
    if (!open) return;
    const closeOnOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutside, true);
    return () => document.removeEventListener("pointerdown", closeOnOutside, true);
  }, [open]);

  function openMenu(preferredIndex = selectedIndex >= 0 ? selectedIndex : 0) {
    setActiveIndex(Math.max(0, Math.min(preferredIndex, options.length - 1)));
    setOpen(true);
  }

  function closeMenu(restoreFocus = false) {
    setOpen(false);
    if (restoreFocus) requestAnimationFrame(() => buttonRef.current?.focus());
  }

  function choose(index: number) {
    const option = options[index];
    if (!option) return;
    onChange(option.value);
    closeMenu(true);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (!options.length) return;
    if (event.key === "Escape" && open) {
      event.preventDefault();
      closeMenu(true);
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        openMenu(event.key === "ArrowDown" ? Math.max(selectedIndex, 0) : Math.max(options.length - 1, 0));
      } else {
        const direction = event.key === "ArrowDown" ? 1 : -1;
        setActiveIndex((current) => (current + direction + options.length) % options.length);
      }
      return;
    }
    if (open && (event.key === "Home" || event.key === "End")) {
      event.preventDefault();
      setActiveIndex(event.key === "Home" ? 0 : Math.max(options.length - 1, 0));
      return;
    }
    if (open && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      choose(activeIndex);
    }
  }

  const selectedLabel = options[selectedIndex]?.label || emptyLabel;
  return (
    <div className="enquiry-field custom-select-field" ref={rootRef}>
      <span id={labelId}>{label}{required ? <b aria-hidden="true"> *</b> : null}</span>
      <input name={name} type="hidden" value={value} />
      <div className="custom-select">
        <button
          aria-activedescendant={open && options[activeIndex] ? `${fieldId}-option-${activeIndex}` : undefined}
          aria-controls={listId}
          aria-describedby={error ? errorId : undefined}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-invalid={Boolean(error)}
          aria-labelledby={`${labelId} ${valueId}`}
          className="custom-select__button premium-focus"
          disabled={!options.length}
          onClick={() => open ? closeMenu() : openMenu()}
          onKeyDown={handleKeyDown}
          ref={buttonRef}
          role="combobox"
          type="button"
        >
          <span className={!value ? "is-placeholder" : undefined} id={valueId}>{selectedLabel}</span>
          <span aria-hidden="true" className="custom-select__chevron" />
        </button>
        {open ? (
          <div aria-labelledby={labelId} className="custom-select__menu" id={listId} role="listbox">
            {options.map((option, index) => (
              <button
                aria-selected={option.value === value}
                className={`custom-select__option ${option.value === value ? "is-selected" : ""} ${index === activeIndex ? "is-active" : ""}`}
                id={`${fieldId}-option-${index}`}
                key={option.value}
                onClick={() => choose(index)}
                onMouseEnter={() => setActiveIndex(index)}
                role="option"
                tabIndex={-1}
                type="button"
              >{option.label}</button>
            ))}
          </div>
        ) : null}
      </div>
      {error ? <small id={errorId}>{error}</small> : null}
    </div>
  );
}

async function submitEnquiry(payload: Record<string, string>) {
  const response = await fetch("/api/enquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  return { response, data };
}

function SuccessPanel({ requestId, productTitle, headingLevel = 2 }: { requestId: string; productTitle?: string; headingLevel?: 1 | 2 }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => headingRef.current?.focus(), []);
  return (
    <div className="enquiry-success" role="status">
      <span className="enquiry-success__mark" aria-hidden="true">✓</span>
      <p className="enquiry-eyebrow">Requirement received</p>
      {headingLevel === 1
        ? <h1 ref={headingRef} tabIndex={-1}>Thank you. A3 will review your enquiry.</h1>
        : <h2 ref={headingRef} tabIndex={-1}>Thank you. A3 will review your enquiry.</h2>}
      {productTitle ? <p>Your request for <strong>{productTitle}</strong> has been recorded.</p> : null}
      <p>The team will reply using the business email you provided.</p>
      <div className="enquiry-reference"><span>Reference</span><strong>{requestId}</strong></div>
      <LinkButton href="/en/products">Explore products</LinkButton>
    </div>
  );
}

export function QuoteEnquiryForm({
  catalog,
  initialCategorySlug = "",
  initialProductId = "",
}: {
  catalog: EnquiryCategoryOption[];
  initialCategorySlug?: string;
  initialProductId?: string;
}) {
  const [categorySlug, setCategorySlug] = useState(initialCategorySlug);
  const [productId, setProductId] = useState(initialProductId);
  const [editingProduct, setEditingProduct] = useState(!initialProductId);
  const [orderType, setOrderType] = useState("");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const category = catalog.find((item) => item.slug === categorySlug);
  const product = category?.products.find((item) => item.id === productId);
  const products = useMemo(() => category?.products ?? [], [category]);
  const errors = submitState.status === "error" ? submitState.fieldErrors : {};
  const submitting = submitState.status === "submitting";

  useEffect(() => {
    if (productId && !products.some((item) => item.id === productId)) setProductId("");
  }, [productId, products]);

  const categoryOptions = useMemo(() => catalog.map((item) => ({ value: item.slug, label: item.title })), [catalog]);
  const productOptions = useMemo(() => products.map((item) => ({ value: item.id, label: item.title })), [products]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitState({ status: "submitting" });
    const formData = new FormData(event.currentTarget);
    const keys = ["categorySlug", "productId", "productDetail", "name", "company", "email", "country", "estimatedVolume", "destination", "originPreference", "timing", "packingFormat", "orderType", "certificationNeed", "documentsRequired", "message", "fax"];
    const payload = Object.fromEntries(keys.map((key) => [key, formValue(formData, key)]));
    try {
      const { response, data } = await submitEnquiry({ kind: "quote", ...payload });
      if (!response.ok) {
        setSubmitState({ status: "error", message: data.message || "The request could not be submitted.", fieldErrors: data.fieldErrors || {} });
        return;
      }
      setSubmitState({ status: "success", requestId: data.requestId });
    } catch {
      setSubmitState({ status: "error", message: "A connection error interrupted the request. Please try again.", fieldErrors: {} });
    }
  }

  if (submitState.status === "success") return <SuccessPanel headingLevel={initialProductId ? 1 : 2} requestId={submitState.requestId} productTitle={product?.title} />;

  return (
    <form className="enquiry-form" noValidate={false} onSubmit={handleSubmit}>
      {product && !editingProduct ? (
        <div className="selected-enquiry-product">
          <Image alt={product.imageAlt} height={108} src={product.image} width={72} />
          <div><h1>Request a quote</h1><strong>{product.title}</strong></div>
          <Button className="enquiry-change-product" onClick={() => setEditingProduct(true)} size="small" variant="text"><span>Change product</span><i aria-hidden="true" /></Button>
          <input name="categorySlug" type="hidden" value={categorySlug} />
          <input name="productId" type="hidden" value={productId} />
        </div>
      ) : (
        <div className="enquiry-product-picker">
          {initialProductId ? <h1 className="enquiry-picker-title">Request a quote</h1> : null}
          <CustomSelectField error={errors.categorySlug} label="Product category" name="categorySlug" onChange={(value) => { setCategorySlug(value); setProductId(""); }} options={categoryOptions} required value={categorySlug} />
          <CustomSelectField emptyLabel="Select a product (optional)" error={errors.productId} label="Product / grade" name="productId" onChange={setProductId} options={productOptions} value={productId} />
          <Field label="Other product or grade" name="productDetail" placeholder="Add a grade or specification if it is not listed" />
          {initialProductId ? <Button className="enquiry-picker-cancel" onClick={() => { setCategorySlug(initialCategorySlug); setProductId(initialProductId); setEditingProduct(false); }} size="small" variant="text">Keep original selection</Button> : null}
        </div>
      )}

      <div className="enquiry-form-grid">
        <Field autoComplete="name" error={errors.name} label="Name" name="name" required />
        <Field autoComplete="organization" error={errors.company} label="Company" name="company" required />
        <Field autoComplete="email" error={errors.email} label="Business email" name="email" required type="email" />
        <Field autoComplete="country-name" error={errors.country} label="Country / target market" name="country" required />
        <Field error={errors.estimatedVolume} label="Estimated volume" name="estimatedVolume" placeholder="One container, monthly volume, trial order..." required />
        <Field error={errors.destination} label="Destination country / port" name="destination" required />
      </div>

      <details className="enquiry-optional-details" onToggle={(event) => setDetailsOpen(event.currentTarget.open)}>
        <summary aria-expanded={detailsOpen} className="premium-focus"><span><strong>Additional trade details</strong><small>Optional — add what you already know</small></span><i aria-hidden="true" className="enquiry-disclosure-chevron" /></summary>
        <div className="enquiry-form-grid">
          <Field label="Origin preference" name="originPreference" placeholder="Brazil, Europe, open to suitable origins..." />
          <Field label="Timing" name="timing" placeholder="Spot, recurring, target date..." />
          <Field label="Packing format" name="packingFormat" placeholder="25 kg bags, retail pack, bulk..." />
          <CustomSelectField emptyLabel="Select if known" label="Order type" name="orderType" onChange={setOrderType} options={["Spot", "Seasonal", "Recurring", "Contract discussion"].map((value) => ({ value, label: value }))} value={orderType} />
          <Field label="Certification needs" name="certificationNeed" placeholder="Organic, Halal, ISO..." />
          <Field label="Required documents" name="documentsRequired" placeholder="Specification, COA, origin documents..." />
          <TextAreaField label="Additional notes" name="message" placeholder="Target specification, commercial context or any other useful detail." />
        </div>
      </details>

      <input autoComplete="off" hidden name="fax" tabIndex={-1} />
      {submitState.status === "error" ? <div className="enquiry-form-error" role="alert"><strong>We could not send your request.</strong><span>{submitState.message}</span><a href="mailto:info@a3fnb.com">Email A3 manually</a></div> : null}
      <div className="enquiry-submit-row">
        <Button disabled={submitting} size="large" type="submit">{submitting ? "Sending requirement…" : "Send requirement"}</Button>
        <p>By submitting, you agree that A3 may use these details to respond. See the <Link href="/en/privacy-policy">Privacy Policy</Link>.</p>
      </div>
      <p className="enquiry-path-switch">Are you a producer or supplier? <Link href="/en/supplier-enquiry">Introduce your company <span aria-hidden="true">→</span></Link></p>
    </form>
  );
}

export function SupplierEnquiryForm() {
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const errors = submitState.status === "error" ? submitState.fieldErrors : {};
  const submitting = submitState.status === "submitting";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitState({ status: "submitting" });
    const formData = new FormData(event.currentTarget);
    const keys = ["company", "name", "email", "country", "mainProducts", "website", "currentExportMarkets", "certifications", "message", "fax"];
    const payload = Object.fromEntries(keys.map((key) => [key, formValue(formData, key)]));
    try {
      const { response, data } = await submitEnquiry({ kind: "supplier", ...payload });
      if (!response.ok) {
        setSubmitState({ status: "error", message: data.message || "The introduction could not be submitted.", fieldErrors: data.fieldErrors || {} });
        return;
      }
      setSubmitState({ status: "success", requestId: data.requestId });
    } catch {
      setSubmitState({ status: "error", message: "A connection error interrupted the request. Please try again.", fieldErrors: {} });
    }
  }

  if (submitState.status === "success") return <SuccessPanel requestId={submitState.requestId} />;
  return (
    <form className="enquiry-form" onSubmit={handleSubmit}>
      <div className="enquiry-form-grid">
        <Field autoComplete="organization" error={errors.company} label="Company" name="company" required />
        <Field autoComplete="name" error={errors.name} label="Contact name" name="name" required />
        <Field autoComplete="email" error={errors.email} label="Business email" name="email" required type="email" />
        <Field autoComplete="country-name" error={errors.country} label="Company country" name="country" required />
        <label className="enquiry-field enquiry-field--wide"><span>Main products <b aria-hidden="true">*</b></span><textarea aria-invalid={Boolean(errors.mainProducts)} name="mainProducts" required rows={3} />{errors.mainProducts ? <small>{errors.mainProducts}</small> : null}</label>
        <Field autoComplete="url" label="Website" name="website" placeholder="https://" type="url" />
        <Field label="Current export markets" name="currentExportMarkets" />
        <Field label="Certifications" name="certifications" />
        <TextAreaField label="Message" name="message" placeholder="Share capacity, MOQ, target markets or other useful context." />
      </div>
      <input autoComplete="off" hidden name="fax" tabIndex={-1} />
      {submitState.status === "error" ? <div className="enquiry-form-error" role="alert"><strong>We could not send your introduction.</strong><span>{submitState.message}</span><a href="mailto:info@a3fnb.com">Email A3 manually</a></div> : null}
      <div className="enquiry-submit-row"><Button disabled={submitting} size="large" type="submit">{submitting ? "Sending introduction…" : "Send supplier introduction"}</Button><p>See how A3 handles your details in the <Link href="/en/privacy-policy">Privacy Policy</Link>.</p></div>
      <p className="enquiry-path-switch">Looking to source a product? <Link href="/en/request-a-quote">Request a buyer quote <span aria-hidden="true">→</span></Link></p>
    </form>
  );
}
