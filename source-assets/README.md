# source-assets — Bild-Dropzone

Hier kommen die **Original-Produktfotos** rein. Der Build bindet sie über ein
Image-Slot-System ein (`lib/products.ts` → Feld `photo`). Bis Dateien hier
liegen, zeigt die Seite elegante Platzhalter (Mond/Glas-Art-Direction).

> ⚠️ **Wichtig:** In den Chat gepastete Bilder landen **nicht** automatisch im
> Repo-Dateisystem — ich (Claude) kann ihre Bytes nicht lesen. Damit die echten
> Fotos auf der Seite erscheinen, müssen die Dateien hier als echte Dateien
> liegen (per Git committen oder in `./source-assets/products/` ablegen).

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
| `bratapfel.jpg` | Bio-Bratapfel |
| `pumpkin-spice.jpg` | Bio-Pumpkin Spice |
| `vanille-extrakt.jpg` | Bio-Vanille-Extrakt |
| `geschenk-lebkuchenmann.jpg` | 50ml Geschenkflasche (Lebkuchenmännchen) |
| `hero.jpg` | optionales Hero-Stillleben |
| `story.jpg` | optionales Atmosphäre-/Manufaktur-Foto |

Format egal (jpg/png/webp/heic) — die Build-Pipeline (`scripts/optimize-media`)
konvertiert nach WebP/AVIF und legt sie unter `public/media/products/` ab.
Fehlende Dateien → Platzhalter, kein Fehler.

## legacy/
Inventar der Legacy-URL-Assets (nicht ladbar in dieser Umgebung, Host blockiert).
