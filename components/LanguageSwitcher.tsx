import Link from "next/link";
import { CaretDown, GlobeHemisphereWest } from "@phosphor-icons/react";
import { languageOptions, localePath, type Locale } from "@/lib/i18n";

type LanguageSwitcherProps = {
  locale: Locale;
  currentPath: string;
  label: string;
};

export default function LanguageSwitcher({ locale, currentPath, label }: LanguageSwitcherProps) {
  const active = languageOptions.find((option) => option.locale === locale) ?? languageOptions[0];

  return (
    <details className="group relative z-50">
      <summary className="flex cursor-pointer list-none items-center gap-1.5 rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-xs font-bold text-[#12335c] shadow-sm transition hover:border-[#164f87] [&::-webkit-details-marker]:hidden">
        <GlobeHemisphereWest size={17} aria-hidden="true" />
        <span aria-label={label}>{active.flag} {active.label}</span>
        <CaretDown size={12} className="transition group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div className="absolute right-0 mt-2 min-w-48 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-2xl">
        {languageOptions.map((option) => (
          <Link
            key={option.locale}
            href={localePath(option.locale, currentPath)}
            hrefLang={option.htmlLang}
            lang={option.htmlLang}
            className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm no-underline transition hover:bg-slate-100 ${option.locale === locale ? "bg-blue-50 font-bold text-[#164f87]" : "text-slate-700"}`}
          >
            <span aria-hidden="true">{option.flag}</span><span>{option.label}</span>
          </Link>
        ))}
      </div>
    </details>
  );
}
