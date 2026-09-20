import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "@/app/globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getDictionary } from "@/lib/dictionaries";
import { htmlLang, isLocale, localizedLocales } from "@/lib/i18n";
import { siteUrl } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() { return localizedLocales.map((locale) => ({ locale })); }

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl), applicationName: "BESDERWILL",
  authors: [{ name: "BESDERWILL" }], creator: "BESDERWILL", publisher: "BESDERWILL",
};

export default async function LocalizedLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "en") notFound();
  const dictionary = getDictionary(locale);
  return <html lang={htmlLang(locale)}><body>{children}<WhatsAppButton label={dictionary.whatsapp} /></body></html>;
}
