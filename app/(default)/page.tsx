import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata, siteUrl } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("en", "home", "/");

export default function EnglishHomePage() {
  const dictionary = getDictionary("en");
  const organization = {
    "@context": "https://schema.org", "@type": "Organization", name: "BESDERWILL", url: siteUrl,
    logo: `${siteUrl}/images/besderwill-logo.png`, email: dictionary.common.email,
    telephone: dictionary.common.phone, address: { "@type": "PostalAddress", streetAddress: dictionary.common.address, addressLocality: "Guangzhou", addressCountry: "CN", postalCode: "510470" },
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} /><HomePage locale="en" dictionary={dictionary} /></>;
}
