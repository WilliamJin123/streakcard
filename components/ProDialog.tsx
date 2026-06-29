"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";
import { Flame } from "./Flame";

interface ProDialogProps {
  open: boolean;
  onClose: () => void;
  paymentLink: string;
  price: string;
}

const PERKS = [
  "Transparent PNG — clean overlay on Reels & TikToks",
  "No watermark",
  "2× HD export (2160px)",
  "Fitness template pack (gym · run · lift) — more coming",
];

export function ProDialog({ open, onClose, paymentLink, price }: ProDialogProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const ready = paymentLink.length > 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Unlock StreakCard Pro"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-5"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        <div
          className="flex items-center gap-2.5 px-6 pb-5 pt-6"
          style={{ background: "linear-gradient(135deg, #FF8A2B 0%, #FF3B1F 60%, #E11D2A 100%)" }}
        >
          <Flame size={22} tone="#FFFFFF" idSuffix="prodlg" />
          <span className="text-lg font-extrabold tracking-tight text-white">StreakCard Pro</span>
        </div>

        <div className="px-6 py-5">
          <p className="text-sm text-neutral-500">
            Make streak cards worth posting — clean exports, no watermark.
          </p>

          <ul className="mt-4 flex flex-col gap-2.5">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-start gap-2.5 text-sm text-neutral-800">
                <span
                  aria-hidden
                  className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-orange-100 text-[10px] font-bold text-orange-600"
                >
                  ✓
                </span>
                {perk}
              </li>
            ))}
          </ul>

          {ready ? (
            <a
              href={paymentLink}
              onClick={() => track("pro_checkout_click")}
              className="mt-6 flex w-full items-center justify-center rounded-xl py-3.5 text-base font-bold text-white transition hover:opacity-95"
              style={{
                background: "linear-gradient(135deg, #FF8A2B 0%, #FF3B1F 55%, #E11D2A 100%)",
                boxShadow: "0 10px 30px -8px rgba(225,45,20,0.5)",
              }}
            >
              Unlock Pro — {price}
            </a>
          ) : (
            <div className="mt-6 rounded-xl border border-dashed border-neutral-300 py-3.5 text-center text-sm font-medium text-neutral-500">
              Checkout opens soon — almost there.
            </div>
          )}

          <p className="mt-3 text-center text-xs text-neutral-400">
            One-time founding price · instant unlock
          </p>

          <button
            type="button"
            onClick={onClose}
            className="mt-2 w-full py-2 text-center text-sm font-medium text-neutral-500 transition hover:text-neutral-800"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
