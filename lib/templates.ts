import type { CSSProperties } from "react";

export type TemplateId = "ember" | "chain" | "aurora";

export interface Template {
  id: TemplateId;
  label: string;
  /** Small background preview used in the template picker. */
  swatchStyle: CSSProperties;
}

export const templates: Template[] = [
  {
    id: "ember",
    label: "Ember",
    swatchStyle: {
      background:
        "radial-gradient(circle at 50% 42%, rgba(255,94,31,0.7) 0%, transparent 62%), #0B0A0D",
    },
  },
  {
    id: "chain",
    label: "Chain",
    swatchStyle: {
      background:
        "repeating-linear-gradient(90deg, #FF5A1F 0 6px, transparent 6px 11px) center bottom / 100% 5px no-repeat, #F4F4F2",
      border: "1px solid rgba(0,0,0,0.12)",
    },
  },
  {
    id: "aurora",
    label: "Aurora",
    swatchStyle: {
      background:
        "radial-gradient(60% 60% at 20% 20%, #7E3FEF 0%, transparent 60%), radial-gradient(55% 50% at 82% 18%, #3FC8FF 0%, transparent 58%), radial-gradient(70% 65% at 80% 85%, #FF4D9D 0%, transparent 62%), #221049",
    },
  },
];

export const defaultTemplate: TemplateId = "ember";

export function isTemplateId(value: string): value is TemplateId {
  return templates.some((t) => t.id === value);
}
