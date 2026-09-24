import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogProductPage from "@/components/CatalogProductPage";
import { catalogProducts, findCatalogProduct } from "@/lib/catalog-products";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, localizedLocales, type Locale } from "@/lib/i18n";
import { catalogProductMetadata } from "@/lib/page-metadata";

type Props = { params: Promise<{ locale: string; slug: string; product: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return localizedLocales.flatMap((locale) => catalogProducts.map((item) => ({ locale, slug: item.category, product: item.slug })));
}

function parse(localeValue: string, category: string, productSlug: string) {
  if (!isLocale(localeValue) || localeValue === "en") notFound();
  const product = findCatalogProduct(category, productSlug);
  if (!product) notFound();
  return { locale: localeValue as Locale, product };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeValue, slug, product: productSlug } = await params;
  const { locale, product } = parse(localeValue, slug, productSlug);
  return catalogProductMetadata(locale, product);
}

export default async function Page({ params }: Props) {
  const { locale: localeValue, slug, product: productSlug } = await params;
  const { locale, product } = parse(localeValue, slug, productSlug);
  return <CatalogProductPage locale={locale} dictionary={getDictionary(locale)} product={product} />;
}
