import React from "react";
import { ScaleIcon, UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export function RegisPopup({ onClose, isPopup = true }) {
  return (
    <div
      className={`${
        isPopup
          ? "fixed inset-0 z-50 text-[#262b3e] bg-[#00000059]  bg-opacity-50 flex justify-center items-center overflow-y-auto"
          : "relative flex justify-center bg-[#eee] p-10 items-center  mb-17 "
      }`}
    >
      <div className="relative bg-white text-lg max-w-4xl   rounded-lg   sm:p-6 md:p-10">
       
        {isPopup && (
          <>
            <h2 className="mb-4 font-bold">برجاء الاختيار</h2>
            <button
              onClick={() => {
                console.log("closing popup");
                onClose?.();
              }}
              className="absolute top-2 left-3 text-3xl font-bold text-gray-600 hover:text-red-500"
            >
              ×
            </button>
          </>
        )}

        {/* كروت التسجيل تظهر دايمًا */}
        <div className="flex flex-col  md:flex-row items-center justify-center mt-4">
          {/* كرت المحامي */}
          <div className="w-full md:w-1/2 bgPrimary text-white p-4 sm:p-6 shadow-lg rounded-lg h-auto">
            <ScaleIcon className="w-12 h-12 sm:w-14 sm:h-14 text-white bgBtn p-1 border-4 rounded-b-full mx-auto" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">
              تسجيل كمحام
            </h2>
            <p className="text-sm sm:text-base md:text-lg mb-4 text-center leading-8">
              انضم كمحامٍ وابدأ في تقديم الاستشارات القانونية للعملاء عبر
              منصتنا...
            </p>
            <Link href="/register/lawyer">
              <button className="bg-[#c9b38c] cursor-pointer text-white px-4 py-2 rounded-lg mt-2 hover:bg-[#b69d75] transition duration-300 mx-auto block">
                سجّل كمحامٍ
              </button>
            </Link>
          </div>

          {/* كرت العميل */}
          <div className="w-full md:w-1/2 bg-white p-4 sm:p-6  rounded-lg h-auto">
            <UserIcon className="w-12 h-12 sm:w-14 sm:h-14 bgPrimary goldTxt p-1.5 border-4 rounded-full mx-auto" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">
              تسجيل كعميل
            </h2>
            <p className="text-sm sm:text-base md:text-lg mb-4 text-center leading-8">
              ابحث عن أفضل المحامين واطلب استشارة قانونية بكل سهولة...
            </p>
            <Link href="/register/user">
              <button className="bg-[#262b3e] cursor-pointer text-white px-4 py-2 rounded-lg mt-2 hover:bg-[#1c202e] transition duration-300 mx-auto block">
                سجّل كعميل
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
