# FINDINGS.md — Schonungsloser Befund der Legacy-Website

> Audit-Gegenstand: `source-assets/legacy/index.html` (1062 Zeilen, Single-File,
> WordPress-Export-Stil, Stand vor dem Reset). Jedes Finding mit Severity und
> konkretem Beleg aus dem File. Kein diplomatisches Runden.

**Severity:** 🟥 Blocker · 🟧 Major · 🟨 Minor

---

## 1. Design

| Sev | Befund | Beleg |
|---|---|---|
| 🟥 | **Emoji als Produktbilder.** Die Mehrheit der Produktkarten zeigt kein Foto, sondern ein Emoji (🎃🍦💜…) in einer Farbkachel — für einen Shop, der von Sinnlichkeit/Handwerk lebt, ist das ein Totalausfall der Produktinszenierung. | 11 `emoji`-Vorkommen im Markup; nur 6 `<img>`-Tags auf der ganzen Seite |
| 🟧 | **Austauschbare Template-Optik.** Zentrierte 3-Spalten-Karten, Standard-Hero mit Pill-Badge, generische Fade-ins — die Seite könnte jede beliebige Manufaktur sein. Das stärkste Asset der Marke (der Name „Sugar *Moon*") wird visuell nicht verwendet. | Struktur Hero→Features→Grid ohne markenspezifisches Motiv; kein Mond außer im Logo-SVG |
| 🟨 | Rund gelutschte 100px-Pill-Buttons + Default-Schatten aus dem Baukasten. | `border-radius`-Werte im Inline-CSS |

## 2. UX

| Sev | Befund | Beleg |
|---|---|---|
| 🟧 | **Single-Page ohne Routen.** Shop, Produkte, Story, Limonaden teilen sich eine URL mit Ankern — kein Deep-Linking auf Produkte, keine teilbaren Produkt-URLs, Zurück-Button springt unerwartet. | IA: nur `#shop`, `#limo`, `#story`, `#rev`-Anker |
| 🟧 | **Bestellfluss endet im Modal + `mailto:`** ohne Statuskommunikation, ohne Validierungs-Feedback über `alert()`-Niveau hinaus. | Vanilla-JS-Bestell-Modal im File |
| 🟨 | Selbstgebaute „3D"-Scroll-Hacks und Parallax-Spielereien ohne Purpose, teils ruckelnd. | IntersectionObserver-/Scroll-Handler im Inline-JS |

## 3. Code

| Sev | Befund | Beleg |
|---|---|---|
| 🟥 | **Eine einzige HTML-Datei** mit inline `<style>` (inkl. dreier `@media`-Blöcke) und inline `<script>` für Cart/Filter/Parallax — kein Build, keine Module, keine Typen, nicht wartbar, nicht testbar. | 1062 Zeilen Single-File; `@media(max-width:1080px/768px/480px)` inline |
| 🟧 | Copy-&-Paste-Wiederholung der Produktkarten statt Datenmodell — jede Preisänderung = zwölf Handgriffe (der Fehlerklasse „ein Preis vergessen" ausgeliefert). | wiederholte Karten-Markup-Blöcke |
| 🟨 | Vermischte Font-Deklarationen (`'Fraunces'`, `'Outfit'`, `inherit`) ohne System. | 5 unterschiedliche `font-family`-Inline-Werte |

## 4. Performance

| Sev | Befund | Beleg |
|---|---|---|
| 🟧 | **Kein Lazy-Loading, keine Bildoptimierung.** Alle `<img>` laden eager in Originalgröße von WordPress-`/uploads/`; keine `srcset`/`sizes`, kein modernes Format. | 0× `loading="lazy"`; WP-URLs mit fixen Größen-Suffixen |
| 🟧 | Render-blockierende Google-Fonts + Inline-Monolith statt Code-Splitting. | `<link>`-Fonts + Inline-Script am Ende des Body |
| 🟨 | Scroll-Handler ohne Throttle/rAF-Disziplin. | Inline-JS |

## 5. SEO

| Sev | Befund | Beleg |
|---|---|---|
| 🟧 | **Ein Dokument für alles**: keine indexierbaren Produkt-/Unterseiten, keine strukturierten Daten (kein Product/LocalBusiness-JSON-LD), kein OG-Image, keine Sitemap/robots im File referenziert. | Single-Page-IA; kein `application/ld+json` |
| 🟨 | Title/Description vorhanden, aber generisch; keine Canonicals. | `<title>Sugar Moon Sweets – … | Online Shop</title>` |

## 6. Accessibility

| Sev | Befund | Beleg |
|---|---|---|
| 🟧 | **Nur 8 `aria-`-Attribute auf der gesamten Seite**; Cart-Sidebar und Modal ohne Fokus-Management, ohne `role="dialog"`, ohne Escape-Verhalten; Emoji-Produktbilder ohne semantische Alternative. | `grep -c "aria-"` = 8 |
| 🟧 | Kein `prefers-reduced-motion`-Respekt bei Parallax-/Scroll-Effekten. | kein `prefers-reduced-motion` im CSS/JS |
| 🟨 | Fokus-Stile Browser-Default auf dunklem Grund (kaum sichtbar). | kein `:focus-visible`-Styling |

## 7. Content

| Sev | Befund | Beleg |
|---|---|---|
| 🟨 | Substanz solide (Produkte, Preise, Story, Reviews vollständig), aber Rechtstexte/Bio-Zertifikat nur als externe Links auf nicht mitgelieferte WP-Seiten — im Rebuild anfangs als Platzhalter, inzwischen vom Inhaber geliefert (Impressum/Datenschutz) bzw. weiter offen (Bio-Zertifikat-Details). | Footer-Links auf `/impressum`, `/datenschutzerklaerung`, `/Bio-Zertifizierung` |

---

## Fazit

Die Substanz (Inhalte, Produkte, Marke) war gut — die Ausführung auf allen
Ebenen Anfänger-Niveau: Single-File-Architektur, Emoji-statt-Foto, keine
A11y-Disziplin, keine SEO-Struktur, keine Bild-Pipeline. Der Reset war die
richtige Entscheidung; nichts vom Legacy-Code war übernehmenswert
(→ `CONTENT_INVENTORY.md` §9: null Zeilen Code übernommen).
