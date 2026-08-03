import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/store/Hero";
import { CategoryTiles } from "@/components/store/CategoryTiles";
import { ImageRail, TestimonialRail, Community } from "@/components/store/Marquee";
import { Brands } from "@/components/store/Brands";
import { EmailBar } from "@/components/store/Floating";
import { ProductCard } from "@/components/store/ProductCard";
import { products } from "@/components/store/data";
import { useReveal } from "@/hooks/useReveal";

const title = "Mehr — Quiet Luxury Pakistani Womenswear";
const description =
  "Lawn, chikankari and hand-embroidered formals from Lahore. Inch-based sizing, cash on delivery nationwide, dispatch within 24 hours.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

function Index() {
  useReveal();

  return (
    <>
      <Hero />
      <CategoryTiles />

      <section className="mx-auto max-w-[1400px] px-6 pb-28 lg:px-12 lg:pb-36">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div data-reveal className="reveal-up">
            <p className="eyebrow text-[0.65rem] tracking-[0.3em] uppercase text-foreground/60">
              Just Dropped
            </p>
            <h2 className="type-display mt-3 text-4xl sm:text-5xl lg:text-6xl tracking-tight">
              New Arrivals
            </h2>
          </div>
          <Link
            to="/collections/$handle"
            params={{ handle: "new-arrivals" }}
            className="group flex items-center gap-3 text-xs font-medium tracking-[0.2em] uppercase text-foreground transition-opacity hover:opacity-70"
          >
            <span className="border-b border-foreground/30 pb-1 transition-colors group-hover:border-foreground">
              Shop all new in
            </span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-14 lg:grid-cols-4 lg:gap-x-7">
          {products.slice(0, 4).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      <ImageRail />
      <Brands />

      <section className="mx-auto max-w-[1400px] px-6 py-28 lg:px-12 lg:py-36">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div data-reveal className="reveal-up">
            <p className="eyebrow text-[0.65rem] tracking-[0.3em] uppercase text-foreground/60">
              Most Loved
            </p>
            <h2 className="type-display mt-3 text-4xl sm:text-5xl lg:text-6xl tracking-tight">
              Bestsellers
            </h2>
          </div>
          <Link
            to="/collections"
            className="group flex items-center gap-3 text-xs font-medium tracking-[0.2em] uppercase text-foreground transition-opacity hover:opacity-70"
          >
            <span className="border-b border-foreground/30 pb-1 transition-colors group-hover:border-foreground">
              Browse everything
            </span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-14 lg:grid-cols-4 lg:gap-x-7">
          {[...products].sort((a, b) => b.reviews - a.reviews).slice(0, 4).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      <TestimonialRail />
      <Community />
      <EmailBar />
    </>
  );
}
