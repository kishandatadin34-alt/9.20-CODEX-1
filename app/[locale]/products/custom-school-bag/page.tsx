import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPage from "@/components/ProductPage";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, localePath, type Locale } from "@/lib/i18n";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

type Props = { params: Promise<{ locale: string }> };

function localizedLocale(value: string): Locale {
  if (!isLocale(value) || value === "en") notFound();
  return value;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(localizedLocale(locale), "product", "/products/custom-school-bag");
}

export default async function LocalizedProductPage({ params }: Props) {
  const { locale: value } = await params;
  const locale = localizedLocale(value);
  const dictionary = getDictionary(locale);
  const path = "/products/custom-school-bag";
  const localizedPath = localePath(locale, path);
  const product = { "@context": "https://schema.org", "@type": "Product", "@id": absoluteUrl(`${localizedPath}#product`), url: absoluteUrl(localizedPath), name: dictionary.product.options.specifications[0][1], description: dictionary.seo.product.description, image: absoluteUrl("/images/custom-pink-school-backpack.png"), category: dictionary.home.products.items[0].title, brand: { "@type": "Brand", name: "BESDERWILL" }, manufacturer: { "@id": absoluteUrl("/#organization") }, additionalProperty: dictionary.product.options.specifications.slice(1).map(([name, itemValue]) => ({ "@type": "PropertyValue", name, value: itemValue })) };
  const breadcrumb = breadcrumbSchema([{ name: dictionary.common.nav.home, path: localePath(locale, "/") }, { name: dictionary.common.nav.products, path: `${localePath(locale, "/")}#products` }, { name: dictionary.product.options.specifications[0][1], path: localizedPath }]);
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} /><ProductPage locale={locale} dictionary={dictionary} /></>;
}
