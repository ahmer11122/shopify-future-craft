import hero from "@/assets/hero.jpg";

export function Hero() {
  return (
    <section id="top" className="relative min-h-[92vh] w-full overflow-hidden bg-sand pt-[104px]">
      <img
        src={hero}
        alt="Model wearing an ivory embroidered lawn suit in a marble courtyard"
        width={1600}
        height={1104}
        className="absolute inset-0 h-full w-full object-cover object-[68%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/45 to-transparent" />
      <div className="relative mx-auto flex min-h-[calc(92vh-104px)] max-w-[1400px] items-center px-5 lg:px-10">
        <div className="max-w-xl reveal">
          <p className="eyebrow text-muted-foreground">Spring / Summer 2026</p>
          <div className="rule-gold my-6" />
          <h1 className="text-[clamp(2.9rem,7vw,5.4rem)] leading-[0.95] tracking-[-0.02em]">
            The Quiet
            <br />
            <em className="italic text-gold">Luxury</em> Edit
          </h1>
          <p className="mt-7 max-w-md text-[0.95rem] leading-relaxed text-muted-foreground">
            Hand-finished lawn, chiffon and embroidered three-piece suits.
            Measured in inches. Delivered across Pakistan with cash on delivery.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#grid"
              className="bg-foreground px-9 py-4 text-[0.7rem] tracking-[0.2em] uppercase text-background transition-colors hover:bg-gold hover:text-accent-foreground"
            >
              Shop Now
            </a>
            <a
              href="#pdp"
              className="border-b border-foreground pb-1 text-[0.7rem] tracking-[0.2em] uppercase transition-colors hover:border-gold hover:text-gold"
            >
              View the Lookbook
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
