import { Reveal } from "./Reveal";
import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  sub,
  center = false,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(center && "mx-auto text-center", "max-w-2xl", className)}>
      <Reveal>
        <span className={cn("eyebrow", center && "justify-center")}>{eyebrow}</span>
      </Reveal>
      <Reveal as="h2" delay={0.05} className="mt-4 font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.08] text-balance text-moon">
        {title}
      </Reveal>
      {sub && (
        <Reveal delay={0.1} className={cn("lede mt-4", center && "mx-auto")}>
          {sub}
        </Reveal>
      )}
    </div>
  );
}
