import React from "react";
import Image from "next/image";

export default function index() {
  return (
    <div className="flex mx-auto w-[70%] items-center text-center absolute left-[50%] -translate-x-1/2 -translate-y-1/2 ">
      <div className="bg-[#262b3e] text-white p-10  ">
        <Image
          src="/images/book.png"
          alt="book icon"
          width={60}
          height={60}
          //   layout="fill"
          // objectFit="cover"
          className="mb-4 mx-auto"
        />
        <p>تواصل مباشرة مع محاميين متخصصيين في مختلف المجالات القانونية</p>
      </div>
      <div className="bg-[#1c202e] text-white p-10  ">
        <Image
          src="/images/hummer.png"
          alt="Hero Background"
          width={60}
          height={60}
          //   layout="fill"
          // objectFit="cover"
          className="mb-4 mx-auto"
        />
        <p>تواصل مباشرة مع محاميين متخصصيين في مختلف المجالات القانونية</p>
      </div>
      <div className="bg-[#262b3e] text-white p-10 ">
        <Image
          src="/images/temple.png"
          alt="Hero Background"
          width={60}
          height={60}
          //   layout="fill"
          // objectFit="cover"
            className="mb-4 mx-auto"
        />
        <p>تواصل مباشرة مع محاميين متخصصيين في مختلف المجالات القانونية</p>
      </div>
    </div>
  );
}
