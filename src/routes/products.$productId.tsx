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
} from "lucide-react";
import { formatPKR, getProduct, products, sizeChart } from "@/components/store/data";
import { useCart } from "@/components/store/cart";
import { WhatsAppGlyph } from "@/components/store/Header";
import { ProductCard, Stars } from "@/components/store/ProductCard";
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

const tabs = ["Description", "Fabric & Care", "Shipping & Returns"] as const;

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
  const [tab, setTab] = useState<(typeof tabs)[number]>("Description");
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
    <div className="pt-[92px] lg:pt-[104px]">
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
                <div key={src + i} className="w-screen shrink-0 snap-center px-5">
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
            <div className="group relative flex-1 overflow-hidden bg-sand">
              <div className="aspect-[4/5]">
                <img
                  key={product.gallery[shot]}
                  src={product.gallery[shot]}
                  alt={`${product.name} — ${product.fabric}`}
                  width={1200}
                  height={1500}
                  className="h-full w-full animate-[reveal-in_.7s_cubic-bezier(.22,1,.36,1)_both] object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                />
              </div>
              {product.tag && <span className="tag-chip absolute bottom-4 left-4">{product.tag}</span>}
            </div>
          </div>
        </div>

        {/* ---------------- Buy column ---------------- */}
        <div className="min-w-0 pb-24 lg:pb-0">
          <p className="eyebrow text-muted-foreground">{product.fabric}</p>
          <h1 className="mt-3 font-display text-[clamp(2.1rem,5.5vw,3.2rem)] leading-[1]">{product.name}</h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
            <Stars rating={product.rating} />
            <span className="num text-[0.7rem] text-muted-foreground">
              {product.rating.toFixed(1)} · {product.reviews} reviews
            </span>
          </div>

          <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <span className="num text-2xl">{formatPKR(product.price)}</span>
            {product.compareAt && (
              <>
                <span className="num text-sm text-muted-foreground line-through">{formatPKR(product.compareAt)}</span>
                <span className="num bg-gold-soft px-2.5 py-1 text-[0.6rem] tracking-[0.16em] uppercase">
                  Save {Math.round((1 - product.price / product.compareAt) * 100)}%
                </span>
              </>
            )}
          </div>
          <p className="mt-2 text-[0.7rem] text-muted-foreground">Inclusive of all taxes</p>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          {/* Colour */}
          <div className="mt-8">
            <p className="eyebrow text-muted-foreground">
              Colour — <span className="text-foreground">{color}</span>
              {product.colors.find((c) => c.name === color)?.soldOut && (
                <span className="ml-2 normal-case tracking-normal text-muted-foreground">(sold out)</span>
              )}
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  title={c.soldOut ? `${c.name} — sold out` : c.name}
                  aria-label={c.name}
                  aria-pressed={color === c.name}
                  className={`h-9 w-9 rounded-full ring-1 transition-all duration-300 ${
                    color === c.name ? "ring-2 ring-gold ring-offset-2" : "ring-border hover:ring-foreground"
                  } ${c.soldOut ? "swatch-out text-foreground" : ""}`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <p className="eyebrow">Size — Inches</p>
            <button
              onClick={() => setChart(true)}
              className="flex items-center gap-2 border-b border-foreground pb-0.5 text-[0.66rem] tracking-[0.14em] uppercase transition-colors hover:border-gold hover:text-gold"
            >
              <Ruler className="h-3.5 w-3.5" strokeWidth={1.4} />
              Size Chart
            </button>
          </div>
          <div className="mt-4 grid grid-cols-5 gap-2 sm:flex sm:flex-wrap sm:gap-2.5">
            {product.sizes.map((s) => {
              const soldOut = outSizes.includes(s);
              return (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={`h-12 border text-xs transition-all duration-300 sm:w-12 ${
                    soldOut
                      ? "swatch-out border-border text-muted-foreground"
                      : size === s
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground hover:shadow-[0_0_0_3px_color-mix(in_oklab,var(--gold)_16%,transparent)]"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
          <p className="num mt-3 text-[0.7rem] text-muted-foreground">
            {sizeUnavailable
              ? `Size ${size} is sold out — we restock every second week.`
              : product.stock <= 5
                ? `Only ${product.stock} left in this size run`
                : "In stock · ships in 24 hours"}
          </p>

          {/* Quantity + Add */}
          <div className="mt-7 flex flex-wrap items-stretch gap-3">
            <div className="flex h-14 shrink-0 items-center border border-border">
              <button
                aria-label="Decrease quantity"
                className="grid h-full w-11 place-items-center text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
              </button>
              <span className="num w-8 text-center text-sm">{qty}</span>
              <button
                aria-label="Increase quantity"
                className="grid h-full w-11 place-items-center text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setQty((q) => Math.min(9, q + 1))}
              >
                <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
              </button>
            </div>
            <button
              disabled={sizeUnavailable}
              onClick={() => add(product.id, size, qty)}
              className="btn-primary h-14 min-w-0 flex-1 basis-40 px-5 py-0 text-[0.66rem]"
            >
              <span className="truncate">
                {sizeUnavailable ? "Sold out" : `Add to Bag — ${formatPKR(product.price * qty)}`}
              </span>
            </button>
            <button
              aria-label="Save to wishlist"
              className="hover-ring grid h-14 w-14 shrink-0 place-items-center border border-border"
            >
              <Heart className="h-4 w-4" strokeWidth={1.4} />
            </button>
          </div>

          <Link to="/checkout" className="btn-ghost mt-3 h-14 w-full py-0">
            Buy it now
          </Link>

          <div className="mt-7 divide-y divide-border border border-border bg-sand/50">
            <p className="flex items-center gap-3 px-5 py-4 text-[0.78rem]">
              <ShieldCheck className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.4} />
              Cash on Delivery available across Pakistan
            </p>
            <p className="flex items-center gap-3 px-5 py-4 text-[0.78rem] text-muted-foreground">
              <Truck className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.4} />
              Dispatched from Lahore in 24 hours · free over Rs. 5,000
            </p>
            <p className="flex items-center gap-3 px-5 py-4 text-[0.78rem] text-muted-foreground">
              <RefreshCw className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.4} />7 day exchange · unworn with tags
            </p>
            <a
              href="https://wa.me/920000000000"
              className="flex items-center gap-3 px-5 py-4 text-[0.78rem] text-muted-foreground transition-colors hover:text-foreground"
            >
              <WhatsAppGlyph className="h-4 w-4 shrink-0 text-whatsapp" />
              Ask about fabric or fit on WhatsApp
            </a>
          </div>

          {/* Tabs */}
          <div className="mt-10 border-t border-border">
            <div className="flex flex-wrap gap-x-6 gap-y-3 pt-5">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`link-line text-[0.64rem] tracking-[0.16em] uppercase transition-colors ${
                    tab === t ? "is-on text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="pt-6 text-sm leading-relaxed text-muted-foreground">
              {tab === "Description" && <p>{product.description}</p>}
              {tab === "Fabric & Care" && (
                <ul className="space-y-2.5">
                  {product.details.map((d) => (
                    <li key={d} className="flex gap-3">
                      <span className="mt-2 h-px w-4 shrink-0 bg-gold" />
                      {d}
                    </li>
                  ))}
                </ul>
              )}
              {tab === "Shipping & Returns" && (
                <p>
                  Dispatched from Lahore within 24 hours. Rs. 250 flat shipping, free over Rs. 5,000. Cash on delivery
                  nationwide. Exchange within 7 days, unworn and with tags — start it on WhatsApp or the{" "}
                  <Link to="/track" className="link-line text-foreground">
                    tracking page
                  </Link>
                  .
                </p>
              )}
            </div>
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
      <div className="fixed inset-x-0 bottom-0 z-[60] flex items-center gap-3 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="min-w-0">
          <p className="num text-sm leading-tight">{formatPKR(product.price * qty)}</p>
          <p className="truncate text-[0.62rem] tracking-[0.1em] uppercase text-muted-foreground">
            {product.name} · {size}
          </p>
        </div>
        <button
          disabled={sizeUnavailable}
          onClick={() => add(product.id, size, qty)}
          className="btn-primary ml-auto h-12 flex-1 px-4 py-0 text-[0.62rem]"
        >
          {sizeUnavailable ? "Sold out" : "Add to Bag"}
        </button>
      </div>

      {chart && (
        <div className="fixed inset-0 z-[95] flex items-end justify-center bg-foreground/40 backdrop-blur-[2px] sm:items-center sm:p-6">
          <div className="max-h-[86vh] w-full max-w-lg animate-[reveal-in_.4s_cubic-bezier(.22,1,.36,1)_both] overflow-y-auto bg-background p-6 sm:p-7">
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
