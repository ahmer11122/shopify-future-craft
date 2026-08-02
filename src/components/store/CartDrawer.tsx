import { Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "@phosphor-icons/react";
import { formatPKR, getProduct, products } from "./data";
import { FREE_SHIPPING, useCart } from "./cart";

export function CartDrawer() {
  const { open, setOpen, lines, subtotal, setQty, remove, count, add } = useCart();
  const progress = Math.min(100, (subtotal / FREE_SHIPPING) * 100);
  const remaining = Math.max(0, FREE_SHIPPING - subtotal);

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[85] bg-foreground/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed right-0 top-0 z-[90] flex h-full w-full max-w-[430px] flex-col bg-background transition-transform duration-500 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <p className="num eyebrow">Your Bag ({String(count).padStart(2, "0")})</p>
          <button aria-label="Close cart" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" weight="light" />
          </button>
        </div>

        <div className="border-b border-border px-6 py-5">
          <p className="text-[0.75rem] text-muted-foreground">
            {remaining > 0 ? (
              <>
                You are <span className="num text-foreground">{formatPKR(remaining)}</span> away from free shipping
              </>
            ) : (
              <span className="text-gold">Free shipping unlocked</span>
            )}
          </p>
          <div className="mt-3 h-px w-full bg-border">
            <div className="h-px bg-gold transition-all duration-700" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {lines.length === 0 && (
            <div className="py-16 text-center">
              <p className="font-display text-2xl">Your bag is empty</p>
              <Link to="/collections" onClick={() => setOpen(false)} className="btn-ghost mt-6">
                Start shopping
              </Link>
            </div>
          )}

          <ul className="space-y-7">
            {lines.map((l) => {
              const p = getProduct(l.id);
              if (!p) return null;
              return (
                <li key={l.key} className="flex gap-4">
                  <Link to="/products/$productId" params={{ productId: p.id }} onClick={() => setOpen(false)}>
                    <img src={p.front} alt={p.name} width={800} height={1100} loading="lazy" className="h-32 w-24 object-cover" />
                  </Link>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-display text-lg">{p.name}</p>
                      <button aria-label="Remove" onClick={() => remove(l.key)} className="text-muted-foreground hover:text-foreground">
                        <X className="h-3.5 w-3.5" weight="light" />
                      </button>
                    </div>
                    <p className="mt-1 text-[0.72rem] text-muted-foreground">
                      {p.fabric} · Size {l.size}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center border border-border">
                        <button aria-label="Decrease" className="px-2.5 py-1.5" onClick={() => setQty(l.key, l.qty - 1)}>
                          <Minus className="h-3 w-3" weight="light" />
                        </button>
                        <span className="num w-8 text-center text-xs">{l.qty}</span>
                        <button aria-label="Increase" className="px-2.5 py-1.5" onClick={() => setQty(l.key, l.qty + 1)}>
                          <Plus className="h-3 w-3" weight="light" />
                        </button>
                      </div>
                      <p className="num text-sm">{formatPKR(p.price * l.qty)}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-12 border-t border-border pt-7">
            <p className="eyebrow text-muted-foreground">Complete the look</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {products.slice(4, 6).map((p) => (
                <div key={p.id}>
                  <Link to="/products/$productId" params={{ productId: p.id }} onClick={() => setOpen(false)}>
                    <img src={p.front} alt={p.name} width={600} height={750} loading="lazy" className="aspect-[4/5] w-full object-cover" />
                  </Link>
                  <p className="mt-2 font-display text-base">{p.name}</p>
                  <p className="num text-[0.72rem] text-muted-foreground">{formatPKR(p.price)}</p>
                  <button
                    onClick={() => add(p.id, p.sizes[0])}
                    className="mt-2 w-full border border-border py-2 text-[0.58rem] tracking-[0.18em] uppercase transition-colors hover:border-foreground"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border px-6 py-6">
          <div className="flex items-baseline justify-between">
            <span className="eyebrow text-muted-foreground">Subtotal</span>
            <span className="num text-lg">{formatPKR(subtotal)}</span>
          </div>
          <p className="mt-2 text-[0.7rem] text-muted-foreground">
            Shipping and COD charges calculated at checkout.
          </p>
          <Link
            to="/checkout"
            onClick={() => setOpen(false)}
            className="btn-primary mt-5 w-full"
            aria-disabled={lines.length === 0}
          >
            Checkout
          </Link>
          <Link
            to="/cart"
            onClick={() => setOpen(false)}
            className="mt-3 block text-center text-[0.68rem] tracking-[0.16em] uppercase text-muted-foreground hover:text-foreground"
          >
            View full bag
          </Link>
        </div>
      </aside>
    </>
  );
}
