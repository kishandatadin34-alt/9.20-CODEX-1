import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { languageAlternates, localePath, type Locale } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

export { siteUrl } from "@/lib/site";

type SeoPage = "home" | "product";

export function absoluteUrl(path: string): string {
  return new URL(path, `${siteUrl}/`).toString();
}

export function buildPageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
  keywords?: string[],
): Metadata {
  const alternates = Object.fromEntries(
    Object.entries(languageAlternates(path)).map(([language, href]) => [language, absoluteUrl(href)]),
  );
  const canonical = absoluteUrl(localePath(locale, path));
  const socialImage = absoluteUrl("/images/og-besderwill.png");

  return {
    title,
    description,
    keywords,
    alternates: { canonical, languages: alternates },
    openGraph: {
      type: "website",
      locale,
      url: canonical,
      siteName: "BESDERWILL",
      title,
      description,
      images: [{ url: socialImage, width: 1200, height: 630, alt: `${title} | BESDERWILL` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [socialImage] },
    robots: { index: true, follow: true },
  };
}

export function buildMetadata(locale: Locale, page: SeoPage, path: string): Metadata {
  const dictionary = getDictionary(locale);
  const seo = dictionary.seo[page];
  return buildPageMetadata(locale, path, seo.title, seo.description, seo.keywords);
}
