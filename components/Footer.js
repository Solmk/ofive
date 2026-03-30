"use client";
import { FlipLetter, FlipText } from "@/components/FlipLetter";

var STREAM_COLS = [
  ["0x4F", "0x46", "0x49", "0x56", "0x45", "0x00", "0xFF", "0xA1", "0x2B"],
  ["0x3C", "0x9D", "0x11", "0x7F", "0xCC", "0x44", "0x88", "0x02", "0xE3"],
  ["0x6A", "0xBB", "0x33", "0x91", "0x5E", "0xD7", "0x0A", "0x72", "0xF4"],
];

var SOCIALS = [
  { label: "GitHub", href: "https://github.com/Solmk" },
  { label: "LinkedIn", href: "www.linkedin.com/in/solomon-kumssa" },
  // { label: "Dribbble", href: "https://dribbble.com" },
  { label: "Twitter", href: "https://twitter.com" },
];

var STATUS_ITEMS = [
  { label: "STATUS", value: "AVAILABLE", dim: false },
  { label: "LOCATION", value: "NASHVILLE, TN", dim: false },
  { label: "TIMEZONE", value: "CST (UTC-6)", dim: false },
  { label: "STACK", value: "FULL-STACK", dim: false },
  { label: "VERSION", value: "v2026.1.0", dim: false },
];

function onEmailEnter(e) {
  e.currentTarget.style.color = "rgba(255,255,255,0.5)";
}
function onEmailLeave(e) {
  e.currentTarget.style.color = "#fff";
}
function onSocialEnter(e) {
  e.currentTarget.style.color = "#fff";
}
function onSocialLeave(e) {
  e.currentTarget.style.color = "rgba(255,255,255,0.35)";
}

export default function Footer() {
  return (
    <footer
      id="contact"
      style={{
        background: "#000",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        paddingTop: "clamp(4rem, 10vw, 8rem)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Data streams */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          right: "clamp(1rem, 5vw, 4rem)",
          bottom: 0,
          display: "flex",
          gap: "1.5rem",
          pointerEvents: "none",
          overflow: "hidden",
          opacity: 0.07,
        }}
      >
        {STREAM_COLS.map(function (col, ci) {
          return (
            <div
              key={ci}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
                animation:
                  "dataStream " + (3.5 + ci * 0.8) + "s linear infinite",
                animationDelay: ci * 0.6 + "s",
              }}
            >
              {[...col, ...col].map(function (hex, hi) {
                return (
                  <span
                    key={hi}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                      color: "#ffffff",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {hex}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="container-xl" style={{ position: "relative", zIndex: 1 }}>
        {/* Email CTA */}
        <div style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
          <p
            style={{
              fontFamily: '"Orbitron", monospace',
              fontSize: "0.62rem",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.35)",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            Ready to build something insane?
          </p>
          <a
            href="mailto:hello@ofive.dev"
            data-cursor-hover
            style={{
              fontFamily: '"Orbitron", monospace',
              fontSize: "clamp(3rem, 10vw, 1.5rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              color: "#fff",
              textDecoration: "none",
              display: "block",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={onEmailEnter}
            onMouseLeave={onEmailLeave}
          >
            <FlipText text="hello@ofive.dev" />
          </a>
        </div>

        {/* Status grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1.5rem",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            padding: "1.5rem 0",
            marginBottom: "2.5rem",
          }}
        >
          {STATUS_ITEMS.map(function (item) {
            return (
              <div key={item.label}>
                <div
                  style={{
                    fontFamily: '"Orbitron", monospace',
                    fontSize: "0.55rem",
                    letterSpacing: "0.18em",
                    color: "rgba(255,255,255,0.5)",
                    textTransform: "uppercase",
                    marginBottom: "0.3rem",
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontFamily: '"Orbitron", monospace',
                    fontSize: "0.75rem",
                    letterSpacing: "0.12em",
                    color: item.dim ? "rgba(255,255,255,0.4)" : "#ffffff",
                    textTransform: "uppercase",
                  }}
                >
                  {item.value}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            paddingBottom: "2rem",
          }}
        >
          <span
            style={{
              fontFamily: '"Orbitron", monospace',
              fontSize: "0.6rem",
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.2)",
              textTransform: "uppercase",
            }}
          >
            © 2026 O FIVE. All systems operational.
          </span>
          <div style={{ display: "flex", gap: "2rem" }}>
            {SOCIALS.map(function (s) {
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  style={{
                    fontFamily: '"Orbitron", monospace',
                    fontSize: "0.6rem",
                    letterSpacing: "0.12em",
                    color: "rgba(255,255,255,0.35)",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={onSocialEnter}
                  onMouseLeave={onSocialLeave}
                >
                  {s.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
