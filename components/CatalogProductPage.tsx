import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, FileText, Package, Ruler } from "@phosphor-icons/react/dist/ssr";
import SiteHeader from "@/components/SiteHeader";
import type { CatalogProduct } from "@/lib/catalog-products";
import { catalogDesignLabel, catalogProductPath, catalogProducts, getCatalogProducts } from "@/lib/catalog-products";
import type { Dictionary } from "@/lib/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import { getCategoryContent } from "@/lib/page-content";
import { absoluteUrl } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

type Props = {
  locale: Locale;
  dictionary: Dictionary;
  product: CatalogProduct;
};

function replaceTokens(template: string, values: Record<string, string>): string {
  return Object.entries(values).reduce((result, [key, value]) => result.replaceAll(`{${key}}`, value), template);
}

export function getCatalogProductPresentation(locale: Locale, dictionary: Dictionary, product: CatalogProduct) {
  const series = getCategoryContent(locale, product.category, dictionary);
  const copy = dictionary.catalogProduct;
  const design = catalogDesignLabel(copy.designLabel, product.designNumber);
  const number = String(product.designNumber).padStart(2, "0");

  return {
    series,
    design,
    title: replaceTokens(copy.titleTemplate, { series: series.name, design }),
    intro: replaceTokens(copy.introTemplate, { design }),
    imageAlt: replaceTokens(copy.imageAltTemplate, { series: series.name, number }),
    source: replaceTokens(copy.sourceTemplate, { page: String(product.catalogPage) }),
  };
}

export default function CatalogProductPage({ locale, dictionary, product }: Props) {
  const copy = dictionary.catalogProduct;
  const presentation = getCatalogProductPresentation(locale, dictionary, product);
  const currentPath = catalogProductPath(product);
  const currentUrl = localePath(locale, currentPath);
  const productsUrl = localePath(locale, "/products");
  const categoryUrl = localePath(locale, `/products/${product.category}`);
  const root = localePath(locale, "/");
  const sameSeries = getCatalogProducts(product.category).filter((item) => item.slug !== product.slug);
  const related = (sameSeries.length > 0 ? sameSeries : catalogProducts.filter((item) => item.category !== product.category)).slice(0, 3);
  const specifications = [
    [copy.specLabels.series, presentation.series.name],
    [copy.specLabels.reference, presentation.design],
    [copy.specLabels.material, copy.toBeConfirmed],
    [copy.specLabels.dimensions, copy.toBeConfirmed],
    [copy.specLabels.setContents, copy.toBeConfirmed],
    [copy.specLabels.application, copy.toBeConfirmed],
    [copy.specLabels.moq, dictionary.seriesPage.moqValue],
    [copy.specLabels.leadTime, dictionary.seriesPage.leadTimeValue],
  ];
  const breadcrumb = breadcrumbSchema([
    { name: dictionary.common.nav.home, path: root },
    { name: dictionary.common.nav.products, path: productsUrl },
    { name: presentation.series.name, path: categoryUrl },
    { name: presentation.design, path: currentUrl },
  ]);
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: presentation.title,
    description: presentation.intro,
    url: absoluteUrl(currentUrl),
    image: absoluteUrl(product.image),
    category: presentation.series.name,
    brand: { "@type": "Brand", name: "BESDERWILL" },
    manufacturer: { "@id": absoluteUrl("/#organization") },
    additionalProperty: specifications.map(([name, value]) => ({ "@type": "PropertyValue", name, value })),
  };

  return (
    <main className="seo-page catalog-product-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <SiteHeader locale={locale} dictionary={dictionary} currentPath={currentPath} quoteEnabled={false} />

      <nav className="seo-breadcrumb section-shell" aria-label="Breadcrumb">
        <Link href={root}>{dictionary.common.nav.home}</Link><span>/</span>
        <Link href={productsUrl}>{dictionary.common.nav.products}</Link><span>/</span>
        <Link href={categoryUrl}>{presentation.series.name}</Link><span>/</span>
        <span>{presentation.design}</span>
      </nav>

      <section className="catalog-product-hero section-shell">
        <div className="catalog-product-image">
          <Image src={product.image} alt={presentation.imageAlt} fill priority sizes="(max-width: 900px) 100vw, 50vw" />
          <span>{copy.referenceBadge}</span>
        </div>
        <div className="catalog-product-copy">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{presentation.title}</h1>
          <p>{presentation.intro}</p>
          <dl>
            <div><dt>{copy.sourceLabel}</dt><dd>{presentation.source}</dd></div>
            <div><dt>{dictionary.seriesPage.moqLabel}</dt><dd>{dictionary.seriesPage.moqValue}</dd></div>
            <div><dt>{dictionary.seriesPage.leadTimeLabel}</dt><dd>{dictionary.seriesPage.leadTimeValue}</dd></div>
          </dl>
          <p className="catalog-reference-note"><FileText size={18} weight="duotone" />{copy.sourceNote}</p>
          <div className="catalog-product-actions">
            <span className="button button-primary button-disabled" aria-disabled="true">{copy.quoteButton}<ArrowRight size={16} /></span>
            <Link className="catalog-back-link" href={categoryUrl}><ArrowLeft size={15} />{copy.backToSeries}</Link>
          </div>
          <small>{copy.quotePending}</small>
        </div>
      </section>

      <section className="catalog-confirmed section-shell">
        <div className="category-section-heading"><p className="eyebrow">BESDERWILL</p><h2>{copy.featuresTitle}</h2></div>
        <div>
          {copy.features.map((feature) => <article key={feature.title}><CheckCircle size={26} weight="duotone" /><h3>{feature.title}</h3><p>{feature.text}</p></article>)}
        </div>
      </section>

      <section className="catalog-product-details section-shell">
        <div className="catalog-specifications">
          <div className="category-section-heading"><p className="eyebrow">STATUS</p><h2>{copy.specificationsTitle}</h2></div>
          <dl>{specifications.map(([label, value]) => <div key={label}><dt>{label}</dt><dd className={value === copy.toBeConfirmed ? "pending" : undefined}>{value}</dd></div>)}</dl>
        </div>
        <aside>
          <div><Ruler size={28} weight="duotone" /><h2>{copy.applicationTitle}</h2><p>{copy.applicationText}</p></div>
          <div><Package size={28} weight="duotone" /><h2>{copy.quoteTitle}</h2><p>{copy.quoteText}</p><span className="button button-outline button-disabled" aria-disabled="true">{copy.quoteButton}</span></div>
        </aside>
      </section>

      <section className="catalog-related section-shell">
        <h2>{copy.relatedTitle}</h2>
        <div>{related.map((item) => {
          const relatedDesign = catalogDesignLabel(copy.designLabel, item.designNumber);
          const relatedSeries = getCategoryContent(locale, item.category, dictionary);
          return <Link href={localePath(locale, catalogProductPath(item))} key={`${item.category}-${item.slug}`}>
            <span><Image src={item.image} alt={replaceTokens(copy.imageAltTemplate, { series: relatedSeries.name, number: String(item.designNumber).padStart(2, "0") })} fill sizes="(max-width: 650px) 100vw, 33vw" /></span>
            <small>{relatedSeries.name}</small><strong>{relatedDesign}</strong><em>{copy.viewDetails}<ArrowRight size={14} /></em>
          </Link>;
        })}</div>
      </section>
    </main>
  );
}
