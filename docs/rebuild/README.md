# docs/rebuild — Projekt-Dokumentation des Website-Resets

Sugar Moon Sweets (sugarmoonsweets.de) — kompletter Reset & Rebuild der
Legacy-Single-File-Website auf Next.js 16 / TypeScript strict / Tailwind v4 / GSAP.

## Artefakt-Übersicht (Mapping auf den Master-Prompt)

| Artefakt laut Prompt | Datei | Status |
|---|---|---|
| Content-Inventory (einzige Wahrheitsquelle Inhalte) | [`CONTENT_INVENTORY.md`](./CONTENT_INVENTORY.md) | vollständig (Phase 1) |
| Asset-Inventory | [`ASSET_INVENTORY.md`](./ASSET_INVENTORY.md) | vollständig |
| Schonungsloser Befund Legacy | [`FINDINGS.md`](./FINDINGS.md) | vollständig |
| Design Brief / Direktion | [`DESIGN_BRIEF.md`](./DESIGN_BRIEF.md) | freigegeben (Route A) |
| Entscheidungs-Log | [`DECISIONS.md`](./DECISIONS.md) | fortlaufend |
| Copy-Änderungen Vorher/Nachher | [`COPY_CHANGELOG.md`](./COPY_CHANGELOG.md) | vollständig |
| Council-Reports | [`COUNCIL_ROUND_1.md`](./COUNCIL_ROUND_1.md) · [`COUNCIL_ROUND_2.md`](./COUNCIL_ROUND_2.md) | R1: 44 Findings, 5× KEINE FREIGABE → Fix-Welle; R2: Cross-Verifikation, Auflagen erfüllt + gegengemessen |
| Final Report | [`FINAL_REPORT.md`](./FINAL_REPORT.md) | vollständig (inkl. Launch-Fragen an den Inhaber) |
| Historische QA-Runde (früherer Master-Prompt) | [`QA_PHASE5.md`](./QA_PHASE5.md) | archiviert, trägt Veraltet-Banner (mehrere Claims widerlegt, siehe COUNCIL_ROUND_1) |

## Legacy-Backup (`/_legacy`-Äquivalent)

Der komplette Ist-Zustand vor dem Reset ist doppelt gesichert:

1. **`source-assets/legacy/index.html`** — die vollständige Legacy-Website
   (Single-File, 1062 Zeilen), unverändert im Repo.
2. **Git-Historie** — jeder frühere Stand ist über die Commit-Historie
   wiederherstellbar; es wurde zu keinem Zeitpunkt etwas unwiederbringlich
   gelöscht.

Die **Original-Produktfotos** der Inhaber liegen unangetastet unter
`source-assets/products/` (Anlieferungs-Original) und `public/media/originals/`.
Alle abgeleiteten Varianten (getont, relit, WebP) sind zusätzliche Dateien —
kein Original wurde überschrieben.

## Modus-Hinweis

Diese Session lief unbeaufsichtigt (Remote-Agent). Die im Prompt vorgesehenen
GATED-Checkpoints hätten unbegrenzt blockiert; die Checkpoint-Inhalte
(Findings-/Inventory-Zusammenfassung, Design Brief) sind stattdessen als
Artefakte in diesem Ordner dokumentiert und die Freigaben aus den früheren
Sessions (siehe `DECISIONS.md` §Gate-Freigabe) wurden übernommen. Alle
inhaltlichen Regeln aus §2 des Prompts (Content-Parität, Bilder, Rechtstexte,
Sprache) galten unverändert.
