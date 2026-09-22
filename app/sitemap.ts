import type { MetadataRoute } from "next";
import { languageAlternates, localePath, locales } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/seo";
import { categorySlugs, contentPageSlugs } from "@/lib/page-content";

const pages = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1, lastModified: "2026-09-22" },
  { path: "/products/custom-school-bag", changeFrequency: "monthly" as const, priority: 0.9, lastModified: "2026-09-22" },
  ...categorySlugs.map((slug) => ({ path: `/products/${slug}`, changeFrequency: "monthly" as const, priority: 0.8, lastModified: "2026-09-22" })),
  ...contentPageSlugs.map((slug) => ({ path: `/${slug}`, changeFrequency: "monthly" as const, priority: slug === "privacy-policy" || slug === "terms" ? 0.3 : 0.75, lastModified: "2026-09-22" })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((page) => {
    const languages = Object.fromEntries(Object.entries(languageAlternates(page.path)).map(([language, path]) => [language, absoluteUrl(path)]));
    return locales.map((locale) => ({
      url: absoluteUrl(localePath(locale, page.path)), lastModified: new Date(page.lastModified),
      changeFrequency: page.changeFrequency, priority: page.priority,
      alternates: { languages },
    }));
  });
}
