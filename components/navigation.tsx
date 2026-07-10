"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { company, navigation, productCategories, productCategoryHref } from "@/content/site";
import { Container, LinkButton } from "@/components/ui";

const menuProducts = productCategories.map((category) => ({
  label: category.title,
  href: productCategoryHref(category),
}));

const footerProducts = [{ label: "View All Products", href: "/en/products" }, ...menuProducts];
const productsNavigationItem = navigation.find((item) => item.label === "Products");
const mobileProductLinks = productsNavigationItem?.children ?? footerProducts;

const footerLegalLinks = [
  { label: "Cookie Policy", href: "/en/cookie-policy" },
  { label: "Privacy Policy", href: "/en/privacy-policy" },
  { label: "Modern Slavery Act", href: "/en/modern-slavery-act" },
];

const footerSocialLinks = [
  { label: "LinkedIn", href: "#", icon: "linkedin" },
  { label: "X / Twitter", href: "#", icon: "twitter" },
  { label: "Instagram", href: "#", icon: "instagram" },
];

const activeFooterSocialLinks = footerSocialLinks.filter((item) => item.href && item.href !== "#");

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;

    setMobileOpen(false);
    setProductsOpen(false);
    frame = window.requestAnimationFrame(() => setAtTop(window.scrollY <= 1));

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    let frame = 0;
    const updateScrollState = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        setAtTop(window.scrollY <= 1);
        frame = 0;
      });
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen && !productsOpen) return;

    const closeMenus = () => {
      setMobileOpen(false);
      setProductsOpen(false);
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) closeMenus();
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenus();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [mobileOpen, productsOpen]);

  return (
    <header
      ref={headerRef}
      className="site-header fixed top-0 z-50 w-full"
      data-at-top={atTop}
      data-mega-open={productsOpen}
      data-mobile-open={mobileOpen}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setProductsOpen(false);
          setMobileOpen(false);
        }
      }}
      onBlurCapture={(event) => {
        const nextFocus = event.relatedTarget instanceof Node ? event.relatedTarget : null;
        if (!nextFocus || !event.currentTarget.contains(nextFocus)) {
          setProductsOpen(false);
          setMobileOpen(false);
        }
      }}
    >
      <Container className="a3-container site-header__container">
        <div className="site-header__shell" onMouseLeave={() => setProductsOpen(false)}>
          <div className="site-header__surface flex min-h-[var(--header-height)] items-center justify-between gap-6">
            <Link
              className="site-header__logo-link premium-focus"
              href="/en"
              aria-label="A3 Food & Beverage home"
              onFocus={() => setProductsOpen(false)}
              onMouseEnter={() => setProductsOpen(false)}
            >
              <Image
                src="/brand/a3logo_full_light.svg"
                alt="A3 Food & Beverage"
                width={112}
                height={44}
                priority
                className="site-header__logo site-header__logo--light"
              />
              <Image
                src="/brand/a3logo_full.svg"
                alt=""
                width={112}
                height={44}
                aria-hidden="true"
                className="site-header__logo site-header__logo--dark"
              />
            </Link>
            <nav className="site-header__nav hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
              {navigation.map((item) =>
                item.label === "Products" ? (
                  <Link
                    key={item.href}
                    className="site-nav-link site-nav-link--products premium-focus type-nav"
                    href={item.href}
                    aria-haspopup="true"
                    aria-expanded={productsOpen}
                    aria-controls="desktop-products-navigation"
                    onMouseEnter={() => setProductsOpen(true)}
                    onFocus={() => setProductsOpen(true)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <Link
                    key={item.href}
                    className="site-nav-link premium-focus type-nav"
                    href={item.href}
                    onFocus={() => setProductsOpen(false)}
                    onMouseEnter={() => setProductsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>
            <div className="site-header__quote hidden lg:block" onFocusCapture={() => setProductsOpen(false)} onMouseEnter={() => setProductsOpen(false)}>
              <LinkButton href="/en/request-a-quote" size="small" variant="mediaSecondary" className="site-header__quote-button">
                Request a Quote
              </LinkButton>
            </div>
            <button
              className="site-header__menu-button button-base button-media-secondary premium-focus type-button rounded-[var(--radius-control)] border px-4 py-3 lg:hidden"
              type="button"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              onClick={() => {
                setProductsOpen(false);
                setMobileOpen((value) => !value);
              }}
            >
              Menu
            </button>
          </div>
          <MegaMenu open={productsOpen} onNavigate={() => setProductsOpen(false)} />
          <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
        </div>
      </Container>
    </header>
  );
}

function MegaMenu({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  return (
    <div
      id="desktop-products-navigation"
      className="mega-menu"
      data-open={open}
      aria-hidden={!open}
      inert={!open ? true : undefined}
    >
      <div className="mega-menu__clip">
        <div className="mega-menu__inner grid gap-10 lg:grid-cols-[minmax(20rem,0.58fr)_minmax(0,1fr)] lg:gap-14">
          <div className="mega-menu__intro">
            <div className="mega-menu__brand-card">
              <Link className="mega-menu__brand-title premium-focus" href="/en/products" onClick={onNavigate}>
                Product categories
              </Link>
              <p className="mega-menu__brand-copy">
                Food commodities, ingredients and packaged products selected around buyer requirements,
                producer availability and workable commercial terms.
              </p>
              <Link className="mega-menu__all-link premium-focus" href="/en/products" onClick={onNavigate}>
                <span>View all product categories</span>
                <span aria-hidden="true">{"\u2192"}</span>
              </Link>
              <div className="mega-menu__exclusive">
                <p className="mega-menu__exclusive-label">Own brand</p>
                <Link className="mega-menu__all-link premium-focus" href="/en/products/elle-mina" onClick={onNavigate}>
                  <span>Elle Mina margarine &amp; butter</span>
                  <span aria-hidden="true">{"\u2192"}</span>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <div className="mega-menu__categories">
              {menuProducts.map((item) => (
                <Link className="mega-menu__category premium-focus" href={item.href} key={item.href} onClick={onNavigate}>
                  <span>{item.label}</span>
                  <span className="mega-menu__category-arrow" aria-hidden="true">
                    {"\u2192"}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [productsExpanded, setProductsExpanded] = useState(false);

  useEffect(() => {
    if (!open) {
      setProductsExpanded(false);
    }
  }, [open]);

  return (
    <div
      id="mobile-navigation"
      className="mobile-navigation"
      data-open={open}
      aria-hidden={!open}
      inert={!open ? true : undefined}
    >
      <div className="mobile-navigation__clip">
        <div className="mobile-navigation__inner grid gap-2">
          {navigation.map((item) =>
            item.label === "Products" ? (
              <div className="mobile-navigation__group" key={item.href}>
                <button
                  className="mobile-navigation__trigger premium-focus type-nav"
                  type="button"
                  aria-expanded={productsExpanded}
                  aria-controls="mobile-products-navigation"
                  onClick={() => setProductsExpanded((value) => !value)}
                >
                  <span>{item.label}</span>
                  <span className="mobile-navigation__chevron" aria-hidden="true" />
                </button>
                <div
                  id="mobile-products-navigation"
                  className="mobile-navigation__children"
                  data-open={productsExpanded}
                  aria-hidden={!productsExpanded}
                  inert={!productsExpanded ? true : undefined}
                >
                  <div className="mobile-navigation__children-clip">
                    <div className="mobile-navigation__children-list">
                      {mobileProductLinks.map((child) => (
                        <Link className="mobile-navigation__child premium-focus" href={child.href} key={child.href} onClick={onClose}>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link className="mobile-navigation__link premium-focus type-nav" href={item.href} key={item.href} onClick={onClose}>
                {item.label}
              </Link>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const registeredOfficeLines = [
    company.registeredOffice.street,
    `${company.registeredOffice.city}, England, ${company.registeredOffice.postalCode}`,
  ];

  return (
    <footer className="site-footer">
      <Container className="a3-container site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Link className="site-footer__logo premium-focus" href="/en" aria-label="A3 Food & Beverage home">
              <Image
                src="/brand/a3-footer-lockup-light.svg"
                alt="A3 Food & Beverage LTD"
                width={1030}
                height={420}
                priority={false}
              />
            </Link>
            <p className="site-footer__description type-p3">{company.positioning}</p>
            {activeFooterSocialLinks.length > 0 ? (
              <div className="site-footer__social" aria-label="Social links">
                {activeFooterSocialLinks.map((item) => {
                  const isExternal = item.href.startsWith("http");

                  return (
                    <a
                      className="footer-social-link premium-focus"
                      href={item.href}
                      aria-label={item.label}
                      key={item.label}
                      rel={isExternal ? "noreferrer" : undefined}
                      target={isExternal ? "_blank" : undefined}
                    >
                      <FooterSocialIcon icon={item.icon} />
                    </a>
                  );
                })}
              </div>
            ) : null}
          </div>
          <div className="site-footer__columns">
            <FooterColumn
              title="Site"
              links={navigation.map((item) => ({ label: item.label, href: item.href }))}
              className="site-footer__column site-footer__column--site"
            />
            <FooterColumn
              title="Products"
              links={footerProducts}
              className="site-footer__column site-footer__column--products"
              listClassName="footer-link-grid footer-link-grid--products"
            />
            <FooterColumn title="Legal" links={footerLegalLinks} className="site-footer__column site-footer__column--legal" />
            <div className="site-footer__column site-footer__column--contact">
              <p className="footer-heading">Contact</p>
              <div className="footer-contact-list type-p3">
                <a className="footer-link footer-link--contact premium-focus" href={`mailto:${company.email}`}>
                  {company.email}
                </a>
                <a className="footer-link footer-link--contact premium-focus" href={`tel:${company.phone.replace(/\s+/g, "")}`}>
                  {company.phone}
                </a>
                <p className="footer-contact-address">
                  {registeredOfficeLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="site-footer__legal">
          <p className="site-footer__copyright">Copyright {currentYear} {company.legalName}. All rights reserved.</p>
          <div className="site-footer__legal-items">
            <span>Company No. {company.companyNumber}</span>
            <span>VAT {company.vatNumber}</span>
            <span>D-U-N-S {company.dunsNumber}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterSocialIcon({ icon }: { icon: string }) {
  if (icon === "linkedin") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M6.9 9.4H3.7v10.4h3.2V9.4Zm.2-3.2c0-1-.8-1.8-1.9-1.8s-1.9.8-1.9 1.8S4.1 8 5.2 8s1.9-.8 1.9-1.8Zm13.6 7.6c0-3.1-1.7-4.7-4-4.7-1.8 0-2.7 1-3.1 1.7V9.4h-3.1v10.4h3.2v-5.2c0-1.4.3-2.7 2-2.7s1.7 1.5 1.7 2.8v5.1h3.2v-6Z" />
      </svg>
    );
  }

  if (icon === "instagram") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M8 3.8h8A4.2 4.2 0 0 1 20.2 8v8a4.2 4.2 0 0 1-4.2 4.2H8A4.2 4.2 0 0 1 3.8 16V8A4.2 4.2 0 0 1 8 3.8Zm0 1.9A2.3 2.3 0 0 0 5.7 8v8A2.3 2.3 0 0 0 8 18.3h8a2.3 2.3 0 0 0 2.3-2.3V8A2.3 2.3 0 0 0 16 5.7H8Zm4 3.2a3.1 3.1 0 1 1 0 6.2 3.1 3.1 0 0 1 0-6.2Zm0 1.9a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Zm4.1-2.2a.8.8 0 1 1 1.6 0 .8.8 0 0 1-1.6 0Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M17.7 4.2h3.1l-6.7 7.7 7.9 10h-6.2l-4.9-6.4-5.5 6.4H2.3l7.2-8.3L2 4.2h6.4l4.4 5.8 4.9-5.8Zm-1.1 16h1.7L7.5 5.8H5.7l10.9 14.4Z" />
    </svg>
  );
}

function FooterColumn({
  title,
  links,
  className,
  listClassName,
}: {
  title: string;
  links: { label: string; href: string }[];
  className?: string;
  listClassName?: string;
}) {
  return (
    <div className={className}>
      <p className="footer-heading">{title}</p>
      <div className={clsx("footer-link-list", listClassName)}>
        {links.map((link) => (
          <Link className="footer-link premium-focus" href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
