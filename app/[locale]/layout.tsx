import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import "@/app/globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getDictionary } from "@/lib/dictionaries";
import { htmlLang, isLocale, localizedLocales } from "@/lib/i18n";
import { siteUrl } from "@/lib/seo";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const dynamicParams = false;
export function generateStaticParams() { return localizedLocales.map((locale) => ({ locale })); }

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl), applicationName: "BESDERWILL",
  authors: [{ name: "BESDERWILL" }], creator: "BESDERWILL", publisher: "BESDERWILL",
  manifest: "/manifest.webmanifest",
};

export default async function LocalizedLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "en") notFound();
  const dictionary = getDictionary(locale);
  return <html lang={htmlLang(locale)}><body className={`${dmSans.variable} ${manrope.variable}`}>{children}<WhatsAppButton label={dictionary.whatsapp} /></body></html>;
}
