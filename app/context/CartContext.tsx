"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { products, type Product } from "@/app/data/products";

type Stored = { slug: string; size: string; color: number; qty: number };
export type CartLine = Stored & { id: string; product: Product };

type CartCtx = {
  lines: CartLine[];
  count: number;
  ready: boolean; // false until localStorage has been read
  add: (slug: string, size: string, color: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
};

const KEY = "zzeim-cart";
const MAX_QTY = 10;
const lineId = (s: Pick<Stored, "slug" | "size" | "color">) =>
  `${s.slug}|${s.size}|${s.color}`;

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [stored, setStored] = useState<Stored[]>([]);
  const [ready, setReady] = useState(false);

  // Load once on the client (avoids SSR hydration mismatch).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setStored(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(stored));
    } catch {}
  }, [stored, ready]);

  const lines = useMemo<CartLine[]>(
    () =>
      stored.flatMap((s) => {
        const product = products.find((p) => p.slug === s.slug);
        return product ? [{ ...s, id: lineId(s), product }] : [];
      }),
    [stored],
  );

  const add = useCallback((slug: string, size: string, color: number) => {
    setStored((cur) => {
      const id = lineId({ slug, size, color });
      return cur.some((s) => lineId(s) === id)
        ? cur.map((s) =>
            lineId(s) === id ? { ...s, qty: Math.min(MAX_QTY, s.qty + 1) } : s,
          )
        : [...cur, { slug, size, color, qty: 1 }];
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setStored((cur) =>
      cur.map((s) =>
        lineId(s) === id
          ? { ...s, qty: Math.min(MAX_QTY, Math.max(1, qty)) }
          : s,
      ),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setStored((cur) => cur.filter((s) => lineId(s) !== id));
  }, []);

  const count = lines.reduce((n, l) => n + l.qty, 0);

  return (
    <Ctx.Provider value={{ lines, count, ready, add, setQty, remove }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
