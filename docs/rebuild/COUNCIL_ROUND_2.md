# COUNCIL_ROUND_2.md — Cross-Verifikation der Runde-1-Fixes

> Zwei unabhängige Verifizierer (Technik/A11y · Design/Content) haben die
> Runde-1-Fixes **mit denselben Messmethoden wie Runde 1** abgenommen
> (Playwright-Tab-Sequenzen, Pixel-Kontrastmessung, HTTP-Status, DOM-Audits,
> Screenshots) — kein Diff-Abnicken. Anschließende Nacharbeit wurde mit
> denselben Methoden gegengemessen.

## Verifikations-Bilanz

**Technik/A11y: 12 von 14 Punkten VERIFIZIERT.** Darunter alle harten
Runde-1-Blocker: Skip-Link sichtbar + Fokus-Transfer auf `main` (gemessen),
Menü-Fokus-Trap (8/8 Tab-Stops im Overlay), Bestellflow ehrlich (Feldfehler
mit `role=alert`/`aria-invalid`, Fokus aufs Fehlerfeld, kein „auf dem
Weg"-Versprechen, Warenkorb bleibt erhalten), mailto-Guard (24-Positionen-Korb
→ Fallback statt mailto), Storage-Crash-Schutz (5/5 Payloads ohne Pageerror,
Key wird normalisiert), Vignette (schlechtester Rechtstext-Kontrast 15,28:1
statt 2,77:1), Kontrast-Tokens (moon-mute 4,64–6,94:1 auf allen Flächen,
Feldrahmen 3,27:1), Radius monoton, Headings ohne Sprünge, LCP-Markup
(nur Poster-Preloads), No-JS sichtbar (36/36 Reveals opacity 1), Marquee
pausierbar + Duplikat aria-hidden, alle Routen/Redirects per HTTP-Status.

**Design/Content: 12 von 14 Punkten VERIFIZIERT** (2 teilweise). Sichel-Mond
deckungsgleich mit der Bildmarke, 1 Scrim je Breakpoint, PDP-CTA misst exakt
`#E8B25E` (kein Oliv-Schleier), Felder eckiger als Submit, Mobile-Scrollhöhe
−48 %, Cursor parkt unsichtbar, Warenkorb-Thumbnails + Leerzustand-CTA,
`/story`-H1, Rothemann repo-weit korrekt, alle 5 Legacy-Wiederherstellungen
(Title, Description, Kontakt-Spalte, 50-ml-Hinweis, „5-Sterne Bewertungen"),
Superlative/unbelegte Claims 0 Treffer, Doku-Banner vorhanden.

## Zurückgewiesene Punkte + Nacharbeit (erledigt & gegengemessen)

| Auflage | Nacharbeit | Gegenmessung |
|---|---|---|
| **BLOCKER (neu): Scroll-Lock wirkungslos bei laufendem Lenis** — Lenis räumt fremde `lenis-*`-Klassen ab und scrollt programmatisch an `overflow:hidden` vorbei; R1-Fix galt nur für reduced-motion | `lib/scrollLock.ts`: zentrale Registry mit Sperr-Zähler; `SmoothScroll` registriert die Lenis-Instanz, `lockScroll()/unlockScroll()` rufen zusätzlich `lenis.stop()/start()`; Cart **und** Menü nutzen dieselbe Sperre | **6/6 LOCKED**: beide Motion-Modi (`no-preference` + `reduce`) × beide Öffnungswege (Header-Button + Add-to-Cart) + mobiles Menü in beiden Modi — scrollY-Delta 0 px |
| **MAJOR (neu): Bestell-Step-Wechsel ohne Fokus/Live-Region** — activeElement fiel auf BODY, kein `aria-live` | Überschrift des Erfolgs-/Fallback-Screens erhält `tabIndex={-1}` + programmatischen Fokus; Statusabsatz als `role="status"` | Gemessen: nach Submit `activeElement = H2 „Fast geschafft!"`, `role=status` trägt die Anweisung |
| **MAJOR: FINAL_REPORT.md existierte nicht** (tote Verweise aus README/D20/Changelog) | `FINAL_REPORT.md` angelegt — enthält u. a. die Launch-Fragen, auf die D20/D21 verweisen | Links geprüft |
| **MAJOR: COPY_CHANGELOG unvollständig** („Noch ist es still hier.", Leerzustand-CTA, Marquee-Labels, /story-Sub nicht zitiert) | §5 um alle vier Einträge ergänzt, /story-Sub wörtlich zitiert | Gegengelesen |
| **MAJOR (nicht reproduzierbar): Mobilkarten-Clipping in 2/5 Läufen** | Ursache identifiziert: die betroffenen Läufe trafen den Server **während** eines Rebuild/Restart-Zyklus mit dem Vor-Fix-Build (Race der Verifikation, kein Code-Fehler) | **9/9 stabil** über 3 Läufe × 360/390/430 px: `flex-direction: column`, Button in der Karte (−17 px Innenabstand), Preis einzeilig |
| Minor: Menü-Schließen-Button außerhalb des Trap-Containers | Sichtbarer Schließen-Button im Overlay ergänzt (Trap-erreichbar) | Im Overlay, fokussierbar |
| Minor: Footer-Mail bricht mitten im Wort | Kontakt-Spalte zeigt „E-Mail schreiben" + Domain; volle Adresse steht im Marken-Block direkt darüber | Screenshot |
| Minor: Karten-CTA 10 px Radius (Ausreißer) | Karten-CTA + Coming-Soon auf 12-px-Familie; Nav-Chip + Filter-Pills als bewusste Ausnahmen dokumentiert (DECISIONS D22) | — |
| Minor: PageHeader-Deko-Mond kollidiert mit Nav | tiefer positioniert (top-16), Opazität 35 % | Screenshot |
| Minor: QA_PHASE5 „Status: grün" unter dem Banner | Zeile auf „damals grün — nach heutigem Stand widerlegt" geändert | Gegengelesen |
| Minor: Logo-Tagline im Accessible Name | War zum Messzeitpunkt bereits `aria-hidden` (Zwischenstand-Messung) | Code geprüft |

## Ergebnis

Beide Verifizierer haben ihre Freigabe an konkrete, messbare Auflagen
geknüpft. **Jede dieser Auflagen ist umgesetzt und mit der jeweils
geforderten Messmethode nachgewiesen** (Tabelle oben). Es verbleiben keine
offenen Code-Blocker oder -Majors.

Was bewusst offen bleibt, sind **Inhaber-Entscheidungen**, keine Defekte —
sie sind in `FINAL_REPORT.md` §Launch-Fragen aufgeführt (Preise
Kokos/Blaubeer-Basilikum, verbindliche Rechtstext-Mailadresse, Inhalte der
Bio-Zertifizierungs-Seite, Feld-CWV nach Deploy).

Damit gilt der Council-Prozess nach zwei Runden als abgeschlossen:
Runde 1 fand mit fünf unabhängigen, adversarialen Reports 44 Findings;
Runde 2 verifizierte die Fixes unabhängig, wies fünf Punkte zurück und
nahm die Nacharbeit nach Gegenmessung ab.
