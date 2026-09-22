import Image from "next/image";
import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import type { Dictionary } from "@/lib/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import type { CategorySlug } from "@/lib/page-content";
import { breadcrumbSchema } from "@/lib/schema";

type CategoryContent = ReturnType<typeof import("@/lib/page-content").getCategoryContent>;

export default function CategoryLandingPage({ locale, dictionary, slug, content }: { locale: Locale; dictionary: Dictionary; slug: CategorySlug; content: CategoryContent }) {
  const root = localePath(locale, "/");
  const currentPath = `/products/${slug}`;
  const currentUrl = localePath(locale, currentPath);
  const breadcrumb = breadcrumbSchema([
    { name: dictionary.common.nav.home, path: root },
    { name: dictionary.common.nav.products, path: `${root}#products` },
    { name: content.name, path: currentUrl },
  ]);

  return (
    <main className="seo-page category-landing">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <header className="seo-header section-shell">
        <Link href={root}><Image src="/images/besderwill-logo.png" alt="BESDERWILL" width={190} height={60} priority /></Link>
        <nav><Link href={`${root}#products`}>{dictionary.common.nav.products}</Link><Link href={localePath(locale, "/oem-odm")}>{dictionary.common.nav.oem}</Link><Link href={localePath(locale, "/factory")}>{dictionary.common.nav.factory}</Link><Link href={localePath(locale, "/contact")}>{dictionary.common.nav.contact}</Link></nav>
        <LanguageSwitcher locale={locale} currentPath={currentPath} label={dictionary.common.language} />
      </header>
      <div className="seo-breadcrumb section-shell"><Link href={root}>{dictionary.common.nav.home}</Link><span>/</span><Link href={`${root}#products`}>{dictionary.common.nav.products}</Link><span>/</span><span>{content.name}</span></div>
      <section className="category-hero section-shell">
        <div><p className="eyebrow">OEM / ODM · PRIVATE LABEL</p><h1>{content.h1}</h1><p>{content.intro}</p><Link className="button button-primary" href={`${root}#quote`}>{content.cta}<span aria-hidden="true">→</span></Link></div>
        <div className="category-hero-image"><Image src={content.image} alt={content.name} fill priority sizes="(max-width: 900px) 100vw, 45vw" /></div>
      </section>
      <section className="category-sections section-shell">
        {content.sections.map((section) => <article key={section.title}><span className="seo-check" aria-hidden="true">✓</span><h2>{section.title}</h2><p>{section.text}</p></article>)}
      </section>
      <section className="seo-cta"><div className="section-shell"><div><h2>{dictionary.home.quote.title}</h2><p>{dictionary.home.quote.description}</p></div><Link className="button button-outline inverse" href={`${root}#quote`}>{dictionary.common.getQuote}<span aria-hidden="true">→</span></Link></div></section>
    </main>
  );
}
