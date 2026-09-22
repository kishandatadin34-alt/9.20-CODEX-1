export const FORM_SUBMIT_EMAIL = "kishandatadin34@gmail.com";
export const FORM_SUBMIT_ACTION = `https://formsubmit.co/${FORM_SUBMIT_EMAIL}`;
const FORM_SUBMIT_AJAX_ENDPOINT = `https://formsubmit.co/ajax/${FORM_SUBMIT_EMAIL}`;

type FormSubmitResponse = {
  success?: boolean | string;
  message?: string;
};

export async function sendFormSubmitInquiry(form: HTMLFormElement): Promise<void> {
  const formData = new FormData(form);
  const payload: Record<string, string> = {};

  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") payload[key] = value;
  }

  payload._url = window.location.href;
  payload.submitted_at = new Date().toISOString();

  const response = await fetch(FORM_SUBMIT_AJAX_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = (await response.json().catch(() => null)) as FormSubmitResponse | null;
  const rejected = result?.success === false || result?.success === "false";

  if (!response.ok || rejected) {
    throw new Error(result?.message || "FormSubmit rejected the inquiry.");
  }
}
