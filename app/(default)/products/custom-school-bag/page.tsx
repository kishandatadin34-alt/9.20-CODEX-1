import type { Metadata } from "next";
import ProductPage from "@/components/ProductPage";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata, siteUrl } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("en", "product", "/products/custom-school-bag");

export default function EnglishProductPage() {
  const dictionary = getDictionary("en");
  const product = { "@context": "https://schema.org", "@type": "Product", name: dictionary.product.options.specifications[0][1], description: dictionary.seo.product.description, image: `${siteUrl}/images/custom-pink-school-backpack.png`, brand: { "@type": "Brand", name: "BESDERWILL" }, manufacturer: { "@type": "Organization", name: "BESDERWILL" } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }} /><ProductPage locale="en" dictionary={dictionary} /></>;
}
