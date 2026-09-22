import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomePage from "@/components/HomePage";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { organizationSchema } from "@/lib/schema";

type Props = { params: Promise<{ locale: string }> };

function localizedLocale(value: string): Locale {
  if (!isLocale(value) || value === "en") notFound();
  return value;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(localizedLocale(locale), "home", "/");
}

export default async function LocalizedHomePage({ params }: Props) {
  const { locale: value } = await params;
  const locale = localizedLocale(value);
  const dictionary = getDictionary(locale);
  const organization = organizationSchema();
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} /><HomePage locale={locale} dictionary={dictionary} /></>;
}
