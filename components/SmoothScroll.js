'use client';

/**
 * components/SmoothScroll.js
 *
 * Initialises Lenis smooth-scroll and syncs it with GSAP's RAF ticker.
 *
 * WHY THE SYNC MATTERS:
 *   GSAP's ScrollTrigger reads scroll position inside its own
 *   requestAnimationFrame loop. Lenis intercepts native scroll and
 *   applies a smoothed position. Without syncing them, ScrollTrigger
 *   would fire at the native (un-smoothed) position — causing jitter.
 *
 * HOW WE SYNC:
 *   1. Lenis emits a 'scroll' event every frame → we call ScrollTrigger.update()
 *   2. We add Lenis.raf() to GSAP's ticker so both run on the same frame
 *   3. gsap.ticker.lagSmoothing(0) prevents GSAP from skipping frames
 *
 * SAFARI / iOS:
 *   We detect iOS and skip Lenis entirely — iOS Safari's native
 *   momentum scroll is smoother and Lenis conflicts with it.
 */

import { useEffect } from 'react';
import Lenis         from 'lenis';
import { gsap }      from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Detect iOS — native scroll wins on iPhone/iPad
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) return;

    // Detect Safari for reduced lerp
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    const lenis = new Lenis({
      lerp:          isSafari ? 0.1 : 0.07,
      smoothWheel:   true,
      wheelMultiplier: isSafari ? 0.8 : 1,
      touchMultiplier: 2,
      infinite:      false,
      autoRaf:       false, // We drive RAF manually via GSAP ticker
    });

    // Step 1 — keep ScrollTrigger in sync with Lenis position
    lenis.on('scroll', ScrollTrigger.update);

    // Step 2 — drive Lenis from GSAP's ticker
    // Capture the function so we can remove it on cleanup
    const tickFn = (time) => lenis.raf(time * 1000); // GSAP gives seconds, Lenis wants ms
    gsap.ticker.add(tickFn);

    // Step 3 — prevent GSAP from dropping frames on tab blur/focus
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickFn);
    };
  }, []);

  return <>{children}</>;
}
