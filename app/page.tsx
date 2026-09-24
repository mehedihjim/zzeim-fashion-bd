import React from "react";
import Hero from "./components/homepage/Hero";
import Ladies from "./components/homepage/Ladies";
import SmoothScroll from "./components/SmoothScroll";

const page = () => {
  return (
    <>
      <main>
        <Hero />
        <Ladies />
      </main>
      <SmoothScroll />
    </>
  );
};

export default page;
