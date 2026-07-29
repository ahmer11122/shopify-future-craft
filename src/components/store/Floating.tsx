import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { WhatsAppGlyph } from "./Header";

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/920000000000"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-24 right-5 z-40 flex h-12 w-12 items-center justify-center bg-whatsapp text-background shadow-lg transition-transform hover:scale-105 sm:bottom-28"
    >
      <WhatsAppGlyph className="h-6 w-6" />
    </a>
  );
}

export function EmailBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 2600);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-5 py-4 lg:px-10">
        <p className="text-[0.78rem] text-muted-foreground">
          <span className="text-foreground">Get 10% off your first order.</span> Early access to every drop.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setShow(false);
          }}
          className="flex flex-1 items-center gap-3 sm:max-w-sm"
        >
          <input
            type="email"
            required
            placeholder="Email address"
            className="w-full border-b border-border bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-gold"
          />
          <button className="shrink-0 bg-foreground px-5 py-2.5 text-[0.65rem] tracking-[0.18em] uppercase text-background transition-colors hover:bg-gold hover:text-accent-foreground">
            Join
          </button>
        </form>
        <button aria-label="Dismiss" onClick={() => setShow(false)} className="text-muted-foreground">
          <X className="h-4 w-4" strokeWidth={1.4} />
        </button>
      </div>
    </div>
  );
}
