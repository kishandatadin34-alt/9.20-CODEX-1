import type { Metadata } from "next";
import "@/app/globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getDictionary } from "@/lib/dictionaries";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "BESDERWILL",
  authors: [{ name: "BESDERWILL" }],
  creator: "BESDERWILL",
  publisher: "BESDERWILL",
};

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const dictionary = getDictionary("en");
  return <html lang="en"><body>{children}<WhatsAppButton label={dictionary.whatsapp} /></body></html>;
}
