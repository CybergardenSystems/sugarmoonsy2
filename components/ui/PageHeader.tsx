import { MoonMark } from "@/components/brand/MoonMark";

/** Einheitlicher Seitenkopf für Unterseiten (mit Abstand zur fixen Nav). */
export function PageHeader({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: React.ReactNode;
}) {
  return (
    <header className="relative overflow-hidden pt-40 pb-12">
      <div className="pointer-events-none absolute right-[6%] top-16 opacity-35">
        <MoonMark size={220} />
      </div>
      <div className="shell relative">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.6rem,6vw,4.6rem)] leading-[1.03] text-moon">
          {title}
        </h1>
        {sub && <p className="lede mt-5 max-w-xl">{sub}</p>}
      </div>
    </header>
  );
}
