import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Informationen zur Verarbeitung personenbezogener Daten bei Online-Bestellungen gemäß DSGVO.",
};

export default function DatenschutzPage() {
  return (
    <>
      <PageHeader eyebrow="Rechtliches" title="Datenschutz­erklärung" />
      <section className="pb-28">
        <div className="shell">
          <div className="legal">
            <p>
              Der Schutz Ihrer personenbezogenen Daten ist uns ein wichtiges Anliegen.
              Nachfolgend informieren wir Sie über die Verarbeitung Ihrer Daten im Rahmen
              von Online-Bestellungen gemäß den geltenden Datenschutzvorschriften,
              insbesondere der Datenschutz-Grundverordnung (DSGVO).
            </p>

            <h2>1. Verantwortliche Stelle</h2>
            <p>
              <a href="mailto:jessica.scherf@sugarmoonsweets.de">
                jessica.scherf@sugarmoonsweets.de
              </a>
            </p>

            <h2>2. Erhebung und Verarbeitung personenbezogener Daten</h2>
            <p>
              Im Rahmen Ihrer Online-Bestellung verarbeiten wir folgende personenbezogene
              Daten:
            </p>
            <ul>
              <li>Vor- und Nachname</li>
              <li>Liefer- und Rechnungsadresse</li>
              <li>E-Mail-Adresse</li>
              <li>Telefonnummer (optional, z. B. für Lieferbenachrichtigungen)</li>
              <li>Zahlungsinformationen</li>
              <li>Bestelldetails (Artikel, Menge, Preis, Datum)</li>
            </ul>
            <p>
              Diese Daten werden zur Abwicklung Ihrer Bestellung, zur Kommunikation mit
              Ihnen sowie zur Zahlungs- und Versandabwicklung benötigt.
            </p>

            <h2>3. Rechtsgrundlage der Verarbeitung</h2>
            <p>
              Die Verarbeitung Ihrer Daten erfolgt auf Basis von Art. 6 Abs. 1 lit. b DSGVO
              (Vertragserfüllung). Ohne die Bereitstellung dieser Daten ist eine Bestellung
              nicht möglich.
            </p>

            <h2>4. Weitergabe der Daten</h2>
            <p>
              Ihre personenbezogenen Daten werden nur an Dritte weitergegeben, sofern dies
              zur Abwicklung der Bestellung erforderlich ist, z. B.:
            </p>
            <ul>
              <li>Zahlungsdienstleister (z. B. PayPal, Stripe, Klarna)</li>
              <li>Versanddienstleister (z. B. DHL, Hermes, UPS)</li>
              <li>IT-Dienstleister zur technischen Abwicklung (z. B. Hosting)</li>
            </ul>
            <p>
              Eine darüber hinausgehende Weitergabe an Dritte erfolgt nicht ohne Ihre
              ausdrückliche Einwilligung.
            </p>

            <h2>5. Speicherdauer</h2>
            <p>
              Ihre Daten werden nur so lange gespeichert, wie dies für die Abwicklung der
              Bestellung und gesetzliche Aufbewahrungspflichten (z. B. nach Handels- oder
              Steuerrecht) erforderlich ist.
            </p>

            <h2>6. Ihre Rechte</h2>
            <p>Sie haben jederzeit das Recht auf:</p>
            <ul>
              <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
              <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
              <li>
                Löschung Ihrer Daten (Art. 17 DSGVO), sofern keine gesetzlichen
                Aufbewahrungspflichten bestehen
              </li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
            </ul>
            <p>
              Zudem haben Sie das Recht, sich bei einer Aufsichtsbehörde zu beschweren.
            </p>

            <h2>7. Sicherheit</h2>
            <p>
              Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre
              Daten gegen Manipulation, Verlust, Zerstörung oder unbefugten Zugriff zu
              schützen.
            </p>

            <h2>8. Kontakt</h2>
            <p>
              Bei Fragen zur Verarbeitung Ihrer personenbezogenen Daten oder zur
              Geltendmachung Ihrer Rechte kontaktieren Sie uns bitte unter{" "}
              <a href="mailto:jessica.scherf@sugarmoonsweets.de">
                jessica.scherf@sugarmoonsweets.de
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
