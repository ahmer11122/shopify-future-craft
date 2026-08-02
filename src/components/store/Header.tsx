import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, List as Menu, MagnifyingGlass as Search, Tote as ShoppingBag, User, X } from "@phosphor-icons/react";
import { collections, formatPKR, products } from "./data";
import { useCart } from "./cart";
import cat1 from "@/assets/cat1.jpg";
import cat2 from "@/assets/cat2.jpg";
import cat3 from "@/assets/cat3.jpg";

type NavItem = {
  label: string;
  handle: string;
  columns: { title: string; items: { label: string; handle: string }[] }[];
  feature: { src: string; eyebrow: string; title: string; handle: string };
};

const nav: NavItem[] = [
  {
    label: "New Arrivals",
    handle: "new-arrivals",
    columns: [
      {
        title: "Just Dropped",
        items: [
          { label: "Lawn Edit 2026", handle: "lawn" },
          { label: "Unstitched", handle: "unstitched" },
          { label: "Stitched", handle: "stitched" },
        ],
      },
      {
        title: "By Fabric",
        items: [
          { label: "Cambric", handle: "lawn" },
          { label: "Chikankari", handle: "lawn" },
          { label: "Organza", handle: "formal" },
        ],
      },
    ],
    feature: { src: cat1, eyebrow: "Spring / Summer 26", title: "The Unstitched Edit", handle: "unstitched" },
  },
  {
    label: "Unstitched",
    handle: "unstitched",
    columns: [
      {
        title: "Shop",
        items: [
          { label: "Three Piece", handle: "unstitched" },
          { label: "Embroidered", handle: "unstitched" },
          { label: "Printed Lawn", handle: "lawn" },
        ],
      },
      {
        title: "Price",
        items: [
          { label: "Under Rs. 8,000", handle: "unstitched" },
          { label: "Rs. 8—15,000", handle: "unstitched" },
          { label: "Sale", handle: "sale" },
        ],
      },
    ],
    feature: { src: cat3, eyebrow: "48 pieces", title: "Cut it your way", handle: "unstitched" },
  },
  {
    label: "Stitched",
    handle: "stitched",
    columns: [
      {
        title: "Ready to Wear",
        items: [
          { label: "Everyday Lawn", handle: "lawn" },
          { label: "Office", handle: "stitched" },
          { label: "Kurta Only", handle: "stitched" },
        ],
      },
      {
        title: "Sizing",
        items: [
          { label: "Size Guide", handle: "stitched" },
          { label: "True to Size", handle: "stitched" },
          { label: "Plus Sizes", handle: "stitched" },
        ],
      },
    ],
    feature: { src: cat3, eyebrow: "Measured in inches", title: "Ready to wear", handle: "stitched" },
  },
  {
    label: "Formals",
    handle: "formal",
    columns: [
      {
        title: "Occasion",
        items: [
          { label: "Mehndi", handle: "formal" },
          { label: "Nikkah", handle: "formal" },
          { label: "Dinner", handle: "formal" },
        ],
      },
      {
        title: "Craft",
        items: [
          { label: "Zari", handle: "formal" },
          { label: "Hand Embroidery", handle: "formal" },
          { label: "Chiffon", handle: "formal" },
        ],
      },
    ],
    feature: { src: cat2, eyebrow: "Shaadi Season", title: "Gulnar, restocked", handle: "formal" },
  },
  {
    label: "Sale",
    handle: "sale",
    columns: [
      {
        title: "Markdowns",
        items: [
          { label: "Upto 50% Off", handle: "sale" },
          { label: "Last Pieces", handle: "sale" },
          { label: "Sale Formals", handle: "sale" },
        ],
      },
      {
        title: "Price",
        items: [
          { label: "Under Rs. 4,000", handle: "sale" },
          { label: "Rs. 4—8,000", handle: "sale" },
          { label: "Rs. 8,000+", handle: "sale" },
        ],
      },
    ],
    feature: { src: cat2, eyebrow: "Final Reductions", title: "Upto 50% off formals", handle: "sale" },
  },
];

const suggestions = ["Lawn", "Formal", "Chikankari", "Gulnar", "Dupatta"];

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
      className={`fixed inset-0 z-[80] transition-opacity duration-500 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <button aria-label="Close search" onClick={onClose} className="absolute inset-0 bg-foreground/35 backdrop-blur-[3px]" />
      <div
        className={`relative border-b border-border bg-background/95 backdrop-blur-xl transition-transform duration-500 ease-out ${
          open ? "translate-y-0" : "-translate-y-6"
        }`}
      >
        <div className="mx-auto max-w-[1100px] px-5 py-10 lg:px-10 lg:py-14">
          <div className="flex items-center gap-4 border-b border-border pb-4 focus-within:border-gold">
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" weight="light" />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search lawn, formals, dupattas…"
              className="w-full bg-transparent font-display text-2xl outline-none placeholder:text-muted-foreground lg:text-3xl"
            />
            <button aria-label="Close search" onClick={onClose} className="shrink-0 text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" weight="light" />
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
            <p className="num eyebrow text-muted-foreground">
              {q.trim() ? `${String(results.length).padStart(2, "0")} results` : "Trending pieces"}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
              {results.map((p) => (
                <Link
                  key={p.id}
                  to="/products/$productId"
                  params={{ productId: p.id }}
                  onClick={onClose}
                  className="group"
                >
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
                  <p className="num text-[0.72rem] text-muted-foreground">{formatPKR(p.price)}</p>
                </Link>
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

export function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState(false);
  const [solid, setSolid] = useState(false);
  const { count, setOpen: setCartOpen } = useCart();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobile(false);
    setOpen(null);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearch(true);
      }
      if (e.key === "Escape") {
        setOpen(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const active = nav.find((n) => n.label === open);
  const light = overHero && !solid && !active;

  return (
    <header className="fixed inset-x-0 top-0 z-[70]">
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
          light
            ? "border-transparent bg-transparent text-background"
            : "border-border/70 bg-background/95 text-foreground shadow-[0_1px_30px_-18px_rgba(0,0,0,0.5)] backdrop-blur-xl backdrop-saturate-150"
        }`}
        onMouseLeave={() => setOpen(null)}
      >
        <div className="mx-auto grid max-w-[1400px] grid-cols-[auto_1fr_auto] items-center gap-6 px-5 py-4 lg:px-10">
          <button className="lg:hidden" aria-label="Open menu" onClick={() => setMobile(true)}>
            <Menu className="h-5 w-5" weight="light" />
          </button>

          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.label}
                to="/collections/$handle"
                params={{ handle: item.handle }}
                onMouseEnter={() => setOpen(item.label)}
                onFocus={() => setOpen(item.label)}
                aria-expanded={open === item.label}
                className={`link-line eyebrow py-2 transition-opacity ${
                  open === item.label ? "is-on" : "hover:opacity-60"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            to="/"
            className="justify-self-center font-display text-2xl tracking-[0.34em] lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:text-[1.75rem]"
          >
            MEHR
          </Link>

          <div className="flex items-center justify-end gap-4 lg:gap-5">
            <button
              onClick={() => setSearch(true)}
              className={`group hidden w-44 items-center gap-3 border px-4 py-2.5 text-[0.66rem] tracking-[0.1em] transition-all duration-500 ease-out hover:w-56 md:flex ${
                light
                  ? "border-background/35 text-background/80 hover:border-background"
                  : "border-border/80 bg-sand/40 text-muted-foreground hover:border-foreground hover:bg-background hover:text-foreground"
              }`}
            >
              <Search className="h-3.5 w-3.5 shrink-0 transition-transform duration-500 group-hover:scale-110" weight="light" />
              <span className="truncate">Search the store</span>
              <kbd className="num ml-auto shrink-0 border border-current/25 px-1.5 py-0.5 text-[0.55rem] tracking-normal opacity-60">
                ⌘K
              </kbd>
            </button>
            <button aria-label="Search" onClick={() => setSearch(true)} className="md:hidden">
              <Search className="h-5 w-5" weight="light" />
            </button>
            <Link to="/track" aria-label="Track order" className="hidden transition-opacity hover:opacity-60 sm:block">
              <User className="h-5 w-5" weight="light" />
            </Link>
            <button aria-label="Cart" onClick={() => setCartOpen(true)} className="relative transition-opacity hover:opacity-60">
              <ShoppingBag className="h-5 w-5" weight="light" />
              {count > 0 && (
                <span className="num absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center bg-gold text-[0.65rem] font-medium text-accent-foreground">
                  {count}
                </span>
              )}
            </button>

          </div>
        </div>

        <div
          className={`hidden overflow-hidden border-t bg-background/95 text-foreground backdrop-blur-xl transition-[max-height,opacity] duration-500 ease-out lg:block ${
            active ? "max-h-[26rem] border-border opacity-100" : "max-h-0 border-transparent opacity-0"
          }`}
        >
          <div className="mx-auto grid max-w-[1400px] grid-cols-[repeat(2,minmax(0,0.8fr))_1.4fr] gap-12 px-10 py-10">
            {active?.columns.map((col) => (
              <div key={col.title}>
                <p className="eyebrow text-muted-foreground">{col.title}</p>
                <ul className="mt-5 space-y-2.5">
                  {col.items.map((sub) => (
                    <li key={sub.label}>
                      <Link
                        to="/collections/$handle"
                        params={{ handle: sub.handle }}
                        className="link-line font-display text-xl transition-opacity hover:opacity-60"
                      >
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {active && (
              <Link
                to="/collections/$handle"
                params={{ handle: active.feature.handle }}
                className="group relative overflow-hidden bg-sand"
              >
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
                    <p className="text-[0.6rem] tracking-[0.2em] uppercase text-background/70">{active.feature.eyebrow}</p>
                    <p className="mt-1.5 font-display text-2xl text-background">{active.feature.title}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-background transition-transform duration-300 group-hover:translate-x-1" weight="light" />
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      {mobile && (
        <div className="fixed inset-0 z-[80] overflow-y-auto bg-background text-foreground lg:hidden">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <span className="font-display text-xl tracking-[0.3em]">MEHR</span>
            <button aria-label="Close menu" onClick={() => setMobile(false)}>
              <X className="h-5 w-5" weight="light" />
            </button>
          </div>
          <nav className="px-5 py-4">
            {collections.map((c) => (
              <Link
                key={c.handle}
                to="/collections/$handle"
                params={{ handle: c.handle }}
                className="flex items-baseline justify-between border-b border-border py-5"
              >
                <span className="font-display text-3xl">{c.title}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" weight="light" />
              </Link>
            ))}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { to: "/track", label: "Track Order" },
                { to: "/faq", label: "Help & FAQ" },
                { to: "/about", label: "Our Atelier" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <Link key={l.to} to={l.to} className="border border-border px-4 py-3 text-[0.65rem] tracking-[0.16em] uppercase">
                  {l.label}
                </Link>
              ))}
            </div>
            <a
              href="https://wa.me/920000000000"
              className="mt-6 mb-10 flex items-center justify-center gap-2.5 bg-whatsapp py-4 text-[0.65rem] tracking-[0.2em] uppercase text-background"
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
