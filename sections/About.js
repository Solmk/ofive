"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Layers,
  Cpu,
  Zap,
  Paintbrush2,
  ShieldCheck,
  BarChart3,
  Code2,
  Cloud,
  Network,
} from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

const MANIFESTO = `I engineer digital systems where obsessive precision meets creative instinct.
Every architecture decision is intentional. Every interaction is crafted.
From founding-stage startups to enterprise platforms — I build things
that perform at scale and feel inevitable to use.`;

const STATS = [
  { value: 5, suffix: "+", label: "Years Shipping" },
  { value: 40, suffix: "+", label: "Products Built" },
  { value: 12, suffix: "", label: "Happy Clients" },
  { value: 3, suffix: "x", label: "Startup Exits" },
];

const PILLARS = [
  {
    code: "01",
    Icon: Layers,
    title: "Architecture",
    desc: "Scalable systems design. Event-driven patterns. Microservices when warranted, monolith when not.",
  },
  {
    code: "02",
    Icon: Cpu,
    title: "Interfaces",
    desc: "Sub-100ms interactions. Hardware-accelerated animations. Accessible by default, delightful by design.",
  },
  {
    code: "03",
    Icon: Zap,
    title: "Performance",
    desc: "Lighthouse 100. Core Web Vitals green. Bundle splitting, lazy loading, and cache strategy at every layer.",
  },
  {
    code: "04",
    Icon: Paintbrush2,
    title: "Design Systems",
    desc: "Token-driven, component-first. Built once, scaled everywhere. Figma to production without friction.",
  },
  {
    code: "05",
    Icon: ShieldCheck,
    title: "Security",
    desc: "Zero-trust architecture. JWT, OAuth, rate limiting. Threat modelling baked in from day one — not bolted on.",
  },
  {
    code: "06",
    Icon: BarChart3,
    title: "Analytics",
    desc: "Real-time data pipelines. Dashboards that surface signal not noise. Decisions backed by instrumented evidence.",
  },
  {
    code: "07",
    Icon: Code2,
    title: "APIs",
    desc: "RESTful, GraphQL, WebSocket. Clean contracts, semantic versioning, and documentation that ships with the code.",
  },
  {
    code: "08",
    Icon: Cloud,
    title: "Cloud & DevOps",
    desc: "AWS certified. CI/CD pipelines, Docker, Kubernetes. Infrastructure as code. Ship fast, recover faster.",
  },
  {
    code: "09",
    Icon: Network,
    title: "Networking",
    desc: "TCP/IP, DNS, load balancing, VPCs. Deep understanding of the infrastructure that modern software runs on.",
  },
];

function onStatEnter(e) {
  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
}
function onStatLeave(e) {
  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
}
function onPillarEnter(e) {
  e.currentTarget.style.background = "#0a0a0a";
}
function onPillarLeave(e) {
  e.currentTarget.style.background = "#000";
}

export default function About() {
  const sectionRef = useRef(null);
  const manifestoRef = useRef(null);
  const statsRef = useRef(null);
  const pillarsRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(function () {
    const section = sectionRef.current;
    const manifesto = manifestoRef.current;
    const stats = statsRef.current;
    const pillars = pillarsRef.current;
    const header = headerRef.current;
    if (!section) return;

    if (header) {
      gsap.fromTo(
        header.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: header,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }

    if (manifesto) {
      const words = gsap.utils.toArray(
        manifesto.querySelectorAll("[data-word]"),
      );
      gsap.fromTo(
        words,
        { color: "rgba(255,255,255,0.1)" },
        {
          color: "#ffffff",
          duration: 0.001,
          stagger: { each: 0.04 },
          ease: "none",
          scrollTrigger: {
            trigger: manifesto,
            start: "top 70%",
            end: "bottom 40%",
            scrub: 2,
          },
        },
      );
    }

    if (stats) {
      const statCards = stats.querySelectorAll("[data-stat]");
      gsap.fromTo(
        statCards,
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stats,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      stats.querySelectorAll("[data-counter]").forEach(function (el) {
        const target = parseInt(el.getAttribute("data-counter"), 10);
        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stats,
            start: "top 80%",
            toggleActions: "play none none reset",
          },
          onUpdate: function () {
            el.textContent = Math.round(proxy.val);
          },
        });
      });
    }

    if (pillars) {
      gsap.fromTo(
        pillars.querySelectorAll("[data-pillar]"),
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: pillars,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }

    return function () {
      ScrollTrigger.getAll().forEach(function (st) {
        st.kill();
      });
    };
  }, []);

  const words = MANIFESTO.split(/(\s+)/).map(function (segment, i) {
    if (/^\s+$/.test(segment)) return segment;
    return (
      <span
        key={i}
        data-word
        style={{
          color: "rgba(255,255,255,0.1)",
          display: "inline",
          transition: "none",
        }}
      >
        {segment}
      </span>
    );
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-pad"
      style={{
        position: "relative",
        overflow: "hidden",
        scrollMarginBottom: "0px",
        marginBottom: 0,
        paddingBottom: "var(--section-pad)",
      }}
    >
      {/* Background watermark */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          fontFamily: "var(--font-display)",
          fontSize: "clamp(8rem, 25vw, 22rem)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.02)",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        ABOUT
      </div>

      <div className="container-xl" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            {/* ← was cyan, now dim white */}
            <span
              style={{
                fontFamily: '"Orbitron", monospace',
                fontSize: "0.62rem",
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.5)",
                textTransform: "uppercase",
              }}
            >
              01 — About
            </span>
            {/* ← was cyan tinted, now pure white */}
            <span
              style={{
                height: "1px",
                width: "4rem",
                background: "rgba(255,255,255,0.2)",
              }}
            />
          </div>
          <h2
            style={{
              fontFamily: '"Orbitron", monospace',
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.01em",
              color: "#fff",
            }}
          >
            NASHVILLE-BASED
            <br />
            <span
              style={{
                fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
                color: "rgba(255,255,255, 0.12)",
                WebkitTextStroke: "1px rgba(255,255,255,0.25)",
              }}
            >
              CREATIVE ENGINEER
            </span>
          </h2>
        </div>

        {/* Manifesto + Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "clamp(3rem, 6vw, 5rem)",
          }}
          className="md:grid-cols-2"
        >
          {/* Manifesto */}
          <div>
            <p
              ref={manifestoRef}
              style={{
                fontFamily: '"Orbitron", monospace',
                fontSize: "clamp(1.05rem, 2.2vw, 1.35rem)",
                lineHeight: 1.8,
                whiteSpace: "pre-wrap",
              }}
            >
              {words}
            </p>

            <div
              style={{
                marginTop: "2.5rem",
                display: "flex",
                gap: "1.5rem",
                flexWrap: "wrap",
              }}
            >
              {[
                "React",
                "Next.js",
                "Node.js",
                "TypeScript",
                "MySQL",
                "AWS",
                "Java",
              ].map(function (tech) {
                return (
                  <span
                    key={tech}
                    style={{
                      fontFamily: '"Orbitron", monospace',
                      fontSize: "0.6rem",
                      letterSpacing: "0.12em",
                      color: "rgba(255,255,255,0.5)",
                      textTransform: "uppercase",
                      border: "1px solid rgba(255,255,255,0.08)",
                      padding: "0.3rem 0.75rem",
                    }}
                  >
                    {tech}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              alignContent: "start",
            }}
          >
            {STATS.map(function ({ value, suffix, label }) {
              return (
                <div
                  key={label}
                  data-stat
                  style={{
                    padding: "1.5rem",
                    border: "1px solid rgba(255,255,255,0.06)",
                    background: "#0a0a0a",
                    position: "relative",
                    overflow: "hidden",
                    transition: "border-color 0.3s ease",
                  }}
                  onMouseEnter={onStatEnter}
                  onMouseLeave={onStatLeave}
                >
                  {/* Top accent — ← was cyan, now white */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "1px",
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                      opacity: 0.6,
                    }}
                  />
                  <div
                    style={{
                      fontFamily: '"Orbitron", monospace',
                      fontSize: "clamp(2rem, 4vw, 3.2rem)",
                      lineHeight: 1,
                      color: "#fff",
                      marginBottom: "0.4rem",
                    }}
                  >
                    <span data-counter={value}>0</span>
                    {/* ← was cyan, now white */}
                    <span style={{ color: "rgba(255,255,255,0.5)" }}>
                      {suffix}
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: '"Orbitron", monospace',
                      fontSize: "0.6rem",
                      letterSpacing: "0.15em",
                      color: "rgba(255,255,255,0.3)",
                      textTransform: "uppercase",
                    }}
                  >
                    {label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pillars */}
        <div
          ref={pillarsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1px",
            marginTop: "clamp(4rem, 8vw, 6rem)",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {PILLARS.map(function (pillar, idx) {
            return (
              <div
                key={pillar.code}
                data-pillar
                style={{
                  padding: "clamp(1.5rem, 3vw, 2.5rem)",
                  background: "#000",
                  position: "relative",
                  overflow: "hidden",
                  transition: "background 0.4s ease",
                  cursor: "none",
                }}
                onMouseEnter={function (e) {
                  e.currentTarget.style.background = "#0d0d0d";
                  var bar = e.currentTarget.querySelector(".pillar-bar");
                  var icon = e.currentTarget.querySelector(".pillar-icon");
                  var title = e.currentTarget.querySelector(".pillar-title");
                  var glow = e.currentTarget.querySelector(".pillar-glow");
                  if (bar) bar.style.width = "100%";
                  if (icon) icon.style.opacity = "1";
                  if (title) title.style.letterSpacing = "0.08em";
                  if (glow) glow.style.opacity = "1";
                }}
                onMouseLeave={function (e) {
                  e.currentTarget.style.background = "#000";
                  var bar = e.currentTarget.querySelector(".pillar-bar");
                  var icon = e.currentTarget.querySelector(".pillar-icon");
                  var title = e.currentTarget.querySelector(".pillar-title");
                  var glow = e.currentTarget.querySelector(".pillar-glow");
                  if (bar) bar.style.width = "0%";
                  if (icon) icon.style.opacity = "0.25";
                  if (title) title.style.letterSpacing = "-0.01em";
                  if (glow) glow.style.opacity = "0";
                }}
                data-cursor-hover
              >
                {/* Radial glow */}
                <div
                  className="pillar-glow"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(circle at 0% 100%, rgba(255,255,255,0.04) 0%, transparent 65%)",
                    opacity: 0,
                    transition: "opacity 0.5s ease",
                    pointerEvents: "none",
                  }}
                />

                {/* Animated bottom bar — draws on hover */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background: "rgba(255,255,255,0.04)",
                  }}
                >
                  <div
                    className="pillar-bar"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      height: "100%",
                      width: "0%",
                      background:
                        "linear-gradient(to right, rgba(255,255,255,0.6), transparent)",
                      transition: "width 0.6s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  />
                </div>

                {/* Top row — code + icon */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1.5rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: '"Orbitron", monospace',
                      fontSize: "0.48rem",
                      letterSpacing: "0.22em",
                      color: "rgba(255,255,255,0.2)",
                      textTransform: "uppercase",
                    }}
                  >
                    {pillar.code}
                  </span>

                  {/* Large ghost number watermark */}
                  <span
                    className="pillar-icon"
                    style={{
                      fontFamily: '"Orbitron", monospace',
                      fontSize: "1.8rem",
                      fontWeight: 900,
                      color: "transparent",
                      WebkitTextStroke: "1px rgba(255,255,255,0.5)",
                      opacity: 0.25,
                      transition: "opacity 0.4s ease",
                      lineHeight: 1,
                      userSelect: "none",
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Icon from pillar data */}
                {pillar.Icon && (
                  <div style={{ marginBottom: "1rem" }}>
                    <pillar.Icon
                      style={{
                        width: "1.4rem",
                        height: "1.4rem",
                        color: "rgba(255,255,255,0.3)",
                        transition: "color 0.3s ease",
                      }}
                    />
                  </div>
                )}

                {/* Title — letter spacing animates on hover */}
                <div
                  className="pillar-title"
                  style={{
                    fontFamily: '"Orbitron", monospace',
                    fontSize: "clamp(1rem, 2vw, 1.35rem)",
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: "0.85rem",
                    lineHeight: 1,
                    letterSpacing: "-0.01em",
                    transition:
                      "letter-spacing 0.4s cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  {pillar.title.toUpperCase()}
                </div>

                {/* Divider */}
                <div
                  style={{
                    width: "1.5rem",
                    height: "1px",
                    background: "rgba(255,255,255,0.15)",
                    marginBottom: "0.85rem",
                  }}
                />

                {/* Description */}
                <p
                  style={{
                    fontFamily: '"Orbitron", monospace',
                    fontSize: "0.82rem",
                    color: "rgba(255,255,255,0.35)",
                    lineHeight: 1.75,
                  }}
                >
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
