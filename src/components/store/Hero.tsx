import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { heroSlides } from "./data";

export function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % heroSlides.length), 5500);
    return () => clearInterval(t);
  }, []);

  const slide = heroSlides[i];

  return (
    <section id="top" className="relative h-[92svh] min-h-[560px] w-full overflow-hidden bg-background">
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

      <div className="relative z-30 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-24 sm:pb-28 lg:pb-32 text-foreground lg:px-12">
        <div 
          key={i} 
          className={`max-w-xl w-full ${slide.desktopAlign === 'right' ? 'sm:ml-auto' : ''}`}
        >
          <div className="reveal flex flex-col gap-3 sm:gap-4" style={{ animationDelay: "100ms" }}>
            <p className="eyebrow text-[0.65rem] sm:text-xs tracking-[0.3em] uppercase text-foreground/70">
              {slide.subheadline}
            </p>
            <h1 className="type-display text-5xl sm:text-6xl lg:text-[5.5rem] leading-[1.05] tracking-tight">
              {slide.headline}
            </h1>
          </div>
          <div 
            className="reveal mt-8 sm:mt-10 flex flex-wrap items-center gap-6" 
            style={{ animationDelay: "250ms" }}
          >
            <Link 
              to="/collections/$handle" 
              params={{ handle: slide.link }} 
              className="group flex items-center gap-4 text-xs font-medium tracking-[0.2em] uppercase text-foreground transition-all"
            >
              <span className="border-b border-foreground/30 pb-1 transition-colors group-hover:border-foreground">
                {slide.cta}
              </span>
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 inset-x-6 lg:inset-x-12 max-w-[1400px] mx-auto flex items-end justify-between gap-8 pt-6">
          <div className="flex items-center gap-5">
            <span className="num text-[0.65rem] tracking-[0.2em] text-foreground/50">
              {String(i + 1).padStart(2, "0")}
              <span className="mx-2 text-foreground/30">/</span>
              {String(heroSlides.length).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  aria-label={`Go to slide ${idx + 1}`}
                  onClick={() => setI(idx)}
                  className={`h-px transition-all duration-700 ${
                    idx === i ? "bg-foreground w-12" : "bg-foreground/20 hover:bg-foreground/40 w-6"
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
