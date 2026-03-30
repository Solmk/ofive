"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: "01",
    title: "APPLE",
    sub: "3D Interactive Clone",
    desc: "Immersive Apple website clone. Features React Three Fiber 3D rendering, GSAP cinematic animations, and dynamic product visualization.",
    tags: ["React", "Three.js", "GSAP"],
    year: "2024",
    image: "/feature-1.png",
    video: "/videos/apple.mp4",
    link: "https://apple-website-omega-mocha.vercel.app/",
  },
  {
    id: "02",
    title: "MACHINETRACK",
    sub: "Industrial SaaS / In Dev",
    desc: "Real-time industrial monitoring platform. Features Socket.io data streaming, JWT security, and dynamic downtime analytics.",
    tags: ["React", "Vite", "Node.js", "MySQL", "Socket.io", "Recharts", "AWS"],
    year: "ACTIVE",
    image: "/feature-2.png",
    video: "/videos/machineTrack.mp4",
    link: "",
  },
  {
    id: "03",
    title: "SOUL KITCHEN",
    sub: "Frontend / UI-UX",
    desc: "High-performance culinary frontend. Features Framer Motion animations, Next.js server rendering, and custom Tailwind scroll interactions.",
    tags: ["Next.js 15", "React 19", "Framer Motion", "Tailwind", "PostCSS"],
    year: "COMPLETED",
    image: "/feature-3.png",
    video: "/videos/sphereKitchen.mp4",
    link: "https://soul-kitchen-amber.vercel.app/",
  },
  {
    id: "04",
    title: "SOULFLIX",
    sub: "Dynamic Media Architecture",
    desc: "A high-performance video-on-demand platform integrating the TMDb API for real-time media fetching and trailer playback.",
    tags: ["Next.js", "Tailwind CSS", "Firebase"],
    year: "2024",
    image: "/feature-41.png",
    video: "/videos/soulflix.mp4",
    link: "https://soulflix-movie-app.vercel.app/",
  },
  {
    id: "05",
    title: "ABE GARAGE",
    sub: "Full Stack",
    desc: "Full-stack garage management system with real-time job tracking, customer management, and service analytics.",
    tags: ["React", "Node.js", "MySQL"],
    year: "2023",
    image: "/feature-5.png",
    video: "/videos/abe2.mp4",
    link: "https://abegaragemainapp-psi.vercel.app/",
  },
  {
    id: "06",
    title: "DRIFT",
    sub: "Creative Agency Site",
    desc: "Awwwards SOTD. Custom WebGL distortion shaders, GSAP scroll stories. 98/100 Lighthouse.",
    tags: ["Next.js", "GSAP", "WebGL"],
    year: "2022",
    image: "/feature-6.png",
    video: "/videos/Drift.mp4",
    link: "",
  },
  {
    id: "07",
    title: "PULSE",
    sub: "Health Platform",
    desc: "Wearable data aggregator for professional athletes. TensorFlow pattern recognition. YC W23.",
    tags: ["Swift", "TensorFlow", "Node.js"],
    year: "2022",
    image: "/hero-bg2.jpg",
    video: "/videos/feature-7.mp4",
    link: "",
  },
];

function openLink(link) {
  if (link) window.open(link, "_blank", "noopener,noreferrer");
}

function onCardMove(e, card) {
  var rect = card.getBoundingClientRect();
  var x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
  var y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  gsap.to(card, {
    rotateX: -y * 8,
    rotateY: x * 8,
    duration: 0.3,
    ease: "power2.out",
    transformStyle: "preserve-3d",
  });
  var spot = card.querySelector(".card-spot");
  if (spot) {
    spot.style.setProperty(
      "--mx",
      ((e.clientX - rect.left) / rect.width) * 100 + "%",
    );
    spot.style.setProperty(
      "--my",
      ((e.clientY - rect.top) / rect.height) * 100 + "%",
    );
    spot.style.opacity = "1";
  }
}

function onCardLeave(card) {
  gsap.to(card, {
    rotateX: 0,
    rotateY: 0,
    duration: 0.8,
    ease: "elastic.out(1, 0.4)",
  });
  var spot = card.querySelector(".card-spot");
  if (spot) spot.style.opacity = "0";
}

export default function Projects() {
  var sectionRef = useRef(null);
  var trackRef = useRef(null);
  var labelRef = useRef(null);

  var indexState = useState(0);
  var current = indexState[0];
  var setCurrent = indexState[1];

  var total = PROJECTS.length;

  // ── Scroll to card by index ──────────────────────────────────────────────
  function scrollToCard(idx) {
    var track = trackRef.current;
    if (!track) return;
    var card = track.querySelectorAll("[data-card]")[idx];
    if (!card) return;
    var trackRect = track.parentElement.getBoundingClientRect();
    var cardRect = card.getBoundingClientRect();
    var offset = cardRect.left - trackRect.left - 80;
    var currentX = gsap.getProperty(track, "x") || 0;
    gsap.to(track, {
      x: currentX - offset,
      duration: 0.7,
      ease: "power3.out",
    });
  }

  function goPrev() {
    var next = Math.max(0, current - 1);
    setCurrent(next);
    scrollToCard(next);
  }

  function goNext() {
    var next = Math.min(total - 1, current + 1);
    setCurrent(next);
    scrollToCard(next);
  }

  // ── Section entrance animation ───────────────────────────────────────────
  useEffect(function () {
    var section = sectionRef.current;
    var label = labelRef.current;
    var track = trackRef.current;
    if (!section) return;

    if (label) {
      gsap.fromTo(
        label.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: label,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }

    if (track) {
      var cards = track.querySelectorAll("[data-card]");
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0, scale: 0.94 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Card tilt listeners
      cards.forEach(function (card) {
        card.addEventListener("mousemove", function (e) {
          onCardMove(e, card);
        });
        card.addEventListener("mouseleave", function () {
          onCardLeave(card);
        });
      });
    }

    return function () {
      ScrollTrigger.getAll().forEach(function (st) {
        st.kill();
      });
    };
  }, []);

  var progressPct = total > 1 ? (current / (total - 1)) * 100 : 0;

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{
        position: "relative",
        background: "#000",
        padding: "clamp(5rem, 10vw, 8rem) 0 clamp(3rem, 6vw, 5rem)",
        overflow: "hidden",
      }}
    >
      {/* ── Section label ─────────────────────────────────────────────────── */}
      <div
        ref={labelRef}
        style={{
          padding: "0 clamp(1.25rem, 5vw, 5rem)",
          marginBottom: "clamp(2rem, 4vw, 3rem)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        {/* Left — title */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "0.75rem",
            }}
          >
            <span
              style={{
                width: "1.5rem",
                height: "1px",
                background: "rgba(255,255,255,0.4)",
              }}
            />
            <span
              style={{
                fontFamily: '"Orbitron", monospace',
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase",
              }}
            >
              02 — Selected Work
            </span>
          </div>
          <h2
            style={{
              fontFamily: '"Orbitron", monospace',
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              color: "#fff",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
            }}
          >
            SYSTEM
            <br />
            <span
              style={{
                color: "transparent",
                WebkitTextStroke: "1px rgba(255,255,255,0.4)",
                fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
              }}
            >
              ARCHIVES
            </span>
          </h2>
        </div>

        {/* Right — counter + arrow buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          {/* Counter */}
          <span
            style={{
              fontFamily: '"Orbitron", monospace',
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>

          {/* Arrows */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={goPrev}
              disabled={current === 0}
              style={{
                width: "2.5rem",
                height: "2.5rem",
                border:
                  "1px solid rgba(255,255,255," +
                  (current === 0 ? "0.1" : "0.35") +
                  ")",
                background: "transparent",
                color: current === 0 ? "rgba(255,255,255,0.2)" : "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: current === 0 ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                fontFamily: '"Orbitron", monospace',
                fontSize: "0.8rem",
              }}
            >
              ←
            </button>
            <button
              onClick={goNext}
              disabled={current === total - 1}
              style={{
                width: "2.5rem",
                height: "2.5rem",
                border:
                  "1px solid rgba(255,255,255," +
                  (current === total - 1 ? "0.1" : "0.35") +
                  ")",
                background: "transparent",
                color: current === total - 1 ? "rgba(255,255,255,0.2)" : "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: current === total - 1 ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                fontFamily: '"Orbitron", monospace',
                fontSize: "0.8rem",
              }}
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* ── Progress bar ──────────────────────────────────────────────────── */}
      <div
        style={{
          height: "1px",
          background: "rgba(255,255,255,0.06)",
          margin: "0 clamp(1.25rem, 5vw, 5rem) 2rem",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: progressPct + "%",
            background: "#fff",
            transition: "width 0.5s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </div>

      {/* ── Card track — overflow hidden, GSAP moves it ───────────────────── */}
      <div
        style={{ overflow: "hidden", paddingLeft: "clamp(1.25rem, 5vw, 5rem)" }}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: "clamp(1rem, 2vw, 1.75rem)",
            willChange: "transform",
          }}
        >
          {PROJECTS.map(function (project) {
            return (
              <div
                key={project.id}
                data-card
                data-cursor-hover
                onClick={function () {
                  openLink(project.link);
                }}
                style={{
                  position: "relative",
                  width: "clamp(280px, 34vw, 540px)",
                  height: "clamp(400px, 65vh, 680px)",
                  flexShrink: 0,
                  background: "#080808",
                  border: "1px solid rgba(255,255,255,0.07)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  transformStyle: "preserve-3d",
                  transition: "border-color 0.4s ease",
                  cursor: project.link ? "pointer" : "default",
                }}
                onMouseEnter={function (e) {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  var vid = e.currentTarget.querySelector(".card-video");
                  var img = e.currentTarget.querySelector(".card-img");
                  if (img) img.style.opacity = "0";
                  if (vid) {
                    vid.style.opacity = "1";
                    var p = vid.play();
                    if (p) p.catch(function () {});
                  }
                }}
                onMouseLeave={function (e) {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  var vid = e.currentTarget.querySelector(".card-video");
                  var img = e.currentTarget.querySelector(".card-img");
                  if (img) img.style.opacity = "1";
                  if (vid) {
                    vid.style.opacity = "0";
                    var p = vid.play();
                    if (p)
                      p.then(function () {
                        vid.pause();
                        vid.currentTime = 0;
                      }).catch(function () {
                        vid.currentTime = 0;
                      });
                    else {
                      vid.pause();
                      vid.currentTime = 0;
                    }
                  }
                }}
              >
                {/* Image + video — top 55% */}
                <div
                  style={{
                    position: "relative",
                    height: "55%",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 300px, 34vw"
                    style={{
                      objectFit: "cover",
                      transition:
                        "opacity 0.5s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)",
                      filter: "grayscale(100%)",
                      opacity: 1,
                    }}
                    className="card-img"
                  />
                  <video
                    className="card-video"
                    muted
                    playsInline
                    preload="none"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: 0,
                      transition: "opacity 0.5s ease",
                      zIndex: 1,
                    }}
                  >
                    <source src={project.video} type="video/mp4" />
                  </video>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to bottom, transparent 30%, #080808 100%)",
                      zIndex: 2,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "1rem",
                      left: "1rem",
                      fontFamily: '"Orbitron", monospace',
                      fontSize: "0.55rem",
                      letterSpacing: "0.15em",
                      color: "rgba(255,255,255,0.5)",
                      background: "rgba(0,0,0,0.55)",
                      backdropFilter: "blur(8px)",
                      padding: "0.2rem 0.55rem",
                      textTransform: "uppercase",
                      zIndex: 3,
                    }}
                  >
                    {project.year}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "1rem",
                      right: "1rem",
                      fontFamily: '"Orbitron", monospace',
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.6)",
                      background: "rgba(0,0,0,0.55)",
                      backdropFilter: "blur(8px)",
                      padding: "0.2rem 0.55rem",
                      zIndex: 3,
                    }}
                  >
                    {project.id}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "0.75rem",
                      left: "50%",
                      transform: "translateX(-50%)",
                      fontFamily: '"Orbitron", monospace',
                      fontSize: "0.48rem",
                      letterSpacing: "0.15em",
                      color: "rgba(255,255,255,0.6)",
                      background: "rgba(0,0,0,0.55)",
                      backdropFilter: "blur(8px)",
                      padding: "0.2rem 0.7rem",
                      textTransform: "uppercase",
                      zIndex: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                    }}
                  >
                    <span>▶</span> Preview
                  </div>
                </div>

                {/* Content — bottom 45% */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "clamp(1.25rem, 2vw, 2rem)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "0.4rem",
                      flexWrap: "wrap",
                      marginBottom: "0.85rem",
                    }}
                  >
                    {project.tags.map(function (tag) {
                      return (
                        <span
                          key={tag}
                          style={{
                            fontFamily: '"Orbitron", monospace',
                            fontSize: "0.5rem",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.5)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            padding: "0.2rem 0.5rem",
                          }}
                        >
                          {tag}
                        </span>
                      );
                    })}
                  </div>

                  <div>
                    <div
                      style={{
                        fontFamily: '"Orbitron", monospace',
                        fontSize: "clamp(1.4rem, 3vw, 2rem)",
                        fontWeight: 700,
                        color: "#fff",
                        lineHeight: 0.95,
                        letterSpacing: "-0.02em",
                        marginBottom: "0.4rem",
                      }}
                    >
                      {project.title}
                    </div>
                    <div
                      style={{
                        fontFamily: '"Orbitron", monospace',
                        fontSize: "0.58rem",
                        letterSpacing: "0.15em",
                        color: "rgba(255,255,255,0.4)",
                        textTransform: "uppercase",
                        marginBottom: "0.6rem",
                      }}
                    >
                      {project.sub}
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.8rem",
                        color: "rgba(255,255,255,0.35)",
                        lineHeight: 1.65,
                      }}
                    >
                      {project.desc}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderTop: "1px solid rgba(255,255,255,0.07)",
                      paddingTop: "0.85rem",
                      marginTop: "1rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                      }}
                    >
                      <div
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: project.link
                            ? "rgba(255,255,255,0.6)"
                            : "rgba(255,255,255,0.2)",
                        }}
                      />
                      <span
                        style={{
                          fontFamily: '"Orbitron", monospace',
                          fontSize: "0.52rem",
                          color: "rgba(255,255,255,0.4)",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        {project.link ? "Live Project" : "Coming Soon"}
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: '"Orbitron", monospace',
                        fontSize: "0.58rem",
                        letterSpacing: "0.1em",
                        color: project.link ? "#fff" : "rgba(255,255,255,0.25)",
                        textTransform: "uppercase",
                        transition: "color 0.3s ease",
                      }}
                      onClick={function (e) {
                        e.stopPropagation();
                        openLink(project.link);
                      }}
                    >
                      {project.link ? "View ↗" : "— —"}
                    </span>
                  </div>
                </div>

                {/* Spotlight */}
                <div
                  className="card-spot"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(350px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.04) 0%, transparent 65%)",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    pointerEvents: "none",
                  }}
                />

                {/* Top accent */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background: "linear-gradient(90deg, #fff, transparent)",
                    opacity: 0.15,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Dot indicators ────────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
          marginTop: "2rem",
        }}
      >
        {PROJECTS.map(function (_, i) {
          return (
            <button
              key={i}
              onClick={function () {
                setCurrent(i);
                scrollToCard(i);
              }}
              style={{
                width: i === current ? "1.5rem" : "0.4rem",
                height: "0.4rem",
                borderRadius: "2px",
                background: i === current ? "#fff" : "rgba(255,255,255,0.2)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                padding: 0,
              }}
            />
          );
        })}
      </div>

      <style>{`
        [data-card]:hover .card-img {
          transform: scale(1.05);
          filter: grayscale(0%) !important;
          transition: opacity 0.5s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1), filter 0.6s ease !important;
        }
      `}</style>
    </section>
  );
}
