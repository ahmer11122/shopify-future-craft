import hero from "@/assets/hero.jpg";
import look1 from "@/assets/look1.jpg";
import look2 from "@/assets/look2.jpg";
import look3 from "@/assets/look3.jpg";
import look4 from "@/assets/look4.jpg";
import editorial from "@/assets/editorial.jpg";
import p1a from "@/assets/p1a.jpg";
import p2a from "@/assets/p2a.jpg";
import p3a from "@/assets/p3a.jpg";

const colA = [look1, p2a, look3, editorial];
const colB = [look2, p1a, look4, p3a];

function DriftColumn({
  images,
  reverse,
  className = "",
}: {
  images: string[];
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`drift-mask h-full overflow-hidden ${className}`}>
      <div className={`flex flex-col gap-4 ${reverse ? "drift-down" : "drift-up"}`}>
        {[0, 1].map((pass) =>
          images.map((src, i) => (
            <div key={`${pass}-${i}`} className="aspect-[3/4] w-full shrink-0 overflow-hidden bg-sand">
              <img
                src={src}
                alt=""
                aria-hidden="true"
                width={600}
                height={800}
                loading={pass === 0 && i === 0 ? "eager" : "lazy"}
                className="h-full w-full object-cover"
              />
            </div>
          )),
        )}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-background pt-[104px]">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 pb-20 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-10 lg:pb-28 lg:pt-20">
        <div className="max-w-xl">
          <p className="eyebrow reveal text-muted-foreground">Spring / Summer 2026</p>
          <div className="rule-gold reveal my-6" style={{ animationDelay: "80ms" }} />
          <h1
            className="reveal type-display"
            style={{ animationDelay: "140ms" }}
          >
            The Quiet
            <br />
            <em className="italic text-gold">Luxury</em> Edit
          </h1>
          <p
            className="reveal mt-8 max-w-md text-[0.95rem] leading-[1.75] text-muted-foreground"
            style={{ animationDelay: "220ms" }}
          >
            Hand-finished lawn, chiffon and embroidered three-piece suits.
            Measured in inches, photographed in daylight, delivered across
            Pakistan with cash on delivery.
          </p>
          <div className="reveal mt-10 flex flex-wrap items-center gap-5" style={{ animationDelay: "300ms" }}>
            <a href="#grid" className="btn-primary">
              Shop the Edit
            </a>
            <a href="#lookbook" className="link-line text-[0.7rem] tracking-[0.2em] uppercase">
              View the Lookbook
            </a>
          </div>

          <dl
            className="reveal mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-8"
            style={{ animationDelay: "380ms" }}
          >
            {[
              ["24 hrs", "Dispatch, Lahore"],
              ["4.8 / 5", "2,140 reviews"],
              ["COD", "Nationwide"],
            ].map(([k, v]) => (
              <div key={v}>
                <dt className="font-display text-2xl">{k}</dt>
                <dd className="mt-1.5 text-[0.68rem] leading-snug tracking-[0.06em] uppercase text-muted-foreground">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="hidden h-[38rem] grid-cols-2 gap-4 lg:grid xl:h-[42rem]">
            <DriftColumn images={colA} />
            <DriftColumn images={colB} reverse className="mt-12" />
          </div>

          <div className="relative aspect-[4/5] overflow-hidden bg-sand lg:hidden">
            <img
              src={hero}
              alt="Model wearing an ivory embroidered lawn suit in a marble courtyard"
              width={800}
              height={1000}
              className="h-full w-full object-cover object-[64%_center]"
            />
          </div>

          <div className="pointer-events-none absolute -bottom-6 left-0 hidden bg-background px-6 py-5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.45)] lg:block">
            <p className="eyebrow text-muted-foreground">Now Shipping</p>
            <p className="mt-1.5 font-display text-xl">Lawn Edit — 48 pieces</p>
          </div>
        </div>
      </div>
    </section>
  );
}
