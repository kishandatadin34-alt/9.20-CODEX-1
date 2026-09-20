"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowRight, ArrowSquareOut, CaretDown, CheckCircle, Cube, Factory,
  FileArrowDown, MapPin, SealCheck, UsersThree,
} from "@phosphor-icons/react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import type { Dictionary } from "@/lib/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";

type HomePageProps = { locale: Locale; dictionary: Dictionary };

const productImages: Record<string, string> = {
  school: "/images/category-student.png",
  laptop: "/images/category-laptop.png",
  rolling: "/images/category-rolling.png",
  business: "/images/category-business.png",
  chest: "/images/category-crossbody.png",
};

const factoryImages = [
  "/images/product-global-team-v2.png",
  "/images/product-customer-visit-v2.png",
  "/images/product-design-studio-v2.png",
  "/images/product-export-inspection-v2.png",
];

export default function HomePage({ locale, dictionary }: HomePageProps) {
  const [openFaq, setOpenFaq] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const { common, home } = dictionary;
  const root = localePath(locale, "/");
  const productPath = localePath(locale, "/products/custom-school-bag");

  function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main>
      <header className="topbar">
        <Link className="brand" href={root} aria-label="BESDERWILL home"><Image src="/images/besderwill-logo.png" alt="BESDERWILL" width={190} height={60} priority /></Link>
        <nav className="nav" aria-label="Primary navigation">
          <Link href={`${root}#products`}>{common.nav.products}</Link>
          <Link href={`${root}#oem`}>{common.nav.oem}</Link>
          <Link href={`${root}#factory`}>{common.nav.factory}</Link>
          <Link href={`${root}#about`}>{common.nav.about}</Link>
          <Link href={`${root}#contact`}>{common.nav.contact}</Link>
        </nav>
        <div className="nav-actions"><LanguageSwitcher locale={locale} currentPath="/" label={common.language} /><a className="button button-primary compact" href="#quote">{common.getQuote} <ArrowRight size={16} /></a></div>
      </header>

      <section id="home" className="hero section-shell">
        <div className="hero-copy"><p className="eyebrow">{home.hero.eyebrow}</p><h1>{home.hero.title}</h1><p className="hero-text">{home.hero.description}</p><div className="hero-buttons"><a className="button button-primary" href="#quote">{common.getQuote} <ArrowRight size={18} /></a><a className="button button-outline" href="#resources"><FileArrowDown size={18} /> {home.hero.catalog}</a></div></div>
        <div className="hero-product hero-scene-wrap"><Image src="/images/hero-school-life.png" alt={home.hero.imageAlt} fill priority sizes="(max-width: 900px) 100vw, 52vw" className="hero-school-life" /></div>
      </section>

      <section className="proof-row section-shell" aria-label="Company statistics">
        {home.stats.map((stat, index) => { const Icon = [Factory, UsersThree, Cube, SealCheck][index]; return <div key={stat.label}><Icon size={32} weight="fill" /><strong>{stat.value}</strong><span>{stat.label}</span></div>; })}
      </section>

      <section id="products" className="products section"><div className="section-shell"><div className="series-heading"><h2>{home.products.title}</h2><p>{home.products.description}</p></div><div className="category-grid">{home.products.items.map((item) => <Link href={productPath} className="category" key={item.title}><div className="category-image"><Image src={productImages[item.type] ?? productImages.school} alt={item.title} width={520} height={370} className="product-art" /></div><div className="category-copy"><strong>{item.title}</strong><span>{item.caption}</span></div><span className="category-arrow" aria-hidden="true"><ArrowRight size={17} weight="bold" /></span></Link>)}</div></div></section>

      <section id="oem" className="section-shell process section"><div className="section-heading"><h2>{home.process.title}</h2><p>{home.process.description}</p></div><div className="process-line">{home.process.steps.map((step, index) => <article key={step.title}><b>{String(index + 1).padStart(2, "0")}</b><div><h3>{step.title}</h3><p>{step.text}</p></div><ArrowRight className="process-arrow" size={22} /></article>)}</div></section>

      <section id="factory" className="factory-section"><div className="factory-copy"><p className="eyebrow light">{home.factory.eyebrow}</p><h2>{home.factory.title}</h2><p>{home.factory.description}</p><a className="button button-outline inverse" href="#about">{home.factory.cta} <ArrowRight size={17} /></a></div><div className="factory-gallery">{factoryImages.map((src, index) => <figure className={index === 0 ? "factory-main" : "factory-photo-tile"} key={src}><Image src={src} alt={home.factory.tiles[index]} fill sizes="(max-width: 900px) 100vw, 35vw" /><figcaption>{home.factory.tiles[index]}</figcaption></figure>)}</div></section>

      <section id="about" className="contact-suite section-shell">
        <article className="partner-panel"><Image src="/images/founder.jpg" alt={home.partner.title} fill sizes="(max-width: 900px) 100vw, 36vw" /><div className="partner-copy"><p className="eyebrow">{home.partner.eyebrow}</p><h2>{home.partner.title}</h2><p>{home.partner.description}</p><ul>{home.partner.bullets.map((bullet) => <li key={bullet}><CheckCircle size={16} weight="fill" />{bullet}</li>)}</ul></div></article>
        <div className="suite-faq"><h2>{home.faqs.title}</h2><p>{home.faqs.description}</p>{home.faqs.items.slice(0, 4).map((item, index) => <div className="suite-faq-item" key={item.question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}>{item.question}<CaretDown size={15} /></button>{openFaq === index ? <p>{item.answer}</p> : null}</div>)}</div>
        <div className="suite-form"><h2>{home.certifications.title}</h2><p>{home.certifications.description}</p><div className="document"><FileArrowDown size={45} /><span><strong>{home.certifications.documentTitle}</strong><small>{home.certifications.documentText}</small></span></div><a className="suite-submit" href="#quote">{common.getQuote} <ArrowRight size={16} /></a></div>
      </section>

      <section id="quote" className="quote-section"><div className="quote-copy"><p className="eyebrow light">{home.quote.eyebrow}</p><h2>{home.quote.title}</h2><p>{home.quote.description}</p><p className="script">{home.quote.script}</p></div><form className="quote-form" onSubmit={submitInquiry}>{submitted ? <div className="success"><CheckCircle size={40} weight="fill" /><h3>{home.quote.successTitle}</h3><p>{home.quote.successText}</p><button type="button" className="button button-outline inverse" onClick={() => setSubmitted(false)}>{home.quote.again}</button></div> : <><label>{home.quote.name}<input required name="name" placeholder={home.quote.namePlaceholder} /></label><label>{home.quote.email}<input required type="email" name="email" placeholder={home.quote.emailPlaceholder} /></label><label>{home.quote.country}<input required name="country" placeholder={home.quote.countryPlaceholder} /></label><label>{home.quote.product}<input required name="product" placeholder={home.quote.productPlaceholder} /></label><label className="full">{home.quote.message}<textarea required name="message" placeholder={home.quote.messagePlaceholder} /></label><button className="button button-coral" type="submit">{home.quote.submit} <ArrowRight size={18} /></button></>}</form></section>

      <section id="contact" className="location-section" aria-labelledby="location-title"><div className="location-card"><p className="eyebrow">{home.location.eyebrow}</p><h2 id="location-title">{home.location.title}</h2><p className="location-intro">{home.location.description}</p><div className="location-address"><span className="location-pin"><MapPin size={24} weight="fill" /></span><div><small>{home.location.addressLabel}</small><address>{common.address}</address></div></div><div className="location-meta"><span>{home.location.city}</span><span>{home.location.postal}</span></div><a className="location-link" href="https://www.openstreetmap.org/search?query=Rm.%20601%2C%20He%20Hui%20Xin%20Tian%20Di%2C%20No.%20241%2C%20Helong%206th%20Rd.%2C%20Ren%20He%20Town%2C%20Baiyun%20District%2C%20Guangzhou%2C%20China%20510470" target="_blank" rel="noopener noreferrer">{home.location.openMap} <ArrowSquareOut size={17} weight="bold" /></a></div><div className="location-map"><Image src="/images/openstreetmap-guangzhou-renhe.png" alt={home.location.mapAlt} fill sizes="(max-width: 900px) 100vw, 65vw" className="location-map-image" /><span className="map-focus" aria-hidden="true"><span><MapPin size={28} weight="fill" /></span></span><a className="map-hit" href="https://www.openstreetmap.org/search?query=Rm.%20601%2C%20He%20Hui%20Xin%20Tian%20Di%2C%20No.%20241%2C%20Helong%206th%20Rd.%2C%20Ren%20He%20Town%2C%20Baiyun%20District%2C%20Guangzhou%2C%20China%20510470" target="_blank" rel="noopener noreferrer" aria-label={home.location.openMap} /><div className="map-badge"><MapPin size={16} weight="fill" /><span><strong>BESDERWILL</strong><small>{home.location.city}</small></span></div><a className="map-attribution" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap contributors</a></div></section>

      <footer id="resources" className="footer section-shell"><div><Image src="/images/besderwill-logo.png" alt="BESDERWILL" width={190} height={60} /><p>{common.brandTagline}</p></div><div className="footer-links"><div><strong>{common.nav.products}</strong><Link href={productPath}>{home.products.items[0].title}</Link><Link href={`${root}#oem`}>{common.nav.oem}</Link></div><div><strong>{common.nav.about}</strong><Link href={`${root}#factory`}>{common.nav.factory}</Link><Link href={`${root}#about`}>{common.nav.about}</Link><Link href={`${root}#contact`}>{common.nav.contact}</Link></div><div><strong>{common.nav.contact}</strong><a href={`mailto:${common.email}`}>{common.email}</a><a href="tel:+861366280482">{common.phone}</a><Link href={`${root}#contact`}>{common.address}</Link></div></div><div className="footer-bottom"><span>{common.copyright}</span><span>{common.manufacturerLine}</span></div></footer>
    </main>
  );
}
