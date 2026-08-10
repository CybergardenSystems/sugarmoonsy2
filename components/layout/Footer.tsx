import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { site, footerLinks } from "@/data/site";

const columns: { title: string; links: { href: string; label: string }[] }[] = [
  { title: "Shop", links: footerLinks.shop },
  { title: "Unternehmen", links: footerLinks.unternehmen },
  { title: "Rechtliches", links: footerLinks.rechtliches },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-honey/10 bg-ink pt-20 pb-8">
      <div className="shell">
        <div className="grid gap-8 sm:gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-moon-mute">
              {site.tagline}. Handgemacht, zertifiziert, mit Liebe — gebraut vom Mond über
              Fulda.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-5 inline-block font-mono text-xs tracking-wide text-honey/90 transition-colors hover:text-honey"
            >
              {site.email}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:contents">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="mb-4 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-moon-mute">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-moon-dim transition-colors hover:text-honey"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-honey/8 pt-6 text-xs text-moon-mute sm:mt-16 sm:flex-row">
          <span>
            © {new Date().getFullYear()} {site.name} · Fulda
          </span>
          <span className="font-mono tracking-wide">Bio-Sirup-Manufaktur aus Fulda</span>
        </div>
      </div>
    </footer>
  );
}
