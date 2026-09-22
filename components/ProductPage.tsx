"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowRight, CaretDown, CheckCircle, Cube, Factory, GlobeHemisphereWest, Package, ShieldCheck, Timer, Truck } from "@phosphor-icons/react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import FormSubmitFields, { FORM_SUBMIT_ACTION } from "@/components/FormSubmitFields";
import type { Dictionary } from "@/lib/dictionaries";
import { sendFormSubmitInquiry } from "@/lib/formsubmit";
import { localePath, type Locale } from "@/lib/i18n";
import { complianceCopy } from "@/lib/page-content";
import { company } from "@/lib/company";
import "@/app/products/custom-school-bag/product-page.css";

type ProductPageProps = { locale: Locale; dictionary: Dictionary };
type SubmissionState = "idle" | "sending" | "success" | "error";

export default function ProductPage({ locale, dictionary }: ProductPageProps) {
  const [heroState, setHeroState] = useState<SubmissionState>("idle");
  const [contactState, setContactState] = useState<SubmissionState>("idle");
  const [open, setOpen] = useState(-1);
  const { common, product, formStatus } = dictionary;
  const root = localePath(locale, "/");
  const currentPath = "/products/custom-school-bag";
  const compliance = complianceCopy[locale];

  async function submit(event: FormEvent<HTMLFormElement>, setState: (state: SubmissionState) => void) {
    event.preventDefault();
    const form = event.currentTarget;
    setState("sending");

    try {
      await sendFormSubmitInquiry(form);
      form.reset();
      setState("success");
    } catch {
      setState("error");
    }
  }

  return <main className="product-detail">
    <header className="pd-header"><Link href={root} className="pd-brand"><Image src="/images/besderwill-logo.png" alt="BESDERWILL" width={190} height={60} priority /></Link><nav><Link href={root}>{common.nav.home}</Link><a href="#product">{common.nav.products}</a><Link href={localePath(locale, "/oem-odm")}>{common.nav.oem}</Link><Link href={localePath(locale, "/quality-control")}>{common.nav.quality}</Link><Link href={localePath(locale, "/contact")}>{common.nav.contact}</Link></nav><div className="pd-actions"><LanguageSwitcher locale={locale} currentPath={currentPath} label={common.language} /><a href="#contact" className="pd-quote">{common.getQuote}</a></div></header>

    <nav className="pd-breadcrumb" aria-label="Breadcrumb"><Link href={root}>{common.nav.home}</Link><span>/</span><Link href={`${root}#products`}>{common.nav.products}</Link><span>/</span><span>{product.options.specifications[0][1]}</span></nav>

    <section id="product" className="pd-hero"><div className="pd-hero-photo"><Image src="/images/custom-pink-school-backpack.png" alt={product.hero.imageAlt} fill priority fetchPriority="high" sizes="(max-width: 900px) 100vw, 39vw" /></div><div className="pd-hero-copy"><p className="pd-kicker">{product.hero.kicker}</p><h1>{product.hero.title}</h1><p>{product.hero.description}</p><div className="pd-hero-proof"><span><ShieldCheck size={22} />{product.hero.proof[0]}</span><span><Cube size={22} />{product.hero.proof[1]}</span><span><GlobeHemisphereWest size={22} />{product.hero.proof[2]}</span></div><p className="pd-script">{product.hero.script}</p></div><form className="pd-hero-form" action={FORM_SUBMIT_ACTION} method="POST" onSubmit={(event) => submit(event, setHeroState)} aria-busy={heroState === "sending"}><FormSubmitFields locale={locale} pagePath={localePath(locale, currentPath)} source="Product quick quote form" subject="New BESDERWILL product inquiry" />{heroState === "success" ? <div className="pd-sent"><CheckCircle size={38} weight="fill" /><strong>{product.quickForm.thanks}</strong><span>{product.quickForm.reply}</span><button type="button" onClick={() => setHeroState("idle")}>{product.quickForm.again}</button></div> : <><h2>{product.quickForm.title}</h2><p>{product.quickForm.description}</p><label>{product.contact.name}<input required name="name" autoComplete="name" placeholder={product.contact.namePlaceholder} /></label><label>{product.contact.email}<input required type="email" name="email" autoComplete="email" placeholder={product.contact.emailPlaceholder} /></label><label>{compliance.phone}<input required type="tel" name="phone" autoComplete="tel" placeholder={company.phoneDisplay} /></label><label>{product.quickForm.productType}<select required name="product_type" defaultValue={product.quickForm.productOptions[0]}>{product.quickForm.productOptions.map((option) => <option key={option}>{option}</option>)}</select></label><label>{product.quickForm.quantity}<select required name="quantity" defaultValue=""><option value="" disabled>{product.quickForm.select}</option>{product.quickForm.quantityOptions.map((option) => <option key={option}>{option}</option>)}</select></label><label>{product.quickForm.price}<input name="target_price" placeholder={product.quickForm.optional} /></label><label>{product.quickForm.message}<textarea name="message" placeholder={product.quickForm.messagePlaceholder} /></label><p className="pd-form-privacy">{compliance.agree} <Link href={localePath(locale, "/privacy-policy")}>{compliance.privacy}</Link></p><button type="submit" disabled={heroState === "sending"}>{heroState === "sending" ? formStatus.sending : product.quickForm.submit} <ArrowRight size={17} /></button>{heroState === "error" ? <p className="form-submit-error" role="alert">{formStatus.error}</p> : null}<small><ShieldCheck size={14} /> {product.quickForm.fast}&nbsp;&nbsp; <Truck size={14} /> {product.quickForm.shipping}</small></>}</form></section>

    <section id="custom" className="pd-steps"><h2>{product.custom.title}</h2><p>{product.custom.description}</p><div>{product.custom.steps.map((step, index) => <article key={step.title}><b>{index + 1}</b><Image src={index === 0 ? "/images/custom-pink-school-backpack.png" : "/images/oem-solutions-reference.png"} alt="" width={150} height={108} /><h3>{step.title}</h3><p>{step.text}</p>{index < 4 ? <ArrowRight className="pd-step-arrow" size={20} /> : null}</article>)}</div></section>

    <section className="pd-options"><div className="pd-spec"><h2>{product.options.title}</h2>{product.options.specifications.map(([label, value]) => <div key={label}><strong>{label}</strong><span>{value}</span></div>)}</div><div className="pd-material"><h2>{product.options.materialTitle}</h2><div className="pd-material-grid">{product.options.materials.map((name, index) => <figure key={name}><Image src="/images/oem-solutions-reference.png" alt={name} width={150} height={120} style={{ objectPosition: `${50 + index * 12}% center` }} /><figcaption>{name}</figcaption></figure>)}</div><h3>{product.options.colorsTitle}</h3><div className="pd-swatches">{["#f3a0b5", "#ef6c85", "#fb7948", "#f6c43c", "#a8c96a", "#7bb9a8", "#7db5dc", "#7e83c4", "#5b52a6", "#192642"].map((color) => <i key={color} style={{ background: color }} />)}</div><p>{product.options.colorsText}</p></div><div className="pd-logo-options"><h2>{product.options.logoTitle}</h2>{product.options.logos.map((name, index) => <div className={`pd-logo-card logo-${index}`} key={name}><b>BESDERWILL</b><span>{name}</span></div>)}<h2 className="pack-title">{product.options.packagingTitle}</h2><div className="pd-pack"><Image src="/images/oem-solutions-reference.png" alt={product.options.packagingAlt} fill sizes="(max-width: 900px) 100vw, 25vw" /></div></div></section>

    <section id="quality" className="pd-quality"><div className="pd-cert"><h2>{product.quality.standardsTitle}</h2><p>{product.quality.standardsText}</p><div><b>BSCI</b><b>ISO<br />9001</b><b>GRS</b></div></div><div className="pd-factory"><h2>{product.quality.factoryTitle}</h2><p>{product.quality.factoryText}</p><Image src="/images/factory-section-reference.png" alt={product.quality.factoryAlt} width={1215} height={260} /><div className="pd-factory-stats"><span><Factory size={21} />{product.quality.stats[0]}</span><span><Timer size={21} />{product.quality.stats[1]}</span><span><Package size={21} />{product.quality.stats[2]}</span></div></div></section>

    <section className="pd-trust-gallery" aria-label={product.trust.title}><div className="pd-trust-heading"><p>{product.trust.eyebrow}</p><h2>{product.trust.title}</h2><span>{product.trust.description}</span></div><div className="pd-trust-grid">{[
      ["pd-team", "/images/product-global-team-v2.png"], ["pd-design", "/images/product-design-studio-v2.png"], ["pd-visit", "/images/product-customer-visit-v2.png"], ["pd-export", "/images/product-export-inspection-v2.png"],
    ].map(([className, src], index) => <article className={`pd-trust-card ${className}`} key={src}><Image src={src} alt={product.trust.items[index].alt} fill sizes="(max-width: 900px) 100vw, 50vw" /><span><strong>{product.trust.items[index].title}</strong><small>{product.trust.items[index].text}</small></span></article>)}</div></section>

    <section className="pd-bottom" id="contact"><div className="pd-bottom-photo"><Image src="/images/custom-pink-school-backpack.png" alt={product.contact.imageAlt} fill sizes="(max-width: 900px) 100vw, 35vw" /></div><form action={FORM_SUBMIT_ACTION} method="POST" onSubmit={(event) => submit(event, setContactState)} aria-busy={contactState === "sending"}><FormSubmitFields locale={locale} pagePath={localePath(locale, currentPath)} source="Product project form" subject="New BESDERWILL custom project inquiry" />{contactState === "success" ? <div className="pd-bottom-sent"><CheckCircle size={42} weight="fill" /><h2>{product.contact.successTitle}</h2><p>{product.contact.successText}</p><button type="button" onClick={() => setContactState("idle")}>{product.quickForm.again}</button></div> : <><h2>{product.contact.title}</h2><p>{product.contact.description}</p><div className="pd-contact-fields"><label>{product.contact.name}<input required name="name" autoComplete="name" placeholder={product.contact.namePlaceholder} /></label><label>{product.contact.country}<select required name="country" defaultValue=""><option value="" disabled>{product.contact.select}</option>{product.contact.countries.map((country) => <option key={country}>{country}</option>)}</select></label><label>{product.contact.company}<input required name="company" autoComplete="organization" placeholder={product.contact.companyPlaceholder} /></label><label>{product.contact.quantity}<select required name="quantity" defaultValue=""><option value="" disabled>{product.contact.select}</option>{product.contact.quantities.map((quantity) => <option key={quantity}>{quantity}</option>)}</select></label><label>{product.contact.email}<input required type="email" name="email" autoComplete="email" placeholder={product.contact.emailPlaceholder} /></label><label>{compliance.phone}<input required type="tel" name="phone" autoComplete="tel" placeholder={company.phoneDisplay} /></label><label>{product.contact.message}<textarea name="message" placeholder={product.contact.messagePlaceholder} /></label><p className="pd-form-privacy">{compliance.agree} <Link href={localePath(locale, "/privacy-policy")}>{compliance.privacy}</Link></p></div><button type="submit" disabled={contactState === "sending"}>{contactState === "sending" ? formStatus.sending : product.contact.submit} <ArrowRight size={18} /></button>{contactState === "error" ? <p className="form-submit-error" role="alert">{formStatus.error}</p> : null}</>}</form></section>

    <section className="pd-faq"><div><h2>{product.faq.title}</h2><p>{product.faq.description}</p></div><div>{product.faq.items.map((item, index) => <article key={item}><button onClick={() => setOpen(open === index ? -1 : index)}>{item}<CaretDown className={open === index ? "pd-rotate" : ""} size={18} /></button>{open === index ? <p>{product.faq.answer}</p> : null}</article>)}</div></section>
    <footer className="pd-footer"><Image src="/images/besderwill-logo.png" alt="BESDERWILL" width={190} height={60} /><span>{common.footerTrust}</span><div className="pd-legal"><Link href={localePath(locale, "/privacy-policy")}>{compliance.privacy}</Link><Link href={localePath(locale, "/terms")}>Terms</Link></div><span>{common.copyright}</span></footer>
  </main>;
}
