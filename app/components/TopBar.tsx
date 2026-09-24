"use client";

import { useEffect, useState } from "react";

const messages = [
  "Free shipping on your first order",
  "New season drop is live now",
  "Easy 30-day returns, no questions asked",
];

export default function TopBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative z-50 border-b border-wine/40 bg-wine-deep text-blush">
      <div className="h-8 overflow-hidden">
        <ul
          className="transition-transform duration-500 ease-in-out motion-reduce:transition-none"
          style={{ transform: `translateY(-${index * 2}rem)` }}
        >
          {messages.map((message, i) => (
            <li
              key={message}
              aria-hidden={i !== index}
              className="flex h-8 items-center justify-center px-4 text-[13px] uppercase tracking-[0.12em]"
            >
              {message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
