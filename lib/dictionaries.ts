import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import es from "@/locales/es.json";
import ja from "@/locales/ja.json";
import de from "@/locales/de.json";
import type { Locale } from "@/lib/i18n";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = {
  en,
  fr: fr as Dictionary,
  es: es as Dictionary,
  ja: ja as Dictionary,
  de: de as Dictionary,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
