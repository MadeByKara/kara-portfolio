import { useState, useEffect, useRef, useCallback } from "react";
import ProjectPage from "./ProjectPage";

const F_SERIF = "'Helvetica', sans-serif";
const F_SANS  = "'Inter', sans-serif";

const PROJECTS = [
  {
    id: "01", title: "Social Media\n& Ads", cat: "Social Media", year: "2026",
    url: "https://madebykara.com/30-commerical-social-media-posts-ads",
    img: "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/3d0601ff-4c96-4952-bf86-d55966d453ea_rwc_0x0x1916x1080x32.jpg?h=3fe224854a35b94dfa215defd4a0a770",
    desc: "30+ commercial posts and paid ads across multiple brands. Scroll-stopping visuals built for conversion and engagement.",
  },
  {
    id: "02", title: "Parallels\nLogo", cat: "Logo Design", year: "2025",
    url: "https://madebykara.com/parallels-logo-variations",
    img: "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/65bdc620-9a44-454d-a983-75011a208ff8_carw_16x9x32.png?h=5fdc5566882bdb9cbf12c41de95ee4fa",
    desc: "Full suite of logo variations for Parallels — a mark that works across every scale, surface, and context.",
  },
  {
    id: "03", title: "CoinCooker\nIdentity", cat: "Logo Design", year: "2025",
    url: "https://madebykara.com/coincooker-brand-logo",
    img: "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/9adf83bd-e491-4c3e-aeb2-051b68c98a9e_rwc_118x30x1136x640x32.png?h=38831906379b60356e9d8b51990a2566",
    desc: "Brand mark for a crypto launchpad. Bridging financial authority with digital-native edge — BRC2.0 ecosystem.",
  },
  {
    id: "04", title: "Brand Craft\nProfile", cat: "Brand Identity", year: "2025",
    url: "https://madebykara.com/brand-craft-company-profile",
    img: "/images/brand-craft/front.webp",
    desc: "Company profile design for Brand Craft. A complete document system — from cover to case study layout.",
  },
  {
    id: "05", title: "KARA\nIdentity", cat: "Brand Identity", year: "2024",
    url: "https://madebykara.com/kara-personal-identity",
    img: "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/a45082ca-e836-4e80-83bb-efa025d05e3a_carw_16x9x32.png?h=bcb30c74439a5628036647126ffc3799",
    desc: "My own personal brand — KARA. Built around the idea of visual deliverance: being the audience before being the designer.",
  },
  {
    id: "06", title: "Donna Bella\nBranding", cat: "Brand Identity", year: "2024",
    url: "https://madebykara.com/donna-bella-branding-project",
    img: "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/497698d6-ce15-4458-ae08-7a3d60008533_carw_16x9x32.jpg?h=4be4d26c254f52a1ca092e856e0ccaaa",
    desc: "Full brand identity for Donna Bella. Feminine, refined, and contemporary — built to own a premium lifestyle space.",
  },
  {
    id: "07", title: "Faya Cafe\nBranding", cat: "Brand Identity", year: "2024",
    url: "https://madebykara.com/faya-cafe-branding",
    img: "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/ba024d9e-76bf-419d-a84d-f8aef18c53a8_carw_16x9x32.jpg?h=519da39bc3db751c852ff11841b67157",
    desc: "Identity for Faya Cafe — warm, inviting, and rooted in the culture of the space it serves. Hospitality-native design.",
  },
  {
    id: "08", title: "Greenstone\nRebrand", cat: "Rebranding", year: "2024",
    url: "https://madebykara.com/greenstone-rebranded-logo-concept",
    img: "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/4e82acfe-772a-4f7e-9569-cedeefc667e8_carw_16x9x32.jpg?h=72d94923862b357e473f864b0eec314f",
    desc: "Conceptual rebrand for Greenstone. Preserving equity while modernising the mark for a new market position.",
  },
  {
    id: "09", title: "Stygian\nCrypt", cat: "Art Direction", year: "2024",
    url: "https://madebykara.com/the-stygian-crypt-vol-1-artwork-showcase",
    img: "/images/stygian-crypt/Mockup%201.jpg",
    desc: "Art direction for Stygian Crypt Vol. 1 — a dark fantasy visual system exploring mythology through editorial design.",
  },
  {
    id: "10", title: "Digital\nArt", cat: "Digital Art", year: "2023",
    url: "https://madebykara.com/digital-art-2020-2023",
    img: "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/b5088995-23f1-4371-bea9-fbbe16b67200_carw_16x9x32.jpg?h=2baa372bd9b4e0cb5037182ddec701f2",
    desc: "Personal digital art archive 2020–2023. Explorations in texture, light, and form that shaped my visual sensibility.",
  },
  {
    id: "11", title: "Logo\nfolio", cat: "Logo Design", year: "2024",
    url: "https://madebykara.com/logofolio-2023",
    img: "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/6e42493f-29f7-4091-907a-ff8803365083_rwc_231x97x2676x1508x32.jpg?h=81e1365ea3f3209517b5160bf1dec94d",
    desc: "A collection of logomarks from 2023 — spanning food & beverage, tech, and lifestyle sectors across the UAE.",
  },
  {
    id: "12", title: "Ganga\nHighway", cat: "Brand Identity", year: "2023",
    url: "https://madebykara.com/the-ganga-highway-student-project",
    img: "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/a14936c1-2425-4e78-8b83-4b7b46dca2a3_carw_16x9x32.png?h=71ea468610506a289a1d4902ea243ed9",
    desc: "Student project — identity for The Ganga Highway. A cultural brand rooted in the journey, not the destination.",
  },
  {
    id: "13", title: "Analog\nThe Room", cat: "Rebranding", year: "2023",
    url: "https://madebykara.com/analog-the-room-rebranding-student-project",
    img: "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/cd54306d-138c-4354-bf2c-421488547f2b_carw_16x9x32.jpg?h=aff9bd3347f40532b8c96aceb6f2d911",
    desc: "Rebrand for Analog The Room — a hospitality venue. Retained the analogue soul while carving a sharper visual identity.",
  },
];
 
// ─────────────────────────────────────────────────────────────────────────────
// CURSOR — thin crosshair, no blobs
// ─────────────────────────────────────────────────────────────────────────────
function Cursor() {
  const ref = useRef(null);
  const pos = useRef({ x: -300, y: -300 });
  const tgt = useRef({ x: -300, y: -300 });
  const [type, setType] = useState("default"); // default | link | view
 
  useEffect(() => {
    const mv = e => { tgt.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", mv);
 
    const enter = e => setType(e.currentTarget.dataset.cur);
    const leave = () => setType("default");
    const attach = () => {
      document.querySelectorAll("[data-cur]").forEach(el => {
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    };
    attach();
    const mo = new MutationObserver(attach);
    mo.observe(document.body, { childList: true, subtree: true });
 
    let raf;
    const loop = () => {
      pos.current.x += (tgt.current.x - pos.current.x) * 0.12;
      pos.current.y += (tgt.current.y - pos.current.y) * 0.12;
      if (ref.current) ref.current.style.transform = `translate(${pos.current.x}px,${pos.current.y}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", mv); cancelAnimationFrame(raf); mo.disconnect(); };
  }, []);
 
  const arm = type === "view" ? 18 : type === "link" ? 12 : 9;
  return (
    <div ref={ref} style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 9999, willChange: "transform" }}>
      <div style={{ position: "absolute", top: -0.5, left: -arm, width: arm * 2, height: 1, background: "#0a0a0a", transition: "all .2s cubic-bezier(.16,1,.3,1)" }} />
      <div style={{ position: "absolute", left: -0.5, top: -arm, width: 1, height: arm * 2, background: "#0a0a0a", transition: "all .2s cubic-bezier(.16,1,.3,1)" }} />
      {type === "view" && (
        <div style={{ position: "absolute", top: 14, left: 14, fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 8, letterSpacing: ".22em", textTransform: "uppercase", color: "#0a0a0a", whiteSpace: "nowrap" }}>
          Open
        </div>
      )}
    </div>
  );
}
 
// ─────────────────────────────────────────────────────────────────────────────
// LOADER
// ─────────────────────────────────────────────────────────────────────────────
function Loader({ onDone, isDark }) {
  const [n, setN] = useState(0);
  const [out, setOut] = useState(false);
  useEffect(() => {
    let v = 0;
    const iv = setInterval(() => {
      v += Math.random() * 15 + 9;
      if (v >= 100) {
        v = 100; clearInterval(iv);
        setTimeout(() => { setOut(true); setTimeout(onDone, 600); }, 300);
      }
      setN(Math.round(v));
    }, 55);
    return () => clearInterval(iv);
  }, []);
 
  return (
    <div style={{
      position: "fixed", inset: 0, background: isDark ? "#07070A" : "#f0ede8", zIndex: 9500,
      display: "grid", gridTemplateColumns: "1fr 1fr",
      opacity: out ? 0 : 1, transition: "opacity .6s ease, background .3s",
      pointerEvents: out ? "none" : "all",
    }}>
      {/* Left */}
      <div style={{ borderRight: `1px solid ${isDark ? "rgba(228,228,228,.1)" : "rgba(10,10,10,.1)"}`, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "52px 56px", transition: "border-color .3s" }}>
        <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: ".3em", textTransform: "uppercase", color: isDark ? "rgba(228,228,228,.35)" : "rgba(10,10,10,.35)", marginBottom: 20, transition: "color .3s" }}>
          Karan Sandhu
        </p>
        <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: ".3em", textTransform: "uppercase", color: isDark ? "rgba(228,228,228,.2)" : "rgba(10,10,10,.2)", transition: "color .3s" }}>
          Brand & Creative Designer
        </p>
      </div>
      {/* Right */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-end", padding: "52px 56px" }}>
        <div style={{ fontFamily: "'Helvetica',sans-serif", fontStyle: "normal", fontSize: "clamp(80px,14vw,160px)", color: isDark ? "#E4E4E4" : "#0a0a0a", lineHeight: 1, animation: "countUp .1s linear", transition: "color .3s" }}>
          {String(n).padStart(2, "0")}
        </div>
      </div>
      {/* Bottom line */}
      <div style={{ position: "absolute", bottom: 0, left: 0, height: 2, background: isDark ? "#E4E4E4" : "#0a0a0a", width: `${n}%`, transition: "width .08s linear, background .3s" }} />
    </div>
  );
}
 
// ─────────────────────────────────────────────────────────────────────────────
// PERSISTENT 3-COLUMN CHROME (nav + side rails)
// ─────────────────────────────────────────────────────────────────────────────
function Chrome({ activeProject, isDark, onToggleDark }) {
  const p = PROJECTS[activeProject] || PROJECTS[0];
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false }) + " GST");
    };
    tick();
    const iv = setInterval(tick, 10000);
    return () => clearInterval(iv);
  }, []);
 
  return (
    <>
      {/* TOP NAV — spans full width above 3 cols */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
        height: 64,
        display: "grid",
        gridTemplateColumns: "220px 1fr 220px",
        borderBottom: `1px solid ${isDark ? "rgba(228,228,228,.1)" : "rgba(10,10,10,.1)"}`,
        background: isDark ? "#07070A" : "#f0ede8",
        transition: "background .3s, border-color .3s",
      }}>
        <div style={{ borderRight: `1px solid ${isDark ? "rgba(228,228,228,.1)" : "rgba(10,10,10,.1)"}`, display: "flex", alignItems: "center", padding: "0 28px" }}>
          <a href="#" data-cur="link" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            <img src={isDark ? "/images/logo/Logo-white.png" : "/images/logo/Logo-black.png"} alt="KARA" style={{ height: 22, display: "block" }} />
          </a>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 56 }}>
          {[["#work", "Work"], ["#about", "About"], ["#contact", "Contact"]].map(([h, l]) => (
            <a key={h} href={h} data-cur="link"
              style={{ fontFamily: "'Helvetica',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: isDark ? "rgba(228,228,228,.45)" : "rgba(10,10,10,.45)", textDecoration: "none", transition: "color .2s" }}
              onMouseEnter={e => e.currentTarget.style.color = isDark ? "#E4E4E4" : "#0a0a0a"}
              onMouseLeave={e => e.currentTarget.style.color = isDark ? "rgba(228,228,228,.45)" : "rgba(10,10,10,.45)"}>
              {l}
            </a>
          ))}
        </div>
        <div style={{ borderLeft: `1px solid ${isDark ? "rgba(228,228,228,.1)" : "rgba(10,10,10,.1)"}`, display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 28px", gap: 16 }}>
          <button onClick={onToggleDark} data-cur="link"
            style={{ fontFamily: "'Helvetica',sans-serif", fontWeight: 500, fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: isDark ? "#E4E4E4" : "#0a0a0a", background: "none", border: "none", cursor: "none", padding: 0, textDecoration: "none", transition: "color .3s" }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.6"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
            {isDark ? "☀️" : "🌙"}
          </button>
          <a href="#contact" data-cur="link"
            style={{ fontFamily: "'Helvetica',sans-serif", fontWeight: 500, fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: isDark ? "#E4E4E4" : "#0a0a0a", textDecoration: "none", borderBottom: `1px solid ${isDark ? "rgba(228,228,228,.3)" : "rgba(10,10,10,.3)"}`, paddingBottom: 1, transition: "color .3s" }}>
            Hire Me
          </a>
        </div>
      </div>
 
      {/* LEFT RAIL — project title */}
      <div style={{
        position: "fixed", top: 64, left: 0, bottom: 0, width: 220,
        borderRight: `1px solid ${isDark ? "rgba(228,228,228,.1)" : "rgba(10,10,10,.1)"}`,
        display: "flex", flexDirection: "column",
        justifyContent: "space-between",
        padding: "40px 28px",
        zIndex: 400,
        background: isDark ? "#07070A" : "#f0ede8",
        pointerEvents: "none",
        transition: "background .3s, border-color .3s",
      }}>
        {/* Index */}
        <div>
          <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 9, letterSpacing: ".3em", textTransform: "uppercase", color: isDark ? "rgba(228,228,228,.3)" : "rgba(10,10,10,.3)", marginBottom: 24, transition: "color .3s" }}>
            {p.id} — 13
          </div>
          <h2 style={{
            fontFamily: "'Helvetica',sans-serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(28px, 2.4vw, 44px)",
            lineHeight: 1.1,
            color: isDark ? "#E4E4E4" : "#0a0a0a",
            margin: 0,
            letterSpacing: "-.02em",
            whiteSpace: "pre-line",
            transition: "opacity .4s ease, color .3s",
          }}>
            {p.title}
          </h2>
        </div>
 
        {/* Bottom — time + location */}
        <div>
          <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase", color: isDark ? "rgba(228,228,228,.25)" : "rgba(10,10,10,.25)", marginBottom: 8, transition: "color .3s" }}>
            Dubai, UAE
          </div>
          <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase", color: isDark ? "rgba(228,228,228,.25)" : "rgba(10,10,10,.25)", transition: "color .3s" }}>
            {time}
          </div>
        </div>
      </div>
 
      {/* RIGHT RAIL — description + meta */}
      <div style={{
        position: "fixed", top: 64, right: 0, bottom: 0, width: 220,
        borderLeft: `1px solid ${isDark ? "rgba(228,228,228,.1)" : "rgba(10,10,10,.1)"}`,
        display: "flex", flexDirection: "column",
        justifyContent: "space-between",
        padding: "40px 28px",
        zIndex: 400,
        background: isDark ? "#07070A" : "#f0ede8",
        pointerEvents: "none",
        transition: "background .3s, border-color .3s",
      }}>
        <div>
          <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 9, letterSpacing: ".28em", textTransform: "uppercase", color: isDark ? "rgba(228,228,228,.3)" : "rgba(10,10,10,.3)", marginBottom: 20, transition: "color .3s" }}>
            {p.cat}
          </div>
          <p style={{
            fontFamily: "'Inter',sans-serif",
            fontWeight: 300,
            fontSize: 12,
            lineHeight: 1.75,
            color: isDark ? "rgba(228,228,228,.55)" : "rgba(10,10,10,.55)",
            margin: 0,
            transition: "opacity .4s ease, color .3s",
          }}>
            {p.desc}
          </p>
        </div>
 
        <div>
          <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase", color: isDark ? "rgba(228,228,228,.25)" : "rgba(10,10,10,.25)", marginBottom: 12, transition: "color .3s" }}>
            {p.year}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: isDark ? "#E4E4E4" : "#0a0a0a", opacity: .3, transition: "background .3s" }} />
            <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 9, letterSpacing: ".2em", textTransform: "uppercase", color: isDark ? "rgba(228,228,228,.3)" : "rgba(10,10,10,.3)", transition: "color .3s" }}>
              Available
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
 
// ─────────────────────────────────────────────────────────────────────────────
// HERO — full-width center, no side columns yet
// ─────────────────────────────────────────────────────────────────────────────
function Hero({ isDark }) {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 100); return () => clearTimeout(t); }, []);
 
  return (
    <section style={{
      height: "100vh",
      marginLeft: 220, marginRight: 220,
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: "0 0 52px 0",
      background: isDark ? "#07070A" : "#0a0a0a",
      transition: "background .3s",
    }}>
      {/* Full bleed image */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${PROJECTS[8].img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: isDark ? .1 : .18,
        transform: vis ? "scale(1)" : "scale(1.05)",
        transition: "transform 2s cubic-bezier(.16,1,.3,1), opacity .3s",
      }} />
      <div style={{ position: "absolute", inset: 0, background: isDark ? "linear-gradient(to top, #07070A 0%, rgba(7,7,10,.15) 70%)" : "linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,.15) 70%)", transition: "background .3s" }} />
 
      {/* Text */}
      <div style={{ position: "relative", zIndex: 2, padding: "0 52px" }}>
        <div style={{ overflow: "hidden", marginBottom: 8 }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: ".3em", textTransform: "uppercase", color: "rgba(255,255,255,.4)", margin: 0, transform: vis ? "translateY(0)" : "translateY(100%)", transition: "transform .8s cubic-bezier(.16,1,.3,1) 1.5s" }}>
            Brand & Creative Designer
          </p>
        </div>
        {[["Visual", true], ["Deliverance.", false]].map(([w, serif], i) => (
          <div key={w} style={{ overflow: "hidden" }}>
            <span style={{
              fontFamily: serif ? "'Helvetica',sans-serif" : "'Inter',sans-serif",
              fontStyle: serif ? "italic" : "normal",
              fontWeight: serif ? 300 : 700,
              fontSize: "clamp(64px, 10.5vw, 150px)",
              lineHeight: .92,
              color: "#fff",
              display: "block",
              letterSpacing: serif ? "-.01em" : "-.04em",
              transform: vis ? "translateY(0)" : "translateY(110%)",
              transition: `transform .95s cubic-bezier(.16,1,.3,1) ${1.5 + i * .15}s`,
            }}>
              {w}
            </span>
          </div>
        ))}
 
        {/* Subtitle row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 44, opacity: vis ? 1 : 0, transition: "opacity .6s 2.2s" }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,.38)", margin: 0, maxWidth: 280 }}>
            Karan Sandhu — building brands across FMCG, lifestyle, hospitality & tech.
          </p>
          <div style={{ fontFamily: "'Helvetica',sans-serif", fontStyle: "normal", fontSize: 88, color: "rgba(255,255,255,.06)", lineHeight: 1 }}>13</div>
        </div>
      </div>
 
      {/* Scroll cue */}
      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: vis ? 1 : 0, transition: "opacity .6s 2.6s" }}>
        <div style={{ width: 1, height: 44, background: "rgba(255,255,255,.25)", animation: "scrollLine 2s ease infinite" }} />
        <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 8, letterSpacing: ".3em", textTransform: "uppercase", color: "rgba(255,255,255,.25)" }}>Scroll</span>
      </div>
    </section>
  );
}
 
// ─────────────────────────────────────────────────────────────────────────────
// WORK — each project fills the center column viewport-height
// ─────────────────────────────────────────────────────────────────────────────
function WorkSection({ onActiveChange, onOpen, isDark }) {
  const itemsRef = useRef([]);
 
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting && e.intersectionRatio > 0.5) {
            onActiveChange(parseInt(e.target.dataset.idx));
          }
        });
      },
      { threshold: 0.5 }
    );
    itemsRef.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, [onActiveChange]);
 
  return (
    <section id="work" style={{ marginLeft: 220, marginRight: 220 }}>
      {/* Section label */}
      <div style={{ height: 56, borderBottom: `1px solid ${isDark ? "rgba(228,228,228,.1)" : "rgba(10,10,10,.1)"}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", background: isDark ? "#07070A" : "#f0ede8", transition: "background .3s, border-color .3s" }}>
        <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 9, letterSpacing: ".3em", textTransform: "uppercase", color: isDark ? "rgba(228,228,228,.35)" : "rgba(10,10,10,.35)", transition: "color .3s" }}>
          Selected Work
        </span>
        <span style={{ fontFamily: "'Helvetica',sans-serif", fontStyle: "normal", fontSize: 13, color: isDark ? "rgba(228,228,228,.3)" : "rgba(10,10,10,.3)", transition: "color .3s" }}>
          13 projects, 2023–2026
        </span>
      </div>
 
      {PROJECTS.map((p, i) => (
        <div
          key={p.id}
          ref={el => itemsRef.current[i] = el}
          data-idx={i}
          data-cur="view"
          onClick={() => onOpen(i)}
          style={{
            height: "100vh",
            position: "relative",
            overflow: "hidden",
            borderBottom: `1px solid ${isDark ? "rgba(228,228,228,.08)" : "rgba(10,10,10,.08)"}`,
            cursor: "none",
            transition: "border-color .3s",
          }}
        >
          <ProjectImage project={p} isDark={isDark} />
        </div>
      ))}
    </section>
  );
}
 
function ProjectImage({ project, isDark }) {
  const [hov, setHov] = useState(false);
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
 
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
 
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ position: "absolute", inset: 0 }}
    >
      <img
        src={project.img}
        alt={project.title}
        style={{
          width: "100%", height: "100%",
          objectFit: "cover",
          display: "block",
          transform: hov ? "scale(1.025)" : vis ? "scale(1)" : "scale(1.04)",
          transition: hov
            ? "transform 1.2s cubic-bezier(.16,1,.3,1)"
            : "transform 1.4s cubic-bezier(.16,1,.3,1)",
          opacity: vis ? 1 : 0,
        }}
      />
 
      {/* Obys-style bottom-left project counter */}
      <div style={{
        position: "absolute",
        bottom: 28, left: 32,
        fontFamily: "'Helvetica',sans-serif",
        fontStyle: "normal",
        fontSize: 96,
        color: "rgba(255,255,255,.1)",
        lineHeight: 1,
        pointerEvents: "none",
        userSelect: "none",
      }}>
        {project.id}
      </div>
 
      {/* Open hint top right */}
      <div style={{
        position: "absolute",
        top: 24, right: 24,
        fontFamily: "'Inter',sans-serif",
        fontWeight: 500, fontSize: 8,
        letterSpacing: ".25em", textTransform: "uppercase",
        color: "rgba(255,255,255,.5)",
        border: "1px solid rgba(255,255,255,.25)",
        padding: "6px 12px",
        opacity: hov ? 1 : 0,
        transition: "opacity .3s",
      }}>
        View Project ↗
      </div>
    </div>
  );
}
 
// ─────────────────────────────────────────────────────────────────────────────
// MARQUEE
// ─────────────────────────────────────────────────────────────────────────────
function Marquee({ isDark }) {
  const words = ["Being the Audience", "Visual Deliverance", "Brand Identity", "Logo Design", "Art Direction", "Rebranding", "Social Media", "Dubai"];
  const rep = [...words, ...words];
  return (
    <div style={{ marginLeft: 220, marginRight: 220, overflow: "hidden", borderBottom: `1px solid ${isDark ? "rgba(228,228,228,.1)" : "rgba(10,10,10,.1)"}`, borderTop: `1px solid ${isDark ? "rgba(228,228,228,.1)" : "rgba(10,10,10,.1)"}`, padding: "18px 0", background: isDark ? "#07070A" : "#f0ede8", transition: "background .3s, border-color .3s" }}>
      <div style={{ display: "flex", whiteSpace: "nowrap", animation: "mq 30s linear infinite" }}>
        {rep.map((w, i) => (
          <span key={i} style={{ fontFamily: "'Helvetica',sans-serif", fontStyle: "normal", fontSize: 26, color: isDark ? "#E4E4E4" : "#0a0a0a", paddingRight: 52, display: "inline-flex", alignItems: "center", gap: 52, transition: "color .3s" }}>
            {w}
            {i < rep.length - 1 && <span style={{ fontFamily: "'Inter',sans-serif", fontStyle: "normal", fontSize: 6, opacity: .3 }}>✦</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
 
// ─────────────────────────────────────────────────────────────────────────────
// ABOUT — same 3-col grid approach
// ─────────────────────────────────────────────────────────────────────────────
function About({ isDark }) {
  return (
    <section id="about" style={{ marginLeft: 220, marginRight: 220, background: isDark ? "#07070A" : "#f0ede8", borderBottom: `1px solid ${isDark ? "rgba(228,228,228,.1)" : "rgba(10,10,10,.1)"}`, transition: "background .3s, border-color .3s" }}>
      {/* Header row */}
      <div style={{ height: 56, borderBottom: `1px solid ${isDark ? "rgba(228,228,228,.1)" : "rgba(10,10,10,.1)"}`, display: "flex", alignItems: "center", padding: "0 40px", transition: "border-color .3s" }}>
        <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 9, letterSpacing: ".3em", textTransform: "uppercase", color: isDark ? "rgba(228,228,228,.25)" : "rgba(10,10,10,.25)", transition: "color .3s" }}>
          About
        </span>
      </div>
 
      {/* Content */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "60vh" }}>
        {/* Left */}
        <div style={{ padding: "64px 52px", borderRight: `1px solid ${isDark ? "rgba(228,228,228,.1)" : "rgba(10,10,10,.1)"}`, display: "flex", flexDirection: "column", justifyContent: "space-between", transition: "border-color .3s" }}>
          <h2 style={{ fontFamily: "'Helvetica',sans-serif", fontStyle: "normal", fontWeight: 700, fontSize: "clamp(36px,4vw,60px)", color: isDark ? "#fff" : "#0a0a0a", lineHeight: 1.1, letterSpacing: "-.02em", margin: 0, transition: "color .3s" }}>
            I design brands that say something.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: isDark ? "rgba(255,255,255,.06)" : "rgba(10,10,10,.06)", marginTop: 52, transition: "background .3s" }}>
            {[["2+", "Yrs freelance"], ["13", "Projects"], ["4", "Industries"], ["BA", "MDX Dubai '23"]].map(([n, l]) => (
              <div key={l} style={{ padding: "24px 20px", background: isDark ? "#07070A" : "#f0ede8", transition: "background .3s" }}>
                <div style={{ fontFamily: "'Helvetica',sans-serif", fontStyle: "normal", fontSize: 48, color: isDark ? "#fff" : "#0a0a0a", lineHeight: 1, transition: "color .3s" }}>{n}</div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 8, letterSpacing: ".22em", textTransform: "uppercase", color: isDark ? "rgba(255,255,255,.25)" : "rgba(10,10,10,.25)", marginTop: 4, transition: "color .3s" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Right */}
        <div style={{ padding: "64px 52px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 15, lineHeight: 1.9, color: isDark ? "rgba(255,255,255,.45)" : "rgba(10,10,10,.45)", marginBottom: 24, transition: "color .3s" }}>
              I'm Karan — a freelance brand and graphic designer operating out of Dubai. My work spans FMCG, lifestyle, hospitality, and tech.
            </p>
            <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 15, lineHeight: 1.9, color: isDark ? "rgba(255,255,255,.45)" : "rgba(10,10,10,.45)", transition: "color .3s" }}>
              My philosophy: be the audience first, build the visual language they respond to. No templates. No filler. Work that endures.
            </p>
          </div>
          <div>
            <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 9, letterSpacing: ".25em", textTransform: "uppercase", color: isDark ? "rgba(255,255,255,.2)" : "rgba(10,10,10,.2)", marginBottom: 16, transition: "color .3s" }}>
              Find me on
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[["madebykara.com", "https://madebykara.com"], ["Upwork", "https://upwork.com"], ["Fiverr", "https://fiverr.com"]].map(([l, h]) => (
                <a key={l} href={h} target="_blank" rel="noreferrer" data-cur="link"
                  style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase", color: isDark ? "rgba(255,255,255,.35)" : "rgba(10,10,10,.35)", textDecoration: "none", padding: "7px 14px", border: `1px solid ${isDark ? "rgba(255,255,255,.12)" : "rgba(10,10,10,.12)"}`, transition: "all .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = isDark ? "#fff" : "#0a0a0a"; e.currentTarget.style.color = isDark ? "#fff" : "#0a0a0a"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = isDark ? "rgba(255,255,255,.12)" : "rgba(10,10,10,.12)"; e.currentTarget.style.color = isDark ? "rgba(255,255,255,.35)" : "rgba(10,10,10,.35)"; }}>
                  {l} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
 
// ─────────────────────────────────────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────────────────────────────────────
function Contact({ isDark }) {
  return (
    <section id="contact" style={{ marginLeft: 220, marginRight: 220, background: isDark ? "#07070A" : "#f0ede8", position: "relative", overflow: "hidden", transition: "background .3s" }}>
      <div style={{ height: 56, borderBottom: `1px solid ${isDark ? "rgba(228,228,228,.1)" : "rgba(10,10,10,.1)"}`, display: "flex", alignItems: "center", padding: "0 40px", transition: "border-color .3s" }}>
        <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 9, letterSpacing: ".3em", textTransform: "uppercase", color: isDark ? "rgba(228,228,228,.35)" : "rgba(10,10,10,.35)", transition: "color .3s" }}>
          Let's Work
        </span>
      </div>
 
      <div style={{ padding: "80px 52px 96px", position: "relative", zIndex: 2 }}>
        <div style={{ position: "absolute", bottom: -40, right: 0, lineHeight: 1, pointerEvents: "none" }}>
          <img src={isDark ? "/images/logo/Logo-white.png" : "/images/logo/Logo-black.png"} alt="" style={{ height: "clamp(100px,18vw,220px)", opacity: isDark ? 0.04 : 0.04, display: "block" }} />
        </div>

        <h2 style={{ fontFamily: "'Helvetica',sans-serif", fontStyle: "normal", fontWeight: 700, fontSize: "clamp(48px,6.5vw,96px)", color: isDark ? "#E4E4E4" : "#0a0a0a", lineHeight: .96, letterSpacing: "-.03em", margin: "0 0 40px", maxWidth: 600, transition: "color .3s" }}>
          Have a brand that needs a voice?
        </h2>

        <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 14, lineHeight: 1.85, color: isDark ? "rgba(228,228,228,.45)" : "rgba(10,10,10,.45)", maxWidth: 400, marginBottom: 52, transition: "color .3s" }}>
          Open for freelance work — branding, visual identity, logo design, social media, and art direction.
        </p>

        <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", marginBottom: 64 }}>
          <a href="mailto:hello@madebykara.com" data-cur="link"
            style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 11, letterSpacing: ".15em", textTransform: "uppercase", background: isDark ? "#E4E4E4" : "#0a0a0a", color: isDark ? "#0a0a0a" : "#f0ede8", padding: "16px 36px", textDecoration: "none", transition: "background .25s, color .25s", display: "inline-flex", alignItems: "center", gap: 12 }}
            onMouseEnter={e => { e.currentTarget.style.background = isDark ? "#bbb" : "#333"; }}
            onMouseLeave={e => { e.currentTarget.style.background = isDark ? "#E4E4E4" : "#0a0a0a"; }}>
            Start a Project →
          </a>
          <a href="https://madebykara.com" target="_blank" rel="noreferrer" data-cur="link"
            style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 11, letterSpacing: ".15em", textTransform: "uppercase", color: isDark ? "rgba(228,228,228,.45)" : "rgba(10,10,10,.45)", textDecoration: "none", borderBottom: `1px solid ${isDark ? "rgba(228,228,228,.25)" : "rgba(10,10,10,.25)"}`, paddingBottom: 1, transition: "color .2s, border-color .2s" }}
            onMouseEnter={e => { e.currentTarget.style.color = isDark ? "#E4E4E4" : "#0a0a0a"; e.currentTarget.style.borderColor = isDark ? "#E4E4E4" : "#0a0a0a"; }}
            onMouseLeave={e => { e.currentTarget.style.color = isDark ? "rgba(228,228,228,.45)" : "rgba(10,10,10,.45)"; e.currentTarget.style.borderColor = isDark ? "rgba(228,228,228,.25)" : "rgba(10,10,10,.25)"; }}>
            Full Portfolio ↗
          </a>
        </div>

        <div style={{ borderTop: `1px solid ${isDark ? "rgba(228,228,228,.1)" : "rgba(10,10,10,.1)"}`, paddingTop: 36, transition: "border-color .3s" }}>
          <a href="mailto:hello@madebykara.com" data-cur="link"
            style={{ fontFamily: "'Helvetica',sans-serif", fontStyle: "normal", fontSize: "clamp(18px,2.5vw,30px)", color: isDark ? "rgba(228,228,228,.3)" : "rgba(10,10,10,.3)", textDecoration: "none", letterSpacing: "-.01em", transition: "color .2s" }}
            onMouseEnter={e => e.currentTarget.style.color = isDark ? "#E4E4E4" : "#0a0a0a"}
            onMouseLeave={e => e.currentTarget.style.color = isDark ? "rgba(228,228,228,.3)" : "rgba(10,10,10,.3)"}>
            hello@madebykara.com
          </a>
        </div>
      </div>
    </section>
  );
}
 
// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────
function Footer({ isDark }) {
  return (
    <footer style={{ marginLeft: 220, marginRight: 220, background: isDark ? "#07070A" : "#0a0a0a", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", borderTop: `1px solid ${isDark ? "rgba(228,228,228,.1)" : "rgba(255,255,255,.06)"}`, transition: "background .3s, border-color .3s" }}>
      <div><img src="/images/logo/Logo-white.png" alt="KARA" style={{ height: 14, opacity: 0.2, display: "block" }} /></div>
      <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase", color: isDark ? "rgba(228,228,228,.15)" : "rgba(255,255,255,.15)", transition: "color .3s" }}>© 2026 Karan Sandhu — Dubai</div>
      <a href="https://madebykara.com" target="_blank" rel="noreferrer" data-cur="link"
        style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase", color: isDark ? "rgba(228,228,228,.15)" : "rgba(255,255,255,.15)", textDecoration: "none", transition: "color .2s" }}
        onMouseEnter={e => e.currentTarget.style.color = isDark ? "rgba(228,228,228,.7)" : "rgba(255,255,255,.7)"}
        onMouseLeave={e => e.currentTarget.style.color = isDark ? "rgba(228,228,228,.15)" : "rgba(255,255,255,.15)"}>
        madebykara.com ↗
      </a>
    </footer>
  );
}
 
// ─────────────────────────────────────────────────────────────────────────────
// LIGHTBOX
// ─────────────────────────────────────────────────────────────────────────────
function Lightbox({ project, onClose, onPrev, onNext, isDark }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const fn = e => { if (e.key === "Escape") onClose(); if (e.key === "ArrowRight") onNext(); if (e.key === "ArrowLeft") onPrev(); };
    window.addEventListener("keydown", fn);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", fn); };
  }, []);
 
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 8000, background: isDark ? "#1a1a1e" : "#1a1a1a", display: "grid", gridTemplateColumns: "220px 1fr 220px", gridTemplateRows: "64px 1fr 56px", animation: "lbIn .3s ease", transition: "background .3s" }}>
      {/* Top left */}
      <div style={{ borderRight: `1px solid ${isDark ? "rgba(228,228,228,.1)" : "rgba(255,255,255,.07)"}`, borderBottom: `1px solid ${isDark ? "rgba(228,228,228,.1)" : "rgba(255,255,255,.07)"}`, display: "flex", alignItems: "center", padding: "0 28px", transition: "border-color .3s" }}>
        <button onClick={onClose} data-cur="link"
          style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 9, letterSpacing: ".25em", textTransform: "uppercase", background: "none", border: "none", color: isDark ? "rgba(228,228,228,.5)" : "rgba(255,255,255,.5)", cursor: "none", padding: 0, transition: "color .2s" }}
          onMouseEnter={e => e.currentTarget.style.color = "#fff"}
          onMouseLeave={e => e.currentTarget.style.color = isDark ? "rgba(228,228,228,.5)" : "rgba(255,255,255,.5)"}>
          ← Back
        </button>
      </div>
      {/* Top center — title */}
      <div style={{ borderBottom: `1px solid ${isDark ? "rgba(228,228,228,.1)" : "rgba(255,255,255,.07)"}`, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 32px", transition: "border-color .3s" }}>
        <span style={{ fontFamily: "'Helvetica',sans-serif", fontStyle: "normal", fontSize: 20, color: isDark ? "rgba(228,228,228,.7)" : "rgba(255,255,255,.7)", letterSpacing: "-.01em", transition: "color .3s" }}>
          {project.title.replace("\n", " ")}
        </span>
      </div>
      {/* Top right */}
      <div style={{ borderLeft: `1px solid ${isDark ? "rgba(228,228,228,.1)" : "rgba(255,255,255,.07)"}`, borderBottom: `1px solid ${isDark ? "rgba(228,228,228,.1)" : "rgba(255,255,255,.07)"}`, display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 28px", transition: "border-color .3s" }}>
        <a href={project.url} target="_blank" rel="noreferrer" data-cur="link"
          style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase", color: isDark ? "#0a0a0a" : "#0a0a0a", background: isDark ? "#E4E4E4" : "#fff", padding: "8px 18px", textDecoration: "none", transition: "background .2s, color .2s" }}
          onMouseEnter={e => { e.currentTarget.style.background = isDark ? "#bbb" : "#e0ddd8"; }}
          onMouseLeave={e => { e.currentTarget.style.background = isDark ? "#E4E4E4" : "#fff"; }}>
          Open Site ↗
        </a>
      </div>
 
      {/* Left side col */}
      <div style={{ borderRight: `1px solid ${isDark ? "rgba(228,228,228,.1)" : "rgba(255,255,255,.07)"}`, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 28px 40px", transition: "border-color .3s" }}>
        <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 9, letterSpacing: ".25em", textTransform: "uppercase", color: isDark ? "rgba(228,228,228,.25)" : "rgba(255,255,255,.25)", marginBottom: 8, transition: "color .3s" }}>{project.id} / 13</div>
        <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 9, letterSpacing: ".25em", textTransform: "uppercase", color: isDark ? "rgba(228,228,228,.25)" : "rgba(255,255,255,.25)", transition: "color .3s" }}>{project.year}</div>
      </div>
 
      {/* CENTER — image */}
      <div style={{ overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <img src={project.img} alt={project.title} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block", animation: "imgPop .4s cubic-bezier(.16,1,.3,1)" }} />
      </div>
 
      {/* Right side col */}
      <div style={{ borderLeft: `1px solid ${isDark ? "rgba(228,228,228,.1)" : "rgba(255,255,255,.07)"}`, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 28px 40px", transition: "border-color .3s" }}>
        <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 9, letterSpacing: ".25em", textTransform: "uppercase", color: isDark ? "rgba(228,228,228,.25)" : "rgba(255,255,255,.25)", marginBottom: 10, transition: "color .3s" }}>{project.cat}</div>
        <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 11, lineHeight: 1.7, color: isDark ? "rgba(228,228,228,.4)" : "rgba(255,255,255,.4)", margin: 0, transition: "color .3s" }}>{project.desc}</p>
      </div>
 
      {/* Bottom left */}
      <div style={{ borderRight: `1px solid ${isDark ? "rgba(228,228,228,.1)" : "rgba(255,255,255,.07)"}`, borderTop: `1px solid ${isDark ? "rgba(228,228,228,.1)" : "rgba(255,255,255,.07)"}`, display: "flex", alignItems: "center", padding: "0 28px", transition: "border-color .3s" }}>
        <button onClick={onPrev} data-cur="link"
          style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 9, letterSpacing: ".25em", textTransform: "uppercase", background: "none", border: "none", color: isDark ? "rgba(228,228,228,.35)" : "rgba(255,255,255,.35)", cursor: "none", padding: 0, transition: "color .2s" }}
          onMouseEnter={e => e.currentTarget.style.color = "#fff"}
          onMouseLeave={e => e.currentTarget.style.color = isDark ? "rgba(228,228,228,.35)" : "rgba(255,255,255,.35)"}>
          ← Prev
        </button>
      </div>
      {/* Bottom center */}
      <div style={{ borderTop: `1px solid ${isDark ? "rgba(228,228,228,.1)" : "rgba(255,255,255,.07)"}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color .3s" }}>
        <span style={{ fontFamily: "'Helvetica',sans-serif", fontStyle: "normal", fontSize: 13, color: isDark ? "rgba(228,228,228,.2)" : "rgba(255,255,255,.2)", transition: "color .3s" }}>{project.id} of 13</span>
      </div>
      {/* Bottom right */}
      <div style={{ borderLeft: `1px solid ${isDark ? "rgba(228,228,228,.1)" : "rgba(255,255,255,.07)"}`, borderTop: `1px solid ${isDark ? "rgba(228,228,228,.1)" : "rgba(255,255,255,.07)"}`, display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 28px", transition: "border-color .3s" }}>
        <button onClick={onNext} data-cur="link"
          style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 9, letterSpacing: ".25em", textTransform: "uppercase", background: "none", border: "none", color: isDark ? "rgba(228,228,228,.35)" : "rgba(255,255,255,.35)", cursor: "none", padding: 0, transition: "color .2s" }}
          onMouseEnter={e => e.currentTarget.style.color = "#fff"}
          onMouseLeave={e => e.currentTarget.style.color = isDark ? "rgba(228,228,228,.35)" : "rgba(255,255,255,.35)"}>
          Next →
        </button>
      </div>
    </div>
  );
}
 
// ─────────────────────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);
  const [lbIdx, setLbIdx] = useState(null);
  const [projectPage, setProjectPage] = useState(null);
  const [isDark, setIsDark] = useState(false);

  const open = useCallback(i => setLbIdx(i), []);
  const close = useCallback(() => setLbIdx(null), []);
  const prev = useCallback(() => setLbIdx(i => (i - 1 + PROJECTS.length) % PROJECTS.length), []);
  const next = useCallback(() => setLbIdx(i => (i + 1) % PROJECTS.length), []);
  const toggleDark = useCallback(() => setIsDark(v => !v), []);
  const openProject  = useCallback(i  => { setProjectPage(i); window.scrollTo(0, 0); }, []);
  const closeProject = useCallback(()  => setProjectPage(null), []);
  const prevProject  = useCallback(()  => setProjectPage(i => (i - 1 + PROJECTS.length) % PROJECTS.length), []);
  const nextProject  = useCallback(()  => setProjectPage(i => (i + 1) % PROJECTS.length), []);
 
  return (
    <div style={{ background: isDark ? "#07070A" : "#f0ede8", transition: "background .3s ease" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        @import url('https://api.fontshare.com/v2/css?f[]=neue-montreal@300,400,500,600,700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{background:#f0ede8;color:#0a0a0a;cursor:none;overflow-x:hidden;-webkit-font-smoothing:antialiased}
        a,button{cursor:none}
        ::-webkit-scrollbar{width:2px}
        ::-webkit-scrollbar-track{background:#f0ede8}
        ::-webkit-scrollbar-thumb{background:#ccc}
        ::-webkit-scrollbar-thumb:hover{background:#0a0a0a}
        @keyframes scrollLine{0%{transform:scaleY(0) translateY(0);transform-origin:top}50%{transform:scaleY(1) translateY(0);transform-origin:top}51%{transform-origin:bottom}100%{transform:scaleY(0) translateY(0);transform-origin:bottom}}
        @keyframes mq{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes lbIn{from{opacity:0}to{opacity:1}}
        @keyframes imgPop{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:scale(1)}}
      `}</style>
 
      {loading && <Loader onDone={() => setLoading(false)} isDark={isDark} />}
      <Cursor />
      {!loading && projectPage === null && <Chrome activeProject={active} isDark={isDark} onToggleDark={toggleDark} />}
      {lbIdx !== null && <Lightbox project={PROJECTS[lbIdx]} onClose={close} onPrev={prev} onNext={next} isDark={isDark} />}

      {projectPage !== null ? (
        <ProjectPage project={PROJECTS[projectPage]} onBack={closeProject} onPrev={prevProject} onNext={nextProject} totalProjects={PROJECTS.length} isDark={isDark} />
      ) : (
        !loading && (
          <main style={{ paddingTop: 64 }}>
            <Hero isDark={isDark} />
            <WorkSection onActiveChange={setActive} onOpen={openProject} isDark={isDark} />
            <Marquee isDark={isDark} />
            <About isDark={isDark} />
            <Contact isDark={isDark} />
            <Footer isDark={isDark} />
          </main>
        )
      )}
    </div>
  );
}