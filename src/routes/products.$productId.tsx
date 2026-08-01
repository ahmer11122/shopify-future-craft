import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, Minus, Plus, Ruler, ShieldCheck, Truck, X } from "lucide-react";
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
  const [size, setSize] = useState(product.sizes[Math.min(1, product.sizes.length - 1)]);
  const [qty, setQty] = useState(1);
  const [shot, setShot] = useState(0);
  const [chart, setChart] = useState(false);
  const [tab, setTab] = useState<(typeof tabs)[number]>("Description");
  useReveal();

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const fill = products.filter((p) => p.id !== product.id).slice(0, 4);
  const suggestions = (related.length >= 3 ? related : fill).slice(0, 4);

  return (
    <div className="pt-[104px]">
      <div className="mx-auto max-w-[1400px] px-5 pt-8 lg:px-10">
        <nav className="num flex items-center gap-2 text-[0.62rem] tracking-[0.16em] uppercase text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link to="/collections" className="hover:text-foreground">
            Collections
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-10 lg:py-14">
        <div className="flex flex-col-reverse gap-4 lg:flex-row">
          <div className="flex shrink-0 gap-3 lg:flex-col">
            {product.gallery.map((src, i) => (
              <button
                key={src + i}
                onClick={() => setShot(i)}
                aria-label={`View image ${i + 1}`}
                className={`h-24 w-20 overflow-hidden border transition-colors ${
                  shot === i ? "border-gold" : "border-transparent hover:border-border"
                }`}
              >
                <img src={src} alt="" width={400} height={500} loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <div className="group relative aspect-[4/5.1] flex-1 overflow-hidden bg-sand">
            <img
              src={product.gallery[shot]}
              alt={`${product.name} — ${product.fabric}`}
              width={1000}
              height={1300}
              className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
            />
          </div>
        </div>

        <div className="lg:pt-4">
          <p className="eyebrow text-muted-foreground">{product.fabric}</p>
          <h1 className="mt-4 font-display text-[clamp(2.4rem,4.4vw,3.6rem)] leading-[0.98]">{product.name}</h1>

          <div className="mt-4 flex items-center gap-3">
            <Stars rating={product.rating} />
            <span className="num text-[0.72rem] text-muted-foreground">
              {product.rating.toFixed(1)} · {product.reviews} reviews
            </span>
          </div>

          <div className="mt-6 flex items-baseline gap-4">
            <span className="num text-2xl">{formatPKR(product.price)}</span>
            {product.compareAt && (
              <>
                <span className="num text-sm text-muted-foreground line-through">{formatPKR(product.compareAt)}</span>
                <span className="num bg-gold-soft px-2.5 py-1 text-[0.62rem] tracking-[0.16em] uppercase">
                  Save {Math.round((1 - product.price / product.compareAt) * 100)}%
                </span>
              </>
            )}
          </div>
          <p className="mt-2 text-[0.72rem] text-muted-foreground">Inclusive of all taxes</p>

          <p className="mt-7 max-w-md text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="mt-9">
            <p className="eyebrow text-muted-foreground">
              Colour — <span className="text-foreground">{product.colors[0].name}</span>
            </p>
            <div className="mt-3 flex gap-2.5">
              {product.colors.map((c, i) => (
                <span
                  key={c.name}
                  title={c.name}
                  className={`h-8 w-8 rounded-full ring-1 ${i === 0 ? "ring-2 ring-gold ring-offset-2" : "ring-border"}`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <p className="eyebrow">Size — Inches</p>
            <button
              onClick={() => setChart(true)}
              className="flex items-center gap-2 border-b border-foreground pb-0.5 text-[0.68rem] tracking-[0.14em] uppercase transition-colors hover:border-gold hover:text-gold"
            >
              <Ruler className="h-3.5 w-3.5" strokeWidth={1.4} />
              Size Chart
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`h-12 w-12 border text-xs transition-colors ${
                  size === s ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <p className="num mt-3 text-[0.72rem] text-muted-foreground">
            {product.stock <= 5 ? `Only ${product.stock} left in this size run` : "In stock · ships in 24 hours"}
          </p>

          <div className="mt-8 flex gap-3">
            <div className="flex items-center border border-border">
              <button aria-label="Decrease quantity" className="px-4 py-4" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
              </button>
              <span className="num w-8 text-center text-sm">{qty}</span>
              <button aria-label="Increase quantity" className="px-4 py-4" onClick={() => setQty((q) => q + 1)}>
                <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
              </button>
            </div>
            <button onClick={() => add(product.id, size, qty)} className="btn-primary flex-1">
              Add to Bag — {formatPKR(product.price * qty)}
            </button>
            <button aria-label="Save to wishlist" className="border border-border px-5 transition-colors hover:border-foreground">
              <Heart className="h-4 w-4" strokeWidth={1.4} />
            </button>
          </div>

          <Link to="/checkout" className="btn-ghost mt-3 w-full">
            Buy it now
          </Link>

          <div className="mt-7 space-y-3 border border-border bg-sand/60 p-5">
            <p className="flex items-center gap-3 text-[0.8rem]">
              <ShieldCheck className="h-4 w-4 text-gold" strokeWidth={1.4} />
              Cash on Delivery available across Pakistan
            </p>
            <p className="flex items-center gap-3 text-[0.8rem] text-muted-foreground">
              <Truck className="h-4 w-4 text-gold" strokeWidth={1.4} />7 day exchange · unworn with tags · Rs. 250 return charge
            </p>
            <a
              href="https://wa.me/920000000000"
              className="flex items-center gap-3 text-[0.8rem] text-muted-foreground transition-colors hover:text-gold"
            >
              <WhatsAppGlyph className="h-4 w-4 text-whatsapp" />
              Ask about fabric or fit on WhatsApp
            </a>
          </div>

          <div className="mt-10 border-t border-border">
            <div className="flex flex-wrap gap-6 pt-5">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`link-line text-[0.66rem] tracking-[0.16em] uppercase transition-colors ${
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

      <section className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
        <div data-reveal className="reveal-up">
          <p className="eyebrow text-muted-foreground">You may also like</p>
          <div className="rule-gold my-4" />
          <h2 className="type-h2">Pairs well with</h2>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-14 lg:grid-cols-4 lg:gap-x-7">
          {suggestions.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {chart && (
        <div className="fixed inset-0 z-[95] flex items-end justify-center bg-foreground/40 sm:items-center sm:p-6">
          <div className="w-full max-w-lg bg-background p-7">
            <div className="flex items-start justify-between">
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
                <tr className="border-b border-border text-[0.6rem] tracking-[0.16em] uppercase text-muted-foreground">
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
            <p className="mt-5 text-[0.75rem] leading-relaxed text-muted-foreground">
              Our M sits between a Khaadi M and a Sapphire M. If you are between two sizes on the chest, take the larger.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
