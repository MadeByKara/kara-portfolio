import { useState, useEffect, useRef, useCallback } from "react";
import ProjectPage, { PROJECT_IMAGES } from "./ProjectPage";

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
    img:"https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/3d0601ff-4c96-4952-bf86-d55966d453ea_rwc_0x0x1916x1080x32.jpg?h=3fe224854a35b94dfa215defd4a0a770",
    desc:"30+ commercial posts and paid ads across multiple brands. Scroll stopping visuals built for conversion and engagement." },
  { id:"02", code:"PPL-0925", title:"Parallels Logo",           cat:"Logo Design",    year:"2025", color:"#c4cce8",
    url:"https://madebykara.com/parallels-logo-variations",
    img:"https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/65bdc620-9a44-454d-a983-75011a208ff8_carw_16x9x32.png?h=5fdc5566882bdb9cbf12c41de95ee4fa",
    desc:"Full suite of logo variations for Parallels. A mark that works across every scale, surface, and context." },
  { id:"03", code:"PCC-0725", title:"CoinCooker Identity",      cat:"Logo Design",    year:"2025", color:"#e8d4a0",
    url:"https://madebykara.com/coincooker-brand-logo",
    img:"https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/9adf83bd-e491-4c3e-aeb2-051b68c98a9e_rwc_118x30x1136x640x32.png?h=38831906379b60356e9d8b51990a2566",
    desc:"Brand mark for a crypto launchpad, bridging financial authority with digital native edge for the BRC2.0 ecosystem." },
  { id:"04", code:"PBC-0525", title:"Brand Craft Profile",      cat:"Brand Identity", year:"2025", color:"#2a2a2a",
    url:"https://madebykara.com/brand-craft-company-profile",
    img:"https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/c0c20ce8-f1e4-4f21-89fb-220df83ca108_rwc_0x300x3000x1690x32.jpg?h=81f8c200fe1b1ac45540bcf506e80da4",
    desc:"Company profile design for Brand Craft. A complete document system, from cover to case study layout." },
  { id:"05", code:"PKA-1024", title:"KARA Personal Identity",   cat:"Brand Identity", year:"2024", color:"#1a1830",
    url:"https://madebykara.com/kara-personal-identity",
    img:"https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/a45082ca-e836-4e80-83bb-efa025d05e3a_carw_16x9x32.png?h=bcb30c74439a5628036647126ffc3799",
    desc:"My own personal brand, KARA. Built around the idea of visual deliverance: being the audience before being the designer." },
  { id:"06", code:"PGS-0424", title:"Greenstone Rebrand",       cat:"Rebranding",     year:"2024", color:"#b0c8b8",
    url:"https://madebykara.com/greenstone-rebranded-logo-concept",
    img:"https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/4e82acfe-772a-4f7e-9569-cedeefc667e8_carw_16x9x32.jpg?h=72d94923862b357e473f864b0eec314f",
    desc:"Conceptual rebrand for Greenstone. Preserving equity while modernising the mark for a new market position." },
  { id:"07", code:"PSC-0324", title:"Stygian Crypt Vol. 1",     cat:"Art Direction",  year:"2024", color:"#1a0a2e",
    url:"https://madebykara.com/the-stygian-crypt-vol-1-artwork-showcase",
    img:"https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/03091f41-0cb5-4eca-8dc4-4a867a5957dd_carw_16x9x32.jpg?h=fbcb98b93227964d12c9108c573b8bf0",
    desc:"Art direction for Stygian Crypt Vol. 1, a dark fantasy visual system exploring mythology through editorial design." },
  { id:"08", code:"PAR-0323", title:"Analog The Room Rebrand",  cat:"Rebranding",     year:"2023", color:"#c0b8d4",
    url:"https://madebykara.com/analog-the-room-rebranding-student-project",
    img:"https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/cd54306d-138c-4354-bf2c-421488547f2b_carw_16x9x32.jpg?h=aff9bd3347f40532b8c96aceb6f2d911",
    desc:"Rebrand for Analog The Room, a hospitality venue. Retained the analogue soul while carving a sharper visual identity." },
  { id:"09", code:"PME-0525", title:"Maison Etherique",         cat:"Brand Identity", year:"2025", color:"#c9b79c",
    url:"https://madebykara.com",
    img:"/images/maison%20etherique/Love_and_Harmony_kits.webp",
    desc:"Brand identity and packaging for Maison Etherique, a Dubai incense and ritual house. Sacred materials translated into a calm, modern luxury system." },
];
const TOTAL = PROJECTS.length;

const stripFor = (id, cover) => {
  const arr = PROJECT_IMAGES[id];
  if (arr && arr.length) return arr.slice(0, 5);
  return [cover, cover, cover, cover];
};

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
function Nav({ isDark, onToggleTheme }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.65);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const go = (hash) => (e) => { e.preventDefault(); document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, height: 56, zIndex: 9000,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 28px", borderBottom: `1px solid ${BORDER}`,
      background: "rgb(var(--bg-rgb) / 0.82)", backdropFilter: "blur(12px)",
      transform: show ? "translateY(0)" : "translateY(-100%)",
      transition: "transform .5s cubic-bezier(.16,1,.3,1)",
    }}>
      <a href="#top" data-label="Home" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
        <img src={isDark ? "/images/logo/kara-white-logo.svg" : "/images/logo/kara-black-logo.svg"} alt="KARA" style={{ height: 15, display: "block" }} />
      </a>
      <nav style={{ display: "flex", alignItems: "center", gap: 26 }}>
        {[["Work", "#work"], ["About", "#about"], ["Services", "#services"], ["Contact", "#contact"]].map(([l, h]) => (
          <a key={h} href={h} data-label={`Go to ${l}`} onClick={go(h)}
            style={{ fontFamily: BODY, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase",
              color: INK, textDecoration: "none", opacity: 0.7, transition: "opacity .2s" }}
            onMouseEnter={e => e.currentTarget.style.opacity = "1"}
            onMouseLeave={e => e.currentTarget.style.opacity = "0.7"}>
            {l}
          </a>
        ))}
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
        fontSize: "clamp(34px,5vw,82px)", lineHeight: 1.02, letterSpacing: "-.03em", color: INK,
        transform: ready ? "translateY(0)" : "translateY(110%)",
        transition: `transform .9s cubic-bezier(.16,1,.3,1) ${delay}s`,
      }}>{children}</span>
    </span>
  );
  return (
    <section id="top" style={{
      height: "100vh", minHeight: 620, background: BG, position: "relative",
      display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "100%", gap: 40,
      padding: "0 28px", borderBottom: `1px solid ${BORDER}`,
    }}>
      <div style={{ display: "flex", alignItems: "center", paddingTop: 64, paddingBottom: 44 }}>
        <img src={isDark ? "/images/logo/kara-white-logo.svg" : "/images/logo/kara-black-logo.svg"} alt="KARA"
          style={{ width: "min(46vw, 660px)", display: "block",
            opacity: ready ? 1 : 0, transform: ready ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 1s ease .2s, transform 1s cubic-bezier(.16,1,.3,1) .2s" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", paddingTop: 96, paddingBottom: 44 }}>
        <p style={{ fontFamily: BODY, fontSize: 14, lineHeight: 1.65, color: ink(0.6), maxWidth: 360,
          opacity: ready ? 1 : 0, transform: ready ? "translateY(0)" : "translateY(10px)",
          transition: "opacity .8s ease .3s, transform .8s ease .3s" }}>
          Some say a logo is enough. KARA is a brand studio that believes the audience comes first, always.
        </p>
        <div>
          <div style={{ marginBottom: 36 }}>
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
function WorkSection({ onOpen }) {
  return (
    <section id="work" style={{ padding: "90px 28px 80px", background: BG }}>
      <SectionHead label="(01) Selected Work" heading="Nine projects, built to last."
        copy="A working archive of brand identities, art direction and digital design, spanning 2023 to 2026." />
      <div style={{ height: 52, display: "flex", alignItems: "center", justifyContent: "space-between",
        borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, position: "sticky", top: 56, background: BG, zIndex: 50 }}>
        <span style={{ fontFamily: BODY, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: INK }}>Index</span>
        <span style={{ fontFamily: BODY, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: MUTED }}>{TOTAL} Projects</span>
      </div>
      {PROJECTS.map((p, i) => (
        <FolderCard key={p.id} project={p} index={i} onOpen={() => onOpen(i)} />
      ))}
    </section>
  );
}

function FolderCard({ project, index, onOpen }) {
  const [vis, setVis] = useState(false);
  const innerRef = useRef(null);
  const strip = stripFor(project.id, project.img);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.15 });
    if (innerRef.current) obs.observe(innerRef.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={innerRef} style={{ position: "sticky", top: `calc(120px + ${index * 2}px)`, paddingTop: 24 }}>
      <div data-label={`View · ${project.title}`} onClick={onOpen}
        style={{ background: PAPER, borderRadius: "6px 6px 0 0", overflow: "hidden",
          border: `1px solid ${BORDER}`, borderBottom: "none", boxShadow: "0 -8px 40px rgb(var(--ink-rgb) / 0.06)",
          transform: vis ? "translateY(0)" : "translateY(60px)", opacity: vis ? 1 : 0,
          transition: "transform .9s cubic-bezier(.16,1,.3,1), opacity .9s ease", cursor: "pointer" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 22px", borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, minWidth: 0 }}>
            <span style={{ fontFamily: BODY, fontSize: 10, letterSpacing: ".14em", color: MUTED, whiteSpace: "nowrap" }}>{project.code}</span>
            <span style={{ fontFamily: HEAD, fontWeight: 500, fontSize: 19, color: INK, letterSpacing: "-.01em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{project.title}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18, flexShrink: 0 }}>
            <span style={{ fontFamily: BODY, fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: MUTED }}>{project.cat}</span>
            <span style={{ fontFamily: BODY, fontSize: 10, letterSpacing: ".16em", color: INK }}>{project.year}</span>
          </div>
        </div>
        <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", overflow: "hidden", background: project.color }}>
          <img src={project.img} alt={project.title} loading="lazy"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        <div style={{ display: "flex", gap: 8, padding: "12px 22px 16px" }}>
          {strip.map((src, k) => (
            <div key={k} style={{ width: 64, height: 40, borderRadius: 2, overflow: "hidden", flexShrink: 0, background: project.color }}>
              <img src={src} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          ))}
          <div style={{ marginLeft: "auto", alignSelf: "center", fontFamily: BODY, fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: MUTED }}>
            {project.id} / {String(TOTAL).padStart(2, "0")}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CAPABILITIES — interactive flow field (vector lines swirl around the cursor)
// ─────────────────────────────────────────────────────────────────────────────
const DISCIPLINES = [
  { t: "Brand Identity",    x: 0.19, y: 0.26 },
  { t: "Art Direction",     x: 0.70, y: 0.20 },
  { t: "Digital Design",    x: 0.48, y: 0.52 },
  { t: "Print & Packaging", x: 0.24, y: 0.74 },
  { t: "Strategy",          x: 0.76, y: 0.70 },
];

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

function Capabilities({ isDark }) {
  return (
    <section id="services" style={{ background: BG, padding: "90px 28px 60px", borderTop: `1px solid ${BORDER}` }}>
      <SectionHead label="(02) What I Do"
        heading="One studio, every layer of the brand."
        copy="Identity, art direction, digital and strategy all pull toward one centre. Sweep your cursor through the field to stir it." />
      <div style={{ position: "relative", width: "100%", height: "min(66vh, 640px)" }}>
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

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────────────────────────────────────
function About() {
  const stats = [["2+", "Years freelance"], [String(TOTAL), "Projects"], ["4", "Industries"], ["BA", "MDX Dubai"]];
  const tags = ["Brand Identity", "Art Direction", "Logo Design", "Social Media", "Rebranding", "Strategy"];
  return (
    <section id="about" style={{ background: BG, padding: "90px 28px 100px", borderTop: `1px solid ${BORDER}` }}>
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
function ContactFooter() {
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
  const NAV = [["Work", "#work"], ["About", "#about"], ["Services", "#services"], ["Contact", "#contact"]];
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
            {NAV.map(([l, h]) => (
              <a key={h} href={h} data-label={`Go to ${l}`}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 340,
                  padding: "12px 0", borderBottom: "1px solid rgba(232,228,222,0.1)", textDecoration: "none",
                  fontFamily: HEAD, fontWeight: 500, fontSize: "clamp(20px,2.2vw,28px)", color: PANEL_INK, letterSpacing: "-.01em" }}>
                {l}<span style={{ fontFamily: BODY, fontSize: 12, color: "rgba(232,228,222,0.4)" }}>→</span>
              </a>
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
// SKIP BUTTON — bottom-right; visible while scrolling the work section
// ─────────────────────────────────────────────────────────────────────────────
function SkipToContact() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const contact = document.querySelector("#contact");
      const pastHero = window.scrollY > window.innerHeight * 0.9;
      const beforeContact = contact ? contact.getBoundingClientRect().top > window.innerHeight * 0.6 : true;
      setShow(pastHero && beforeContact);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const jump = () => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  return (
    <button onClick={jump} data-label="Jump to contact"
      style={{ position: "fixed", right: 24, bottom: 24, zIndex: 8000,
        display: "flex", alignItems: "center", gap: 9, padding: "12px 18px", borderRadius: 100,
        background: INK, color: "var(--bg)", border: "none", cursor: "pointer",
        fontFamily: BODY, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 500,
        opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(16px)", pointerEvents: show ? "auto" : "none",
        transition: "opacity .4s ease, transform .4s ease", boxShadow: "0 8px 30px rgb(var(--ink-rgb) / 0.18)" }}>
      Skip to Contact <span style={{ fontSize: 13 }}>↓</span>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [ready, setReady] = useState(false);
  const [projectPage, setProjectPage] = useState(null);
  const [isDark, setIsDark] = useState(() => {
    try { return localStorage.getItem("kara-theme") === "dark"; } catch { return false; }
  });

  useEffect(() => { const t = setTimeout(() => setReady(true), 200); return () => clearTimeout(t); }, []);
  useEffect(() => {
    document.body.style.background = isDark ? "#100f0e" : "#f3f2ee";
    try { localStorage.setItem("kara-theme", isDark ? "dark" : "light"); } catch (e) { /* ignore */ }
  }, [isDark]);

  const openProject  = useCallback(i => { setProjectPage(i); window.scrollTo(0, 0); }, []);
  const closeProject = useCallback(() => setProjectPage(null), []);
  const prevProject  = useCallback(() => setProjectPage(i => (i - 1 + TOTAL) % TOTAL), []);
  const nextProject  = useCallback(() => setProjectPage(i => (i + 1) % TOTAL), []);
  const toggleTheme  = useCallback(() => setIsDark(v => !v), []);

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
      `}</style>

      <CursorLabel />

      {projectPage !== null ? (
        <ProjectPage project={PROJECTS[projectPage]} onBack={closeProject} onPrev={prevProject} onNext={nextProject} totalProjects={TOTAL} isDark={isDark} />
      ) : (
        <>
          <Nav isDark={isDark} onToggleTheme={toggleTheme} />
          <main>
            <Hero ready={ready} isDark={isDark} />
            <WorkSection onOpen={openProject} />
            <Capabilities isDark={isDark} />
            <About />
            <ContactFooter />
          </main>
          <SkipToContact />
        </>
      )}
    </div>
  );
}
