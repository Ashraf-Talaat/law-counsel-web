import React from "react";
import MainNav from "../navbar/mainNav.js";
export default function index() {
  return (
    <div>
      <div className="hero relative min-h-screen bg-[url('/images/hero-bg.png')] bg-cover bg-center">
        <MainNav />
        <div className="hero-overlay bg-[url('/images/Rectangle.png')]"></div>

        <div className="hero-content flex justify-start items-end text-right text-white z-10 w-full">
          <div className="max-w-xl w-[85%]">
            <h1 className="text-5xl font-bold">مشاكلك القانونية ليها حل</h1>
            <p className="py-6">
              بنقف دايمًا مع الحق، وندافع عنه بكل شجاعة. احنا ضد أي استغلال أو
              تلاعب، وهدفنا <br />
              إن العدالة توصل لكل واحد محتاجها.
            </p>
            <button className="px-4 mx-1.5 py-1.5 rounded border text-white border-bgBtn bg-transparent hover:bg-bgBtn hover:text-black transition">
              اسأل شات بوت
            </button>
            <button className="px-4 mx-1.5 py-1.5 rounded bgBtn">
              ابدأ استشارتك
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}
