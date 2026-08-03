import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { collections, productsIn } from "./data";

const FEATURED_HANDLES = ["lawn", "unstitched", "stitched", "formal"];

export function CategoryTiles() {
  const featured = collections.filter((c) => FEATURED_HANDLES.includes(c.handle));

  return (
    <section id="collections" className="mx-auto max-w-[1400px] px-6 py-28 lg:px-12 lg:py-36">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div data-reveal className="reveal-up">
          <p className="eyebrow text-[0.65rem] tracking-[0.3em] uppercase text-foreground/60">
            Shop by Category
          </p>
          <h2 className="type-display mt-3 text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            The Curated Edit
          </h2>
        </div>
        <Link 
          to="/collections" 
          className="group flex items-center gap-3 text-xs font-medium tracking-[0.2em] uppercase text-foreground transition-opacity hover:opacity-70"
        >
          <span className="border-b border-foreground/30 pb-1 transition-colors group-hover:border-foreground">
            Explore All Collections
          </span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:mt-16 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-16">
        {featured.map((c, i) => {
          const count = productsIn(c).length;
          return (
            <Link
              key={c.handle}
              to="/collections/$handle"
              params={{ handle: c.handle }}
              data-reveal
              style={{ transitionDelay: `${i * 100}ms` }}
              className="reveal-up group flex flex-col"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-sand/30">
                <img
                  src={c.image}
                  alt={c.title}
                  width={600}
                  height={800}
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="mt-4 sm:mt-6 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl lg:text-3xl tracking-wide text-foreground group-hover:text-gold transition-colors duration-300">
                    {c.title}
                  </h3>
                  <p className="mt-1 text-[0.7rem] sm:text-xs lg:text-sm tracking-wider text-muted-foreground line-clamp-2">
                    {c.blurb}
                  </p>
                </div>
                <span className="num mt-1 text-[0.65rem] sm:text-xs tracking-[0.15em] uppercase text-muted-foreground/80 shrink-0">
                  {String(count).padStart(2, "0")}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
