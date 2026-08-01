import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { formatPKR, getProduct } from "@/components/store/data";
import { FREE_SHIPPING, SHIPPING_FEE, useCart } from "@/components/store/cart";

const title = "Your Bag — Mehr";
const description = "Review your Mehr bag, adjust sizes and quantities, then checkout with cash on delivery.";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, subtotal, setQty, remove, count } = useCart();
  const shipping = subtotal >= FREE_SHIPPING || subtotal === 0 ? 0 : SHIPPING_FEE;

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-28 pt-40 lg:px-10 lg:pt-48">
      <p className="eyebrow text-muted-foreground">Step 01 of 03</p>
      <div className="rule-gold my-5" />
      <h1 className="type-display">Your Bag</h1>
      <p className="num mt-4 text-sm text-muted-foreground">
        {String(count).padStart(2, "0")} items · dispatched from Lahore within 24 hours
      </p>

      {lines.length === 0 ? (
        <div className="border border-border px-8 py-24 text-center">
          <p className="font-display text-3xl">Nothing here yet</p>
          <p className="mt-3 text-sm text-muted-foreground">Start with the new arrivals — 12 pieces just landed.</p>
          <Link to="/collections/$handle" params={{ handle: "new-arrivals" }} className="btn-primary mt-8">
            Shop New Arrivals
          </Link>
        </div>
      ) : (
        <div className="mt-14 grid gap-14 lg:grid-cols-[1.5fr_0.75fr] lg:gap-20">
          <ul className="border-t border-border">
            {lines.map((l) => {
              const p = getProduct(l.id);
              if (!p) return null;
              return (
                <li key={l.key} className="flex gap-5 border-b border-border py-7">
                  <Link to="/products/$productId" params={{ productId: p.id }} className="shrink-0">
                    <img src={p.front} alt={p.name} width={400} height={520} loading="lazy" className="h-40 w-32 object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="font-display text-2xl">
                            <Link to="/products/$productId" params={{ productId: p.id }} className="link-line">
                              {p.name}
                            </Link>
                          </h2>
                          <p className="mt-1.5 text-[0.75rem] text-muted-foreground">
                            {p.fabric} · Size {l.size} · {p.colors[0].name}
                          </p>
                        </div>
                        <button aria-label="Remove item" onClick={() => remove(l.key)} className="text-muted-foreground hover:text-foreground">
                          <X className="h-4 w-4" strokeWidth={1.4} />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-end justify-between">
                      <div className="flex items-center border border-border">
                        <button aria-label="Decrease" className="px-3 py-2" onClick={() => setQty(l.key, l.qty - 1)}>
                          <Minus className="h-3 w-3" strokeWidth={1.6} />
                        </button>
                        <span className="num w-9 text-center text-xs">{l.qty}</span>
                        <button aria-label="Increase" className="px-3 py-2" onClick={() => setQty(l.key, l.qty + 1)}>
                          <Plus className="h-3 w-3" strokeWidth={1.6} />
                        </button>
                      </div>
                      <p className="num text-base">{formatPKR(p.price * l.qty)}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <aside className="h-fit border border-border p-7 lg:sticky lg:top-32">
            <p className="eyebrow text-muted-foreground">Order Summary</p>
            <dl className="num mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd>{formatPKR(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd>{shipping === 0 ? "Free" : formatPKR(shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-4 text-base">
                <dt>Total</dt>
                <dd>{formatPKR(subtotal + shipping)}</dd>
              </div>
            </dl>
            <Link to="/checkout" className="btn-primary mt-7 w-full">
              Continue to Checkout
            </Link>
            <Link
              to="/collections"
              className="mt-4 block text-center text-[0.68rem] tracking-[0.16em] uppercase text-muted-foreground hover:text-foreground"
            >
              Continue shopping
            </Link>
            <p className="mt-6 text-[0.72rem] leading-relaxed text-muted-foreground">
              Cash on delivery available nationwide. 7 day exchange on unworn pieces with tags.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
