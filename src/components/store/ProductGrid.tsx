import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { allColors, allSizes, formatPKR, type Product } from "./data";
import { ProductCard } from "./ProductCard";

type Sort = "Featured" | "Price: Low to High" | "Price: High to Low" | "Top Rated" | "Newest";
const sorts: Sort[] = ["Featured", "Newest", "Price: Low to High", "Price: High to Low", "Top Rated"];

const priceBands = [
  { label: "Under Rs. 10,000", min: 0, max: 10000 },
  { label: "Rs. 10,000 – 20,000", min: 10000, max: 20000 },
  { label: "Rs. 20,000 +", min: 20000, max: Infinity },
];

function SortMenu({ value, onChange }: { value: Sort; onChange: (s: Sort) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`flex items-center gap-3 border px-4 py-2.5 text-[0.62rem] tracking-[0.16em] uppercase transition-all duration-300 ${
          open ? "border-foreground" : "border-border hover:border-foreground"
        }`}
      >
        <span className="text-muted-foreground">Sort</span>
        <span>{value}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} strokeWidth={1.5} />
      </button>
      <div
        className={`absolute right-0 z-40 mt-2 w-60 origin-top border border-border bg-background p-1.5 shadow-[0_20px_50px_-24px_rgba(0,0,0,.4)] transition-all duration-300 ease-out ${
          open ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0"
        }`}
      >
        {sorts.map((s) => (
          <button
            key={s}
            onClick={() => {
              onChange(s);
              setOpen(false);
            }}
            className={`flex w-full items-center justify-between px-3.5 py-2.5 text-left text-[0.68rem] tracking-[0.1em] uppercase transition-colors ${
              value === s ? "bg-sand text-foreground" : "text-muted-foreground hover:bg-sand/60 hover:text-foreground"
            }`}
          >
            {s}
            {value === s && <Check className="h-3.5 w-3.5 text-gold" strokeWidth={1.8} />}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ProductGrid({ items }: { items: Product[] }) {
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [band, setBand] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("Featured");
  const [panel, setPanel] = useState(false);

  const list = useMemo(() => {
    const range = priceBands.find((b) => b.label === band);
    let out = items.filter(
      (p) =>
        (!size || p.sizes.includes(size)) &&
        (!color || p.colors.some((c) => c.name === color)) &&
        (!range || (p.price >= range.min && p.price < range.max)),
    );
    if (sort === "Price: Low to High") out = [...out].sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") out = [...out].sort((a, b) => b.price - a.price);
    if (sort === "Top Rated") out = [...out].sort((a, b) => b.rating - a.rating);
    if (sort === "Newest") out = [...out].sort((a, b) => Number(!!b.new) - Number(!!a.new));
    return out;
  }, [items, size, color, band, sort]);

  const chips = [
    size && { label: `Size ${size}`, clear: () => setSize(null) },
    color && { label: color, clear: () => setColor(null) },
    band && { label: band, clear: () => setBand(null) },
  ].filter(Boolean) as { label: string; clear: () => void }[];

  return (
    <div>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-y border-border py-4 sm:flex sm:flex-wrap sm:justify-between">
        <p className="num min-w-0 text-[0.68rem] tracking-[0.16em] uppercase text-muted-foreground">
          {String(list.length).padStart(2, "0")} pieces
          <span className="hidden sm:inline"> · from {formatPKR(Math.min(...items.map((p) => p.price)))}</span>
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={() => setPanel((v) => !v)}
            aria-expanded={panel}
            className={`flex items-center gap-2 border px-4 py-2.5 text-[0.62rem] tracking-[0.16em] uppercase transition-all duration-300 ${
              panel || chips.length ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"
            }`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.4} />
            Filter{chips.length ? ` · ${chips.length}` : ""}
          </button>
          <div className="hidden sm:block">
            <SortMenu value={sort} onChange={setSort} />
          </div>
        </div>
        <div className="col-span-2 sm:hidden">
          <SortMenu value={sort} onChange={setSort} />
        </div>
      </div>

      <div
        className={`grid overflow-hidden transition-[grid-template-rows,opacity,margin] duration-500 ease-out ${
          panel ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="grid gap-8 border border-border bg-sand/40 p-6 sm:grid-cols-3 lg:p-8">
            <div>
              <p className="eyebrow text-muted-foreground">Size</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {allSizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(size === s ? null : s)}
                    className={`h-9 w-9 border text-[0.65rem] transition-all duration-300 ${
                      size === s
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-background hover:border-foreground hover:shadow-[0_0_0_3px_color-mix(in_oklab,var(--gold)_16%,transparent)]"
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
                    className={`grid h-8 w-8 place-items-center rounded-full ring-1 transition-all duration-300 ${
                      color === c.name ? "ring-2 ring-gold ring-offset-2" : "ring-border hover:ring-foreground"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  >
                    {color === c.name && <Check className="h-3.5 w-3.5 text-background mix-blend-difference" strokeWidth={2} />}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow text-muted-foreground">Price</p>
              <div className="mt-4 flex flex-col items-start gap-2">
                {priceBands.map((b) => (
                  <button
                    key={b.label}
                    onClick={() => setBand(band === b.label ? null : b.label)}
                    className={`num flex items-center gap-2.5 text-[0.72rem] transition-colors ${
                      band === b.label ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`grid h-3.5 w-3.5 place-items-center border transition-colors ${
                        band === b.label ? "border-gold bg-gold" : "border-border"
                      }`}
                    >
                      {band === b.label && <Check className="h-2.5 w-2.5 text-background" strokeWidth={3} />}
                    </span>
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {chips.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {chips.map((c) => (
            <button
              key={c.label}
              onClick={c.clear}
              className="flex items-center gap-2 border border-border bg-background px-3 py-1.5 text-[0.62rem] tracking-[0.14em] uppercase transition-colors hover:border-foreground"
            >
              {c.label}
              <X className="h-3 w-3" strokeWidth={1.6} />
            </button>
          ))}
          <button
            onClick={() => {
              setSize(null);
              setColor(null);
              setBand(null);
            }}
            className="link-line ml-1 text-[0.62rem] tracking-[0.14em] uppercase text-muted-foreground"
          >
            Clear all
          </button>
        </div>
      )}

      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-5 lg:mt-14 lg:grid-cols-4 lg:gap-x-7 lg:gap-y-20">
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
