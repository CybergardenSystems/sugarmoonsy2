# COPY_CHANGELOG.md — Alle Textänderungen mit Vorher/Nachher

> Regel aus dem Master-Prompt: Texte dürfen sprachlich professionalisiert
> werden, solange **jede enthaltene Information erhalten bleibt**; jede
> Änderung über Rechtschreibkorrektur hinaus wird hier dokumentiert.
>
> **Quellen-Legende:**
> `[Inhaber]` = ausdrückliche Vorgabe des Inhabers (Commits „Inhaber-Doku",
> echte Rechtstexte, echte Etiketten/Fotos) · `[Kreativ]` = sprachliche
> Professionalisierung im Zuge der neuen Design-Richtung, informationserhaltend ·
> `[Parität]` = Korrektur in dieser Session, um unbelegte Aussagen zu entfernen.

---

## 1. Inhaber-Updates (Fakten geändert auf Anweisung) `[Inhaber]`

| Was | Legacy | Neu |
|---|---|---|
| Sortiment | 10 Sirup-SKUs inkl. Bio-Karamell, „9+ Sorten" | **Bio-Karamell entfernt**, reale Sorten von den Etiketten ergänzt (Kokos, Blaubeer-Basilikum, Lavendel **mit Blaubeere**) → **11 Sorten** überall (Stats, Marquee, Teaser) |
| Preise 250 ml | 13,00 € / 14,00 € | **15,00 € / 16,00 €** |
| Bio-Bratapfel | regulär bestellbar | **„Coming Soon"**, nicht bestellbar |
| Saison-Modell | eine Saison je Sorte | Mehrfach-Saisons (`seasonKeys[]`), z. B. Lavendel ganzjährig **und** Frühling/Sommer; Kokos nur Sommer |
| Kontakt-E-Mail | info@sugarmoonsweets.de | **sebastian.scherf@sugarmoonsweets.de** (Footer, Shop, Ausstellungen, Impressum, Datenschutz) |
| Impressum / Datenschutz | im Legacy-File nicht enthalten (externe WP-Seiten) | echte Texte vom Inhaber, wortidentisch übernommen — **mit einer dokumentierten Ausnahme:** die Kontakt-Mailadressen (`scherf.sebastian@…` im Impressum, `jessica.scherf@…` 2× im Datenschutz) wurden in den späteren Inhaber-Doku-Commits (65d8692, f962388) auf `sebastian.scherf@sugarmoonsweets.de` normalisiert. Da die Adresse im Impressum rechtlich verbindlich ist, steht die Rückbestätigung der korrekten Schreibweise als **Launch-Frage** im FINAL_REPORT |
| Ausstellungen | Seite lag nicht im Legacy-File vor | echte „Wo wir ausstellen"-Copy vom Inhaber + Vorschlag-CTA |

## 2. Kreative Professionalisierung (Information erhalten) `[Kreativ]`

| Stelle | Legacy | Neu | Prüfung Informationserhalt |
|---|---|---|---|
| Hero-H1 | „Sirup mit *Seele* — jetzt online bestellen" | „Sirup mit *Seele* — gebraut vom Mond." | „online bestellen" bleibt über CTA „Zum Shop", Nav-Button „Bestellen" und Shop-Flow präsent |
| Hero-Pill | „🌿 Bio-zertifiziert · Handgemacht in Fulda" | gleicher Text, Blatt-Icon statt Emoji | identisch |
| Hero-Sub | „…direkt von unserer Manufaktur zu dir." | „…direkt aus unserer Manufaktur in Fulda zu dir." | + Ortsangabe (belegt) |
| Shop-Seitenkopf | „Wähle deine Lieblingssirupe" (Single-Page-Sektion) | Startseiten-Teaser behält den Legacy-Titel; die neue `/shop`-Seite titelt „Alle Sorten, gebraut vom Mond" | Legacy-Titel bleibt sichtbar (Teaser), neuer Titel nur Zusatzfläche |
| Shop-Sub | „Direkt von der Manufaktur — wähle Größe und Menge, ab in den Warenkorb und fertig." | leicht gestrafft, gleicher Inhalt; `/shop` ergänzt „Die 50 ml-Fläschchen gibt es bei jeder Sorte, perfekt zum Verschenken." | 50-ml-Geschenk-Hinweis ist Legacy-Substanz („perfekt zum Verschenken") |
| USP-Sektion | Titel + 3 USPs | wörtlich übernommen, neue Sub-Zeile „Drei Versprechen, so verlässlich wie der Lauf des Mondes …" ergänzt | reine Ergänzung |
| Story (Startseite) | 3 Absätze About-Text | **wörtlich** übernommen | identisch |
| Story (`/story`, erweitert) | — | ein zusätzlicher Absatz (Fassung nach Council R1, siehe §5): „Jede Flasche entsteht in unserer Manufaktur — familiengeführt, mit Herzblut und Sorgfalt — und trägt unser Mond-Etikett. Bio-zertifiziert, saisonal gedacht, ohne künstliche Zusätze." | jede Aussage wörtlich durch Legacy-USPs und die echten Etiketten gedeckt |
| Reviews | 3 Zitate | **wörtlich** übernommen | identisch |
| CTA-Sektion | „Bereit für deinen Lieblingssirup?" + Sub | **wörtlich** übernommen | identisch |
| Produkt-Kurztexte | 1 Satz je Sorte | `flavor` (Karten-Untertitel) übernimmt die Legacy-Sinneseindrücke; `description`/`story` erweitern sprachlich | Faktenlage siehe §3 — nach Parität-Korrektur nur noch sensorische Sprache |
| Warenkorb/Bestell-Flow | Vanilla-Modal-Texte | neu formulierte UI-Texte („Wir melden uns per E-Mail mit Zahlungs- und Versanddetails.") | beschreibt den identischen mailto-Flow; „Versandkosten werden individuell berechnet" ist wörtlich Legacy |
| 404 | — (existierte nicht) | „Neumond. Diese Seite liegt im Dunkeln…" | neue Fläche |
| Bio-Zertifizierung | externe WP-Seite, Inhalt lag nie vor | Platzhalter mit ehrlichem Hinweis + belegbarer Kern („Limonaden DE-ÖKO-006") | nichts erfunden, offener Punkt beim Inhaber |

## 3. Paritäts-Korrekturen in dieser Session `[Parität]`

In einer früheren Build-Runde waren in Produkt-Stories **unbelegte
Fakten-Claims** entstanden. Sie wurden entfernt bzw. auf sensorische Sprache
zurückgeführt — Belegbasis ist ausschließlich `CONTENT_INVENTORY.md`
(Legacy-Texte + echte Etiketten):

| Sorte | Entfernter Claim (vorher) | Jetzt |
|---|---|---|
| Bio-Vanille | „aus echter Schote" / „echte Bourbon-Vanille" | „klassisch, weich und natürlich" (Legacy-Wortlaut) |
| Bio-Pistazie | „geröstete Pistazien" | „nussige Pistazie, fein und intensiv" |
| Bio-Zimt | „echte Ceylon-Zimtstangen", „Zimtstangen, langsam ausgezogen" | „warm und aromatisch" (Legacy) |
| Bio-Lebkuchen | Zutatenliste „Honig, Nelke, Zimt, Piment" | „kräftig & würzig — voller Weihnachtsstimmung" (Legacy) |
| Bio-Pumpkin Spice | Zutatenliste „Kürbis, Zimt, Muskat, Ingwer" | „würzig, herbstlich, wohlig" (Legacy); Origin-Story (Jessica/Herbstmorgen) bleibt — sie ist wörtlich belegte About-Substanz |
| Bio-Bratapfel | „eine Spur Nelke" | „Apfel und Zimt" (Legacy: „Apfel trifft Zimt") |
| Bio-Vanille-Extrakt | „aus echter Schote" | „perfekt zum Backen, Verfeinern & Genießen" (Legacy) |
| Bio-Lavendel m. Blaubeere | „die Sorte, die unsere Kund:innen am häufigsten ihren Lieblingssirup nennen" (unbelegte Statistik) | Claim entfernt; Beliebtheit belegt nur das Review-Zitat („Mein Favorit: Lavendel!") |
| Marquee / Footer | „DE-ÖKO-006" als globales Site-Badge | Kürzel nur noch im Limonaden-Kontext (Legacy zertifiziert ausdrücklich die Limonaden); Footer jetzt „Bio-Sirup-Manufaktur aus Fulda" |

**Bewusst behalten (belegt):**
- „mit echten Kokosraspeln" — steht auf dem echten Etikett („Bio-Sirup mit Kokosraspeln").
- 50-ml-Lebkuchenmännchen-Glas — echtes Inhaber-Foto vorhanden.
- „fast schwarz" (Spekulatius) — beschreibt das reale Produktfoto.
- Pairing-Zeilen („Passt zu: Latte · Tiramisu · …") — als Serviervorschläge
  gekennzeichnete Empfehlungen, keine Produktfakten.

## 4. Unverändert

- **Impressum** und **Datenschutzerklärung**: wortidentisch zur
  Inhaber-Lieferung — einzige Ausnahme sind die oben in §1 dokumentierten
  Mailadress-Normalisierungen.
- Alle Preise, Größen, Zutatenlisten der Limonaden, DE-ÖKO-006-Kürzel,
  Traits („Ohne Konservierungsmittel…"), Partner Hunfelt Bräu.
- Reviews, About-Story, CTA, USP-Texte, Kennzahlen (11 / 100 % / Fulda).
- Sprache der Seite: Deutsch, Du-Ansprache (wie Legacy).


## 5. Nachträge aus Council Runde 1 (Vollständigkeit)

Vom Content-Auditor als undokumentiert identifiziert — hiermit nachgetragen.
Wo möglich wurde die Legacy-Substanz **wiederhergestellt** statt nur dokumentiert:

| Stelle | Legacy | Zwischenstand (undokumentiert) | Jetzt |
|---|---|---|---|
| Meta-Title (Startseite) | „… Bio-Sirup-Manufaktur Fulda \| Online Shop" | ohne „\| Online Shop" | **wiederhergestellt** |
| Meta-Description | „… Jetzt online bestellen – natürlich, kreativ, mit Liebe." | ohne „Jetzt online bestellen" | **wiederhergestellt** |
| Footer-Spalte „Kontakt" (Mail + sichtbare Domain) | vorhanden | ersatzlos entfallen | **wiederhergestellt** (4. Spalte) |
| 50-ml-Geschenkhinweis auf der Startseite | in der Shop-Sektion | nur noch auf `/shop` | **wiederhergestellt** (unter dem Shop-Teaser, Legacy-Wortlaut) |
| Hero-Trust „5-Sterne Bewertungen" | wörtlich | „5-Sterne bewertet" | **wiederhergestellt** |
| Lavendel-`flavor` „Fein-blumig & aromatisch" | wörtlich | „Fein-blumig & fruchtig" | **wiederhergestellt** |
| Footer-Label „Sirups" | „Sirups" | „Sirupe" | bleibt „Sirupe" — Rechtschreib-Normalisierung, hiermit dokumentiert |
| Story-Bild-Caption/Alt | Legacy-Datei `Advent-Rothemann_2025`, alt „Adventsmarkt" | „Adventsmarkt **Fulda**" (erfundener Ort) | korrigiert auf **„Adventsmarkt Rothemann"** |
| `/story`-Zusatzabsatz | — | „in kleinen Chargen, von Hand abgefüllt" (unbelegt) | auf belegten USP-Wortlaut zurückgeführt („in unserer Manufaktur — familiengeführt, mit Herzblut und Sorgfalt") |
| Superlative/Zuordnungen | — | „hellster/dunkelster Sirup", „Unser Geheimtipp", „50-ml-Geschenk im Lebkuchenmännchen-Glas" (pro Sorte unbelegt) | sensorische Sprache ohne Rang-/Zuordnungs-Claims |
| `/ausstellungen`-CTA-Prosa | — (Seite lag nicht im Legacy-File vor) | neu formulierte Einladung („Markt, Hoffest, Adventsmarkt oder Pop-up …") in Du-Form neben Inhaber-Text in Ihr-Form | Ansprache an Inhaber-Text angeglichen (Ihr-Form); hiermit als neue Copy dokumentiert |
| `LegalNotice`-Boilerplate | — | Platzhalter-Hinweistext (Bio-Zertifizierung) | hiermit als neue, nicht-legacy Copy dokumentiert |
| `/story`-PageHeader | — (Seite existierte nicht) | fehlte (keine h1) | neue H1 „Die Manufaktur hinter dem Mond" + Sub „Wer Sugar Moon Sweets macht, warum es uns gibt — und was ein Pumpkin Spice Latte damit zu tun hat." — neue Copy, dokumentiert |
| Bestellflow-Texte | Modal + mailto ohne Statusversprechen | „Deine Bestellung ist auf dem Weg zu uns" (faktisch falsch, mailto garantiert keinen Versand) | ehrliche Formulierung: „Bitte sende die E-Mail ab — erst dann erreicht uns deine Bestellung" + Kopier-Fallback |
| Warenkorb-Leerzustand | — | „Noch leer — stöbere im Shop." (ohne Link) | neue Copy „Noch ist es still hier." + CTA „Zum Shop" — hiermit dokumentiert |
| Marquee-Pause-Steuerung | — (Legacy-Marquee ohne Pause) | — | neue A11y-Labels „Laufschrift pausieren" / „Laufschrift fortsetzen" (WCAG 2.2.2) — hiermit dokumentiert |
| Footer-Kontakt-Spalte | Mail-Adresse + Domain als Text | volle Adresse brach in der schmalen Spalte mitten im Wort | Spalte zeigt „E-Mail schreiben" (mailto) + „sugarmoonsweets.de"; die volle Adresse steht sichtbar direkt darüber im Marken-Block |

**Weiter offen (Inhaber-Bestätigung nötig, siehe FINAL_REPORT):**
Preise/Saison für Bio-Kokos und Bio-Blaubeer-Basilikum (aktuell begründete
Defaults 15/16 € analog der Tier-Logik, DECISIONS D20) · verbindliche
Kontakt-Mailadresse der Rechtstexte (D21) · Inhalte der
Bio-Zertifizierungs-Seite.

### Nachträge Design-Review 2 (neue UI-Texte, kein Legacy-Bezug)

| Neu | Kontext |
|---|---|
| „Weitere Sorten" · „Alle 11 Sorten" | Produktseiten-Regal unter der Kaufbox (vorher endete die Seite im Footer) |
| „Bestellung eingegangen!" · „Danke! Deine Bestellung ist bei uns angekommen — wir melden uns per E-Mail mit Zahlungs- und Versanddetails." · „Bestellübersicht kopieren" · „Alles klar — weiter stöbern" · „Wird gesendet…" | Neuer Bestätigungs-Screen des Server-Versands (D26); der mailto-Fallback behält alle bisherigen Texte unverändert |
| „Bio-zertifiziert · Fulda" (nur <640px) | Gekürzte Hero-Badge-Variante — die volle Zeile „Bio-zertifiziert · Handgemacht in Fulda" bleibt ab sm und brach mobil zweizeilig um; keine Information entfällt (Fulda bleibt, „Handgemacht" steht direkt darunter in der Trust-Zeile) |

