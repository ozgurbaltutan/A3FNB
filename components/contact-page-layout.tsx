import type { ReactNode } from "react";
import { InnerPageHero } from "@/components/inner-page-hero";
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
      <InnerPageHero title={title} text={text} image={image} imageAlt={imageAlt} className="contact-page-hero" />

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
