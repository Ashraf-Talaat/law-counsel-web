import React from "react";
import MainNav from "../navbar/mainNav.js";
import HomeFeatures from "@/_components/layout/homeFeatures";
export default function index() {
  return (
    <div className="">
      <div className="hero  w-full relative min-h-screen bg-[url('/images/hero-bg.png')] bg-cover bg-center">
        <div className="absolute top-0 left-[5%] bg-transparent text-white z-50 w-[90%]">
          <MainNav />
        </div>

        <div className="hero-overlay bg-[url('/images/Rectangle.png')]"></div>

        <div className="hero-content flex justify-start items-end text-right text-white z-10 w-full">
          <div className="max-w-xl w-[85%]">
            <h1 className="text-5xl font-bold">مشاكلك القانونية ليها حل</h1>
            <p className="py-6">
              بنقف دايمًا مع الحق، وندافع عنه بكل شجاعة. احنا ضد أي استغلال أو
              تلاعب، وهدفنا <br />
              إن العدالة توصل لكل واحد محتاجها.
            </p>
            <button className="px-4 mx-1.5 py-1.5 cursor-pointer rounded border text-white border-bgBtn bg-transparent hover:bg-[#c9b38c] hover:text-[#ffffff] transition">
              اسأل شات بوت
            </button>
            <button className="px-4 mx-1.5 py-1.5 cursor-pointer rounded bg-[#c9b38c] hover:bg-[#b69d75]">
              ابدأ استشارتك
            </button>
          </div>
        </div>
      </div>
      <HomeFeatures />
    </div>
  );
}
