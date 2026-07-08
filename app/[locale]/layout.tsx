import { notFound } from "next/navigation";
import { Footer, Header } from "@/components/navigation";
import { GlobalReveal } from "@/components/global-reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { activeLocale } from "@/content/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return [{ locale: activeLocale }];
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (locale !== activeLocale) {
    notFound();
  }

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <GlobalReveal />
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
