import { marqueeItems } from "@/data/site";
import { Icon } from "@/components/ui/Icon";

export function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div className="relative overflow-hidden border-y border-honey/10 bg-ink py-3.5">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 px-7 font-mono text-[0.8rem] uppercase tracking-[0.14em] text-moon-dim sm:text-[0.72rem]"
          >
            <Icon name="spark" size={11} className="text-honey" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
