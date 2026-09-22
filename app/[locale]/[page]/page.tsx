import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoLandingPage from "@/components/SeoLandingPage";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, localizedLocales, type Locale } from "@/lib/i18n";
import { contentPageSlugs, getContentPage, type ContentPageSlug } from "@/lib/page-content";
import { contentMetadata } from "@/lib/page-metadata";

type Props = { params: Promise<{ locale: string; page: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return localizedLocales.flatMap((locale) => contentPageSlugs.map((page) => ({ locale, page }))); }
function parse(localeValue: string, pageValue: string): { locale: Locale; page: ContentPageSlug } {
  if (!isLocale(localeValue) || localeValue === "en" || !contentPageSlugs.includes(pageValue as ContentPageSlug)) notFound();
  return { locale: localeValue, page: pageValue as ContentPageSlug };
}
export async function generateMetadata({ params }: Props): Promise<Metadata> { const values = await params; const { locale, page } = parse(values.locale, values.page); return contentMetadata(locale, page); }
export default async function Page({ params }: Props) { const values = await params; const { locale, page } = parse(values.locale, values.page); const dictionary = getDictionary(locale); return <SeoLandingPage locale={locale} dictionary={dictionary} currentPath={`/${page}`} content={getContentPage(locale, page, dictionary)} />; }

