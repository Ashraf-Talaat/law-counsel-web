import React from "react";
import LawyerNav from "../navbar/lawyerNav";

export default function LawyerHero({ title, description }) {
  return (
    <div className="">
      <div className="hero h-[55vh] w-full relative  bg-[url('/images/hero-bg.png')] bg-cover bg-center">
        <div className="absolute top-0 left-[5%] bg-transparent text-white z-50 w-[90%]">
          <LawyerNav />
        </div>
        <div className="hero-overlay  bg-[url('/images/Rectangle.png')]"></div>

        <div className="">
          <div className=" mt-15 flex text-center items-center justify-center flex-col  text-white z-10 ">
            <h1 className="text-5xl font-bold"> {title}</h1>
            <p className="py-6">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
