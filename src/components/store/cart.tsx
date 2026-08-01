import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { getProduct, products } from "./data";

export type CartLine = {
  key: string;
  id: string;
  size: string;
  qty: number;
};

type CartCtx = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (id: string, size: string, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);

export const FREE_SHIPPING = 5000;
export const SHIPPING_FEE = 250;

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([
    { key: "gulnar-M", id: "gulnar", size: "M", qty: 1 },
  ]);
  const [open, setOpen] = useState(false);

  const add = useCallback((id: string, size: string, qty = 1) => {
    const key = `${id}-${size}`;
    setLines((prev) => {
      const found = prev.find((l) => l.key === key);
      if (found) return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { key, id, size, qty }];
    });
    setOpen(true);
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) =>
      qty <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, qty } : l)),
    );
  }, []);

  const remove = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartCtx>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((n, l) => n + (getProduct(l.id)?.price ?? 0) * l.qty, 0);
    return { lines, count, subtotal, open, setOpen, add, setQty, remove, clear };
  }, [lines, open, add, setQty, remove, clear]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export const crossSell = [products[0], products[6]];
