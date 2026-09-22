import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import "@/app/globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getDictionary } from "@/lib/dictionaries";
import { siteUrl } from "@/lib/seo";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "BESDERWILL",
  authors: [{ name: "BESDERWILL" }],
  creator: "BESDERWILL",
  publisher: "BESDERWILL",
  manifest: "/manifest.webmanifest",
};

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const dictionary = getDictionary("en");
  return <html lang="en"><body className={`${dmSans.variable} ${manrope.variable}`}>{children}<WhatsAppButton label={dictionary.whatsapp} /></body></html>;
}
