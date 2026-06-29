"use client";

import { useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { Controls } from "@/components/Controls";
import { Flame } from "@/components/Flame";
import { ProDialog } from "@/components/ProDialog";
import { StreakCard } from "@/components/StreakCard";
import { exportCardPng } from "@/lib/export";
import { usePro } from "@/lib/pro";
import { daysSince } from "@/lib/streak";
import { defaultTemplate } from "@/lib/templates";
import type { TemplateId } from "@/lib/templates";

const PRIMARY_GRADIENT =
  "linear-gradient(135deg, #FF8A2B 0%, #FF3B1F 55%, #E11D2A 100%)";
const PRO_PRICE = "$7";
const PAYMENT_LINK = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK || "";

const checkerboard = {
  backgroundColor: "#dcdcdc",
  backgroundImage:
    "linear-gradient(45deg, #b8b8b8 25%, transparent 25%), linear-gradient(-45deg, #b8b8b8 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #b8b8b8 75%), linear-gradient(-45deg, transparent 75%, #b8b8b8 75%)",
  backgroundSize: "22px 22px",
  backgroundPosition: "0 0, 0 11px, 11px -11px, -11px 0",
};

function ProTag() {
  return (
    <span className="rounded-full bg-orange-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-orange-600">
      Pro
    </span>
  );
}

export default function Home() {
  const [habit, setHabit] = useState("Gym");
  const [day, setDay] = useState(180);
  const [startDate, setStartDate] = useState("");
  const [template, setTemplate] = useState<TemplateId>(defaultTemplate);
  const [transparent, setTransparent] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [showPro, setShowPro] = useState(false);

  const { isPro } = usePro();
  const cardRef = useRef<HTMLDivElement>(null);

  function openPro() {
    track("pro_view");
    setShowPro(true);
  }

  function handleStartDate(value: string) {
    setStartDate(value);
    if (value) setDay(daysSince(value));
  }

  function handleDay(value: number) {
    setDay(value);
    setStartDate(""); // a manual edit clears the auto-count helper
  }

  async function handleExport() {
    if (!cardRef.current || exporting) return;
    // Transparent export is a Pro feature — gate it.
    if (!isPro && transparent) {
      openPro();
      return;
    }
    setExporting(true);
    try {
      await exportCardPng(cardRef.current, {
        transparent: isPro && transparent,
        hd: isPro,
        habit,
        day,
      });
      track("card_download", { template, transparent: isPro && transparent, pro: isPro });
    } catch (err) {
      console.error("Export failed", err);
    } finally {
      setExporting(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-full w-full max-w-xl flex-col gap-7 px-5 py-10 sm:py-14">
      <header>
        <div className="flex items-center gap-2 text-neutral-900">
          <Flame size={22} tone="fire" idSuffix="header" />
          <span className="text-base font-bold tracking-tight">StreakCard</span>
        </div>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
          Show off your streak.
        </h1>
        <p className="mt-3 max-w-md text-base leading-relaxed text-neutral-500">
          Turn your gym, run — any habit streak — into a card worth posting. Free to
          make; go Pro for clean transparent + HD exports.
        </p>
      </header>

      {/* Live preview */}
      <div
        data-testid="preview-stage"
        style={transparent ? checkerboard : { background: "#ECEBE7" }}
        className="flex justify-center rounded-3xl border border-black/5 p-7 sm:p-9"
      >
        <div
          style={{
            borderRadius: 32,
            boxShadow: transparent ? "none" : "0 24px 60px -16px rgba(20,15,10,0.32)",
          }}
        >
          <StreakCard
            ref={cardRef}
            habit={habit}
            day={day}
            template={template}
            transparent={transparent}
            pro={isPro}
          />
        </div>
      </div>

      <Controls
        habit={habit}
        day={day}
        startDate={startDate}
        template={template}
        onHabitChange={setHabit}
        onDayChange={handleDay}
        onStartDateChange={handleStartDate}
        onTemplateChange={setTemplate}
      />

      {/* Export */}
      <div className="flex flex-col gap-4 rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-7">
        <label className="flex cursor-pointer items-center justify-between gap-4">
          <span>
            <span className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
              Transparent background
              {!isPro && <ProTag />}
            </span>
            <span className="block text-xs text-neutral-500">
              For overlaying the badge on a Reel or TikTok.
            </span>
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={transparent}
            onClick={() => setTransparent((v) => !v)}
            className={`relative h-7 w-12 shrink-0 rounded-full transition ${
              transparent ? "bg-neutral-900" : "bg-neutral-300"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${
                transparent ? "left-6" : "left-1"
              }`}
            />
          </button>
        </label>

        <button
          type="button"
          onClick={handleExport}
          disabled={exporting}
          style={{
            background: PRIMARY_GRADIENT,
            boxShadow: "0 10px 30px -8px rgba(225,45,20,0.5)",
          }}
          className="w-full rounded-xl py-4 text-base font-bold text-white transition hover:opacity-95 active:scale-[0.99] disabled:opacity-70"
        >
          {exporting ? "Rendering…" : isPro ? "Download HD PNG" : "Download PNG"}
        </button>

        {isPro ? (
          <p className="text-center text-xs font-semibold text-emerald-600">
            ★ Pro unlocked — transparent, HD, no watermark
          </p>
        ) : (
          <button
            type="button"
            onClick={openPro}
            className="text-center text-xs text-neutral-500 transition hover:text-neutral-800"
          >
            Free export includes a watermark ·{" "}
            <span className="font-semibold text-orange-600">Unlock Pro</span> for
            transparent + HD + no watermark
          </button>
        )}
      </div>

      {/* The ask: Pro */}
      {!isPro && (
        <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex items-center gap-2">
            <Flame size={18} tone="fire" idSuffix="ask" />
            <h2 className="text-lg font-semibold tracking-tight text-neutral-900">
              Go Pro — {PRO_PRICE}
            </h2>
          </div>
          <p className="mt-1 text-sm text-neutral-500">
            Clean transparent + 2× HD exports, no watermark, and a fitness template
            pack. One-time founding price.
          </p>
          <button
            type="button"
            onClick={openPro}
            style={{
              background: PRIMARY_GRADIENT,
              boxShadow: "0 10px 30px -8px rgba(225,45,20,0.5)",
            }}
            className="mt-4 w-full rounded-xl py-3.5 text-base font-bold text-white transition hover:opacity-95 active:scale-[0.99]"
          >
            Unlock Pro — {PRO_PRICE}
          </button>
        </section>
      )}

      <footer className="pb-2 pt-2 text-center text-xs text-neutral-400">
        Made with StreakCard · free 1080×1080 PNG · Pro exports at 2160px
      </footer>

      <ProDialog
        open={showPro}
        onClose={() => setShowPro(false)}
        paymentLink={PAYMENT_LINK}
        price={PRO_PRICE}
      />
    </main>
  );
}
