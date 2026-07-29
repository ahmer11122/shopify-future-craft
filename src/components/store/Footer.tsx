import { WhatsAppGlyph } from "./Header";

const columns = [
  { title: "Shop", links: ["New Arrivals", "Bestsellers", "Lawn", "Formal", "Sale"] },
  { title: "Help", links: ["Size Guide", "Shipping & COD", "Exchange Policy", "Track Order"] },
  { title: "Brand", links: ["Our Atelier", "Stores in Lahore", "Careers"] },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <p className="font-display text-3xl tracking-[0.3em]">MEHR</p>
            <p className="mt-6 max-w-xs text-[0.82rem] leading-relaxed text-background/60">
              Pakistani womenswear, made in Lahore. Cash on delivery nationwide,
              dispatch within 24 hours.
            </p>
            <a
              href="https://wa.me/920000000000"
              className="mt-7 inline-flex items-center gap-2.5 border border-background/25 px-4 py-2.5 text-[0.65rem] tracking-[0.18em] uppercase transition-colors hover:border-gold hover:text-gold"
            >
              <WhatsAppGlyph className="h-3.5 w-3.5" />
              +92 000 0000000
            </a>
          </div>
          {columns.map((c) => (
            <div key={c.title}>
              <p className="eyebrow text-background/50">{c.title}</p>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#grid" className="text-[0.85rem] text-background/80 transition-colors hover:text-gold">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-5 border-t border-background/15 pt-8">
          <p className="text-[0.7rem] tracking-wide text-background/50">
            © 2026 Mehr. Theme concept — not affiliated with any live store.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {["Cash on Delivery", "Easypaisa", "JazzCash", "Visa", "Mastercard"].map((p) => (
              <span key={p} className="border border-background/20 px-3 py-1.5 text-[0.6rem] tracking-[0.14em] uppercase text-background/70">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
