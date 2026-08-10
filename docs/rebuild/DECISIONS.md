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
- **D11:** Hero-Hintergrund = Higgsfield-Video (Kling 3.0, „golden drop / nocturne"). Eingebunden per öffentlicher CDN-URL (`data/media.ts`), da die Build-Umgebung Higgsfield-Hosts blockiert (`403`). MoonScene als Fallback/reduced-motion.
- **D12:** Netzwerk-Constraint dokumentiert: Sandbox kann Higgsfield-CDN & Vercel-API nicht erreichen (`Host not in allowlist`), Ergebnisse kommen als CDN-Link (keine Bytes). Deshalb (a) lokale Bild-Tönung via `scripts/darkroom.py` als Fallback, (b) für KI-Relight musste das Repo kurz public sein, damit Higgsfield die Foto-URLs lesen kann.
- **D13:** 10 echte Produktfotos via `nano_banana_pro` auf dunklen Studio-BG relightet (Referenz = raw-GitHub-URL der Originale). Ergebnisse in `data/enhanced.ts` (Higgsfield-CDN-URL), bevorzugt vor lokalem Fallback (`lib/photos.ts`). Host in `next.config` remotePatterns erlaubt.
- **D14:** Hotlink-Tradeoff: Higgsfield-CDN-Objekte wirken permanent (keine Signatur-Query), sind aber nicht selbst-gehostet. Für volle Kontrolle später Bilder herunterladen → `/public/media/products/` → `data/enhanced.ts` leeren.
