import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { organizationSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata("en", "home", "/");

export default function EnglishHomePage() {
  const dictionary = getDictionary("en");
  const organization = organizationSchema();
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} /><HomePage locale="en" dictionary={dictionary} /></>;
}
