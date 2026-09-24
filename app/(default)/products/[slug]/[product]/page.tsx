import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogProductPage from "@/components/CatalogProductPage";
import { catalogProducts, findCatalogProduct } from "@/lib/catalog-products";
import { getDictionary } from "@/lib/dictionaries";
import { catalogProductMetadata } from "@/lib/page-metadata";

type Props = { params: Promise<{ slug: string; product: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return catalogProducts.map((item) => ({ slug: item.category, product: item.slug }));
}

function parse(category: string, productSlug: string) {
  const product = findCatalogProduct(category, productSlug);
  if (!product) notFound();
  return product;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, product: productSlug } = await params;
  return catalogProductMetadata("en", parse(slug, productSlug));
}

export default async function Page({ params }: Props) {
  const { slug, product: productSlug } = await params;
  return <CatalogProductPage locale="en" dictionary={getDictionary("en")} product={parse(slug, productSlug)} />;
}
