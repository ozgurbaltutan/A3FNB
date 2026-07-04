import Image from "next/image";
import type { ReactNode } from "react";
import { Container, LinkButton } from "@/components/ui";

type ContactInfoItem = {
  label: string;
  value: string;
  href?: string;
};

type ContactInfoGroup = {
  title: string;
  text?: string;
  items: ContactInfoItem[];
};

type SupportLink = {
  label: string;
  href: string;
};

export function ContactPageLayout({
  title,
  text,
  image,
  imageAlt,
  formTitle,
  formText,
  children,
  infoTitle,
  infoText,
  infoGroups,
  supportTitle,
  supportText,
  supportPrimary,
  supportSecondary,
}: {
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  formTitle: string;
  formText: string;
  children: ReactNode;
  infoTitle: string;
  infoText: string;
  infoGroups: ContactInfoGroup[];
  supportTitle: string;
  supportText: string;
  supportPrimary: SupportLink;
  supportSecondary?: SupportLink;
}) {
  return (
    <>
      <section className="contact-page-hero bg-deep-dark text-surface">
        <Container className="a3-container contact-page-hero__inner">
          <div className="contact-page-hero__copy">
            <h1 className="text-surface">{title}</h1>
            <p>{text}</p>
          </div>
          <div className="contact-page-hero__media">
            <Image
              className="object-cover"
              src={image}
              alt={imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
            />
          </div>
        </Container>
      </section>

      <section className="contact-page-main bg-paper">
        <Container className="a3-container contact-page-grid">
          <article className="contact-form-panel">
            <div className="contact-panel-heading">
              <h2>{formTitle}</h2>
              <p>{formText}</p>
            </div>
            {children}
          </article>

          <aside className="contact-info-panel">
            <div className="contact-info-panel__intro">
              <h2>{infoTitle}</h2>
              <p>{infoText}</p>
            </div>
            <div className="contact-info-groups">
              {infoGroups.map((group) => (
                <section className="contact-info-group" key={group.title}>
                  <h3>{group.title}</h3>
                  {group.text ? <p className="contact-info-group__text">{group.text}</p> : null}
                  <div className="contact-info-list">
                    {group.items.map((item) => (
                      <ContactInfoLine item={item} key={`${group.title}-${item.label}`} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </aside>
        </Container>
      </section>

      <section className="contact-support-band bg-teal text-surface">
        <Container className="a3-container contact-support-band__inner">
          <div>
            <h2>{supportTitle}</h2>
            <p>{supportText}</p>
          </div>
          <div className="contact-support-band__actions">
            <LinkButton href={supportPrimary.href} variant="light">
              {supportPrimary.label}
            </LinkButton>
            {supportSecondary ? (
              <LinkButton href={supportSecondary.href} variant="darkOutline">
                {supportSecondary.label}
              </LinkButton>
            ) : null}
          </div>
        </Container>
      </section>
    </>
  );
}

function ContactInfoLine({ item }: { item: ContactInfoItem }) {
  return (
    <div className="contact-info-line">
      <p>{item.label}</p>
      {item.href ? (
        <a className="premium-focus" href={item.href}>
          {item.value}
        </a>
      ) : (
        <span>{item.value}</span>
      )}
    </div>
  );
}
