import { useState, useEffect, useRef, useCallback } from "react";
import ProjectPage, { PROJECT_IMAGES } from "./ProjectPage";

// ─────────────────────────────────────────────────────────────────────────────
// FONTS + COLOUR TOKENS
// ─────────────────────────────────────────────────────────────────────────────
const SERIF = "'Instrument Serif', Georgia, serif";
const SANS  = "'Space Grotesk', 'Neue Montreal', 'Helvetica Neue', sans-serif";

const BG      = "#ccc8c0";          // warm greige
const INK     = "#111111";          // near black
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
    desc:"30+ commercial posts and paid ads across multiple brands. Scroll-stopping visuals built for conversion and engagement." },
  { id:"02", code:"PPL-0925", title:"Parallels Logo",            cat:"Logo Design",    year:"2025", color:"#c4cce8",
    url:"https://madebykara.com/parallels-logo-variations",
    img:"https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/65bdc620-9a44-454d-a983-75011a208ff8_carw_16x9x32.png?h=5fdc5566882bdb9cbf12c41de95ee4fa",
    desc:"Full suite of logo variations for Parallels — a mark that works across every scale, surface, and context." },
  { id:"03", code:"PCC-0725", title:"CoinCooker Identity",       cat:"Logo Design",    year:"2025", color:"#e8d4a0",
    url:"https://madebykara.com/coincooker-brand-logo",
    img:"https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/9adf83bd-e491-4c3e-aeb2-051b68c98a9e_rwc_118x30x1136x640x32.png?h=38831906379b60356e9d8b51990a2566",
    desc:"Brand mark for a crypto launchpad. Bridging financial authority with digital-native edge — BRC2.0 ecosystem." },
  { id:"04", code:"PBC-0525", title:"Brand Craft Profile",       cat:"Brand Identity", year:"2025", color:"#2a2a2a",
    url:"https://madebykara.com/brand-craft-company-profile",
    img:"https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/c0c20ce8-f1e4-4f21-89fb-220df83ca108_rwc_0x300x3000x1690x32.jpg?h=81f8c200fe1b1ac45540bcf506e80da4",
    desc:"Company profile design for Brand Craft. A complete document system — from cover to case study layout." },
  { id:"05", code:"PKA-1024", title:"KARA Personal Identity",    cat:"Brand Identity", year:"2024", color:"#1a1830",
    url:"https://madebykara.com/kara-personal-identity",
    img:"https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/a45082ca-e836-4e80-83bb-efa025d05e3a_carw_16x9x32.png?h=bcb30c74439a5628036647126ffc3799",
    desc:"My own personal brand — KARA. Built around the idea of visual deliverance: being the audience before being the designer." },
  { id:"06", code:"PDB-0824", title:"Donna Bella Branding",      cat:"Brand Identity", year:"2024", color:"#e8c4b8",
    url:"https://madebykara.com/donna-bella-branding-project",
    img:"https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/497698d6-ce15-4458-ae08-7a3d60008533_carw_16x9x32.jpg?h=4be4d26c254f52a1ca092e856e0ccaaa",
    desc:"Full brand identity for Donna Bella. Feminine, refined, and contemporary — built to own a premium lifestyle space." },
  { id:"07", code:"PFC-0624", title:"Faya Cafe Branding",        cat:"Brand Identity", year:"2024", color:"#c8d4b0",
    url:"https://madebykara.com/faya-cafe-branding",
    img:"https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/ba024d9e-76bf-419d-a84d-f8aef18c53a8_carw_16x9x32.jpg?h=519da39bc3db751c852ff11841b67157",
    desc:"Identity for Faya Cafe — warm, inviting, and rooted in the culture of the space it serves. Hospitality-native design." },
  { id:"08", code:"PGS-0424", title:"Greenstone Rebrand",        cat:"Rebranding",     year:"2024", color:"#b0c8b8",
    url:"https://madebykara.com/greenstone-rebranded-logo-concept",
    img:"https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/4e82acfe-772a-4f7e-9569-cedeefc667e8_carw_16x9x32.jpg?h=72d94923862b357e473f864b0eec314f",
    desc:"Conceptual rebrand for Greenstone. Preserving equity while modernising the mark for a new market position." },
  { id:"09", code:"PSC-0324", title:"Stygian Crypt Vol. 1",      cat:"Art Direction",  year:"2024", color:"#1a0a2e",
    url:"https://madebykara.com/the-stygian-crypt-vol-1-artwork-showcase",
    img:"https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/03091f41-0cb5-4eca-8dc4-4a867a5957dd_carw_16x9x32.jpg?h=fbcb98b93227964d12c9108c573b8bf0",
    desc:"Art direction for Stygian Crypt Vol. 1 — a dark fantasy visual system exploring mythology through editorial design." },
  { id:"10", code:"PDA-0823", title:"Digital Art 2020-2023",     cat:"Digital Art",    year:"2023", color:"#2a1a0a",
    url:"https://madebykara.com/digital-art-2020-2023",
    img:"https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/b5088995-23f1-4371-bea9-fbbe16b67200_carw_16x9x32.jpg?h=2baa372bd9b4e0cb5037182ddec701f2",
    desc:"Personal digital art archive 2020–2023. Explorations in texture, light, and form that shaped my visual sensibility." },
  { id:"11", code:"PLF-1124", title:"Logofolio 2023",            cat:"Logo Design",    year:"2024", color:"#e0d4b8",
    url:"https://madebykara.com/logofolio-2023",
    img:"https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/6e42493f-29f7-4091-907a-ff8803365083_rwc_231x97x2676x1508x32.jpg?h=81e1365ea3f3209517b5160bf1dec94d",
    desc:"A collection of logomarks from 2023 — spanning food & beverage, tech, and lifestyle sectors across the UAE." },
  { id:"12", code:"PGH-0623", title:"The Ganga Highway",         cat:"Brand Identity", year:"2023", color:"#e8c8a0",
    url:"https://madebykara.com/the-ganga-highway-student-project",
    img:"https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/a14936c1-2425-4e78-8b83-4b7b46dca2a3_carw_16x9x32.png?h=71ea468610506a289a1d4902ea243ed9",
    desc:"Student project — identity for The Ganga Highway. A cultural brand rooted in the journey, not the destination." },
  { id:"13", code:"PAR-0323", title:"Analog The Room Rebrand",   cat:"Rebranding",     year:"2023", color:"#c0b8d4",
    url:"https://madebykara.com/analog-the-room-rebranding-student-project",
    img:"https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/cd54306d-138c-4354-bf2c-421488547f2b_carw_16x9x32.jpg?h=aff9bd3347f40532b8c96aceb6f2d911",
    desc:"Rebrand for Analog The Room — a hospitality venue. Retained the analogue soul while carving a sharper visual identity." },
];

// Is a hex colour dark? (decides ink vs paper text over a project bg)
const isDarkColor = (hex) => {
  const c = hex.replace("#", "");
  const r = parseInt(c.substr(0, 2), 16), g = parseInt(c.substr(2, 2), 16), b = parseInt(c.substr(4, 2), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) < 128;
};

// thumbnails for a project's filmstrip — prefer local detail images, fallback to cover
const stripFor = (id, cover) => {
  const arr = PROJECT_IMAGES[id];
  if (arr && arr.length) return arr.slice(0, 5);
  return [cover, cover, cover, cover];
};

// ─────────────────────────────────────────────────────────────────────────────
// CURSOR — dot + ring, mix-blend difference, lerp 0.12, VIEW/OPEN label
// ─────────────────────────────────────────────────────────────────────────────
function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const dot  = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const tgt  = useRef({ x: -100, y: -100 });
  const size = useRef(8);
  const typeRef = useRef("default");

  useEffect(() => {
    const mv = e => { tgt.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", mv);

    const enter = e => { typeRef.current = e.currentTarget.dataset.cur || "link"; };
    const leave = () => { typeRef.current = "default"; };
    const attach = () => {
      document.querySelectorAll("a,button,[data-cur]").forEach(el => {
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
      const t = typeRef.current;
      const targetSize = t === "default" ? 8 : 40;

      dot.current.x += (tgt.current.x - dot.current.x) * 0.35;
      dot.current.y += (tgt.current.y - dot.current.y) * 0.35;
      ring.current.x += (tgt.current.x - ring.current.x) * 0.12;
      ring.current.y += (tgt.current.y - ring.current.y) * 0.12;
      size.current += (targetSize - size.current) * 0.18;

      const s = size.current;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dot.current.x - 4}px,${dot.current.y - 4}px)`;
        dotRef.current.style.opacity = t === "default" ? "1" : "0";
      }
      if (ringRef.current) {
        ringRef.current.style.width = `${s}px`;
        ringRef.current.style.height = `${s}px`;
        ringRef.current.style.transform = `translate(${ring.current.x - s / 2}px,${ring.current.y - s / 2}px)`;
        ringRef.current.style.borderWidth = t === "default" ? "0px" : "1px";
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${ring.current.x}px,${ring.current.y}px) translate(-50%,-50%)`;
        labelRef.current.style.opacity = t === "view" ? "1" : "0";
        labelRef.current.textContent = "OPEN";
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", mv); cancelAnimationFrame(raf); mo.disconnect(); };
  }, []);

  const base = { position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 100000, mixBlendMode: "difference" };
  return (
    <>
      <div ref={dotRef} style={{ ...base, width: 8, height: 8, borderRadius: "50%", background: "#fff", willChange: "transform" }} />
      <div ref={ringRef} style={{ ...base, width: 8, height: 8, borderRadius: "50%", border: "1px solid #fff", willChange: "transform, width, height" }} />
      <div ref={labelRef} style={{ ...base, color: "#fff", fontFamily: SANS, fontSize: 8, letterSpacing: ".2em", fontWeight: 500, opacity: 0, willChange: "transform" }} />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NAV + fullscreen menu overlay
// ─────────────────────────────────────────────────────────────────────────────
function Nav({ ready, onOpenProject }) {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menu]);

  const go = (hash) => { setMenu(false); setTimeout(() => { document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }); }, 350); };

  return (
    <>
      {/* top bar */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 52, zIndex: 9000,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 28px", borderBottom: `1px solid ${BORDER}`,
        background: "rgba(204,200,192,0.8)", backdropFilter: "blur(10px)",
      }}>
        <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          style={{ display: "flex", alignItems: "center", textDecoration: "none",
            opacity: ready ? 1 : 0, transform: ready ? "translateY(0)" : "translateY(8px)",
            transition: "opacity .6s ease, transform .6s ease" }}>
          <img src="/images/logo/kara-black-logo.svg" alt="KARA" style={{ height: 16, display: "block" }} />
        </a>
        <button onClick={() => setMenu(true)}
          style={{ background: "none", border: "none", cursor: "none", padding: 0,
            fontFamily: SANS, fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: INK,
            display: "flex", alignItems: "center", gap: 9,
            opacity: ready ? 1 : 0, transform: ready ? "translateY(0)" : "translateY(8px)",
            transition: "opacity .6s ease .1s, transform .6s ease .1s" }}>
          <span style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <span style={{ width: 16, height: 1, background: INK, display: "block" }} />
            <span style={{ width: 16, height: 1, background: INK, display: "block" }} />
          </span>
          Menu
        </button>
      </header>

      {/* fullscreen overlay */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 9500, background: DARK_BG,
        clipPath: menu ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
        transition: "clip-path .6s cubic-bezier(.76,0,.24,1)",
        display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "52px 28px 36px",
        pointerEvents: menu ? "all" : "none",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <img src="/images/logo/kara-white-logo.svg" alt="KARA" style={{ height: 16 }} />
          <button onClick={() => setMenu(false)}
            style={{ background: "none", border: "none", cursor: "none", color: "#e8e4de",
              fontFamily: SANS, fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 9 }}>
            Close <span style={{ fontSize: 16, lineHeight: 1 }}>×</span>
          </button>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {[["Work", "#work"], ["About", "#about"], ["Contact", "#contact"]].map(([label, hash], i) => (
            <button key={hash} onClick={() => go(hash)}
              style={{ background: "none", border: "none", cursor: "none", textAlign: "left", padding: 0,
                fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, color: "#e8e4de",
                fontSize: "clamp(56px,9vw,128px)", lineHeight: 1.02, letterSpacing: "-.02em",
                opacity: menu ? 1 : 0, transform: menu ? "translateY(0)" : "translateY(40px)",
                transition: `opacity .6s ease ${0.2 + i * 0.08}s, transform .7s cubic-bezier(.16,1,.3,1) ${0.2 + i * 0.08}s` }}>
              {label}
            </button>
          ))}
        </nav>

        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
          opacity: menu ? 1 : 0, transition: "opacity .6s ease .5s",
          fontFamily: SANS, fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(232,228,222,0.45)" }}>
          <span>Dubai, UAE</span>
          <a href="mailto:hello@madebykara.com" style={{ color: "rgba(232,228,222,0.45)", textDecoration: "none" }}>hello@madebykara.com</a>
          <span>Available for work</span>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO — intro animation
// ─────────────────────────────────────────────────────────────────────────────
function Hero({ ready }) {
  const Clip = ({ children, delay, italic, weight, size }) => (
    <span style={{ display: "block", overflow: "hidden" }}>
      <span style={{
        display: "block",
        fontFamily: italic ? SERIF : SANS,
        fontStyle: italic ? "italic" : "normal",
        fontWeight: weight, fontSize: size, lineHeight: 1.0, letterSpacing: italic ? "-.01em" : "-.03em",
        color: INK,
        transform: ready ? "translateY(0)" : "translateY(110%)",
        transition: `transform .9s cubic-bezier(.16,1,.3,1) ${delay}s`,
      }}>{children}</span>
    </span>
  );

  return (
    <section id="top" style={{
      minHeight: "100vh", background: BG, position: "relative",
      display: "flex", flexDirection: "column", justifyContent: "flex-end",
      padding: "0 28px 0", borderBottom: `1px solid ${BORDER}`,
    }}>
      {/* top label */}
      <div style={{ position: "absolute", top: 84, left: 28,
        opacity: ready ? 1 : 0, transform: ready ? "translateY(0)" : "translateY(10px)",
        transition: "opacity .7s ease .3s, transform .7s ease .3s",
        fontFamily: SANS, fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: MUTED }}>
        Brand &amp; Creative Designer · Dubai
      </div>

      {/* headline */}
      <div style={{ paddingBottom: 40 }}>
        <Clip italic weight={400} size="clamp(54px,11vw,168px)" delay={0.5}>Be the audience.</Clip>
        <Clip weight={700} size="clamp(54px,11vw,168px)" delay={0.62}>Build the brand.</Clip>
      </div>

      {/* bottom row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20,
        paddingBottom: 40,
        opacity: ready ? 1 : 0, transition: "opacity .8s ease 1.1s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#3a7d44", display: "block",
            boxShadow: "0 0 0 0 rgba(58,125,68,.5)", animation: "pulse 2.4s infinite" }} />
          <span style={{ fontFamily: SANS, fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: INK }}>
            Available for work
          </span>
        </div>
        <p style={{ fontFamily: SANS, fontSize: 13, lineHeight: 1.6, color: MUTED, maxWidth: 320, fontWeight: 400 }}>
          Building brands that say something across FMCG, lifestyle, hospitality and tech.
        </p>
      </div>
    </section>
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
        if (e.isIntersecting && e.intersectionRatio >= 0.5) {
          onActiveBg(PROJECTS[parseInt(e.target.dataset.idx)].color);
        }
      });
    }, { threshold: 0.5 });
    refs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, [onActiveBg]);

  return (
    <section id="work" style={{ padding: "0 28px 80px" }}>
      {/* heading */}
      <div style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: `1px solid ${BORDER}`, position: "sticky", top: 52, background: "inherit", zIndex: 50 }}>
        <span style={{ fontFamily: SANS, fontSize: 11, letterSpacing: ".24em", textTransform: "uppercase", color: INK }}>Selected Work</span>
        <span style={{ fontFamily: SANS, fontSize: 11, letterSpacing: ".24em", textTransform: "uppercase", color: MUTED }}>13 Projects</span>
      </div>

      {PROJECTS.map((p, i) => (
        <FolderCard
          key={p.id}
          project={p}
          index={i}
          cardRef={el => refs.current[i] = el}
          onOpen={() => onOpen(i)}
        />
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
    <div
      ref={setRefs}
      data-idx={index}
      style={{ position: "sticky", top: `calc(116px + ${index * 2}px)`, paddingTop: 24 }}
    >
      <div
        data-cur="view"
        onClick={onOpen}
        style={{
          background: PAPER, borderRadius: "6px 6px 0 0", overflow: "hidden",
          border: `1px solid ${BORDER}`, borderBottom: "none",
          boxShadow: "0 -8px 40px rgba(17,17,17,0.06)",
          transform: vis ? "translateY(0)" : "translateY(60px)",
          opacity: vis ? 1 : 0,
          transition: "transform .9s cubic-bezier(.16,1,.3,1), opacity .9s ease",
          cursor: "none",
        }}>
        {/* TAB ROW */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 22px", borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, minWidth: 0 }}>
            <span style={{ fontFamily: SANS, fontSize: 10, letterSpacing: ".14em", color: MUTED, whiteSpace: "nowrap" }}>{project.code}</span>
            <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 22, color: INK, letterSpacing: "-.01em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{project.title}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18, flexShrink: 0 }}>
            <span style={{ fontFamily: SANS, fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: MUTED }}>{project.cat}</span>
            <span style={{ fontFamily: SANS, fontSize: 10, letterSpacing: ".16em", color: INK }}>{project.year}</span>
          </div>
        </div>

        {/* IMAGE 16/9 */}
        <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", overflow: "hidden", background: project.color }}>
          <img src={project.img} alt={project.title} loading="lazy"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>

        {/* FILMSTRIP */}
        <div style={{ display: "flex", gap: 8, padding: "12px 22px 16px" }}>
          {strip.map((src, k) => (
            <div key={k} style={{ width: 64, height: 40, borderRadius: 2, overflow: "hidden", flexShrink: 0, background: project.color }}>
              <img src={src} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          ))}
          <div style={{ marginLeft: "auto", alignSelf: "center", fontFamily: SANS, fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: MUTED }}>
            {project.id} / 13
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SERVICES TREE
// ─────────────────────────────────────────────────────────────────────────────
const TREE = [
  { id: "brand", label: "Brand Identity", children: ["Logo Design", "Visual Systems", "Brand Guidelines"] },
  { id: "art", label: "Art Direction", children: ["Social Media Content", "Campaign Visuals", "Photography Direction"] },
  { id: "digital", label: "Digital Design", children: ["Social Media Design", "Email Design", "Digital Ads"] },
  { id: "print", label: "Print & Packaging", children: ["Label Design", "Company Profiles"] },
  { id: "strategy", label: "Strategy", children: ["Brand Auditing", "Visual Consulting"] },
];

function ServicesTree() {
  const [open, setOpen] = useState(() => new Set(["brand"]));
  const toggle = (id) => setOpen(prev => {
    const n = new Set(prev);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });

  return (
    <section style={{ background: DARK_BG, color: "#e8e4de", padding: "100px 28px 110px" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 56, flexWrap: "wrap", gap: 12 }}>
        <h2 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(40px,6vw,84px)", letterSpacing: "-.02em", color: "#e8e4de" }}>What I Do</h2>
        <span style={{ fontFamily: SANS, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(232,228,222,0.4)" }}>Services Tree</span>
      </div>

      {/* root node */}
      <div style={{ fontFamily: SANS, fontSize: 13, letterSpacing: ".04em", color: "#e8e4de", paddingBottom: 22, marginBottom: 8, borderBottom: "1px solid rgba(232,228,222,0.12)", display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#e8e4de", display: "block" }} />
        KARA — Brand &amp; Creative Design
      </div>

      <div style={{ paddingLeft: 4 }}>
        {TREE.map((node, i) => {
          const isOpen = open.has(node.id);
          return (
            <div key={node.id} style={{ borderBottom: i < TREE.length - 1 ? "1px solid rgba(232,228,222,0.1)" : "none" }}>
              <button onClick={() => toggle(node.id)}
                style={{ width: "100%", background: "none", border: "none", cursor: "none", color: "#e8e4de",
                  display: "flex", alignItems: "center", gap: 16, padding: "20px 8px", textAlign: "left" }}>
                <span style={{ fontFamily: SANS, fontSize: 15, width: 16, textAlign: "center", color: "rgba(232,228,222,0.6)" }}>{isOpen ? "−" : "+"}</span>
                <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(24px,3vw,40px)", letterSpacing: "-.01em" }}>{node.label}</span>
                <span style={{ marginLeft: "auto", fontFamily: SANS, fontSize: 10, letterSpacing: ".16em", color: "rgba(232,228,222,0.35)" }}>
                  {String(node.children.length).padStart(2, "0")}
                </span>
              </button>
              <div style={{ maxHeight: isOpen ? 500 : 0, overflow: "hidden", transition: "max-height .5s cubic-bezier(.16,1,.3,1)" }}>
                <div style={{ paddingLeft: 40, paddingBottom: 14 }}>
                  {node.children.map((c) => (
                    <div key={c} style={{ display: "flex", alignItems: "center", gap: 14, padding: "9px 0",
                      fontFamily: SANS, fontSize: 14, color: "rgba(232,228,222,0.6)" }}>
                      <span style={{ width: 18, height: 1, background: "rgba(232,228,222,0.3)", display: "block" }} />
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────────────────────────────────────
function About() {
  const stats = [["2+", "Years freelance"], ["13", "Projects"], ["4", "Industries"], ["BA", "MDX Dubai"]];
  const tags = ["Brand Identity", "Art Direction", "Logo Design", "Social Media", "Rebranding", "Strategy"];
  return (
    <section id="about" style={{ background: BG, padding: "100px 28px 110px", borderBottom: `1px solid ${BORDER}` }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}>
        <h2 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(32px,4.4vw,64px)", lineHeight: 1.08, letterSpacing: "-.02em", color: INK }}>
          I design brands that say something — not just look the part.
        </h2>
        <div>
          <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.85, color: "rgba(17,17,17,0.66)", marginBottom: 20 }}>
            I'm Karan Sandhu — a freelance brand and creative designer operating out of Dubai. My work spans FMCG, lifestyle, hospitality, and tech.
          </p>
          <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.85, color: "rgba(17,17,17,0.66)", marginBottom: 36 }}>
            My philosophy: be the audience first, then build the visual language they respond to. No templates, no filler — work that endures.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: BORDER, marginBottom: 36 }}>
            {stats.map(([n, l]) => (
              <div key={l} style={{ background: BG, padding: "22px 18px" }}>
                <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 44, color: INK, lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: SANS, fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase", color: MUTED, marginTop: 6 }}>{l}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {tags.map(t => (
              <span key={t} style={{ fontFamily: SANS, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(17,17,17,0.55)", border: `1px solid ${BORDER}`, borderRadius: 100, padding: "7px 14px" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT / FOOTER
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
    } catch (e) { /* clipboard unavailable — still confirm to the user */ }
    setToast(true);
    setTimeout(() => setToast(false), 1800);
  };
  const socials = [["madebykara.com", "https://madebykara.com"], ["Upwork", "https://upwork.com"], ["Fiverr", "https://fiverr.com"], ["Instagram", "https://instagram.com"], ["LinkedIn", "https://linkedin.com"]];

  return (
    <section id="contact" style={{ background: DARK_BG, color: "#e8e4de", padding: "100px 28px 28px", position: "relative" }}>
      <h2 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(52px,9vw,150px)", letterSpacing: "-.03em", lineHeight: .98, marginBottom: 72 }}>
        Let's get to work.
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, paddingBottom: 64 }}>
        {/* left — contact person */}
        <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg,#3a3a3a,#1a1a1a)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SERIF, fontStyle: "italic", fontSize: 20, color: "#e8e4de" }}>K</div>
          <div>
            <div style={{ fontFamily: SANS, fontSize: 15, color: "#e8e4de", marginBottom: 3 }}>Karan Sandhu</div>
            <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(232,228,222,0.4)", marginBottom: 14 }}>Brand Designer</div>
            <button onClick={copyEmail}
              style={{ background: "none", border: "none", cursor: "none", padding: 0, color: "#e8e4de",
                fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(20px,2.4vw,32px)", letterSpacing: "-.01em",
                borderBottom: "1px solid rgba(232,228,222,0.25)", paddingBottom: 2 }}>
              hello@madebykara.com
            </button>
          </div>
        </div>

        {/* right — socials */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {socials.map(([l, h]) => (
            <a key={l} href={h} target="_blank" rel="noreferrer"
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0",
                borderBottom: "1px solid rgba(232,228,222,0.1)", textDecoration: "none",
                fontFamily: SANS, fontSize: 15, color: "#e8e4de" }}>
              {l}<span style={{ fontSize: 13, color: "rgba(232,228,222,0.4)" }}>↗</span>
            </a>
          ))}
        </div>
      </div>

      <div style={{ height: 1, background: "rgba(232,228,222,0.12)" }} />

      {/* footer bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 0", flexWrap: "wrap", gap: 12 }}>
        <img src="/images/logo/kara-white-logo.svg" alt="KARA" style={{ height: 13, opacity: 0.7 }} />
        <div style={{ display: "flex", gap: 24 }}>
          {[["Work", "#work"], ["About", "#about"], ["Contact", "#contact"]].map(([l, h]) => (
            <a key={h} href={h} style={{ fontFamily: SANS, fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(232,228,222,0.5)", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
        <div style={{ fontFamily: SANS, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(232,228,222,0.35)" }}>
          © 2026 Karan Sandhu · Dubai
        </div>
      </div>

      {/* back to top */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{ position: "absolute", right: 28, bottom: 80, width: 44, height: 44, borderRadius: "50%",
          border: "1px solid rgba(232,228,222,0.25)", background: "none", cursor: "none", color: "#e8e4de", fontSize: 16 }}>
        ↑
      </button>

      {/* toast */}
      <div style={{ position: "fixed", bottom: 28, left: "50%", transform: `translateX(-50%) translateY(${toast ? 0 : 20}px)`,
        opacity: toast ? 1 : 0, transition: "opacity .3s ease, transform .3s ease", pointerEvents: "none", zIndex: 99999,
        background: "#e8e4de", color: INK, fontFamily: SANS, fontSize: 12, letterSpacing: ".08em",
        padding: "12px 22px", borderRadius: 100 }}>
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
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');
        html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
        a, button { cursor: none; }
        ::selection { background: #111; color: #ccc8c0; }
        ::-webkit-scrollbar { width: 0; height: 0; }
        @keyframes pulse {
          0%   { box-shadow: 0 0 0 0 rgba(58,125,68,.5); }
          70%  { box-shadow: 0 0 0 8px rgba(58,125,68,0); }
          100% { box-shadow: 0 0 0 0 rgba(58,125,68,0); }
        }
      `}</style>

      <Cursor />

      {projectPage !== null ? (
        <ProjectPage
          project={PROJECTS[projectPage]}
          onBack={closeProject}
          onPrev={prevProject}
          onNext={nextProject}
          totalProjects={PROJECTS.length}
          isDark={false}
        />
      ) : (
        <>
          <Nav ready={ready} />
          <main>
            <Hero ready={ready} />
            <WorkSection onActiveBg={setActiveBg} onOpen={openProject} />
            <ServicesTree />
            <About />
            <ContactFooter />
          </main>
        </>
      )}
    </div>
  );
}
