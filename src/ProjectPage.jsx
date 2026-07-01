// ProjectPage.jsx
// Drop this file into src/ProjectPage.jsx
// Then follow the instructions at the bottom to wire it into App.jsx

import { useState, useEffect, useRef } from "react";

// ── theme tokens (inherit CSS vars set on the App root so dark mode follows) ──
const BG    = "var(--bg)";
const INK   = "var(--ink)";
const MUTED = "rgb(var(--ink-rgb) / 0.42)";
const BORDER= "rgb(var(--ink-rgb) / 0.1)";
const PAPER = "var(--paper)";
const RAIL  = 220;
const NAV_H = 64;
const F_SERIF="'Space Grotesk','Helvetica Neue',sans-serif";
const F_SANS ="'Inter','Helvetica Neue',sans-serif";

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
  // 06 — Greenstone Rebrand
  "06": [
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
  // 07 — Stygian Crypt
  "07": [
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
  // 08 — Analog The Room
  "08": [
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
  // 09 — Maison Etherique
  "09": [
    "/images/maison%20etherique/Love_and_Harmony_kits.webp",
    "/images/maison%20etherique/DSC_8170-2_1.webp",
    "/images/maison%20etherique/DechenIncense-MaisonEtherique-Dubai1.webp",
    "/images/maison%20etherique/DechenIncense-MaisonEtherique-Dubai3.webp",
    "/images/maison%20etherique/DungkarIncense-MaisonEtherique-Dubai2.webp",
    "/images/maison%20etherique/DungkarIncense-MaisonEtherique-Dubai3.webp",
    "/images/maison%20etherique/PadmaIncense-MaisonEtherique-Dubai1.webp",
    "/images/maison%20etherique/PadmaIncense-MaisonEtherique-Dubai2.webp",
    "/images/maison%20etherique/SmatenIncense-MaisonEtherique-Dubai2.webp",
    "/images/maison%20etherique/SmatenIncense-MaisonEtherique-Dubai3.webp",
    "/images/maison%20etherique/Royal_sandalwood_box.webp",
    "/images/maison%20etherique/Royal_sandalwood_incense.webp",
    "/images/maison%20etherique/Royal_sandalwood_sticks.webp",
    "/images/maison%20etherique/Energy_cleansing_kit_box.webp",
    "/images/maison%20etherique/Energy-Cleansing-Kit-Dubai2.webp",
    "/images/maison%20etherique/Home_blessing_kit_box.webp",
    "/images/maison%20etherique/Home-Blessing-Kit-Dubai-Maison-Etherique.webp",
    "/images/maison%20etherique/Palo-Santo-Bagg-of-5-Sticks-Dubai.webp",
  ],
  // 10 — Tabby UI Redesign
  "10": [
    "/images/tabby%20ui%20redesign/01-problem-statement.png",
    "/images/tabby%20ui%20redesign/02-design-foundation.png",
    "/images/tabby%20ui%20redesign/03-design-foundation-idea.png",
    "/images/tabby%20ui%20redesign/04-context.png",
    "/images/tabby%20ui%20redesign/05-project-breakdown.png",
    "/images/tabby%20ui%20redesign/06-mockup-screen.png",
    "/images/tabby%20ui%20redesign/07-scene-1.png",
    "/images/tabby%20ui%20redesign/08-scene-10.png",
    "/images/tabby%20ui%20redesign/09-lifestyle-mockups.png",
    "/images/tabby%20ui%20redesign/10-frame.png",
    "/images/tabby%20ui%20redesign/11-billboard.png",
    "/images/tabby%20ui%20redesign/12-discover.png",
    "/images/tabby%20ui%20redesign/13-end-frame.png",
  ],
};

// ── COMPONENT ─────────────────────────────────────────────────────────────────
export default function ProjectPage({ project, onBack, onNext, onPrev, totalProjects }) {
  const images = PROJECT_IMAGES[project.id] || [project.img];
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [project.id]);

  const lbl = { fontFamily: F_SANS, fontWeight: 500, fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase" };

  const meta = [["Year", project.year], ["Category", project.cat], ["Views", `${images.length} images`]];

  return (
    <div style={{ background: BG, minHeight: "100vh", color: INK }}>
      {/* top bar — matches the home nav */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 500, height: 56,
        display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px",
        borderBottom: `1px solid ${BORDER}`, background: "rgb(var(--bg-rgb) / 0.82)", backdropFilter: "blur(12px)",
      }}>
        <button onClick={onBack} data-label="All work"
          style={{ ...lbl, color: INK, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 14 }}>←</span> All Work
        </button>
        <span style={{ ...lbl, color: MUTED }}>{project.id} / {String(totalProjects).padStart(2, "0")} · {project.cat}</span>
        <div style={{ display: "flex", gap: 20 }}>
          <button onClick={onPrev} data-label="Previous project" style={{ ...lbl, color: MUTED, background: "none", border: "none", cursor: "pointer", transition: "color .2s" }} onMouseEnter={e => e.currentTarget.style.color = INK} onMouseLeave={e => e.currentTarget.style.color = MUTED}>Prev</button>
          <button onClick={onNext} data-label="Next project" style={{ ...lbl, color: INK, background: "none", border: "none", cursor: "pointer" }}>Next →</button>
        </div>
      </div>

      <main style={{ paddingTop: 56 }}>
        {/* editorial header (2 columns) */}
        <div style={{ padding: "72px 28px 44px", borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ fontFamily: F_SANS, fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: MUTED, marginBottom: 26 }}>
            {project.code} · Project {project.id} of {String(totalProjects).padStart(2, "0")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "end" }}>
            <h1 style={{ fontFamily: F_SERIF, fontWeight: 600, fontSize: "clamp(34px,5vw,76px)", lineHeight: 1.0, letterSpacing: "-.03em", color: INK }}>
              {project.title}
            </h1>
            <div>
              <p style={{ fontFamily: F_SANS, fontSize: 14, lineHeight: 1.75, color: "rgb(var(--ink-rgb) / 0.62)", marginBottom: 26, maxWidth: 460 }}>
                {project.desc}
              </p>
              <div style={{ display: "flex", gap: 34, flexWrap: "wrap", alignItems: "flex-end" }}>
                {meta.map(([k, v]) => (
                  <div key={k}>
                    <div style={{ ...lbl, fontSize: 9, color: MUTED, marginBottom: 6 }}>{k}</div>
                    <div style={{ fontFamily: F_SANS, fontSize: 13, color: INK }}>{v}</div>
                  </div>
                ))}
                <a href={project.url} target="_blank" rel="noreferrer" data-label="Open live site"
                  style={{ ...lbl, fontSize: 10, color: INK, textDecoration: "none", borderBottom: `1px solid ${INK}`, paddingBottom: 2 }}>
                  View on Site ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* masonry gallery */}
        <div style={{ padding: "28px 28px 40px", columns: 2, columnGap: 20 }}>
          {images.map((src, i) => (
            <ProjectImage key={i} src={src} idx={i} />
          ))}
        </div>

        {/* next project CTA */}
        <div style={{ borderTop: `1px solid ${BORDER}`, padding: "72px 28px 96px",
          display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ ...lbl, fontSize: 10, color: MUTED, marginBottom: 14 }}>Next Project</div>
            <button onClick={onNext} data-label="Next project"
              style={{ fontFamily: F_SERIF, fontWeight: 600, fontSize: "clamp(30px,4.4vw,64px)", letterSpacing: "-.02em",
                color: INK, background: "none", border: "none", cursor: "pointer", lineHeight: 1, padding: 0, transition: "opacity .2s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = ".55"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
              Continue →
            </button>
          </div>
          <button onClick={onBack} data-label="All work"
            style={{ fontFamily: F_SANS, fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase",
              color: MUTED, background: "none", border: `1px solid ${BORDER}`, padding: "12px 22px", cursor: "pointer", transition: "all .2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = INK; e.currentTarget.style.color = INK; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = MUTED; }}>
            ← Back to all work
          </button>
        </div>
      </main>
    </div>
  );
}

// ── MOSAIC TILE ───────────────────────────────────────────────────────────────
function ProjectImage({ src, idx }) {
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

  return (
    <div
      ref={ref}
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
