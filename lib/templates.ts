import type { CSSProperties } from "react";

export type TemplateId = "bold" | "minimal" | "aesthetic";

export interface Template {
  id: TemplateId;
  label: string;
  /** Small background preview used in the template picker. */
  swatchStyle: CSSProperties;
}

export const templates: Template[] = [
  {
    id: "bold",
    label: "Bold",
    swatchStyle: {
      background: "linear-gradient(150deg, #FF8A00 0%, #FF1E56 55%, #B5179E 100%)",
    },
  },
  {
    id: "minimal",
    label: "Minimal",
    swatchStyle: {
      background: "#ffffff",
      border: "1px solid #E6E6E6",
    },
  },
  {
    id: "aesthetic",
    label: "Aesthetic",
    swatchStyle: {
      background: "linear-gradient(160deg, #C2E9FB 0%, #E0C3FC 50%, #FBC2EB 100%)",
    },
  },
];

export const defaultTemplate: TemplateId = "bold";

export function isTemplateId(value: string): value is TemplateId {
  return templates.some((t) => t.id === value);
}
