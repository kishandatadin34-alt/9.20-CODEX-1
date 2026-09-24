import { notFound, redirect } from "next/navigation";
import { isLocale, localePath } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export default async function LegacyLocalizedProductPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "en") notFound();
  redirect(localePath(locale, "/products/kindergarten-schoolbags/design-01"));
}
