import { toPng } from "html-to-image";

/** Base CSS size the card renders at; we upscale to hit a crisp 1080px export. */
export const CARD_BASE_PX = 360;
const TARGET_PX = 1080;

function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "streak"
  );
}

export interface ExportOptions {
  /** When true, the PNG keeps real alpha transparency (card background omitted). */
  transparent: boolean;
  /** Pro: export at 2× resolution (2160px) instead of the standard 1080px. */
  hd: boolean;
  habit: string;
  day: number;
}

/**
 * Render the given card node to a PNG and trigger a browser download.
 * Upscales to 1080×1080 (or 2160×2160 for HD). When `transparent` is true the
 * node's own background is already removed via CSS, so the canvas stays transparent.
 */
export async function exportCardPng(
  node: HTMLElement,
  { transparent, hd, habit, day }: ExportOptions,
): Promise<void> {
  // Web fonts must be loaded or the rasterized text falls back to a system font.
  if (typeof document !== "undefined" && document.fonts?.ready) {
    await document.fonts.ready;
  }

  const targetPx = hd ? TARGET_PX * 2 : TARGET_PX;
  const options = {
    pixelRatio: targetPx / CARD_BASE_PX,
    cacheBust: true,
    // Omit backgroundColor so transparency is preserved; the node's CSS supplies
    // any background in non-transparent mode.
    backgroundColor: undefined,
  } as const;

  // The very first rasterization can miss freshly-loaded fonts/gradients, so we
  // warm it once and use the second result.
  await toPng(node, options);
  const dataUrl = await toPng(node, options);

  const suffix = `${transparent ? "-transparent" : ""}${hd ? "-hd" : ""}`;
  const link = document.createElement("a");
  link.download = `streakcard-${slugify(habit)}-day-${day}${suffix}.png`;
  link.href = dataUrl;
  link.click();
}
