import React from "react";
import Image from "next/image";

//icons
import { HomeIcon } from "@heroicons/react/24/solid";

export default function index() {
  return (
    <>
      <div className="container  mx-auto my-20 px-4 py-8 bgPrimary">
        <h1 className="text-4xl font-bold mb-1 goldTxt flex items-center justify-start">
          <HomeIcon className="w-15 h-15 text-primary text-white bgBtn p-2 me-2 rounded-full border-5" />{" "}
          نموذج الاتصال
        </h1>
        <div className="flex items-center justify-around">
          <form className="w-full max-w-lg p-8 ">
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2 goldTxt"
                htmlFor="name"
              >
                الاسم
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-primary text-gray-100"
                placeholder="أدخل اسمك"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2 goldTxt"
                htmlFor="email"
              >
                البريد الإلكتروني
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-primary text-gray-100"
                placeholder="أدخل بريدك الإلكتروني"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2 goldTxt"
                htmlFor="message"
              >
                الرسالة
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-primary text-gray-100"
                placeholder="اكتب رسالتك هنا..."
              />
            </div>
            <button
              type="submit"
              className="w-full bgBtn text-white font-bold py-2 px-4 rounded hover:bgBtnHover transition duration-200"
            >
              إرسال
            </button>
          </form>

          <div className="w-full max-w-md hidden md:flex justify-center items-center">
            <Image
              src="/images/contactUsImg.png"
              alt="img of contact us"
              width={300}
              height={500}
              className="mt-8"
            />
          </div>
        </div>
      </div>
    </>
  );
}