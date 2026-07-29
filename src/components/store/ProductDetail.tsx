import { useState } from "react";
import { Heart, Ruler, ShieldCheck, X } from "lucide-react";
import { formatPKR, products, sizeChart } from "./data";
import { WhatsAppGlyph } from "./Header";

const sizes = ["XS", "S", "M", "L", "XL"];

export function ProductDetail({ onAdd }: { onAdd: () => void }) {
  const product = products[1];
  const [size, setSize] = useState("M");
  const [chart, setChart] = useState(false);
  const [shot, setShot] = useState(product.front);

  return (
    <section id="pdp" className="border-t border-border bg-sand">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:px-10 lg:py-32">
        <div className="flex gap-4">
          <div className="flex shrink-0 flex-col gap-3">
            {[product.front, product.back].map((src) => (
              <button
                key={src}
                onClick={() => setShot(src)}
                className={`h-20 w-16 overflow-hidden border ${shot === src ? "border-gold" : "border-transparent"}`}
              >
                <img src={src} alt="" width={800} height={1100} loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <div className="aspect-[4/5.2] flex-1 overflow-hidden bg-background">
            <img
              src={shot}
              alt={`${product.name} formal chiffon suit`}
              width={800}
              height={1100}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="lg:pt-6">
          <p className="eyebrow text-muted-foreground">{product.fabric}</p>
          <h2 className="mt-4 text-[clamp(2.2rem,4vw,3.4rem)] leading-none">{product.name}</h2>
          <p className="mt-5 flex items-baseline gap-4">
            <span className="text-lg">{formatPKR(product.price)}</span>
            {product.compareAt && (
              <span className="text-sm text-muted-foreground line-through">{formatPKR(product.compareAt)}</span>
            )}
            <span className="bg-gold-soft px-2.5 py-1 text-[0.6rem] tracking-[0.16em] uppercase">Save 23%</span>
          </p>
          <p className="mt-7 max-w-md text-sm leading-relaxed text-muted-foreground">
            Pure chiffon shirt with hand-worked gold zari on the panel and sleeves,
            paired with a raw silk trouser and a scalloped organza dupatta.
            Photographed in daylight, unedited.
          </p>

          <div className="mt-10 flex items-center justify-between">
            <p className="eyebrow">Size — Inches</p>
            <button
              onClick={() => setChart(true)}
              className="flex items-center gap-2 border-b border-foreground pb-0.5 text-[0.68rem] tracking-[0.14em] uppercase transition-colors hover:border-gold hover:text-gold"
            >
              <Ruler className="h-3.5 w-3.5" strokeWidth={1.4} />
              Size Chart
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`h-12 w-12 border text-xs transition-colors ${
                  size === s ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"
                }`}
              >
                {s}
              </button>
            ))}
            <span className="ml-1 self-center bg-background px-3 py-2 text-[0.6rem] tracking-[0.16em] uppercase text-muted-foreground">
              True to Size
            </span>
          </div>

          <div className="mt-9 flex gap-3">
            <button
              onClick={onAdd}
              className="flex-1 bg-foreground py-4 text-[0.7rem] tracking-[0.2em] uppercase text-background transition-colors hover:bg-gold hover:text-accent-foreground"
            >
              Add to Cart
            </button>
            <button aria-label="Save" className="border border-border px-5 transition-colors hover:border-foreground">
              <Heart className="h-4 w-4" strokeWidth={1.4} />
            </button>
          </div>

          <div className="mt-6 space-y-3 border border-border bg-background p-5">
            <p className="flex items-center gap-3 text-[0.78rem]">
              <ShieldCheck className="h-4 w-4 text-gold" strokeWidth={1.4} />
              Cash on Delivery available across Pakistan
            </p>
            <p className="flex items-center gap-3 text-[0.78rem] text-muted-foreground">
              <span className="h-4 w-4" />
              7 day exchange · unworn with tags · return charges Rs. 250
            </p>
            <a
              href="https://wa.me/920000000000"
              className="flex items-center gap-3 text-[0.78rem] text-muted-foreground transition-colors hover:text-gold"
            >
              <WhatsAppGlyph className="h-4 w-4 text-whatsapp" />
              Ask about fabric or fit on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {chart && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-foreground/40 p-0 sm:items-center sm:p-6">
          <div className="w-full max-w-lg bg-background p-7">
            <div className="flex items-start justify-between">
              <div>
                <p className="eyebrow text-muted-foreground">Measurements in inches</p>
                <h3 className="mt-2 text-2xl">Size Chart</h3>
              </div>
              <button aria-label="Close size chart" onClick={() => setChart(false)}>
                <X className="h-5 w-5" strokeWidth={1.4} />
              </button>
            </div>
            <table className="mt-7 w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-[0.6rem] tracking-[0.16em] uppercase text-muted-foreground">
                  <th className="pb-3 font-medium">Size</th>
                  <th className="pb-3 font-medium">Chest</th>
                  <th className="pb-3 font-medium">Waist</th>
                  <th className="pb-3 font-medium">Hip</th>
                  <th className="pb-3 font-medium">Length</th>
                </tr>
              </thead>
              <tbody>
                {sizeChart.map((r) => (
                  <tr key={r.size} className="border-b border-border/60">
                    <td className="py-3">{r.size}</td>
                    <td className="py-3 text-muted-foreground">{r.chest}"</td>
                    <td className="py-3 text-muted-foreground">{r.waist}"</td>
                    <td className="py-3 text-muted-foreground">{r.hip}"</td>
                    <td className="py-3 text-muted-foreground">{r.length}"</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-5 text-[0.75rem] leading-relaxed text-muted-foreground">
              Our M sits between a Khaadi M and a Sapphire M. If you are between two
              sizes on the chest, take the larger — the shirt is cut close through the bust.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
