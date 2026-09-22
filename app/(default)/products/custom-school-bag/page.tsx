import type { Metadata } from "next";
import ProductPage from "@/components/ProductPage";
import { getDictionary } from "@/lib/dictionaries";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata("en", "product", "/products/custom-school-bag");

export default function EnglishProductPage() {
  const dictionary = getDictionary("en");
  const path = "/products/custom-school-bag";
  const product = { "@context": "https://schema.org", "@type": "Product", "@id": absoluteUrl(`${path}#product`), url: absoluteUrl(path), name: dictionary.product.options.specifications[0][1], description: dictionary.seo.product.description, image: absoluteUrl("/images/custom-pink-school-backpack.png"), category: "School Backpacks", brand: { "@type": "Brand", name: "BESDERWILL" }, manufacturer: { "@id": absoluteUrl("/#organization") }, additionalProperty: dictionary.product.options.specifications.slice(1).map(([name, value]) => ({ "@type": "PropertyValue", name, value })) };
  const breadcrumb = breadcrumbSchema([{ name: dictionary.common.nav.home, path: "/" }, { name: dictionary.common.nav.products, path: "/#products" }, { name: dictionary.product.options.specifications[0][1], path }]);
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} /><ProductPage locale="en" dictionary={dictionary} /></>;
}
