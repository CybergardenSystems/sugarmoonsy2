# COUNCIL_ROUND_1.md — Adversariale Review-Runde 1

> 5 unabhängige Kritiker-Agents (Design Juror, Tech Lead, Content Auditor,
> UX/A11y Auditor, Skeptiker) prüften parallel den Stand `e9c3f26` gegen den
> laufenden Production-Build auf `localhost:3000`. Methodik: Code-Lektüre
> **plus** Messung am gerenderten Build (Playwright-Screenshots 375–1920 px,
> Tab-Sequenzen, Kontrast-Pixelmessung, HTTP-Statusprüfung, curl-Head-Audits).
>
> **Ergebnis: 5× KEINE FREIGABE.** 44 deduplizierte Findings
> (9 Blocker-Cluster, 23 Majors, 12 Minors). Auffälligstes Muster: mehrere
> bewusst gebaute Mechanismen (Skip-Link, Scroll-Lock, Erfolgs-Screen,
> Redirects) existieren im Code, funktionieren aber am laufenden Build
> nachweislich nicht — Sichtprüfung des Diffs hätte das nie gefunden.

---

## Konsolidierte Blocker (Runde-1-Fixliste)

| ID | Quelle(n) | Befund | Fix |
|---|---|---|---|
| B1 | Content#1, Skeptiker#1 | `/bio-zertifizierung` in 301-Endlosschleife (Next matcht Redirect-Sources case-insensitiv → `/Bio-Zertifizierung`-Regel trifft die Zielroute selbst); Seite aus Footer + Sitemap unerreichbar | Config-Redirect ersetzen durch exakt-case Middleware; Smoke-Test aller Routen als Pflicht-Gate |
| B2 | UX#1+#2, Tech#11, Skeptiker#6 | Skip-Link doppelt defekt: eigene unlayered `.sr-only`-Kopie schlägt Tailwinds `not-sr-only` (bleibt 1×1 px), und der Lenis-Anchor-Bridge frisst den Fokus-Transfer (`main` ohne `tabindex`) | Eigene sr-only-Regeln löschen, `tabIndex={-1}` auf `main`, Bridge fokussiert Ziel bzw. nimmt Skip-Link aus |
| B3 | UX#3 | Mobiles Menü ohne Fokus-Trap — ab Tab-Stop 6 wandert der Fokus hinter das opake Overlay | `useFocusTrap` auch fürs Menü |
| B4 | Tech#1, Skeptiker#3+#4, UX#4 | Bestellflow meldet **bedingungslos** Erfolg nach `mailto:` („Deine Bestellung ist auf dem Weg"), leert den Warenkorb; mailto-URL sprengt bei realen Warenkörben die ~2000-Zeichen-Client-Limits; `qty` ohne Obergrenze, Felder ohne `maxLength` | Ehrlicher Zwischenschritt („E-Mail-Entwurf geöffnet — bitte absenden") + Bestelltext-Kopieren-Fallback, Warenkorb nur explizit leeren, Längen-Guard, qty ≤ 99 |
| B5 | Tech#2, Skeptiker#5 | `JSON.parse` aus localStorage ohne Schema-Guard im Root-Provider, keine `global-error.tsx` → persistente weiße Seite auf allen Routen bei kaputtem Storage | Item-Validierung + Storage-Reset, `app/global-error.tsx` |
| B6 | Design#1, UX#5 | Fixe `.vignette` (`z-index:1`, Rand bis 78 % Ink) liegt über allem nicht z-gelifteten Content: Kauf-Buttons wirken disabled (A/B-Screenshot), Rechtstext-H2 fällt von 15,4:1 auf 2,77:1 | Vignette hinter den Content (`body::before`, negatives z-index) und abschwächen |
| B7 | Design#2 | Radius-Skala nicht monoton (nur `sm`/`lg` überschrieben): Formularfelder werden Vollpillen, runder als ihr Submit-Button; tote Tokens | Vollständige monotone `--radius-*`-Skala |
| B8 | Design#3 | Hero-„Mond" ist eine braune Gradient-Vollscheibe — widerspricht der Sichel-Bildmarke; 6 Dunkel-Layer ersticken Video und Idee | Mond als Sichel (konsistent zu `MoonMark`), Scrims konsolidieren |
| B9 | Content#2+#3+#4 | „Adventsmarkt **Fulda**" erfunden (Quelle: Rothemann); Rechtstext-Mailadressen nach Inhaber-Lieferung geändert, während das Changelog „kein Wort geändert" behauptet; Preise/Saison für Kokos + Blaubeer-Basilikum ohne Quelle | Ortsangabe korrigieren; Changelog-Wahrheit herstellen + Adress-Rückfrage als Launch-Blocker dokumentieren; Preis-Defaults kennzeichnen + Inhaber-Bestätigung einfordern |

## Konsolidierte Majors (Auszug, vollständig in den Einzelreports)

Bestseller fehlt im Teaser (veraltetes Sortierfeld statt `hasPhoto`) · falsche
`sizes` → unscharfe Handy-Fotos · `priority` auf Below-fold-Bildern gegen den
LCP · 3,8-MB-Video auf Mobile ohne saveData-Gate/Poster/Cache-Header ·
Scroll-Lock an Lenis-Klasse gekoppelt (reduced-motion scrollt durch) ·
Hero-Intro reißt SSR-sichtbaren Text weg (Flash + LCP-Render-Delay 4,5 s) ·
`.reveal` versteckt Content ohne JS · Kontrast: `moon-mute` auf `night-3/4`
unter AA, Hero-Lede 2,35:1 über Glow, Checkout-Felder 1,36:1-Rahmen ·
9,6-px-Formular-Labels (bis 8 px Kleinsttext) · Formular ohne
`required`/`aria-invalid`/Feldfehler · Toast zeigt Fehler mit Erfolgs-Häkchen ·
Marquee ohne Pause (WCAG 2.2.2) + doppelt vorgelesen · Saison-Filter und
Größenwahl ohne Zustands-Semantik · `/story` ohne `h1`/PageHeader · 8
konkurrierende Gold-Button-Varianten, 13 Border-Alphas, 7 Inline-Type-Clamps
ohne rem-Term · Cursor-Ring parkt vor erster Mausbewegung im Content,
`cursor:none` killt Text-Cursor in Feldern · 1-Spalten-Produktliste auf Phones
(12.000 px Scrollhöhe) · Warenkorb ohne Thumbnails/Leerzustand-CTA ·
Footer-Spalte „Kontakt" + sichtbare Domain entfallen · Title/Description
verlieren „Online Shop"/„Jetzt online bestellen" · Security-Header fehlen
komplett · Sitemap listet Redirect-Loop + Platzhalterseite · Doku widerspricht
Code (QA_PHASE5 „grün" mit 7 falschen Claims, CONTENT_INVENTORY §8/8b,
DECISIONS D11–D14 überholt, README-Links tot, Fotozahlen 11/13 inkonsistent).

## Einzel-Verdikte

| Mitglied | Urteil | Kernsatz |
|---|---|---|
| DESIGN JUROR | KEINE FREIGABE | „Der wichtigste Button der Seite sieht aus wie deaktiviert […] und der Mond ist ein brauner Radialgradient, der der eigenen Sichel-Bildmarke widerspricht." |
| TECH LEAD | KEINE FREIGABE | „Ein Shop, der Bestellungen still verlieren kann, ist nicht produktionsreif — unabhängig davon, wie gut alles andere aussieht." |
| CONTENT AUDITOR | KEINE FREIGABE | „Eine verlinkte Seite ist unerreichbar, eine Ortsangabe erfunden, zwei Preise ohne Quelle, und die Doku behauptet das Gegenteil des Nachweisbaren." |
| UX & A11Y AUDITOR | KEINE FREIGABE | „Ein Bypass-Mechanismus, der zu 0 % funktioniert, ist schlechter als keiner — er verdeckt das Problem im Code-Review." |
| SKEPTIKER | KEINE FREIGABE | „Solange die als ‚Wahrheitsquelle' deklarierten Dokumente dem Code aktiv widersprechen, ist jede weitere Freigabe auf dieser Basis wertlos." |

## Positiv-Befunde (verifiziert)

Kein Horizontal-Overflow auf 28 Viewport-Kombinationen · Fokus-Ring 9,3:1 auf
allen Tab-Stops · Cart-Sheet-Fokusfluss korrekt (rein/Escape/Restore, `inert`) ·
Primär-Buttons 10,1:1 · Float-Mathematik der Preise exakt · OG/Twitter/
Canonical vollständig · `useMediaQuery`/`useHydrated` mustergültig SSR-sicher ·
alle Dependencies genutzt, `tsc`/`eslint` grün · Rechtstexte bis auf die
Mail-Adressen wortidentisch mit der Inhaber-Lieferung · ProductCard-Placeholder,
404-Copy („Neumond.") und Mondphasen-USPs als echte Gestaltungsideen anerkannt.

## Auflagen für Runde 2

1. Alle Blocker B1–B9 und die Major-Liste behoben; Abnahme **mit denselben
   Messmethoden** (HTTP-Status aller Routen, Tab-Sequenz, Kontrast-Messung,
   Screenshot), nicht per Diff-Sichtung.
2. Doku-Wahrheit: QA_PHASE5 mit Veraltet-Banner, CONTENT_INVENTORY §8/8b und
   DECISIONS D11–D14 als überholt markiert, ASSET_INVENTORY korrigiert
   (saveData-Claim, Fotozahlen, Rothemann), COPY_CHANGELOG vollständig.
3. Verifikation jedes Fixes durch ein **anderes** Council-Mitglied als den
   Autor (Cross-Check-Agents in Runde 2).
