'use client';

/**
 * components/Preloader.js
 *
 * Cinematic full-screen preloader.
 *
 * SEQUENCE:
 *  1. Black screen covers entire viewport (z-index: 9999)
 *  2. Terminal-style counter races from 000 → 100 (1.6 seconds)
 *  3. "O FIVE" text slams in from below at ~70%
 *  4. Counter reaches 100, brief hold
 *  5. Screen wipes UP (scaleY: 1 → 0, origin: top) revealing the site
 *  6. Component unmounts from DOM
 *
 * HYDRATION SAFETY:
 *  - State starts as `null` so server and first client render both
 *    output nothing. After mount, useEffect sets `show = true`.
 *  - This eliminates the SSR/client mismatch entirely.
 *
 * SESSION STORAGE:
 *  - After first view we set sessionStorage 'preloader-seen'.
 *  - Subsequent navigations skip the preloader entirely.
 */

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Preloader() {
  const [show, setShow]       = useState(null); // null = undecided
  const wrapRef    = useRef(null);
  const counterRef = useRef(null);
  const nameRef    = useRef(null);
  const tagRef     = useRef(null);

  // Effect 1 — decide whether to show (client-only, safe)
  useEffect(() => {
    const seen = sessionStorage.getItem('ofive-preloader');
    setShow(!seen);
  }, []);

  // Effect 2 — run animation only after `show` becomes true and DOM exists
  useEffect(() => {
    if (show !== true) return;

    const wrap    = wrapRef.current;
    const counter = counterRef.current;
    const name    = nameRef.current;
    const tag     = tagRef.current;
    if (!wrap || !counter || !name) return;

    // Lock scroll while preloader is active
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        setShow(false);
        sessionStorage.setItem('ofive-preloader', '1');
      },
    });

    // ── Counter races 0 → 100 ────────────────────────────────────────────────
    const proxy = { val: 0 };
    tl.to(proxy, {
      val:      100,
      duration: 1.8,
      ease:     'power2.inOut',
      onUpdate: () => {
        if (counter) {
          // Zero-pad to 3 digits: 007, 042, 100
          counter.textContent = Math.round(proxy.val).toString().padStart(3, '0');
        }
      },
    });

    // ── "O FIVE" name slams in from below ───────────────────────────────────
    tl.fromTo(
      name,
      { yPercent: 120, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.7, ease: 'power4.out' },
      '-=0.9' // overlap with counter near 70%
    );

    // ── Tag line fades in ────────────────────────────────────────────────────
    if (tag) {
      tl.fromTo(
        tag,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        '-=0.3'
      );
    }

    // ── Hold for a beat ──────────────────────────────────────────────────────
    tl.to({}, { duration: 0.45 });

    // ── Wipe UP — scaleY from 1 → 0, transformOrigin: top ───────────────────
    // The screen "lifts" away like a curtain rising.
    tl.to(wrap, {
      scaleY:          0,
      transformOrigin: 'top center',
      duration:        0.9,
      ease:            'power4.inOut',
    });

    // ── Fade the whole wrapper (catches any residual flash) ──────────────────
    tl.to(wrap, { opacity: 0, duration: 0.1 }, '-=0.1');

    return () => { tl.kill(); };
  }, [show]);

  // Don't render on server or when hidden
  if (show === null || show === false) return null;

  return (
    <div
      ref={wrapRef}
      style={{
        position:   'fixed',
        inset:      0,
        zIndex:     9999,
        background: '#000',
        display:    'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding:    'clamp(1.5rem, 4vw, 3.5rem)',
        overflow:   'hidden',
      }}
      aria-hidden="true"
    >
      {/* Top-left: system label */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>
        O FIVE / SYS_INIT
      </div>

      {/* Center: huge counter */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem' }}>
        <span
          ref={counterRef}
          className="preloader-counter"
          aria-label="Loading"
        >
          000
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: 'rgba(255,255,255,0.3)', marginBottom: '0.75rem' }}>
          %
        </span>
      </div>

      {/* Bottom: name + tag */}
      <div style={{ overflow: 'hidden' }}>
        <div
          ref={nameRef}
          style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(2.5rem, 8vw, 6rem)',
            letterSpacing: '-0.02em',
            lineHeight:    1,
            color:         '#fff',
          }}
        >
          O FIVE
        </div>
        <div
          ref={tagRef}
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.65rem',
            letterSpacing: '0.2em',
            color:         '#06b6d4',
            textTransform: 'uppercase',
            marginTop:     '0.5rem',
            opacity:       0,
          }}
        >
          Nashville, TN — Full-Stack Engineer
        </div>
      </div>
    </div>
  );
}
