import { useState, useEffect, useRef, useCallback } from "react";
import ProjectPage, { PROJECT_IMAGES } from "./ProjectPage";

// ─────────────────────────────────────────────────────────────────────────────
// FONTS + COLOUR TOKENS  (no serif — Space Grotesk for display, Inter for body)
// ─────────────────────────────────────────────────────────────────────────────
const HEAD = "'Space Grotesk', 'Helvetica Neue', sans-serif";
const BODY = "'Inter', 'Helvetica Neue', sans-serif";

const BG      = "#ccc8c0";
const INK     = "#111111";
const MUTED   = "rgba(17,17,17,0.42)";
const BORDER  = "rgba(17,17,17,0.1)";
const DARK_BG = "#111111";
const PAPER   = "#e8e4de";

// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS
// ─────────────────────────────────────────────────────────────────────────────
const PROJECTS = [
  { id:"01", code:"PSA-0126", title:"Social Media & Ads",       cat:"Social Media",   year:"2026", color:"#e8c4d4",
    url:"https://madebykara.com/30-commerical-social-media-posts-ads",
    img:"https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/3d0601ff-4c96-4952-bf86-d55966d453ea_rwc_0x0x1916x1080x32.jpg?h=3fe224854a35b94dfa215defd4a0a770",
    desc:"30+ commercial posts and paid ads across multiple brands. Scroll stopping visuals built for conversion and engagement." },
  { id:"02", code:"PPL-0925", title:"Parallels Logo",            cat:"Logo Design",    year:"2025", color:"#c4cce8",
    url:"https://madebykara.com/parallels-logo-variations",
    img:"https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/65bdc620-9a44-454d-a983-75011a208ff8_carw_16x9x32.png?h=5fdc5566882bdb9cbf12c41de95ee4fa",
    desc:"Full suite of logo variations for Parallels. A mark that works across every scale, surface, and context." },
  { id:"03", code:"PCC-0725", title:"CoinCooker Identity",       cat:"Logo Design",    year:"2025", color:"#e8d4a0",
    url:"https://madebykara.com/coincooker-brand-logo",
    img:"https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/9adf83bd-e491-4c3e-aeb2-051b68c98a9e_rwc_118x30x1136x640x32.png?h=38831906379b60356e9d8b51990a2566",
    desc:"Brand mark for a crypto launchpad, bridging financial authority with digital native edge for the BRC2.0 ecosystem." },
  { id:"04", code:"PBC-0525", title:"Brand Craft Profile",       cat:"Brand Identity", year:"2025", color:"#2a2a2a",
    url:"https://madebykara.com/brand-craft-company-profile",
    img:"https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/c0c20ce8-f1e4-4f21-89fb-220df83ca108_rwc_0x300x3000x1690x32.jpg?h=81f8c200fe1b1ac45540bcf506e80da4",
    desc:"Company profile design for Brand Craft. A complete document system, from cover to case study layout." },
  { id:"05", code:"PKA-1024", title:"KARA Personal Identity",    cat:"Brand Identity", year:"2024", color:"#1a1830",
    url:"https://madebykara.com/kara-personal-identity",
    img:"https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/a45082ca-e836-4e80-83bb-efa025d05e3a_carw_16x9x32.png?h=bcb30c74439a5628036647126ffc3799",
    desc:"My own personal brand, KARA. Built around the idea of visual deliverance: being the audience before being the designer." },
  { id:"06", code:"PDB-0824", title:"Donna Bella Branding",      cat:"Brand Identity", year:"2024", color:"#e8c4b8",
    url:"https://madebykara.com/donna-bella-branding-project",
    img:"https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/497698d6-ce15-4458-ae08-7a3d60008533_carw_16x9x32.jpg?h=4be4d26c254f52a1ca092e856e0ccaaa",
    desc:"Full brand identity for Donna Bella. Feminine, refined, and contemporary, built to own a premium lifestyle space." },
  { id:"07", code:"PFC-0624", title:"Faya Cafe Branding",        cat:"Brand Identity", year:"2024", color:"#c8d4b0",
    url:"https://madebykara.com/faya-cafe-branding",
    img:"https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/ba024d9e-76bf-419d-a84d-f8aef18c53a8_carw_16x9x32.jpg?h=519da39bc3db751c852ff11841b67157",
    desc:"Identity for Faya Cafe. Warm, inviting, and rooted in the culture of the space it serves. Hospitality native design." },
  { id:"08", code:"PGS-0424", title:"Greenstone Rebrand",        cat:"Rebranding",     year:"2024", color:"#b0c8b8",
    url:"https://madebykara.com/greenstone-rebranded-logo-concept",
    img:"https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/4e82acfe-772a-4f7e-9569-cedeefc667e8_carw_16x9x32.jpg?h=72d94923862b357e473f864b0eec314f",
    desc:"Conceptual rebrand for Greenstone. Preserving equity while modernising the mark for a new market position." },
  { id:"09", code:"PSC-0324", title:"Stygian Crypt Vol. 1",      cat:"Art Direction",  year:"2024", color:"#1a0a2e",
    url:"https://madebykara.com/the-stygian-crypt-vol-1-artwork-showcase",
    img:"https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/03091f41-0cb5-4eca-8dc4-4a867a5957dd_carw_16x9x32.jpg?h=fbcb98b93227964d12c9108c573b8bf0",
    desc:"Art direction for Stygian Crypt Vol. 1, a dark fantasy visual system exploring mythology through editorial design." },
  { id:"10", code:"PDA-0823", title:"Digital Art 2020-2023",     cat:"Digital Art",    year:"2023", color:"#2a1a0a",
    url:"https://madebykara.com/digital-art-2020-2023",
    img:"https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/b5088995-23f1-4371-bea9-fbbe16b67200_carw_16x9x32.jpg?h=2baa372bd9b4e0cb5037182ddec701f2",
    desc:"Personal digital art archive 2020 to 2023. Explorations in texture, light, and form that shaped my visual sensibility." },
  { id:"11", code:"PLF-1124", title:"Logofolio 2023",            cat:"Logo Design",    year:"2024", color:"#e0d4b8",
    url:"https://madebykara.com/logofolio-2023",
    img:"https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/6e42493f-29f7-4091-907a-ff8803365083_rwc_231x97x2676x1508x32.jpg?h=81e1365ea3f3209517b5160bf1dec94d",
    desc:"A collection of logomarks from 2023, spanning food and beverage, tech, and lifestyle sectors across the UAE." },
  { id:"12", code:"PGH-0623", title:"The Ganga Highway",         cat:"Brand Identity", year:"2023", color:"#e8c8a0",
    url:"https://madebykara.com/the-ganga-highway-student-project",
    img:"https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/a14936c1-2425-4e78-8b83-4b7b46dca2a3_carw_16x9x32.png?h=71ea468610506a289a1d4902ea243ed9",
    desc:"Student project, identity for The Ganga Highway. A cultural brand rooted in the journey, not the destination." },
  { id:"13", code:"PAR-0323", title:"Analog The Room Rebrand",   cat:"Rebranding",     year:"2023", color:"#c0b8d4",
    url:"https://madebykara.com/analog-the-room-rebranding-student-project",
    img:"https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/cd54306d-138c-4354-bf2c-421488547f2b_carw_16x9x32.jpg?h=aff9bd3347f40532b8c96aceb6f2d911",
    desc:"Rebrand for Analog The Room, a hospitality venue. Retained the analogue soul while carving a sharper visual identity." },
];

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
      background: INK, color: PAPER, fontFamily: BODY, fontSize: 10, letterSpacing: ".1em",
      textTransform: "uppercase", fontWeight: 500, padding: "7px 12px", borderRadius: 100,
      whiteSpace: "nowrap", opacity: 0, transformOrigin: "top left", willChange: "transform, opacity",
      transition: "opacity .2s ease, scale .2s ease",
    }} />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NAV — hidden at the top, drops down once you scroll
// ─────────────────────────────────────────────────────────────────────────────
function Nav() {
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
      background: "rgba(204,200,192,0.82)", backdropFilter: "blur(12px)",
      transform: show ? "translateY(0)" : "translateY(-100%)",
      transition: "transform .5s cubic-bezier(.16,1,.3,1)",
    }}>
      <a href="#top" data-label="Home" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
        <img src="/images/logo/kara-black-logo.svg" alt="KARA" style={{ height: 15, display: "block" }} />
      </a>
      <nav style={{ display: "flex", alignItems: "center", gap: 30 }}>
        {[["Work", "#work"], ["About", "#about"], ["Services", "#services"], ["Contact", "#contact"]].map(([l, h]) => (
          <a key={h} href={h} data-label={`Go to ${l}`} onClick={go(h)}
            style={{ fontFamily: BODY, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase",
              color: INK, textDecoration: "none", opacity: 0.7, transition: "opacity .2s" }}
            onMouseEnter={e => e.currentTarget.style.opacity = "1"}
            onMouseLeave={e => e.currentTarget.style.opacity = "0.7"}>
            {l}
          </a>
        ))}
      </nav>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO — big logo left, text right (2 columns)
// ─────────────────────────────────────────────────────────────────────────────
function Hero({ ready }) {
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
      {/* LEFT — big logo */}
      <div style={{ display: "flex", alignItems: "center", paddingTop: 64, paddingBottom: 44 }}>
        <img src="/images/logo/kara-black-logo.svg" alt="KARA"
          style={{ width: "min(46vw, 660px)", display: "block",
            opacity: ready ? 1 : 0, transform: ready ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 1s ease .2s, transform 1s cubic-bezier(.16,1,.3,1) .2s" }} />
      </div>

      {/* RIGHT — text column */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", paddingTop: 96, paddingBottom: 44 }}>
        <p style={{ fontFamily: BODY, fontSize: 14, lineHeight: 1.65, color: "rgba(17,17,17,0.6)", maxWidth: 360,
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

      {/* top label */}
      <div style={{ position: "absolute", top: 30, left: 28,
        opacity: ready ? 1 : 0, transition: "opacity .7s ease .4s",
        fontFamily: BODY, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: MUTED }}>
        Brand &amp; Creative Designer · Dubai
      </div>
      <div style={{ position: "absolute", top: 30, right: 28,
        opacity: ready ? 1 : 0, transition: "opacity .7s ease .4s",
        fontFamily: BODY, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: MUTED }}>
        Est. 2023 · Portfolio 13
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION HEADER — shared 2-column (label left, heading + copy right)
// ─────────────────────────────────────────────────────────────────────────────
function SectionHead({ label, heading, copy, dark }) {
  const c1 = dark ? "rgba(232,228,222,0.4)" : MUTED;
  const cH = dark ? "#e8e4de" : INK;
  const cC = dark ? "rgba(232,228,222,0.6)" : "rgba(17,17,17,0.6)";
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start", marginBottom: 56 }}>
      <div style={{ fontFamily: BODY, fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: c1 }}>{label}</div>
      <div>
        <h2 style={{ fontFamily: HEAD, fontWeight: 500, fontSize: "clamp(26px,3.4vw,46px)", lineHeight: 1.05, letterSpacing: "-.02em", color: cH, marginBottom: copy ? 18 : 0 }}>
          {heading}
        </h2>
        {copy && <p style={{ fontFamily: BODY, fontSize: 14, lineHeight: 1.75, color: cC, maxWidth: 460 }}>{copy}</p>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WORK — folder stack + colour-shifting background
// ─────────────────────────────────────────────────────────────────────────────
function WorkSection({ onActiveBg, onOpen }) {
  const refs = useRef([]);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && e.intersectionRatio >= 0.5) onActiveBg(PROJECTS[parseInt(e.target.dataset.idx)].color);
      });
    }, { threshold: 0.5 });
    refs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, [onActiveBg]);

  return (
    <section id="work" style={{ padding: "90px 28px 80px" }}>
      <SectionHead label="(01) Selected Work" heading="Thirteen projects, built to last."
        copy="A working archive of brand identities, art direction and digital design, spanning 2023 to 2026." />

      <div style={{ height: 52, display: "flex", alignItems: "center", justifyContent: "space-between",
        borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, position: "sticky", top: 56, background: "inherit", zIndex: 50 }}>
        <span style={{ fontFamily: BODY, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: INK }}>Index</span>
        <span style={{ fontFamily: BODY, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: MUTED }}>13 Projects</span>
      </div>

      {PROJECTS.map((p, i) => (
        <FolderCard key={p.id} project={p} index={i} cardRef={el => refs.current[i] = el} onOpen={() => onOpen(i)} />
      ))}
    </section>
  );
}

function FolderCard({ project, index, cardRef, onOpen }) {
  const [vis, setVis] = useState(false);
  const innerRef = useRef(null);
  const strip = stripFor(project.id, project.img);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.15 });
    if (innerRef.current) obs.observe(innerRef.current);
    return () => obs.disconnect();
  }, []);

  const setRefs = el => { innerRef.current = el; if (cardRef) cardRef(el); };

  return (
    <div ref={setRefs} data-idx={index} style={{ position: "sticky", top: `calc(120px + ${index * 2}px)`, paddingTop: 24 }}>
      <div data-label={`View · ${project.title}`} onClick={onOpen}
        style={{ background: PAPER, borderRadius: "6px 6px 0 0", overflow: "hidden",
          border: `1px solid ${BORDER}`, borderBottom: "none", boxShadow: "0 -8px 40px rgba(17,17,17,0.06)",
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
            {project.id} / 13
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CAPABILITIES — interactive, constantly-animating radial network (canvas)
// ─────────────────────────────────────────────────────────────────────────────
const ANCHORS = [
  { label: "DESIGN",          x: 0.13, y: 0.20 },
  { label: "STRATEGY & BRAND", x: 0.90, y: 0.26 },
  { label: "ART DIRECTION",   x: 0.22, y: 0.84 },
];

function CapabilityNetwork() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = 0, H = 0, dpr = 1, raf, t = 0;
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, active: false };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = e => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = (e.clientY - r.top) / r.height;
      mouse.active = true;
    };
    window.addEventListener("mousemove", onMove);

    const N = 58;
    const spokes = Array.from({ length: N }, () => ({
      ang: Math.random() * Math.PI * 2,
      len: 0.10 + Math.random() * 0.46,
      phase: Math.random() * Math.PI * 2,
      speed: 0.25 + Math.random() * 0.8,
      amp: 0.02 + Math.random() * 0.05,
    }));

    const draw = () => {
      t += 0.016;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      ctx.clearRect(0, 0, W, H);

      const cx = W * 0.47 + (mouse.x - 0.5) * W * 0.06;
      const cy = H * 0.52 + (mouse.y - 0.5) * H * 0.08;
      const reach = Math.max(W, H) * 0.42;
      const mx = mouse.x * W, my = mouse.y * H;

      // faint animated spokes
      ctx.lineWidth = 1;
      for (const s of spokes) {
        const ang = s.ang + Math.sin(t * s.speed + s.phase) * s.amp * 2.4;
        let ex = cx + Math.cos(ang) * s.len * reach;
        let ey = cy + Math.sin(ang) * s.len * reach;
        const dx = ex - mx, dy = ey - my, d = Math.hypot(dx, dy);
        if (d < 140) { const f = (140 - d) / 140 * 34; ex += (dx / d) * f; ey += (dy / d) * f; }
        const a = 0.10 + 0.09 * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
        ctx.strokeStyle = `rgba(17,17,17,${a})`;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ex, ey); ctx.stroke();
        ctx.fillStyle = "rgba(17,17,17,0.22)";
        ctx.fillRect(ex - 1, ey - 1, 2, 2);
      }

      // bold anchor lines + labels
      ctx.font = `500 12px ${BODY}`;
      ctx.textBaseline = "middle";
      for (const an of ANCHORS) {
        const wob = Math.sin(t * 0.6 + an.x * 4) * 4;
        const ax = an.x * W + (mouse.x - 0.5) * W * 0.03 + wob;
        const ay = an.y * H + (mouse.y - 0.5) * H * 0.03;
        ctx.strokeStyle = "rgba(17,17,17,0.82)";
        ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ax, ay); ctx.stroke();
        ctx.fillStyle = INK;
        ctx.fillRect(ax - 3.5, ay - 3.5, 7, 7);
        const right = an.x > 0.6;
        ctx.textAlign = right ? "end" : "start";
        ctx.fillText(an.label, right ? ax - 12 : ax + 12, ay);
      }

      // center hub
      ctx.fillStyle = INK;
      ctx.fillRect(cx - 4.5, cy - 4.5, 9, 9);

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", onMove); };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />;
}

function Capabilities() {
  return (
    <section id="services" style={{ background: BG, padding: "90px 28px 60px", borderTop: `1px solid ${BORDER}` }}>
      <SectionHead label="(02) What I Do"
        heading="One studio, every layer of the brand."
        copy="From identity and art direction to digital and strategy, the disciplines connect to one centre. Move your cursor through the field to feel how they link." />
      <div style={{ position: "relative", width: "100%", height: "min(64vh, 620px)" }}>
        <CapabilityNetwork />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT — 2 columns, text on the right
// ─────────────────────────────────────────────────────────────────────────────
function About() {
  const stats = [["2+", "Years freelance"], ["13", "Projects"], ["4", "Industries"], ["BA", "MDX Dubai"]];
  const tags = ["Brand Identity", "Art Direction", "Logo Design", "Social Media", "Rebranding", "Strategy"];
  return (
    <section id="about" style={{ background: BG, padding: "90px 28px 100px", borderTop: `1px solid ${BORDER}` }}>
      <SectionHead label="(03) About"
        heading="I design brands that say something, not just look the part." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
        <div />
        <div>
          <p style={{ fontFamily: BODY, fontSize: 14, lineHeight: 1.85, color: "rgba(17,17,17,0.66)", marginBottom: 18 }}>
            I'm Karan Sandhu, a freelance brand and creative designer operating out of Dubai. My work spans FMCG, lifestyle, hospitality, and tech.
          </p>
          <p style={{ fontFamily: BODY, fontSize: 14, lineHeight: 1.85, color: "rgba(17,17,17,0.66)", marginBottom: 36 }}>
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
              <span key={tg} style={{ fontFamily: BODY, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(17,17,17,0.55)", border: `1px solid ${BORDER}`, borderRadius: 100, padding: "7px 14px" }}>{tg}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT / FOOTER — 2 columns + big logo bottom right
// ─────────────────────────────────────────────────────────────────────────────
function ContactFooter() {
  const [toast, setToast] = useState(false);
  const copyEmail = () => {
    const email = "hello@madebykara.com";
    try {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).catch(() => {});
      } else {
        const ta = document.createElement("textarea");
        ta.value = email; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select();
        document.execCommand("copy"); document.body.removeChild(ta);
      }
    } catch (e) { /* clipboard unavailable, still confirm to the user */ }
    setToast(true);
    setTimeout(() => setToast(false), 1800);
  };
  const NAV = [["Work", "#work"], ["About", "#about"], ["Services", "#services"], ["Contact", "#contact"]];
  const socials = [["madebykara.com", "https://madebykara.com"], ["Upwork", "https://upwork.com"], ["Fiverr", "https://fiverr.com"], ["Instagram", "https://instagram.com"], ["LinkedIn", "https://linkedin.com"]];
  const colHead = { fontFamily: BODY, fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(232,228,222,0.4)", marginBottom: 22 };

  return (
    <section id="contact" style={{ background: DARK_BG, color: "#e8e4de", padding: "100px 28px 28px", position: "relative", overflow: "hidden" }}>
      {/* heading on the right (2-col) */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginBottom: 90 }}>
        <div style={{ fontFamily: BODY, fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(232,228,222,0.4)" }}>(04) Contact</div>
        <h2 style={{ fontFamily: HEAD, fontWeight: 600, fontSize: "clamp(40px,6vw,92px)", letterSpacing: "-.03em", lineHeight: .98 }}>
          Let's get to work.
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, paddingBottom: 110 }}>
        {/* column 1 — navigation */}
        <div>
          <div style={colHead}>Navigation</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {NAV.map(([l, h]) => (
              <a key={h} href={h} data-label={`Go to ${l}`}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 340,
                  padding: "12px 0", borderBottom: "1px solid rgba(232,228,222,0.1)", textDecoration: "none",
                  fontFamily: HEAD, fontWeight: 500, fontSize: "clamp(20px,2.2vw,28px)", color: "#e8e4de", letterSpacing: "-.01em" }}>
                {l}<span style={{ fontFamily: BODY, fontSize: 12, color: "rgba(232,228,222,0.4)" }}>→</span>
              </a>
            ))}
          </div>
        </div>
        {/* column 2 — contact */}
        <div>
          <div style={colHead}>Contact</div>
          <div style={{ fontFamily: BODY, fontSize: 14, color: "#e8e4de", marginBottom: 2 }}>Karan Sandhu</div>
          <div style={{ fontFamily: BODY, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(232,228,222,0.4)", marginBottom: 10 }}>Brand &amp; Creative Designer · Dubai, UAE</div>
          <button onClick={copyEmail} data-label="Copy email"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: "#e8e4de", marginBottom: 28,
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

      {/* big logo bottom-right */}
      <img src="/images/logo/kara-white-logo.svg" alt="KARA" aria-hidden
        style={{ display: "block", width: "min(46vw, 620px)", marginLeft: "auto", marginBottom: 28, opacity: 0.92 }} />

      <div style={{ height: 1, background: "rgba(232,228,222,0.12)" }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 0", flexWrap: "wrap", gap: 12 }}>
        <div style={{ fontFamily: BODY, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(232,228,222,0.35)" }}>© 2026 Karan Sandhu</div>
        <div style={{ fontFamily: BODY, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(232,228,222,0.35)" }}>Dubai, UAE</div>
      </div>

      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} data-label="Back to top"
        style={{ position: "absolute", right: 28, top: 100, width: 44, height: 44, borderRadius: "50%",
          border: "1px solid rgba(232,228,222,0.25)", background: "none", cursor: "pointer", color: "#e8e4de", fontSize: 16 }}>
        ↑
      </button>

      <div style={{ position: "fixed", bottom: 28, left: "50%", transform: `translateX(-50%) translateY(${toast ? 0 : 20}px)`,
        opacity: toast ? 1 : 0, transition: "opacity .3s ease, transform .3s ease", pointerEvents: "none", zIndex: 99999,
        background: "#e8e4de", color: INK, fontFamily: BODY, fontSize: 12, letterSpacing: ".08em", padding: "12px 22px", borderRadius: 100 }}>
        Copied to clipboard!
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [ready, setReady] = useState(false);
  const [activeBg, setActiveBg] = useState(BG);
  const [projectPage, setProjectPage] = useState(null);

  useEffect(() => { const t = setTimeout(() => setReady(true), 200); return () => clearTimeout(t); }, []);

  const openProject  = useCallback(i => { setProjectPage(i); window.scrollTo(0, 0); }, []);
  const closeProject = useCallback(() => setProjectPage(null), []);
  const prevProject  = useCallback(() => setProjectPage(i => (i - 1 + PROJECTS.length) % PROJECTS.length), []);
  const nextProject  = useCallback(() => setProjectPage(i => (i + 1) % PROJECTS.length), []);

  return (
    <div style={{ background: activeBg, transition: "background-color .8s ease", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
        html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
        a, button { cursor: pointer; }
        ::selection { background: #111; color: #ccc8c0; }
        ::-webkit-scrollbar { width: 0; height: 0; }
        @keyframes pulse {
          0%   { box-shadow: 0 0 0 0 rgba(58,125,68,.5); }
          70%  { box-shadow: 0 0 0 8px rgba(58,125,68,0); }
          100% { box-shadow: 0 0 0 0 rgba(58,125,68,0); }
        }
      `}</style>

      <CursorLabel />

      {projectPage !== null ? (
        <ProjectPage project={PROJECTS[projectPage]} onBack={closeProject} onPrev={prevProject} onNext={nextProject} totalProjects={PROJECTS.length} isDark={false} />
      ) : (
        <>
          <Nav />
          <main>
            <Hero ready={ready} />
            <WorkSection onActiveBg={setActiveBg} onOpen={openProject} />
            <Capabilities />
            <About />
            <ContactFooter />
          </main>
        </>
      )}
    </div>
  );
}
