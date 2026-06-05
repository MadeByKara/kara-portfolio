// ProjectPage.jsx
// Drop this file into src/ProjectPage.jsx
// Then follow the instructions at the bottom to wire it into App.jsx

import { useState, useEffect, useRef } from "react";

// ── copy your exact tokens from App.jsx ──────────────────────────────────────
const BG    = "#f7f5f2";
const INK   = "#111111";
const MUTED = "rgba(17,17,17,0.38)";
const BORDER= "rgba(17,17,17,0.08)";
const BG_D  = "#111111";
const MUTED_D="rgba(247,245,242,0.35)";
const BDR_D = "rgba(247,245,242,0.08)";
const RAIL  = 220;
const NAV_H = 64;
const F_SERIF="'Instrument Serif',Georgia,serif";
const F_SANS ="'Geist','Helvetica Neue',sans-serif";

// ── PROJECT IMAGES ────────────────────────────────────────────────────────────
// Each project gets an array of images.
// Right now they all use the same cover image repeated — 
// REPLACE these with your actual project images once you've added them to /public/images/
// e.g. images: ["/images/parallels-01.jpg", "/images/parallels-02.jpg"]

export const PROJECT_IMAGES = {
  "01": [
    "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/3d0601ff-4c96-4952-bf86-d55966d453ea_rwc_0x0x1916x1080x32.jpg?h=3fe224854a35b94dfa215defd4a0a770",
    "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/3d0601ff-4c96-4952-bf86-d55966d453ea_rwc_0x0x1916x1080x32.jpg?h=3fe224854a35b94dfa215defd4a0a770",
  ],
  "02": [
    "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/65bdc620-9a44-454d-a983-75011a208ff8_carw_16x9x32.png?h=5fdc5566882bdb9cbf12c41de95ee4fa",
    "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/65bdc620-9a44-454d-a983-75011a208ff8_carw_16x9x32.png?h=5fdc5566882bdb9cbf12c41de95ee4fa",
  ],
  "03": [
    "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/9adf83bd-e491-4c3e-aeb2-051b68c98a9e_rwc_118x30x1136x640x32.png?h=38831906379b60356e9d8b51990a2566",
    "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/9adf83bd-e491-4c3e-aeb2-051b68c98a9e_rwc_118x30x1136x640x32.png?h=38831906379b60356e9d8b51990a2566",
  ],
  "04": [
    "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/c0c20ce8-f1e4-4f21-89fb-220df83ca108_rwc_0x300x3000x1690x32.jpg?h=81f8c200fe1b1ac45540bcf506e80da4",
    "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/c0c20ce8-f1e4-4f21-89fb-220df83ca108_rwc_0x300x3000x1690x32.jpg?h=81f8c200fe1b1ac45540bcf506e80da4",
  ],
  "05": [
    "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/a45082ca-e836-4e80-83bb-efa025d05e3a_carw_16x9x32.png?h=bcb30c74439a5628036647126ffc3799",
    "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/a45082ca-e836-4e80-83bb-efa025d05e3a_carw_16x9x32.png?h=bcb30c74439a5628036647126ffc3799",
  ],
  "06": [
    "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/497698d6-ce15-4458-ae08-7a3d60008533_carw_16x9x32.jpg?h=4be4d26c254f52a1ca092e856e0ccaaa",
    "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/497698d6-ce15-4458-ae08-7a3d60008533_carw_16x9x32.jpg?h=4be4d26c254f52a1ca092e856e0ccaaa",
  ],
  "07": [
    "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/ba024d9e-76bf-419d-a84d-f8aef18c53a8_carw_16x9x32.jpg?h=519da39bc3db751c852ff11841b67157",
    "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/ba024d9e-76bf-419d-a84d-f8aef18c53a8_carw_16x9x32.jpg?h=519da39bc3db751c852ff11841b67157",
  ],
  "08": [
    "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/4e82acfe-772a-4f7e-9569-cedeefc667e8_carw_16x9x32.jpg?h=72d94923862b357e473f864b0eec314f",
    "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/4e82acfe-772a-4f7e-9569-cedeefc667e8_carw_16x9x32.jpg?h=72d94923862b357e473f864b0eec314f",
  ],
  "09": [
    "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/03091f41-0cb5-4eca-8dc4-4a867a5957dd_carw_16x9x32.jpg?h=fbcb98b93227964d12c9108c573b8bf0",
    "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/03091f41-0cb5-4eca-8dc4-4a867a5957dd_carw_16x9x32.jpg?h=fbcb98b93227964d12c9108c573b8bf0",
  ],
  "10": [
    "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/b5088995-23f1-4371-bea9-fbbe16b67200_carw_16x9x32.jpg?h=2baa372bd9b4e0cb5037182ddec701f2",
    "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/b5088995-23f1-4371-bea9-fbbe16b67200_carw_16x9x32.jpg?h=2baa372bd9b4e0cb5037182ddec701f2",
  ],
  "11": [
    "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/6e42493f-29f7-4091-907a-ff8803365083_rwc_231x97x2676x1508x32.jpg?h=81e1365ea3f3209517b5160bf1dec94d",
    "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/6e42493f-29f7-4091-907a-ff8803365083_rwc_231x97x2676x1508x32.jpg?h=81e1365ea3f3209517b5160bf1dec94d",
  ],
  "12": [
    "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/a14936c1-2425-4e78-8b83-4b7b46dca2a3_carw_16x9x32.png?h=71ea468610506a289a1d4902ea243ed9",
    "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/a14936c1-2425-4e78-8b83-4b7b46dca2a3_carw_16x9x32.png?h=71ea468610506a289a1d4902ea243ed9",
  ],
  "13": [
    "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/cd54306d-138c-4354-bf2c-421488547f2b_carw_16x9x32.jpg?h=aff9bd3347f40532b8c96aceb6f2d911",
    "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/cd54306d-138c-4354-bf2c-421488547f2b_carw_16x9x32.jpg?h=aff9bd3347f40532b8c96aceb6f2d911",
  ],
};

// ── COMPONENT ─────────────────────────────────────────────────────────────────
export default function ProjectPage({ project, onBack, onNext, onPrev, totalProjects }) {
  const images = PROJECT_IMAGES[project.id] || [project.img];
  const [activeImg, setActiveImg] = useState(0);
  const imgRefs = useRef([]);
  const scrollRef = useRef(null);

  // track which image is in view as user scrolls center column
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting && e.intersectionRatio > 0.5) {
            setActiveImg(parseInt(e.target.dataset.idx));
          }
        });
      },
      { threshold: 0.5, root: null }
    );
    imgRefs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, [images.length]);

  // scroll to top on project change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setActiveImg(0);
  }, [project.id]);

  const lbl = {
    fontFamily: F_SANS,
    fontWeight: 400,
    fontSize: 9,
    letterSpacing: ".26em",
    textTransform: "uppercase",
  };

  return (
    <div style={{ background: BG }}>

      {/* ── NAV (same as main site) ── */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
        height: NAV_H,
        display: "grid",
        gridTemplateColumns: `${RAIL}px 1fr ${RAIL}px`,
        borderBottom: `1px solid ${BORDER}`,
        background: BG,
      }}>
        <div style={{ borderRight: `1px solid ${BORDER}`, display: "flex", alignItems: "center", padding: "0 24px" }}>
          <button
            onClick={onBack}
            style={{ fontFamily: F_SANS, fontWeight: 600, fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: INK, background: "none", border: "none", cursor: "none", padding: 0, display: "flex", alignItems: "center", gap: 8 }}
            onMouseEnter={e => e.currentTarget.style.opacity = ".6"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            ← <img src="/images/logo/Logo-black.png" alt="KARA" style={{ height: 14, display: "inline-block", verticalAlign: "middle" }} />
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...lbl, color: MUTED }}>
            {project.id} / {String(totalProjects).padStart(2, "0")} — {project.cat}
          </span>
        </div>
        <div style={{ borderLeft: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 24px", gap: 20 }}>
          <button onClick={onPrev} style={{ ...lbl, color: MUTED, background: "none", border: "none", cursor: "none", transition: "color .2s" }} onMouseEnter={e => e.currentTarget.style.color = INK} onMouseLeave={e => e.currentTarget.style.color = MUTED}>←</button>
          <button onClick={onNext} style={{ ...lbl, color: MUTED, background: "none", border: "none", cursor: "none", transition: "color .2s" }} onMouseEnter={e => e.currentTarget.style.color = INK} onMouseLeave={e => e.currentTarget.style.color = MUTED}>→</button>
        </div>
      </div>

      {/* ── LEFT RAIL ── */}
      <div style={{
        position: "fixed", top: NAV_H, left: 0, bottom: 0, width: RAIL,
        borderRight: `1px solid ${BORDER}`,
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        padding: "36px 24px", zIndex: 400, background: BG, pointerEvents: "none",
      }}>
        <div>
          <p style={{ ...lbl, color: MUTED, marginBottom: 20, opacity: .55 }}>{project.id} / {totalProjects}</p>
          <h1 style={{
            fontFamily: F_SERIF, fontStyle: "italic", fontWeight: 400,
            fontSize: "clamp(20px,1.8vw,32px)", lineHeight: 1.15,
            color: INK, margin: 0, letterSpacing: "-.01em",
            whiteSpace: "pre-line",
          }}>
            {project.title}
          </h1>
        </div>
        {/* Image counter dots */}
        <div>
          <p style={{ ...lbl, color: MUTED, marginBottom: 14, opacity: .45 }}>
            {String(activeImg + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {images.map((_, i) => (
              <div
                key={i}
                style={{
                  height: i === activeImg ? 24 : 6,
                  width: 2,
                  background: i === activeImg ? INK : MUTED,
                  transition: "height .35s cubic-bezier(.16,1,.3,1), background .2s",
                  borderRadius: 1,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT RAIL ── */}
      <div style={{
        position: "fixed", top: NAV_H, right: 0, bottom: 0, width: RAIL,
        borderLeft: `1px solid ${BORDER}`,
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        padding: "36px 24px", zIndex: 400, background: BG, pointerEvents: "none",
        overflowY: "auto",
      }}>
        <div>
          <p style={{ ...lbl, color: MUTED, marginBottom: 16, opacity: .55 }}>{project.cat}</p>
          <p style={{ fontFamily: F_SANS, fontWeight: 400, fontSize: 11.5, lineHeight: 1.8, color: MUTED }}>
            {project.desc}
          </p>

          {/* Divider */}
          <div style={{ height: 1, background: BORDER, margin: "24px 0" }} />

          {/* Meta */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[["Year", project.year], ["Category", project.cat], ["Images", `${images.length} views`]].map(([k, v]) => (
              <div key={k}>
                <p style={{ ...lbl, color: MUTED, opacity: .45, marginBottom: 2 }}>{k}</p>
                <p style={{ fontFamily: F_SANS, fontWeight: 400, fontSize: 11, color: INK }}>{v}</p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: BORDER, margin: "24px 0" }} />

          {/* External link — pointer events on since this is clickable */}
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: F_SANS, fontWeight: 500, fontSize: 10,
              letterSpacing: ".16em", textTransform: "uppercase",
              color: INK, textDecoration: "none",
              display: "flex", alignItems: "center", gap: 8,
              borderBottom: `1px solid ${BORDER}`, paddingBottom: 1,
              pointerEvents: "all",
              transition: "opacity .2s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = ".5"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            View on Site ↗
          </a>
        </div>

        {/* Bottom nav hint */}
        <div>
          <p style={{ ...lbl, color: MUTED, opacity: .35 }}>← → to browse projects</p>
        </div>
      </div>

      {/* ── CENTER — scrollable images ── */}
      <main style={{ marginLeft: RAIL, marginRight: RAIL, paddingTop: NAV_H }} ref={scrollRef}>

        {/* Header strip */}
        <div style={{
          height: 44,
          borderBottom: `1px solid ${BORDER}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 36px", background: BG,
        }}>
          <span style={{ ...lbl, color: MUTED }}>Project Detail</span>
          <span style={{ fontFamily: F_SERIF, fontStyle: "italic", fontSize: 12, color: MUTED }}>
            {images.length} image{images.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Each image gets full viewport height — scroll through them */}
        {images.map((src, i) => (
          <ProjectImage key={i} src={src} idx={i} imgRef={el => imgRefs.current[i] = el} total={images.length} />
        ))}

        {/* ── NEXT PROJECT TEASER ── */}
        <div style={{ borderTop: `1px solid ${BORDER}`, background: BG }}>
          <div style={{
            padding: "56px 36px 72px",
            display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          }}>
            <div>
              <p style={{ ...lbl, color: MUTED, marginBottom: 12 }}>Next Project</p>
              <button
                onClick={onNext}
                style={{
                  fontFamily: F_SERIF, fontStyle: "italic", fontWeight: 400,
                  fontSize: "clamp(28px,3.5vw,52px)", color: INK,
                  background: "none", border: "none", cursor: "none", padding: 0,
                  letterSpacing: "-.01em", lineHeight: 1, textAlign: "left",
                  transition: "opacity .2s",
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = ".5"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                Continue →
              </button>
            </div>
            <button
              onClick={onBack}
              style={{
                fontFamily: F_SANS, fontWeight: 400, fontSize: 10,
                letterSpacing: ".16em", textTransform: "uppercase",
                color: MUTED, background: "none", border: `1px solid ${BORDER}`,
                padding: "10px 20px", cursor: "none", transition: "all .2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = INK; e.currentTarget.style.color = INK; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = MUTED; }}
            >
              ← All Work
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}

// ── SINGLE IMAGE BLOCK ────────────────────────────────────────────────────────
function ProjectImage({ src, idx, imgRef, total }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const setRefs = el => { ref.current = el; if (imgRef) imgRef(el); };

  return (
    <div
      ref={setRefs}
      data-idx={idx}
      style={{
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        borderBottom: idx < total - 1 ? `1px solid ${BORDER}` : "none",
        opacity: vis ? 1 : 0,
        transition: "opacity .8s ease",
        background: "#e8e4de",
      }}
    >
      <img
        src={src}
        alt={`View ${idx + 1}`}
        style={{
          width: "100%", height: "100%",
          objectFit: "cover", display: "block",
        }}
        loading={idx === 0 ? "eager" : "lazy"}
      />
      {/* image index ghost */}
      <div style={{
        position: "absolute", bottom: 20, left: 28,
        fontFamily: F_SERIF, fontStyle: "italic",
        fontSize: 72, color: "rgba(17,17,17,.07)",
        lineHeight: 1, pointerEvents: "none", userSelect: "none",
      }}>
        {String(idx + 1).padStart(2, "0")}
      </div>
    </div>
  );
}
