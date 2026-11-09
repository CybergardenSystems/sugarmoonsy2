import { Fragment } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { eventHoursSegments, type MarketEvent } from "@/data/events";

/**
 * Uhrzeiten eines Termins mit Uhr-Symbol — nur, wenn der Inhaber welche
 * genannt hat. Umbrüche nur zwischen den Tagen („Sa 15–21 Uhr · So 12–19 Uhr"),
 * nie mitten in einer Zeitangabe.
 */
export function EventHours({
  event,
  className,
}: {
  event: MarketEvent;
  className?: string;
}) {
  const segments = eventHoursSegments(event);
  if (!segments) return null;

  return (
    <p className={cn("flex items-start gap-1.5 text-sm text-moon-dim", className)}>
      <Icon name="clock" size={15} className="mt-0.5 shrink-0 text-honey/70" />
      <span>
        {segments.map((s, i) => (
          <Fragment key={s}>
            {i > 0 && " · "}
            <span className="whitespace-nowrap">{s}</span>
          </Fragment>
        ))}
      </span>
    </p>
  );
}
