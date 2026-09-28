"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function AccountView() {
  const router = useRouter();
  const { user, ready, signOut } = useAuth();

  // Send visitors who aren't signed in to the login page
  useEffect(() => {
    if (ready && !user) router.replace("/login?next=/account");
  }, [ready, user, router]);

  if (!ready || !user) return <main className="flex-1 pt-28" />;

  const first = user.name.split(" ")[0];

  return (
    <main className="mx-auto w-full max-w-[2100px] flex-1 px-4 pb-24 pt-28 md:px-6 md:pt-32 lg:px-8">
      <header className="mb-10 flex items-end justify-between gap-4 border-b border-white/8 pb-6">
        <h1 className="text-[clamp(3rem,8vw,7rem)] font-extralight uppercase leading-[0.85] tracking-[0.03em] text-white">
          Hi, {first}
        </h1>
        <button
          type="button"
          onClick={() => {
            signOut();
            router.replace("/");
          }}
          className="mb-1 border-b border-white/35 pb-1 text-lg font-light uppercase tracking-[0.3em] text-white transition-colors duration-300 hover:border-wine"
        >
          Sign out
        </button>
      </header>

      <div className="grid gap-12 md:grid-cols-2">
        <section aria-labelledby="details">
          <h2
            id="details"
            className="mb-4 text-[15px] font-normal uppercase tracking-[0.3em] text-white"
          >
            Your details
          </h2>
          <dl className="space-y-3 text-[17px] font-light tracking-[0.05em]">
            <div className="flex gap-6">
              <dt className="w-24 text-foreground/50">Name</dt>
              <dd className="text-white">{user.name}</dd>
            </div>
            <div className="flex gap-6">
              <dt className="w-24 text-foreground/50">Email</dt>
              <dd className="text-white">{user.email}</dd>
            </div>
          </dl>
        </section>

        <section aria-labelledby="orders">
          <h2
            id="orders"
            className="mb-4 text-[15px] font-normal uppercase tracking-[0.3em] text-white"
          >
            Orders
          </h2>
          <p className="max-w-[34ch] text-lg font-light leading-snug tracking-[0.06em] text-white/60">
            No orders yet. Your purchases will show up here.
          </p>
          <Link
            href="/wardrobe"
            className="mt-5 inline-block border-b border-white/35 pb-1 text-lg font-light uppercase tracking-[0.3em] text-white transition-colors duration-300 hover:border-wine"
          >
            Browse the wardrobe
          </Link>
        </section>
      </div>
    </main>
  );
}
