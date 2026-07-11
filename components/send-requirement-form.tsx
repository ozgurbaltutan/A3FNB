"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { company } from "@/content/site";
import { Button, SelectInput, TextArea, TextInput } from "@/components/ui";

function valueFrom(formData: FormData, name: string) {
  return String(formData.get(name) || "").trim();
}

function buildMailto(subject: string, lines: string[]) {
  return `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

export function GeneralContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [reason, setReason] = useState("General contact");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = valueFrom(formData, "name");
    const companyName = valueFrom(formData, "company");
    window.location.href = buildMailto(`A3 contact inquiry - ${reason || name || companyName || "General"}`, [
      "General contact inquiry",
      "",
      `Name: ${name}`,
      `Company: ${companyName}`,
      `Email: ${valueFrom(formData, "email")}`,
      `Reason: ${reason}`,
      "",
      "Message:",
      valueFrom(formData, "message"),
    ]);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="contact-form-success">
        <h2 className="type-h3 text-ink">Email draft prepared.</h2>
        <p className="type-p2 mt-3 text-ink/78">Your email app should now show a prepared message to A3. Review it and send when ready.</p>
        <p className="type-p3 mt-4">Prefer to send it manually? Email <a className="font-semibold text-teal premium-focus" href={`mailto:${company.email}`}>{company.email}</a>.</p>
      </div>
    );
  }

  return (
    <form className="contact-form contact-form--compact" onSubmit={handleSubmit}>
      <div className="grid gap-5 md:grid-cols-2">
        <TextInput autoComplete="name" label="Name" name="name" required />
        <TextInput autoComplete="organization" label="Company" name="company" />
        <TextInput autoComplete="email" label="Business email" name="email" required type="email" />
        <SelectInput label="Reason" name="reason" onChange={(event) => setReason(event.target.value)} options={["General contact", "Company information", "Partnership discussion", "Other"]} required value={reason} />
      </div>
      <TextArea label="Message" name="message" placeholder="Tell A3 what you would like to discuss." required rows={5} />
      <div><Button size="large" type="submit">Prepare Email</Button></div>
      <p className="type-p3 text-ink/70">Are you a producer or supplier? <Link className="font-semibold text-teal premium-focus" href="/en/supplier-enquiry">Introduce your company →</Link></p>
    </form>
  );
}
