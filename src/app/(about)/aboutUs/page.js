import React from "react";
import HeroOther from "@/_components/layout/hero-other";
import About from "@/_components/layout/aboutus";
export default function page() {
  return (
    <div>
      <HeroOther
        title="من نحن"
        description="نبذه عن الموقع"
        showInput={false}
      />
      <div className="w-[85%] mx-auto my-20">
        <About />
      </div>
    </div>
  );
}
