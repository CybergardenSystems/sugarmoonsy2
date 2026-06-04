import Link from "next/link";
import { MoonMark } from "@/components/brand/MoonMark";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] flex-col items-center justify-center px-6 text-center">
      <MoonMark size={90} />
      <h1 className="mt-6 font-display text-5xl text-moon">Neumond.</h1>
      <p className="mt-3 max-w-sm text-moon-dim">
        Diese Seite liegt im Dunkeln — hier gibt es nichts zu sehen.
      </p>
      <Link
        href="/"
        className="mt-7 rounded-xl bg-honey px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-honey-glow"
      >
        Zurück zur Startseite
      </Link>
    </section>
  );
}
