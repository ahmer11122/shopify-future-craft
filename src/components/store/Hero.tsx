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
          key={idx}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
            idx === i ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          aria-hidden={idx !== i}
        >
          <img
            src={s.desktopSrc}
            alt={s.headline}
            width={1600}
            height={900}
            loading={idx === 0 ? "eager" : "lazy"}
            className={`hidden sm:block h-full w-full object-cover object-top ${idx === i ? "kenburns" : ""}`}
          />
          <img
            src={s.mobileSrc}
            alt={s.headline}
            width={800}
            height={1200}
            loading={idx === 0 ? "eager" : "lazy"}
            className={`sm:hidden h-full w-full object-cover object-top ${idx === i ? "kenburns" : ""}`}
          />
        </div>
      ))}

      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent sm:bg-none" />

      <div className="relative z-30 mx-auto flex h-full max-w-[1400px] flex-col justify-end sm:justify-center px-5 pb-24 text-background lg:px-10">
        <div 
          key={i} 
          className={`max-w-2xl w-full ${slide.desktopAlign === 'right' ? 'sm:ml-auto sm:text-right' : ''}`}
        >
          <h1 className="reveal type-display text-4xl sm:text-6xl lg:text-7xl drop-shadow-lg" style={{ animationDelay: "70ms" }}>
            {slide.headline}
          </h1>
          <p
            className={`reveal mt-4 sm:mt-7 max-w-md text-[1.05rem] leading-[1.6] text-background/90 drop-shadow-md ${slide.desktopAlign === 'right' ? 'sm:ml-auto' : ''}`}
            style={{ animationDelay: "130ms" }}
          >
            {slide.subheadline}
          </p>
          <div 
            className={`reveal mt-8 sm:mt-10 flex flex-wrap items-center gap-6 ${slide.desktopAlign === 'right' ? 'sm:justify-end' : ''}`} 
            style={{ animationDelay: "210ms" }}
          >
            <Link to="/collections/$handle" params={{ handle: slide.link }} className="btn-primary btn-on-dark shadow-xl hover:shadow-2xl">
              {slide.cta}
            </Link>
          </div>
        </div>

        <div className="absolute bottom-6 inset-x-5 lg:inset-x-10 max-w-[1400px] mx-auto flex items-end justify-between gap-8 pt-6">
          <div className="flex items-center gap-5">
            <span className="num text-[0.7rem] tracking-[0.2em] text-background/80 drop-shadow-md">
              {String(i + 1).padStart(2, "0")}
              <span className="mx-2 text-background/50">/</span>
              {String(heroSlides.length).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  aria-label={`Go to slide ${idx + 1}`}
                  onClick={() => setI(idx)}
                  className={`h-1 transition-all duration-500 rounded-full ${
                    idx === i ? "bg-gold w-10" : "bg-background/50 hover:bg-background/80 w-6"
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
