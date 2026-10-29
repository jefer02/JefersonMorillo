"use client";

import { useState } from "react";
import { buttonClass } from "@/components/ui/Button";
import { IconCheck, IconCopy } from "@/components/ui/Icons";
import { useMessages } from "@/lib/i18n/client";

export function CopyEmail({ email }: { email: string }) {
  const t = useMessages().contact;
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className={buttonClass("outline", "text-[0.88rem]")}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2200);
        } catch {
          window.location.assign(`mailto:${email}`);
        }
      }}
    >
      {copied ? <IconCheck /> : <IconCopy />}
      <span aria-live="polite">{copied ? t.copied : t.copy}</span>
    </button>
  );
}
