import Image from "next/image";
import React from "react";

export default function index() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-10 my-28">
      <div className="flex flex-col items-start justify-center w-full lg:w-1/2">
        <h4 className="text-[#C9B38C] font-semibold text-1xl my-2">
          اخر الاخبار
        </h4>
        <h4 className="font-semibold text-2xl my-2">
          اطّلع على أحدث المقالات القانونية من نخبة المحامين
        </h4>
        <p className="my-2">
          تابع آخر المقالات والنصائح القانونية من نخبة المحامين والمتخصصين.
          معلومات موثوقة ومبسطة لمساعدتك على فهم حقوقك والتعامل مع القضايا
          القانونية بثقة.
        </p>
        <button className="btn bg-[#C9B38C] hover:bg-[#b69d75] my-2">قراءة المزيد</button>
      </div>
      <div className="relative">
        <Image
          src="/images/egyption_dustor.png"
          alt="egyption_dustor"
          width={450}
          height={450}
          className=" h-auto"
        />
        <div className="hero-overlay bg-[#262B3E]/20 absolute top-0 right-0 bottom-0 left-0"></div>
      </div>
    </div>
  );
}
