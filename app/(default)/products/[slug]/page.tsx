import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryLandingPage from "@/components/CategoryLandingPage";
import { getDictionary } from "@/lib/dictionaries";
import { categorySlugs, getCategoryContent, type CategorySlug } from "@/lib/page-content";
import { categoryMetadata } from "@/lib/page-metadata";
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return categorySlugs.map((slug) => ({ slug })); }
function parse(value: string): CategorySlug { if (!categorySlugs.includes(value as CategorySlug)) notFound(); return value as CategorySlug; }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; return categoryMetadata("en", parse(slug)); }
export default async function Page({ params }: Props) { const { slug: value } = await params; const slug = parse(value); const dictionary = getDictionary("en"); return <CategoryLandingPage locale="en" dictionary={dictionary} slug={slug} content={getCategoryContent("en", slug, dictionary)} />; }

