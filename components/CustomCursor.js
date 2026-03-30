"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  var dotRef = useRef(null);
  var ringRef = useRef(null);
  var mouse = useRef({ x: -100, y: -100 });
  var ring = useRef({ x: -100, y: -100 });
  var raf = useRef(null);
  var isTouch = useRef(false);

  // Check touch device before rendering
  var mountedState = useState(false);
  var mounted = mountedState[0];
  var setMounted = mountedState[1];

  var touchState = useState(false);
  var touch = touchState[0];
  var setTouch = touchState[1];

  useEffect(
    function () {
      // Detect touch/mobile — don't show cursor on these devices
      if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
        setTouch(true);
        return;
      }
      setMounted(true);
    },
    [setMounted, setTouch],
  );

  useEffect(
    function () {
      if (!mounted) return;

      var dot = dotRef.current;
      var ringEl = ringRef.current;
      if (!dot || !ringEl) return;

      function onMove(e) {
        mouse.current.x = e.clientX;
        mouse.current.y = e.clientY;
      }

      function onEnter() {
        ringEl.classList.add("active");
      }
      function onLeave() {
        ringEl.classList.remove("active");
      }

      function attachHover() {
        var els = document.querySelectorAll("a, button, [data-cursor-hover]");
        els.forEach(function (el) {
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
        });
        return els;
      }

      var targets = attachHover();

      function tick() {
        dot.style.left = mouse.current.x + "px";
        dot.style.top = mouse.current.y + "px";

        ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
        ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
        ringEl.style.left = ring.current.x + "px";
        ringEl.style.top = ring.current.y + "px";

        raf.current = requestAnimationFrame(tick);
      }

      window.addEventListener("mousemove", onMove);
      raf.current = requestAnimationFrame(tick);

      var observer = new MutationObserver(function () {
        targets.forEach(function (el) {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
        });
        targets = attachHover();
      });
      observer.observe(document.body, { childList: true, subtree: true });

      return function () {
        window.removeEventListener("mousemove", onMove);
        cancelAnimationFrame(raf.current);
        observer.disconnect();
      };
    },
    [mounted],
  );

  // Don't render anything on touch devices
  if (touch || !mounted) return null;

  return (
    <>
      <div ref={dotRef} className="cur-dot" aria-hidden="true" />
      <div ref={ringRef} className="cur-ring" aria-hidden="true" />
    </>
  );
}
