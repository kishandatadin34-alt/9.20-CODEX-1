import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import type { Dictionary } from "@/lib/dictionaries";
import { company } from "@/lib/company";
import { localePath, type Locale } from "@/lib/i18n";
import { breadcrumbSchema } from "@/lib/schema";

type PageContent = {
  title: string;
  description: string;
  eyebrow: string;
  image: string;
  sections: Array<{ title: string; text: string }>;
};

export default function SeoLandingPage({
  locale,
  dictionary,
  currentPath,
  content,
}: {
  locale: Locale;
  dictionary: Dictionary;
  currentPath: string;
  content: PageContent;
}) {
  const root = localePath(locale, "/");
  const privacyPath = localePath(locale, "/privacy-policy");
  const termsPath = localePath(locale, "/terms");
  const breadcrumb = breadcrumbSchema([
    { name: dictionary.common.nav.home, path: root },
    { name: content.title, path: localePath(locale, currentPath) },
  ]);

  return (
    <main className="seo-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <SiteHeader locale={locale} dictionary={dictionary} currentPath={currentPath} />

      <div className="seo-breadcrumb section-shell" aria-label="Breadcrumb">
        <Link href={root}>{dictionary.common.nav.home}</Link><span>/</span><span>{content.title}</span>
      </div>

      <section className="seo-hero section-shell">
        <div>
          <p className="eyebrow">{content.eyebrow}</p>
          <h1>{content.title}</h1>
          <p>{content.description}</p>
          <Link className="button button-primary" href={`${root}#quote`}>{dictionary.common.getQuote}<span aria-hidden="true">→</span></Link>
        </div>
        <div className="seo-hero-image"><Image src={content.image} alt={content.title} fill priority sizes="(max-width: 900px) 100vw, 48vw" /></div>
      </section>

      <section className="seo-content section-shell">
        {content.sections.map((section) => (
          <article key={section.title}>
            <span className="seo-check" aria-hidden="true">✓</span>
            <div><h2>{section.title}</h2><p>{section.text}</p></div>
          </article>
        ))}
      </section>

      {currentPath === "/contact" ? (
        <section className="seo-contact section-shell">
          <span className="seo-pin" aria-hidden="true">●</span>
          <div><h2>{company.legalName}</h2><address>{dictionary.common.address}</address><p><a href={`mailto:${company.email}`}>{company.email}</a> · <a href={`tel:${company.phoneE164}`}>{company.phoneDisplay}</a></p></div>
        </section>
      ) : null}

      <section className="seo-cta">
        <div className="section-shell"><div><p className="eyebrow light">BESDERWILL OEM / ODM</p><h2>{dictionary.home.quote.title}</h2><p>{dictionary.home.quote.description}</p></div><Link className="button button-outline inverse" href={`${root}#quote`}>{dictionary.common.getQuote}<span aria-hidden="true">→</span></Link></div>
      </section>

      <footer className="seo-footer section-shell">
        <span>{company.legalName}</span>
        <div><Link href={privacyPath}>Privacy</Link><Link href={termsPath}>Terms</Link><a href={`mailto:${company.email}`}>{company.email}</a></div>
      </footer>
    </main>
  );
}
