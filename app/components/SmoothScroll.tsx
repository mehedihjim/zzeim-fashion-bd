"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import Snap from "lenis/snap";
import "lenis/dist/lenis.css";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true, anchors: true });

    const snap = new Snap(lenis, {
      type: "mandatory",
      duration: 1.6,
      easing: (t) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    });

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main > section"),
    );

    snap.addElements(sections, { align: "start" });

    const footer = document.querySelector<HTMLElement>("body > footer");
    if (footer) snap.addElement(footer, { align: "end" });

    return () => {
      snap.destroy();
      lenis.destroy();
    };
  }, []);

  return null;
}
