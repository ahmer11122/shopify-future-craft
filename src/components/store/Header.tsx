import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { formatPKR, products } from "./data";
import cat1 from "@/assets/cat1.jpg";
import cat2 from "@/assets/cat2.jpg";

type NavItem = {
  label: string;
  columns: { title: string; items: string[] }[];
  feature: { src: string; eyebrow: string; title: string };
};

const nav: NavItem[] = [
  {
    label: "New Arrivals",
    columns: [
      { title: "Just Dropped", items: ["Lawn Edit 2026", "Eid Preview", "Back In Stock", "Last 48 Hours"] },
      { title: "By Fabric", items: ["Cambric", "Chikankari", "Slub Khaddar", "Organza"] },
    ],
    feature: { src: cat1, eyebrow: "Spring / Summer 26", title: "The Unstitched Edit" },
  },
  {
    label: "Bestsellers",
    columns: [
      { title: "Loved Most", items: ["Top 20 This Week", "Most Reviewed", "Restocked", "Under Rs. 6,000"] },
      { title: "Occasion", items: ["Everyday", "Office", "Mehndi", "Nikkah"] },
    ],
    feature: { src: cat2, eyebrow: "Formal", title: "Gulnar, restocked" },
  },
  {
    label: "Shop by Type",
    columns: [
      { title: "Categories", items: ["Lawn", "Stitched", "Unstitched", "Formal"] },
      { title: "Pieces", items: ["Kurta", "Three Piece", "Dupatta", "Trousers"] },
    ],
    feature: { src: cat1, eyebrow: "Guide", title: "Sizing in inches" },
  },
  {
    label: "Sale",
    columns: [
      { title: "Markdowns", items: ["Upto 50% Off", "Last Pieces", "Sale Formals", "Sale Lawn"] },
      { title: "Price", items: ["Under Rs. 4,000", "Rs. 4–8,000", "Rs. 8,000+"] },
    ],
    feature: { src: cat2, eyebrow: "Final Reductions", title: "Upto 50% off formals" },
  },
];

const suggestions = ["Lawn 3 piece", "Eid formals", "Chikankari", "Under Rs. 6000", "Dupatta"];

function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 220);
      return () => clearTimeout(t);
    }
    setQ("");
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return products.slice(0, 4);
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.fabric.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term),
      )
      .slice(0, 4);
  }, [q]);

  return (
    <div
      className={`fixed inset-0 z-[60] transition-opacity duration-500 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <button
        aria-label="Close search"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/35 backdrop-blur-[3px]"
      />
      <div
        className={`relative border-b border-border bg-background/95 backdrop-blur-xl transition-transform duration-500 ease-out ${
          open ? "translate-y-0" : "-translate-y-6"
        }`}
      >
        <div className="mx-auto max-w-[1100px] px-5 py-10 lg:px-10 lg:py-14">
          <div className="flex items-center gap-4 border-b border-border pb-4 focus-within:border-gold">
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" strokeWidth={1.3} />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search lawn, formals, dupattas…"
              className="w-full bg-transparent font-display text-2xl outline-none placeholder:text-muted-foreground lg:text-3xl"
            />
            <button aria-label="Close search" onClick={onClose} className="shrink-0 text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" strokeWidth={1.4} />
            </button>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="eyebrow mr-2 text-muted-foreground">Popular</span>
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setQ(s)}
                className="border border-border px-3.5 py-1.5 text-[0.65rem] tracking-[0.12em] uppercase transition-colors hover:border-gold hover:text-gold"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="mt-10">
            <p className="eyebrow text-muted-foreground">
              {q.trim() ? `${results.length} results` : "Trending pieces"}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
              {results.map((p) => (
                <a key={p.id} href="#grid" onClick={onClose} className="group">
                  <div className="aspect-[4/5] overflow-hidden bg-sand">
                    <img
                      src={p.front}
                      alt={p.name}
                      width={600}
                      height={750}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-3 font-display text-lg">{p.name}</p>
                  <p className="text-[0.7rem] text-muted-foreground">{formatPKR(p.price)}</p>
                </a>
              ))}
              {results.length === 0 && (
                <p className="col-span-full py-8 text-sm text-muted-foreground">
                  No match. Try “lawn”, “formal” or “embroidered”.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Header({ onCartOpen, cartCount }: { onCartOpen: () => void; cartCount: number }) {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const active = nav.find((n) => n.label === open);

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
                <span key={t} className="eyebrow whitespace-nowrap text-background/85">
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div
        className={`border-b transition-all duration-500 ${
          solid
            ? "border-border/70 bg-background/65 shadow-[0_1px_30px_-18px_rgba(0,0,0,0.5)] backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-background/40 backdrop-blur-md"
        }`}
        onMouseLeave={() => setOpen(null)}
      >
        <div className="mx-auto grid max-w-[1400px] grid-cols-[auto_1fr_auto] items-center gap-6 px-5 py-4 lg:px-10">
          <button className="lg:hidden" aria-label="Open menu" onClick={() => setMobile(true)}>
            <Menu className="h-5 w-5" strokeWidth={1.4} />
          </button>

          <nav className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => (
              <button
                key={item.label}
                onMouseEnter={() => setOpen(item.label)}
                onFocus={() => setOpen(item.label)}
                className={`link-line eyebrow py-2 transition-colors ${
                  open === item.label ? "text-gold is-on" : "hover:text-gold"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <a
            href="#top"
            className="justify-self-center font-display text-2xl tracking-[0.34em] lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:text-[1.75rem]"
          >
            MEHR
          </a>

          <div className="flex items-center justify-end gap-4 lg:gap-5">
            <button
              onClick={() => setSearch(true)}
              className="hidden items-center gap-3 border border-border/80 bg-background/50 px-4 py-2 text-[0.68rem] tracking-[0.1em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground md:flex"
            >
              <Search className="h-3.5 w-3.5" strokeWidth={1.5} />
              Search
              <kbd className="border border-border px-1.5 py-0.5 text-[0.55rem] tracking-normal">⌘K</kbd>
            </button>
            <button aria-label="Search" onClick={() => setSearch(true)} className="md:hidden">
              <Search className="h-5 w-5" strokeWidth={1.4} />
            </button>
            <button aria-label="Account" className="hidden sm:block transition-colors hover:text-gold">
              <User className="h-5 w-5" strokeWidth={1.4} />
            </button>
            <button aria-label="Cart" onClick={onCartOpen} className="relative transition-colors hover:text-gold">
              <ShoppingBag className="h-5 w-5" strokeWidth={1.4} />
              <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center bg-gold text-[0.58rem] font-medium tabular-nums text-accent-foreground">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        <div
          className={`hidden overflow-hidden border-t bg-background/90 backdrop-blur-xl transition-[max-height,opacity] duration-500 ease-out lg:block ${
            active ? "max-h-[26rem] border-border opacity-100" : "max-h-0 border-transparent opacity-0"
          }`}
        >
          <div className="mx-auto grid max-w-[1400px] grid-cols-[repeat(2,minmax(0,0.8fr))_1.4fr] gap-12 px-10 py-10">
            {active?.columns.map((col) => (
              <div key={col.title}>
                <p className="eyebrow text-muted-foreground">{col.title}</p>
                <ul className="mt-5 space-y-2.5">
                  {col.items.map((sub) => (
                    <li key={sub}>
                      <a href="#grid" className="link-line font-display text-xl transition-colors hover:text-gold">
                        {sub}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {active && (
              <a href="#grid" className="group relative overflow-hidden bg-sand">
                <img
                  src={active.feature.src}
                  alt={active.feature.title}
                  width={900}
                  height={600}
                  loading="lazy"
                  className="h-full max-h-64 w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <div>
                    <p className="text-[0.6rem] tracking-[0.2em] uppercase text-background/70">
                      {active.feature.eyebrow}
                    </p>
                    <p className="mt-1.5 font-display text-2xl text-background">{active.feature.title}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-background transition-transform duration-400 group-hover:translate-x-1" strokeWidth={1.3} />
                </div>
              </a>
            )}
          </div>
        </div>
      </div>

      {mobile && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-background lg:hidden">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <span className="font-display text-xl tracking-[0.3em]">MEHR</span>
            <button aria-label="Close menu" onClick={() => setMobile(false)}>
              <X className="h-5 w-5" strokeWidth={1.4} />
            </button>
          </div>
          <nav className="px-5 py-6">
            {nav.map((item) => (
              <div key={item.label} className="border-b border-border py-5">
                <p className="font-display text-3xl">{item.label}</p>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                  {item.columns.flatMap((c) => c.items).map((sub) => (
                    <a key={sub} href="#grid" onClick={() => setMobile(false)} className="text-sm text-muted-foreground">
                      {sub}
                    </a>
                  ))}
                </div>
              </div>
            ))}
            <a
              href="https://wa.me/920000000000"
              className="mt-8 flex items-center justify-center gap-2.5 bg-whatsapp py-4 text-[0.65rem] tracking-[0.2em] uppercase text-background"
            >
              <WhatsAppGlyph className="h-4 w-4" /> Chat to Order
            </a>
          </nav>
        </div>
      )}

      <SearchOverlay open={search} onClose={() => setSearch(false)} />
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
