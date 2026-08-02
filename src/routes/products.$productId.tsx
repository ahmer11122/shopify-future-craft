import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  RefreshCw,
  Ruler,
  ShieldCheck,
  Truck,
  X,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPKR, getProduct, products, sizeChart } from "@/components/store/data";
import { useCart } from "@/components/store/cart";
import { WhatsAppGlyph } from "@/components/store/Header";
import { ProductCard } from "@/components/store/ProductCard";
import { useReveal } from "@/hooks/useReveal";

export const Route = createFileRoute("/products/$productId")({
  loader: ({ params }) => {
    const p = getProduct(params.productId);
    if (!p) throw notFound();
    return { name: p.name, fabric: p.fabric, description: p.description };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found — Mehr" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.name} — ${loaderData.fabric} | Mehr`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.description },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-[1400px] px-5 py-48 text-center lg:px-10">
      <h1 className="type-h2">This piece has sold out</h1>
      <Link to="/collections" className="btn-ghost mt-8">
        Browse collections
      </Link>
    </div>
  ),
  component: ProductPage,
});


function ProductPage() {
  const { productId } = Route.useParams();
  const product = getProduct(productId)!;
  const { add } = useCart();
  const outSizes = product.soldOutSizes ?? [];
  const firstSize = product.sizes.find((s) => !outSizes.includes(s)) ?? product.sizes[0];
  const firstColor = (product.colors.find((c) => !c.soldOut) ?? product.colors[0]).name;

  const [size, setSize] = useState(firstSize);
  const [color, setColor] = useState(firstColor);
  const [qty, setQty] = useState(1);
  const [shot, setShot] = useState(0);
  const [chart, setChart] = useState(false);

  const scroller = useRef<HTMLDivElement>(null);
  useReveal();

  // Reset local state when navigating between products
  useEffect(() => {
    setSize(firstSize);
    setColor(firstColor);
    setQty(1);
    setShot(0);
    scroller.current?.scrollTo({ left: 0 });
  }, [productId, firstSize, firstColor]);

  // Auto-advance mobile carousel
  useEffect(() => {
    const timer = setInterval(() => {
      if (window.innerWidth < 1024) {
        setShot((s) => {
          const next = (s + 1) % product.gallery.length;
          const el = scroller.current;
          if (el) el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
          return next;
        });
      }
    }, 4500);
    return () => clearInterval(timer);
  }, [product.gallery.length]);

  const related = products.filter((p) => p.id !== product.id && p.category === product.category);
  const fill = products.filter((p) => p.id !== product.id);
  const suggestions = (related.length >= 3 ? related : fill).slice(0, 4);
  const sizeUnavailable = outSizes.includes(size);

  const step = (dir: 1 | -1) => {
    const next = (shot + dir + product.gallery.length) % product.gallery.length;
    setShot(next);
    const el = scroller.current;
    if (el) el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="pt-[92px] lg:pt-[104px] overflow-x-hidden">
      <div className="mx-auto max-w-[1600px] px-5 pt-6 lg:px-10 lg:pt-8">
        <nav className="num flex flex-wrap items-center gap-2 text-[0.6rem] tracking-[0.16em] uppercase text-muted-foreground">
          <Link to="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <span className="text-border">/</span>
          <Link to="/collections" className="transition-colors hover:text-foreground">
            Collections
          </Link>
          <span className="text-border">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-6 lg:grid-cols-[minmax(0,1fr)_minmax(360px,30rem)] lg:gap-16 lg:px-10 lg:py-10 xl:gap-24">
        {/* ---------------- Gallery ---------------- */}
        <div className="lg:sticky lg:top-[7.5rem] lg:self-start">
          {/* Mobile: swipeable carousel */}
          <div className="relative lg:hidden">
            <div
              ref={scroller}
              onScroll={(e) => {
                const el = e.currentTarget;
                setShot(Math.round(el.scrollLeft / el.clientWidth));
              }}
              className="no-scrollbar -mx-5 flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
            >
              {product.gallery.map((src, i) => (
                <div key={src + i} className="w-full shrink-0 snap-center px-5">
                  <div className="aspect-[4/5] overflow-hidden bg-sand">
                    <img
                      src={src}
                      alt={`${product.name} — view ${i + 1}`}
                      width={1000}
                      height={1250}
                      loading={i === 0 ? "eager" : "lazy"}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              aria-label="Previous image"
              onClick={() => step(-1)}
              className="absolute left-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center bg-background/85 backdrop-blur-sm"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.4} />
            </button>
            <button
              aria-label="Next image"
              onClick={() => step(1)}
              className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center bg-background/85 backdrop-blur-sm"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.4} />
            </button>
            <div className="mt-4 flex items-center justify-center gap-2">
              {product.gallery.map((src, i) => (
                <button
                  key={src + i}
                  aria-label={`Go to image ${i + 1}`}
                  onClick={() => {
                    setShot(i);
                    const el = scroller.current;
                    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
                  }}
                  className={`h-px w-8 transition-colors duration-500 ${i === shot ? "bg-gold" : "bg-border"}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop: thumbnail rail + large frame */}
          <div className="hidden gap-4 lg:flex">
            <div className="flex w-[5.5rem] shrink-0 flex-col gap-3">
              {product.gallery.map((src, i) => (
                <button
                  key={src + i}
                  onClick={() => setShot(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`aspect-[4/5] overflow-hidden border transition-all duration-300 ${
                    shot === i ? "border-gold" : "border-transparent hover:border-border"
                  }`}
                >
                  <img src={src} alt="" width={400} height={500} loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
            <div className="relative flex-1 overflow-hidden bg-sand">
              <div className="group aspect-[4/5]">
                <img
                  key={product.gallery[shot]}
                  src={product.gallery[shot]}
                  alt={`${product.name} — ${product.fabric}`}
                  width={1200}
                  height={1500}
                  className="h-full w-full animate-[reveal-in_.7s_cubic-bezier(.22,1,.36,1)_both] object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- Buy column ---------------- */}
        <div className="min-w-0 pb-24 lg:pb-0 flex flex-col">
          {/* Header Section: Category, Title */}
          <div className="mb-6">
            <p className="eyebrow text-muted-foreground mb-3">{product.fabric}</p>
            <h1 className="font-display text-[clamp(2.5rem,6vw,3.8rem)] leading-[1.05] text-foreground tracking-tight">{product.name}</h1>
          </div>

          {/* Price Section */}
          <div className="mb-8">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <span className="num text-4xl font-medium tracking-tight text-foreground">{formatPKR(product.price)}</span>
              {product.compareAt && (
                <>
                  <span className="num text-xl text-muted-foreground line-through">{formatPKR(product.compareAt)}</span>
                  <span className="num bg-gold/10 text-gold-foreground px-2.5 py-1 text-[0.7rem] font-semibold tracking-[0.15em] uppercase rounded-sm">
                    Save {Math.round((1 - product.price / product.compareAt) * 100)}%
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="mb-10 text-[0.95rem] leading-relaxed text-muted-foreground max-w-[90%]">
            {product.description}
          </p>
          
          {/* Variants Section - purely whitespace separated */}
          <div className="space-y-10 mb-10">
            {/* Colour */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="eyebrow text-muted-foreground">
                  Colour <span className="mx-2">—</span> <span className="text-foreground font-medium">{color}</span>
                  {product.colors.find((c) => c.name === color)?.soldOut && (
                    <span className="ml-2 normal-case tracking-normal text-muted-foreground">(sold out)</span>
                  )}
                </p>
              </div>
              <div className="flex flex-wrap gap-3.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    title={c.soldOut ? `${c.name} — sold out` : c.name}
                    aria-label={c.name}
                    aria-pressed={color === c.name}
                    className={`h-11 w-11 rounded-full ring-1 ring-offset-4 transition-all duration-300 ${
                      color === c.name ? "ring-foreground ring-offset-background scale-110" : "ring-border/40 hover:ring-foreground/40 ring-offset-transparent"
                    } ${c.soldOut ? "swatch-out text-foreground opacity-40" : "shadow-sm"}`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <div className="flex flex-wrap items-center justify-between mb-4">
                <p className="eyebrow text-muted-foreground">
                  Size <span className="mx-2">—</span> <span className="text-foreground font-medium">Inches</span>
                </p>
                <button
                  onClick={() => setChart(true)}
                  className="group flex items-center gap-2 text-[0.66rem] tracking-[0.15em] uppercase text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Ruler className="h-3.5 w-3.5 group-hover:text-gold transition-colors" strokeWidth={1.5} />
                  <span className="border-b border-border group-hover:border-gold transition-colors pb-0.5">Size Chart</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((s) => {
                  const soldOut = outSizes.includes(s);
                  return (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      aria-pressed={size === s}
                      className={`h-12 text-[0.85rem] font-medium transition-all duration-300 min-w-[3.5rem] px-4 rounded-none ${
                        soldOut
                          ? "swatch-out border border-border/40 text-muted-foreground/40 bg-transparent"
                          : size === s
                            ? "border-2 border-foreground bg-foreground text-background shadow-md scale-[1.02]"
                            : "border border-border/80 bg-transparent hover:border-foreground/60 text-foreground"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Section */}
          <div className="space-y-5">
            {/* Stock Status Indicator - moved above cart for urgency */}
            <div className="flex items-center gap-3">
              <div className="relative flex h-2 w-2 items-center justify-center">
                {!sizeUnavailable && product.stock > 5 && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                )}
                <span className={`relative inline-flex h-2 w-2 rounded-full ${sizeUnavailable ? 'bg-destructive' : product.stock <= 5 ? 'bg-orange-500' : 'bg-green-500'}`}></span>
              </div>
              <p className="num text-[0.8rem] text-foreground tracking-wide">
                {sizeUnavailable
                  ? `Size ${size} is sold out — restocks in 2 weeks`
                  : product.stock <= 5
                    ? `Only ${product.stock} left in this size run`
                    : "In stock · ships in 24 hours"}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch gap-4 sm:gap-3">
              <div className="flex items-stretch gap-3 w-full sm:w-auto">
                <div className="flex h-14 flex-1 sm:flex-none items-center border border-border/80 bg-transparent">
                  <button
                    aria-label="Decrease quantity"
                    className="grid h-full w-14 place-items-center text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/30"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                  >
                    <Minus className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                  <span className="num flex-1 text-center font-medium text-[1rem] sm:w-10">{qty}</span>
                  <button
                    aria-label="Increase quantity"
                    className="grid h-full w-14 place-items-center text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/30"
                    onClick={() => setQty((q) => Math.min(9, q + 1))}
                  >
                    <Plus className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
                
                <button
                  aria-label="Save to wishlist"
                  className="grid h-14 w-14 shrink-0 place-items-center border border-border/80 bg-transparent text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors"
                >
                  <Heart className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </div>
              
              <Button
                disabled={sizeUnavailable}
                onClick={() => add(product.id, size, qty)}
                className="h-14 min-w-0 flex-1 px-6 text-[0.8rem] font-bold uppercase tracking-[0.2em] rounded-none shadow-[0_4px_14px_0_rgb(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)] transition-all gap-3 w-full"
              >
                <ShoppingCart className="h-4 w-4 hidden sm:block" />
                {sizeUnavailable ? "Sold out" : "Add to Cart"}
              </Button>
            </div>

            <Link to="/checkout" className="flex h-14 w-full items-center justify-center border border-foreground bg-transparent text-[0.8rem] font-bold uppercase tracking-[0.2em] text-foreground transition-all hover:bg-foreground hover:text-background">
              Buy it now
            </Link>
          </div>

          {/* Minimal Accordion for Details (replacing tabs and duplicate features) */}
          <div className="mt-14 space-y-px bg-border/40">
            <details className="group bg-background" open>
              <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-[0.75rem] font-medium tracking-[0.15em] uppercase transition-colors hover:text-gold">
                Fabric & Care
                <Plus className="h-4 w-4 transition-transform group-open:rotate-45" strokeWidth={1.5} />
              </summary>
              <div className="pb-6 text-[0.9rem] leading-relaxed text-muted-foreground">
                <ul className="space-y-4">
                  {product.details.map((d) => (
                    <li key={d} className="flex gap-4">
                      <span className="mt-2.5 h-[2px] w-4 shrink-0 bg-gold/60" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </details>
            <details className="group bg-background">
              <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-[0.75rem] font-medium tracking-[0.15em] uppercase transition-colors hover:text-gold">
                Shipping & Returns
                <Plus className="h-4 w-4 transition-transform group-open:rotate-45" strokeWidth={1.5} />
              </summary>
              <div className="pb-6 space-y-5 text-[0.9rem] leading-relaxed text-muted-foreground">
                <p className="flex items-start gap-4">
                  <span className="mt-2.5 h-[2px] w-4 shrink-0 bg-gold/60" />
                  <span>Dispatched from Lahore within 24 hours. Rs. 250 flat shipping, free over Rs. 5,000. Cash on delivery nationwide.</span>
                </p>
                <p className="flex items-start gap-4">
                  <span className="mt-2.5 h-[2px] w-4 shrink-0 bg-gold/60" />
                  <span>
                    Exchange within 7 days, unworn and with tags — start it on WhatsApp or the{" "}
                    <Link to="/track" className="link-line text-foreground font-medium">
                      tracking page
                    </Link>.
                  </span>
                </p>
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* ---------------- You may also like ---------------- */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1600px] px-5 py-16 lg:px-10 lg:py-24">
          <div data-reveal className="reveal-up">
            <p className="eyebrow text-muted-foreground">You may also like</p>
            <div className="rule-gold my-4" />
            <h2 className="type-h2">Pairs well with</h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-5 lg:mt-14 lg:grid-cols-4 lg:gap-x-7 lg:gap-y-16">
            {suggestions.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Mobile sticky buy bar ---------------- */}
      <div className="fixed inset-x-0 bottom-0 z-[60] flex items-center justify-between gap-4 border-t border-border bg-background/95 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden shadow-[0_-4px_24px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col min-w-0 shrink-0">
          <span className="text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground mb-1">{product.name} — {size}</span>
          <span className="num text-[1.15rem] font-medium tracking-tight leading-none text-foreground">{formatPKR(product.price * qty)}</span>
        </div>
        <Button
          disabled={sizeUnavailable}
          onClick={() => add(product.id, size, qty)}
          className="h-12 w-full max-w-[170px] px-2 text-[0.7rem] font-bold uppercase tracking-[0.15em] rounded-none shadow-[0_4px_14px_0_rgb(0,0,0,0.05)]"
        >
          {sizeUnavailable ? "Sold out" : "Add to Cart"}
        </Button>
      </div>

      {chart && (
        <div className="fixed inset-0 z-[95] flex items-end justify-center bg-foreground/40 backdrop-blur-[2px] sm:items-center sm:p-6" onClick={() => setChart(false)}>
          <div className="max-h-[86vh] w-full max-w-lg animate-[reveal-in_.4s_cubic-bezier(.22,1,.36,1)_both] overflow-y-auto bg-background p-6 sm:p-7" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow text-muted-foreground">Measurements in inches</p>
                <h3 className="mt-2 font-display text-2xl">Size Chart</h3>
              </div>
              <button aria-label="Close size chart" onClick={() => setChart(false)}>
                <X className="h-5 w-5" strokeWidth={1.4} />
              </button>
            </div>
            <table className="num mt-7 w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-[0.58rem] tracking-[0.16em] uppercase text-muted-foreground">
                  <th className="pb-3 font-medium">Size</th>
                  <th className="pb-3 font-medium">Chest</th>
                  <th className="pb-3 font-medium">Waist</th>
                  <th className="pb-3 font-medium">Hip</th>
                  <th className="pb-3 font-medium">Length</th>
                </tr>
              </thead>
              <tbody>
                {sizeChart.map((r) => (
                  <tr key={r.size} className="border-b border-border/60">
                    <td className="py-3">{r.size}</td>
                    <td className="py-3 text-muted-foreground">{r.chest}"</td>
                    <td className="py-3 text-muted-foreground">{r.waist}"</td>
                    <td className="py-3 text-muted-foreground">{r.hip}"</td>
                    <td className="py-3 text-muted-foreground">{r.length}"</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-5 text-[0.74rem] leading-relaxed text-muted-foreground">
              Our M sits between a Khaadi M and a Sapphire M. If you are between two sizes on the chest, take the larger.
            </p>
            <button onClick={() => setChart(false)} className="btn-ghost mt-6 w-full">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
