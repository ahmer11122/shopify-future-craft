import { ArrowUpRight } from "lucide-react";
import cat1 from "@/assets/cat1.jpg";
import cat2 from "@/assets/cat2.jpg";
import cat3 from "@/assets/cat3.jpg";
import cat4 from "@/assets/cat4.jpg";

const tiles = [
  { title: "Unstitched", count: "48 pieces", src: cat1, span: "lg:col-span-3 lg:row-span-2" },
  { title: "Formal", count: "26 pieces", src: cat2, span: "lg:col-span-3" },
  { title: "Stitched Lawn", count: "62 pieces", src: cat3, span: "lg:col-span-2" },
  { title: "Dupattas", count: "19 pieces", src: cat4, span: "lg:col-span-1" },
];

export function CategoryTiles() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div data-reveal className="reveal-up">
          <p className="eyebrow text-muted-foreground">Shop by Type</p>
          <div className="rule-gold my-4" />
          <h2 className="type-h2">Four rooms, nothing more</h2>
        </div>
        <a href="#grid" className="link-line text-[0.7rem] tracking-[0.2em] uppercase">
          Browse everything
        </a>
      </div>

      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
        {tiles.map((tile, i) => (
          <a
            key={tile.title}
            href="#grid"
            data-reveal
            style={{ transitionDelay: `${i * 80}ms` }}
            className={`reveal-up group relative overflow-hidden bg-sand ${tile.span}`}
          >
            <div className={i === 0 ? "aspect-[4/5] lg:aspect-auto lg:h-full" : "aspect-[4/3]"}>
              <img
                src={tile.src}
                alt={`${tile.title} category`}
                width={900}
                height={1100}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.07]"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
              <div>
                <h3 className="font-display text-2xl text-background lg:text-3xl">{tile.title}</h3>
                <p className="mt-1 text-[0.62rem] tracking-[0.18em] uppercase text-background/70">
                  {tile.count}
                </p>
              </div>
              <span className="grid h-10 w-10 shrink-0 place-items-center border border-background/40 text-background transition-all duration-400 group-hover:border-gold group-hover:bg-gold group-hover:text-accent-foreground">
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.4} />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
