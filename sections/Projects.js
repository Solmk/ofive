"use client";

import { useRef, useEffect } from "react";
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
    tags: ["Three.js", "WebXR", "GLSL"],
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

function openLink(link) {
  if (link) window.open(link, "_blank", "noopener,noreferrer");
}

export default function Projects() {
  var wrapperRef = useRef(null);
  var panelRef = useRef(null);
  var trackRef = useRef(null);
  var labelRef = useRef(null);
  var countRef = useRef(null);
  var progressRef = useRef(null);

  useEffect(function () {
    var wrapper = wrapperRef.current;
    var panel = panelRef.current;
    var track = trackRef.current;
    var label = labelRef.current;
    var count = countRef.current;
    var progress = progressRef.current;
    if (!wrapper || !panel || !track) return;

    var st = null;

    function setup() {
      if (st) {
        st.kill();
        st = null;
      }
      gsap.set(track, { x: 0 });

      var trackWidth = track.scrollWidth;
      var viewWidth = window.innerWidth;
      var scrollDist = trackWidth - viewWidth + viewWidth * 0.06;

      wrapper.style.height = scrollDist + window.innerHeight + "px";

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
              trigger: wrapper,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

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
            trigger: wrapper,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );

      st = ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "+=" + scrollDist,
        pin: panel,
        anticipatePin: 1,
        preventOverlaps: true,
        fastScrollEnd: true,
        scrub: 1.2,
        invalidateOnRefresh: true,
        onEnter: function () {
          ScrollTrigger.refresh();
        }, // ← add
        animation: gsap.to(track, { x: -scrollDist, ease: "none" }),
        onUpdate: function (self) {
          if (progress)
            progress.style.transform = "scaleX(" + self.progress + ")";
          if (count) {
            var idx = Math.min(
              Math.ceil(self.progress * PROJECTS.length),
              PROJECTS.length,
            );
            count.textContent =
              String(idx).padStart(2, "0") +
              " / " +
              String(PROJECTS.length).padStart(2, "0");
          }
        },
      });
    }

    var t = setTimeout(setup, 500);
    window.addEventListener("resize", setup);

    var cards = track.querySelectorAll("[data-card]");
    cards.forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        onCardMove(e, card);
      });
      card.addEventListener("mouseleave", function () {
        onCardLeave(card);
      });
    });

    return function () {
      clearTimeout(t);
      window.removeEventListener("resize", setup);
      if (st) st.kill();
      ScrollTrigger.getAll().forEach(function (s) {
        s.kill();
      });
    };
  }, []);

  return (
    <div ref={wrapperRef} id="projects" data-lenis-prevent>
      <div
        ref={panelRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100svh",
          overflow: "hidden",
          background: "#000",
        }}
      >
        {/* Section label */}
        <div
          ref={labelRef}
          style={{
            position: "absolute",
            top: "clamp(5rem, 8vh, 6rem)",
            left: "clamp(1.25rem, 5vw, 5rem)",
            zIndex: 10,
          }}
        >
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

        {/* Progress bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: "rgba(255,255,255,0.06)",
            zIndex: 10,
          }}
        >
          <div
            ref={progressRef}
            style={{
              height: "100%",
              background: "#fff",
              transformOrigin: "left center",
              transform: "scaleX(0)",
              transition: "transform 0.1s linear",
            }}
          />
        </div>

        {/* Card counter */}
        <div
          style={{
            position: "absolute",
            bottom: "1.5rem",
            right: "clamp(1.25rem, 5vw, 5rem)",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <span
            ref={countRef}
            style={{
              fontFamily: '"Orbitron", monospace',
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            01 / 07
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span
              style={{
                fontFamily: '"Orbitron", monospace',
                fontSize: "0.55rem",
                letterSpacing: "0.18em",
                color: "rgba(255,255,255,0.5)",
                textTransform: "uppercase",
              }}
            >
              Scroll
            </span>
            <div
              style={{
                width: "1.5rem",
                height: "1px",
                background: "rgba(255,255,255,0.25)",
              }}
            />
          </div>
        </div>

        {/* Horizontal card track */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            paddingLeft: "clamp(1.25rem, 5vw, 5rem)",
          }}
        >
          <div
            ref={trackRef}
            style={{
              display: "flex",
              gap: "clamp(1rem, 2vw, 1.75rem)",
              paddingTop: "clamp(9rem, 15vh, 11rem)",
              paddingRight: "clamp(1.25rem, 5vw, 5rem)",
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
                      // Store the play promise so we can safely pause later
                      var playPromise = vid.play();
                      if (playPromise !== undefined) {
                        playPromise.catch(function () {
                          // Play was interrupted — silently ignore
                        });
                      }
                    }
                  }}
                  onMouseLeave={function (e) {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.07)";
                    var vid = e.currentTarget.querySelector(".card-video");
                    var img = e.currentTarget.querySelector(".card-img");
                    if (img) img.style.opacity = "1";
                    if (vid) {
                      vid.style.opacity = "0";
                      // Wait for any pending play() to resolve before pausing
                      var playPromise = vid.play();
                      if (playPromise !== undefined) {
                        playPromise
                          .then(function () {
                            vid.pause();
                            vid.currentTime = 0;
                          })
                          .catch(function () {
                            // Already paused or interrupted — silently ignore
                            vid.currentTime = 0;
                          });
                      } else {
                        vid.pause();
                        vid.currentTime = 0;
                      }
                    }
                  }}
                >
                  {/* Image + video area — top 55% */}
                  <div
                    style={{
                      position: "relative",
                      height: "55%",
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    {/* Static image */}
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

                    {/* Video — fades in on hover */}
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

                    {/* Gradient overlay */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to bottom, transparent 30%, #080808 100%)",
                        zIndex: 2,
                      }}
                    />

                    {/* Year badge */}
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

                    {/* ID badge */}
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

                    {/* Preview badge — shows when video plays */}
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

                  {/* Card content — bottom 45% */}
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: "clamp(1.25rem, 2vw, 2rem)",
                    }}
                  >
                    {/* Tags */}
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
                      {/* Title */}
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
                      {/* Subtitle */}
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
                      {/* Description */}
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

                    {/* Bottom bar */}
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
                          color: project.link
                            ? "#fff"
                            : "rgba(255,255,255,0.25)",
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

                  {/* White spotlight */}
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

                  {/* Top accent line */}
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

        <style>{`
          [data-card]:hover .card-img {
            transform: scale(1.05);
            filter: grayscale(0%) !important;
            transition: opacity 0.5s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1), filter 0.6s ease !important;
          }
        `}</style>
      </div>
    </div>
  );
}
