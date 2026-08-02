import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { products } from "./data";
import look1 from "@/assets/look1.jpg";
import look2 from "@/assets/look2.jpg";
import look3 from "@/assets/look3.jpg";
import look4 from "@/assets/look4.jpg";

const strip = [
  { id: "meher", src: look1, caption: "Meher", meta: "Chikankari Lawn" },
  { id: "gulnar", src: products[1].front, caption: "Gulnar", meta: "Formal Chiffon" },
  { id: "saher", src: look3, caption: "Saher", meta: "Printed Lawn" },
  { id: "rang", src: look2, caption: "Rang", meta: "Zari Formal" },
  { id: "noor", src: products[0].front, caption: "Noor", meta: "3 Piece Lawn" },
  { id: "shab", src: look4, caption: "Shab", meta: "Embroidered" },
];

/** Continuously drifting editorial image rail — every look opens its product page. */
export function ImageRail() {
  return (
    <section id="lookbook" className="overflow-hidden border-y border-border bg-sand/60 py-16 lg:py-20">
      <div className="mx-auto mb-10 flex max-w-[1400px] flex-wrap items-end justify-between gap-4 px-5 lg:px-10">
        <div data-reveal className="reveal-up">
          <p className="eyebrow text-muted-foreground">In Motion</p>
          <div className="rule-gold my-4" />
          <h2 className="type-h2">The Spring Lookbook</h2>
        </div>
        <p data-reveal className="reveal-up max-w-xs text-sm leading-relaxed text-muted-foreground">
          Shot over two mornings in Lahore. Hover to pause the reel, tap any look to shop it.
        </p>
      </div>

      <div className="marquee-mask group flex w-max gap-5 marquee-x">
        {[0, 1].map((pass) => (
          <div key={pass} className="flex shrink-0 gap-5 pr-5">
            {strip.map((item) => (
              <Link
                key={`${pass}-${item.caption}`}
                to="/products/$productId"
                params={{ productId: item.id }}
                className="group/card relative block w-[62vw] shrink-0 bg-background sm:w-[32vw] lg:w-[19vw]"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={item.src}
                    alt={`${item.caption} — ${item.meta}`}
                    width={800}
                    height={1000}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover/card:scale-[1.06]"
                  />
                  <span className="absolute inset-x-3 bottom-3 flex translate-y-2 items-center justify-between bg-background/92 px-4 py-3 text-[0.6rem] tracking-[0.18em] uppercase opacity-0 backdrop-blur-sm transition-all duration-500 group-hover/card:translate-y-0 group-hover/card:opacity-100">
                    Shop this look
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.4} />
                  </span>
                </div>
                <figcaption className="flex items-baseline justify-between gap-3 px-1 pt-4">
                  <span className="font-display text-lg">{item.caption}</span>
                  <span className="text-[0.62rem] tracking-[0.14em] uppercase text-muted-foreground">{item.meta}</span>
                </figcaption>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

const quotes = [
  { q: "The lawn is heavier than anything I've ordered online. Stitching is clean.", n: "Areeba, Karachi" },
  { q: "Size chart in inches actually matched. First time that's happened.", n: "Mahnoor, Islamabad" },
  { q: "COD, delivered in two days, and the dupatta is full width.", n: "Hira, Lahore" },
  { q: "Colours are exactly as photographed. No filter surprises.", n: "Sana, Multan" },
  { q: "Exchanged one size up over WhatsApp in ten minutes.", n: "Fatima, Faisalabad" },
];

export function TestimonialRail() {
  return (
    <section className="overflow-hidden border-y border-border bg-foreground py-14 text-background">
      <div className="marquee-mask flex w-max gap-4 marquee-x-slow">
        {[0, 1].map((pass) => (
          <div key={pass} className="flex shrink-0 gap-4 pr-4">
            {quotes.map((item) => (
              <blockquote
                key={`${pass}-${item.n}`}
                className="w-[80vw] shrink-0 border border-background/15 px-7 py-7 sm:w-[42vw] lg:w-[26vw]"
              >
                <div className="flex gap-1 text-gold" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-[0.7rem]">
                      ★
                    </span>
                  ))}
                </div>
                <p className="mt-4 font-display text-lg leading-snug">“{item.q}”</p>
                <footer className="mt-5 text-[0.62rem] tracking-[0.16em] uppercase text-background/55">
                  {item.n} · Verified
                </footer>
              </blockquote>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

const ugc = [
  { id: "saher", src: look3 },
  { id: "noor", src: products[0].back },
  { id: "meher", src: look1 },
  { id: "shab", src: products[3].front },
  { id: "rang", src: look4 },
  { id: "gulnar", src: products[1].back },
];

export function Community() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
      <div data-reveal className="reveal-up mx-auto max-w-xl text-center">
        <p className="eyebrow text-muted-foreground">@mehr.pk</p>
        <div className="rule-gold mx-auto my-5" />
        <h2 className="type-h2">Worn by you</h2>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          Every image below is a real customer order. Tag us and we will send you the shot for your own feed.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
        {ugc.map((item, i) => (
          <Link
            key={item.id + i}
            to="/products/$productId"
            params={{ productId: item.id }}
            data-reveal
            style={{ transitionDelay: `${i * 60}ms` }}
            className="reveal-up group relative aspect-square overflow-hidden bg-sand"
          >
            <img
              src={item.src}
              alt="Customer wearing a Mehr suit"
              width={600}
              height={600}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-foreground/45 text-[0.58rem] tracking-[0.2em] uppercase text-background opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              Shop the look
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
