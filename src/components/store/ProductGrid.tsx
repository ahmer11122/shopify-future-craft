import { useMemo, useState } from "react";
import { Check, SlidersHorizontal } from "lucide-react";
import { allColors, allSizes, type Product } from "./data";
import { ProductCard } from "./ProductCard";

type Sort = "Featured" | "Price: Low" | "Price: High" | "Top Rated";
const sorts: Sort[] = ["Featured", "Price: Low", "Price: High", "Top Rated"];

export function ProductGrid({ items }: { items: Product[] }) {
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("Featured");
  const [panel, setPanel] = useState(false);

  const list = useMemo(() => {
    let out = items.filter(
      (p) => (!size || p.sizes.includes(size)) && (!color || p.colors.some((c) => c.name === color)),
    );
    if (sort === "Price: Low") out = [...out].sort((a, b) => a.price - b.price);
    if (sort === "Price: High") out = [...out].sort((a, b) => b.price - a.price);
    if (sort === "Top Rated") out = [...out].sort((a, b) => b.rating - a.rating);
    return out;
  }, [items, size, color, sort]);

  const activeCount = (size ? 1 : 0) + (color ? 1 : 0);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
        <p className="num text-[0.7rem] tracking-[0.16em] uppercase text-muted-foreground">
          {String(list.length).padStart(2, "0")} products
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {sorts.map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={`px-3 py-1.5 text-[0.62rem] tracking-[0.14em] uppercase transition-colors ${
                sort === s ? "text-gold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
          <button
            onClick={() => setPanel((v) => !v)}
            className={`flex items-center gap-2 border px-4 py-2 text-[0.62rem] tracking-[0.16em] uppercase transition-colors ${
              panel || activeCount ? "border-gold bg-gold-soft" : "border-border hover:border-foreground"
            }`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.4} />
            Filters{activeCount ? ` (${activeCount})` : ""}
          </button>
        </div>
      </div>

      <div
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-out ${
          panel ? "mt-6 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="grid gap-8 border border-border p-6 sm:grid-cols-2 lg:p-8">
            <div>
              <p className="eyebrow text-muted-foreground">Size</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {allSizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(size === s ? null : s)}
                    className={`h-9 w-9 border text-[0.65rem] transition-colors ${
                      size === s ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow text-muted-foreground">Colour</p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {allColors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(color === c.name ? null : c.name)}
                    title={c.name}
                    aria-label={c.name}
                    className={`grid h-8 w-8 place-items-center rounded-full ring-1 transition-all ${
                      color === c.name ? "ring-2 ring-gold ring-offset-2" : "ring-border hover:ring-foreground"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  >
                    {color === c.name && <Check className="h-3.5 w-3.5 text-background mix-blend-difference" strokeWidth={2} />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-14 lg:grid-cols-4 lg:gap-x-7 lg:gap-y-20">
        {list.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>

      {list.length === 0 && (
        <p className="py-24 text-center text-sm text-muted-foreground">
          Nothing matches those filters. Try clearing colour or size.
        </p>
      )}
    </div>
  );
}
