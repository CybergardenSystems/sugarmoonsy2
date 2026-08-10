# DECISIONS.md — Annahmen & Entscheidungen

Laufendes Log getroffener Entscheidungen (begründete Defaults statt Blockaden).

## Phase 1 — Extraktion
- **D1:** Legacy ist Single-File `index.html`. Gesamter Code/Stil verworfen, nur Substanz nach `EXTRACT.md` übernommen.
- **D2:** Legacy-Produktfotos liegen als externe URLs auf `sugarmoonsweets.de` — Host in dieser Umgebung **blockiert** (`Host not in allowlist`), daher nicht ladbar. `./source-assets/` enthält keine Nutzer-Fotos. → Bildquelle ist offene Frage (siehe Gate).
- **D3:** Logo existiert als Inline-SVG → wird für den Neubau als sauberes Vektor-SVG neu gezeichnet (Crescent + Sirup-Tropfen + Botanik + Sterne).

## Phase 2 — Direktion
- **D4:** Empfohlene kreative Route = **A „Nocturne / Gebraut vom Mond"** (dark, lunar, goldener Tropfen als Signature). Begründung: ownable (= Markenname), Awwwards-Palette, ein dominantes Signature-Element. → **Gate-Bestätigung ausstehend.**
- **D5:** IA wird von Single-Page auf Multi-Route (App Router) erweitert: `/`, `/shop`, `/shop/[slug]`, `/limonaden`, `/story` + Rechtstext-Routen. Begründung: SEO, View-Transitions, saubere Trennung.
- **D6:** Checkout-Default = faithful `mailto:`-Bestellung (wie Legacy, kein Backend); Architektur Stripe-ready. → **Gate-Bestätigung ausstehend.**
- **D7:** Rechtstext-Seiten (Impressum/Datenschutz/Bio-Zert.) als Platzhalter mit sichtbarem Hinweis — Inhalte liegen nicht im Legacy vor und müssen vom Kunden kommen (rechtlich sensibel, nicht erfinden).
- **D8:** Tokens: Dark-first, Fraunces (Display) + Geist Sans (Text) + Geist Mono (Specs); Honiggold luminös auf Night-Canvas. Kontraste AA+.

## Gate-Freigabe (bestätigt)
- **G1:** Route **A — Nocturne / Gebraut vom Mond** freigegeben.
- **G2:** Bildquelle = **Nutzer liefert Originale** in `./source-assets/`. Konsequenz: Build nutzt ein Image-Slot-System mit eleganten Platzhaltern (Mond/Tropfen/Glas-Art-Direction trägt bis Fotos da sind). Keine Higgsfield-Produktfotos generiert. Drop-Anleitung in `source-assets/README.md`.
- **G3:** Checkout = **faithful `mailto:`-Bestellung** (kein Backend), Stripe-ready Architektur.

## Real-Photo / Brand Update (Inhaber lieferte 11 Fotos via Chat)
- **G2b:** Echte Etiketten = **Tannengrün + Gold-Sichelmond + Goldstaub + Script** (Vanille-Extrakt: schwarze Variante). → Palette von „warm near-black" auf **Pinien-Grün-Nacht + Honiggold + Mondlicht-Creme** geschärft; Logo wird passend zum echten Emblem (dünner Gold-Crescent) neu gezeichnet. Validiert Route A.
- **G2c:** Erweitertes Sortiment erkannt: Lavendel **mit Blaubeere**, **Kokos**, **Blaubeer-Basilikum** (neu ggü. Legacy) + Vanille-Extrakt + 50ml Geschenk-Lebkuchenmännchen.
- **G2d:** Chat-Bilder sind **nicht** als Repo-Dateien zugreifbar (Bytes nicht lesbar). → Build nutzt Slot-System + Platzhalter; echte Fotos erscheinen, sobald Dateien in `source-assets/products/` liegen (Namensschema in `source-assets/README.md`). Offene Aktion beim Nutzer.

## Phase 4 — Build
- **D9:** Mond + goldener Tropfen via **SVG + Canvas2D + GSAP** statt WebGL/R3F (Performance, Zuverlässigkeit, schlankes JS-Budget, 60fps). WebGL-Shader als spätere Enhancement-Option dokumentiert.
- **D10:** Fonts via `next/font` (Fraunces) + `geist`-Package (Sans/Mono) — self-hosted, kein CLS.

## Higgsfield-Assets

> ⚠️ D11–D14 sind **überholt**: Die Netzwerk-Beschränkung der damaligen
> Sandbox besteht nicht mehr. Alle Higgsfield-Assets (12 relit-Fotos, beide
> Hero-Loops) wurden heruntergeladen, optimiert und liegen self-hosted unter
> `/public/media` (siehe D15). `data/enhanced.ts`/`data/media.ts` enthalten
> nur noch lokale Pfade, `remotePatterns` wurde entfernt.
- **D11:** Hero-Hintergrund = Higgsfield-Video (Kling 3.0, „golden drop / nocturne"). Eingebunden per öffentlicher CDN-URL (`data/media.ts`), da die Build-Umgebung Higgsfield-Hosts blockiert (`403`). MoonScene als Fallback/reduced-motion.
- **D12:** Netzwerk-Constraint dokumentiert: Sandbox kann Higgsfield-CDN & Vercel-API nicht erreichen (`Host not in allowlist`), Ergebnisse kommen als CDN-Link (keine Bytes). Deshalb (a) lokale Bild-Tönung via `scripts/darkroom.py` als Fallback, (b) für KI-Relight musste das Repo kurz public sein, damit Higgsfield die Foto-URLs lesen kann.
- **D13:** 10 echte Produktfotos via `nano_banana_pro` auf dunklen Studio-BG relightet (Referenz = raw-GitHub-URL der Originale). Ergebnisse in `data/enhanced.ts` (Higgsfield-CDN-URL), bevorzugt vor lokalem Fallback (`lib/photos.ts`). Host in `next.config` remotePatterns erlaubt.
- **D14:** Hotlink-Tradeoff: Higgsfield-CDN-Objekte wirken permanent (keine Signatur-Query), sind aber nicht selbst-gehostet. Für volle Kontrolle später Bilder herunterladen → `/public/media/products/` → `data/enhanced.ts` leeren.

## Session „Council & Hardening" (Reset-Finalisierung)

- **D15:** Self-Hosting umgesetzt — CDN-PNGs (~5 MB) → WebP q82 max. 1400 px
  (25–43 KB) unter `public/media/relit/`; Hero-Loops (3,2/3,8 MB) lokal.
  Ersetzt D14-Hotlink-Tradeoff.
- **D16:** Legacy-Redirects: `/datenschutzerklaerung` + `/wo-wir-ausstellen`
  über `next.config.redirects` (301); `/Bio-Zertifizierung` über
  `middleware.ts` mit exaktem String-Vergleich, weil Config-Sources
  case-insensitiv matchen und sonst die Zielroute in eine 301-Schleife legen
  (Council R1, B1).
- **D17:** Bestellflow bleibt mailto (G3), aber ehrlich: kein „Bestellung
  übermittelt" mehr, sondern „bitte E-Mail absenden"-Zwischenschritt mit
  Bestelltext-Kopieren-Fallback; Längen-Guard (>1800 Zeichen → nur
  Kopier-Weg), qty ≤ 99, maxLength auf allen Feldern (Council R1, B4).
- **D18:** Hero-Intro als CSS-Animation statt SplitText — LCP-Render-Delay
  (gemessen 4,5 s) und Flash-of-visible-then-hidden beseitigt; GSAP/Lenis
  laden dynamisch nach Hydration (Council R1).
- **D19:** Hero-Poster sind Marken-Gradient-Standbilder (7 KB), keine
  Video-Frames: das Sandbox-Chromium dekodiert kein H.264, ffmpeg existiert
  nicht. Auf realen Browsern blendet das Video über das Poster. Bei Bedarf
  später durch echte Frames ersetzen (gleiche Dateinamen).
- **D20:** Kokos + Blaubeer-Basilikum bleiben bestellbar mit den bestehenden
  Preis-Tiers (15/16 €) als **begründeten Defaults**: der Inhaber lieferte
  die Produktfotos ausdrücklich fürs Sortiment und hat im Doku-Update
  (65d8692) die Kokos-Saison präzisiert, ohne die seit dem Initial-Build
  sichtbaren Preise zu beanstanden. Die Preise sind trotzdem **unbestätigt**
  und stehen als Launch-Frage im FINAL_REPORT (Council R1, Content#4).
- **D21:** Rechtstext-Mailadressen: Die Inhaber-Lieferung enthielt
  `scherf.sebastian@…` (Impressum) und `jessica.scherf@…` (Datenschutz);
  spätere Inhaber-Doku-Commits normalisierten auf `sebastian.scherf@…`.
  Diese letzte ausdrückliche Vorgabe bleibt stehen; die verbindliche
  Schreibweise ist als Launch-Frage dokumentiert (Council R1, Content#3).
- **D22:** Button-Familie: Kauf-CTAs teilen Füllung, Textstil und 12-px-Radius
  (`lib/buttonStyles.ts` + MagneticButton). Zwei bewusste Ausnahmen:
  der Nav-Chip „Bestellen" (Mono/Uppercase/Pille) gehört zur
  Navigations-Formsprache, nicht zur CTA-Familie; die Saison-Filter sind
  Pill-Toggles (Zustand, kein Kauf). Karten-Stepper behalten den
  10-px-Feld-Radius (Eingabe-Element). (Council R2, Design#8)
