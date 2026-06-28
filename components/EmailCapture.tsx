"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || "mqevbjda";
const ENDPOINT = `https://formspree.io/f/${FORMSPREE_ID}`;

type Status = "idle" | "submitting" | "done" | "error";

export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, source: "streakcard-pro-waitlist" }),
      });
      if (res.ok) {
        track("email_signup");
        setStatus("done");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-7">
      <h2 className="text-lg font-semibold tracking-tight text-neutral-900">
        Want custom colors, multiple streaks & HD exports?
      </h2>
      <p className="mt-1 text-sm text-neutral-500">
        Pro is coming. Drop your email and I&apos;ll let you know the moment it&apos;s live.
      </p>

      {status === "done" ? (
        <p className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          <span aria-hidden>✓</span> You&apos;re on the list. Talk soon.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-label="Email address"
            className="w-full flex-1 rounded-xl border border-black/10 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-400 focus:bg-white"
          />
          <button
            type="submit"
            disabled={status === "submitting"}
            className="rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700 disabled:opacity-60"
          >
            {status === "submitting" ? "Joining…" : "Get notified"}
          </button>
        </form>
      )}

      {status === "error" && (
        <p className="mt-2 text-sm text-red-600">
          Something went wrong — please try again in a moment.
        </p>
      )}
    </section>
  );
}
