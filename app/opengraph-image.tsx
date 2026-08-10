import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/data/site";

/**
 * Statisch generiertes Open-Graph-Bild (1200×630) im Marken-Look:
 * Pinien-Nacht, dünner Gold-Crescent mit Goldstaub, Fraunces-Wortmarke.
 */

export const alt = `${site.name} — Bio-Sirup-Manufaktur Fulda`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const DUST: [number, number, number, number][] = [
  [605, 130, 3, 0.9],
  [552, 148, 2, 0.6],
  [655, 155, 2.5, 0.7],
  [520, 195, 3.5, 0.8],
  [685, 210, 2, 0.5],
  [508, 250, 2.5, 0.7],
  [700, 265, 3, 0.6],
  [540, 300, 2, 0.5],
];

export default async function OpengraphImage() {
  const fraunces = await readFile(join(process.cwd(), "assets/fonts/Fraunces-600.ttf"));

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0e1a14",
        backgroundImage:
          "radial-gradient(720px 420px at 50% 18%, rgba(232,178,94,0.14), transparent 70%), radial-gradient(900px 600px at 50% 115%, rgba(8,15,11,0.9), transparent 60%)",
        fontFamily: "Fraunces",
      }}
    >
      <svg width="200" height="200" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke="#C6892F"
          strokeWidth="0.6"
          opacity="0.45"
        />
        <path
          d="M70 22 A38 38 0 1 0 78 70"
          fill="none"
          stroke="#E8B25E"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
      <svg
        width="1200"
        height="630"
        viewBox="0 0 1200 630"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {DUST.map(([x, y, r, o], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#E8B25E" opacity={o} />
        ))}
      </svg>
      <div
        style={{
          marginTop: 34,
          fontSize: 92,
          color: "#F4EEE0",
          letterSpacing: "-2px",
          display: "flex",
        }}
      >
        <span>Sugar&nbsp;</span>
        <span style={{ color: "#E8B25E" }}>Moon</span>
        <span>&nbsp;Sweets</span>
      </div>
      <div
        style={{
          marginTop: 18,
          fontSize: 30,
          color: "#C4BDA8",
          letterSpacing: "6px",
          textTransform: "uppercase",
        }}
      >
        Bio-Sirup-Manufaktur · Fulda
      </div>
    </div>,
    {
      ...size,
      fonts: [{ name: "Fraunces", data: fraunces, weight: 600, style: "normal" }],
    },
  );
}
