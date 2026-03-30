"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MAX_TILT = 14;

const CATEGORIES = [
  {
    title: "Frontend",
    bg: "/feature-2.png",
    skills: [
      { name: "React / Next.js", level: 96 },
      { name: "Javascript", level: 93 },
      { name: "GSAP / Motion", level: 91 },
      { name: "Three.js / WebGL", level: 76 },
      { name: "CSS / Tailwind", level: 97 },
    ],
  },
  {
    title: "Backend",
    bg: "/feature-6.png",
    skills: [
      { name: "Node.js / Express", level: 90 },
      { name: "MySQL", level: 85 },
      { name: "REST", level: 88 },
      { name: "AWS", level: 80 },
    ],
  },
  {
    title: "Craft",
    bg: "/hero-bg2.jpg",
    skills: [
      { name: "System Architecture", level: 85 },
      { name: "Performance Opt.", level: 92 },
      { name: "Accessibility", level: 83 },
      { name: "Design Systems", level: 88 },
      { name: "Technical Leadership", level: 80 },
    ],
  },
];

const TECH_BADGES = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Go",
  "PostgreSQL",
  "Redis",
  "AWS",
  "Docker",
  "Kubernetes",
  "GSAP",
  "Three.js",
  "WebGL",
  "GraphQL",
  "Figma",
  "Prisma",
  "Supabase",
  "Vercel",
  "Stripe",
  "TensorFlow",
];

function onCardMove(e, card) {
  var rect = card.getBoundingClientRect();
  var x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
  var y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  var rotateY = x * MAX_TILT;
  var rotateX = -y * MAX_TILT;
  var intensity = Math.min(Math.sqrt(x * x + y * y) / Math.sqrt(2), 1);
  var glow = Math.round(intensity * 30)
    .toString(16)
    .padStart(2, "0");

  gsap.to(card, {
    rotateX: rotateX,
    rotateY: rotateY,
    /* B&W glow — white instead of colored */
    boxShadow:
      "0 0 " +
      (30 + intensity * 50) +
      "px rgba(255,255,255," +
      intensity * 0.12 +
      ")",
    duration: 0.2,
    ease: "power2.out",
    transformStyle: "preserve-3d",
  });

  var spotlight = card.querySelector(".card-spotlight");
  if (spotlight) {
    var px = ((e.clientX - rect.left) / rect.width) * 100;
    var py = ((e.clientY - rect.top) / rect.height) * 100;
    spotlight.style.setProperty("--x", px + "%");
    spotlight.style.setProperty("--y", py + "%");
    spotlight.style.opacity = "1";
  }
}

function onCardLeave(card) {
  gsap.to(card, {
    rotateX: 0,
    rotateY: 0,
    boxShadow: "none",
    duration: 0.6,
    ease: "elastic.out(1, 0.4)",
  });
  var spotlight = card.querySelector(".card-spotlight");
  if (spotlight) spotlight.style.opacity = "0";
}

function onCardEnter(e) {
  e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
}
function onCardLeaveStyle(e) {
  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
}
function onBadgeEnter(e) {
  e.currentTarget.style.color = "#fff";
  e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
}
function onBadgeLeave(e) {
  e.currentTarget.style.color = "rgba(255,255,255,0.3)";
  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
  e.currentTarget.style.background = "transparent";
}

export default function Skills() {
  var sectionRef = useRef(null);
  var headerRef = useRef(null);
  var gridRef = useRef(null);
  var badgesRef = useRef(null);

  useEffect(function () {
    var section = sectionRef.current;
    var header = headerRef.current;
    var grid = gridRef.current;
    var badges = badgesRef.current;
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

    if (grid) {
      var cards = grid.querySelectorAll("[data-skill-card]");

      // Set visible immediately so they show even if ScrollTrigger misfires
      gsap.set(cards, { opacity: 1, y: 0, scale: 1 });

      // Then animate from hidden on scroll
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0, scale: 0.94 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: grid,
            start: "top 95%", // ← fire earlier
            toggleActions: "play none none none", // ← never reverse, stays visible
          },
        },
      );

      // Bars
      grid.querySelectorAll("[data-bar]").forEach(function (bar) {
        var level = bar.getAttribute("data-bar");
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: level + "%",
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // Tilt
      cards.forEach(function (card) {
        card.style.perspective = "800px";
        card.addEventListener("mousemove", function (e) {
          onCardMove(e, card);
        });
        card.addEventListener("mouseleave", function () {
          onCardLeave(card);
        });
      });
    }
    if (badges) {
      gsap.fromTo(
        badges.querySelectorAll("[data-badge]"),
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: { each: 0.03, from: "random" },
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: badges,
            start: "top 85%",
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

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-pad"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Background watermark */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-2rem",
          right: "2rem",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(8rem, 25vw, 22rem)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.05)",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        SKILLS
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
            <span
              style={{
                fontFamily: '"Orbitron", monospace',
                fontSize: "0.62rem",
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.5)",
                textTransform: "uppercase",
              }}
            >
              03 — Capabilities
            </span>
            {/* ← was cyan tint, now white */}
            <span
              style={{
                height: "1px",
                width: "4rem",
                background: "rgba(255,255,255,0.2)",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <h2
              style={{
                fontFamily: '"Orbitron", monospace',
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                lineHeight: 0.95,
                color: "#fff",
                letterSpacing: "-0.01em",
              }}
            >
              WHAT I<br />
              <span
                style={{
                  fontFamily: '"Orbitron", monospace',
                  fontSize: "clamp(2.5rem, 6vw, 3rem)",
                  color: "rgba(255,255,255,0.2)",
                  WebkitTextStroke: "1px rgba(255,255,255,0.2)",
                }}
              >
                BRING
              </span>
            </h2>
            <p
              style={{
                maxWidth: "28rem",
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1.7,
                fontFamily: '"Orbitron", monospace',
              }}
            >
              Five years of shipping at the intersection of design obsession and
              engineering rigour across the full stack.
            </p>
          </div>
        </div>

        {/* 3D Skill cards — WITH BACKGROUND IMAGE */}
        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
            marginBottom: "clamp(3rem, 6vw, 5rem)",
            perspective: "1400px",
          }}
        >
          {CATEGORIES.map(function (cat) {
            // EXPECTED: each category has a "bg" field like "/image-name.jpg"
            return (
              <div
                key={cat.title}
                data-skill-card
                data-cursor-hover
                style={{
                  position: "relative",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.06)",
                  padding: "clamp(1.5rem, 3vw, 2.5rem)",
                  overflow: "hidden",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.2s ease, border-color 0.3s ease",
                  cursor: "none",
                }}
                onMouseEnter={onCardEnter}
                onMouseLeave={(e) => {
                  onCardLeaveStyle(e);
                  const card = e.currentTarget;
                  card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";

                  const bg = card.querySelector(".card-bg");
                  if (bg) {
                    bg.style.transform = "scale(1.1)";
                    bg.style.opacity = 0.55;
                  }
                }}
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();

                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;

                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;

                  const rotateX = -(y - centerY) / 8;
                  const rotateY = (x - centerX) / 8;

                  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

                  card.style.setProperty("--x", `${x}px`);
                  card.style.setProperty("--y", `${y}px`);

                  // background parallax
                  const bg = card.querySelector(".card-bg");
                  if (bg) {
                    bg.style.transform = `scale(1.15) translateX(${(x - centerX) / 40}px) translateY(${(y - centerY) / 40}px)`;
                    bg.style.opacity = 0.75;
                  }

                  // spotlight
                  const spotlight = card.querySelector(".card-spotlight");
                  if (spotlight) spotlight.style.opacity = 1;
                }}
              >
                {/* Background image */}
                <div
                  className="card-bg"
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${cat.bg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.35,
                    filter: "grayscale(100%) contrast(120%) brightness(60%)",
                    transform: "scale(1.1)",
                    transition: "transform 0.6s ease, opacity 0.4s ease",
                    zIndex: 0,
                  }}
                />

                {/* Light overlay for readability */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.55))",
                    zIndex: 1,
                  }}
                />

                {/* spotlight */}
                <div
                  className="card-spotlight"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(500px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.06) 0%, transparent 60%)",
                    opacity: 0,
                    transition: "opacity 0.2s ease",
                    pointerEvents: "none",
                    zIndex: 2,
                  }}
                />

                {/* content */}
                <div style={{ position: "relative", zIndex: 3 }}>
                  {/* header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "2rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: '"Orbitron", monospace',
                        fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                        color: "#fff",
                      }}
                    >
                      {cat.title.toUpperCase()}
                    </span>
                    <span
                      style={{
                        fontFamily: '"Orbitron", monospace',
                        fontSize: "0.6rem",
                        letterSpacing: "0.18em",
                        color: "rgba(255,255,255,0.3)",
                      }}
                    >
                      {cat.skills.length} skills
                    </span>
                  </div>

                  {/* skills */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.1rem",
                    }}
                  >
                    {cat.skills.map(function (skill) {
                      return (
                        <div key={skill.name}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "0.35rem",
                            }}
                          >
                            <span
                              style={{
                                fontFamily: '"Orbitron", monospace',
                                fontSize: "0.8rem",
                                color: "rgba(255,255,255,0.6)",
                              }}
                            >
                              {skill.name}
                            </span>
                            <span
                              style={{
                                fontFamily: '"Orbitron", monospace',
                                fontSize: "0.6rem",
                                color: "rgba(255,255,255,0.25)",
                              }}
                            >
                              {skill.level}%
                            </span>
                          </div>

                          {/* track */}
                          <div
                            style={{
                              height: "1px",
                              background: "rgba(255,255,255,0.06)",
                              position: "relative",
                              overflow: "hidden",
                            }}
                          >
                            <div
                              data-bar={skill.level}
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                height: "100%",
                                background:
                                  "linear-gradient(90deg, #ffffff, rgba(255,255,255,0.4))",
                                width: "0%",
                                transition:
                                  "width 1s cubic-bezier(0.22,1,0.36,1)",
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tech badge cloud */}
        <div>
          <p
            style={{
              fontFamily: '"Orbitron", monospace',
              fontSize: "0.6rem",
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.5)",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
            }}
          >
            Also in the arsenal
          </p>
          <div
            ref={badgesRef}
            style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}
          >
            {TECH_BADGES.map(function (tech) {
              return (
                <span
                  key={tech}
                  data-badge
                  data-cursor-hover
                  style={{
                    fontFamily: '"Orbitron", monospace',
                    fontSize: "0.62rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    padding: "0.35rem 0.9rem",
                    transition: "all 0.3s ease",
                    cursor: "none",
                  }}
                  onMouseEnter={onBadgeEnter}
                  onMouseLeave={onBadgeLeave}
                >
                  {tech}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
