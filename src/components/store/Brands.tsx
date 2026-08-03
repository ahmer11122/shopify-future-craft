import { Link } from "@tanstack/react-router";
import { brands } from "./data";

/**
 * Stocked labels — rendered in a single, high-fashion horizontal stream
 * with pause-on-hover and smooth illumination animations.
 */
export function Brands() {
  return (
    <section className="border-y border-border bg-sand/50 py-10 lg:py-14">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div data-reveal className="reveal-up flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow text-muted-foreground">The Multi-Brand Edit</p>
            <div className="rule-gold my-4" />
            <h2 className="type-h2">Labels we stock</h2>
          </div>
          <p className="num max-w-xs text-[0.72rem] leading-relaxed tracking-[0.04em] text-muted-foreground">
            08 Pakistani houses · all pieces authenticated in Lahore before dispatch
          </p>
        </div>
      </div>

      {/* Single-line luxury infinite marquee */}
      <div className="marquee-mask mt-8 flex w-max items-center marquee-x-slow py-2 sm:mt-10">
        {[0, 1, 2].map((pass) => (
          <div key={pass} className="flex shrink-0 items-center">
            {brands.map((b) => (
              <Link
                key={`${pass}-${b.name}`}
                to="/collections"
                className="group/brand flex shrink-0 items-center gap-8 px-4 sm:gap-12 sm:px-6 lg:gap-16 lg:px-8"
              >
                <span className="font-display text-xl tracking-[0.2em] uppercase text-foreground/40 transition-all duration-500 group-hover/brand:scale-105 group-hover/brand:text-foreground sm:text-2xl lg:text-3xl">
                  {b.name}
                </span>
                <span className="select-none text-sm text-gold/60 sm:text-base">
                  ✦
                </span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
