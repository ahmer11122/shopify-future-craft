import { useState } from "react";
import { Plus, Minus, MessageCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

const FAQS: FAQItem[] = [
  {
    category: "AUTHENTICITY",
    question: "Are all collections 100% original Pakistani designer wear?",
    answer:
      "Yes. Every single unstitched, stitched, and formal piece is sourced directly from the fashion houses in Lahore and Karachi—including Zara Shahjahan, Sana Safinaz, Élan, Khaadi, and Maria B. Each garment undergoes strict physical authentication in our Lahore studio before international dispatch.",
  },
  {
    category: "DELIVERY",
    question: "How long does express worldwide shipping take?",
    answer:
      "We ship globally via DHL Express and FedEx. Ready-to-wear and unstitched lawn collections are dispatched within 24–48 hours, arriving at your doorstep in 3 to 5 business days worldwide with full tracking.",
  },
  {
    category: "BESPOKE",
    question: "Can I request custom stitching or bespoke tailoring?",
    answer:
      "Absolutely. We offer a premium in-house tailoring service in Lahore for all unstitched luxury lawn and wedding formals. Simply select 'Custom Stitched' on the product page or connect with our concierge on WhatsApp with your exact measurements.",
  },
  {
    category: "RETURNS",
    question: "What is your return and exchange policy?",
    answer:
      "We accept returns and exchanges on all unstitched and standard ready-to-wear garments within 14 days of delivery, provided the security ribbon and original designer tags remain intact.",
  },
  {
    category: "GARMENT CARE",
    question: "How should I care for luxury embroidered lawn and silk formals?",
    answer:
      "We recommend delicate dry cleaning for all embellished, embroidered, or silk-blend formals. For everyday luxury lawn, hand washing in cold water with mild detergent preserves the fabric's luster and vibrant dyes.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-32">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left Column: Editorial Header & Concierge Card */}
        <div data-reveal className="reveal-up lg:col-span-5">
          <p className="eyebrow text-muted-foreground">Questions & Answers</p>
          <div className="rule-gold my-4" />
          <h2 className="type-h2">Frequently Asked</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Everything you need to know about our Pakistani designer collections,
            Lahore authentication, global express delivery, and bespoke tailoring.
          </p>

          {/* WhatsApp / Concierge Assistance Box */}
          <div className="mt-8 rounded-none border border-border/80 bg-sand/40 p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-base tracking-wide text-foreground">
                  Need Personal Guidance?
                </p>
                <p className="text-xs text-muted-foreground">
                  Our Lahore concierge is live 24/7
                </p>
              </div>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground/90">
              Have a specific sizing question or inquiring about a bespoke bridal order? Chat directly with our senior styling team.
            </p>
            <a
              href="https://wa.me/923000000000"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-foreground transition-opacity hover:opacity-70"
            >
              <span className="border-b border-foreground/30 pb-0.5">
                Message on WhatsApp
              </span>
            </a>
          </div>
        </div>

        {/* Right Column: Clutter-Free Interactive Accordion */}
        <div className="lg:col-span-7">
          <div className="divide-y divide-border border-t border-b border-border">
            {FAQS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={item.question} className="group">
                  <button
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    className="flex w-full items-center justify-between py-6 text-left transition-colors focus:outline-none sm:py-7"
                    aria-expanded={isOpen}
                  >
                    <div className="pr-6">
                      {item.category && (
                        <p className="num mb-1.5 text-[0.62rem] tracking-[0.25em] uppercase text-gold/80">
                          {item.category}
                        </p>
                      )}
                      <h3 className="font-display text-lg tracking-wide text-foreground/90 transition-colors duration-300 group-hover:text-foreground sm:text-xl">
                        {item.question}
                      </h3>
                    </div>

                    {/* Circular Animated Toggle Icon */}
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "border-gold/60 bg-gold/10 text-gold"
                          : "border-border text-muted-foreground group-hover:border-foreground/40 group-hover:text-foreground"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="h-4 w-4 transition-transform duration-300 rotate-180" />
                      ) : (
                        <Plus className="h-4 w-4 transition-transform duration-300 rotate-0" />
                      )}
                    </div>
                  </button>

                  {/* Silky Smooth Modern CSS Grid Expand Animation */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-7 pr-8 text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
