"use client";

import { WhatsappLogoIcon } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";

const WHATSAPP_URL =
  "https://wa.me/8618073984131?text=Hello%2C%20I%20am%20interested%20in%20your%20products.%20Please%20send%20me%20more%20details.";

type WhatsAppButtonProps = {
  label: string;
};

export default function WhatsAppButton({ label }: WhatsAppButtonProps) {
  const pathname = usePathname();
  if (pathname.split("/").includes("products")) return null;

  return (
    <div className="whatsapp-float">
      <span className="whatsapp-tooltip" aria-hidden="true">
        {label}
      </span>
      <a
        className="whatsapp-button"
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
      >
        <WhatsappLogoIcon size={34} weight="fill" aria-hidden="true" />
      </a>
    </div>
  );
}
