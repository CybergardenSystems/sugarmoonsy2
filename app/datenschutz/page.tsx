import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Informationen zur Verarbeitung personenbezogener Daten bei Online-Bestellungen gemäß DSGVO.",
  alternates: { canonical: "/datenschutz" },
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
              <a href="mailto:sebastian.scherf@sugarmoonsweets.de">
                sebastian.scherf@sugarmoonsweets.de
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
              Die Verarbeitung Ihrer Daten erfolgt auf Basis von Art. 6 Abs. 1 lit. b
              DSGVO (Vertragserfüllung). Ohne die Bereitstellung dieser Daten ist eine
              Bestellung nicht möglich.
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

            <h2>5. Hosting und Server-Logfiles</h2>
            <p>
              Diese Website wird bei der Vercel Inc. (USA) gehostet. Beim Aufruf der
              Website werden automatisch technische Zugriffsdaten in sogenannten
              Server-Logfiles verarbeitet: IP-Adresse, Datum und Uhrzeit des Zugriffs, die
              aufgerufene Seite, übertragene Datenmenge, Browsertyp und -version,
              Betriebssystem sowie die zuvor besuchte Seite. Diese Verarbeitung ist für
              die Auslieferung der Website sowie für deren Sicherheit und Stabilität
              erforderlich. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
              Interesse an einer sicheren und funktionsfähigen Bereitstellung unseres
              Online-Angebots).
            </p>
            <p>
              Mit dem Anbieter besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28
              DSGVO. Da der Anbieter seinen Sitz in den USA hat, kann eine Übermittlung
              personenbezogener Daten in ein Drittland stattfinden; diese erfolgt auf
              Grundlage geeigneter Garantien im Sinne von Art. 44 ff. DSGVO
              (Standardvertragsklauseln).
            </p>

            <h2>6. Übermittlung Ihrer Bestellung per E-Mail</h2>
            <p>
              Wenn Sie das Bestellformular absenden, werden die von Ihnen eingegebenen
              Angaben (Name, Anschrift, E-Mail-Adresse, optional Telefonnummer und
              Anmerkungen) zusammen mit den gewählten Artikeln als E-Mail an uns
              übermittelt. Für diesen Versand nutzen wir den Dienst Resend, der die Daten
              in unserem Auftrag ausschließlich zum Versand dieser E-Mail verarbeitet
              (Verarbeitung in der EU-Region Irland). Ihre E-Mail-Adresse wird dabei als
              Antwortadresse gesetzt, damit wir Ihnen antworten können. Rechtsgrundlage
              ist Art. 6 Abs. 1 lit. b DSGVO (Durchführung vorvertraglicher Maßnahmen und
              Vertragserfüllung).
            </p>
            <p>
              Steht dieser Versandweg nicht zur Verfügung, öffnet die Website stattdessen
              Ihr eigenes E-Mail-Programm mit einer vorbereiteten Nachricht. In diesem
              Fall versenden Sie die Bestellung selbst und es findet keine Übermittlung an
              den vorgenannten Dienst statt.
            </p>
            <p>
              Der Empfang und die Speicherung der Bestell-E-Mails erfolgen in unserem
              E-Mail-Postfach beim Anbieter STRATO GmbH, Deutschland.
            </p>

            <h2>7. Warenkorb (Speicherung in Ihrem Browser)</h2>
            <p>
              Damit Ihr Warenkorb beim Wechsel zwischen Seiten erhalten bleibt, speichern
              wir die ausgewählten Artikel lokal in Ihrem Browser (sogenannter „Local
              Storage“, Eintrag <code>sms-cart-v1</code>). Diese Daten verbleiben auf
              Ihrem Gerät und werden erst dann an uns übermittelt, wenn Sie eine
              Bestellung absenden. Sie können den Eintrag jederzeit über die Einstellungen
              Ihres Browsers löschen. Die Speicherung ist für die von Ihnen gewünschte
              Funktion unbedingt erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG); die anschließende
              Verarbeitung stützt sich auf Art. 6 Abs. 1 lit. b DSGVO.
            </p>

            <h2>8. Keine Cookies, kein Tracking, keine externen Schriftarten</h2>
            <p>
              Diese Website setzt keine Cookies, bindet keine Analyse-, Tracking- oder
              Werbedienste ein und führt kein Profiling durch. Schriftarten und alle
              weiteren Inhalte werden von unserem eigenen Server ausgeliefert; beim
              Seitenaufruf werden keine Verbindungen zu Servern Dritter (etwa zu Google
              Fonts) aufgebaut.
            </p>

            <h2>9. Speicherdauer</h2>
            <p>
              Ihre Daten werden nur so lange gespeichert, wie dies für die Abwicklung der
              Bestellung und gesetzliche Aufbewahrungspflichten (z. B. nach Handels- oder
              Steuerrecht) erforderlich ist.
            </p>

            <h2>10. Ihre Rechte</h2>
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

            <h2>11. Sicherheit</h2>
            <p>
              Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre
              Daten gegen Manipulation, Verlust, Zerstörung oder unbefugten Zugriff zu
              schützen.
            </p>

            <h2>12. Kontakt</h2>
            <p>
              Bei Fragen zur Verarbeitung Ihrer personenbezogenen Daten oder zur
              Geltendmachung Ihrer Rechte kontaktieren Sie uns bitte unter{" "}
              <a href="mailto:sebastian.scherf@sugarmoonsweets.de">
                sebastian.scherf@sugarmoonsweets.de
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
