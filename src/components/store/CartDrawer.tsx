import { X } from "lucide-react";
import { formatPKR, products } from "./data";

const THRESHOLD = 5000;

export function CartDrawer({
  open,
  onClose,
  count,
}: {
  open: boolean;
  onClose: () => void;
  count: number;
}) {
  const item = products[1];
  const subtotal = item.price * Math.max(count, 1);
  const progress = Math.min(100, (subtotal / THRESHOLD) * 100);
  const remaining = Math.max(0, THRESHOLD - subtotal);

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-foreground/40 transition-opacity duration-400 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-[420px] flex-col bg-background transition-transform duration-500 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <p className="eyebrow">Your Bag ({Math.max(count, 1)})</p>
          <button aria-label="Close cart" onClick={onClose}>
            <X className="h-5 w-5" strokeWidth={1.4} />
          </button>
        </div>

        <div className="border-b border-border px-6 py-5">
          <p className="text-[0.75rem] text-muted-foreground">
            {remaining > 0 ? (
              <>
                You are <span className="text-foreground">{formatPKR(remaining)}</span> away from free shipping
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
          <div className="flex gap-4">
            <img
              src={item.front}
              alt={item.name}
              width={800}
              height={1100}
              loading="lazy"
              className="h-32 w-24 object-cover"
            />
            <div className="flex-1">
              <p className="font-display text-lg">{item.name}</p>
              <p className="mt-1 text-[0.72rem] text-muted-foreground">{item.fabric} · Size M</p>
              <p className="mt-3 text-sm">{formatPKR(subtotal)}</p>
            </div>
          </div>

          <div className="mt-10 border-t border-border pt-7">
            <p className="eyebrow text-muted-foreground">Complete the look</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {[products[0], products[2]].map((p) => (
                <div key={p.id}>
                  <img
                    src={p.front}
                    alt={p.name}
                    width={800}
                    height={1100}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover"
                  />
                  <p className="mt-2 text-[0.78rem]">{p.name}</p>
                  <p className="text-[0.72rem] text-muted-foreground">{formatPKR(p.price)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border px-6 py-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatPKR(subtotal)}</span>
          </div>
          <p className="mt-3 bg-gold-soft px-3 py-2 text-center text-[0.62rem] tracking-[0.16em] uppercase">
            Cash on Delivery Available
          </p>
          <button className="mt-4 w-full bg-foreground py-4 text-[0.7rem] tracking-[0.2em] uppercase text-background transition-colors hover:bg-gold hover:text-accent-foreground">
            Checkout
          </button>
        </div>
      </aside>
    </>
  );
}
