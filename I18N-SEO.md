# BESDERWILL international SEO architecture

## URL policy

- English is the default and has no prefix: `/`, `/products/custom-school-bag`.
- French, Spanish, Japanese and German use `/fr`, `/es`, `/ja`, `/de`.
- Each locale route is statically generated as independent HTML.
- No IP or browser-language redirect is used, so crawlers can reach every version.

## Key directories

```text
app/
  (default)/                         # English root layout and routes
  [locale]/                          # fr, es, ja, de root layout and routes
  sitemap.ts                         # multilingual sitemap + alternates
  robots.ts                          # crawler policy
components/
  HomePage.tsx
  ProductPage.tsx
  LanguageSwitcher.tsx
lib/
  i18n.ts                            # locale registry and URL helpers
  dictionaries.ts                    # typed dictionary loader
  seo.ts                             # canonical, hreflang and metadata builder
locales/
  en.json
  fr.json
  es.json
  ja.json
  de.json
```

## Add another language

1. Add the locale to `locales`, `localizedLocales` and `languageOptions` in `lib/i18n.ts`.
2. Copy `locales/en.json`, translate every value and keep the same keys.
3. Import the new JSON file in `lib/dictionaries.ts`.
4. Build the project. The route, hreflang cluster, language switcher and sitemap will include it automatically.

## Vercel

Set `NEXT_PUBLIC_SITE_URL` in the Vercel project to the production HTTPS origin without a trailing slash. Then deploy with the standard Next.js preset. No special rewrite is required.
