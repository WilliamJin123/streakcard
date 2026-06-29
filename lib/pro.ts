"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

const KEY = "streakcard_pro";

/**
 * Pro unlock state, entirely client-side (no backend — this is a willingness-to-pay
 * test, not DRM). Stripe's Payment Link redirects back to `/?pro=1` on success; we
 * read that once, persist a flag in localStorage, and clean the URL.
 *
 * Intentionally bypassable. At this stage the signal we care about is "did a stranger
 * pay," which Stripe records regardless of what the client does afterward.
 */

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(KEY) === "1";
}

function getServerSnapshot() {
  return false;
}

function setProFlag() {
  window.localStorage.setItem(KEY, "1");
  emit();
}

export function usePro() {
  const isPro = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Consume the Stripe success redirect (?pro=1) once on mount: persist the flag
  // and strip the param so refreshes stay clean. This emits to the store rather
  // than calling setState, so the value flows back through useSyncExternalStore.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("pro") !== "1") return;
    params.delete("pro");
    const qs = params.toString();
    window.history.replaceState(
      null,
      "",
      window.location.pathname + (qs ? `?${qs}` : ""),
    );
    setProFlag();
  }, []);

  // Used only for local testing / a manual unlock; real unlocks come via redirect.
  const unlock = useCallback(() => setProFlag(), []);

  return { isPro, unlock };
}
