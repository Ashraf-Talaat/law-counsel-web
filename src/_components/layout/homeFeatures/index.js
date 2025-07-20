import React from "react";
import Image from "next/image";

export default function index() {
  return (
    <div className=" hidden sm:flex mx-auto w-[70%] items-center text-center absolute left-1/2  -translate-x-1/2 -translate-y-1/2 ">
  <div className="bg-[#262b3e] text-white p-10 sm:p-4 md:p-6 text-sm sm:text-xs">
    <Image
      src="/images/book.png"
      alt="book icon"
      width={60}
      height={60}
      className="mb-4 mx-auto w-[30px] sm:w-[40px] md:w-[60px]"
    />
    <p>تواصل مباشرة مع محاميين متخصصيين في مختلف المجالات القانونية</p>
  </div>

  <div className="bg-[#1c202e] text-white p-10  sm:p-4 md:p-6 text-sm sm:text-xs">
    <Image
      src="/images/hummer.png"
      alt="Hero Background"
      width={60}
      height={60}
      className="mb-4 mx-auto w-[30px] sm:w-[40px] md:w-[60px] "
    />
    <p>تواصل مباشرة مع محاميين متخصصيين في مختلف المجالات القانونية</p>
  </div>

  <div className="bg-[#262b3e] text-white p-10 sm:p-4 md:p-6 text-sm sm:text-xs">
    <Image
      src="/images/temple.png"
      alt="Hero Background"
      width={60}
      height={60}
      className="mb-4 mx-auto w-[30px] sm:w-[40px] md:w-[60px]"
    />
    <p>تواصل مباشرة مع محاميين متخصصيين في مختلف المجالات القانونية</p>
  </div>
</div>

  );
}
