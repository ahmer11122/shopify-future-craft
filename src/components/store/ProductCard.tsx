import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart } from "lucide-react";
import { formatPKR, type Product } from "./data";
import { useCart } from "./cart";
import { Button } from "../ui/button";

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
  const out = product.soldOutSizes ?? [];

  return (
    <article data-reveal style={{ transitionDelay: `${(index % 4) * 70}ms` }} className="reveal-up group min-w-0">
      <div className="relative aspect-[4/5.2] overflow-hidden bg-sand">
        <Link
          to="/products/$productId"
          params={{ productId: product.id }}
          aria-label={product.name}
          className="absolute inset-0"
        >
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
          <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-transparent transition-all duration-500 group-hover:ring-foreground/12" />
        </Link>

        {/* Tag sits low-left so it never crosses the model's face */}
        {product.tag && (
          <span className="tag-chip pointer-events-none absolute bottom-3 left-3 transition-all duration-300 group-hover:-translate-y-1 group-hover:opacity-0">
            {product.tag}
          </span>
        )}

        <button
          onClick={() => setLiked((v) => !v)}
          aria-label={liked ? "Remove from wishlist" : "Save to wishlist"}
          className="absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center bg-background/85 backdrop-blur-sm transition-all duration-300 hover:bg-background sm:h-9 sm:w-9 sm:opacity-0 sm:group-hover:opacity-100"
        >
          <Heart className={`h-3.5 w-3.5 transition-colors ${liked ? "fill-gold text-gold" : ""}`} strokeWidth={1.4} />
        </button>

        <div className="absolute inset-x-2.5 bottom-2.5 hidden translate-y-2 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 focus-within:translate-y-0 focus-within:opacity-100 sm:block">
          <div className="mb-2 flex justify-center gap-1.5">
            {product.sizes.map((s) => {
              const soldOut = out.includes(s);
              return (
                <button
                  key={s}
                  disabled={soldOut}
                  onClick={() => setSize(s)}
                  aria-label={soldOut ? `${s} — unavailable` : `Select size ${s}`}
                  className={`h-8 w-8 border text-[0.6rem] tracking-[0.08em] backdrop-blur-sm transition-colors ${
                    soldOut
                      ? "swatch-out border-border bg-background/70 text-muted-foreground"
                      : size === s
                        ? "border-foreground bg-foreground text-background"
                        : "border-transparent bg-background/90 hover:border-foreground"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
          <Button
            onClick={() => add(product.id, size ?? product.sizes.find((s) => !out.includes(s)) ?? product.sizes[0])}
            className="w-full px-3 py-5 rounded-none text-[0.6rem] tracking-[0.22em] text-background gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>

      <div className="pt-4 sm:pt-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 font-display text-lg leading-tight sm:text-xl">
            <Link to="/products/$productId" params={{ productId: product.id }} className="link-line">
              {product.name}
            </Link>
          </h3>
          <div className="flex shrink-0 gap-1.5 pt-1.5">
            {product.colors.map((c) => (
              <span
                key={c.name}
                title={c.soldOut ? `${c.name} — sold out` : c.name}
                className={`h-2.5 w-2.5 rounded-full ring-1 ring-border ${c.soldOut ? "swatch-out" : ""}`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>
        <p className="mt-1.5 truncate text-[0.7rem] tracking-[0.04em] text-muted-foreground">{product.fabric}</p>
        <div className="mt-2.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="num text-[0.9rem]">{formatPKR(product.price)}</span>
          {product.compareAt && (
            <>
              <span className="num text-xs text-muted-foreground line-through">{formatPKR(product.compareAt)}</span>
              <span className="num text-[0.62rem] tracking-[0.14em] uppercase text-gold">
                −{Math.round((1 - product.price / product.compareAt) * 100)}%
              </span>
            </>
          )}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <Stars rating={product.rating} />
          <span className="num text-[0.68rem] text-muted-foreground">({product.reviews})</span>
        </div>
      </div>
    </article>
  );
}
