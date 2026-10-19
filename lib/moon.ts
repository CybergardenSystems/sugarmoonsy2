/**
 * Mondphase für ein Kalenderdatum — für die Mond-Knoten im Marktkalender.
 *
 * Mittelwert-Methode: Abstand zu einem bekannten Neumond geteilt durch die
 * mittlere synodische Monatslänge. Die Bahnexzentrizität bleibt
 * unberücksichtigt; die Abweichung liegt unter einem Tag und ist im
 * gezeichneten Mond (wenige Pixel) nicht sichtbar. Deshalb zeigen wir die
 * Phase nur als Bild und benennen sie nicht („Vollmond" o. ä.) — ein Name
 * könnte an Phasengrenzen um einen Tag danebenliegen.
 */

/** Mittlere synodische Monatslänge in Tagen. */
const SYNODIC_MONTH = 29.530588853;

/** Referenz-Neumond: 6. Januar 2000, 18:14 UTC. */
const REFERENCE_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14);

/**
 * Phase am Mittag (UTC) des ISO-Datums, als Anteil des Mondzyklus:
 * 0 = Neumond, 0,25 = zunehmender Halbmond, 0,5 = Vollmond,
 * 0,75 = abnehmender Halbmond.
 */
export function moonPhase(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  const days = (Date.UTC(y, m - 1, d, 12) - REFERENCE_NEW_MOON) / 86_400_000;
  const phase = (days / SYNODIC_MONTH) % 1;
  return phase < 0 ? phase + 1 : phase;
}
