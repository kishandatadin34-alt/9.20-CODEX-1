import type { MetadataRoute } from "next";
import { languageAlternates, localePath, locales } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/seo";

const pages = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/products/custom-school-bag", changeFrequency: "monthly" as const, priority: 0.9 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pages.flatMap((page) => {
    const languages = Object.fromEntries(Object.entries(languageAlternates(page.path)).map(([language, path]) => [language, absoluteUrl(path)]));
    return locales.map((locale) => ({
      url: absoluteUrl(localePath(locale, page.path)), lastModified,
      changeFrequency: page.changeFrequency, priority: page.priority,
      alternates: { languages },
    }));
  });
}
