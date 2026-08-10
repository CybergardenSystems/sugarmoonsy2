"use client";

/**
 * Letzte Verteidigungslinie: rendert statt einer weißen Seite eine
 * gestaltete Fehlermeldung und bietet an, den lokalen Speicher (z. B. einen
 * kaputten Warenkorb) zurückzusetzen. Ersetzt im Fehlerfall das Root-Layout,
 * daher eigenes <html>/<body> und Inline-Styles.
 */
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  const hardReset = () => {
    try {
      localStorage.clear();
    } catch {
      /* Storage nicht verfügbar */
    }
    reset();
  };

  return (
    <html lang="de">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0e1a14",
          color: "#f4eee0",
          fontFamily: "Georgia, 'Times New Roman', serif",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: "26rem" }}>
          <div style={{ fontSize: "3rem", lineHeight: 1 }} aria-hidden>
            ☾
          </div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 400, margin: "1rem 0 0.5rem" }}>
            Wolken vor dem Mond.
          </h1>
          <p style={{ color: "#c4bda8", fontSize: "0.95rem", lineHeight: 1.6 }}>
            Etwas ist schiefgelaufen. Ein Klick unten setzt die Seite zurück — dabei wird
            auch ein eventuell fehlerhafter Warenkorb geleert.
          </p>
          <button
            onClick={hardReset}
            style={{
              marginTop: "1.5rem",
              background: "#e8b25e",
              color: "#080f0b",
              border: 0,
              borderRadius: "0.75rem",
              padding: "0.8rem 1.6rem",
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Seite zurücksetzen
          </button>
        </div>
      </body>
    </html>
  );
}
