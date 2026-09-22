import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { languageAlternates, localePath, type Locale } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

export { siteUrl } from "@/lib/site";

type SeoPage = "home" | "product";

export function absoluteUrl(path: string): string {
  return new URL(path, `${siteUrl}/`).toString();
}

export function buildMetadata(locale: Locale, page: SeoPage, path: string): Metadata {
  const dictionary = getDictionary(locale);
  const seo = dictionary.seo[page];
  const alternates = Object.fromEntries(
    Object.entries(languageAlternates(path)).map(([language, href]) => [language, absoluteUrl(href)]),
  );
  const canonical = absoluteUrl(localePath(locale, path));

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical, languages: alternates },
    openGraph: {
      type: "website",
      locale,
      url: canonical,
      siteName: "BESDERWILL",
      title: seo.title,
      description: seo.description,
      images: [{ url: absoluteUrl("/images/hero-school-life.png"), width: 1536, height: 1024, alt: seo.title }],
    },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
    robots: { index: true, follow: true },
  };
}
