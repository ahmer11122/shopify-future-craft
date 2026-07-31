import { useMemo, useState } from "react";
import { Check, Heart, SlidersHorizontal, X } from "lucide-react";
import { allColors, allSizes, categories, formatPKR, products, type Product } from "./data";

type Sort = "Featured" | "Price: Low" | "Price: High" | "Top Rated";
const sorts: Sort[] = ["Featured", "Price: Low", "Price: High", "Top Rated"];

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-[0.62rem] tracking-[0.1em] text-gold" aria-label={`${rating} out of 5`}>
      {"★".repeat(Math.round(rating))}
      <span className="text-border">{"★".repeat(5 - Math.round(rating))}</span>
    </span>
  );
}

function Card({ product, index, onAdd }: { product: Product; index: number; onAdd: () => void }) {
  const [liked, setLiked] = useState(false);
  const [size, setSize] = useState<string | null>(null);

  return (
    <article
      style={{ animationDelay: `${(index % 4) * 70}ms` }}
      className="reveal group"
    >
      <div className="relative aspect-[4/5.5] overflow-hidden bg-sand">
        <img
          src={product.front}
          alt={`${product.name} — ${product.fabric}`}
          width={800}
          height={1100}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-all duration-[900ms] ease-out group-hover:scale-[1.04] group-hover:opacity-0"
        />
        <img
          src={product.back}
          alt=""
          aria-hidden="true"
          width={800}
          height={1100}
          loading="lazy"
          className="absolute inset-0 h-full w-full scale-[1.04] object-cover opacity-0 transition-all duration-[900ms] ease-out group-hover:scale-100 group-hover:opacity-100"
        />

        {product.tag && (
          <span className="absolute left-4 top-4 bg-background/85 px-3 py-1.5 text-[0.58rem] tracking-[0.18em] uppercase backdrop-blur-sm">
            {product.tag}
          </span>
        )}

        <button
          onClick={() => setLiked((v) => !v)}
          aria-label={liked ? "Remove from wishlist" : "Save to wishlist"}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center bg-background/80 backdrop-blur-sm transition-all duration-400 hover:bg-background sm:opacity-0 sm:group-hover:opacity-100"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${liked ? "fill-gold text-gold" : ""}`}
            strokeWidth={1.4}
          />
        </button>

        <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <div className="mb-2 hidden justify-center gap-1.5 sm:flex">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`h-8 w-8 border text-[0.6rem] tracking-[0.08em] backdrop-blur-sm transition-colors ${
                  size === s
                    ? "border-foreground bg-foreground text-background"
                    : "border-transparent bg-background/85 hover:border-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <button
            onClick={onAdd}
            className="w-full bg-foreground py-3.5 text-[0.62rem] tracking-[0.22em] uppercase text-background transition-colors duration-300 hover:bg-gold hover:text-accent-foreground"
          >
            {size ? `Add ${size} to Bag` : "Quick Add"}
          </button>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl leading-tight">{product.name}</h3>
          <div className="flex shrink-0 gap-1.5 pt-1.5">
            {product.colors.map((c) => (
              <span
                key={c.name}
                title={c.name}
                className="h-2.5 w-2.5 rounded-full ring-1 ring-border"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>
        <p className="mt-1.5 text-[0.72rem] tracking-[0.04em] text-muted-foreground">{product.fabric}</p>
        <div className="mt-3 flex items-baseline gap-3 text-sm tabular-nums">
          <span>{formatPKR(product.price)}</span>
          {product.compareAt && (
            <>
              <span className="text-xs text-muted-foreground line-through">
                {formatPKR(product.compareAt)}
              </span>
              <span className="text-[0.6rem] tracking-[0.14em] uppercase text-gold">
                −{Math.round((1 - product.price / product.compareAt) * 100)}%
              </span>
            </>
          )}
        </div>
        <div className="mt-2.5 flex items-center gap-2">
          <Stars rating={product.rating} />
          <span className="text-[0.65rem] text-muted-foreground">({product.reviews})</span>
        </div>
      </div>
    </article>
  );
}

export function CollectionGrid({ onAdd }: { onAdd: () => void }) {
  const [cat, setCat] = useState<string>("All");
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("Featured");
  const [panel, setPanel] = useState(false);

  const list = useMemo(() => {
    let out = products.filter(
      (p) =>
        (cat === "All" || p.category === cat) &&
        (!size || p.sizes.includes(size)) &&
        (!color || p.colors.some((c) => c.name === color)),
    );
    if (sort === "Price: Low") out = [...out].sort((a, b) => a.price - b.price);
    if (sort === "Price: High") out = [...out].sort((a, b) => b.price - a.price);
    if (sort === "Top Rated") out = [...out].sort((a, b) => b.rating - a.rating);
    return out;
  }, [cat, size, color, sort]);

  const activeCount = (size ? 1 : 0) + (color ? 1 : 0) + (cat !== "All" ? 1 : 0);

  return (
    <section id="grid" className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-32">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div data-reveal className="reveal-up">
          <p className="eyebrow text-muted-foreground">The Lawn Edit</p>
          <div className="rule-gold my-4" />
          <h2 className="type-h2">New Arrivals</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`border px-4 py-2 text-[0.62rem] tracking-[0.16em] uppercase transition-all duration-300 ${
                cat === c
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:border-foreground"
              }`}
            >
              {c}
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
          panel ? "mt-8 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="grid gap-8 border border-border p-6 sm:grid-cols-3 lg:p-8">
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
            <div>
              <p className="eyebrow text-muted-foreground">Sort</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {sorts.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSort(s)}
                    className={`border px-3.5 py-2 text-[0.62rem] tracking-[0.12em] uppercase transition-colors ${
                      sort === s ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3 text-[0.7rem] text-muted-foreground">
        <span className="tabular-nums">{list.length} pieces</span>
        {activeCount > 0 && (
          <button
            onClick={() => {
              setCat("All");
              setSize(null);
              setColor(null);
            }}
            className="flex items-center gap-1.5 border border-border px-3 py-1.5 text-[0.6rem] tracking-[0.14em] uppercase transition-colors hover:border-foreground hover:text-foreground"
          >
            <X className="h-3 w-3" strokeWidth={1.5} /> Clear
          </button>
        )}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-14 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-20">
        {list.map((p, i) => (
          <Card key={p.id} product={p} index={i} onAdd={onAdd} />
        ))}
      </div>

      {list.length === 0 && (
        <p className="py-24 text-center text-sm text-muted-foreground">
          Nothing matches that combination yet. Try clearing a filter.
        </p>
      )}

      <div className="mt-20 flex flex-col items-center gap-5">
        <div className="h-px w-40 bg-border">
          <div className="h-px w-1/2 bg-gold" />
        </div>
        <p className="text-[0.68rem] tracking-[0.16em] uppercase text-muted-foreground tabular-nums">
          Showing {list.length} of 48
        </p>
        <button className="btn-ghost">Load More</button>
      </div>
    </section>
  );
}
