import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { catalogProductPath, type CatalogProduct } from "@/lib/catalog-products";
import { catalogDesignLabel } from "@/lib/catalog-products";
import { getCategoryContent, getContentPage, type CategorySlug, type ContentPageSlug } from "@/lib/page-content";
import { buildPageMetadata } from "@/lib/seo";

export function contentMetadata(locale: Locale, slug: ContentPageSlug): Metadata {
  const dictionary = getDictionary(locale);
  const content = getContentPage(locale, slug, dictionary);
  return buildPageMetadata(locale, `/${slug}`, `${content.title} | BESDERWILL`, content.description);
}

export function categoryMetadata(locale: Locale, slug: CategorySlug): Metadata {
  const dictionary = getDictionary(locale);
  const content = getCategoryContent(locale, slug, dictionary);
  return buildPageMetadata(locale, `/products/${slug}`, content.title, content.description);
}

export function catalogProductMetadata(locale: Locale, product: CatalogProduct): Metadata {
  const dictionary = getDictionary(locale);
  const series = getCategoryContent(locale, product.category, dictionary);
  const design = catalogDesignLabel(dictionary.catalogProduct.designLabel, product.designNumber);
  const title = dictionary.catalogProduct.titleTemplate.replace("{series}", series.name).replace("{design}", design);
  const description = dictionary.catalogProduct.introTemplate.replace("{design}", design);
  return buildPageMetadata(locale, catalogProductPath(product), `${title} | BESDERWILL`, description);
}
