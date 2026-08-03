import { brands } from "./data";

/**
 * Stocked labels — rendered as typographic marks rather than raster logos so
 * they stay crisp at every viewport and match the editorial type system.
 */
export function Brands() {
  return (
    <section className="border-y border-border bg-sand/50 py-16 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div data-reveal className="reveal-up flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow text-muted-foreground">The Multi-Brand Edit</p>
            <div className="rule-gold my-4" />
            <h2 className="type-h3">Labels we stock</h2>
          </div>
          <p className="num max-w-xs text-[0.72rem] leading-relaxed tracking-[0.04em] text-muted-foreground">
            08 Pakistani houses · all pieces authenticated in Lahore before dispatch
          </p>
        </div>
      </div>

      <div className="marquee-mask mt-12 flex w-max marquee-x-slow">
        {[0, 1].map((pass) => (
          <div key={pass} className="flex shrink-0">
            {brands.map((b) => (
              <div
                key={`${pass}-${b.name}`}
                className="group flex w-[56vw] shrink-0 flex-col justify-center border-r border-border px-8 py-2 sm:w-[30vw] lg:w-[18vw]"
              >
                <span className="font-display text-xl leading-tight text-muted-foreground transition-colors duration-500 group-hover:text-foreground lg:text-2xl">
                  {b.name}
                </span>
                <span className="num mt-2 flex items-center gap-2 text-[0.58rem] tracking-[0.18em] uppercase text-muted-foreground/70">
                  {b.note}
                  <span className="h-px w-4 bg-gold" />
                  Est. {b.since}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
