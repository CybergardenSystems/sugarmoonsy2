# DIRECTION.md — Strategie & Design-Direktion (Phase 2) ⛔ APPROVAL GATE

> Basis: `EXTRACT.md`. Ziel: eine mutige, kohärente Richtung auf Awwwards/FWA-Niveau.
> **Vor dem Build wird hier auf Freigabe gewartet.**

---

## 0. Strategische Beobachtung
Die Legacy-Seite ist ein freundlicher, heller Bio-Webshop — solide, aber **austauschbar**: zentrierte 3-Spalten-Karten, Emoji-als-Produktbild, generische Fade-ins. Sie verschenkt das stärkste Asset der Marke: **den Namen selbst — „Sugar *Moon*".** Diese Richtung holt genau das zurück.

---

## 1. Big Idea — „Gebraut vom Mond" (Brewed by the Moon)

**Ein Satz:** Wir inszenieren Sugar Moon Sweets als nächtliche Manufaktur — eine dunkle, elegante, in Honiggold leuchtende Bühne, durch die sich **ein einziger goldener Sirup-Tropfen** zieht, der vom Mond fällt und beim Scrollen jede Sektion „füllt".

Der Mond ist nicht Deko, sondern **Protagonist und Navigationsachse**: Während man scrollt, durchläuft ein fixierter Mond seine **Phasen** (Neumond → Sichel → Halbmond → Vollmond) und spiegelt damit die **Saisonalität** der Sorten (das Kernversprechen: „immer neue, kreative Geschmäcker"). Aus der Mondspitze löst sich der **goldene Tropfen** — er ist Scroll-Fortschritt, Übergang und Signatur zugleich: er fällt in eine Tasse (Kaffee), zerläuft in ein Glas (Limo), wird zum Punkt des Custom-Cursors. Eine Idee, konsequent durchgezogen — ownable, weil sie **wörtlich der Markenname** ist.

**Warum das gewinnt:** Dunkel-elegante Lunar-Ästhetik ist Awwwards-Heimspiel; die Idee ist nicht aufgesetzt, sondern entspringt direkt Name + Logo (Halbmond mit Tropfen) + Story (Nacht/Café/Gemütlichkeit). Ein klares Signature-Motiv (der Tropfen) trägt Cursor, Scroll, Transitions und 3D — maximale Kohärenz bei minimalem Effekt-Wildwuchs.

---

## 2. Routen (1 Empfehlung + 2 Alternativen)

### ★ Route A — „Nocturne / Gebraut vom Mond" *(empfohlen)*
- **Konzept:** Nächtliche Manufaktur, near-black warmer Canvas, Honiggold-Glow, Mond als Scroll-Spine, goldener Tropfen als Through-Line.
- **Stimmung:** elegant, cinematisch, warm-dunkel, handwerklich-edel, ein Hauch Romantik.
- **Referenz-Stil (in Worten):** Editorial-Dark wie hochwertige Spirituosen-/Parfum-Sites; großzügige Fraunces-Display-Typo; Lichtführung wie Studio-Stillife bei Nacht; Korn/Vignette; ScrollTrigger-Pinning.
- **Warum es gewinnt:** ownable (Name = Idee), Awwwards-Palette, ein dominantes Signature-Element statt Effekt-Salat.

### Route B — „Aus einer Küche in Fulda" (warm-tactile editorial, hell)
- **Konzept:** Tageslicht-Magazin: Makro-Sirup-Pours, handgeschriebene Notizen, Kraftpapier-Texturen, pro Sorte ein Farbkapitel.
- **Stimmung:** Kinfolk/Artisan, ehrlich, nah, menschlich.
- **Warum evtl.:** maximal sympathisch & Story-getrieben. **Risiko:** näher am Legacy-Look, „artisan" ist ein gesättigtes Genre → weniger ownable.

### Route C — „Liquid Seasons" (WebGL-Fluid, Farbwelten)
- **Konzept:** Sirup als fließendes Material; die Seite morpht beim Scrollen durch Saison-Farbwelten (Lavendel → Sommer → Pumpkin → Spekulatius) per GLSL-Fluid-Shader.
- **Stimmung:** spektakulär, kinetisch, sinnlich.
- **Warum evtl.:** visueller Knaller. **Risiko:** performance-/aufwandsschwer, kann die Mond-Identität überdecken.

---

## 3. Design-Tokens (konkret — Route A)

### Farbsystem (Tailwind v4 `@theme`)
```
/* Night canvas */
--color-night:        #14100B;   /* base background */
--color-night-2:      #1C1610;   /* elevated surface */
--color-night-3:      #261E15;   /* cards / raised */
--color-ink:          #0D0A06;   /* deepest / overlays */

/* Honey / gold (luminous on dark) */
--color-honey:        #E8B25E;   /* primary */
--color-honey-deep:   #C6892F;   /* legacy brand gold, used for depth */
--color-honey-glow:   #F4D9A0;   /* highlights / glow */
--color-amber:        #D98A45;   /* CTA depth / autumn */

/* Moonlight / text */
--color-moon:         #F5EEE1;   /* primary text on dark, "moonlight ivory" */
--color-moon-dim:     #BCAB91;   /* secondary text */
--color-moon-mute:    #8A7C68;   /* tertiary / captions */
--color-silver:       #D9E0E8;   /* cool moon-rim accent, used sparingly */

/* Seasonal accents (ambient hue shift only, never primary) */
--color-lavender:     #A488C6;   /* Frühling/Sommer */
--color-sage:         #7BA86F;   /* Kräuter/Botanik */
--color-pumpkin:      #D98A45;   /* Herbst */
--color-cinnamon:     #B0673A;   /* Winter */
```
- **Modus:** Dark-first (Default). Kein Light-Mode-Zwang; optional späterer „Tageslicht"-Toggle out of scope v1.
- **Kontrast:** moon-on-night ≈ 13:1; honey-on-night ≈ 7:1 → WCAG AA/AAA safe für Text.

### Typografie
- **Display:** **Fraunces** (variable, `opsz` + Italic für Betonungen wie *„Seele"*). Hohe optische Größe, soft-serifige Eigenheit = „handgemacht".
- **Text/UI:** **Geist Sans** (fallback Inter) — präzise, modern, ruhig neben Fraunces.
- **Mono (Detail/Labels):** **Geist Mono** für Preise/Spec-Labels (z.B. „250 ML · 14,00 €").
- **Type-Scale (fluid `clamp`):**
  - Hero display `clamp(3rem, 9vw, 8.5rem)`
  - H1 `clamp(2.4rem, 5vw, 4.5rem)` · H2 `clamp(1.9rem, 3.5vw, 3rem)` · H3 `1.35rem`
  - Body `1.0625rem` (17px) · Small `0.85rem` · Label `0.7rem` (tracking +0.16em, uppercase)
- **Kinetic Type:** SplitText line-/char-Reveals auf Hero & Section-Titeln.

### Spacing / Layout / Radius
- **Spacing-Skala (8px-Basis):** 4·8·12·16·24·32·48·64·96·128 px.
- **Section-Rhythmus:** vertikal `clamp(6rem, 12vh, 10rem)`.
- **Grid:** 12-col, max-width 1320px; **bewusst asymmetrisch** — grid-breaking Hero, versetzte Produkt-Reihen, großzügiger Weißraum (= „Dunkelraum").
- **Radius:** `--radius-sm:10px · --radius:16px · --radius-lg:24px`; Pills nur für Tags/Labels, **weg vom rundgelutschten 100px-Button-Look** (Buttons: 12px + magnetisch).
- **Textur:** feines Film-Grain-Overlay (`mix-blend` / SVG noise) + sanfte Vignette auf dem Night-Canvas.

### Motion-Sprache
- **House-Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` (expo-out) für Reveals; `cubic-bezier(0.65,0,0.35,1)` für Transitions.
- **Dauer-Skala:** `xfast 0.18s · fast 0.32s · base 0.6s · slow 1.0s · cinematic 1.4s`.
- **Choreografie-Prinzip — „Der Tropfen führt":** Jede Reveal-Kette folgt dem goldenen Tropfen: Element steigt 24–48px auf, fadet ein, Stagger 0.08–0.12s; der Tropfen/Mond ist immer der visuelle Anker.
- **Smooth-Scroll:** **Lenis** (lerp ~0.1), gekoppelt an GSAP ScrollTrigger.
- **`prefers-reduced-motion`:** alle Scroll-/Parallax-/3D-Effekte → statisch, Opacity-only, Tropfenfall pausiert.

---

## 4. Informationsarchitektur (Neubau, Next.js App Router)

| Route | Zweck |
|---|---|
| `/` | Cinematic One-Pager-Spine (Hero → Manifest/USP → Shop-Teaser → Limonaden → Story → Reviews → CTA) |
| `/shop` | Voller Produkt-Katalog mit Saison-Filtern |
| `/shop/[slug]` | Produktdetail (Größe/Menge, Story zur Sorte) |
| `/limonaden` | Bio-Limo-Feature (Lila & Laune, Kraut & Heiter, Hunfelt Bräu) |
| `/story` | About — Jessica & Sebastian, Manufaktur |
| `/impressum` · `/datenschutz` · `/bio-zertifizierung` · `/ausstellungen` | Rechtliches/Info — Platzhalter mit Hinweis (Inhalte liegen nicht im Legacy vor) |

- **Warenkorb:** client-seitig (Zustand via React Context/Zustand), persistiert in `localStorage`.
- **Checkout (Default, faithful):** Bestell-Formular → strukturierte `mailto:`-Order an info@sugarmoonsweets.de — **kein** Backend (wie Legacy). Architektur so gebaut, dass echtes **Stripe-Checkout** (MCP verfügbar) später ohne Umbau andockbar ist. → *siehe Gate-Frage.*
- **Transitions:** View Transitions API zwischen Routen + GSAP-Overlay-Wipe (goldener Tropfen-Wipe).

---

## 5. Page-by-Page Intent + Wow-Moment

| Sektion | Inhalt (aus EXTRACT) | Wow-Moment |
|---|---|---|
| **Hero** | „Sirup mit *Seele*", Sub, CTAs, Trust | Vollflächiger Nachthimmel; großer Mond (WebGL/SVG, Grain+Glow); goldener Tropfen an der Mondspitze, der beim ersten Scroll **löst und fällt** → wird Scroll-Spine. SplitText-Headline. |
| **Marquee/Manifest** | Trust-Items, 3 USPs | Endlos-Lauftext in Honiggold; USPs erscheinen als „Mondphasen-Karten". |
| **Shop-Teaser / Shop** | 10 Sirupe, Saison-Filter, Preise | Flaschen **treten aus der Dunkelheit** mit Light-Rake; Hover = magnetischer Cursor + Tropfen; Saison-Filter verschiebt die **Ambient-Honey-Temperatur** zur Saisonfarbe. |
| **Bio-Limonade** | Lila & Laune, Kraut & Heiter, Zutaten, DE-ÖKO-006 | Zwei Glas-Säulen; beim Scroll „füllt" der Tropfen das Glas in Lavendel/Sage; Zutaten als ehrliche Spec-Liste (Geist Mono). |
| **Story** | Jessica & Sebastian, „Küche in Fulda", 9+/100%/Fulda | Pinned Split-Screen; Text erzählt sich Zeile für Zeile, während rechts vom Pumpkin-Spice-Moment zur Manufaktur übergeblendet wird. Kennzahlen zählen hoch. |
| **Reviews** | 3× 5★ Zitate | Zitate in großer Fraunces-Italic, einzeln im „Mondlicht"; Sterne als feine Goldpartikel. |
| **CTA** | „Bereit für deinen Lieblingssirup?" | Vollmond-Finale: der Tropfen ist angekommen, Mond voll, ein einzelner Gold-CTA. |
| **Footer** | Kontakt, Rechtliches, Brand | Ruhiger Nacht-Abschluss; neu gezeichnetes Crescent-SVG-Logo. |

---

## 6. Signature-Interaktionen (welche Awwwards-Zutat wo)
- **Custom Cursor** (golden dot → „drop" über Produkten, „view" über Bildern, „text"/magnetisch über Buttons & Links).
- **Cinematic Scroll-Choreografie** (GSAP + ScrollTrigger): Mondphasen-Pinning, Tropfenfall-Spine, gestaffelte Reveals, Story-Pin, Parallax-Tiefe.
- **Smooth Scroll** (Lenis).
- **Großzügige/kinetische Typo** (Fraunces + SplitText).
- **Grid-Breaking/Asymmetrie** + viel Dunkelraum.
- **Magnetische Buttons & Micro-Interactions** (Add-to-Cart „Tropfen fällt in Korb").
- **Page-/View-Transitions** (Tropfen-Wipe).
- **WebGL (gezielt, nicht Deko):** Mond + goldener Tropfen als GLSL-Shader im Hero; Film-Grain/Vignette-Pass. Performance-budgetiert, mit Canvas-Fallback.

**Anti-Pattern-Check:** kein Bootstrap-Look, keine mittigen 3-Karten ohne Idee, keine Default-Schatten, keine überall-Fade-ins. ✅

---

## 7. Asset-Bedarf (Brief für Phase 3 / Higgsfield)
> ⚠️ Legacy-Fotos sind in dieser Umgebung **nicht ladbar** (Host blockiert) und es liegen **keine** Nutzer-Fotos in `./source-assets/`. → *Gate-Frage zur Bildquelle.*

Konsistenter Look über alle Assets: **near-black Studio bei Nacht, gerichtetes warmes Licht von links-oben, Honiggold-Glow, dezentes Korn, Hochformat-Flaschen.**

| Slot | Asset | Higgsfield-Modell |
|---|---|---|
| Hero | Mood-/Produkt-Hero: Sirupflasche im Mondlicht, dunkler Studio-BG, goldener Lichtsaum | `nano_banana_pro` |
| Shop ×3–4 | Repräsentative Flaschen-Renderings (Karamell, Pumpkin, Lavendel, Spekulatius) im einheitlichen Dark-Studio-Look | `nano_banana_pro` (Edit/Studio-BG) |
| Limo ×2 | Lila & Laune + Kraut & Heiter Glas/Flasche, lavendel-/sage-getönt | `marketing_studio_image` |
| Story | Warme Manufaktur-/Hände-bei-der-Arbeit-Szene (Atmosphäre Fulda bei Nacht) | `nano_banana_pro` |
| Optional | 1 kurzer cinematischer Hero-Loop (Tropfen fällt) | `kling3_0` / `seedance_2_0` |

**Disziplin:** lieber 6 perfekte, look-konsistente Assets als 30 mittelmäßige. Logo wird als sauberes Vektor-SVG **neu gezeichnet** (Crescent + Tropfen + Botanik), keine Bitmap.

---

## 8. Tech-Stack (Lock, bestätigt verfügbar)
Next.js **16.2.7** (App Router, Turbopack) · React 19 · TypeScript · Tailwind **v4** (`@theme`, kein `tailwind.config.js`) · GSAP (ScrollTrigger/SplitText) + Lenis · Three.js/R3F + GLSL **nur** für Mond/Tropfen/Grain · `next/image` (AVIF/WebP) · shadcn/Radix nur für a11y-Widgets (Dialog/Cart-Sheet). — Node 22, npm-Registry erreichbar. ✅

---

## 9. Offene Entscheidungen (→ DECISIONS.md, am Gate zu klären)
1. **Kreative Route** A / B / C.
2. **Produkt-Bildquelle:** Higgsfield-Renderings generieren · Nutzer liefert Originale · bild-arme/abstrakte Art-Direction.
3. **Checkout:** faithful `mailto:`-Order (Default) · echtes Stripe-Checkout.

---

## ⛔ WARTE AUF FREIGABE
Kein Build vor Bestätigung der Richtung (Route + die zwei Bildquelle/Checkout-Fragen). Nach Freigabe: Phase 3 (Assets) → Phase 4 (Build) → Phase 5 (QA).
