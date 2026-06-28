import { forwardRef } from "react";
import { CARD_BASE_PX } from "@/lib/export";
import { formatDay } from "@/lib/streak";
import type { TemplateId } from "@/lib/templates";
import { Flame } from "./Flame";
import { Grain } from "./Grain";

export interface StreakCardProps {
  habit: string;
  day: number;
  template: TemplateId;
  transparent: boolean;
}

const FONT_SANS = "var(--font-geist-sans), system-ui, sans-serif";
const FONT_MONO = "var(--font-geist-mono), ui-monospace, monospace";
const FONT_DISPLAY = "var(--font-bricolage), var(--font-geist-sans), sans-serif";

/** Keep big day numbers from overflowing the card as digits (and commas) pile up. */
function numSize(dayStr: string, base: number): number {
  const n = dayStr.length;
  if (n <= 3) return base;
  if (n <= 5) return Math.round(base * 0.74);
  return Math.round(base * 0.58);
}

const fill: React.CSSProperties = { position: "absolute", inset: 0 };
const center: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: 34,
};

function Watermark({ color }: { color: string }) {
  return (
    <span
      style={{
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        textAlign: "center",
        fontFamily: FONT_MONO,
        fontSize: 11,
        letterSpacing: "0.18em",
        color,
      }}
    >
      streakcard.app
    </span>
  );
}

interface CardProps {
  habit: string;
  dayStr: string;
}

/** Ember — the number forged from heat. Charcoal + warm bloom + grain. */
function EmberCard({ habit, dayStr }: CardProps) {
  return (
    <>
      <div
        style={{
          ...fill,
          background:
            "radial-gradient(95% 75% at 50% 40%, rgba(255,94,31,0.42) 0%, rgba(225,29,42,0.18) 34%, rgba(11,10,13,0) 66%), #0B0A0D",
        }}
      />
      <div
        style={{
          ...fill,
          background:
            "radial-gradient(70% 48% at 50% 94%, rgba(255,70,24,0.22), transparent 70%)",
        }}
      />
      <div
        style={{
          ...fill,
          background:
            "radial-gradient(125% 120% at 50% 44%, transparent 50%, rgba(0,0,0,0.58) 100%)",
        }}
      />
      <Grain opacity={0.16} blendMode="overlay" baseFrequency={0.8} idSuffix="ember" />

      <div style={center}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <Flame size={17} tone="fire" glow idSuffix="ember" />
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: 12,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(255,236,225,0.6)",
              paddingLeft: "0.32em",
            }}
          >
            Day Streak
          </span>
        </div>

        <span
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: numSize(dayStr, 142),
            lineHeight: 0.84,
            color: "#FFF4E8",
            letterSpacing: "-0.035em",
            textShadow:
              "0 0 48px rgba(255,120,45,0.55), 0 0 15px rgba(255,90,30,0.45), 0 2px 3px rgba(0,0,0,0.35)",
          }}
        >
          {dayStr}
        </span>

        <div
          style={{
            marginTop: 20,
            padding: "8px 18px",
            borderRadius: 999,
            border: "1px solid rgba(255,162,112,0.3)",
            background: "rgba(255,120,60,0.09)",
          }}
        >
          <span
            style={{
              fontFamily: FONT_SANS,
              fontSize: 18,
              fontWeight: 600,
              color: "#FFEDE2",
              letterSpacing: "0.01em",
            }}
          >
            {habit}
          </span>
        </div>
      </div>

      <Watermark color="rgba(255,232,221,0.42)" />
    </>
  );
}

/** Chain — "don't break the chain." Light, framed, ember tick-row signature. */
function ChainCard({ habit, dayStr }: CardProps) {
  const ink = "#16140F";
  const accent = "#FF5A1F";
  const muted = "#8C887F";
  return (
    <>
      <div style={{ ...fill, background: "#F4F4F2" }} />
      <Grain opacity={0.05} blendMode="multiply" baseFrequency={0.9} idSuffix="chain" />
      <div
        style={{
          position: "absolute",
          inset: 16,
          border: "1px solid rgba(20,18,15,0.14)",
          borderRadius: 20,
          pointerEvents: "none",
        }}
      />

      <span
        style={{
          position: "absolute",
          top: 32,
          left: 34,
          fontFamily: FONT_MONO,
          fontSize: 11,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: muted,
        }}
      >
        Streak
      </span>
      <Flame
        size={18}
        tone={accent}
        idSuffix="chain"
        style={{ position: "absolute", top: 29, right: 32 }}
      />

      <div style={center}>
        <span
          style={{
            fontFamily: FONT_SANS,
            fontWeight: 800,
            fontSize: numSize(dayStr, 134),
            lineHeight: 0.82,
            color: ink,
            letterSpacing: "-0.05em",
          }}
        >
          {dayStr}
        </span>

        <div style={{ display: "flex", gap: 5, marginTop: 22 }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 13,
                height: 6,
                borderRadius: 3,
                background: accent,
                opacity: 0.32 + 0.68 * (i / 11),
              }}
            />
          ))}
        </div>

        <span
          style={{
            marginTop: 22,
            fontFamily: FONT_SANS,
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#46423B",
          }}
        >
          {habit}
        </span>
      </div>

      <span
        style={{
          position: "absolute",
          bottom: 31,
          left: 34,
          fontFamily: FONT_MONO,
          fontSize: 11,
          letterSpacing: "0.14em",
          color: muted,
        }}
      >
        day streak
      </span>
      <span
        style={{
          position: "absolute",
          bottom: 31,
          right: 32,
          fontFamily: FONT_MONO,
          fontSize: 11,
          letterSpacing: "0.14em",
          color: muted,
        }}
      >
        streakcard.app
      </span>
    </>
  );
}

/** Aurora — heat as light. Deliberate sunset mesh + glow halo behind the number. */
function AuroraCard({ habit, dayStr }: CardProps) {
  return (
    <>
      <div
        style={{
          ...fill,
          background:
            "radial-gradient(60% 55% at 18% 18%, rgba(126,63,239,0.95) 0%, transparent 60%)," +
            "radial-gradient(55% 50% at 86% 22%, rgba(63,200,255,0.62) 0%, transparent 58%)," +
            "radial-gradient(78% 72% at 80% 88%, rgba(255,77,157,0.92) 0%, transparent 62%)," +
            "radial-gradient(62% 60% at 22% 90%, rgba(255,122,47,0.6) 0%, transparent 60%)," +
            "#221049",
        }}
      />
      <div
        style={{
          ...fill,
          background:
            "radial-gradient(100% 60% at 50% 0%, rgba(255,255,255,0.16), transparent 55%)",
        }}
      />
      <Grain opacity={0.13} blendMode="overlay" baseFrequency={0.78} idSuffix="aurora" />

      <div style={center}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <Flame size={17} tone="#FFFFFF" idSuffix="aurora" />
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: 12,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.8)",
              paddingLeft: "0.32em",
            }}
          >
            Day Streak
          </span>
        </div>

        <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 240,
              height: 240,
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,255,255,0.3), transparent 64%)",
            }}
          />
          <span
            style={{
              position: "relative",
              fontFamily: FONT_DISPLAY,
              fontWeight: 800,
              fontSize: numSize(dayStr, 134),
              lineHeight: 0.84,
              color: "#FFFFFF",
              letterSpacing: "-0.035em",
              textShadow: "0 6px 32px rgba(18,4,38,0.42)",
            }}
          >
            {dayStr}
          </span>
        </div>

        <span
          style={{
            marginTop: 18,
            fontFamily: FONT_SANS,
            fontSize: 19,
            fontWeight: 600,
            color: "rgba(255,255,255,0.96)",
            textShadow: "0 2px 14px rgba(18,4,38,0.38)",
          }}
        >
          {habit}
        </span>
      </div>

      <Watermark color="rgba(255,255,255,0.62)" />
    </>
  );
}

/** Transparent overlay badge — glowing flame + number, no background, for Reels. */
function TransparentBadge({ habit, dayStr, template }: CardProps & { template: TemplateId }) {
  const numberFont = template === "chain" ? FONT_SANS : FONT_DISPLAY;
  const shadow = "0 2px 10px rgba(0,0,0,0.5)";
  return (
    <div style={{ ...center, padding: 30 }}>
      <Flame
        size={42}
        tone="fire"
        idSuffix="trans"
        style={{
          marginBottom: 10,
          filter:
            "drop-shadow(0 2px 10px rgba(0,0,0,0.45)) drop-shadow(0 0 18px rgba(255,120,40,0.5))",
        }}
      />
      <span
        style={{
          fontFamily: FONT_MONO,
          fontSize: 14,
          letterSpacing: "0.34em",
          textTransform: "uppercase",
          color: "#fff",
          paddingLeft: "0.34em",
          textShadow: shadow,
        }}
      >
        Day
      </span>
      <span
        style={{
          fontFamily: numberFont,
          fontWeight: 800,
          fontSize: numSize(dayStr, 144),
          lineHeight: 0.84,
          color: "#fff",
          letterSpacing: "-0.035em",
          textShadow: "0 3px 16px rgba(0,0,0,0.55), 0 0 42px rgba(255,120,40,0.45)",
        }}
      >
        {dayStr}
      </span>
      <span
        style={{
          marginTop: 12,
          fontFamily: FONT_SANS,
          fontSize: 21,
          fontWeight: 700,
          color: "#fff",
          textShadow: shadow,
        }}
      >
        {habit}
      </span>
      <span
        style={{
          position: "absolute",
          bottom: 16,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: FONT_MONO,
          fontSize: 11,
          letterSpacing: "0.18em",
          color: "rgba(255,255,255,0.82)",
          textShadow: shadow,
        }}
      >
        streakcard.app
      </span>
    </div>
  );
}

export const StreakCard = forwardRef<HTMLDivElement, StreakCardProps>(
  function StreakCard({ habit, day, template, transparent }, ref) {
    const cleanHabit = habit.trim() || "Your Habit";
    const dayStr = formatDay(day);

    return (
      <div
        ref={ref}
        data-testid="streak-card"
        style={{
          width: CARD_BASE_PX,
          height: CARD_BASE_PX,
          position: "relative",
          overflow: "hidden",
          borderRadius: 32,
          flexShrink: 0,
          background: "transparent",
          fontFamily: FONT_SANS,
        }}
      >
        {transparent ? (
          <TransparentBadge habit={cleanHabit} dayStr={dayStr} template={template} />
        ) : template === "ember" ? (
          <EmberCard habit={cleanHabit} dayStr={dayStr} />
        ) : template === "chain" ? (
          <ChainCard habit={cleanHabit} dayStr={dayStr} />
        ) : (
          <AuroraCard habit={cleanHabit} dayStr={dayStr} />
        )}
      </div>
    );
  },
);
