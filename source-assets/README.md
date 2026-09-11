# source-assets — Bild-Dropzone

Hier kommen die **Original-Produktfotos** rein. Der Build bindet sie über ein
Image-Slot-System ein (`lib/products.ts` → Feld `photo`). Bis Dateien hier
liegen, zeigt die Seite elegante Platzhalter (Mond/Glas-Art-Direction).

> ⚠️ **Wichtig:** In den Chat gepastete Bilder landen **nicht** automatisch im
> Repo-Dateisystem. Damit die echten Fotos auf der Seite erscheinen, müssen die
> Dateien hier als echte Dateien liegen — per Git committen, in
> `./source-assets/products/` ablegen oder über die Upload-Seite hochladen, die
> in der Session gebaut wurde (die Bytes landen dann im Artifact-Speicher und
> werden von dort ins Repo geschrieben).

## Erwartete Dateien (`source-assets/products/`)
Benenne die Fotos exakt so — dann werden sie automatisch verdrahtet:

| Datei | Produkt |
|---|---|
| `vanille.jpg` | Bio-Vanille |
| `zimt.jpg` | Bio-Zimt |
| `pistazie.jpg` | Bio-Pistazie |
| `karamell.jpg` | Bio-Karamell |
| `spekulatius.jpg` | Bio-Spekulatius |
| `lebkuchen.jpg` | Bio-Lebkuchen |
| `lavendel-blaubeere.jpg` | Bio-Lavendelsirup mit Blaubeere |
| `kokos.jpg` | Bio-Sirup mit Kokosraspeln |
| `blaubeer-basilikum.jpg` | Bio-Blaubeer-Basilikumsirup |
| `apple-spice.jpg` | Bio-Apple Spice |
| `pumpkin-spice.jpg` | Bio-Pumpkin Spice |
| `vanille-extrakt.jpg` | Bio-Vanille-Extrakt |
| `geschenk-lebkuchenmann.jpg` | 50ml Geschenkflasche (Lebkuchenmännchen) |
| `hero.jpg` | optionales Hero-Stillleben |
| `story.jpg` | optionales Atmosphäre-/Manufaktur-Foto |

Format egal (jpg/png/webp/heic) — die Build-Pipeline (`scripts/optimize-media`)
konvertiert nach WebP/AVIF und legt sie unter `public/media/products/` ab.
Fehlende Dateien → Platzhalter, kein Fehler.

## ai-renders/
Abgelöste KI-Renderings, die durch echte Inhaber-Fotos ersetzt wurden. Sie
werden **nicht gelöscht**, damit jederzeit nachvollziehbar bleibt, was vorher
auf der Seite stand (aktuell: `pumpkin-spice.webp`, siehe `DECISIONS.md` D29).

## legacy/
Inventar der Legacy-URL-Assets (nicht ladbar in dieser Umgebung, Host blockiert).
