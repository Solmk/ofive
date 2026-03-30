"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(function () {
    setMounted(true);
  }, []);

  useEffect(function () {
    function onScroll() {
      setScrolled(window.scrollY > 60);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return function () {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(
    function () {
      document.body.style.overflow = mobileOpen ? "hidden" : "";
      return function () {
        document.body.style.overflow = "";
      };
    },
    [mobileOpen],
  );

  useEffect(function () {
    function onResize() {
      if (window.innerWidth >= 768) setMobileOpen(false);
    }
    window.addEventListener("resize", onResize);
    return function () {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  function goTo(href) {
    setMobileOpen(false);
    setActive(href);
    var id = href.replace("#", "");
    var el = document.getElementById(id);
    if (el) {
      var top = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: top, behavior: "smooth" });
    }
  }

  function goHome() {
    setActive("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!mounted) return null;

  var navBg = scrolled ? "rgba(0,0,0,0.80)" : "rgba(0,0,0,0.28)";
  var navBorder = scrolled
    ? "1px solid rgba(255,255,255,0.08)"
    : "1px solid rgba(255,255,255,0.04)";

  return (
    <div style={{ position: "relative", zIndex: 100 }}>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: "3.75rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(1.25rem, 4vw, 3rem)",
          background: navBg,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: navBorder,
          transition: "background 0.5s ease, border-color 0.5s ease",
        }}
      >
        {/* Logo */}
        <button
          onClick={goHome}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            cursor: "pointer",
          }}
          data-cursor-hover
        >
          <span
            style={{
              fontFamily: '"Orbitron", monospace',
              fontSize: "1.35rem",
              letterSpacing: "0.06em",
              color: "#fff",
              fontWeight: 700,
            }}
          >
            O FIVE
          </span>
          <span
            style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}
          >
            <span
              style={{
                position: "relative",
                display: "inline-flex",
                width: "6px",
                height: "6px",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "#fff",
                  opacity: 0.5,
                  animation: "pulseDot 1.8s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  position: "relative",
                  display: "inline-flex",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: "#fff",
                }}
              />
            </span>
            <span
              className="md-show"
              style={{
                fontFamily: '"Orbitron", monospace',
                fontSize: "0.5rem",
                letterSpacing: "0.14em",
                color: "rgba(255,255,255,0.5)",
                textTransform: "uppercase",
                display: "none",
              }}
            >
              SYS_ONLINE
            </span>
          </span>
        </button>

        {/* Desktop links */}
        <div
          className="desktop-nav"
          style={{ display: "none", alignItems: "center", gap: "2.5rem" }}
        >
          {LINKS.map(function (link, i) {
            var isActive = active === link.href;
            return (
              <button
                key={link.href}
                onClick={function () {
                  goTo(link.href);
                }}
                data-cursor-hover
                style={{
                  position: "relative",
                  fontFamily: '"Orbitron", monospace',
                  fontSize: "0.67rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
                  background: "none",
                  border: "none",
                  padding: "0 0 0.2rem 0",
                  cursor: "pointer",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={function (e) {
                  if (!isActive) e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={function (e) {
                  if (!isActive)
                    e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                }}
              >
                <span
                  style={{
                    fontFamily: '"Orbitron", monospace',
                    color: "rgba(255,255,255,0.2)",
                    marginRight: "0.3rem",
                    fontSize: "0.5rem",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}.
                </span>
                {link.label}
                <span
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    height: "1px",
                    background: "#fff",
                    width: isActive ? "100%" : "0%",
                    transition: "width 0.38s cubic-bezier(0.16,1,0.3,1)",
                  }}
                />
              </button>
            );
          })}

          <a
            href="mailto:hello@ofive.dev"
            data-cursor-hover
            style={{
              fontFamily: '"Orbitron", monospace',
              fontSize: "0.67rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.4)",
              padding: "0.4rem 1.1rem",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={function (e) {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.color = "#000";
            }}
            onMouseLeave={function (e) {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#fff";
            }}
          >
            Hire Me
          </a>
        </div>

        {/* Hamburger — mobile only */}
        <button
          onClick={function () {
            setMobileOpen(function (p) {
              return !p;
            });
          }}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="mobile-hamburger"
          style={{
            background: "none",
            border: "none",
            padding: "0.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            alignItems: "flex-end",
            cursor: "pointer",
          }}
          data-cursor-hover
        >
          <motion.span
            style={{
              display: "block",
              width: "22px",
              height: "1px",
              background: "#fff",
              transformOrigin: "center",
            }}
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            style={{
              display: "block",
              width: "22px",
              height: "1px",
              background: "#fff",
            }}
            animate={mobileOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            style={{
              display: "block",
              height: "1px",
              background: "#fff",
              transformOrigin: "center",
            }}
            animate={
              mobileOpen
                ? { rotate: -45, y: -6, width: "22px" }
                : { rotate: 0, y: 0, width: "14px" }
            }
            transition={{ duration: 0.3 }}
          />
        </button>
      </nav>

      <style>{`
        @keyframes pulseDot {
          0%, 100% { transform: scale(1);   opacity: 0.5; }
          50%       { transform: scale(1.9); opacity: 0;   }
        }
        @media (min-width: 768px) {
          .desktop-nav      { display: flex !important; }
          .mobile-hamburger { display: none !important;  }
          .md-show          { display: inline !important; }
        }
      `}</style>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 90,
              background: "#000",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "2rem clamp(1.25rem, 6vw, 3rem)",
            }}
          >
            <nav
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
              }}
            >
              {LINKS.map(function (link, i) {
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{
                      delay: i * 0.07 + 0.15,
                      duration: 0.45,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <button
                      onClick={function () {
                        goTo(link.href);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "1rem",
                        padding: "1rem 0",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none",
                        background: "none",
                        width: "100%",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                      onMouseEnter={function (e) {
                        var l = e.currentTarget.querySelector(".mob-label");
                        if (l) l.style.color = "rgba(255,255,255,0.5)";
                      }}
                      onMouseLeave={function (e) {
                        var l = e.currentTarget.querySelector(".mob-label");
                        if (l) l.style.color = "#fff";
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6rem",
                          color: "rgba(255,255,255,0.25)",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="mob-label"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(2.5rem, 11vw, 5rem)",
                          color: "#fff",
                          lineHeight: 1,
                          transition: "color 0.3s ease",
                        }}
                      >
                        {link.label}
                      </span>
                    </button>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              style={{
                position: "absolute",
                bottom: "2rem",
                left: "clamp(1.25rem, 6vw, 3rem)",
                right: "clamp(1.25rem, 6vw, 3rem)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  color: "rgba(255,255,255,0.25)",
                  textTransform: "uppercase",
                }}
              >
                Nashville, TN
              </span>
              <span
                style={{
                  fontFamily: '"Orbitron", monospace',
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  color: "rgba(255,255,255,0.5)",
                  textTransform: "uppercase",
                }}
              >
                hello@ofive.dev
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
