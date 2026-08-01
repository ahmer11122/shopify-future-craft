import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { formatPKR, type Product } from "./data";
import { useCart } from "./cart";

export function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span className={`text-[0.62rem] tracking-[0.1em] text-gold ${className}`} aria-label={`${rating} out of 5`}>
      {"★".repeat(Math.round(rating))}
      <span className="text-border">{"★".repeat(5 - Math.round(rating))}</span>
    </span>
  );
}

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const [liked, setLiked] = useState(false);
  const [size, setSize] = useState<string | null>(null);
  const { add } = useCart();

  return (
    <article data-reveal style={{ transitionDelay: `${(index % 4) * 70}ms` }} className="reveal-up group">
      <div className="relative aspect-[4/5.5] overflow-hidden bg-sand">
        <Link to="/products/$productId" params={{ productId: product.id }} className="absolute inset-0">
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
        </Link>

        {product.tag && (
          <span className="pointer-events-none absolute left-4 top-4 bg-background/85 px-3 py-1.5 text-[0.58rem] tracking-[0.18em] uppercase backdrop-blur-sm">
            {product.tag}
          </span>
        )}

        <button
          onClick={() => setLiked((v) => !v)}
          aria-label={liked ? "Remove from wishlist" : "Save to wishlist"}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center bg-background/80 backdrop-blur-sm transition-all duration-300 hover:bg-background sm:opacity-0 sm:group-hover:opacity-100"
        >
          <Heart className={`h-4 w-4 transition-colors ${liked ? "fill-gold text-gold" : ""}`} strokeWidth={1.4} />
        </button>

        <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 focus-within:translate-y-0 focus-within:opacity-100">
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
            onClick={() => add(product.id, size ?? product.sizes[0])}
            className="w-full bg-foreground py-3.5 text-[0.62rem] tracking-[0.22em] uppercase text-background transition-colors duration-300 hover:bg-gold hover:text-accent-foreground"
          >
            {size ? `Add ${size} to Bag` : "Quick Add"}
          </button>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl leading-tight">
            <Link to="/products/$productId" params={{ productId: product.id }} className="link-line">
              {product.name}
            </Link>
          </h3>
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
        <div className="mt-3 flex items-baseline gap-3">
          <span className="num text-[0.95rem]">{formatPKR(product.price)}</span>
          {product.compareAt && (
            <>
              <span className="num text-xs text-muted-foreground line-through">{formatPKR(product.compareAt)}</span>
              <span className="num text-[0.62rem] tracking-[0.14em] uppercase text-gold">
                −{Math.round((1 - product.price / product.compareAt) * 100)}%
              </span>
            </>
          )}
        </div>
        <div className="mt-2.5 flex items-center gap-2">
          <Stars rating={product.rating} />
          <span className="num text-[0.68rem] text-muted-foreground">({product.reviews})</span>
        </div>
      </div>
    </article>
  );
}
