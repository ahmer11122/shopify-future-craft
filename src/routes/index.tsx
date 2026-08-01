import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/store/Hero";
import { TrustBand } from "@/components/store/TrustBand";
import { CategoryTiles } from "@/components/store/CategoryTiles";
import { ImageRail, TestimonialRail, Community } from "@/components/store/Marquee";
import { Editorial } from "@/components/store/Editorial";
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
      <TrustBand />
      <CategoryTiles />

      <section className="mx-auto max-w-[1400px] px-5 pb-24 lg:px-10 lg:pb-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div data-reveal className="reveal-up">
            <p className="eyebrow text-muted-foreground">Just Dropped</p>
            <div className="rule-gold my-4" />
            <h2 className="type-h2">New Arrivals</h2>
          </div>
          <Link
            to="/collections/$handle"
            params={{ handle: "new-arrivals" }}
            className="link-line text-[0.7rem] tracking-[0.2em] uppercase"
          >
            Shop all new in
          </Link>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-14 lg:grid-cols-4 lg:gap-x-7">
          {products.slice(0, 4).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      <ImageRail />
      <Editorial />

      <section className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div data-reveal className="reveal-up">
            <p className="eyebrow text-muted-foreground">Most Loved</p>
            <div className="rule-gold my-4" />
            <h2 className="type-h2">Bestsellers</h2>
          </div>
          <Link to="/collections" className="link-line text-[0.7rem] tracking-[0.2em] uppercase">
            Browse everything
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
