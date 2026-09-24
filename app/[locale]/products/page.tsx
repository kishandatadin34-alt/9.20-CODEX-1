import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductsPage from "@/components/ProductsPage";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, localizedLocales, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return localizedLocales.map((locale) => ({ locale }));
}

function parseLocale(value: string): Locale {
  if (!isLocale(value) || value === "en") notFound();
  return value;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = parseLocale((await params).locale);
  const dictionary = getDictionary(locale);
  return buildPageMetadata(locale, "/products", `${dictionary.productsPage.title} | BESDERWILL`, dictionary.productsPage.description);
}

export default async function LocalizedProductsPage({ params }: Props) {
  const locale = parseLocale((await params).locale);
  return <ProductsPage locale={locale} dictionary={getDictionary(locale)} />;
}
