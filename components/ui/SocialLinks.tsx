import { Icon, type IconName } from "@/components/ui/Icon";
import { social, socialLine } from "@/data/site";
import { cn } from "@/lib/cn";

/**
 * Die Social-Profile des Inhabers — eine Quelle (`data/site.ts`), zwei
 * Darstellungen: `row` für den Footer, `panel` als eigener Abschnitt mit dem
 * erklärenden Satz.
 */

const ICONS: Record<string, IconName> = {
  instagram: "instagram",
  facebook: "facebook",
};

/** Kompakte Icon-Reihe (Footer). */
export function SocialRow({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {social.map((s) => (
        <li key={s.key}>
          <a
            href={s.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${s.label} — ${s.handle} (öffnet in neuem Tab)`}
            className="flex items-center gap-2 rounded-full border border-honey/15 px-3.5 py-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-moon-dim transition-colors hover:border-honey/45 hover:text-honey"
          >
            <Icon name={ICONS[s.key]} size={15} />
            {s.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * Prominenter Block: der Satz plus zwei große Ziele.
 * `heading` optional — auf Seiten, die schon eine Überschrift darüber haben.
 */
export function SocialPanel({
  heading = "Bleibt auf dem Laufenden",
  className,
}: {
  heading?: string | null;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-honey/12 bg-night-2/60 p-8 sm:p-10",
        className,
      )}
    >
      <div className="glow-blob -left-16 -top-16 bg-honey/5" />
      <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between md:gap-10">
        <div className="max-w-xl">
          {heading && (
            <h2 className="font-display text-[clamp(1.4rem,2.6vw,1.9rem)] text-balance text-moon">
              {heading}
            </h2>
          )}
          <p className="lede mt-3 text-balance">{socialLine}</p>
        </div>

        <ul className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
          {social.map((s) => (
            <li key={s.key}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${s.label} — ${s.handle} (öffnet in neuem Tab)`}
                className="group flex items-center gap-3 rounded-full border border-honey/20 bg-night-3/50 py-3 pl-4 pr-5 transition-colors hover:border-honey/50 hover:bg-night-3"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-honey/20 text-honey transition-colors group-hover:border-honey/50">
                  <Icon name={ICONS[s.key]} size={17} />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[0.68rem] uppercase tracking-[0.16em] text-moon">
                    {s.label}
                  </span>
                  <span className="block truncate text-[0.78rem] text-moon-mute">
                    {s.handle}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
