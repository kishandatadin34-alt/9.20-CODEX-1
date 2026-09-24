"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CaretDown, List, X } from "@phosphor-icons/react";
import { useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import type { Dictionary } from "@/lib/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import { categoryImagesByType, categoryRoutes } from "@/lib/page-content";

type SiteHeaderProps = {
  locale: Locale;
  dictionary: Dictionary;
  currentPath: string;
  quoteHref?: string;
  quoteEnabled?: boolean;
};

export default function SiteHeader({ locale, dictionary, currentPath, quoteHref, quoteEnabled = true }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const { common, home } = dictionary;
  const root = localePath(locale, "/");
  const quoteLink = quoteHref ?? `${root}#quote`;
  const productColumns = [home.products.items.slice(0, 3), home.products.items.slice(3)];

  function closeNavigation() {
    setMobileOpen(false);
    setProductsOpen(false);
  }

  return (
    <header
      className="topbar site-header"
      onMouseLeave={() => setProductsOpen(false)}
      onKeyDown={(event) => {
        if (event.key === "Escape") closeNavigation();
      }}
    >
      <Link className="brand" href={root} aria-label="BESDERWILL home" onClick={closeNavigation}>
        <Image src="/images/besderwill-logo.png" alt="BESDERWILL" width={190} height={60} priority />
      </Link>

      <div className={`nav-shell ${mobileOpen ? "open" : ""}`}>
        <nav id="primary-navigation" className="nav" aria-label="Primary navigation">
          <div
            className="mega-wrap"
            onMouseEnter={() => {
              if (window.matchMedia("(min-width: 1101px)").matches) setProductsOpen(true);
            }}
          >
          <button
            className="nav-link mega-trigger"
            type="button"
            aria-expanded={productsOpen}
            aria-controls="products-mega-menu"
            onClick={() => setProductsOpen((open) => !open)}
          >
            {common.nav.products}
            <CaretDown className={productsOpen ? "mega-caret open" : "mega-caret"} size={13} weight="bold" />
          </button>
          </div>

          <Link href={localePath(locale, "/oem-odm")} onClick={closeNavigation}>{common.nav.oem}</Link>
          <Link href={localePath(locale, "/factory")} onClick={closeNavigation}>{common.nav.factory}</Link>
          <Link href={localePath(locale, "/about")} onClick={closeNavigation}>{common.nav.about}</Link>
          <Link href={localePath(locale, "/contact")} onClick={closeNavigation}>{common.nav.contact}</Link>
        </nav>

        <div id="products-mega-menu" className={`mega-panel ${productsOpen ? "visible" : ""}`}>
          <div className="mega-intro">
            <p className="eyebrow">{common.nav.products}</p>
            <p className="mega-title">{home.products.title}</p>
            <p>{home.products.description}</p>
            <Link href={localePath(locale, "/products")} onClick={closeNavigation}>
              {common.nav.products} <ArrowRight size={14} weight="bold" />
            </Link>
          </div>

          {productColumns.map((items, columnIndex) => (
            <div className="mega-list" key={columnIndex}>
              {items.map((item) => (
                <Link
                  className="mega-product-link"
                  href={localePath(locale, categoryRoutes[item.type] ?? "/products")}
                  key={item.type}
                  onClick={closeNavigation}
                >
                  <span className="mega-thumb">
                    <Image src={categoryImagesByType[item.type]} alt="" width={56} height={56} />
                  </span>
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.caption}</small>
                  </span>
                  <ArrowRight className="mega-item-arrow" size={13} weight="bold" />
                </Link>
              ))}
            </div>
          ))}

          <Link className="mega-feature" href={localePath(locale, "/oem-odm")} onClick={closeNavigation}>
            <Image src="/images/product-design-studio-v2.png" alt="" fill sizes="250px" />
            <span>
              <small>{common.nav.oem}</small>
              <strong>{home.process.title}</strong>
              <em>{common.nav.oem} <ArrowRight size={13} weight="bold" /></em>
            </span>
          </Link>
        </div>
      </div>

      <div className="nav-actions">
        <LanguageSwitcher locale={locale} currentPath={currentPath} label={common.language} />
        {quoteEnabled ? <a className="button button-primary compact header-quote" href={quoteLink} onClick={closeNavigation}>
          {common.getQuote} <ArrowRight size={16} />
        </a> : <span className="button button-primary compact header-quote button-disabled" aria-disabled="true">
          {common.getQuote} <ArrowRight size={16} />
        </span>}
        <button
          className="menu-toggle"
          type="button"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          aria-controls="primary-navigation"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={24} weight="bold" /> : <List size={25} weight="bold" />}
        </button>
      </div>

      {productsOpen ? <button className="mega-scrim" type="button" aria-label="Close products menu" onClick={closeNavigation} /> : null}
    </header>
  );
}
