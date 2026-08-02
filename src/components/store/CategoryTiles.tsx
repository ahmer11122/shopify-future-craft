import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { collections, productsIn } from "./data";

const spans = [
  "lg:col-span-3 lg:row-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-6 lg:min-h-[18rem]",
];

export function CategoryTiles() {
  return (
    <section id="collections" className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div data-reveal className="reveal-up">
          <p className="eyebrow text-muted-foreground">Shop by Category</p>
          <div className="rule-gold my-4" />
          <h2 className="type-h2">Every room of the store</h2>
        </div>
        <Link to="/collections" className="link-line text-[0.7rem] tracking-[0.2em] uppercase">
          All Collections
        </Link>
      </div>

      <div className="mt-12 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-14 lg:grid-cols-6">
        {collections.map((c, i) => (
          <Link
            key={c.handle}
            to="/collections/$handle"
            params={{ handle: c.handle }}
            data-reveal
            style={{ transitionDelay: `${i * 70}ms` }}
            className={`reveal-up group relative min-h-[15rem] overflow-hidden bg-sand ${spans[i] ?? "lg:col-span-2"}`}
          >
            <img
              src={c.image}
              alt={c.title}
              width={900}
              height={1100}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
              <div>
                <p className="num text-[0.6rem] tracking-[0.2em] uppercase text-background/70">
                  {String(productsIn(c).length).padStart(2, "0")} pieces
                </p>
                <p className="mt-1.5 font-display text-2xl text-background lg:text-3xl">{c.title}</p>
              </div>
              <ArrowUpRight
                className="h-5 w-5 shrink-0 text-background transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                strokeWidth={1.3}
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
