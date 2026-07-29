import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";

const nav = [
  { label: "New Arrivals", items: ["Lawn Edit 2026", "Eid Preview", "Back In Stock"] },
  { label: "Bestsellers", items: ["Top 20 This Week", "Most Reviewed", "Restocked"] },
  {
    label: "Shop by Type",
    items: ["Lawn", "Stitched", "Unstitched", "Formal"],
  },
  { label: "Sale", items: ["Upto 50% Off", "Last Pieces"] },
];

export function Header({ onCartOpen, cartCount }: { onCartOpen: () => void; cartCount: number }) {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="overflow-hidden bg-foreground text-background">
        <div className="flex w-max marquee-track">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center gap-14 px-7 py-2.5">
              {[
                "Cash on Delivery Available Nationwide",
                "Free Shipping Over Rs. 5,000",
                "7 Day Easy Exchange",
                "Dispatch Within 24 Hours",
              ].map((t) => (
                <span key={t} className="eyebrow whitespace-nowrap">
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div
        className={`border-b transition-colors duration-500 ${
          solid ? "border-border bg-background/95 backdrop-blur" : "border-transparent bg-background"
        }`}
        onMouseLeave={() => setOpen(null)}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-4 lg:px-10">
          <button
            className="lg:hidden"
            aria-label="Open menu"
            onClick={() => setMobile(true)}
          >
            <Menu className="h-5 w-5" strokeWidth={1.4} />
          </button>

          <nav className="hidden flex-1 items-center gap-8 lg:flex">
            {nav.map((item) => (
              <button
                key={item.label}
                onMouseEnter={() => setOpen(item.label)}
                className={`eyebrow py-2 transition-colors ${
                  open === item.label ? "text-gold" : "text-foreground hover:text-gold"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <a href="#top" className="font-display text-2xl tracking-[0.3em] lg:text-[1.7rem]">
            MEHR
          </a>

          <div className="flex flex-1 items-center justify-end gap-5">
            <a
              href="https://wa.me/920000000000"
              className="hidden items-center gap-2 border border-border px-3 py-1.5 text-[0.7rem] tracking-[0.12em] uppercase transition-colors hover:border-gold hover:text-gold md:flex"
            >
              <WhatsAppGlyph className="h-3.5 w-3.5" />
              Chat to Order
            </a>
            <button aria-label="Search"><Search className="h-5 w-5" strokeWidth={1.4} /></button>
            <button aria-label="Account" className="hidden sm:block">
              <User className="h-5 w-5" strokeWidth={1.4} />
            </button>
            <button aria-label="Cart" onClick={onCartOpen} className="relative">
              <ShoppingBag className="h-5 w-5" strokeWidth={1.4} />
              <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center bg-gold text-[0.6rem] font-medium text-accent-foreground">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        <div
          className={`hidden overflow-hidden border-t border-border bg-background transition-[max-height,opacity] duration-500 lg:block ${
            open ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mx-auto grid max-w-[1400px] grid-cols-4 gap-10 px-10 py-9">
            {nav.map((item) => (
              <div key={item.label} className={open === item.label ? "" : "hidden"}>
                <p className="eyebrow text-muted-foreground">{item.label}</p>
                <ul className="mt-5 space-y-3">
                  {item.items.map((sub) => (
                    <li key={sub}>
                      <a href="#grid" className="font-display text-xl transition-colors hover:text-gold">
                        {sub}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="col-span-3 flex items-end justify-end">
              <p className="max-w-sm text-right text-sm leading-relaxed text-muted-foreground">
                Four categories. Nothing more. Every piece photographed in daylight,
                measured in inches, dispatched from Lahore within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>

      {mobile && (
        <div className="fixed inset-0 z-50 bg-background lg:hidden">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <span className="font-display text-xl tracking-[0.3em]">MEHR</span>
            <button aria-label="Close menu" onClick={() => setMobile(false)}>
              <X className="h-5 w-5" strokeWidth={1.4} />
            </button>
          </div>
          <nav className="px-5 py-8">
            {nav.map((item) => (
              <div key={item.label} className="border-b border-border py-5">
                <p className="font-display text-3xl">{item.label}</p>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                  {item.items.map((sub) => (
                    <a key={sub} href="#grid" onClick={() => setMobile(false)} className="text-sm text-muted-foreground">
                      {sub}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03s.87 2.35.99 2.51c.12.16 1.71 2.62 4.15 3.67.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}
