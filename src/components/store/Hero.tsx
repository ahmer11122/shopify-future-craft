import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { heroSlides } from "./data";

export function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % heroSlides.length), 5200);
    return () => clearInterval(t);
  }, []);

  const slide = heroSlides[i];

  return (
    <section id="top" className="relative h-[92svh] min-h-[560px] w-full overflow-hidden bg-foreground">
      {heroSlides.map((s, idx) => (
        <div
          key={s.src}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
            idx === i ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={idx !== i}
        >
          <img
            src={s.src}
            alt={idx === i ? s.caption : ""}
            width={1600}
            height={2000}
            loading={idx === 0 ? "eager" : "lazy"}
            className={`h-full w-full object-cover object-[58%_center] ${idx === i ? "kenburns" : ""}`}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/40 to-foreground/10" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-foreground/70 to-transparent" />

      <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-end px-5 pb-16 pt-32 text-background lg:px-10 lg:pb-24">
        <div key={i} className="max-w-2xl">
          <p className="eyebrow reveal text-background/70">{slide.eyebrow}</p>
          <div className="rule-gold reveal my-6" style={{ animationDelay: "70ms" }} />
          <h1 className="reveal type-display" style={{ animationDelay: "130ms" }}>
            {slide.title}
            <br />
            <em className="italic text-gold">{slide.accent}</em>
            {slide.tail ? ` ${slide.tail}` : ""}
          </h1>
          <p
            className="reveal mt-7 max-w-md text-[0.95rem] leading-[1.75] text-background/75"
            style={{ animationDelay: "210ms" }}
          >
            {slide.caption}
          </p>
          <div className="reveal mt-10 flex flex-wrap items-center gap-6" style={{ animationDelay: "280ms" }}>
            <Link to="/collections/$handle" params={{ handle: "new-arrivals" }} className="btn-primary btn-on-dark">
              Shop New Arrivals
            </Link>
            <Link to="/collections" className="link-line text-[0.7rem] tracking-[0.2em] uppercase">
              View All Collections
            </Link>
          </div>
        </div>

        <div className="mt-14 flex items-end justify-between gap-8 border-t border-background/20 pt-6">
          <div className="flex items-center gap-5">
            <span className="num text-[0.7rem] tracking-[0.2em] text-background/60">
              {String(i + 1).padStart(2, "0")}
              <span className="mx-2 text-background/30">/</span>
              {String(heroSlides.length).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              {heroSlides.map((s, idx) => (
                <button
                  key={s.src}
                  aria-label={`Go to slide ${idx + 1}`}
                  onClick={() => setI(idx)}
                  className={`h-px w-10 transition-all duration-500 ${
                    idx === i ? "bg-gold" : "bg-background/35 hover:bg-background/70"
                  }`}
                />
              ))}
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}
