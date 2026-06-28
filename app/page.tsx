"use client";

import { useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { Controls } from "@/components/Controls";
import { EmailCapture } from "@/components/EmailCapture";
import { Flame } from "@/components/Flame";
import { StreakCard } from "@/components/StreakCard";
import { exportCardPng } from "@/lib/export";
import { daysSince } from "@/lib/streak";
import { defaultTemplate } from "@/lib/templates";
import type { TemplateId } from "@/lib/templates";

const PRIMARY_GRADIENT =
  "linear-gradient(150deg, #FF8A00 0%, #FF1E56 55%, #B5179E 100%)";

const checkerboard = {
  backgroundColor: "#dcdcdc",
  backgroundImage:
    "linear-gradient(45deg, #b8b8b8 25%, transparent 25%), linear-gradient(-45deg, #b8b8b8 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #b8b8b8 75%), linear-gradient(-45deg, transparent 75%, #b8b8b8 75%)",
  backgroundSize: "22px 22px",
  backgroundPosition: "0 0, 0 11px, 11px -11px, -11px 0",
};

export default function Home() {
  const [habit, setHabit] = useState("Meditation");
  const [day, setDay] = useState(230);
  const [startDate, setStartDate] = useState("");
  const [template, setTemplate] = useState<TemplateId>(defaultTemplate);
  const [transparent, setTransparent] = useState(false);
  const [exporting, setExporting] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

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
    setExporting(true);
    try {
      await exportCardPng(cardRef.current, { transparent, habit, day });
      track("card_download", { template, transparent });
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
          <Flame size={22} color="#FF1E56" />
          <span className="text-base font-bold tracking-tight">StreakCard</span>
        </div>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
          Show off your streak.
        </h1>
        <p className="mt-3 max-w-md text-base leading-relaxed text-neutral-500">
          Turn any habit into a clean, shareable card. Free — and the transparent
          PNG drops right onto your Reels.
        </p>
      </header>

      {/* Live preview */}
      <div
        style={transparent ? checkerboard : undefined}
        className={`flex justify-center rounded-3xl p-6 sm:p-8 ${
          transparent ? "" : "border border-black/5 bg-white shadow-sm"
        }`}
      >
        <StreakCard
          ref={cardRef}
          habit={habit}
          day={day}
          template={template}
          transparent={transparent}
        />
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
            <span className="block text-sm font-semibold text-neutral-900">
              Transparent background
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
          style={{ background: PRIMARY_GRADIENT }}
          className="w-full rounded-xl py-4 text-base font-bold text-white shadow-md transition hover:opacity-95 active:scale-[0.99] disabled:opacity-70"
        >
          {exporting ? "Rendering…" : "Download PNG"}
        </button>
      </div>

      <EmailCapture />

      <footer className="pb-2 pt-2 text-center text-xs text-neutral-400">
        Made with StreakCard · 1080×1080 PNG
      </footer>
    </main>
  );
}
