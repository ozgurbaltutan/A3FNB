"use client";

import { useState } from "react";
import { contactIntents, productFamilies } from "@/content/site";
import { Button, Checkbox, SelectInput, TextArea, TextInput } from "@/components/ui";

export function SendRequirementForm() {
  const [submitted, setSubmitted] = useState(false);
  const [requestType, setRequestType] = useState(contactIntents[0]);

  if (submitted) {
    return (
      <div className="rounded-[var(--radius-card)] border border-border bg-surface p-8">
        <h2 className="type-h2">Requirement received.</h2>
        <p className="type-p1 mt-4">
          This is a mocked thank-you state for the MVP. A3 will later review the product, origin, packing, volume, destination market and documentation details before commercial follow-up.
        </p>
      </div>
    );
  }

  const supplier = requestType === "I am a producer / supplier";

  return (
    <form
      className="grid gap-5"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="type-p3 font-medium text-ink">Request type</span>
          <select
            className="premium-focus min-h-12 rounded-[var(--radius-control)] border border-border bg-surface px-4 text-ink"
            name="requestType"
            value={requestType}
            onChange={(event) => setRequestType(event.target.value)}
          >
            {contactIntents.map((intent) => (
              <option key={intent} value={intent}>
                {intent}
              </option>
            ))}
          </select>
        </label>
        <SelectInput
          label="Product / category"
          name="productCategory"
          options={productFamilies.map((product) => product.title)}
          required
        />
        <TextInput label="Name" name="name" required />
        <TextInput label="Company" name="company" required />
        <TextInput label="Business email" name="email" type="email" required />
        <TextInput label="Country / target market" name="country" required />
        <TextInput label="Estimated volume or timing" name="estimatedVolume" placeholder="Volume, timing or recurring need" />
        <TextInput label="Timing" name="timing" placeholder="Spot, seasonal or recurring" />
      </div>

      {supplier ? (
        <div className="grid gap-5 rounded-[var(--radius-card)] border border-border bg-paper p-5 md:grid-cols-2">
          <TextInput label="Company country" name="companyCountry" />
          <TextInput label="Main products" name="mainProducts" />
          <TextInput label="Current export markets" name="currentExportMarkets" />
          <TextInput label="Certifications" name="certifications" />
          <TextInput label="Capacity / MOQ" name="capacity" />
          <TextInput label="Available documents" name="availableDocuments" />
          <TextInput label="Target markets" name="targetMarkets" />
        </div>
      ) : (
        <div className="grid gap-5 rounded-[var(--radius-card)] border border-border bg-paper p-5 md:grid-cols-2">
          <TextInput label="Origin preference" name="originPreference" />
          <TextInput label="Packing format" name="packingFormat" />
          <TextInput label="Destination country / port" name="destination" />
          <TextInput label="Certification need" name="certificationNeed" />
          <SelectInput label="Spot or recurring order" name="orderType" options={["Spot", "Seasonal", "Recurring", "Contract discussion"]} />
          <TextInput label="Documents required" name="documentsRequired" />
        </div>
      )}

      <TextArea
        label="Message"
        name="message"
        required
        placeholder="Share product, origin, packing, volume, destination market and documentation needs."
      />
      <Checkbox
        name="tradeContext"
        label="I understand this MVP form does not submit to a backend yet. A future integration will handle secure submissions."
      />
      <div>
        <Button type="submit" size="large">
          Send Requirement
        </Button>
      </div>
    </form>
  );
}
