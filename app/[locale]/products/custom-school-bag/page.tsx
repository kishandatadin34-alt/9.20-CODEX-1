import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPage from "@/components/ProductPage";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata, siteUrl } from "@/lib/seo";

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
  const product = { "@context": "https://schema.org", "@type": "Product", name: dictionary.product.options.specifications[0][1], description: dictionary.seo.product.description, image: `${siteUrl}/images/custom-pink-school-backpack.png`, brand: { "@type": "Brand", name: "BESDERWILL" }, manufacturer: { "@type": "Organization", name: "BESDERWILL" } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }} /><ProductPage locale={locale} dictionary={dictionary} /></>;
}
