import React from "react";
import Hero from "./components/homepage/Hero";
import Ladies from "./components/homepage/Ladies";
import SmoothScroll from "./components/SmoothScroll";
import Gentlemen from "./components/homepage/Gentlemen";

const page = () => {
  return (
    <>
      <main>
        <Hero />
        <Ladies />
        <Gentlemen />
      </main>
      <SmoothScroll />
    </>
  );
};

export default page;
