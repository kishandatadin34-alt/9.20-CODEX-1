import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryLandingPage from "@/components/CategoryLandingPage";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, localizedLocales, type Locale } from "@/lib/i18n";
import { categorySlugs, getCategoryContent, type CategorySlug } from "@/lib/page-content";
import { categoryMetadata } from "@/lib/page-metadata";
type Props = { params: Promise<{ locale: string; slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return localizedLocales.flatMap((locale) => categorySlugs.map((slug) => ({ locale, slug }))); }
function parse(localeValue: string, slugValue: string): { locale: Locale; slug: CategorySlug } { if (!isLocale(localeValue) || localeValue === "en" || !categorySlugs.includes(slugValue as CategorySlug)) notFound(); return { locale: localeValue, slug: slugValue as CategorySlug }; }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const values = await params; const { locale, slug } = parse(values.locale, values.slug); return categoryMetadata(locale, slug); }
export default async function Page({ params }: Props) { const values = await params; const { locale, slug } = parse(values.locale, values.slug); const dictionary = getDictionary(locale); return <CategoryLandingPage locale={locale} dictionary={dictionary} slug={slug} content={getCategoryContent(locale, slug, dictionary)} />; }

