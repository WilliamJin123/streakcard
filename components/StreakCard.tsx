import { forwardRef } from "react";
import type { CSSProperties } from "react";
import { CARD_BASE_PX } from "@/lib/export";
import { formatDay } from "@/lib/streak";
import type { TemplateId } from "@/lib/templates";
import { Flame } from "./Flame";

export interface StreakCardProps {
  habit: string;
  day: number;
  template: TemplateId;
  transparent: boolean;
}

interface Look {
  background: string;
  text: string;
  label: string;
  flame: string;
  numberFont: string;
  watermark: string;
  /** Optional soft decorative overlays (skipped in transparent mode). */
  decorations?: React.ReactNode;
  textShadow?: string;
  flameFilter?: string;
}

const FONT_ANTON = "var(--font-anton), sans-serif";
const FONT_SORA = "var(--font-sora), sans-serif";
const FONT_SANS = "var(--font-geist-sans), sans-serif";

function getLook(template: TemplateId, transparent: boolean): Look {
  // Transparent mode: drop the background, force light text + shadows so the
  // badge stays legible overlaid on any Reel/TikTok.
  if (transparent) {
    const numberFont =
      template === "bold" ? FONT_ANTON : template === "aesthetic" ? FONT_SORA : FONT_SANS;
    return {
      background: "transparent",
      text: "#ffffff",
      label: "rgba(255,255,255,0.92)",
      flame: "#ffffff",
      numberFont,
      watermark: "rgba(255,255,255,0.78)",
      textShadow: "0 2px 10px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.4)",
      flameFilter: "drop-shadow(0 2px 8px rgba(0,0,0,0.5))",
    };
  }

  switch (template) {
    case "bold":
      return {
        background:
          "linear-gradient(150deg, #FF8A00 0%, #FF1E56 55%, #B5179E 100%)",
        text: "#ffffff",
        label: "rgba(255,255,255,0.85)",
        flame: "#FFD9A8",
        numberFont: FONT_ANTON,
        watermark: "rgba(255,255,255,0.6)",
        textShadow: "0 6px 28px rgba(0,0,0,0.22)",
        flameFilter: "drop-shadow(0 4px 14px rgba(0,0,0,0.25))",
        decorations: (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(120% 80% at 50% -10%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 55%)",
              pointerEvents: "none",
            }}
          />
        ),
      };
    case "minimal":
      return {
        background: "#ffffff",
        text: "#0F0F0F",
        label: "#9A9A9A",
        flame: "#FF4D2E",
        numberFont: FONT_SANS,
        watermark: "#BDBDBD",
      };
    case "aesthetic":
      return {
        background:
          "linear-gradient(160deg, #C2E9FB 0%, #E0C3FC 50%, #FBC2EB 100%)",
        text: "#3A2E5C",
        label: "rgba(58,46,92,0.7)",
        flame: "#7C4DFF",
        numberFont: FONT_SORA,
        watermark: "rgba(58,46,92,0.5)",
        decorations: (
          <>
            <div
              style={{
                position: "absolute",
                top: -60,
                right: -40,
                width: 180,
                height: 180,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.35)",
                filter: "blur(8px)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -50,
                left: -30,
                width: 150,
                height: 150,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.25)",
                filter: "blur(8px)",
                pointerEvents: "none",
              }}
            />
          </>
        ),
      };
  }
}

export const StreakCard = forwardRef<HTMLDivElement, StreakCardProps>(
  function StreakCard({ habit, day, template, transparent }, ref) {
    const look = getLook(template, transparent);
    const cleanHabit = habit.trim() || "Your Habit";
    const isBold = template === "bold";

    const containerStyle: CSSProperties = {
      width: CARD_BASE_PX,
      height: CARD_BASE_PX,
      background: look.background,
      color: look.text,
      borderRadius: 28,
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: FONT_SANS,
      flexShrink: 0,
      padding: 32,
      boxSizing: "border-box",
    };

    return (
      <div ref={ref} data-testid="streak-card" style={containerStyle}>
        {look.decorations}

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 4,
          }}
        >
          <Flame
            size={46}
            color={look.flame}
            style={{ marginBottom: 6, filter: look.flameFilter }}
          />

          <span
            style={{
              fontFamily: FONT_SANS,
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "0.34em",
              textTransform: "uppercase",
              color: look.label,
              textShadow: look.textShadow,
              paddingLeft: "0.34em",
            }}
          >
            Day
          </span>

          <span
            style={{
              fontFamily: look.numberFont,
              fontSize: 118,
              fontWeight: isBold ? 400 : 800,
              lineHeight: 0.9,
              letterSpacing: isBold ? "0.01em" : "-0.02em",
              textShadow: look.textShadow,
            }}
          >
            {formatDay(day)}
          </span>

          <span
            style={{
              fontFamily: FONT_SANS,
              fontSize: 21,
              fontWeight: isBold ? 800 : 600,
              letterSpacing: isBold ? "0.02em" : "0",
              textTransform: isBold ? "uppercase" : "none",
              marginTop: 10,
              maxWidth: 280,
              textShadow: look.textShadow,
              color: look.text,
              opacity: 0.96,
            }}
          >
            {cleanHabit}
          </span>
        </div>

        <span
          style={{
            position: "absolute",
            bottom: 18,
            fontFamily: FONT_SANS,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.04em",
            color: look.watermark,
            textShadow: look.textShadow,
          }}
        >
          streakcard.app
        </span>
      </div>
    );
  },
);
