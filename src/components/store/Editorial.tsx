import editorial from "@/assets/editorial.jpg";

export function Editorial() {
  return (
    <section className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 py-24 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:py-32">
      <div className="aspect-[4/3] overflow-hidden bg-sand">
        <img
          src={editorial}
          alt="Close-up of gold thread embroidery on lawn fabric"
          width={1400}
          height={900}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div>
        <p className="eyebrow text-muted-foreground">The Fabric</p>
        <div className="rule-gold my-5" />
        <h2 className="text-[clamp(2rem,4vw,3.2rem)] leading-tight">
          Photographed close,
          <br />
          so nothing surprises you.
        </h2>
        <p className="mt-7 max-w-md text-sm leading-relaxed text-muted-foreground">
          Every listing carries an unretouched macro shot of the weave and the
          thread work, alongside the exact fabric count. What you see on a 4G
          connection in Multan is what arrives at your door.
        </p>
        <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
          {[
            ["120+", "Thread count lawn"],
            ["24 hrs", "Dispatch from Lahore"],
            ["4.8/5", "From 2,140 reviews"],
          ].map(([k, v]) => (
            <div key={v}>
              <dt className="font-display text-2xl text-gold">{k}</dt>
              <dd className="mt-1.5 text-[0.72rem] leading-snug text-muted-foreground">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
