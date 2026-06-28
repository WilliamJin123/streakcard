import { describe, expect, it } from "vitest";
import { daysSince } from "./streak";

describe("daysSince", () => {
  it("counts the start day itself as Day 1", () => {
    expect(daysSince("2026-06-28", new Date(2026, 5, 28))).toBe(1);
  });

  it("counts the next calendar day as Day 2", () => {
    expect(daysSince("2026-06-28", new Date(2026, 5, 29))).toBe(2);
  });

  it("computes a long streak", () => {
    // 2025-11-11 -> 2026-06-28 is 229 days apart => Day 230
    expect(daysSince("2025-11-11", new Date(2026, 5, 28))).toBe(230);
  });

  it("ignores time of day (counts calendar days)", () => {
    expect(daysSince("2026-06-28", new Date(2026, 5, 29, 0, 30))).toBe(2);
    expect(daysSince("2026-06-28", new Date(2026, 5, 28, 23, 59))).toBe(1);
  });

  it("clamps future start dates to Day 1", () => {
    expect(daysSince("2026-07-01", new Date(2026, 5, 28))).toBe(1);
  });

  it("returns 1 for an invalid date string", () => {
    expect(daysSince("", new Date(2026, 5, 28))).toBe(1);
    expect(daysSince("not-a-date", new Date(2026, 5, 28))).toBe(1);
  });

  it("handles month and year boundaries", () => {
    expect(daysSince("2025-12-31", new Date(2026, 0, 1))).toBe(2);
  });
});
