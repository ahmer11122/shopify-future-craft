import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { brands } from "./data";

/**
 * Renders custom SVG luxury logos for the 8 Pakistani fashion houses.
 */
function BrandLogo({ name }: { name: string }) {
  switch (name) {
    case "Zara Shahjahan":
      return (
        <svg viewBox="0 0 240 48" className="h-8 w-auto sm:h-9" fill="currentColor">
          <text
            x="120"
            y="28"
            textAnchor="middle"
            fontFamily="serif"
            fontSize="21"
            fontWeight="500"
            letterSpacing="3.5"
          >
            ZARA SHAHJAHAN
          </text>
          <text
            x="120"
            y="42"
            textAnchor="middle"
            fontFamily="sans-serif"
            fontSize="7"
            letterSpacing="6"
            className="opacity-60"
          >
            LAHORE
          </text>
        </svg>
      );
    case "Sana Safinaz":
      return (
        <svg viewBox="0 0 240 54" className="h-9 w-auto sm:h-10" fill="currentColor">
          {/* Interlocking SS monogram */}
          <path
            d="M120 4c-5 0-9 3-9 7s4 6 9 8c4 2 7 4 7 7s-3 6-7 6c-5 0-8-3-8-7h-3c0 6 5 9 11 9s10-3 10-8-4-6-9-8c-4-2-7-4-7-7s3-5 7-5c4 0 7 3 7 6h3c0-5-4-8-11-8z"
            className="opacity-75"
          />
          <text
            x="120"
            y="48"
            textAnchor="middle"
            fontFamily="serif"
            fontSize="18"
            fontWeight="600"
            letterSpacing="5"
          >
            SANA SAFINAZ
          </text>
        </svg>
      );
    case "Elan":
      return (
        <svg viewBox="0 0 200 46" className="h-8 w-auto sm:h-9" fill="currentColor">
          <text
            x="100"
            y="32"
            textAnchor="middle"
            fontFamily="serif"
            fontSize="26"
            fontWeight="400"
            letterSpacing="10"
          >
            É L A N
          </text>
        </svg>
      );
    case "Khaadi":
      return (
        <svg viewBox="0 0 220 52" className="h-9 w-auto sm:h-10" fill="currentColor">
          {/* Woven craft emblem icon */}
          <circle cx="110" cy="13" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M106 13h8M110 9v8" stroke="currentColor" strokeWidth="1.2" />
          <text
            x="110"
            y="44"
            textAnchor="middle"
            fontFamily="sans-serif"
            fontSize="22"
            fontWeight="700"
            letterSpacing="6"
          >
            KHAADI
          </text>
        </svg>
      );
    case "Maria B.":
      return (
        <svg viewBox="0 0 220 50" className="h-9 w-auto sm:h-10" fill="currentColor">
          <text
            x="110"
            y="30"
            textAnchor="middle"
            fontFamily="serif"
            fontSize="24"
            fontWeight="600"
            letterSpacing="7"
          >
            MARIA . B
          </text>
          <text
            x="110"
            y="44"
            textAnchor="middle"
            fontFamily="sans-serif"
            fontSize="7.5"
            letterSpacing="5"
            className="opacity-60"
          >
            COUTURE
          </text>
        </svg>
      );
    case "Nishat Linen":
      return (
        <svg viewBox="0 0 220 50" className="h-8 w-auto sm:h-9" fill="currentColor">
          <text
            x="110"
            y="26"
            textAnchor="middle"
            fontFamily="sans-serif"
            fontSize="22"
            fontWeight="700"
            letterSpacing="8"
          >
            N I S H A T
          </text>
          <text
            x="110"
            y="42"
            textAnchor="middle"
            fontFamily="serif"
            fontSize="10"
            letterSpacing="10"
            className="opacity-70"
          >
            L I N E N
          </text>
        </svg>
      );
    case "Cross Stitch":
      return (
        <svg viewBox="0 0 240 50" className="h-9 w-auto sm:h-10" fill="currentColor">
          {/* X cross-stitch emblem */}
          <path d="M115 6l10 10M125 6l-10 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <text
            x="120"
            y="40"
            textAnchor="middle"
            fontFamily="serif"
            fontSize="19"
            fontWeight="500"
            letterSpacing="5"
          >
            CROSS STITCH
          </text>
        </svg>
      );
    case "Gul Ahmed":
      return (
        <svg viewBox="0 0 220 52" className="h-9 w-auto sm:h-10" fill="currentColor">
          <text
            x="110"
            y="28"
            textAnchor="middle"
            fontFamily="serif"
            fontSize="21"
            fontWeight="600"
            letterSpacing="5.5"
          >
            GUL AHMED
          </text>
          <text
            x="110"
            y="44"
            textAnchor="middle"
            fontFamily="sans-serif"
            fontSize="7.5"
            letterSpacing="6"
            className="opacity-60"
          >
            SINCE 1953
          </text>
        </svg>
      );
    default:
      return (
        <span className="font-display text-2xl tracking-widest uppercase">
          {name}
        </span>
      );
  }
}

/**
 * Award-winning architectural designer showcase.
 * Uses SVG logos for crisp luxury branding and interactive hover cards.
 */
export function Brands() {
  return (
    <section className="border-y border-border bg-sand/30 py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div data-reveal className="reveal-up flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-muted-foreground">The Multi-Brand Edit</p>
            <div className="rule-gold my-4" />
            <h2 className="type-h2">Labels we stock</h2>
          </div>
          <Link
            to="/collections"
            className="link-line text-[0.7rem] tracking-[0.2em] uppercase"
          >
            Explore All Designers
          </Link>
        </div>

        {/* Architectural 8-Brand Logo Grid */}
        <div className="mt-14 grid grid-cols-2 border-t border-l border-border/80 lg:grid-cols-4">
          {brands.map((b, i) => (
            <Link
              key={b.name}
              to="/collections"
              data-reveal
              style={{ transitionDelay: `${i * 60}ms` }}
              className="reveal-up group relative flex h-40 flex-col items-center justify-center border-b border-r border-border/80 bg-background/50 px-6 py-8 transition-all duration-500 hover:bg-background sm:h-48"
            >
              {/* Designer SVG Logo */}
              <div className="text-foreground/70 transition-all duration-500 group-hover:scale-105 group-hover:text-foreground">
                <BrandLogo name={b.name} />
              </div>

              {/* Micro-badge & arrow on hover */}
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between opacity-60 transition-opacity duration-300 group-hover:opacity-100">
                <span className="num text-[0.6rem] tracking-[0.18em] uppercase text-muted-foreground">
                  {b.note} · Est. {b.since}
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-foreground opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
