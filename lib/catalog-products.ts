import type { CategorySlug } from "@/lib/page-content";

export type CatalogProduct = {
  category: CategorySlug;
  slug: string;
  image: string;
  designNumber: number;
  catalogPage: number;
  catalogName: string;
};

const product = (
  category: CategorySlug,
  slug: string,
  image: string,
  designNumber: number,
  catalogPage: number,
  catalogName = "New school bag catalog",
): CatalogProduct => ({ category, slug, image, designNumber, catalogPage, catalogName });

export const catalogProducts: readonly CatalogProduct[] = [
  product("kindergarten-schoolbags", "design-01", "/images/catalog-products/kindergarten-schoolbag-design-01.jpg", 1, 3),
  product("kindergarten-schoolbags", "design-02", "/images/catalog-products/kindergarten-schoolbag-design-02.jpg", 2, 3),
  product("kindergarten-schoolbags", "design-03", "/images/catalog-products/kindergarten-schoolbag-design-03.jpg", 3, 3),
  product("kindergarten-schoolbags", "design-04", "/images/catalog-products/kindergarten-schoolbag-design-04.webp", 4, 4, "Besder catalogue"),
  product("kindergarten-schoolbags", "design-05", "/images/catalog-products/kindergarten-schoolbag-design-05.webp", 5, 4, "Besder catalogue"),
  product("kindergarten-schoolbags", "design-06", "/images/catalog-products/kindergarten-schoolbag-design-06.webp", 6, 4, "Besder catalogue"),
  product("kindergarten-schoolbags", "design-07", "/images/catalog-products/kindergarten-schoolbag-design-07.webp", 7, 4, "Besder catalogue"),
  product("eva-schoolbags", "design-01", "/images/catalog-products/eva-schoolbag-design-01.jpg", 1, 5),
  product("eva-schoolbags", "design-02", "/images/catalog-products/eva-schoolbag-design-02.jpg", 2, 5),
  product("eva-schoolbags", "design-03", "/images/catalog-products/eva-schoolbag-design-03.jpg", 3, 5),
  product("eva-schoolbags", "design-04", "/images/catalog-products/disney-school-bag-set-design-04.webp", 4, 6, "Besder catalogue"),
  product("eva-schoolbags", "design-05", "/images/catalog-products/disney-school-bag-set-design-05.webp", 5, 6, "Besder catalogue"),
  product("eva-schoolbags", "design-06", "/images/catalog-products/disney-school-bag-set-design-06.webp", 6, 6, "Besder catalogue"),
  product("eva-schoolbags", "design-07", "/images/catalog-products/disney-school-bag-set-design-07.webp", 7, 6, "Besder catalogue"),
  product("eva-schoolbags", "design-08", "/images/catalog-products/disney-school-bag-set-design-08.webp", 8, 7, "Besder catalogue"),
  product("eva-schoolbags", "design-09", "/images/catalog-products/disney-school-bag-set-design-09.webp", 9, 7, "Besder catalogue"),
  product("eva-schoolbags", "design-10", "/images/catalog-products/disney-school-bag-set-design-10.webp", 10, 7, "Besder catalogue"),
  product("eva-schoolbags", "design-11", "/images/catalog-products/disney-school-bag-set-design-11.webp", 11, 7, "Besder catalogue"),
  product("trolley-schoolbag-sets", "design-01", "/images/catalog-products/trolley-schoolbag-design-01.jpg", 1, 8),
  product("trolley-schoolbag-sets", "design-02", "/images/catalog-products/trolley-schoolbag-design-02.jpg", 2, 8),
  product("trolley-schoolbag-sets", "design-03", "/images/catalog-products/trolley-schoolbag-design-03.jpg", 3, 8),
  product("trolley-schoolbag-sets", "design-04", "/images/catalog-products/disney-trolley-schoolbag-set-design-04.webp", 4, 9, "Besder catalogue"),
  product("trolley-schoolbag-sets", "design-05", "/images/catalog-products/disney-trolley-schoolbag-set-design-05.webp", 5, 9, "Besder catalogue"),
  product("trolley-schoolbag-sets", "design-06", "/images/catalog-products/disney-trolley-schoolbag-set-design-06.webp", 6, 9, "Besder catalogue"),
  product("trolley-schoolbag-sets", "design-07", "/images/catalog-products/disney-trolley-schoolbag-set-design-07.webp", 7, 9, "Besder catalogue"),
  product("trolley-schoolbag-sets", "design-08", "/images/catalog-products/disney-trolley-schoolbag-set-design-08.webp", 8, 9, "Besder catalogue"),
  product("trolley-schoolbag-sets", "design-09", "/images/catalog-products/disney-trolley-schoolbag-set-design-09.webp", 9, 9, "Besder catalogue"),
  product("urban-casual-backpacks", "design-01", "/images/catalog-products/urban-backpack-design-01.jpg", 1, 10),
  product("urban-casual-backpacks", "design-02", "/images/catalog-products/urban-backpack-design-02.jpg", 2, 10),
  product("urban-casual-backpacks", "design-03", "/images/catalog-products/urban-backpack-design-03.jpg", 3, 10),
  product("3-in-1-schoolbag-sets", "design-01", "/images/catalog-products/3-in-1-schoolbag-set-design-01.jpg", 1, 19),
  product("3-in-1-schoolbag-sets", "design-02", "/images/catalog-products/3-in-1-schoolbag-set-design-02.jpg", 2, 19),
  product("3-in-1-schoolbag-sets", "design-03", "/images/catalog-products/3-in-1-schoolbag-set-design-03.jpg", 3, 19),
  product("4-in-1-schoolbag-sets", "design-01", "/images/catalog-products/4-in-1-schoolbag-set-design-01.jpg", 1, 22),
  product("4-in-1-schoolbag-sets", "design-02", "/images/catalog-products/4-in-1-schoolbag-set-design-02.jpg", 2, 22),
  product("5-in-1-schoolbag-sets", "design-01", "/images/catalog-products/5-in-1-schoolbag-set-design-01.jpg", 1, 24),
];

export function getCatalogProducts(category: CategorySlug): CatalogProduct[] {
  return catalogProducts.filter((item) => item.category === category);
}

export function findCatalogProduct(category: string, slug: string): CatalogProduct | undefined {
  return catalogProducts.find((item) => item.category === category && item.slug === slug);
}

export function catalogProductPath(item: CatalogProduct): string {
  return `/products/${item.category}/${item.slug}`;
}

export function catalogDesignLabel(label: string, designNumber: number): string {
  return `${label} ${String(designNumber).padStart(2, "0")}`;
}
