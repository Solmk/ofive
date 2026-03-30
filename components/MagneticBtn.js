"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

export default function MagneticBtn({
  children,
  className,
  strength,
  ...props
}) {
  var mag = strength !== undefined ? strength : 0.35;
  var btnRef = useRef(null);

  function onMouseMove(e) {
    var btn = btnRef.current;
    if (!btn) return;
    var rect = btn.getBoundingClientRect();
    var centerX = rect.left + rect.width / 2;
    var centerY = rect.top + rect.height / 2;
    var deltaX = (e.clientX - centerX) * mag;
    var deltaY = (e.clientY - centerY) * mag;
    gsap.to(btn, { x: deltaX, y: deltaY, duration: 0.4, ease: "power2.out" });
  }

  function onMouseLeave() {
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
    });
  }

  return (
    <div
      ref={btnRef}
      data-cursor-hover
      className={cn("inline-block", className)}
      style={{ display: "inline-block" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
}
