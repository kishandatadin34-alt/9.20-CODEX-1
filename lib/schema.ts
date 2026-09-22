import { company } from "@/lib/company";
import { absoluteUrl } from "@/lib/seo";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: company.brand,
    legalName: company.legalName,
    alternateName: "BESDER GROUP",
    url: absoluteUrl("/"),
    logo: absoluteUrl("/images/besderwill-logo.png"),
    email: company.email,
    telephone: company.phoneE164,
    sameAs: [company.linkedIn],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: company.phoneE164,
      email: company.email,
      availableLanguage: ["English", "French", "Spanish", "Japanese", "German", "Chinese"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address,
      addressLocality: company.city,
      addressRegion: company.region,
      postalCode: company.postalCode,
      addressCountry: company.country,
    },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

