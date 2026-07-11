import type { ReactNode } from "react";
import { company } from "@/content/site";
import { Container } from "@/components/ui";

export function EnquiryPageLayout({
  title,
  text,
  children,
  supplier = false,
}: {
  title?: string;
  text?: string;
  children: ReactNode;
  supplier?: boolean;
}) {
  return (
    <section className="enquiry-page-main bg-paper">
        <Container className="a3-container enquiry-page-grid">
          <article className="enquiry-form-panel">
            {title ? (
              <header className="enquiry-inline-header">
                <h1>{title}</h1>
                {text ? <p>{text}</p> : null}
              </header>
            ) : null}
            {children}
          </article>
          <aside className="enquiry-side-panel">
            <section className="enquiry-direct-contact">
              <h2>Direct contact</h2>
              <p>{supplier ? "Prefer to introduce your company directly?" : "Prefer to discuss your requirement directly?"}</p>
              <a href={`mailto:${company.email}`}>{company.email}</a>
              <a href={`tel:${company.phone.replace(/\s+/g, "")}`}>{company.phone}</a>
            </section>
          </aside>
        </Container>
      </section>
  );
}
