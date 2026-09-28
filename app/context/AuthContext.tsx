"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type User = { name: string; email: string };

type AuthCtx = {
  user: User | null;
  ready: boolean; // false until localStorage has been read
  signIn: (user: User) => void;
  signOut: () => void;
};

const KEY = "zzeim-user";
const Ctx = createContext<AuthCtx | null>(null);

// DEMO AUTH: keeps a fake session in localStorage. There is no password
// check and no server. Swap signIn/signOut for real API calls later.
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  const signIn = useCallback((u: User) => {
    setUser(u);
    try {
      localStorage.setItem(KEY, JSON.stringify(u));
    } catch {}
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(KEY);
    } catch {}
  }, []);

  return (
    <Ctx.Provider value={{ user, ready, signIn, signOut }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
