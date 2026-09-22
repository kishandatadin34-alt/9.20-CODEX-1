import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { getCategoryContent, getContentPage, type CategorySlug, type ContentPageSlug } from "@/lib/page-content";
import { buildPageMetadata } from "@/lib/seo";

export function contentMetadata(locale: Locale, slug: ContentPageSlug): Metadata {
  const dictionary = getDictionary(locale);
  const content = getContentPage(locale, slug, dictionary);
  return buildPageMetadata(locale, `/${slug}`, `${content.title} | BESDERWILL`, content.description);
}

export function categoryMetadata(locale: Locale, slug: CategorySlug): Metadata {
  const dictionary = getDictionary(locale);
  const content = getCategoryContent(locale, slug, dictionary);
  return buildPageMetadata(locale, `/products/${slug}`, content.title, content.description);
}

