import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Package } from "lucide-react";

const title = "Track Your Order — Mehr";
const description = "Enter your Mehr order number to see dispatch, transit and delivery status.";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TrackPage,
});

const steps = [
  { label: "Order placed", note: "Confirmed · 12 Mar, 4:20 PM", done: true },
  { label: "Packed in Lahore", note: "Quality checked · 12 Mar, 9:05 PM", done: true },
  { label: "In transit", note: "Leopards Courier · LE-84102337", done: true },
  { label: "Out for delivery", note: "Expected 14 Mar", done: false },
  { label: "Delivered", note: "Cash on delivery", done: false },
];

function TrackPage() {
  const [id, setId] = useState("");
  const [shown, setShown] = useState(false);

  return (
    <div className="mx-auto max-w-[1100px] px-5 pb-32 pt-40 lg:px-10 lg:pt-48">
      <p className="eyebrow text-muted-foreground">Step 03 of 03</p>
      <div className="rule-gold my-5" />
      <h1 className="type-display">Track Your Order</h1>
      <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
        Use the order number from your confirmation SMS, e.g. MHR-24817.
      </p>

      <form
        className="mt-10 flex max-w-lg flex-col gap-3 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          setShown(true);
        }}
      >
        <input
          required
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="MHR-24817"
          className="num w-full border border-border bg-background px-4 py-3.5 text-sm outline-none transition-colors focus:border-gold"
        />
        <button type="submit" className="btn-primary shrink-0">
          Track
        </button>
      </form>

      {shown && (
        <div className="mt-16 grid gap-12 border-t border-border pt-12 lg:grid-cols-[1fr_0.7fr] lg:gap-20">
          <div>
            <p className="num eyebrow text-muted-foreground">Order {id.toUpperCase()}</p>
            <h2 className="mt-3 font-display text-3xl">On its way to Karachi</h2>
            <ol className="mt-10">
              {steps.map((s, i) => (
                <li key={s.label} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border ${
                        s.done ? "border-gold bg-gold text-accent-foreground" : "border-border text-muted-foreground"
                      }`}
                    >
                      {s.done ? <Check className="h-3.5 w-3.5" strokeWidth={2} /> : <span className="num text-[0.65rem]">{i + 1}</span>}
                    </span>
                    {i < steps.length - 1 && <span className={`w-px flex-1 ${s.done ? "bg-gold" : "bg-border"}`} />}
                  </div>
                  <div className="pb-9">
                    <p className={`text-sm ${s.done ? "" : "text-muted-foreground"}`}>{s.label}</p>
                    <p className="num mt-1 text-[0.72rem] text-muted-foreground">{s.note}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <aside className="h-fit border border-border p-7">
            <Package className="h-5 w-5 text-gold" strokeWidth={1.3} />
            <p className="mt-4 font-display text-xl">Need help with this order?</p>
            <p className="mt-3 text-[0.8rem] leading-relaxed text-muted-foreground">
              Exchanges are open for 7 days after delivery on unworn pieces with tags.
            </p>
            <a href="https://wa.me/920000000000" className="btn-ghost mt-6 w-full">
              Message us on WhatsApp
            </a>
            <Link
              to="/collections"
              className="mt-4 block text-center text-[0.68rem] tracking-[0.16em] uppercase text-muted-foreground hover:text-foreground"
            >
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
