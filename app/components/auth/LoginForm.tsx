"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

const field =
  "w-full border-b border-white/25 bg-transparent py-3 text-lg font-light tracking-[0.1em] text-white outline-none transition-colors placeholder:text-foreground/35 focus:border-wine-light";
const fieldLabel =
  "mb-1 block text-[15px] font-light uppercase tracking-[0.25em] text-foreground/50";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { user, ready, signIn } = useAuth();

  const next = params.get("next");
  const dest =
    next && next.startsWith("/") && !next.startsWith("//") ? next : "/account";

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Already signed in? Skip the form.
  useEffect(() => {
    if (ready && user) router.replace(dest);
  }, [ready, user, dest, router]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "signup" && !name.trim()) return setError("Enter your name");
    if (password.length < 6)
      return setError("Password must be at least 6 characters");

    signIn({
      name: name.trim() || email.split("@")[0],
      email: email.trim(),
    });
    router.replace(dest);
  };

  const signup = mode === "signup";

  return (
    <main className="mx-auto w-full max-w-md flex-1 px-4 pb-24 pt-32 md:pt-40">
      <h1 className="text-[clamp(3rem,9vw,5.5rem)] font-extralight uppercase leading-[0.85] tracking-[0.03em] text-white">
        {signup ? "Create account" : "Sign in"}
      </h1>
      <p className="mt-4 text-lg font-light leading-snug tracking-[0.06em] text-white/60">
        {signup
          ? "Save your details for faster checkout."
          : "Welcome back. Pick up where you left off."}
      </p>

      <form onSubmit={submit} className="mt-10 space-y-7" noValidate={false}>
        {signup && (
          <div>
            <label htmlFor="name" className={fieldLabel}>
              Name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className={field}
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className={fieldLabel}>
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            autoComplete="email"
            className={field}
          />
        </div>

        <div>
          <label htmlFor="password" className={fieldLabel}>
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            autoComplete={signup ? "new-password" : "current-password"}
            className={field}
          />
        </div>

        {error && (
          <p role="alert" className="text-[15px] text-wine-light">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-wine px-7 py-4 text-lg font-light uppercase tracking-[0.3em] text-white transition-[filter] duration-300 hover:brightness-125"
        >
          {signup ? "Create account" : "Sign in"}
        </button>
      </form>

      <p className="mt-8 text-[17px] font-light tracking-[0.05em] text-foreground/55">
        {signup ? "Already have an account?" : "New to ZZEIM?"}{" "}
        <button
          type="button"
          onClick={() => {
            setMode(signup ? "signin" : "signup");
            setError("");
          }}
          className="border-b border-white/35 text-white transition-colors hover:border-wine"
        >
          {signup ? "Sign in" : "Create an account"}
        </button>
      </p>
    </main>
  );
}
