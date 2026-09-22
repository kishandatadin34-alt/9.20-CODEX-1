import { FORM_SUBMIT_ACTION } from "@/lib/formsubmit";
import { siteUrl } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

type FormSubmitFieldsProps = {
  locale: Locale;
  pagePath: string;
  source: string;
  subject: string;
};

export { FORM_SUBMIT_ACTION };

export default function FormSubmitFields({ locale, pagePath, source, subject }: FormSubmitFieldsProps) {
  const pageUrl = new URL(pagePath, `${siteUrl}/`).toString();

  return (
    <>
      <input type="hidden" name="_subject" value={`${subject} [${locale.toUpperCase()}]`} />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value={pageUrl} />
      <input type="hidden" name="_url" value={pageUrl} />
      <input type="hidden" name="form_source" value={source} />
      <input type="hidden" name="language" value={locale} />
      <input className="form-honey" type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    </>
  );
}
