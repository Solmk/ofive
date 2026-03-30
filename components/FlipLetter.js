"use client";

import { useRef } from "react";

function FlipLetter({ char }) {
  var ref = useRef(null);
  var spinning = useRef(false);

  function onEnter() {
    var el = ref.current;
    if (!el || spinning.current) return;
    if (char === "@" || char === "." || char === " ") return;
    spinning.current = true;

    // Ordered sequence — counts up like an odometer
    var sequence = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
    var target = char.toUpperCase();
    var startIdx = Math.floor(Math.random() * sequence.length);
    var targetIdx = sequence.indexOf(target);
    if (targetIdx === -1) targetIdx = 0;

    var count = 0;
    var total = 16; // how many ticks before landing
    var current = startIdx;

    el.style.color = "#fff";
    el.style.textShadow = "0 0 20px rgba(255,255,255,0.9)";

    var interval = setInterval(function () {
      if (count < total) {
        // Roll forward one step at a time — like an odometer digit
        current = (current + 1) % sequence.length;
        el.textContent = sequence[current];
        el.style.transform = "translateY(-" + (count % 2) * 6 + "px)";
        el.style.opacity = String(0.5 + (count / total) * 0.5);
        count++;
      } else {
        clearInterval(interval);
        el.textContent = target;
        el.style.transform = "translateY(0)";
        el.style.opacity = "1";
        el.style.textShadow = "none";
        spinning.current = false;
      }
    }, 35);
  }

  function onLeave() {
    var el = ref.current;
    if (!el) return;
    el.textContent = char.toUpperCase();
    el.style.transform = "translateY(0)";
    el.style.opacity = "1";
    el.style.textShadow = "none";
  }

  return (
    <span
      ref={ref}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        display: "inline-block",
        color: char === "@" || char === "." ? "rgba(255,255,255,0.35)" : "#fff",
        transition: "transform 0.035s linear, opacity 0.035s linear",
        transformOrigin: "center center",
        minWidth: char === "." ? "0.25em" : char === "@" ? "0.7em" : "0.55em",
        textAlign: "center",
        cursor: "none",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {char === " " ? "\u00A0" : char.toUpperCase()}
    </span>
  );
}
// Helper — wraps any string with FlipLetter per character
export function FlipText({ text, style }) {
  return (
    <span
      style={{
        display: "inline-flex",
        flexWrap: "wrap",
        alignItems: "center",
        ...style,
      }}
    >
      {text.split("").map(function (char, i) {
        return <FlipLetter key={i} char={char} />;
      })}
    </span>
  );
}
