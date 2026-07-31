import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Do you deliver cash on delivery?",
    a: "Yes — nationwide COD with no advance payment. You pay the courier at your door. Orders above Rs. 5,000 ship free; below that a flat Rs. 199 applies.",
  },
  {
    q: "How do I know my size?",
    a: "Every product page carries a size chart measured in inches, taken flat from the actual garment — chest, waist, hip and length. When in doubt, message us on WhatsApp with your usual brand and size and we will match it.",
  },
  {
    q: "Can I exchange if the fit is wrong?",
    a: "Seven days from delivery, unworn with tags attached. We arrange the pickup and send the replacement in the same trip where the courier allows it.",
  },
  {
    q: "Is unstitched fabric refundable?",
    a: "Unstitched suits can be exchanged while the fabric is uncut. Once cut or stitched, we can only help with fabric defects.",
  },
  {
    q: "How long does dispatch take?",
    a: "Within 24 hours from our Lahore studio, Monday to Saturday. Karachi and Islamabad usually land in 2 days, smaller cities in 3 to 4.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-t border-border bg-sand/50">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-5 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-10 lg:py-32">
        <div data-reveal className="reveal-up lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow text-muted-foreground">Before You Order</p>
          <div className="rule-gold my-5" />
          <h2 className="type-h2">Questions, answered plainly</h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
            No fine print, no hidden charges. If something is still unclear, our
            team replies on WhatsApp within minutes during business hours.
          </p>
        </div>

        <div data-reveal className="reveal-up divide-y divide-border border-y border-border">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-8 py-7 text-left transition-colors hover:text-gold"
                >
                  <span className="font-display text-xl lg:text-2xl">{item.q}</span>
                  <Plus
                    className={`h-4 w-4 shrink-0 transition-transform duration-500 ${
                      isOpen ? "rotate-135 text-gold" : ""
                    }`}
                    strokeWidth={1.4}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-xl pb-7 text-sm leading-relaxed text-muted-foreground">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
