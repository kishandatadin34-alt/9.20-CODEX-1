import type { Metadata } from "next";
import ProductsPage from "@/components/ProductsPage";
import { getDictionary } from "@/lib/dictionaries";
import { buildPageMetadata } from "@/lib/seo";

const dictionary = getDictionary("en");

export const metadata: Metadata = buildPageMetadata(
  "en",
  "/products",
  `${dictionary.productsPage.title} | BESDERWILL`,
  dictionary.productsPage.description,
);

export default function EnglishProductsPage() {
  return <ProductsPage locale="en" dictionary={dictionary} />;
}
