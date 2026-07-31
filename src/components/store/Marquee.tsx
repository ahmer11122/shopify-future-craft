import { formatPKR, products } from "./data";
import look1 from "@/assets/look1.jpg";
import look2 from "@/assets/look2.jpg";
import look3 from "@/assets/look3.jpg";
import look4 from "@/assets/look4.jpg";
import editorial from "@/assets/editorial.jpg";

const strip = [
  { src: look1, caption: "Sage Noor", meta: "Lawn · 3 Piece" },
  { src: products[1].front, caption: "Gulnar", meta: "Formal Chiffon" },
  { src: look3, caption: "Ivory Sehr", meta: "Printed Lawn" },
  { src: look2, caption: "Zari Detail", meta: "Hand Embroidery" },
  { src: products[2].front, caption: "Saher", meta: "Stitched Lawn" },
  { src: look4, caption: "Shab", meta: "Embroidered" },
  { src: editorial, caption: "The Weave", meta: "120+ Thread" },
];

/** Continuously drifting editorial image rail — hover to slow it down. */
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
          Fourteen looks, shot over two mornings in Lahore. Hover to pause the reel.
        </p>
      </div>

      <div className="marquee-mask group flex w-max gap-5 marquee-x">
        {[0, 1].map((pass) => (
          <div key={pass} className="flex shrink-0 gap-5 pr-5">
            {strip.map((item) => (
              <figure
                key={`${pass}-${item.caption}`}
                className="group/card relative w-[58vw] shrink-0 overflow-hidden bg-background sm:w-[32vw] lg:w-[19vw]"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={item.src}
                    alt={`${item.caption} — ${item.meta}`}
                    width={800}
                    height={1000}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover/card:scale-[1.06]"
                  />
                </div>
                <figcaption className="flex items-baseline justify-between gap-3 px-1 pt-4">
                  <span className="font-display text-lg">{item.caption}</span>
                  <span className="text-[0.65rem] tracking-[0.14em] uppercase text-muted-foreground">
                    {item.meta}
                  </span>
                </figcaption>
              </figure>
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
                className="w-[78vw] shrink-0 border border-background/15 px-8 py-7 sm:w-[42vw] lg:w-[26vw]"
              >
                <div className="flex gap-1 text-gold" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-[0.7rem]">
                      ★
                    </span>
                  ))}
                </div>
                <p className="mt-4 font-display text-lg leading-snug">“{item.q}”</p>
                <footer className="mt-5 text-[0.65rem] tracking-[0.16em] uppercase text-background/55">
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

const ugc = [look3, products[0].back, look1, products[3].front, look4, products[2].back];

export function Community() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-32">
      <div data-reveal className="reveal-up mx-auto max-w-xl text-center">
        <p className="eyebrow text-muted-foreground">@mehr.pk</p>
        <div className="rule-gold mx-auto my-5" />
        <h2 className="type-h2">Worn by you</h2>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          Tag us and we will send you the shot, retouched, for your own feed. Every
          image below is a real customer order.
        </p>
      </div>
      <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
        {ugc.map((src, i) => (
          <a
            key={i}
            href="#grid"
            data-reveal
            style={{ transitionDelay: `${i * 60}ms` }}
            className="reveal-up group relative aspect-square overflow-hidden bg-sand"
          >
            <img
              src={src}
              alt="Customer wearing a Mehr suit"
              width={600}
              height={600}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-foreground/45 text-[0.6rem] tracking-[0.2em] uppercase text-background opacity-0 transition-opacity duration-400 group-hover:opacity-100">
              Shop the look
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

export function PriceTicker() {
  return (
    <p className="text-xs tabular-nums text-muted-foreground">{formatPKR(5000)}</p>
  );
}
