import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { formatPKR, products, type Product } from "./data";

const filters = ["Size", "Color", "Price", "Category"];

function Card({ product, onAdd }: { product: Product; onAdd: () => void }) {
  return (
    <article className="group">
      <div className="relative aspect-[4/5.5] overflow-hidden bg-sand">
        <img
          src={product.front}
          alt={`${product.name} — ${product.fabric}`}
          width={800}
          height={1100}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        <img
          src={product.back}
          alt=""
          aria-hidden="true"
          width={800}
          height={1100}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        {product.tag && (
          <span className="absolute left-4 top-4 bg-background/90 px-3 py-1.5 text-[0.6rem] tracking-[0.18em] uppercase">
            {product.tag}
          </span>
        )}
        <button
          onClick={onAdd}
          className="absolute inset-x-3 bottom-3 translate-y-3 bg-foreground py-3.5 text-[0.65rem] tracking-[0.2em] uppercase text-background opacity-0 transition-all duration-400 hover:bg-gold hover:text-accent-foreground group-hover:translate-y-0 group-hover:opacity-100"
        >
          Quick Add
        </button>
      </div>
      <div className="pt-5">
        <h3 className="font-display text-xl">{product.name}</h3>
        <p className="mt-1 text-[0.75rem] tracking-wide text-muted-foreground">{product.fabric}</p>
        <p className="mt-3 flex items-baseline gap-3 text-sm">
          <span>{formatPKR(product.price)}</span>
          {product.compareAt && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPKR(product.compareAt)}
            </span>
          )}
        </p>
      </div>
    </article>
  );
}

export function CollectionGrid({ onAdd }: { onAdd: () => void }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="grid" className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-32">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <p className="eyebrow text-muted-foreground">The Lawn Edit</p>
          <div className="rule-gold my-5" />
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] leading-tight">New Arrivals</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <SlidersHorizontal className="mr-2 h-4 w-4 text-muted-foreground" strokeWidth={1.3} />
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(active === f ? null : f)}
              className={`border px-4 py-2 text-[0.65rem] tracking-[0.16em] uppercase transition-colors ${
                active === f
                  ? "border-gold bg-gold-soft text-accent-foreground"
                  : "border-border hover:border-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-14 lg:grid-cols-4 lg:gap-x-8">
        {products.map((p) => (
          <Card key={p.id} product={p} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
}
