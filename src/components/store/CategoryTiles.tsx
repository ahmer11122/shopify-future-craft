import { Link } from "@tanstack/react-router";
import { collections, productsIn } from "./data";

const FEATURED_HANDLES = ["lawn", "unstitched", "stitched", "formal"];

export function CategoryTiles() {
  const featured = collections.filter((c) => FEATURED_HANDLES.includes(c.handle));

  return (
    <section id="collections" className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div data-reveal className="reveal-up">
          <p className="eyebrow text-muted-foreground">Shop by Category</p>
          <div className="rule-gold my-4" />
          <h2 className="type-h2">The Curated Edit</h2>
        </div>
        <Link to="/collections" className="link-line text-[0.7rem] tracking-[0.2em] uppercase">
          Explore All Collections
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-14 lg:grid-cols-4 lg:gap-6">
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

              <div className="mt-4 sm:mt-5 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg sm:text-xl lg:text-2xl tracking-wide text-foreground group-hover:text-gold transition-colors duration-300">
                    {c.title}
                  </h3>
                  <p className="mt-1 text-[0.7rem] sm:text-xs tracking-wider text-muted-foreground line-clamp-2">
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
