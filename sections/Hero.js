"use client";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import MagneticBtn from "@/components/MagneticBtn";
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const roleRef = useRef(null);
  const subRef = useRef(null);
  const metaRef = useRef(null);
  const bgRef = useRef(null);
  const dividerRef = useRef(null);
  const tagRef = useRef(null);

  useEffect(function () {
    var section = sectionRef.current;
    var headline = headlineRef.current;
    var sub = subRef.current;
    var meta = metaRef.current;
    var bg = bgRef.current;
    var divider = dividerRef.current;
    var tag = tagRef.current;
    if (!section || !headline) return;

    var tl = gsap.timeline({ delay: 0.15 });

    if (bg) {
      tl.fromTo(
        bg,
        { opacity: 0, scale: 1.07 },
        { opacity: 1, scale: 1, duration: 2.0, ease: "power2.out" },
        0,
      );
    }

    tl.fromTo(
      line1Ref.current,
      { yPercent: 120, opacity: 0, skewY: 4 },
      { yPercent: 0, opacity: 1, skewY: 0, duration: 1.0, ease: "power4.out" },
      0.4,
    );

    if (divider) {
      tl.fromTo(
        divider,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          transformOrigin: "left center",
        },
        0.85,
      );
    }

    tl.fromTo(
      line2Ref.current,
      { yPercent: 120, opacity: 0, skewY: -3 },
      { yPercent: 0, opacity: 1, skewY: 0, duration: 1.0, ease: "power4.out" },
      0.65,
    );

    if (sub) {
      tl.fromTo(
        sub.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=0.4",
      );
    }

    if (meta) {
      tl.fromTo(
        meta.children,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, stagger: 0.12 },
        "-=0.5",
      );
    }

    var isTouch = window.matchMedia("(hover: none)").matches;
    if (!isTouch) {
      if (bg) {
        gsap.to(bg, {
          yPercent: 14,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
      gsap.to(headline, {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.4,
        },
      });
    }

    return function () {
      tl.kill();
      ScrollTrigger.getAll().forEach(function (st) {
        st.kill();
      });
    };
  }, []);

  function handleViewWork(e) {
    e.preventDefault();
    var el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  function handleContact(e) {
    e.preventDefault();
    var el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        paddingTop: "4rem",
      }}
    >
      {/* Background image */}
      <div
        ref={bgRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
          willChange: "transform",
        }}
      >
        <video
          autoPlay
          muted
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        >
          <source src="/hero-ofive.mp4" type="video/mp4" />
          {/* <source src="/hero-bg.mp4" type="video/webm" /> */}
        </video>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.20) 40%, rgba(0,0,0,0.25) 65%, rgba(0,0,0,0.88) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.60) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.12)",
            mixBlendMode: "multiply",
          }}
        />
      </div>

      {/* Metadata corners */}
      <div
        ref={metaRef}
        style={{
          position: "absolute",
          top: "5rem",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(1520px, calc(100% - 2.5rem))",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          zIndex: 2,
          padding: "0 clamp(1.25rem, 4vw, 3rem)",
        }}
      >
        <div
          style={{
            fontFamily: '"Orbitron", monospace',
            fontSize: "0.58rem",
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.45)",
            textTransform: "uppercase",
            lineHeight: 2,
          }}
        >
          <div>Nashville, TN</div>
          {/* ← was #06b6d4, now dim white */}
          <div style={{ color: "rgba(255,255,255,0.6)" }}>Available 2026</div>
        </div>
        <div
          style={{
            fontFamily: '"Orbitron", monospace',
            fontSize: "0.58rem",
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.45)",
            textTransform: "uppercase",
            textAlign: "right",
            lineHeight: 2,
          }}
        >
          <div>software</div>
          <div>Engineer</div>
        </div>
      </div>

      {/* Main headline */}
      <div
        style={{
          maxWidth: "1520px",
          margin: "0 auto",
          width: "100%",
          padding: "0 clamp(1.25rem, 4vw, 3rem)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div ref={headlineRef}>
          {/* Line 1 */}
          <div className="clip-wrap">
            <h1
              ref={line1Ref}
              className="clip-inner smoky-line-1" // Add a class for hover styles
              style={{
                fontFamily: '"Orbitron", monospace',
                fontSize: "clamp(5.5rem, 10vw, 4rem)",
                lineHeight: 0.88,
                letterSpacing: "-0.03em",
                fontWeight: 700,
                color: "#ffffff",
                display: "block",
                textShadow: "0 8px 60px rgba(0,0,0,0.7)",
                transition: "text-shadow 0.3s ease, filter 0.3s ease", // Add transition
              }}
            >
              S O
            </h1>
          </div>

          {/* Divider row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              margin: "clamp(0.4rem, 1.2vw, 1rem) 0",
            }}
          >
            {/* Left line — ← was cyan, now white */}
            <div
              ref={dividerRef}
              style={{
                flex: 1,
                height: "1px",
                background:
                  "linear-gradient(to right, transparent, rgba(255,255,255,0.3), rgba(255,255,255,0.7))",
                transformOrigin: "left center",
              }}
            />

            {/* Role label */}
            <motion.div
              ref={tagRef}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                whiteSpace: "nowrap",
              }}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.08, delayChildren: 1.2 },
                },
              }}
            >
              {/* "Full-Stack Engineer" — each letter spins in individually */}
              {"FULL-STACK ENGINEER".split("").map(function (char, i) {
                return (
                  <motion.span
                    key={i}
                    style={{
                      display: "inline-block",
                      fontFamily: '"Orbitron", monospace',
                      fontSize: "clamp(0.55rem, 1.2vw, 0.85rem)",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      color: char === " " ? "transparent" : "#fff",
                      textTransform: "uppercase",
                      width: char === " " ? "0.6rem" : "auto",
                      textShadow: "0 0 12px rgba(255,255,255,0.4)",
                    }}
                    variants={{
                      hidden: {
                        opacity: 0,
                        rotateX: -90,
                        y: 20,
                        filter: "blur(6px)",
                      },
                      visible: {
                        opacity: 1,
                        rotateX: 0,
                        y: 0,
                        filter: "blur(0px)",
                        transition: {
                          duration: 0.5,
                          ease: [0.16, 1, 0.3, 1],
                        },
                      },
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                );
              })}

              {/* Separator dot */}
              <motion.span
                style={{
                  display: "inline-block",
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: "#fff",
                  flexShrink: 0,
                  margin: "0 0.3rem",
                }}
                animate={{
                  opacity: [1, 0.1, 1],
                  scale: [1, 1.8, 1],
                  boxShadow: [
                    "0 0 8px rgba(255,255,255,0.9)",
                    "0 0 2px rgba(255,255,255,0.1)",
                    "0 0 8px rgba(255,255,255,0.9)",
                  ],
                }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0,
                }}
              />

              {/* "Nashville, TN" — each letter spins in */}
              {"NASHVILLE, TN".split("").map(function (char, i) {
                return (
                  <motion.span
                    key={"n" + i}
                    style={{
                      display: "inline-block",
                      fontFamily: '"Orbitron", monospace',
                      fontSize: "clamp(0.55rem, 1.2vw, 0.85rem)",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      color:
                        char === " " ? "transparent" : "rgba(255,255,255,0.6)",
                      textTransform: "uppercase",
                      width: char === " " ? "0.4rem" : "auto",
                    }}
                    variants={{
                      hidden: {
                        opacity: 0,
                        rotateX: 90,
                        y: -20,
                        filter: "blur(6px)",
                      },
                      visible: {
                        opacity: 1,
                        rotateX: 0,
                        y: 0,
                        filter: "blur(0px)",
                        transition: {
                          duration: 0.5,
                          ease: [0.16, 1, 0.3, 1],
                          delay: 0.6 + i * 0.04,
                        },
                      },
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                );
              })}

              {/* Separator dot 2 */}
              <motion.span
                style={{
                  display: "inline-block",
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: "#fff",
                  flexShrink: 0,
                  margin: "0 0.3rem",
                }}
                animate={{
                  opacity: [1, 0.1, 1],
                  scale: [1, 1.8, 1],
                  boxShadow: [
                    "0 0 8px rgba(255,255,255,0.9)",
                    "0 0 2px rgba(255,255,255,0.1)",
                    "0 0 8px rgba(255,255,255,0.9)",
                  ],
                }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8,
                }}
              />

              {/* Year — counts up digit by digit */}
              {"2026".split("").map(function (digit, i) {
                return (
                  <motion.span
                    key={"y" + i}
                    style={{
                      display: "inline-block",
                      fontFamily: '"Orbitron", monospace',
                      fontSize: "clamp(0.55rem, 1.2vw, 0.85rem)",
                      fontWeight: 900,
                      color: "#fff",
                      textShadow: "0 0 10px rgba(255,255,255,0.5)",
                    }}
                    variants={{
                      hidden: { opacity: 0, rotateY: -180, scale: 0.5 },
                      visible: {
                        opacity: 1,
                        rotateY: 0,
                        scale: 1,
                        transition: {
                          duration: 0.6,
                          ease: "backOut",
                          delay: 1.0 + i * 0.1,
                        },
                      },
                    }}
                  >
                    {digit}
                  </motion.span>
                );
              })}
            </motion.div>

            {/* Right line — ← was purple, now white */}
            <div
              style={{
                flex: 1,
                height: "1px",
                background:
                  "linear-gradient(to left, transparent, rgba(255,255,255,0.3), rgba(255,255,255,0.7))",
              }}
            />
          </div>

          {/* Line 2 — ghost outline */}
          <div className="clip-wrap" style={{ textAlign: "right" }}>
            <h1
              ref={line2Ref}
              className="clip-inner"
              style={{
                fontFamily: '"Orbitron", monospace',
                fontSize: "clamp(5.5rem, 20vw, 9rem)",
                lineHeight: 0.88,
                letterSpacing: "-0.03em",
                fontWeight: 700,
                color: "transparent",
                WebkitTextStroke:
                  "clamp(1px, 0.12vw, 2px) rgba(255,255,255,0.95)",
                display: "block",
                /* ← was cyan glow, now white glow */
                filter:
                  "drop-shadow(0 0 30px rgba(255,255,255,0.12)) drop-shadow(0 8px 40px rgba(0,0,0,0.8))",
              }}
            >
              L o m - o n
            </h1>
          </div>
        </div>

        {/* Sub content */}
        <div
          ref={subRef}
          style={{
            marginTop: "clamp(2.5rem, 5vw, 4rem)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >
          <p
            style={{
              maxWidth: "26rem",
              fontSize: "clamp(0.85rem, 1.4vw, 0.98rem)",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.8,
              fontFamily: '"Orbitron", monospace',
              textShadow: "0 2px 12px rgba(0,0,0,0.7)",
            }}
          >
            Building precision-engineered digital systems where performance
            meets artistry. Every pixel intentional. Every interaction surgical.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <MagneticBtn>
              <a
                href="#projects"
                onClick={handleViewWork}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.7rem",
                  fontFamily: '"Orbitron", monospace',
                  fontSize: "0.68rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#000",
                  background: "#fff",
                  padding: "0.85rem 2rem",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  fontWeight: 500,
                }}
                onMouseEnter={function (e) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.85)";
                  e.currentTarget.style.color = "#000";
                }}
                onMouseLeave={function (e) {
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.color = "#000";
                }}
              >
                View Work
                <span style={{ fontSize: "0.85rem" }}>↓</span>
              </a>
            </MagneticBtn>

            <MagneticBtn>
              <a
                href="#contact"
                onClick={handleContact}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.7rem",
                  fontFamily: '"Orbitron", monospace',
                  fontSize: "0.68rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#fff" /* ← was cyan */,
                  border: "1px solid rgba(255,255,255,0.45)" /* ← was cyan */,
                  padding: "0.85rem 2rem",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(10px)",
                  background: "rgba(0,0,0,0.25)",
                }}
                onMouseEnter={function (e) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.8)";
                }}
                onMouseLeave={function (e) {
                  e.currentTarget.style.background = "rgba(0,0,0,0.25)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)";
                }}
              >
                Let&apos;s Talk
                <span style={{ fontSize: "0.85rem" }}>→</span>
              </a>
            </MagneticBtn>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          right: "clamp(1.25rem, 4vw, 3rem)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.6rem",
          zIndex: 2,
        }}
        aria-label="Scroll"
      >
        <span
          style={{
            fontFamily: '"Orbitron", monospace',
            fontSize: "0.52rem",
            letterSpacing: "0.22em",
            color: "rgba(255,255,255,0.3)",
            textTransform: "uppercase",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          Scroll
        </span>
        {/* ← was cyan gradient, now white gradient */}
        <div
          style={{
            width: "1px",
            height: "3.5rem",
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.15), rgba(255,255,255,0.7))",
          }}
        />
      </div>
    </section>
  );
}
