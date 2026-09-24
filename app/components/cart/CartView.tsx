"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Lock, Minus, Plus, X } from "lucide-react";

type Item = {
  id: string;
  name: string;
  variant: string;
  price: number;
  qty: number;
  image?: string;
};

const initialItems: Item[] = [
  {
    id: "coat-01",
    name: "Belted trench coat",
    variant: "Ladies · Size M · Navy",
    price: 420,
    qty: 1,
    image: "/images/product-placeholder.jpg",
  },
  {
    id: "jacket-02",
    name: "Leather jacket",
    variant: "Gentlemen · Size L · Black",
    price: 340,
    qty: 1,
    image: "/images/product-placeholder.jpg",
  },
];

const PLACEHOLDER = "/images/product-placeholder.jpg";
const FREE_SHIPPING_AT = 150;
const FLAT_SHIPPING = 12;
const PROMO_CODE = "ZZEIM10";
const PROMO_RATE = 0.1;

const money = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    n,
  );

const label = "text-[15px] font-normal uppercase tracking-[0.3em] text-white";
const ghostBtn =
  "flex items-center gap-2 text-[15px] font-light uppercase tracking-[0.25em] text-foreground/55 transition-colors duration-300 hover:text-white";

function Row({
  name,
  value,
  strong,
}: {
  name: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between ${
        strong ? "text-2xl text-white" : "text-[17px] text-foreground/60"
      } font-light tracking-[0.05em]`}
    >
      <dt>{name}</dt>
      <dd>{value}</dd>
    </div>
  );
}

export default function CartView() {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  const setQty = (id: string, qty: number) =>
    setItems((list) =>
      list.map((i) =>
        i.id === id ? { ...i, qty: Math.min(10, Math.max(1, qty)) } : i,
      ),
    );

  const remove = (id: string) =>
    setItems((list) => list.filter((i) => i.id !== id));

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().toUpperCase() === PROMO_CODE) {
      setApplied(true);
      setPromoError("");
    } else {
      setApplied(false);
      setPromoError("That code isn't valid");
    }
  };

  const PLACEHOLDER = "/images/product-placeholder.jpg";
  const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0);
  const discount = applied ? subtotal * PROMO_RATE : 0;
  const afterDiscount = subtotal - discount;
  const shipping =
    items.length === 0 || afterDiscount >= FREE_SHIPPING_AT ? 0 : FLAT_SHIPPING;
  const total = afterDiscount + shipping;
  const remaining = Math.max(0, FREE_SHIPPING_AT - afterDiscount);
  const progress = Math.min(100, (afterDiscount / FREE_SHIPPING_AT) * 100);

  return (
    <main className="mx-auto w-full max-w-[2100px] flex-1 px-4 pb-20 pt-28 md:px-6 md:pt-32 lg:px-8">
      <header className="mb-10 flex items-end justify-between gap-4 border-b border-white/8 pb-6">
        <h1 className="text-[clamp(3rem,8vw,7rem)] font-extralight uppercase leading-[0.85] tracking-[0.03em] text-white">
          Your bag
        </h1>
        <span className="pb-1 text-lg font-light uppercase tracking-[0.3em] text-wine-light">
          {count} {count === 1 ? "item" : "items"}
        </span>
      </header>

      {items.length === 0 ? (
        <div className="flex flex-col items-start gap-6 py-16">
          <p className="max-w-[34ch] text-lg font-light leading-snug tracking-[0.06em] text-white/75">
            Nothing in your bag yet. Start with the latest from ladies or
            gentlemen.
          </p>
          <Link
            href="/"
            className="group inline-flex items-center gap-4 border-b border-white/35 bg-black/25 px-7 py-3 text-lg font-light uppercase tracking-[0.3em] text-white transition-colors duration-300 hover:border-wine hover:bg-wine"
          >
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-12 lg:grid-cols-[1fr_420px] lg:gap-16">
          <section aria-label="Items in your bag">
            <ul>
              {items.map((i) => (
                <li
                  key={i.id}
                  className="flex gap-4 border-b border-white/8 py-6 first:pt-0 sm:gap-6"
                >
                  <div className="relative aspect-[3/4] w-24 shrink-0 overflow-hidden bg-[#151518] sm:w-32 md:w-36">
                    <Image
                      src={i.image ?? PLACEHOLDER}
                      alt={i.name}
                      fill
                      sizes="144px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h2 className="text-xl font-light uppercase tracking-[0.12em] text-white sm:text-2xl">
                          {i.name}
                        </h2>
                        <p className="mt-1 text-[17px] font-light tracking-[0.05em] text-foreground/55">
                          {i.variant}
                        </p>
                      </div>
                      <p className="shrink-0 text-xl font-light tracking-[0.05em] text-white sm:text-2xl">
                        {money(i.price * i.qty)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center border border-white/25">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${i.name}`}
                          onClick={() => setQty(i.id, i.qty - 1)}
                          className="flex h-9 w-9 items-center justify-center text-foreground/70 transition-colors duration-300 hover:text-white"
                        >
                          <Minus size={16} strokeWidth={1.25} />
                        </button>
                        <span
                          aria-live="polite"
                          className="w-8 text-center text-lg font-light text-white"
                        >
                          {i.qty}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${i.name}`}
                          onClick={() => setQty(i.id, i.qty + 1)}
                          className="flex h-9 w-9 items-center justify-center text-foreground/70 transition-colors duration-300 hover:text-white"
                        >
                          <Plus size={16} strokeWidth={1.25} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => remove(i.id)}
                        className={ghostBtn}
                      >
                        <X size={16} strokeWidth={1.25} />
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <Link href="/" className={`${ghostBtn} mt-8 w-fit`}>
              <ArrowLeft size={18} strokeWidth={1.25} />
              Continue shopping
            </Link>
          </section>

          <aside className="h-fit border border-white/10 p-6 lg:sticky lg:top-24">
            <h2 className={`${label} mb-6`}>Order summary</h2>

            <div className="mb-6">
              <p className="mb-3 text-[17px] font-light tracking-[0.05em] text-foreground/60">
                {remaining > 0
                  ? `Add ${money(remaining)} for free shipping`
                  : "You've unlocked free shipping"}
              </p>
              <div className="h-0.5 bg-white/15">
                <div
                  className="h-0.5 bg-wine-light transition-[width] duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <dl className="space-y-3 border-t border-white/8 pt-6">
              <Row name="Subtotal" value={money(subtotal)} />
              {applied && (
                <Row
                  name={`Promo ${PROMO_CODE}`}
                  value={`-${money(discount)}`}
                />
              )}
              <Row
                name="Shipping"
                value={shipping === 0 ? "Free" : money(shipping)}
              />
              <Row name="Tax" value="Calculated at checkout" />
            </dl>

            <form onSubmit={applyPromo} className="mt-6">
              <label htmlFor="promo" className="sr-only">
                Promo code
              </label>
              <div className="flex items-center border-b border-white/25 transition-colors focus-within:border-wine-light">
                <input
                  id="promo"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setPromoError("");
                  }}
                  placeholder="Promo code"
                  autoComplete="off"
                  className="w-full bg-transparent py-3 text-lg font-light uppercase tracking-[0.25em] text-white outline-none placeholder:text-foreground/35"
                />
                <button
                  type="submit"
                  className="px-2 text-[15px] font-light uppercase tracking-[0.25em] text-foreground/60 transition-colors duration-300 hover:text-white"
                >
                  Apply
                </button>
              </div>
              {promoError && (
                <p role="alert" className="mt-2 text-[15px] text-wine-light">
                  {promoError}
                </p>
              )}
            </form>

            <div className="mt-6 border-t border-white/8 pt-6">
              <dl>
                <Row name="Total" value={money(total)} strong />
              </dl>
            </div>

            <Link
              href="/checkout"
              className="mt-6 flex w-full items-center justify-center gap-3 bg-wine px-7 py-4 text-lg font-light uppercase tracking-[0.3em] text-white transition-[filter] duration-300 hover:brightness-125"
            >
              <Lock size={18} strokeWidth={1.25} />
              Checkout
            </Link>

            <p className="mt-4 text-center text-[15px] font-light tracking-[0.05em] text-foreground/40">
              Secure checkout · Easy 30-day returns
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}
