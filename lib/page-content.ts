import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

export const categorySlugs = [
  "kindergarten-schoolbags",
  "eva-schoolbags",
  "trolley-schoolbag-sets",
  "urban-casual-backpacks",
  "3-in-1-schoolbag-sets",
  "4-in-1-schoolbag-sets",
  "5-in-1-schoolbag-sets",
] as const;

export type CategorySlug = (typeof categorySlugs)[number];

export const categoryRoutes: Record<string, string> = {
  kindergarten: "/products/kindergarten-schoolbags",
  eva: "/products/eva-schoolbags",
  trolley: "/products/trolley-schoolbag-sets",
  urban: "/products/urban-casual-backpacks",
  set3: "/products/3-in-1-schoolbag-sets",
  set4: "/products/4-in-1-schoolbag-sets",
  set5: "/products/5-in-1-schoolbag-sets",
};

const categoryIndex: Record<CategorySlug, number> = {
  "kindergarten-schoolbags": 0,
  "eva-schoolbags": 1,
  "trolley-schoolbag-sets": 2,
  "urban-casual-backpacks": 3,
  "3-in-1-schoolbag-sets": 4,
  "4-in-1-schoolbag-sets": 5,
  "5-in-1-schoolbag-sets": 6,
};

export const categoryImages: Record<CategorySlug, string> = {
  "kindergarten-schoolbags": "/images/product-series/kindergarten-schoolbags.jpg",
  "eva-schoolbags": "/images/product-series/eva-schoolbags.jpg",
  "trolley-schoolbag-sets": "/images/product-series/trolley-schoolbag-sets.jpg",
  "urban-casual-backpacks": "/images/product-series/urban-casual-backpacks.jpg",
  "3-in-1-schoolbag-sets": "/images/product-series/3-in-1-schoolbag-sets.jpg",
  "4-in-1-schoolbag-sets": "/images/product-series/4-in-1-schoolbag-sets.jpg",
  "5-in-1-schoolbag-sets": "/images/product-series/5-in-1-schoolbag-sets.jpg",
};

export const categoryImagesByType: Record<string, string> = {
  kindergarten: categoryImages["kindergarten-schoolbags"],
  eva: categoryImages["eva-schoolbags"],
  trolley: categoryImages["trolley-schoolbag-sets"],
  urban: categoryImages["urban-casual-backpacks"],
  set3: categoryImages["3-in-1-schoolbag-sets"],
  set4: categoryImages["4-in-1-schoolbag-sets"],
  set5: categoryImages["5-in-1-schoolbag-sets"],
};

export function getCategoryContent(locale: Locale, slug: CategorySlug, dictionary: Dictionary) {
  const item = dictionary.home.products.items[categoryIndex[slug]];
  const copy = dictionary.seriesPage;
  const h1 = copy.titleTemplate.replace("{name}", item.title);
  const intro = copy.descriptionTemplate.replace("{name}", item.title);
  return {
    name: item.title,
    caption: item.caption,
    image: categoryImages[slug],
    title: `${item.title} | ${copy.seoSuffix} | BESDERWILL`,
    description: intro,
    h1,
    intro,
    sections: copy.sections,
    cta: copy.cta,
    imageAlt: copy.imageAlt.replace("{name}", item.title),
    moqLabel: copy.moqLabel,
    moqValue: copy.moqValue,
    leadTimeLabel: copy.leadTimeLabel,
    leadTimeValue: copy.leadTimeValue,
    detailsTitle: copy.detailsTitle,
    relatedTitle: copy.relatedTitle,
    viewSeries: copy.viewSeries,
  };
}

export const contentPageSlugs = ["oem-odm", "factory", "quality-control", "about", "contact", "privacy-policy", "terms"] as const;
export type ContentPageSlug = (typeof contentPageSlugs)[number];

export const complianceCopy: Record<Locale, { phone: string; privacy: string; agree: string }> = {
  en: { phone: "Phone / WhatsApp *", privacy: "Privacy Policy", agree: "By submitting, you agree to our Privacy Policy and allow BESDERWILL to contact you about this inquiry." },
  fr: { phone: "Téléphone / WhatsApp *", privacy: "Politique de confidentialité", agree: "En envoyant ce formulaire, vous acceptez notre politique de confidentialité et autorisez BESDERWILL à vous contacter au sujet de cette demande." },
  es: { phone: "Teléfono / WhatsApp *", privacy: "Política de privacidad", agree: "Al enviar el formulario, acepta nuestra política de privacidad y autoriza a BESDERWILL a contactarle sobre esta consulta." },
  ja: { phone: "電話 / WhatsApp *", privacy: "プライバシーポリシー", agree: "送信により、プライバシーポリシーに同意し、本件に関するBESDERWILLからの連絡を許可します。" },
  de: { phone: "Telefon / WhatsApp *", privacy: "Datenschutzerklärung", agree: "Mit dem Absenden stimmen Sie unserer Datenschutzerklärung zu und erlauben BESDERWILL, Sie zu dieser Anfrage zu kontaktieren." },
};

const legalCopy: Record<Locale, {
  privacyTitle: string; privacyDescription: string; termsTitle: string; termsDescription: string;
  privacySections: Array<{ title: string; text: string }>;
  termsSections: Array<{ title: string; text: string }>;
}> = {
  en: {
    privacyTitle: "Privacy Policy", privacyDescription: "How BESDERWILL collects and uses information submitted through this website.",
    termsTitle: "Website Terms", termsDescription: "Terms governing use of the BESDERWILL website and sourcing information.",
    privacySections: [
      { title: "Information we collect", text: "When you send an inquiry, we may collect your name, company, email, phone number, country, product requirements and any message you provide." },
      { title: "How we use information", text: "We use inquiry data to answer your request, prepare quotations, discuss samples and production, prevent abuse and maintain business records." },
      { title: "Form processing", text: "Website forms are processed by FormSubmit and delivered to our sales inbox. Do not submit confidential designs or payment details through a public form." },
      { title: "Retention and your choices", text: "We retain correspondence only as needed for sourcing discussions, legal obligations and legitimate business records. You may request access, correction or deletion by email." },
    ],
    termsSections: [
      { title: "Website information", text: "Product descriptions, lead times, minimum quantities, capacity and certification information are general guidance. Final specifications are confirmed in the quotation, sample approval and purchase documents." },
      { title: "Intellectual property", text: "BESDERWILL website text, layout and brand assets may not be copied for commercial use without permission. Customer artwork remains subject to the rights stated in the applicable agreement." },
      { title: "Quotations and orders", text: "A website inquiry is not an order. Prices, tooling, sampling, delivery dates, testing and payment terms become binding only when confirmed in writing by authorized parties." },
      { title: "Contact", text: "Questions about these terms can be sent to the contact details published on this website." },
    ],
  },
  fr: {
    privacyTitle: "Politique de confidentialité", privacyDescription: "Comment BESDERWILL collecte et utilise les informations envoyées sur ce site.",
    termsTitle: "Conditions d'utilisation", termsDescription: "Conditions applicables au site BESDERWILL et aux informations d'approvisionnement.",
    privacySections: [
      { title: "Informations collectées", text: "Lors d'une demande, nous pouvons recueillir votre nom, entreprise, e-mail, téléphone, pays, besoins produit et message." },
      { title: "Utilisation", text: "Ces informations servent à répondre, préparer un devis, discuter des échantillons et de la production et conserver les échanges professionnels." },
      { title: "Traitement des formulaires", text: "Les formulaires sont traités par FormSubmit et transmis à notre équipe commerciale. N'envoyez pas de données de paiement via un formulaire public." },
      { title: "Vos choix", text: "Vous pouvez demander l'accès, la correction ou la suppression de vos données en nous contactant par e-mail." },
    ],
    termsSections: [
      { title: "Informations du site", text: "Les spécifications, délais, MOQ, capacités et certifications sont indicatifs et doivent être confirmés par devis et documents de commande." },
      { title: "Propriété intellectuelle", text: "Les contenus et éléments de marque ne peuvent pas être copiés à des fins commerciales sans autorisation." },
      { title: "Devis et commandes", text: "Une demande sur le site n'est pas une commande. Prix, délais, essais et paiement ne sont valables qu'après confirmation écrite." },
      { title: "Contact", text: "Toute question peut être envoyée aux coordonnées publiées sur ce site." },
    ],
  },
  es: {
    privacyTitle: "Política de privacidad", privacyDescription: "Cómo BESDERWILL recopila y utiliza la información enviada en este sitio.",
    termsTitle: "Términos del sitio", termsDescription: "Condiciones de uso del sitio BESDERWILL y de la información comercial.",
    privacySections: [
      { title: "Información recopilada", text: "Al enviar una consulta podemos recopilar nombre, empresa, correo, teléfono, país, requisitos de producto y mensaje." },
      { title: "Uso de la información", text: "Usamos los datos para responder, preparar cotizaciones, tratar muestras y producción y mantener registros comerciales." },
      { title: "Procesamiento del formulario", text: "FormSubmit procesa los formularios y los entrega a nuestro equipo comercial. No envíe datos de pago mediante un formulario público." },
      { title: "Sus opciones", text: "Puede solicitar acceso, corrección o eliminación de sus datos por correo electrónico." },
    ],
    termsSections: [
      { title: "Información del sitio", text: "Especificaciones, plazos, MOQ, capacidad y certificaciones son orientativos y se confirman en la cotización y documentos del pedido." },
      { title: "Propiedad intelectual", text: "El contenido y los elementos de marca no pueden copiarse para uso comercial sin permiso." },
      { title: "Cotizaciones y pedidos", text: "Una consulta web no es un pedido. Precio, plazos, pruebas y pagos solo son vinculantes tras confirmación escrita." },
      { title: "Contacto", text: "Envíe sus preguntas a los datos de contacto publicados en este sitio." },
    ],
  },
  ja: {
    privacyTitle: "プライバシーポリシー", privacyDescription: "BESDERWILLが本サイトで送信された情報を収集・利用する方法。",
    termsTitle: "サイト利用条件", termsDescription: "BESDERWILLサイトと調達情報の利用条件。",
    privacySections: [
      { title: "収集する情報", text: "お問い合わせ時に、氏名、会社名、メール、電話、国・地域、製品要件、メッセージを収集する場合があります。" },
      { title: "利用目的", text: "回答、見積作成、サンプル・生産の相談、業務記録の管理に利用します。" },
      { title: "フォーム処理", text: "フォームはFormSubmitで処理され、当社営業窓口に届きます。支払情報は公開フォームで送信しないでください。" },
      { title: "お客様の選択", text: "メールにて情報の開示、訂正、削除を依頼できます。" },
    ],
    termsSections: [
      { title: "サイト情報", text: "仕様、納期、MOQ、生産能力、認証は一般的な案内です。最終条件は見積書と注文書類で確定します。" },
      { title: "知的財産", text: "本サイトのコンテンツやブランド素材の商用複製には許可が必要です。" },
      { title: "見積・注文", text: "Webからのお問い合わせは注文ではありません。価格、納期、試験、支払条件は書面確認後に有効となります。" },
      { title: "お問い合わせ", text: "本条件へのご質問は、サイト記載の連絡先へお送りください。" },
    ],
  },
  de: {
    privacyTitle: "Datenschutzerklärung", privacyDescription: "Wie BESDERWILL über diese Website übermittelte Informationen erhebt und verwendet.",
    termsTitle: "Website-Bedingungen", termsDescription: "Bedingungen für die Nutzung der BESDERWILL-Website und Beschaffungsinformationen.",
    privacySections: [
      { title: "Erhobene Informationen", text: "Bei einer Anfrage können wir Name, Unternehmen, E-Mail, Telefon, Land, Produktanforderungen und Ihre Nachricht erfassen." },
      { title: "Verwendung", text: "Wir nutzen diese Daten für Antworten, Angebote, Muster- und Produktionsgespräche sowie Geschäftsunterlagen." },
      { title: "Formularverarbeitung", text: "Formulare werden durch FormSubmit verarbeitet und an unser Vertriebspostfach gesendet. Übermitteln Sie keine Zahlungsdaten über öffentliche Formulare." },
      { title: "Ihre Rechte", text: "Sie können per E-Mail Auskunft, Berichtigung oder Löschung Ihrer Daten anfordern." },
    ],
    termsSections: [
      { title: "Website-Informationen", text: "Spezifikationen, Lieferzeiten, MOQ, Kapazitäten und Zertifizierungen sind allgemeine Hinweise und werden in Angebot und Bestelldokumenten bestätigt." },
      { title: "Geistiges Eigentum", text: "Website-Inhalte und Markenelemente dürfen ohne Genehmigung nicht kommerziell kopiert werden." },
      { title: "Angebote und Bestellungen", text: "Eine Website-Anfrage ist keine Bestellung. Preise, Termine, Prüfungen und Zahlung werden erst nach schriftlicher Bestätigung verbindlich." },
      { title: "Kontakt", text: "Fragen können an die auf dieser Website veröffentlichten Kontaktdaten gesendet werden." },
    ],
  },
};

export function getContentPage(locale: Locale, slug: ContentPageSlug, dictionary: Dictionary) {
  const { home, product } = dictionary;
  if (slug === "privacy-policy" || slug === "terms") {
    const legal = legalCopy[locale];
    const privacy = slug === "privacy-policy";
    return {
      title: privacy ? legal.privacyTitle : legal.termsTitle,
      description: privacy ? legal.privacyDescription : legal.termsDescription,
      eyebrow: "BESDERWILL",
      image: "/images/factory-product-design.png",
      sections: privacy ? legal.privacySections : legal.termsSections,
    };
  }

  const pages = {
    "oem-odm": {
      title: home.process.title,
      description: `${home.process.description} ${product.custom.description}`,
      eyebrow: product.hero.kicker,
      image: "/images/product-design-studio-v2.png",
      sections: [...home.process.steps, ...product.custom.steps].map(({ title, text }) => ({ title, text })),
    },
    factory: {
      title: home.factory.title,
      description: home.factory.description,
      eyebrow: home.factory.eyebrow,
      image: "/images/product-global-team-v2.png",
      sections: home.factory.tiles.map((title, index) => ({ title, text: product.trust.items[index]?.text ?? product.quality.factoryText })),
    },
    "quality-control": {
      title: product.quality.factoryTitle,
      description: `${product.quality.factoryText} ${product.quality.standardsText}`,
      eyebrow: product.trust.eyebrow,
      image: "/images/product-export-inspection-v2.png",
      sections: [
        { title: product.options.materialTitle, text: product.options.materials.join(" · ") },
        { title: product.trust.items[1].title, text: product.trust.items[1].text },
        { title: product.trust.items[3].title, text: product.trust.items[3].text },
        { title: product.quality.standardsTitle, text: product.quality.standardsText },
      ],
    },
    about: {
      title: home.partner.title,
      description: home.partner.description,
      eyebrow: home.partner.eyebrow,
      image: "/images/factory-team-global.png",
      sections: home.partner.bullets.map((title, index) => ({ title, text: product.trust.items[index]?.text ?? home.partner.description })),
    },
    contact: {
      title: home.location.title,
      description: home.location.description,
      eyebrow: home.location.eyebrow,
      image: "/images/openstreetmap-guangzhou-renhe.png",
      sections: [
        { title: home.location.addressLabel, text: dictionary.common.address },
        { title: dictionary.common.nav.contact, text: `${dictionary.common.email} · ${dictionary.common.phone}` },
        { title: product.quickForm.fast, text: product.quickForm.reply },
      ],
    },
  } satisfies Record<Exclude<ContentPageSlug, "privacy-policy" | "terms">, { title: string; description: string; eyebrow: string; image: string; sections: Array<{ title: string; text: string }> }>;

  return pages[slug];
}
