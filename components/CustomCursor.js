"use client";

/**
 * components/CustomCursor.js
 *
 * Two-part cursor:
 *  - Dot: snaps instantly to mouse position via rAF
 *  - Ring: lerps (linear interpolates) behind with lag factor 0.12
 *    giving a trailing "magnetic" feel
 *
 * On hover over interactive elements: ring expands (CSS class toggle).
 * Hidden automatically on touch devices via CSS media query.
 */

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const raf = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    // Track mouse
    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    // Expand ring on interactive elements
    const onEnter = () => ringEl.classList.add("hovering");
    const onLeave = () => ringEl.classList.remove("hovering");

    const attachHover = () => {
      const els = document.querySelectorAll("a, button, [data-cursor-hover]");
      els.forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
      return els;
    };

    let targets = attachHover();

    // rAF loop — dot snaps, ring lerps
    const tick = () => {
      // Dot: instant
      dot.style.left = `${mouse.current.x}px`;
      dot.style.top = `${mouse.current.y}px`;

      // Ring: lerp with factor 0.12 (lower = more lag)
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      ringEl.style.left = `${ring.current.x}px`;
      ringEl.style.top = `${ring.current.y}px`;

      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(tick);

    // Re-attach hover listeners when DOM changes
    const observer = new MutationObserver(() => {
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      targets = attachHover();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cur-dot" aria-hidden="true" />
      <div ref={ringRef} className="cur-ring" aria-hidden="true" />
    </>
  );
}
