import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";

type Item = { label: string; href?: string };

const help: Item[] = [
  { label: "Contact Us", href: "/contact" },
  { label: "My Order", href: "/account/orders" },
  { label: "FAQs", href: "/faq" },
  { label: "Email Unsubscribe", href: "/newsletter/unsubscribe" },
  { label: "Sitemap", href: "/sitemap" },
];

const company: Item[] = [
  { label: "About ZZEIM", href: "/about" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Code of Ethics", href: "/code-of-ethics" },
  { label: "Careers", href: "/careers" },
  { label: "Legal", href: "/legal" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/privacy#cookies" },
  { label: "Cookies Settings" },
  { label: "Corporate Information", href: "/corporate-information" },
  {
    label: "Vulnerability Disclosure Policy",
    href: "/vulnerability-disclosure",
  },
];

const services: Item[] = [
  { label: "Discover Our Services", href: "/services" },
  { label: "Book an Appointment", href: "/appointments" },
  { label: "Collect In Store", href: "/collect-in-store" },
];

const countries = [
  "United States",
  "United Kingdom",
  "United Arab Emirates",
  "India",
  "Bangladesh",
];

const heading =
  "mb-5 block text-[15px] font-normal uppercase tracking-[0.3em] text-white";
const linkCls =
  "block py-1 text-[17px] font-light tracking-[0.05em] text-foreground/55 transition-colors duration-300 hover:text-white";
const fieldCls =
  "w-full bg-transparent py-3 text-lg font-light uppercase tracking-[0.25em] text-white outline-none";

function LinkList({ items }: { items: Item[] }) {
  return (
    <ul>
      {items.map(({ label, href }) => (
        <li key={label}>
          {href ? (
            <Link href={href} className={linkCls}>
              {label}
            </Link>
          ) : (
            <button type="button" className={`${linkCls} text-left uppercase`}>
              {label}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/8 bg-black text-foreground">
      <div className="w-full px-4 pb-6 pt-8 md:px-6 lg:px-8">
        <svg
          viewBox="0 0 1000 130"
          role="img"
          aria-label="ZZEIM Fashion"
          className="block w-full overflow-visible font-sans"
        >
          <text
            x="0"
            y="118"
            textLength="1000"
            lengthAdjust="spacing"
            fontSize="150"
            fontWeight="300"
            className="fill-wine"
          >
            ZZEIM FASHION
          </text>
        </svg>
      </div>

      <div className="mx-auto max-w-[2100px] px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 border-t border-white/8 py-12 md:grid-cols-3 lg:grid-cols-12">
          <div className="lg:col-span-2">
            <h3 className={heading}>May we help you?</h3>
            <LinkList items={help} />
          </div>

          <div className="lg:col-span-3">
            <h3 className={heading}>The company</h3>
            <LinkList items={company} />
          </div>

          <div className="col-span-2 md:col-span-1 lg:col-span-3">
            <h3 className={heading}>ZZEIM services</h3>
            <LinkList items={services} />

            <h3 className={`${heading} mt-10`}>Store locator</h3>
            <Link
              href="/stores"
              className="group flex items-center justify-between border-b border-white/25 py-3 text-lg font-light uppercase tracking-[0.25em] text-foreground/60 transition-colors duration-300 hover:border-wine-light hover:text-white"
            >
              Country/Region, City
              <ArrowUpRight
                size={20}
                strokeWidth={1.25}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <div className="col-span-2 md:col-span-3 lg:col-span-4">
            <h3 className={heading}>Sign up for ZZEIM updates</h3>
            <p className="mb-6 max-w-[44ch] text-[17px] font-light leading-snug tracking-[0.05em] text-foreground/55">
              Get exclusive updates on the collection&apos;s launch,
              personalised communication and the latest news from ZZEIM.
            </p>

            <form
              action="/newsletter/subscribe"
              method="post"
              className="flex items-center border-b border-white/25 transition-colors focus-within:border-wine-light"
            >
              <label htmlFor="footer-email" className="sr-only">
                Email
              </label>
              <input
                id="footer-email"
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="Email"
                className={`${fieldCls} placeholder:text-foreground/35`}
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="p-2 text-foreground/60 transition-colors duration-300 hover:text-white"
              >
                <ArrowRight size={20} strokeWidth={1.25} />
              </button>
            </form>

            <div className="mt-10">
              <label htmlFor="footer-country" className={heading}>
                Country/Region
              </label>
              <div className="relative border-b border-white/25">
                <select
                  id="footer-country"
                  defaultValue="United States"
                  className={`${fieldCls} appearance-none pr-8`}
                >
                  {countries.map((c) => (
                    <option key={c} value={c} className="bg-black">
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={18}
                  strokeWidth={1.25}
                  aria-hidden
                  className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-foreground/60"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/8">
        <p className="mx-auto max-w-[2100px] px-4 py-3 text-sm font-light uppercase tracking-[0.25em] text-foreground/40 md:px-6 lg:px-8">
          © {year} ZZEIM® Fashion. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
