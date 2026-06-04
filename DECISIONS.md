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
