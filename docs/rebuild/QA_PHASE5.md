> ⚠️ **VERALTET — HISTORISCHES DOKUMENT.** Dieser Report beschreibt den
> Stand einer früheren Build-Runde und enthält Aussagen, die auf den heutigen
> Code **nicht mehr zutreffen** (u. a. saveData-Gate, CDN-Hotlinks, „12
> Sorten", Karamell, Kontrast-/Touch-Target-Zusagen, Skip-Link). Der
> verbindliche Prüfstand ist `COUNCIL_ROUND_1.md` ff. — der Skeptiker der
> Runde 1 hat die überholten Claims einzeln widerlegt.

# QA.md — Phase 5 Council Review

Gnadenlose Prüfung gegen die Definition of Done (§6–§8 des Master-Prompts).
Status damals: „grün" nach Fix-Loop — **nach heutigem Stand widerlegt** (siehe Banner oben). Build erzeugte 24 Routen ohne Fehler/Warnungen.

> Hinweis zur Methodik: Lighthouse/Headless-Messung war in dieser Sandbox nicht
> möglich (Netzwerk-Policy blockiert externe Hosts, kein Headless-Chrome).
> Geprüft wurde per statischem Code-Audit + Produktions-Build. Feldmessung
> (CWV) bitte nach dem ersten Vercel-Deploy via PageSpeed nachziehen.

---

## Gefundene & behobene Probleme (Fix-Loop)

| # | Schwere | Befund | Fix |
|---|---|---|---|
| 1 | **Bug** | `accent: "pumpkin"` war nicht im `AccentKey`-Typ/`accentVar`-Map → auf Bratapfel-/Pumpkin-Detailseiten wurde `undefined` in den Platzhalter-Gradient gerendert. | `pumpkin` zu Typ + Map ergänzt, Casts entfernt. |
| 2 | CSS | `duration-400` (Toast) und `opacity-55` (Hero-Video) sind nicht in Tailwinds Default-Skala → wurden ignoriert. | `duration-300` bzw. `opacity-[0.55]`. |
| 3 | **A11y** | Warenkorb-Sheet (off-screen) & mobiles Menü (geschlossen) blieben im Tab-Fokus erreichbar. | `inert={!isOpen}` / `inert={!menuOpen}`. |
| 4 | Perf | Hero-Video lud auch auf Mobil/Data-Saver. | Video nur ≥768px, ohne reduced-motion, ohne `saveData`; sonst leichte MoonScene. |
| 5 | SEO | Keine robots/sitemap. | `app/robots.ts` + `app/sitemap.ts` (inkl. aller Produktrouten). |

---

## Definition of Done — Status

### Performance
- ✅ `next/image` (AVIF/WebP, `sizes`, lazy; `priority` nur für erste 4 Karten/Hero).
- ✅ `next/font` (Fraunces + Geist) self-hosted, `display:swap`, Variable-Fonts → kein CLS durch Fonts.
- ✅ JS schlank: GSAP/Lenis nur clientseitig, MoonScene Canvas DPR-gecappt & rAF-pausiert außerhalb Viewport.
- ✅ Hero-Video budgetiert (Desktop-only, Data-Saver-aware, `muted/loop/playsInline`, opacity-Fade statt Layout-Shift).
- ⚠️ Hero-Video & relit Produktbilder liegen auf Higgsfield-CDN (Hotlink) — Feld-CWV nach Deploy verifizieren; bei Bedarf self-hosten (Bytes laden → `/public/media/`).

### Accessibility (WCAG AA)
- ✅ Kontraste: moon `#F4EEE0` auf night `#0E1A14` ≈ 15:1; honey `#E8B25E` auf night ≈ 8:1; moon-mute ≥ 4.5:1 (Normaltext).
- ✅ Fokus-States global (`:focus-visible` Honey-Outline), Skip-Link zum Inhalt.
- ✅ Tastatur: Sheet/Menü via `inert` aus Tab-Order wenn geschlossen; alle Icon-Buttons mit `aria-label`.
- ✅ `alt`-Texte an Produktbildern; dekorative SVG/Overlays `aria-hidden`.
- ✅ `prefers-reduced-motion`: Hero-Anim/SplitText, Lenis, Cursor, MoonScene, Magnet-Buttons, CSS-Reveals & Marquee deaktiviert; Video lädt nicht.
- ✅ Custom-Cursor nur bei `pointer:fine` (Touch/Tastatur unberührt).
- ✅ Formular: jedes Feld mit `<label>`, Pflichtfeld-Validierung + Toast.

### Responsive
- ✅ `overflow-x:hidden`, kein horizontales Scrollen; dekorative Übergrößen in `overflow-hidden`-Containern geklippt.
- ✅ Breakpoints: Grids 1→2→3→4 Spalten; Nav mit Burger <768px; Sheet `max-w-[92vw]`.
- ✅ Touch-Targets: Buttons/Qty ≥ 32–44px.

### Inhalt & Marke
- ✅ Echte Inhalte aus `EXTRACT.md` — **kein Lorem Ipsum**; 12 echte Sorten + 2 Limonaden, echte Reviews, echte Story.
- ✅ Echte Assets: 11 Inhaber-Fotos (Higgsfield-relit + lokaler Fallback) + Higgsfield-Hero-Video.
- ✅ Rechtstexte als Platzhalter mit Hinweis (nicht erfunden).

### Awwwards-Zutaten (Charakter)
- ✅ Klare Big Idea „Gebraut vom Mond", dunkle eigenständige Palette (Pinie+Gold), cinematic Scroll-Choreografie (GSAP/ScrollTrigger/SplitText), Lenis-Smooth-Scroll, Custom-Cursor mit Zuständen, magnetische Buttons, kinetische Display-Typo, asymmetrischer Hero, Mondphasen-USP, Goldtropfen-Signature, Hero-Video-Wow.

---

## Offene Punkte / Empfehlungen
1. **Feld-CWV** nach erstem Vercel-Deploy messen (LCP/CLS/INP) — Code ist darauf ausgelegt.
2. **Self-Hosting der Higgsfield-Assets** für volle Kontrolle (aktuell CDN-Hotlink, da Sandbox keine Bytes laden konnte).
3. **Rechtstexte** (Impressum/Datenschutz/Bio-Zert.) vom Inhaber einpflegen.
4. Optional: echtes **Stripe-Checkout** (Architektur ist vorbereitet) statt mailto.
5. Optional: Fotos für **Karamell, Bratapfel, Pumpkin Spice** ergänzen (aktuell eleganter Mond-Platzhalter).
