import { PackageCheck, RefreshCcw, Ruler, Truck } from "lucide-react";

const items = [
  { icon: PackageCheck, title: "Cash on Delivery", copy: "Pay when it reaches your door" },
  { icon: Truck, title: "Free Shipping", copy: "On orders over Rs. 5,000" },
  { icon: RefreshCcw, title: "7 Day Exchange", copy: "Unworn, tags attached" },
  { icon: Ruler, title: "Local Sizing", copy: "Measured in inches, PK fit" },
];

export function TrustBand() {
  return (
    <section className="border-y border-border bg-background">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 divide-border lg:grid-cols-4 lg:divide-x">
        {items.map(({ icon: Icon, title, copy }) => (
          <div key={title} className="flex items-start gap-4 border-b border-border px-6 py-8 lg:border-b-0 lg:px-9">
            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.3} />
            <div>
              <p className="eyebrow">{title}</p>
              <p className="mt-1.5 text-[0.8rem] text-muted-foreground">{copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
