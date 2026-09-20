export const locales = ["en", "fr", "es", "ja", "de"] as const;
export const localizedLocales = ["fr", "es", "ja", "de"] as const;
export const defaultLocale = "en" as const;

export type Locale = (typeof locales)[number];

export const languageOptions: ReadonlyArray<{
  locale: Locale;
  label: string;
  flag: string;
  htmlLang: string;
}> = [
  { locale: "en", label: "English", flag: "🇬🇧", htmlLang: "en" },
  { locale: "fr", label: "Français", flag: "🇫🇷", htmlLang: "fr" },
  { locale: "es", label: "Español", flag: "🇪🇸", htmlLang: "es" },
  { locale: "ja", label: "日本語", flag: "🇯🇵", htmlLang: "ja" },
  { locale: "de", label: "Deutsch", flag: "🇩🇪", htmlLang: "de" },
];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localePath(locale: Locale, path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return normalized;
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}

export function languageAlternates(path = "/"): Record<string, string> {
  return {
    en: localePath("en", path),
    fr: localePath("fr", path),
    es: localePath("es", path),
    ja: localePath("ja", path),
    de: localePath("de", path),
    "x-default": localePath("en", path),
  };
}

export function htmlLang(locale: Locale): string {
  return languageOptions.find((option) => option.locale === locale)?.htmlLang ?? "en";
}
