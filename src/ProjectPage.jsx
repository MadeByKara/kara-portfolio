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
  // 01 — Social Media & Ads
  "01": [
    "/images/social%20media%20creatives/Thumbnail%20Website.jpg",
    "/images/social%20media%20creatives/Brand%20Authority%20Post.jpg",
    "/images/social%20media%20creatives/Service%20Promotion.jpg",
    "/images/social%20media%20creatives/Educational%20carousel%20Slide%201.jpg",
    "/images/social%20media%20creatives/Educational%20carousel%20Slide%202.jpg",
    "/images/social%20media%20creatives/Educational%20carousel%20Slide%203.jpg",
    "/images/social%20media%20creatives/Educational%20carousel%20Slide%204.jpg",
    "/images/social%20media%20creatives/Educational%20carousel%20Slide%205.jpg",
    "/images/social%20media%20creatives/1.jpeg",
    "/images/social%20media%20creatives/2.jpeg",
    "/images/social%20media%20creatives/3.jpeg",
    "/images/social%20media%20creatives/4.jpeg",
    "/images/social%20media%20creatives/5.jpeg",
    "/images/social%20media%20creatives/6.jpeg",
    "/images/social%20media%20creatives/7.jpeg",
    "/images/social%20media%20creatives/8.jpeg",
    "/images/social%20media%20creatives/10.jpeg",
    "/images/social%20media%20creatives/11.jpeg",
    "/images/social%20media%20creatives/12.jpeg",
    "/images/social%20media%20creatives/13.jpeg",
    "/images/social%20media%20creatives/14.jpeg",
    "/images/social%20media%20creatives/15.jpeg",
    "/images/social%20media%20creatives/16.jpeg",
    "/images/social%20media%20creatives/17.jpeg",
    "/images/social%20media%20creatives/19.jpeg",
    "/images/social%20media%20creatives/20.jpeg",
    "/images/social%20media%20creatives/21.jpeg",
    "/images/social%20media%20creatives/22.jpeg",
    "/images/social%20media%20creatives/23.jpeg",
    "/images/social%20media%20creatives/24.jpeg",
    "/images/social%20media%20creatives/25.jpeg",
    "/images/social%20media%20creatives/26.jpeg",
    "/images/social%20media%20creatives/27.jpeg",
    "/images/social%20media%20creatives/28.jpeg",
    "/images/social%20media%20creatives/29.jpeg",
    "/images/social%20media%20creatives/30.jpeg",
    "/images/social%20media%20creatives/SO%20GM%2030%20-%2050%25%202%20copy.jpg",
  ],
  // 02 — Parallels Logo
  "02": [
    "/images/parallels/logo-variations-parallels.png",
    "/images/parallels/logo-variations-parallels-chapter-01.png",
    "/images/parallels/logo-variations-parallels-chapter-02.png",
    "/images/parallels/logo-variations-parallels-chapter-03.png",
    "/images/parallels/logo-variations-parallels-chapter-04.png",
    "/images/parallels/logo-variations-parallels-chapter-06.png",
    "/images/parallels/GwtTUA8aQAAExHw.jpeg",
  ],
  // 03 — CoinCooker Identity
  "03": [
    "/images/coincooker/Slide%2016_9%20-%2039.png",
    "/images/coincooker/Slide%2016_9%20-%2067.png",
    "/images/coincooker/Slide%2016_9%20-%2068.png",
    "/images/coincooker/Slide%2016_9%20-%2069.png",
    "/images/coincooker/Slide%2016_9%20-%2070.png",
    "/images/coincooker/Slide%2016_9%20-%2077.png",
    "/images/coincooker/Slide%2016_9%20-%2078.png",
    "/images/coincooker/Slide%2016_9%20-%2079.png",
    "/images/coincooker/Slide%2016_9%20-%2080.png",
    "/images/coincooker/Slide%2016_9%20-%2082.png",
    "/images/coincooker/Slide%2016_9%20-%2083.png",
    "/images/coincooker/Sticker%207.png",
    "/images/coincooker/Sticker%209.png",
    "/images/coincooker/Sticker%2011.png",
    "/images/coincooker/Sticker%2016.png",
    "/images/coincooker/Sticker%2020.png",
    "/images/coincooker/Sticker%2021.png",
    "/images/coincooker/Sticker%2024.jpg",
    "/images/coincooker/Sticker%2031.png",
    "/images/coincooker/Sticker%2033.png",
    "/images/coincooker/Sticker%2034.png",
    "/images/coincooker/Sticker%2035.png",
  ],
  // 04 — Brand Craft Profile
  "04": [
    "/images/brand-craft/front.webp",
    "/images/brand-craft/BACK.webp",
    "/images/brand-craft/Free_Landscape_Brochure_Mockup_05.webp",
    "/images/brand-craft/Free_Landscape_Brochure_Mockup_06.webp",
    "/images/brand-craft/Free_Landscape_Brochure_Mockup_066.webp",
    "/images/brand-craft/Free_Landscape_Brochure_Mockup_07.webp",
  ],
  // 05 — KARA Identity
  "05": [
    "/images/kara/KARA%20-%20Visual%20Deliverance.png",
    "/images/kara/Thumbnail%20extended.png",
    "/images/kara/Colours.png",
    "/images/kara/typeface-100.jpg",
    "/images/kara/KVR%20Logo.png",
    "/images/kara/KVR%20Logo%202.png",
    "/images/kara/Kara%20Cards%203.jpg",
    "/images/kara/Laptop%20Mockup.png",
    "/images/kara/Laptop%20Mockup%20(1).png",
    "/images/kara/Open%20BOok.jpg",
    "/images/kara/Open%20BOok%20(1).jpg",
    "/images/kara/Poster%20mockup.jpg",
    "/images/kara/Poster%20mockup%20(1).jpg",
    "/images/kara/Vinyyls-100.jpg",
    "/images/kara/vinyl.png",
    "/images/kara/vinyl%206.png",
    "/images/kara/vinyl%207.png",
    "/images/kara/book.png",
    "/images/kara/box.png",
    "/images/kara/hoodie.png",
    "/images/kara/hoodie%202.png",
    "/images/kara/shirt%203.png",
  ],
  // 06 — Donna Bella (no local images yet)
  "06": [
    "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/497698d6-ce15-4458-ae08-7a3d60008533_carw_16x9x32.jpg?h=4be4d26c254f52a1ca092e856e0ccaaa",
  ],
  // 07 — Faya Cafe (no local images yet)
  "07": [
    "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/ba024d9e-76bf-419d-a84d-f8aef18c53a8_carw_16x9x32.jpg?h=519da39bc3db751c852ff11841b67157",
  ],
  // 08 — Greenstone Rebrand
  "08": [
    "/images/greenstone/Thumbnail-100.jpg",
    "/images/greenstone/Greenstone-100.jpg",
    "/images/greenstone/colours-100.jpg",
    "/images/greenstone/Colour%20Palette-100.jpg",
    "/images/greenstone/Typography-100.jpg",
    "/images/greenstone/grid-100.jpg",
    "/images/greenstone/Gold%20Mockup.jpg",
    "/images/greenstone/Logo%20for%20mockup.png",
    "/images/greenstone/Business%20card%20mockup.jpg",
    "/images/greenstone/Stationery%20Mockup.jpg",
    "/images/greenstone/Phone%20Mockup.png",
    "/images/greenstone/phone%20mockup.jpg",
    "/images/greenstone/Shirt%20Mockup.jpg",
    "/images/greenstone/Sweater%20Mockup.png",
    "/images/greenstone/website.jpg",
  ],
  // 09 — Stygian Crypt
  "09": [
    "/images/stygian-crypt/Stygian%20Crypt%20Vol.%201.jpg",
    "/images/stygian-crypt/Mockup%201.jpg",
    "/images/stygian-crypt/cover%20mockup%203.jpg",
    "/images/stygian-crypt/magazine%20mokup%202.jpg",
    "/images/stygian-crypt/open%20mokup.jpg",
    "/images/stygian-crypt/pagees%20mokup.jpg",
    "/images/stygian-crypt/sky%20book%20over.jpg",
    "/images/stygian-crypt/ollage%201.jpg",
    "/images/stygian-crypt/ollage%202.jpg",
    "/images/stygian-crypt/Spread%201.jpg",
    "/images/stygian-crypt/Spread%202.jpg",
    "/images/stygian-crypt/Spread%203.jpg",
    "/images/stygian-crypt/Spread%204.jpg",
    "/images/stygian-crypt/Spread%205.jpg",
    "/images/stygian-crypt/Spread%206.jpg",
    "/images/stygian-crypt/Spread%207.jpg",
    "/images/stygian-crypt/Spread%208.jpg",
    "/images/stygian-crypt/Spread%209.jpg",
    "/images/stygian-crypt/Spread%2010.jpg",
    "/images/stygian-crypt/Spread%2011.jpg",
    "/images/stygian-crypt/Spread%2012.jpg",
    "/images/stygian-crypt/Spread%2013.jpg",
  ],
  // 10 — Digital Art (no local images)
  "10": [
    "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/b5088995-23f1-4371-bea9-fbbe16b67200_carw_16x9x32.jpg?h=2baa372bd9b4e0cb5037182ddec701f2",
  ],
  // 11 — Logofolio (no local images)
  "11": [
    "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/6e42493f-29f7-4091-907a-ff8803365083_rwc_231x97x2676x1508x32.jpg?h=81e1365ea3f3209517b5160bf1dec94d",
  ],
  // 12 — Ganga Highway (no local images)
  "12": [
    "https://cdn.myportfolio.com/48d87636-31af-478b-bbcf-604c0dbbcc71/a14936c1-2425-4e78-8b83-4b7b46dca2a3_carw_16x9x32.png?h=71ea468610506a289a1d4902ea243ed9",
  ],
  // 13 — Analog The Room
  "13": [
    "/images/analog-the-room/ATR%20Behance%20Post.jpg",
    "/images/analog-the-room/ATR%20Behance%20Post2.jpg",
    "/images/analog-the-room/ATR%20Behance%20Post3.jpg",
    "/images/analog-the-room/ATR%20Behance%20Post4.jpg",
    "/images/analog-the-room/ATR%20Behance%20Post5.jpg",
    "/images/analog-the-room/ATR%20Behance%20Post6.jpg",
    "/images/analog-the-room/ATR%20Behance%20Post7.jpg",
    "/images/analog-the-room/ATR%20Behance%20Post8.jpg",
    "/images/analog-the-room/ATR%20Behance%20Post9.jpg",
    "/images/analog-the-room/ATR%20Behance%20Post10.jpg",
    "/images/analog-the-room/ATR%20Behance%20Post11.jpg",
    "/images/analog-the-room/ATR%20Behance%20Post12.jpg",
    "/images/analog-the-room/ATR%20Behance%20Post13.jpg",
    "/images/analog-the-room/ATR%20Behance%20Post14.jpg",
    "/images/analog-the-room/ATR%20Behance%20Post15.jpg",
    "/images/analog-the-room/ATR%20Behance%20Post16.jpg",
    "/images/analog-the-room/ATR%20Behance%20Post17.jpg",
    "/images/analog-the-room/ATR%20Behance%20Post18.jpg",
    "/images/analog-the-room/ATR%20Behance%20Post19.jpg",
    "/images/analog-the-room/ATR%20Behance%20Post20.jpg",
    "/images/analog-the-room/ATR%20Behance%20Post21.jpg",
    "/images/analog-the-room/ATR%20Behance%20Post22.jpg",
    "/images/analog-the-room/ATR%20Behance%20Post23.jpg",
    "/images/analog-the-room/ATR%20Behance%20Post24.jpg",
    "/images/analog-the-room/ATR%20Behance%20Post25.jpg",
    "/images/analog-the-room/ATR%20Behance%20Post26.jpg",
    "/images/analog-the-room/ATR%20Behance%20Post27.jpg",
    "/images/analog-the-room/ATR%20Behance%20Post28.jpg",
    "/images/analog-the-room/ATR%20Behance%20Post29.jpg",
    "/images/analog-the-room/ATR%20Behance%20Post30.jpg",
    "/images/analog-the-room/ATR%20Behance%20Post31.jpg",
    "/images/analog-the-room/ATR%20Behance%20Post32.jpg",
    "/images/analog-the-room/ATR%20Behance%20Post33.jpg",
    "/images/analog-the-room/ATR%20Behance%20Post%203412.jpg",
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
      { threshold: 0.1, rootMargin: "0px 0px -30% 0px" }
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
            style={{ fontFamily: F_SANS, fontWeight: 600, fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: INK, background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 8 }}
            onMouseEnter={e => e.currentTarget.style.opacity = ".6"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            ← <img src="/images/logo/kara-black-logo.svg" alt="KARA" style={{ height: 14, display: "inline-block", verticalAlign: "middle" }} />
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...lbl, color: MUTED }}>
            {project.id} / {String(totalProjects).padStart(2, "0")} — {project.cat}
          </span>
        </div>
        <div style={{ borderLeft: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 24px", gap: 20 }}>
          <button onClick={onPrev} style={{ ...lbl, color: MUTED, background: "none", border: "none", cursor: "pointer", transition: "color .2s" }} onMouseEnter={e => e.currentTarget.style.color = INK} onMouseLeave={e => e.currentTarget.style.color = MUTED}>←</button>
          <button onClick={onNext} style={{ ...lbl, color: MUTED, background: "none", border: "none", cursor: "pointer", transition: "color .2s" }} onMouseEnter={e => e.currentTarget.style.color = INK} onMouseLeave={e => e.currentTarget.style.color = MUTED}>→</button>
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

      {/* ── CENTER — mosaic grid ── */}
      <main style={{ marginLeft: RAIL, marginRight: RAIL, paddingTop: NAV_H }} ref={scrollRef}>

        {/* Header strip */}
        <div style={{
          height: 44,
          borderBottom: `1px solid ${BORDER}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 48px", background: BG,
        }}>
          <span style={{ ...lbl, color: MUTED }}>Project Detail</span>
          <span style={{ fontFamily: F_SERIF, fontStyle: "italic", fontSize: 12, color: MUTED }}>
            {images.length} image{images.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Mosaic grid — 2 columns, natural aspect ratios */}
        <div style={{ padding: "40px 48px 56px", columns: 2, columnGap: 16 }}>
          {images.map((src, i) => (
            <ProjectImage key={i} src={src} idx={i} imgRef={el => imgRefs.current[i] = el} total={images.length} />
          ))}
        </div>

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
                  background: "none", border: "none", cursor: "pointer", padding: 0,
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
                padding: "10px 20px", cursor: "pointer", transition: "all .2s",
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

// ── MOSAIC TILE ───────────────────────────────────────────────────────────────
function ProjectImage({ src, idx, imgRef }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const setRefs = el => { ref.current = el; if (imgRef) imgRef(el); };

  return (
    <div
      ref={setRefs}
      data-idx={idx}
      style={{
        breakInside: "avoid",
        marginBottom: 16,
        overflow: "hidden",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(10px)",
        transition: `opacity .7s ease ${Math.min(idx * 0.04, 0.4)}s, transform .7s ease ${Math.min(idx * 0.04, 0.4)}s`,
      }}
    >
      <img
        src={src}
        alt={`View ${idx + 1}`}
        style={{ width: "100%", height: "auto", display: "block" }}
        loading={idx < 4 ? "eager" : "lazy"}
      />
    </div>
  );
}
