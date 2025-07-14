import React from "react";
//icons
import { ScaleIcon, UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function index() {
  return (
    <>
      <div className="flex items-center justify-center  mx-auto my-20 bg-gray-100 p-10 rounded-lg shadow-lg">
        <div className="max-w-4xl w-full h-96 bgPrimary text-white p-6 shadow-lg">
          <ScaleIcon className="w-15 h-15 text-white bgBtn p-1 border-4 rounded-b-full" />
          <h2 className="text-3xl font-bold mb-6 text-center">تسجيل كمحام</h2>
          <p className="text-lg mb-4 text-center leading-10">
            انضم كمحامٍ وابدأ في تقديم الاستشارات القانونية للعملاء عبر منصتنا.
            قم بإدارة ملفك الشخصي، تسلّم الطلبات، وتواصل مع العملاء بسهولة. تابع
            تقييمات العملاء، وابدأ في بناء سمعتك المهنية
          </p>

          <Link href="register/lawyer">
            <button className="bgBtn text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-700 transition duration-300">
              سجّل كمحامٍ{" "}
            </button>
          </Link>
        </div>
        <div className="max-w-4xl w-full h-96 bg-white p-6 shadow-lg ">
          <UserIcon className="w-17 h-17 bgPrimary goldTxt p-1.5 border-4 rounded-full" />
          <h2 className="text-3xl font-bold mb-6 text-center">تسجيل كعميل</h2>
          <p className="text-lg mb-4 text-center leading-10">
            ابحث عن أفضل المحامين واطلب استشارة قانونية بكل سهولة. مش متأكد نوع
            قضيتك؟ اسأل الشات بوت وهيساعدك تحدد نوع المشكلة القانونية قبل ما
            تختار المحامي المناسب.{" "}
          </p>
          <Link href="register/user">
            <button className="bgPrimary goldTxt px-4 py-2 rounded-lg mt-4 hover:bg-[#b69d75] transition duration-300">
              سجّل كعميل{" "}
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
