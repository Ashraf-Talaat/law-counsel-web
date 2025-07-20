import Image from "next/image";
import React from "react";
import {
  HandThumbUpIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import  HeroOther  from '@/_components/layout/hero-other';

export default function page() {
  return (
    <>
      {/* start post */}
       <HeroOther
        title="احدث مقالاتي"
        description="  كتشف أحدث المقالات القانونية التي تبسط لك المفاهيم وتساعدك تفهم حقوقك بشكل أوضح"
        showInput={false}
       ></HeroOther>
      <div className="flex justify-center p-6 bgLayout">
        <div className="max-w-xl bg-white border border-gray-200 rounded-lg shadow-lg">
          <Image
            className="rounded-t-lg object-cover"
            src="/images/egyption_dustor.png"
            alt=""
            width={600}
            height={100}
          />

          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-600">
              عنوان المقالة القانونية
            </h5>
            <p className="mb-3 font-normal subTxt">
              استكشف أحدث المقالات القانونية التي تغطي مواضيع متنوعة من حقوقك
              القانونية إلى النصائح العملية للتعامل مع القضايا القانونية.
              مقالاتنا مصممة لتكون سهلة الفهم وتقدم معلومات موثوقة من قبل
              المحامين المتخصصين.
            </p>
            <div className="flex justify-between align-middle">
              <a
                href="#"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bgBtn rounded-lg hover:bgBtnHover focus:ring-4 focus:outline-none focus:bgBtnHover"
              >
                قراءة المزيد
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>

              <div className="flex gap-8 mt-4 subTxt">
                {/* Like Icon */}
                <button className="flex items-center gap-1 hover:text-primary">
                  <HandThumbUpIcon className="w-5 h-5" />
                  <span>12</span>
                </button>

                {/* Comment Icon */}
                <button className="flex items-center gap-1 hover:text-primary">
                  <ChatBubbleBottomCenterTextIcon className="w-5 h-5" />
                  <span>4</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end post */}

      {/* start button to add post */}
      <div className="fixed bottom-25 left-25 z-50">
        <div className="tooltip tooltip-right" data-tip="إنشاء بوست جديد">
          <label
            className="flex items-center justify-center text-white bgBtn rounded-lg w-14 h-14 hover:bgBtnHover focus:ring-4 focus:outline-none focus:bgBtnHover"
            htmlFor="create-post-modal"
          >
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m13.835 7.578-.005.007-7.137 7.137 2.139 2.138 7.143-7.142-2.14-2.14Zm-10.696 3.59 2.139 2.14 7.138-7.137.007-.005-2.141-2.141-7.143 7.143Zm1.433 4.261L2 12.852.051 18.684a1 1 0 0 0 1.265 1.264L7.147 18l-2.575-2.571Zm14.249-14.25a4.03 4.03 0 0 0-5.693 0L11.7 2.611 17.389 8.3l1.432-1.432a4.029 4.029 0 0 0 0-5.689Z" />
            </svg>
          </label>

          <input
            type="checkbox"
            id="create-post-modal"
            className="modal-toggle"
          />
          <div className="modal">
            <div className="modal-box w-11/12 max-w-2xl">
              <h3 className="font-bold text-lg">إنشاء بوست جديد</h3>
              <div className="py-4">
                <input
                  type="text"
                  placeholder="عنوان البوست"
                  className="input input-bordered w-full mb-3 "
                />
                <textarea
                  className="textarea textarea-bordered w-full mb-3 outline-none"
                  placeholder="محتوى البوست"
                ></textarea>
                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered w-full mb-3"
                />
                <label className="btn bgBtn text-white hover:bgBtnHover cursor-pointer">
                  اختر صورة
                  <input type="file" accept="image/*" className="hidden" />
                </label>
              </div>

              <div className="modal-action gap-8">
                <button className="btn bgBtn text-white px-6">نشر</button>
                <label htmlFor="create-post-modal" className="btn">
                  إغلاق
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end button to add post */}
    </>
  );
}
