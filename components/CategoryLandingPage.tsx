import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import SiteHeader from "@/components/SiteHeader";
import { catalogDesignLabel, catalogProductPath, getCatalogProducts } from "@/lib/catalog-products";
import type { Dictionary } from "@/lib/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import { categorySlugs, getCategoryContent, type CategorySlug } from "@/lib/page-content";
import { absoluteUrl } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

type CategoryContent = ReturnType<typeof import("@/lib/page-content").getCategoryContent>;

export default function CategoryLandingPage({ locale, dictionary, slug, content }: { locale: Locale; dictionary: Dictionary; slug: CategorySlug; content: CategoryContent }) {
  const root = localePath(locale, "/");
  const currentPath = `/products/${slug}`;
  const currentUrl = localePath(locale, currentPath);
  const productsUrl = localePath(locale, "/products");
  const products = getCatalogProducts(slug);
  const related = categorySlugs.filter((item) => item !== slug).slice(0, 3).map((item) => ({ slug: item, ...getCategoryContent(locale, item, dictionary) }));
  const breadcrumb = breadcrumbSchema([
    { name: dictionary.common.nav.home, path: root },
    { name: dictionary.common.nav.products, path: productsUrl },
    { name: content.name, path: currentUrl },
  ]);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: content.name,
    description: content.intro,
    url: absoluteUrl(currentUrl),
    image: absoluteUrl(content.image),
    isPartOf: { "@type": "CollectionPage", name: dictionary.productsPage.title, url: absoluteUrl(productsUrl) },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${content.name} ${catalogDesignLabel(dictionary.catalogProduct.designLabel, item.designNumber)}`,
        url: absoluteUrl(localePath(locale, catalogProductPath(item))),
      })),
    },
  };

  return (
    <main className="seo-page category-landing">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <SiteHeader locale={locale} dictionary={dictionary} currentPath={currentPath} quoteEnabled={false} />
      <div className="seo-breadcrumb section-shell"><Link href={root}>{dictionary.common.nav.home}</Link><span>/</span><Link href={productsUrl}>{dictionary.common.nav.products}</Link><span>/</span><span>{content.name}</span></div>
      <section className="category-hero section-shell">
        <div><p className="eyebrow">{dictionary.seriesPage.eyebrow}</p><h1>{content.h1}</h1><p>{content.intro}</p><span className="button button-primary button-disabled" aria-disabled="true">{content.cta}<span aria-hidden="true">→</span></span></div>
        <div className="category-hero-image"><Image src={content.image} alt={content.imageAlt} fill priority sizes="(max-width: 900px) 100vw, 45vw" /></div>
      </section>
      <section className="series-facts section-shell" aria-label={dictionary.productsPage.termsTitle}>
        <p>{dictionary.productsPage.termsTitle}</p>
        <div><span>{content.moqLabel}</span><strong>{content.moqValue}</strong></div>
        <div><span>{content.leadTimeLabel}</span><strong>{content.leadTimeValue}</strong></div>
      </section>
      <section className="catalog-collection section-shell" aria-labelledby="catalog-collection-title">
        <div className="category-section-heading"><p className="eyebrow">{dictionary.catalogProduct.referenceBadge}</p><h2 id="catalog-collection-title">{dictionary.catalogProduct.collectionTitle}</h2><span>{dictionary.catalogProduct.collectionIntro}</span></div>
        <div className="catalog-card-grid">
          {products.map((item) => {
            const design = catalogDesignLabel(dictionary.catalogProduct.designLabel, item.designNumber);
            const number = String(item.designNumber).padStart(2, "0");
            return <article className="catalog-card" key={item.slug}>
              <Link className="catalog-card-image" href={localePath(locale, catalogProductPath(item))}>
                <Image src={item.image} alt={dictionary.catalogProduct.imageAltTemplate.replace("{series}", content.name).replace("{number}", number)} fill sizes="(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 33vw" />
                <span>{dictionary.catalogProduct.referenceBadge}</span>
              </Link>
              <div><small>{content.name}</small><h3>{design}</h3><p>{dictionary.catalogProduct.toBeConfirmed}: {dictionary.catalogProduct.specLabels.material} · {dictionary.catalogProduct.specLabels.dimensions}</p><Link href={localePath(locale, catalogProductPath(item))}>{dictionary.catalogProduct.viewDetails}<ArrowRight size={14} /></Link></div>
            </article>;
          })}
        </div>
      </section>
      <div className="category-section-heading section-shell"><p className="eyebrow">OEM / ODM</p><h2>{content.detailsTitle}</h2></div>
      <section className="category-sections section-shell">
        {content.sections.map((section) => <article key={section.title}><span className="seo-check" aria-hidden="true">✓</span><h2>{section.title}</h2><p>{section.text}</p></article>)}
      </section>
      <section className="related-series section-shell">
        <h2>{content.relatedTitle}</h2>
        <div>{related.map((item) => <Link href={localePath(locale, `/products/${item.slug}`)} key={item.slug}><span><Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 650px) 100vw, 33vw" /></span><strong>{item.name}</strong><small>{content.viewSeries} →</small></Link>)}</div>
      </section>
      <section className="seo-cta"><div className="section-shell"><div><h2>{dictionary.catalogProduct.quoteTitle}</h2><p>{dictionary.catalogProduct.quoteText}</p></div><span className="button button-outline inverse button-disabled" aria-disabled="true">{dictionary.common.getQuote}<span aria-hidden="true">→</span></span></div></section>
    </main>
  );
}
