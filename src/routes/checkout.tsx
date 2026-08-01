import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { formatPKR, getProduct } from "@/components/store/data";
import { FREE_SHIPPING, SHIPPING_FEE, useCart } from "@/components/store/cart";

const title = "Checkout — Mehr";
const description = "Secure checkout with cash on delivery, Easypaisa, JazzCash or card.";

export const Route = createFileRoute("/checkout")({
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
  component: CheckoutPage,
});

const field =
  "w-full border border-border bg-background px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-gold";

const payments = [
  { id: "cod", label: "Cash on Delivery", note: "Pay the rider. Rs. 0 extra." },
  { id: "wallet", label: "Easypaisa / JazzCash", note: "Instant confirmation" },
  { id: "card", label: "Debit / Credit Card", note: "Visa, Mastercard" },
];

function CheckoutPage() {
  const { lines, subtotal } = useCart();
  const [pay, setPay] = useState("cod");
  const [placed, setPlaced] = useState(false);
  const shipping = subtotal >= FREE_SHIPPING || subtotal === 0 ? 0 : SHIPPING_FEE;

  if (placed) {
    return (
      <div className="mx-auto max-w-lg px-5 pb-32 pt-48 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center border border-gold text-gold">
          <Check className="h-6 w-6" strokeWidth={1.3} />
        </div>
        <h1 className="type-h2 mt-8">Order placed</h1>
        <p className="num mt-4 text-sm text-muted-foreground">
          Order <span className="text-foreground">#MHR-24817</span> · pay {formatPKR(subtotal + shipping)} on delivery
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link to="/track" className="btn-primary">
            Track this order
          </Link>
          <Link to="/collections" className="btn-ghost">
            Keep shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-28 pt-40 lg:px-10 lg:pt-48">
      <p className="eyebrow text-muted-foreground">Step 02 of 03</p>
      <div className="rule-gold my-5" />
      <h1 className="type-display">Checkout</h1>

      <div className="mt-14 grid gap-14 lg:grid-cols-[1.4fr_0.85fr] lg:gap-20">
        <form
          className="space-y-12"
          onSubmit={(e) => {
            e.preventDefault();
            setPlaced(true);
          }}
        >
          <section>
            <h2 className="font-display text-2xl">Contact</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <input required className={field} placeholder="Full name" autoComplete="name" />
              <input required className={`${field} num`} placeholder="03XX XXXXXXX" inputMode="tel" autoComplete="tel" />
              <input className={`${field} sm:col-span-2`} placeholder="Email (for the receipt)" type="email" autoComplete="email" />
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl">Delivery address</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <input required className={`${field} sm:col-span-2`} placeholder="House / street / area" autoComplete="street-address" />
              <input required className={field} placeholder="City" autoComplete="address-level2" />
              <input className={`${field} num`} placeholder="Postal code" inputMode="numeric" autoComplete="postal-code" />
              <textarea className={`${field} sm:col-span-2`} rows={3} placeholder="Delivery notes (optional)" />
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl">Payment</h2>
            <div className="mt-5 space-y-3">
              {payments.map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setPay(p.id)}
                  className={`flex w-full items-center justify-between border px-5 py-4 text-left transition-colors ${
                    pay === p.id ? "border-gold bg-gold-soft/40" : "border-border hover:border-foreground"
                  }`}
                >
                  <span>
                    <span className="block text-sm">{p.label}</span>
                    <span className="block text-[0.72rem] text-muted-foreground">{p.note}</span>
                  </span>
                  <span className={`grid h-4 w-4 place-items-center rounded-full border ${pay === p.id ? "border-gold" : "border-border"}`}>
                    {pay === p.id && <span className="h-2 w-2 rounded-full bg-gold" />}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <button type="submit" className="btn-primary w-full">
            Place order — {formatPKR(subtotal + shipping)}
          </button>
        </form>

        <aside className="h-fit border border-border p-7 lg:sticky lg:top-32">
          <p className="eyebrow text-muted-foreground">Your order</p>
          <ul className="mt-6 space-y-5">
            {lines.map((l) => {
              const p = getProduct(l.id);
              if (!p) return null;
              return (
                <li key={l.key} className="flex gap-4">
                  <img src={p.front} alt={p.name} width={200} height={260} loading="lazy" className="h-24 w-20 object-cover" />
                  <div className="flex-1">
                    <p className="font-display text-lg">{p.name}</p>
                    <p className="num text-[0.72rem] text-muted-foreground">
                      Size {l.size} · Qty {l.qty}
                    </p>
                    <p className="num mt-2 text-sm">{formatPKR(p.price * l.qty)}</p>
                  </div>
                </li>
              );
            })}
            {lines.length === 0 && <li className="text-sm text-muted-foreground">Your bag is empty.</li>}
          </ul>
          <dl className="num mt-7 space-y-3 border-t border-border pt-5 text-sm">
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
        </aside>
      </div>
    </div>
  );
}
