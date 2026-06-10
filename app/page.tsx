"use client";

import { motion } from "framer-motion";

const PLUM        = "#3c1053";
const HEADLINE_CLR = "#160830";
const SANS = "var(--font-inter), -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";

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
    transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Home() {
  return (
    <main style={{
      position: "relative",
      height: "100vh",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      background: "#ffffff",
    }}>

      {/* Swoosh background */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/swoosh.png"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 1,
          pointerEvents: "none",
          zIndex: 0,
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
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ marginBottom: -40 }}
        >
          <div style={{ position: "relative", display: "inline-block" }}>
            <div style={{
              position: "absolute",
              inset: "-22px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(100,30,160,0.18) 0%, transparent 70%)",
              filter: "blur(12px)",
              pointerEvents: "none",
            }} />
            <Logo />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={0.05} initial="hidden" animate="show" variants={rise}
          style={{
            fontFamily: SANS,
            fontSize: "clamp(3.8rem, 9vw, 10rem)",
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
        <motion.div custom={0.32} initial="hidden" animate="show" variants={rise}>
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
              transition: "opacity 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.opacity = "0.88";
              b.style.boxShadow = "0 8px 32px rgba(60,16,83,0.45)";
            }}
            onMouseLeave={(e) => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.opacity = "1";
              b.style.boxShadow = "0 6px 24px rgba(60,16,83,0.35)";
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
  );
}
