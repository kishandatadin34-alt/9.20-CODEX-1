import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Package } from "@phosphor-icons/react/dist/ssr";
import SiteHeader from "@/components/SiteHeader";
import type { Dictionary } from "@/lib/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import { categorySlugs, getCategoryContent } from "@/lib/page-content";
import { absoluteUrl } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export default function ProductsPage({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const currentPath = "/products";
  const root = localePath(locale, "/");
  const productsUrl = localePath(locale, currentPath);
  const series = categorySlugs.map((slug) => ({ slug, ...getCategoryContent(locale, slug, dictionary) }));
  const copy = dictionary.productsPage;
  const terms = dictionary.seriesPage;
  const breadcrumb = breadcrumbSchema([
    { name: dictionary.common.nav.home, path: root },
    { name: dictionary.common.nav.products, path: productsUrl },
  ]);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: copy.title,
    description: copy.description,
    url: absoluteUrl(productsUrl),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: series.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: absoluteUrl(localePath(locale, `/products/${item.slug}`)),
      })),
    },
  };

  return (
    <main className="seo-page products-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <SiteHeader locale={locale} dictionary={dictionary} currentPath={currentPath} quoteEnabled={false} />

      <nav className="seo-breadcrumb section-shell" aria-label="Breadcrumb">
        <Link href={root}>{dictionary.common.nav.home}</Link><span>/</span><span>{dictionary.common.nav.products}</span>
      </nav>

      <section className="products-page-hero section-shell">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p>{copy.description}</p>
        </div>
        <aside aria-label={copy.termsTitle}>
          <p>{copy.termsTitle}</p>
          <div><Package size={23} weight="duotone" /><span><small>{terms.moqLabel}</small><strong>{terms.moqValue}</strong></span></div>
          <div><Clock size={23} weight="duotone" /><span><small>{terms.leadTimeLabel}</small><strong>{terms.leadTimeValue}</strong></span></div>
        </aside>
      </section>

      <section className="products-page-grid section-shell" aria-label={dictionary.home.products.title}>
        {series.map((item) => (
          <article className="series-card" key={item.slug}>
            <Link className="series-card-image" href={localePath(locale, `/products/${item.slug}`)}>
              <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 650px) 100vw, (max-width: 1050px) 50vw, 33vw" />
            </Link>
            <div>
              <p>{String(categorySlugs.indexOf(item.slug) + 1).padStart(2, "0")}</p>
              <h2><Link href={localePath(locale, `/products/${item.slug}`)}>{item.name}</Link></h2>
              <span>{item.caption}</span>
              <Link className="series-card-link" href={localePath(locale, `/products/${item.slug}`)}>{copy.cardCta} <ArrowRight size={15} weight="bold" /></Link>
            </div>
          </article>
        ))}
      </section>

      <p className="catalog-source-note section-shell">{copy.catalogNote}</p>

      <section className="products-custom-cta">
        <div className="section-shell">
          <div><p className="eyebrow light">OEM / ODM</p><h2>{copy.customTitle}</h2><p>{copy.customText}</p></div>
          <span className="button button-outline inverse button-disabled" aria-disabled="true">{dictionary.common.getQuote}<ArrowRight size={17} /></span>
        </div>
      </section>
    </main>
  );
}
