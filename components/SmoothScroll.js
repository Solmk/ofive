"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  useEffect(function () {
    // Skip Lenis on ALL touch/mobile devices — native scroll is smoother
    // and Lenis causes jitter between pinned sections on iOS
    var isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;

    // Detect iOS — extra safety net
    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) return;

    // Detect Safari for reduced lerp
    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    var lenis = new Lenis({
      lerp: isSafari ? 0.1 : 0.07,
      smoothWheel: true,
      wheelMultiplier: isSafari ? 0.8 : 1,
      touchMultiplier: 2,
      infinite: false,
      autoRaf: false,
    });

    // Keep ScrollTrigger in sync with Lenis position
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP ticker
    function tickFn(time) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(tickFn);

    // Prevent GSAP from dropping frames on tab blur/focus
    gsap.ticker.lagSmoothing(0);

    return function () {
      lenis.destroy();
      gsap.ticker.remove(tickFn);
    };
  }, []);

  return <>{children}</>;
}
