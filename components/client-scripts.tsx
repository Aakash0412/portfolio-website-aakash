"use client";

import { useEffect } from "react";

/**
 * ClientScripts — loads all portfolio interaction scripts AFTER React hydration.
 *
 * Why this component exists:
 * - script.js and Lenis mutate the DOM (add 'lenis' class to <html>,
 *   add 'is-visible' to .reveal-fade elements, set email text content).
 * - If these run before React hydration, they produce a server/client mismatch.
 * - By loading them inside useEffect, they run only after hydration completes,
 *   guaranteeing SSR === initial client render.
 */
export default function ClientScripts() {
  useEffect(() => {
    // Load Lenis first (synchronously via dynamic script injection),
    // then load script.js after Lenis is available.
    const loadScript = (src: string, onload?: () => void) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        onload?.();
        return;
      }
      const s = document.createElement("script");
      s.src = src;
      s.onload = onload || null;
      document.body.appendChild(s);
    };

    loadScript(
      "https://unpkg.com/lenis@1.1.13/dist/lenis.min.js",
      () => {
        loadScript("/script.js");
      }
    );
  }, []);

  return null;
}
