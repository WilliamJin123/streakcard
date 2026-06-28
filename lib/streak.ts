/**
 * Pure streak-counting helpers. No DOM, no side effects — easy to unit test.
 */

/** Parse a "YYYY-MM-DD" string into a local Date at midnight. Returns null if invalid. */
function parseLocalDate(iso: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!match) return null;
  const [, y, m, d] = match;
  const year = Number(y);
  const month = Number(m);
  const day = Number(d);
  const date = new Date(year, month - 1, day);
  // Reject overflow like 2026-02-31 (which JS would roll into March).
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

/**
 * The streak day number, where the start date itself is Day 1.
 * Counts whole calendar days (ignores time of day). Future or invalid
 * start dates clamp to Day 1.
 */
export function daysSince(startISO: string, now: Date = new Date()): number {
  const start = parseLocalDate(startISO);
  if (!start) return 1;
  const startMid = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate(),
  );
  const nowMid = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffDays = Math.round(
    (nowMid.getTime() - startMid.getTime()) / 86_400_000,
  );
  return Math.max(1, diffDays + 1);
}

/** Format an integer with thousands separators, e.g. 1230 -> "1,230". */
export function formatDay(n: number): string {
  return new Intl.NumberFormat("en-US").format(Math.max(0, Math.floor(n)));
}
