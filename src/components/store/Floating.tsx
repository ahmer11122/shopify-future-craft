import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { WhatsAppGlyph } from "./Header";

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/920000000000"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-6 right-5 z-50 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-border/50 bg-background/95 shadow-2xl backdrop-blur-xl transition-all duration-300 ease-out hover:scale-110 hover:border-whatsapp hover:shadow-[0_8px_30px_-10px_var(--color-whatsapp)] sm:bottom-8 sm:right-8"
    >
      <WhatsAppGlyph className="h-7 w-7 text-foreground transition-colors duration-300 group-hover:text-whatsapp" />
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
