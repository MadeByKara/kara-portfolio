import { useState, useEffect, useRef, useCallback } from "react";
import ProjectPage from "./ProjectPage";

// ─────────────────────────────────────────────────────────────────────────────
// FONTS + THEME TOKENS  (colours are CSS vars → light/dark just swaps them)
// ─────────────────────────────────────────────────────────────────────────────
const HEAD = "'Space Grotesk', 'Helvetica Neue', sans-serif";
const BODY = "'Inter', 'Helvetica Neue', sans-serif";

const BG        = "var(--bg)";
const INK       = "var(--ink)";
const MUTED     = "rgb(var(--ink-rgb) / 0.42)";
const BORDER    = "rgb(var(--ink-rgb) / 0.1)";
const PAPER     = "var(--paper)";
const PANEL     = "var(--panel)";
const PANEL_INK = "#e8e4de";
const ink = (a) => `rgb(var(--ink-rgb) / ${a})`;

// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS  (9 live projects)
// ─────────────────────────────────────────────────────────────────────────────
const PROJECTS = [
  { id:"01", code:"PSA-0126", title:"Social Media & Ads",      cat:"Social Media",   year:"2026", color:"#e8c4d4",
    url:"https://madebykara.com/30-commerical-social-media-posts-ads",
    img:"/images/social%20media%20creatives/Thumbnail%20Website.jpg",
    desc:"30+ commercial posts and paid ads across multiple brands. Scroll stopping visuals built for conversion and engagement." },
  { id:"02", code:"PPL-0925", title:"Parallels Logo",           cat:"Logo Design",    year:"2025", color:"#c4cce8",
    url:"https://madebykara.com/parallels-logo-variations",
    img:"/images/parallels/logo-variations-parallels.png",
    desc:"Full suite of logo variations for Parallels. A mark that works across every scale, surface, and context." },
  { id:"03", code:"PCC-0725", title:"CoinCooker Identity",      cat:"Logo Design",    year:"2025", color:"#e8d4a0",
    url:"https://madebykara.com/coincooker-brand-logo",
    img:"/images/coincooker/Slide%2016_9%20-%2039.png",
    desc:"Brand mark for a crypto launchpad, bridging financial authority with digital native edge for the BRC2.0 ecosystem." },
  { id:"04", code:"PBC-0525", title:"Brand Craft Profile",      cat:"Brand Identity", year:"2025", color:"#2a2a2a",
    url:"https://madebykara.com/brand-craft-company-profile",
    img:"/images/brand-craft/front.webp",
    desc:"Company profile design for Brand Craft. A complete document system, from cover to case study layout." },
  { id:"05", code:"PKA-1024", title:"KARA Personal Identity",   cat:"Brand Identity", year:"2024", color:"#1a1830",
    url:"https://madebykara.com/kara-personal-identity",
    img:"/images/kara/Thumbnail%20extended.png",
    desc:"My own personal brand, KARA. Built around the idea of visual deliverance: being the audience before being the designer." },
  { id:"06", code:"PGS-0424", title:"Greenstone Rebrand",       cat:"Rebranding",     year:"2024", color:"#b0c8b8",
    url:"https://madebykara.com/greenstone-rebranded-logo-concept",
    img:"/images/greenstone/Thumbnail-100.jpg",
    desc:"Conceptual rebrand for Greenstone. Preserving equity while modernising the mark for a new market position." },
  { id:"07", code:"PSC-0324", title:"Stygian Crypt Vol. 1",     cat:"Art Direction",  year:"2024", color:"#1a0a2e",
    url:"https://madebykara.com/the-stygian-crypt-vol-1-artwork-showcase",
    img:"/images/stygian-crypt/Mockup%201.jpg",
    desc:"Art direction for Stygian Crypt Vol. 1, a dark fantasy visual system exploring mythology through editorial design." },
  { id:"08", code:"PAR-0323", title:"Analog The Room Rebrand",  cat:"Rebranding",     year:"2023", color:"#c0b8d4",
    url:"https://madebykara.com/analog-the-room-rebranding-student-project",
    img:"/images/analog-the-room/ATR%20Behance%20Post.jpg",
    desc:"Rebrand for Analog The Room, a hospitality venue. Retained the analogue soul while carving a sharper visual identity." },
  { id:"09", code:"PME-0525", title:"Maison Etherique",         cat:"Brand Identity", year:"2025", color:"#c9b79c",
    url:"https://madebykara.com",
    img:"/images/maison%20etherique/Home-Blessing-Kit-Dubai-Maison-Etherique.webp",
    desc:"Brand identity and packaging for Maison Etherique, a Dubai incense and ritual house. Sacred materials translated into a calm, modern luxury system." },
  { id:"10", code:"PTB-0126", title:"Tabby UI Redesign",        cat:"UI/UX Design",   year:"2026", color:"#bfe3d8",
    url:"https://madebykara.com",
    img:"/images/tabby%20ui%20redesign/06-mockup-screen.png",
    desc:"A concept redesign of the Tabby app. Rethinking the buy now pay later flow with a cleaner visual system, clearer hierarchy and a calmer interface." },
];
const TOTAL = PROJECTS.length;

// ─────────────────────────────────────────────────────────────────────────────
// CURSOR LABEL — normal OS cursor; a pill beside it names the destination
// ─────────────────────────────────────────────────────────────────────────────
function CursorLabel() {
  const boxRef = useRef(null);
  const pos = useRef({ x: -200, y: -200 });
  const tgt = useRef({ x: -200, y: -200 });
  const label = useRef("");

  useEffect(() => {
    const mv = e => { tgt.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", mv);
    const enter = e => { label.current = e.currentTarget.dataset.label || ""; };
    const leave = () => { label.current = ""; };
    const attach = () => {
      document.querySelectorAll("[data-label]").forEach(el => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    };
    attach();
    const mo = new MutationObserver(attach);
    mo.observe(document.body, { childList: true, subtree: true });
    let raf;
    const loop = () => {
      pos.current.x += (tgt.current.x - pos.current.x) * 0.22;
      pos.current.y += (tgt.current.y - pos.current.y) * 0.22;
      const box = boxRef.current;
      if (box) {
        const show = !!label.current;
        box.style.transform = `translate(${pos.current.x + 18}px, ${pos.current.y + 16}px)`;
        box.style.opacity = show ? "1" : "0";
        box.style.scale = show ? "1" : "0.7";
        if (show && box.textContent !== label.current) box.textContent = label.current;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", mv); cancelAnimationFrame(raf); mo.disconnect(); };
  }, []);

  return (
    <div ref={boxRef} aria-hidden style={{
      position: "fixed", top: 0, left: 0, zIndex: 100000, pointerEvents: "none",
      background: INK, color: "var(--bg)", fontFamily: BODY, fontSize: 10, letterSpacing: ".1em",
      textTransform: "uppercase", fontWeight: 500, padding: "7px 12px", borderRadius: 100,
      whiteSpace: "nowrap", opacity: 0, transformOrigin: "top left", willChange: "transform, opacity",
      transition: "opacity .2s ease, scale .2s ease",
    }} />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NAV — hidden at the top, drops down once you scroll
// ─────────────────────────────────────────────────────────────────────────────
function Nav({ page, onNav, isDark, onToggleTheme }) {
  const links = [["Home", "home"], ["Work", "work"], ["About", "about"], ["Contact", "contact"]];
  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, height: 56, zIndex: 9000,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 28px", borderBottom: `1px solid ${BORDER}`,
      background: "rgb(var(--bg-rgb) / 0.82)", backdropFilter: "blur(12px)",
    }}>
      <button onClick={() => onNav("home")} data-label="Home"
        style={{ display: "flex", alignItems: "center", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
        <img src={isDark ? "/images/logo/kara-white-logo.svg" : "/images/logo/kara-black-logo.svg"} alt="KARA" style={{ height: 15, display: "block" }} />
      </button>
      <nav style={{ display: "flex", alignItems: "center", gap: 26 }}>
        {links.map(([l, p]) => {
          const on = page === p;
          return (
            <button key={p} onClick={() => onNav(p)} data-label={`Go to ${l}`}
              style={{ fontFamily: BODY, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase",
                color: INK, background: "none", border: "none", cursor: "pointer", padding: "2px 0",
                opacity: on ? 1 : 0.5, borderBottom: on ? `1px solid ${INK}` : "1px solid transparent", transition: "opacity .2s, border-color .2s" }}
              onMouseEnter={e => { if (!on) e.currentTarget.style.opacity = "0.85"; }}
              onMouseLeave={e => { if (!on) e.currentTarget.style.opacity = "0.5"; }}>
              {l}
            </button>
          );
        })}
        <ThemeDot isDark={isDark} onClick={onToggleTheme} />
      </nav>
    </header>
  );
}

function ThemeDot({ isDark, onClick }) {
  return (
    <button onClick={onClick} data-label={isDark ? "Light mode" : "Dark mode"} aria-label="Toggle theme"
      style={{ width: 30, height: 30, borderRadius: "50%", border: `1px solid ${BORDER}`, background: "none",
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
      <span style={{ width: 13, height: 13, borderRadius: "50%",
        background: isDark ? "#e8e4de" : "#14140f",
        boxShadow: isDark ? "inset -4px -2px 0 0 rgba(0,0,0,0)" : "inset -4px -3px 0 0 var(--paper)" }} />
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO — big logo left, text right (2 columns)
// ─────────────────────────────────────────────────────────────────────────────
function Hero({ ready, isDark }) {
  const Clip = ({ children, delay }) => (
    <span style={{ display: "block", overflow: "hidden" }}>
      <span style={{
        display: "block", fontFamily: HEAD, fontWeight: 600,
        fontSize: "clamp(32px,4.4vw,78px)", lineHeight: 1.02, letterSpacing: "-.03em", color: INK,
        transform: ready ? "translateY(0)" : "translateY(110%)",
        transition: `transform .9s cubic-bezier(.16,1,.3,1) ${delay}s`,
      }}>{children}</span>
    </span>
  );
  return (
    <section id="top" style={{
      height: "calc(100vh - 56px)", minHeight: 600, background: "transparent", position: "relative",
      display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "100%", gap: 40,
      padding: "0 28px", borderBottom: `1px solid ${BORDER}`,
    }}>
      {/* LEFT — big logo, top aligned */}
      <div style={{ display: "flex", alignItems: "flex-start", paddingTop: 92 }}>
        <img src={isDark ? "/images/logo/kara-white-logo.svg" : "/images/logo/kara-black-logo.svg"} alt="KARA"
          style={{ width: "min(48vw, 700px)", display: "block",
            opacity: ready ? 1 : 0, transform: ready ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 1s ease .2s, transform 1s cubic-bezier(.16,1,.3,1) .2s" }} />
      </div>

      {/* RIGHT — text column */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", paddingTop: 96, paddingBottom: 44 }}>
        <p style={{ fontFamily: BODY, fontSize: 14, lineHeight: 1.65, color: ink(0.6), maxWidth: 360,
          opacity: ready ? 1 : 0, transform: ready ? "translateY(0)" : "translateY(10px)",
          transition: "opacity .8s ease .3s, transform .8s ease .3s" }}>
          Some say a logo is enough. KARA is a brand studio that believes the audience comes first, always.
        </p>
        <div>
          <div style={{ marginBottom: 34 }}>
            <Clip delay={0.5}>Be the audience.</Clip>
            <Clip delay={0.62}>Build the brand.</Clip>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20,
            opacity: ready ? 1 : 0, transition: "opacity .8s ease 1.1s" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#3a7d44", display: "block",
                boxShadow: "0 0 0 0 rgba(58,125,68,.5)", animation: "pulse 2.4s infinite" }} />
              <span style={{ fontFamily: BODY, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: INK }}>
                Available for work
              </span>
            </div>
            <p style={{ fontFamily: BODY, fontSize: 12, lineHeight: 1.6, color: MUTED, maxWidth: 260 }}>
              Building brands that say something across FMCG, lifestyle, hospitality and tech.
            </p>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", top: 30, left: 28, opacity: ready ? 1 : 0, transition: "opacity .7s ease .4s",
        fontFamily: BODY, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: MUTED }}>
        Brand &amp; Creative Designer · Dubai
      </div>
      <div style={{ position: "absolute", top: 30, right: 28, opacity: ready ? 1 : 0, transition: "opacity .7s ease .4s",
        fontFamily: BODY, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: MUTED }}>
        Est. 2023 · Portfolio {String(TOTAL).padStart(2, "0")}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION HEADER — shared 2-column (label left, heading + copy right)
// ─────────────────────────────────────────────────────────────────────────────
function SectionHead({ label, heading, copy }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start", marginBottom: 56 }}>
      <div style={{ fontFamily: BODY, fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: MUTED }}>{label}</div>
      <div>
        <h2 style={{ fontFamily: HEAD, fontWeight: 500, fontSize: "clamp(26px,3.4vw,46px)", lineHeight: 1.05, letterSpacing: "-.02em", color: INK, marginBottom: copy ? 18 : 0 }}>
          {heading}
        </h2>
        {copy && <p style={{ fontFamily: BODY, fontSize: 14, lineHeight: 1.75, color: ink(0.6), maxWidth: 460 }}>{copy}</p>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WORK — folder stack
// ─────────────────────────────────────────────────────────────────────────────
// infinite looping horizontal carousel: drag / scroll across it; a down arrow leaves the section
function WorkSection({ onOpen }) {
  const scrollerRef = useRef(null);
  const setW = useRef(0);
  const dragging = useRef(false);
  const hovering = useRef(false);
  const moved = useRef(false);
  const acc = useRef(0);
  const loop = [...PROJECTS, ...PROJECTS, ...PROJECTS];

  useEffect(() => {
    const el = scrollerRef.current;
    const measure = () => { setW.current = el.scrollWidth / 3; if (el.scrollLeft < setW.current * 0.5) el.scrollLeft = setW.current; };
    measure();
    const imgs = el.querySelectorAll("img");
    imgs.forEach(im => im.complete || im.addEventListener("load", measure));
    window.addEventListener("resize", measure);
    const normalize = () => { const w = setW.current; if (!w) return; if (el.scrollLeft >= w * 2) el.scrollLeft -= w; else if (el.scrollLeft < w) el.scrollLeft += w; };
    el.addEventListener("scroll", normalize, { passive: true });
    let raf;
    const tick = () => {
      if (!dragging.current && !hovering.current) {
        acc.current += 0.5;
        const whole = Math.floor(acc.current);
        if (whole) { el.scrollLeft += whole; acc.current -= whole; }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", measure); el.removeEventListener("scroll", normalize); imgs.forEach(im => im.removeEventListener("load", measure)); };
  }, []);

  const onDown = (e) => {
    const el = scrollerRef.current;
    dragging.current = true; moved.current = false;
    let lastX = e.clientX; const startX = e.clientX;
    el.style.cursor = "grabbing";
    const mv = (ev) => { el.scrollLeft -= (ev.clientX - lastX); lastX = ev.clientX; if (Math.abs(ev.clientX - startX) > 6) moved.current = true; };
    const up = () => { dragging.current = false; el.style.cursor = "grab"; window.removeEventListener("pointermove", mv); window.removeEventListener("pointerup", up); };
    window.addEventListener("pointermove", mv); window.addEventListener("pointerup", up);
  };

  const leaveSection = () => {
    const sec = document.getElementById("work");
    const next = sec && sec.nextElementSibling;
    (next || sec).scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="work" style={{ padding: "80px 0 40px", background: "transparent" }}>
      <div style={{ padding: "0 28px" }}>
        <SectionHead label="(01) Selected Work" heading={`${TOTAL} projects, built to last.`}
          copy="Scroll or drag across the work — it loops. Click any project to open it, or tap the arrow to move on." />
      </div>
      <div style={{ position: "relative" }}>
        <div ref={scrollerRef} onPointerDown={onDown}
          onMouseEnter={() => { hovering.current = true; }} onMouseLeave={() => { hovering.current = false; }}
          style={{ display: "flex", gap: "clamp(18px,2.4vw,40px)", overflowX: "auto", padding: "0 28px 8px",
            cursor: "grab", scrollbarWidth: "none", msOverflowStyle: "none", userSelect: "none", scrollBehavior: "auto" }}>
          {loop.map((p, i) => (
            <WorkPanel key={i} project={p} onOpen={() => { if (!moved.current) onOpen(PROJECTS.indexOf(p)); }} />
          ))}
        </div>
        <button onClick={leaveSection} data-label="Skip to next section"
          style={{ position: "absolute", right: 22, top: "50%", transform: "translateY(-50%)", zIndex: 5,
            width: 46, height: 46, borderRadius: "50%", border: `1px solid ${BORDER}`, background: BG, color: INK,
            cursor: "pointer", fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgb(var(--ink-rgb) / 0.14)" }}>↓</button>
      </div>
    </section>
  );
}

function WorkPanel({ project, onOpen }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onOpen} data-label={`View · ${project.title}`}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ flexShrink: 0, width: "clamp(320px,44vw,600px)", cursor: "pointer", scrollSnapAlign: "start" }}>
      <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", overflow: "hidden", borderRadius: 4, background: project.color }}>
        <img src={project.img} alt={project.title} loading="lazy"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block",
            transform: hov ? "scale(1.04)" : "scale(1)", transition: "transform .8s cubic-bezier(.16,1,.3,1)" }} />
        <div style={{ position: "absolute", top: 14, left: 16, fontFamily: HEAD, fontWeight: 700, fontSize: 34, color: "rgba(255,255,255,.85)", lineHeight: 1, textShadow: "0 2px 20px rgba(0,0,0,.25)" }}>{project.id}</div>
        <div style={{ position: "absolute", top: 16, right: 16, fontFamily: BODY, fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: "#fff",
          border: "1px solid rgba(255,255,255,.5)", padding: "6px 12px", borderRadius: 100, opacity: hov ? 1 : 0, transition: "opacity .25s" }}>Open ↗</div>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, marginTop: 14 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: BODY, fontSize: 10, letterSpacing: ".14em", color: MUTED, marginBottom: 4 }}>{project.code}</div>
          <div style={{ fontFamily: HEAD, fontWeight: 500, fontSize: "clamp(17px,1.5vw,22px)", color: INK, letterSpacing: "-.01em",
            borderBottom: hov ? `1px solid ${INK}` : "1px solid transparent", transition: "border-color .2s", display: "inline-block" }}>{project.title}</div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontFamily: BODY, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: MUTED, marginBottom: 4 }}>{project.cat}</div>
          <div style={{ fontFamily: BODY, fontSize: 11, color: INK }}>{project.year}</div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CAPABILITIES — interactive flow field (vector lines swirl around the cursor)
// ─────────────────────────────────────────────────────────────────────────────
// tools I work with — draggable chips that collide and bounce
const TOOLS = [
  { name: "Figma",        mono: "Fi", bg: "#2C2C2C", fg: "#fff" },
  { name: "Photoshop",    mono: "Ps", bg: "#001E36", fg: "#31A8FF" },
  { name: "Illustrator",  mono: "Ai", bg: "#330000", fg: "#FF9A00" },
  { name: "After Effects",mono: "Ae", bg: "#00005B", fg: "#D6A0FF" },
  { name: "Blender",      mono: "Bl", bg: "#EA7600", fg: "#fff" },
  { name: "Cursor",       mono: "Cu", bg: "#111111", fg: "#fff" },
  { name: "Claude",       mono: "✳",  bg: "#D97757", fg: "#fff" },
  { name: "GitHub",       mono: "Gh", bg: "#181717", fg: "#fff" },
  { name: "Vercel",       mono: "▲",  bg: "#000000", fg: "#fff" },
  { name: "Midjourney",   mono: "Mj", bg: "#1B1B1B", fg: "#fff" },
  { name: "Notion",       mono: "N",  bg: "#ffffff", fg: "#111" },
  { name: "Framer",       mono: "Fr", bg: "#0055FF", fg: "#fff" },
];

function ToolsPlayground({ isDark }) {
  const wrapRef = useRef(null);
  const lineRef = useRef(null);
  const chipRefs = useRef([]);
  const bodies = useRef([]);
  const R = 40;

  useEffect(() => {
    const wrap = wrapRef.current, canvas = lineRef.current, ctx = canvas.getContext("2d");
    let W = wrap.clientWidth, H = wrap.clientHeight, dpr = Math.min(window.devicePixelRatio || 1, 2), raf;
    const setup = () => {
      W = wrap.clientWidth; H = wrap.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setup();
    bodies.current = TOOLS.map(() => ({
      x: R + Math.random() * (W - 2 * R), y: R + Math.random() * (H - 2 * R),
      vx: (Math.random() - 0.5) * 1.4, vy: (Math.random() - 0.5) * 1.4, drag: false,
    }));
    const resize = () => setup();
    window.addEventListener("resize", resize);

    const step = () => {
      const b = bodies.current;
      for (const p of b) {
        if (!p.drag) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < R) { p.x = R; p.vx = Math.abs(p.vx) * 0.92; }
          if (p.x > W - R) { p.x = W - R; p.vx = -Math.abs(p.vx) * 0.92; }
          if (p.y < R) { p.y = R; p.vy = Math.abs(p.vy) * 0.92; }
          if (p.y > H - R) { p.y = H - R; p.vy = -Math.abs(p.vy) * 0.92; }
          p.vx *= 0.994; p.vy *= 0.994;
        }
      }
      for (let i = 0; i < b.length; i++) for (let j = i + 1; j < b.length; j++) {
        const a = b[i], c = b[j]; const dx = c.x - a.x, dy = c.y - a.y; const d = Math.hypot(dx, dy) || 0.001; const min = 2 * R;
        if (d < min) {
          const nx = dx / d, ny = dy / d, ov = (min - d) / 2;
          if (!a.drag) { a.x -= nx * ov; a.y -= ny * ov; }
          if (!c.drag) { c.x += nx * ov; c.y += ny * ov; }
          const av = a.vx * nx + a.vy * ny, cv = c.vx * nx + c.vy * ny, diff = cv - av;
          if (!a.drag) { a.vx += nx * diff; a.vy += ny * diff; }
          if (!c.drag) { c.vx -= nx * diff; c.vy -= ny * diff; }
        }
      }
      // dashed connectors between nearby chips
      const inkRGB = isDark ? "240,239,233" : "20,20,15";
      ctx.clearRect(0, 0, W, H); ctx.setLineDash([2, 5]); ctx.lineWidth = 1;
      for (let i = 0; i < b.length; i++) for (let j = i + 1; j < b.length; j++) {
        const dd = Math.hypot(b[j].x - b[i].x, b[j].y - b[i].y);
        if (dd < 240) { ctx.strokeStyle = `rgba(${inkRGB},${0.18 * (1 - dd / 240)})`; ctx.beginPath(); ctx.moveTo(b[i].x, b[i].y); ctx.lineTo(b[j].x, b[j].y); ctx.stroke(); }
      }
      for (let i = 0; i < b.length; i++) { const el = chipRefs.current[i]; if (el) el.style.transform = `translate(${b[i].x}px,${b[i].y}px) translate(-50%,-50%)`; }
      raf = requestAnimationFrame(step);
    };
    step();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [isDark]);

  const onDown = (i) => (e) => {
    e.preventDefault();
    const rect = wrapRef.current.getBoundingClientRect();
    const p = bodies.current[i]; p.drag = true; p.vx = 0; p.vy = 0;
    let lx = e.clientX, ly = e.clientY;
    const mv = ev => {
      p.vx = ev.clientX - lx; p.vy = ev.clientY - ly; lx = ev.clientX; ly = ev.clientY;
      p.x = Math.max(R, Math.min(rect.width - R, ev.clientX - rect.left));
      p.y = Math.max(R, Math.min(rect.height - R, ev.clientY - rect.top));
    };
    const up = () => { p.drag = false; window.removeEventListener("pointermove", mv); window.removeEventListener("pointerup", up); };
    window.addEventListener("pointermove", mv); window.addEventListener("pointerup", up);
  };

  return (
    <div ref={wrapRef} style={{ position: "relative", width: "100%", height: "min(70vh, 560px)", touchAction: "none", overflow: "hidden" }}>
      <canvas ref={lineRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} />
      {TOOLS.map((t, i) => (
        <div key={t.name} ref={el => chipRefs.current[i] = el} onPointerDown={onDown(i)} data-label={t.name}
          style={{ position: "absolute", left: 0, top: 0, width: 84, display: "flex", flexDirection: "column", alignItems: "center", gap: 9,
            cursor: "grab", userSelect: "none", willChange: "transform", zIndex: 1 }}>
          <div style={{ width: 2 * R, height: 2 * R, borderRadius: 18, background: t.bg, display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: HEAD, fontWeight: 700, fontSize: 22, color: t.fg, boxShadow: "0 8px 24px rgba(0,0,0,0.16)", border: t.bg === "#ffffff" ? `1px solid ${BORDER}` : "none" }}>
            {t.mono}
          </div>
          <span style={{ fontFamily: BODY, fontSize: 11, color: INK, whiteSpace: "nowrap" }}>{t.name}</span>
        </div>
      ))}
    </div>
  );
}

function FlowField({ isDark }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = 0, H = 0, dpr = 1, raf, t = 0;
    const mouse = { x: -999, y: -999, tx: -999, ty: -999 };
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    const onMove = e => { const r = canvas.getBoundingClientRect(); mouse.tx = e.clientX - r.left; mouse.ty = e.clientY - r.top; };
    window.addEventListener("mousemove", onMove);

    const inkRGB = isDark ? "240,239,233" : "20,20,15";
    const step = 30, R = 190;
    const draw = () => {
      t += 0.01;
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;
      ctx.clearRect(0, 0, W, H);
      ctx.lineCap = "round";
      for (let y = step / 2; y < H; y += step) {
        for (let x = step / 2; x < W; x += step) {
          // flowing base angle (evolves with time)
          let a = Math.sin(x * 0.008 + t * 0.5) + Math.cos(y * 0.009 - t * 0.4) + Math.sin((x + y) * 0.006 + t * 0.25);
          const dx = x - mouse.x, dy = y - mouse.y, dist = Math.hypot(dx, dy);
          let hl = 0;
          if (dist < R) {
            const inf = (1 - dist / R);
            const swirl = Math.atan2(dy, dx) + Math.PI / 2;   // tangential = vortex
            a = a * (1 - inf) + swirl * inf * 1.7;
            hl = inf;
          }
          const len = 12 * (0.7 + 0.4 * Math.sin(x * 0.02 + y * 0.02 + t)) + hl * 12;
          const ca = Math.cos(a) * len / 2, sa = Math.sin(a) * len / 2;
          ctx.strokeStyle = `rgba(${inkRGB},${0.11 + hl * 0.55})`;
          ctx.lineWidth = 1 + hl * 0.8;
          ctx.beginPath();
          ctx.moveTo(x - ca, y - sa);
          ctx.lineTo(x + ca, y + sa);
          ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", onMove); };
  }, [isDark]);
  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />;
}

// interactive flow field of lines that swirl around the cursor
const DISCIPLINES = [
  { t: "UX & Product Design",       x: 0.22, y: 0.30 },
  { t: "Brand Direction",           x: 0.72, y: 0.24 },
  { t: "Social Campaign Creatives", x: 0.50, y: 0.72 },
];

function Capabilities({ isDark }) {
  return (
    <section id="capabilities" style={{ background: "transparent", padding: "80px 28px 60px", borderTop: `1px solid ${BORDER}` }}>
      <SectionHead label="(02) What I Do"
        heading="Everything connects to one system."
        copy="Product, brand and social all pull toward one centre. Sweep your cursor through the field to stir it." />
      <div style={{ position: "relative", width: "100%", height: "min(66vh, 600px)" }}>
        <FlowField isDark={isDark} />
        {DISCIPLINES.map((d) => (
          <div key={d.t} style={{ position: "absolute", left: `${d.x * 100}%`, top: `${d.y * 100}%`, transform: "translate(-50%,-50%)",
            display: "flex", alignItems: "center", gap: 8, pointerEvents: "none" }}>
            <span style={{ width: 7, height: 7, background: INK, display: "block" }} />
            <span style={{ fontFamily: HEAD, fontWeight: 500, fontSize: "clamp(15px,1.5vw,22px)", color: INK, letterSpacing: "-.01em", whiteSpace: "nowrap" }}>{d.t}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ToolsSection({ isDark }) {
  return (
    <section id="tools" style={{ background: "transparent", padding: "80px 28px 90px", borderTop: `1px solid ${BORDER}` }}>
      <SectionHead label="Tools I Use"
        heading="The stack I build with every day."
        copy="Design, code and AI in one workflow. Grab any tool and toss it around, they bounce off each other." />
      <ToolsPlayground isDark={isDark} />
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────────────────────────────────────
function About() {
  const stats = [["2+", "Years freelance"], [String(TOTAL), "Projects"], ["4", "Industries"], ["BA", "MDX Dubai"]];
  const tags = ["Brand Identity", "Art Direction", "Logo Design", "Social Media", "Rebranding", "Strategy"];
  return (
    <section id="about" style={{ background: "transparent", padding: "90px 28px 100px", borderTop: `1px solid ${BORDER}` }}>
      <SectionHead label="(03) About" heading="I design brands that say something, not just look the part." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
        <div />
        <div>
          <p style={{ fontFamily: BODY, fontSize: 14, lineHeight: 1.85, color: ink(0.66), marginBottom: 18 }}>
            I'm Karan Sandhu, a freelance brand and creative designer operating out of Dubai. My work spans FMCG, lifestyle, hospitality, and tech.
          </p>
          <p style={{ fontFamily: BODY, fontSize: 14, lineHeight: 1.85, color: ink(0.66), marginBottom: 36 }}>
            My philosophy: be the audience first, then build the visual language they respond to. No templates, no filler. Work that endures.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: BORDER, marginBottom: 32 }}>
            {stats.map(([n, l]) => (
              <div key={l} style={{ background: BG, padding: "20px 16px" }}>
                <div style={{ fontFamily: HEAD, fontWeight: 600, fontSize: 38, color: INK, lineHeight: 1, letterSpacing: "-.02em" }}>{n}</div>
                <div style={{ fontFamily: BODY, fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase", color: MUTED, marginTop: 6 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {tags.map(tg => (
              <span key={tg} style={{ fontFamily: BODY, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: ink(0.55), border: `1px solid ${BORDER}`, borderRadius: 100, padding: "7px 14px" }}>{tg}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT / FOOTER — 2 columns + big logo bottom right (always dark panel)
// ─────────────────────────────────────────────────────────────────────────────
function ContactFooter({ onNav }) {
  const [toast, setToast] = useState(false);
  const copyEmail = () => {
    const email = "hello@madebykara.com";
    try {
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(email).catch(() => {});
      else {
        const ta = document.createElement("textarea");
        ta.value = email; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta);
      }
    } catch (e) { /* still confirm */ }
    setToast(true); setTimeout(() => setToast(false), 1800);
  };
  const NAV = [["Home", "home"], ["Work", "work"], ["About", "about"]];
  const socials = [["madebykara.com", "https://madebykara.com"], ["Upwork", "https://upwork.com"], ["Fiverr", "https://fiverr.com"], ["Instagram", "https://instagram.com"], ["LinkedIn", "https://linkedin.com"]];
  const colHead = { fontFamily: BODY, fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(232,228,222,0.4)", marginBottom: 22 };

  return (
    <section id="contact" style={{ background: PANEL, color: PANEL_INK, padding: "100px 28px 28px", position: "relative", overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginBottom: 90 }}>
        <div style={{ fontFamily: BODY, fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(232,228,222,0.4)" }}>(04) Contact</div>
        <h2 style={{ fontFamily: HEAD, fontWeight: 600, fontSize: "clamp(40px,6vw,92px)", letterSpacing: "-.03em", lineHeight: .98 }}>Let's get to work.</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, paddingBottom: 110 }}>
        <div>
          <div style={colHead}>Navigation</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {NAV.map(([l, p]) => (
              <button key={p} onClick={() => onNav(p)} data-label={`Go to ${l}`}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", maxWidth: 340,
                  padding: "12px 0", background: "none", border: "none", borderBottom: "1px solid rgba(232,228,222,0.1)", borderRadius: 0, cursor: "pointer", textAlign: "left",
                  fontFamily: HEAD, fontWeight: 500, fontSize: "clamp(20px,2.2vw,28px)", color: PANEL_INK, letterSpacing: "-.01em" }}>
                {l}<span style={{ fontFamily: BODY, fontSize: 12, color: "rgba(232,228,222,0.4)" }}>→</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <div style={colHead}>Contact</div>
          <div style={{ fontFamily: BODY, fontSize: 14, color: PANEL_INK, marginBottom: 2 }}>Karan Sandhu</div>
          <div style={{ fontFamily: BODY, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(232,228,222,0.4)", marginBottom: 10 }}>Brand &amp; Creative Designer · Dubai, UAE</div>
          <button onClick={copyEmail} data-label="Copy email"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: PANEL_INK, marginBottom: 28,
              fontFamily: HEAD, fontWeight: 500, fontSize: "clamp(20px,2.4vw,32px)", letterSpacing: "-.01em",
              borderBottom: "1px solid rgba(232,228,222,0.25)", paddingBottom: 2 }}>
            hello@madebykara.com
          </button>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {socials.map(([l, h]) => (
              <a key={l} href={h} target="_blank" rel="noreferrer" data-label={l}
                style={{ fontFamily: BODY, fontSize: 11, letterSpacing: ".06em", color: "rgba(232,228,222,0.7)", textDecoration: "none",
                  border: "1px solid rgba(232,228,222,0.18)", borderRadius: 100, padding: "8px 15px" }}>
                {l} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
      <img src="/images/logo/kara-white-logo.svg" alt="KARA" aria-hidden
        style={{ display: "block", width: "min(46vw, 620px)", marginLeft: "auto", marginBottom: 28, opacity: 0.92 }} />
      <div style={{ height: 1, background: "rgba(232,228,222,0.12)" }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 0", flexWrap: "wrap", gap: 12 }}>
        <div style={{ fontFamily: BODY, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(232,228,222,0.35)" }}>© 2026 Karan Sandhu</div>
        <div style={{ fontFamily: BODY, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(232,228,222,0.35)" }}>Dubai, UAE</div>
      </div>
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} data-label="Back to top"
        style={{ position: "absolute", right: 28, top: 100, width: 44, height: 44, borderRadius: "50%",
          border: "1px solid rgba(232,228,222,0.25)", background: "none", cursor: "pointer", color: PANEL_INK, fontSize: 16 }}>↑</button>
      <div style={{ position: "fixed", bottom: 28, left: "50%", transform: `translateX(-50%) translateY(${toast ? 0 : 20}px)`,
        opacity: toast ? 1 : 0, transition: "opacity .3s ease, transform .3s ease", pointerEvents: "none", zIndex: 99999,
        background: "#e8e4de", color: "#14140f", fontFamily: BODY, fontSize: 12, letterSpacing: ".08em", padding: "12px 22px", borderRadius: 100 }}>
        Copied to clipboard!
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROUTING + PAGE SHELLS
// ─────────────────────────────────────────────────────────────────────────────
const PAGES = ["home", "work", "about", "contact"];
function usePage() {
  const read = () => { const h = window.location.hash.replace("#", "") || "home"; return PAGES.includes(h) ? h : "home"; };
  const [page, setPage] = useState(read);
  useEffect(() => {
    const on = () => setPage(read());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  const go = (p) => { window.location.hash = p; window.scrollTo(0, 0); };
  return [page, go];
}

function HomePage({ ready, isDark, onOpen, onNav }) {
  return (
    <>
      <Hero ready={ready} isDark={isDark} />
      <WorkSection onOpen={onOpen} />
      <Capabilities isDark={isDark} />
      <ToolsSection isDark={isDark} />
      <About />
      <ContactFooter onNav={onNav} />
    </>
  );
}

function SiteFooter({ onNav }) {
  return (
    <footer style={{ padding: "26px 28px", borderTop: `1px solid ${BORDER}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14, background: "transparent" }}>
      <span style={{ fontFamily: BODY, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: MUTED }}>© 2026 Karan Sandhu · Dubai</span>
      <div style={{ display: "flex", gap: 20 }}>
        {[["Work", "work"], ["About", "about"], ["Contact", "contact"]].map(([l, p]) => (
          <button key={p} onClick={() => onNav(p)} data-label={`Go to ${l}`}
            style={{ fontFamily: BODY, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: MUTED, background: "none", border: "none", cursor: "pointer" }}>{l}</button>
        ))}
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [ready, setReady] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    try { return localStorage.getItem("kara-theme") === "dark"; } catch { return false; }
  });
  const [page, go] = usePage();
  const [projectPage, setProjectPage] = useState(null);

  useEffect(() => { const t = setTimeout(() => setReady(true), 200); return () => clearTimeout(t); }, []);
  useEffect(() => {
    document.body.style.background = isDark ? "#100f0e" : "#f3f2ee";
    try { localStorage.setItem("kara-theme", isDark ? "dark" : "light"); } catch (e) { /* ignore */ }
  }, [isDark]);
  useEffect(() => { setProjectPage(null); }, [page]);

  const openProject  = useCallback(i => { setProjectPage(i); window.scrollTo(0, 0); }, []);
  const closeProject = useCallback(() => { setProjectPage(null); window.scrollTo(0, 0); }, []);
  const prevProject  = useCallback(() => setProjectPage(i => (i - 1 + TOTAL) % TOTAL), []);
  const nextProject  = useCallback(() => setProjectPage(i => (i + 1) % TOTAL), []);
  const toggleTheme  = useCallback(() => setIsDark(v => !v), []);
  const navigate     = useCallback((p) => { setProjectPage(null); go(p); }, [go]);

  const detail = projectPage !== null;

  return (
    <div className={isDark ? "theme-dark" : "theme-light"} style={{ background: BG, color: INK, minHeight: "100vh", transition: "background-color .4s ease, color .4s ease" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
        .theme-light { --bg:#f3f2ee; --bg-rgb:243 242 238; --ink:#14140f; --ink-rgb:20 20 15; --paper:#ffffff; --panel:#14140f; }
        .theme-dark  { --bg:#100f0e; --bg-rgb:16 15 14;   --ink:#f0efe9; --ink-rgb:240 239 233; --paper:#1b1a18; --panel:#000000; }
        html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
        a, button { cursor: pointer; }
        ::selection { background: var(--ink); color: var(--bg); }
        ::-webkit-scrollbar { width: 0; height: 0; }
        @keyframes pulse {
          0%   { box-shadow: 0 0 0 0 rgba(58,125,68,.5); }
          70%  { box-shadow: 0 0 0 8px rgba(58,125,68,0); }
          100% { box-shadow: 0 0 0 0 rgba(58,125,68,0); }
        }
        @keyframes pageIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      <CursorLabel />

      <div style={{ position: "relative", zIndex: 1 }}>
        {detail ? (
          <ProjectPage project={PROJECTS[projectPage]} onBack={closeProject} onPrev={prevProject} onNext={nextProject} totalProjects={TOTAL} isDark={isDark} />
        ) : (
          <>
            <Nav page={page} onNav={navigate} isDark={isDark} onToggleTheme={toggleTheme} />
            <main style={{ paddingTop: 56, minHeight: "calc(100vh - 130px)" }}>
              <div key={page} style={{ animation: "pageIn .55s cubic-bezier(.16,1,.3,1)" }}>
                {page === "work" ? <WorkSection onOpen={openProject} />
                  : page === "about" ? <About />
                  : page === "contact" ? <ContactFooter onNav={navigate} />
                  : <HomePage ready={ready} isDark={isDark} onOpen={openProject} onNav={navigate} />}
              </div>
            </main>
            {page !== "contact" && page !== "home" && <SiteFooter onNav={navigate} />}
          </>
        )}
      </div>
    </div>
  );
}
