import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { collections, productsIn } from "@/components/store/data";
import { useReveal } from "@/hooks/useReveal";

const title = "All Collections — Mehr";
const description =
  "Browse every Mehr collection: new arrivals, unstitched, stitched, lawn, formals and sale.";

export const Route = createFileRoute("/collections/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CollectionsIndex,
});

function CollectionsIndex() {
  useReveal();

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-28 pt-40 lg:px-10 lg:pt-48">
      <p className="eyebrow text-muted-foreground">Shop</p>
      <div className="rule-gold my-5" />
      <h1 className="type-display max-w-2xl">All Collections</h1>
      <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
        Six edits, nothing more. Every piece is photographed in daylight and measured in inches.
      </p>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((c, i) => (
          <Link
            key={c.handle}
            to="/collections/$handle"
            params={{ handle: c.handle }}
            data-reveal
            style={{ transitionDelay: `${i * 60}ms` }}
            className="reveal-up group"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-sand">
              <img
                src={c.image}
                alt={c.title}
                width={900}
                height={1100}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
              />
              <span className="num absolute left-4 top-4 bg-background/85 px-3 py-1.5 text-[0.58rem] tracking-[0.18em] uppercase backdrop-blur-sm">
                {String(productsIn(c).length).padStart(2, "0")} pieces
              </span>
            </div>
            <div className="flex items-start justify-between gap-4 pt-5">
              <div>
                <h2 className="font-display text-2xl">{c.title}</h2>
                <p className="mt-2 max-w-xs text-[0.8rem] leading-relaxed text-muted-foreground">{c.blurb}</p>
              </div>
              <ArrowUpRight
                className="mt-1.5 h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                strokeWidth={1.3}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
