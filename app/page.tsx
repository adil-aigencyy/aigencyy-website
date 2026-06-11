"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion, useAnimation } from "framer-motion";
import Lenis from "lenis";

const PLUM        = "#3c1053";
const HEADLINE_CLR = "#160830";
const SANS = "var(--font-inter), -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";
const CALENDLY    = "https://calendly.com/adil-aigencyy/20-minute-ai-consultation";

// eslint-disable-next-line @next/next/no-img-element
function Logo() {
  return (
    <img
      src="/aigencyy-logo.png"
      alt="AIGENCYY"
      style={{ display: "block", width: "210px", height: "auto", mixBlendMode: "multiply" }}
    />
  );
}

function Hamburger() {
  return (
    <button
      aria-label="Open menu"
      style={{ display: "flex", flexDirection: "column", gap: "5px",
               background: "none", border: "none", cursor: "pointer", padding: 0 }}
    >
      <span style={{ display: "block", width: 22, height: 1, background: "#1a1a1a" }} />
      <span style={{ display: "block", width: 22, height: 1, background: "#1a1a1a" }} />
      <span style={{ display: "block", width: 22, height: 1, background: "#1a1a1a" }} />
    </button>
  );
}

function ScrollIndicator() {
  return (
    <motion.div
      animate={{ opacity: [0.3, 0.65, 0.3] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
               display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
    >
      <span style={{ fontFamily: SANS, fontSize: 7, letterSpacing: "0.3em",
                     color: "#bbb", fontWeight: 400, textTransform: "uppercase" }}>
        Scroll
      </span>
      <svg width="9" height="6" viewBox="0 0 9 6" fill="none" aria-hidden="true">
        <path d="M1 1L4.5 5L8 1" stroke="#bbb" strokeWidth="1.1"
              strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.div>
  );
}

const rise = {
  hidden: { opacity: 0, y: 12 },
  show:   (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

/* ─── Intro Loader ──────────────────────────────────────────────────── */
function IntroLoader({
  onExit,
  heroLogoRef,
}: {
  onExit: () => void;
  heroLogoRef: React.RefObject<HTMLDivElement | null>;
}) {
  const controls = useAnimation();
  const glowControls = useAnimation();

  useEffect(() => {
    let cancelled = false;

    async function sequence() {
      // Glow fades in over the spin
      glowControls.start({ opacity: 1, transition: { duration: 1.8, ease: "easeOut" } });

      // Phase 1: logo fades in and spins once in place (2.5 s)
      await controls.start({
        opacity: 1,
        rotate: 360,
        transition: {
          opacity: { duration: 0.45, ease: "easeOut" },
          rotate: { duration: 2.5, ease: [0.37, 0, 0.63, 1] as [number, number, number, number] },
        },
      });

      if (cancelled) return;

      // Phase 2: continue spinning while morphing to hero logo position (1.2 s)
      const heroEl = heroLogoRef.current;
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        const heroCX = rect.left + rect.width / 2;
        const heroCY = rect.top + rect.height / 2;
        const vpCX = window.innerWidth / 2;
        const vpCY = window.innerHeight / 2;

        glowControls.start({ opacity: 0, transition: { duration: 0.55, ease: "easeIn" } });
        await controls.start({
          x: heroCX - vpCX,
          y: heroCY - vpCY,
          scale: rect.width / 260,
          rotate: 720,
          transition: {
            duration: 1.2,
            ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
          },
        });
      }

      if (cancelled) return;
      onExit();
    }

    sequence();
    return () => {
      cancelled = true;
      controls.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      key="intro-loader"
      exit={{ opacity: 0, transition: { duration: 0.35, ease: "easeOut" } }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#FAFAFA",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      {/* Plum glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={glowControls}
        style={{
          position: "absolute",
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(100,30,160,0.15) 0%, rgba(196,148,238,0.06) 52%, transparent 74%)",
          filter: "blur(64px)",
          pointerEvents: "none",
        }}
      />
      {/* Logo — spins in place, then morphs to hero */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src="/logo.png"
        alt=""
        initial={{ opacity: 0, rotate: 0 }}
        animate={controls}
        style={{ display: "block", width: 260, height: "auto", position: "relative", zIndex: 1 }}
      />
    </motion.div>
  );
}

/* ─── Intelligence Section ──────────────────────────────────────────── */
function IntelligenceSection() {
  return (
    <section
      aria-label="Intelligence. Applied."
      style={{
        position: "relative",
        height: "100vh",
        background: "transparent",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* CSS-only layered wave — no images */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden" }}>

        {/* 1. Dark base — sets overall right-side purple presence */}
        <div style={{
          position: "absolute",
          right: "-5%", top: "-50%",
          width: "72%", height: "200%",
          background: "radial-gradient(ellipse at 55% 50%, rgba(44,8,83,0.90) 0%, rgba(90,24,154,0.55) 45%, transparent 70%)",
          transform: "rotate(-12deg)",
          filter: "blur(90px)",
        }} />

        {/* 2. Main wave body — primary flowing ellipse */}
        <div style={{
          position: "absolute",
          left: "18%", top: "-60%",
          width: "82%", height: "220%",
          background: "radial-gradient(ellipse at 42% 50%, #5A189A 0%, rgba(90,24,154,0.75) 38%, transparent 65%)",
          borderRadius: "50%",
          transform: "rotate(-18deg)",
          filter: "blur(70px)",
        }} />

        {/* 3. Bright crest — vibrant purple band */}
        <div style={{
          position: "absolute",
          left: "22%", top: "-45%",
          width: "72%", height: "190%",
          background: "radial-gradient(ellipse at 38% 50%, #7B2CBF 0%, rgba(123,44,191,0.65) 38%, transparent 62%)",
          borderRadius: "50%",
          transform: "rotate(-22deg)",
          filter: "blur(52px)",
        }} />

        {/* 4. Aurora streak — inner highlight */}
        <div style={{
          position: "absolute",
          left: "28%", top: "-22%",
          width: "60%", height: "144%",
          background: "radial-gradient(ellipse at 36% 50%, rgba(157,78,221,0.92) 0%, rgba(196,148,238,0.45) 38%, transparent 60%)",
          borderRadius: "50%",
          transform: "rotate(-26deg)",
          filter: "blur(36px)",
        }} />

        {/* 5. Lavender shimmer — the brightest inner glow */}
        <div style={{
          position: "absolute",
          left: "34%", top: "-5%",
          width: "48%", height: "110%",
          background: "radial-gradient(ellipse at 34% 50%, rgba(196,148,238,0.72) 0%, rgba(233,216,253,0.35) 35%, transparent 55%)",
          borderRadius: "50%",
          transform: "rotate(-28deg)",
          filter: "blur(26px)",
        }} />

        {/* 6. Left-side fade — keeps text column clean */}
        <div style={{
          position: "absolute",
          left: 0, top: 0,
          width: "42%", height: "100%",
          background: "linear-gradient(to right, #FAFAFA 68%, transparent 100%)",
        }} />

      </div>

      {/* Content */}
      <motion.div
        className="intel-content"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "relative", zIndex: 10 }}
      >
        {/* Section label */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 40 }}>
          <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 500, color: "#9CA3AF" }}>02</span>
          <div style={{ width: 40, height: 1, background: "#7B1FA2", flexShrink: 0 }} />
          <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", color: "#9CA3AF", textTransform: "uppercase" }}>INTELLIGENCE APPLIED</span>
        </div>

        <h2
          className="intel-headline"
          style={{ fontFamily: SANS, margin: 0 }}
        >
          <span style={{ color: "#0D0B14", display: "block" }}>Intelligence.</span>
          <span style={{ color: "#7B1FA2", display: "block" }}>Applied.</span>
        </h2>

        <p
          className="intel-subtext"
          style={{ fontFamily: SANS, color: "#6B7280" }}
        >
          AI software built to<br />
          eliminate inefficiency.
        </p>
      </motion.div>

    </section>
  );
}

/* ─── What We Build Section ────────────────────────────────────────── */
function WhatWeBuildSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const s1Opacity = useTransform(scrollYProgress, [0, 0.38, 0.62, 1], [1, 1, 0, 0]);
  const s2Opacity = useTransform(scrollYProgress, [0, 0.38, 0.62, 1], [0, 0, 1, 1]);
  const waveOp    = useTransform(scrollYProgress, [0.35, 0.75], [0, 1]);
  const dot1Op    = useTransform(scrollYProgress, [0, 0.42, 0.58, 1], [1, 1, 0.18, 0.18]);
  const dot2Op    = useTransform(scrollYProgress, [0, 0.42, 0.58, 1], [0.18, 0.18, 1, 1]);
  const s1Y       = useTransform(scrollYProgress, [0.38, 0.62], [0, -12]);
  const s2Y       = useTransform(scrollYProgress, [0.38, 0.62], [12, 0]);

  /* shared styles ─ defined once, reused across both states */
  const stateStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "80px 48px",
    pointerEvents: "none",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: SANS,
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#9CA3AF",
    margin: "0 0 22px 0",
  };

  const headlineStyle: React.CSSProperties = {
    fontFamily: SANS,
    fontSize: "clamp(3rem, 10vw, 11rem)",
    fontWeight: 800,
    letterSpacing: "-0.03em",
    lineHeight: 0.95,
    margin: 0,
    color: "#0D0B14",
  };

  const paraStyle: React.CSSProperties = {
    fontFamily: SANS,
    marginTop: 28,
    fontWeight: 400,
    lineHeight: 1.65,
    maxWidth: 420,
    fontSize: "clamp(0.875rem, 1.1vw, 1rem)",
    color: "#6B7280",
  };

  return (
    <div ref={containerRef} style={{ height: "200vh" }}>
      {/* Sticky panel — stays pinned for 100 vh of scroll */}
      <div style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        overflow: "hidden",
        background: "#FAFAFA",
      }}>

        {/* ── Purple wave — fades in with state 2 ─────────────────────── */}
        <motion.div
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0, opacity: waveOp }}
        >
          <div style={{
            position: "absolute", right: "-5%", top: "-50%", width: "72%", height: "200%",
            background: "radial-gradient(ellipse at 55% 50%, rgba(44,8,83,0.80) 0%, rgba(90,24,154,0.50) 45%, transparent 70%)",
            transform: "rotate(-12deg)", filter: "blur(90px)",
          }} />
          <div style={{
            position: "absolute", left: "18%", top: "-60%", width: "82%", height: "220%",
            background: "radial-gradient(ellipse at 42% 50%, rgba(90,24,154,0.90) 0%, rgba(90,24,154,0.65) 38%, transparent 65%)",
            borderRadius: "50%", transform: "rotate(-18deg)", filter: "blur(70px)",
          }} />
          <div style={{
            position: "absolute", left: "22%", top: "-45%", width: "72%", height: "190%",
            background: "radial-gradient(ellipse at 38% 50%, rgba(123,44,191,0.85) 0%, rgba(123,44,191,0.55) 38%, transparent 62%)",
            borderRadius: "50%", transform: "rotate(-22deg)", filter: "blur(52px)",
          }} />
          <div style={{
            position: "absolute", left: "28%", top: "-22%", width: "60%", height: "144%",
            background: "radial-gradient(ellipse at 36% 50%, rgba(157,78,221,0.80) 0%, rgba(196,148,238,0.38) 38%, transparent 60%)",
            borderRadius: "50%", transform: "rotate(-26deg)", filter: "blur(36px)",
          }} />
          <div style={{
            position: "absolute", left: "34%", top: "-5%", width: "48%", height: "110%",
            background: "radial-gradient(ellipse at 34% 50%, rgba(196,148,238,0.60) 0%, rgba(233,216,253,0.28) 35%, transparent 55%)",
            borderRadius: "50%", transform: "rotate(-28deg)", filter: "blur(26px)",
          }} />
          {/* Left fade — keeps text legible */}
          <div style={{
            position: "absolute", left: 0, top: 0, width: "42%", height: "100%",
            background: "linear-gradient(to right, #FAFAFA 68%, transparent 100%)",
          }} />
        </motion.div>

        {/* ── Section nav ─────────────────────────────────────────────── */}
        <nav className="wwb-nav" style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "28px 48px",
        }}>
          <span style={{
            fontFamily: SANS, fontSize: 12, fontWeight: 500,
            letterSpacing: "0.2em", color: "#111111",
          }}>
            AIGENCYY
          </span>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5 }}>
            <span style={{ fontFamily: SANS, fontSize: 12, fontWeight: 500, color: "#0F172A", letterSpacing: "0.01em", borderBottom: "1.5px solid #7B1FA2", paddingBottom: 2 }}>
              Book a Consultation
            </span>
            <span style={{ color: "#7B1FA2", fontSize: 13, lineHeight: "1", fontFamily: SANS }}>→</span>
          </a>
        </nav>

        {/* ── State 1: AI Consulting ───────────────────────────────────── */}
        <motion.div className="wwb-state" style={{ ...stateStyle, opacity: s1Opacity, y: s1Y }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
            <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 500, color: "#9CA3AF" }}>03</span>
            <div style={{ width: 40, height: 1, background: "#7B1FA2", flexShrink: 0 }} />
            <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", color: "#9CA3AF", textTransform: "uppercase" }}>WHAT WE BUILD&nbsp;&nbsp;·&nbsp;&nbsp;01</span>
          </div>
          <h2 className="wwb-headline" style={headlineStyle}>AI Consulting</h2>
          <p style={paraStyle}>
            We help businesses identify inefficiencies, automate processes and implement practical AI solutions that create measurable impact.
          </p>
        </motion.div>

        {/* ── State 2: Custom AI Software ─────────────────────────────── */}
        <motion.div className="wwb-state" style={{ ...stateStyle, opacity: s2Opacity, y: s2Y }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
            <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 500, color: "#9CA3AF" }}>03</span>
            <div style={{ width: 40, height: 1, background: "#7B1FA2", flexShrink: 0 }} />
            <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", color: "#9CA3AF", textTransform: "uppercase" }}>WHAT WE BUILD&nbsp;&nbsp;·&nbsp;&nbsp;02</span>
          </div>
          <h2 className="wwb-headline" style={headlineStyle}>Custom AI<br />Software</h2>
          <p style={paraStyle}>
            Bespoke AI systems designed around your business, workflows and goals — built to integrate seamlessly into the way your organisation operates.
          </p>
        </motion.div>

        {/* ── Progress indicator (numbered) ───────────────────────────── */}
        <div className="wwb-dots" style={{
          position: "absolute",
          right: 48, top: "50%",
          transform: "translateY(-50%)",
          zIndex: 20,
          display: "flex", flexDirection: "column",
          gap: 20, alignItems: "flex-end",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <motion.span style={{ fontFamily: SANS, fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", color: "#7B1FA2", opacity: dot1Op }}>01</motion.span>
            <motion.div style={{ width: 7, height: 7, borderRadius: "50%", background: "#7B1FA2", opacity: dot1Op }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <motion.span style={{ fontFamily: SANS, fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", color: "#7B1FA2", opacity: dot2Op }}>02</motion.span>
            <motion.div style={{ width: 7, height: 7, borderRadius: "50%", background: "#7B1FA2", opacity: dot2Op }} />
          </div>
        </div>

        {/* ── Scroll indicator ────────────────────────────────────────── */}
        <div style={{
          position: "absolute", bottom: 32, left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 8, zIndex: 20,
        }}>
          <span style={{
            fontFamily: SANS, fontSize: 8, letterSpacing: "0.28em",
            color: "#9CA3AF", fontWeight: 500, textTransform: "uppercase",
          }}>
            SCROLL TO EXPLORE
          </span>
          <svg width="12" height="16" viewBox="0 0 12 16" fill="none" aria-hidden="true">
            <path d="M6 1v14M6 15L1 10M6 15l5-5" stroke="#7B1FA2" strokeWidth="1.4"
                  strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

      </div>
    </div>
  );
}

/* ─── ESRA Section ──────────────────────────────────────────────────── */
function ESRASection() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <section
      aria-label="04 — Flagship Product: ESRA"
      style={{
        minHeight: "100vh",
        background: "#FAFAFA",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* ── Nav ───────────────────────────────────────────────────────── */}
      <nav style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "28px 48px",
      }}>
        <span style={{
          fontFamily: SANS, fontSize: 12, fontWeight: 500,
          letterSpacing: "0.2em", color: "#111111",
        }}>
          AIGENCYY
        </span>
        {/* CTA: underlined text + purple arrow below */}
        <a
          href={CALENDLY}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5 }}
        >
          <span style={{
            fontFamily: SANS, fontSize: 12, fontWeight: 500,
            color: "#0F172A", letterSpacing: "0.01em",
            borderBottom: "1.5px solid #7B1FA2", paddingBottom: 2,
          }}>
            Book a Consultation
          </span>
          <span style={{ color: "#7B1FA2", fontSize: 13, lineHeight: 1, fontFamily: SANS }}>→</span>
        </a>
      </nav>

      {/* ── Two-column content ────────────────────────────────────────── */}
      <motion.div
        className="esra-columns"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "120px 100px 100px 120px",
          gap: 48,
          position: "relative",
          zIndex: 10,
        }}
      >

        {/* ── Left: label + headline + paragraph ──────────────────────── */}
        <div style={{ flex: "0 1 auto", maxWidth: 560 }}>

          {/* Section label */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 40,
          }}>
            <span style={{
              fontFamily: SANS, fontSize: 11, fontWeight: 500,
              color: "#9CA3AF",
            }}>
              04
            </span>
            <div style={{ width: 40, height: 1, background: "#7B1FA2", flexShrink: 0 }} />
            <span style={{
              fontFamily: SANS, fontSize: 11, fontWeight: 500,
              letterSpacing: "0.18em", color: "#9CA3AF",
              textTransform: "uppercase",
            }}>
              FLAGSHIP PRODUCT
            </span>
          </div>

          {/* Headline — all three lines: same family, weight, size */}
          <h2 style={{
            fontFamily: SANS,
            fontSize: "clamp(2.8rem, 5.2vw, 5.2rem)",
            fontWeight: 800,
            letterSpacing: "-0.025em",
            lineHeight: 1.07,
            margin: "0 0 30px 0",
          }}>
            <span style={{ color: "#0F172A", display: "block" }}>Train Teams.</span>
            <span style={{ color: "#0F172A", display: "block" }}>3x Faster.</span>
            <span style={{ color: "#7B1FA2", display: "block" }}>ESRA.</span>
          </h2>

          {/* Paragraph */}
          <p style={{
            fontFamily: SANS,
            fontSize: "clamp(0.875rem, 1.1vw, 1rem)",
            fontWeight: 400,
            lineHeight: 1.68,
            color: "#6B7280",
            maxWidth: 360,
            margin: 0,
          }}>
            AI powered employee training that helps businesses onboard staff 3x faster, improve knowledge retention and give managers their time back.
          </p>
        </div>

        {/* ── Right: ESRA logo asset — float + glow ────────────────────── */}
        <motion.div
          style={{ flex: "0 0 auto", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}
          animate={!prefersReducedMotion ? { y: [0, -4, 0] } : {}}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Breathing glow — synced with float */}
          <motion.div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "-28%",
              borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(147,51,234,0.22) 0%, rgba(216,180,254,0.08) 52%, transparent 76%)",
              filter: "blur(36px)",
              pointerEvents: "none",
            }}
            animate={!prefersReducedMotion ? { opacity: [0.5, 1, 0.5], scale: [0.93, 1.07, 0.93] } : {}}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/esra-logo.png"
            alt="ESRA — AI-powered employee training"
            style={{
              display: "block",
              width: "clamp(280px, 32vw, 440px)",
              height: "auto",
              filter: "drop-shadow(0 20px 48px rgba(74,15,94,0.28))",
              position: "relative",
              zIndex: 1,
            }}
          />
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ────────────────────────────────────────── */}
      <div style={{
        position: "absolute",
        bottom: 32, left: "50%",
        transform: "translateX(-50%)",
        display: "flex", flexDirection: "column",
        alignItems: "center", gap: 8,
        zIndex: 20,
      }}>
        <span style={{
          fontFamily: SANS, fontSize: 8,
          letterSpacing: "0.28em", color: "#9CA3AF",
          fontWeight: 500, textTransform: "uppercase",
        }}>
          SCROLL TO EXPLORE
        </span>
        <svg width="12" height="16" viewBox="0 0 12 16" fill="none" aria-hidden="true">
          <path d="M6 1v14M6 15L1 10M6 15l5-5"
                stroke="#7B1FA2" strokeWidth="1.4"
                strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

    </section>
  );
}

/* ─── Why AIGENCYY Section ──────────────────────────────────────────── */
function WhyAigencySection() {
  return (
    <section
      aria-label="05 — Why AIGENCYY"
      style={{
        minHeight: "100vh",
        background: "#FAFAFA",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* ── Nav ───────────────────────────────────────────────────────── */}
      <nav style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "28px 48px",
      }}>
        <span style={{
          fontFamily: SANS, fontSize: 12, fontWeight: 500,
          letterSpacing: "0.2em", color: "#111111",
        }}>
          AIGENCYY
        </span>
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5 }}>
          <span style={{
            fontFamily: SANS, fontSize: 12, fontWeight: 500,
            color: "#0F172A", letterSpacing: "0.01em",
            borderBottom: "1.5px solid #7B1FA2", paddingBottom: 2,
          }}>
            Book a Consultation
          </span>
          <span style={{ color: "#7B1FA2", fontSize: 13, lineHeight: 1, fontFamily: SANS }}>→</span>
        </a>
      </nav>

      {/* ── Two-column content ────────────────────────────────────────── */}
      <motion.div
        className="why-columns"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "120px 100px 100px 120px",
          gap: 60,
          position: "relative",
          zIndex: 10,
        }}
      >

        {/* ── Left: label + headline + copy ───────────────────────────── */}
        <div style={{ flex: "0 1 auto", maxWidth: 560 }}>

          {/* Section label */}
          <div style={{
            display: "flex", alignItems: "center",
            gap: 14, marginBottom: 40,
          }}>
            <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 500, color: "#9CA3AF" }}>
              05
            </span>
            <div style={{ width: 40, height: 1, background: "#7B1FA2", flexShrink: 0 }} />
            <span style={{
              fontFamily: SANS, fontSize: 11, fontWeight: 500,
              letterSpacing: "0.18em", color: "#9CA3AF", textTransform: "uppercase",
            }}>
              WHY AIGENCYY
            </span>
          </div>

          {/* Headline — same family, weight, size on all three lines */}
          <h2 style={{
            fontFamily: SANS,
            fontSize: "clamp(2.8rem, 5.2vw, 5.2rem)",
            fontWeight: 800,
            letterSpacing: "-0.025em",
            lineHeight: 1.07,
            margin: "0 0 30px 0",
          }}>
            <span style={{ color: "#0F172A", display: "block" }}>Built To</span>
            <span style={{ color: "#7B1FA2", display: "block" }}>Eliminate</span>
            <span style={{ color: "#0F172A", display: "block" }}>
              Inefficiency<span style={{ color: "#7B1FA2" }}>.</span>
            </span>
          </h2>

          {/* Supporting copy — paragraph 1 */}
          <p style={{
            fontFamily: SANS,
            fontSize: "clamp(0.875rem, 1.05vw, 1rem)",
            fontWeight: 400,
            lineHeight: 1.68,
            color: "#6B7280",
            maxWidth: 360,
            margin: "0 0 18px 0",
          }}>
            We don&apos;t believe AI should be complicated. AIGENCYY was founded on a simple idea: Businesses waste thousands of hours every year on inefficient systems, repetitive tasks and outdated processes.
          </p>

          {/* Supporting copy — paragraph 2 */}
          <p style={{
            fontFamily: SANS,
            fontSize: "clamp(0.875rem, 1.05vw, 1rem)",
            fontWeight: 400,
            lineHeight: 1.68,
            color: "#6B7280",
            maxWidth: 360,
            margin: 0,
          }}>
            We build practical AI that solves real problems and delivers measurable results.
          </p>
        </div>

        {/* ── Right: photo card ───────────────────────────────────────── */}
        <div className="why-image" style={{
          flex: "0 0 auto",
          width: "clamp(340px, 38vw, 520px)",
          aspectRatio: "1 / 1",
          borderRadius: "16px",
          overflow: "hidden",
          flexShrink: 0,
          boxShadow: "0 16px 48px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.06)",
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/why-bg.png"
            alt="AIGENCYY — built to eliminate inefficiency"
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "right center",
            }}
          />
        </div>
      </motion.div>

      {/* ── Scroll indicator ────────────────────────────────────────── */}
      <div style={{
        position: "absolute",
        bottom: 32, left: "50%",
        transform: "translateX(-50%)",
        display: "flex", flexDirection: "column",
        alignItems: "center", gap: 8,
        zIndex: 20,
      }}>
        <span style={{
          fontFamily: SANS, fontSize: 8,
          letterSpacing: "0.28em", color: "#9CA3AF",
          fontWeight: 500, textTransform: "uppercase",
        }}>
          SCROLL TO EXPLORE
        </span>
        <svg width="12" height="16" viewBox="0 0 12 16" fill="none" aria-hidden="true">
          <path d="M6 1v14M6 15L1 10M6 15l5-5"
                stroke="#7B1FA2" strokeWidth="1.4"
                strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}

function LetsTalkSection() {
  return (
    <section
      style={{
        minHeight: "100vh",
        background: "#FAFAFA",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Nav */}
      <nav
        style={{
          position: "absolute", top: 0, left: 0, right: 0, zIndex: 50,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "28px 48px",
        }}
      >
        <span style={{ fontFamily: SANS, fontSize: 12, fontWeight: 500, letterSpacing: "0.2em", color: "#111111" }}>
          AIGENCYY
        </span>
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5 }}>
          <span style={{ fontFamily: SANS, fontSize: 12, fontWeight: 500, color: "#0F172A", letterSpacing: "0.01em", borderBottom: "1.5px solid #7B1FA2", paddingBottom: 2 }}>
            Book a Consultation
          </span>
          <span style={{ color: "#7B1FA2", fontSize: 13, lineHeight: "1", fontFamily: SANS }}>→</span>
        </a>
      </nav>

      {/* Flowing line texture — right side */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        <svg
          viewBox="0 0 1440 900"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          aria-hidden="true"
        >
          {Array.from({ length: 11 }, (_, i) => {
            const y = 40 + i * 76;
            const a = 18 + i * 2;
            return (
              <path
                key={i}
                d={`M 1440 ${y} C 1290 ${y + a} 1150 ${y - a} 1010 ${y + a * 0.8} C 870 ${y - a * 0.6} 730 ${y + a * 0.5} 600 ${y + a * 0.2} C 480 ${y - a * 0.3} 360 ${y + a * 0.15} 240 ${y}`}
                stroke={`rgba(123,31,162,${(0.04 + i * 0.007).toFixed(3)})`}
                strokeWidth="0.75"
              />
            );
          })}
        </svg>
      </div>

      {/* Main content */}
      <motion.div
        className="letstalk-content"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative", zIndex: 10,
          flex: 1, display: "flex", flexDirection: "column", justifyContent: "center",
          paddingTop: 100, paddingBottom: 100, paddingLeft: 120,
        }}
      >
        <div style={{ maxWidth: 560 }}>
          {/* Section label */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 40 }}>
            <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 500, color: "#9CA3AF" }}>06</span>
            <div style={{ width: 40, height: 1, background: "#7B1FA2", flexShrink: 0 }} />
            <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", color: "#9CA3AF", textTransform: "uppercase" }}>
              LET&apos;S TALK
            </span>
          </div>

          {/* Headline */}
          <h2
            style={{
              fontFamily: SANS,
              fontSize: "clamp(2.8rem, 5.2vw, 5.2rem)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: 1.07,
              margin: "0 0 28px 0",
            }}
          >
            <span style={{ display: "block", color: "#0F172A" }}>Ready To Operate</span>
            <span style={{ display: "block", color: "#7B1FA2" }}>Efficiently?</span>
          </h2>

          {/* Body copy */}
          <p
            style={{
              fontFamily: SANS,
              fontSize: "clamp(0.875rem, 1.1vw, 1rem)",
              fontWeight: 400,
              lineHeight: 1.68,
              color: "#6B7280",
              maxWidth: 340,
              margin: "0 0 40px 0",
            }}
          >
            We help businesses identify inefficiencies, implement practical AI
            solutions and build software that delivers measurable results.
          </p>

          {/* CTA button */}
          <div style={{ marginBottom: 20 }}>
            <button
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "16px 32px",
                background: "linear-gradient(135deg, #4A0F5E 0%, #7B1FA2 100%)",
                color: "#fff",
                fontFamily: SANS,
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "0.01em",
                borderRadius: 50,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 8px 28px rgba(74,15,94,0.38)",
                transition: "opacity 0.2s, box-shadow 0.2s, transform 0.22s cubic-bezier(0.22,1,0.36,1)",
              }}
              onClick={() => window.open(CALENDLY, "_blank", "noopener,noreferrer")}
              onMouseEnter={(e) => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.opacity = "0.88";
                b.style.boxShadow = "0 14px 40px rgba(74,15,94,0.52)";
                b.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.opacity = "1";
                b.style.boxShadow = "0 8px 28px rgba(74,15,94,0.38)";
                b.style.transform = "translateY(0px)";
              }}
            >
              Book a Consultation
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <path d="M2 11L11 2M11 2H4M11 2V9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Email link */}
          <a
            href="mailto:adil@aigencyy.com"
            style={{
              fontFamily: SANS,
              fontSize: 13,
              fontWeight: 400,
              color: "#7B1FA2",
              textDecoration: "none",
              borderBottom: "1px solid #7B1FA2",
              paddingBottom: 2,
              display: "inline-block",
            }}
          >
            adil@aigencyy.com
          </a>
        </div>
      </motion.div>

    </section>
  );
}

export default function Home() {
  const prefersReducedMotion = useReducedMotion();

  const heroLogoRef = useRef<HTMLDivElement>(null);
  const [loaderVisible, setLoaderVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <>
    <AnimatePresence>
      {loaderVisible && (
        <IntroLoader
          onExit={() => setLoaderVisible(false)}
          heroLogoRef={heroLogoRef}
        />
      )}
    </AnimatePresence>
    {/* Shared canvas — hero and intelligence on one continuous background */}
    <div style={{
      position: "relative",
      background: [
        "radial-gradient(ellipse 72% 18% at 80% 50%, rgba(90,24,154,0.22) 0%, rgba(147,51,234,0.11) 40%, rgba(196,148,238,0.05) 66%, transparent 84%)",
        "#FAFAFA",
      ].join(", "),
    }}>
    <main style={{
      position: "relative",
      height: "100vh",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      background: "transparent",
    }}>

      {/* Swoosh background — slow breathing */}
      <motion.div
        aria-hidden="true"
        animate={!prefersReducedMotion ? { scale: [1, 1.04, 1], opacity: [0.95, 1, 0.95] } : {}}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/swoosh.png"
          alt=""
          style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
        />
      </motion.div>

      {/* Hero ambient glow — very slow drift across the purple atmosphere */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: "radial-gradient(ellipse 65% 55% at 68% 54%, rgba(123,31,162,0.14) 0%, rgba(196,148,238,0.06) 52%, transparent 80%)",
          filter: "blur(50px)",
        }}
        animate={!prefersReducedMotion ? {
          x: ["0%", "2.5%", "-1.5%", "0%"],
          y: ["0%", "-2%", "1.5%", "0%"],
        } : {}}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Atmospheric build-up — purple materialises within hero bottom 30%, transparent at clip edge */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "58%",
          background: [
            "radial-gradient(ellipse 78% 70% at 80% 58%, rgba(44,8,83,0.50) 0%, rgba(90,24,154,0.28) 36%, rgba(123,44,191,0.12) 60%, transparent 82%)",
            "radial-gradient(ellipse 46% 48% at 74% 92%, rgba(90,24,154,0.22) 0%, rgba(123,44,191,0.10) 46%, transparent 76%)",
            "linear-gradient(to bottom, transparent 0%, rgba(196,148,238,0.04) 28%, rgba(74,15,94,0.18) 60%, rgba(44,8,83,0.07) 82%, transparent 100%)",
          ].join(", "),
          pointerEvents: "none",
        }}
      />

      {/* Navigation */}
      <nav style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 50,
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "26px 32px" }}>
        <span style={{ fontFamily: SANS, fontSize: 12, fontWeight: 500,
                       letterSpacing: "0.2em", color: "#111" }}>
          AIGENCYY
        </span>
        <Hamburger />
      </nav>

      {/* Hero */}
      <div style={{ position: "relative", zIndex: 10, flex: 1,
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    textAlign: "center", padding: "0 24px 72px" }}>

        {/* Logo with plum glow */}
        <motion.div
          animate={!prefersReducedMotion ? { y: [0, -6, 0] } : {}}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ marginBottom: -40 }}
        >
          <div ref={heroLogoRef} style={{ position: "relative", display: "inline-block" }}>
            <motion.div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: "-22px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(100,30,160,0.18) 0%, transparent 70%)",
                filter: "blur(12px)",
                pointerEvents: "none",
              }}
              animate={!prefersReducedMotion ? { opacity: [0.6, 1, 0.6], scale: [1, 1.15, 1] } : {}}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            />
            <Logo />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={0.05} initial="hidden" animate={loaderVisible ? "hidden" : "show"} variants={rise}
          style={{
            fontFamily: SANS,
            fontSize: "clamp(1.9rem, 9vw, 10rem)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: HEADLINE_CLR,
            maxWidth: "none",
            width: "100%",
            margin: 0,
          }}
        >
          The Future Operates<br />
          Efficiently<span style={{ color: PLUM }}>.</span>
        </motion.h1>

        {/* CTA */}
        <motion.div custom={0.32} initial="hidden" animate={loaderVisible ? "hidden" : "show"} variants={rise}>
          <button
            style={{
              marginTop: 22,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "13px 26px",
              background: PLUM,
              color: "#fff",
              fontFamily: SANS,
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.01em",
              borderRadius: 50,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 6px 24px rgba(60, 16, 83, 0.35)",
              transition: "opacity 0.2s, box-shadow 0.2s, transform 0.22s cubic-bezier(0.22,1,0.36,1)",
            }}
            onClick={() => window.open(CALENDLY, "_blank", "noopener,noreferrer")}
            onMouseEnter={(e) => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.opacity = "0.88";
              b.style.boxShadow = "0 10px 36px rgba(60,16,83,0.48)";
              b.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.opacity = "1";
              b.style.boxShadow = "0 6px 24px rgba(60,16,83,0.35)";
              b.style.transform = "translateY(0px)";
            }}
          >
            Book a Consultation
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 10L10 2M10 2H4M10 2V8"
                    stroke="white" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </motion.div>
      </div>

      <ScrollIndicator />
    </main>
    <IntelligenceSection />
    </div>
    <WhatWeBuildSection />
    <ESRASection />
    <WhyAigencySection />
    <LetsTalkSection />
    </>
  );
}
