"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type WishlistCtx = {
  slugs: string[]; // newest first
  ready: boolean; // false until localStorage has been read
  has: (slug: string) => boolean;
  toggle: (slug: string) => void;
};

const KEY = "zzeim-wishlist";
const Ctx = createContext<WishlistCtx | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setSlugs(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(slugs));
    } catch {}
  }, [slugs, ready]);

  const has = useCallback((slug: string) => slugs.includes(slug), [slugs]);

  const toggle = useCallback((slug: string) => {
    setSlugs((cur) =>
      cur.includes(slug) ? cur.filter((s) => s !== slug) : [slug, ...cur],
    );
  }, []);

  return (
    <Ctx.Provider value={{ slugs, ready, has, toggle }}>
      {children}
    </Ctx.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error("useWishlist must be used inside <WishlistProvider>");
  return ctx;
}
