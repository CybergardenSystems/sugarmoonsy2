# ASSET_INVENTORY.md — Vollständiges Asset-Verzeichnis

> Jede Bilddatei mit Herkunft, Ableitungen und Verwendungsort. **Originale
> werden nie überschrieben** — alle Optimierungen sind zusätzliche Dateien.

## 1. Produktfotos (Inhaber-Originale)

Anlieferung: **15 Dateien** vom Inhaber in `source-assets/products/` —
11 Produkt-/Flaschenmotive + zwei Stand-Fotos
(`adventsmarkt-jessica-sebastian.jpg`, `marktstand-jessica-sebastian.jpg`) +
`limonaden-original.jpg` (Gruppenbild) + `zimt-alt.jpg` (Alternativtake).
(CONTENT_INVENTORY §8b spricht von „11 Fotos": 10 Flaschenmotive + Adventsmarkt;
Gruppenbild und Alternativtake kamen zusätzlich, `pumpkin-spice.jpg` und das
neue Stand-Foto wurden später nachgeliefert — D29.)
`public/media/originals/` spiegelt die **10 zuerst gelieferten Flaschenmotive**
zusätzlich; die übrigen Dateien liegen nur in `source-assets/products/` —
ebenfalls unangetastet im Repo.

| Sorte / Motiv | Original | Getönt (Fallback) | Relit (aktiv im Shop) |
|---|---|---|---|
| Bio-Vanille | `source-assets/products/vanille.jpg` | `public/media/products/vanille.jpg` | `public/media/relit/vanille.webp` |
| Bio-Pistazie | `…/pistazie.jpg` | `…/pistazie.jpg` | `…/pistazie.webp` |
| Bio-Zimt | `…/zimt.jpg` (+ `zimt-alt.jpg`) | `…/zimt.jpg` | `…/zimt.webp` |
| Bio-Spekulatius | `…/spekulatius.jpg` | `…/spekulatius.jpg` | `…/spekulatius.webp` |
| Bio-Lebkuchen | `…/lebkuchen.jpg` | `…/lebkuchen.jpg` | `…/lebkuchen.webp` |
| Bio-Lavendel m. Blaubeere | `…/lavendel-blaubeere.jpg` | `…/lavendel-blaubeere.jpg` | `…/lavendel-blaubeere.webp` |
| Bio-Blaubeer-Basilikum | `…/blaubeer-basilikum.jpg` | `…/blaubeer-basilikum.jpg` | `…/blaubeer-basilikum.webp` |
| Bio-Kokos | `…/kokos.jpg` | `…/kokos.jpg` | `…/kokos.webp` |
| Bio-Vanille-Extrakt | `…/vanille-extrakt.jpg` | `…/vanille-extrakt.jpg` | `…/vanille-extrakt.webp` |
| 50ml-Geschenk (Lebkuchenmann) | `…/geschenk-lebkuchenmann.jpg` | `…/geschenk-lebkuchenmann.jpg` | `…/geschenk-lebkuchenmann.webp` |
| Bio-Pumpkin Spice *(nachgeliefert, D29)* | `…/pumpkin-spice.jpg` (1084×1451) | — | `…/pumpkin-spice.webp` (1045×1400, 61 KB) |
| Limonaden-Gruppenfoto | `…/limonaden-original.jpg` | — | — (Quelle für Limo-Einzelbilder) |
| Adventsmarkt **Rothemann** (Jessica & Sebastian) | `…/adventsmarkt-jessica-sebastian.jpg` | — | — (bis D29 Quelle von `public/media/story.jpg`; Legacy-Quelle: `Advent-Rothemann_2025`) |
| Marktstand (Jessica & Sebastian) *(nachgeliefert, D29)* | `…/marktstand-jessica-sebastian.jpg` (1402×1122) | — | → `public/media/story.jpg` (1400×1120, 160 KB) |

**Pipeline-Herkunft:**
- *Getönt* („darkroom"): lokale Tonwert-Anpassung der Originale auf den
  Nocturne-Look via `scripts/darkroom.py` — Fallback-Ebene.
- *Relit*: Higgsfield `nano_banana_pro`, echte Flaschen auf dunklen
  Studio-Hintergrund relightet (Gate-Freigabe G2b, `DECISIONS.md` D13).
  Ursprünglich CDN-gehostet; in dieser Session heruntergeladen, auf max.
  1400 px verkleinert, WebP q82 (25–43 KB) → `public/media/relit/`, Verweise
  in `data/enhanced.ts`. **Keine externe CDN-Abhängigkeit mehr.**
- *Ausnahme Pumpkin Spice:* Das Foto kam fertig im Studio-Look vom Inhaber und
  wurde **nicht** relightet — nur auf 1045×1400 gebracht und als WebP q82
  gespeichert. Es liegt im selben Ordner, weil `data/enhanced.ts` dorthin zeigt.
  Einziger Eingriff: Die Flasche stand randlos im Originalausschnitt (98 % der
  Bildhöhe), die Geschwisterbilder liegen bei 78–87 %. Sie wurde deshalb auf
  86 % herunterskaliert und der freiwerdende Rand durch Fortsetzen der
  Randpixel (`extendWith: "copy"`) aufgefüllt — messbar nahtlos (Δ ≤ 2 von 255
  an der Kante). Damit steht die Flasche in der Shop-Kachel exakt so groß wie
  alle anderen; Bildinhalt und Farben bleiben unangetastet.
- *Story-Foto:* nur auf 1400 px Breite skaliert, JPEG q82 (mozjpeg,
  progressiv) — keine Tonwert-Bearbeitung.
- Seit D30 liegt in `public/media/relit/` **ausschließlich** Material, das auf
  echten Flaschenfotos beruht.

## 2. KI-Renderings

**Auf der Website ist keines mehr im Einsatz.** Beide ausgemusterten Dateien
sind nicht gelöscht, sondern liegen unter `source-assets/ai-renders/`:

| Motiv | Archiv-Datei | Warum abgelöst |
|---|---|---|
| Bio-Pumpkin Spice | `source-assets/ai-renders/pumpkin-spice.webp` | echtes Inhaber-Foto nachgeliefert (D29) |
| Bio-Bratapfel | `source-assets/ai-renders/bratapfel-rendering.webp` | Etikett trug sichtbar „BIO BRATAPFEL"; nach der Umbenennung in **Bio-Apple Spice** (D30) wäre das ein Widerspruch gewesen |

Bio-Apple Spice rendert deshalb den Mond-Platzhalter aus `ProductCard`, bis ein
echtes Flaschenfoto vorliegt — das ist der einzige verbliebene Bild-Platzhalter
der Website.

## 3. Limonaden (Hunfelt-Bräu-Flaschen)

| Motiv | Datei | Verwendung |
|---|---|---|
| Lila & Laune | `public/media/products/lila-laune.jpg` | `LimoCards` (`data/media.ts → limoPhotos`) |
| Kraut & Heiter | `public/media/products/kraut-heiter.jpg` | dito |

## 4. Videos (Higgsfield-generiert, self-hosted)

| Motiv | Datei | Größe | Verwendung |
|---|---|---|---|
| Hero-Loop Querformat | `public/media/hero.mp4` | 3,2 MB H.264 | Hero ≥768 px; lädt nicht bei reduced-motion, `saveData` oder 2G (Gate in `HeroBackground.tsx`) |
| Hero-Loop Hochformat 9:16 | `public/media/hero-portrait.mp4` | 3,8 MB H.264 | Hero <768 px; gleiche Gates |
| Hero-Poster (quer/hoch) | `public/media/hero-poster.webp`, `hero-portrait-poster.webp` | je ~7 KB | Sofort ladender LCP-Anker unter dem Video. **Hinweis:** Marken-Gradient-Standbilder, keine Video-Frames (Sandbox-Chromium ohne H.264, kein ffmpeg — siehe DECISIONS D19) |

## 5. Marke & Sonstiges

| Asset | Datei | Hinweis |
|---|---|---|
| Story-Bild | `public/media/story.jpg` | Inhaber-Foto Marktstand, 1400×1120, 160 KB (seit D29; vorher das Adventsmarkt-Foto mit 266 KB) |
| Favicon | `public/favicon.svg` | neu gezeichnetes Crescent-SVG |
| Logo/Emblem | `components/brand/MoonMark.tsx`, `Logo.tsx`, `Drop.tsx` | Vektor-Neuzeichnung nach echtem Etikett (kein Bitmap) |
| OG-Image | `app/opengraph-image.tsx` → statisch generiert | 1200×630, Fraunces-600 (`assets/fonts/`, OFL) |
| Legacy-Website | `source-assets/legacy/index.html` | vollständiges Backup, read-only |
| Veranstaltungs-Flyer | `public/media/events/` | Flyer zu einzelnen Terminen, verknüpft über das Feld `flyer` in `data/events.ts`; werden unbeschnitten gezeigt (`object-contain`), Klick öffnet die volle Auflösung |

## 6. Alt-Texte

Alle inhaltstragenden Bilder haben deutschsprachige `alt`-Attribute
(Produktname + Beschreibung des Sichtbaren); dekorative Elemente (MoonScene,
Glows, SVG-Ornamente) sind konsequent `aria-hidden`. Nicht mehr referenzierte
Legacy-Bild-URLs (WordPress `/uploads/`) sind in
`CONTENT_INVENTORY.md` §8 dokumentiert und waren aus der Sandbox nie ladbar.
