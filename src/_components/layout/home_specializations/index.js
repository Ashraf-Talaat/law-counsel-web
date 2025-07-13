import Image from "next/image";
import React from "react";

export default function index() {
  return (
    <div className="bg-[#1C202E] text-white p-10 grid text-center">
      <div className="text-[#C9B38C] p-4 col-span-full">
        <h2 className="text-2xl font-bold mb-4">تخصصاتنا</h2>
        <p className="mb-6">
          نقدم استشارات قانونية متخصصة في مجالات متعددة لضمان حصولك على أفضل
          النصائح القانونية.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className=" p-4 my-2">
          <Image
            src="/images/Handcuffs.png"
            alt="legal specialization"
            width={50}
            height={50}
            className="mx-auto"
          />
          <h3 className="text-lg font-semibold my-3">القانون الجنائي</h3>

          <p className="text-sm my-3">
            الدفاع في القضايا الجنائية مثل السرقة، القتل، المخدرات، التهديد
          </p>
        </div>
        <div className=" p-4 my-2">
          <Image
            src="/images/Family.png"
            alt="family specialization"
            width={50}
            height={50}
            className="mx-auto"
          />
          <h3 className="text-lg font-semibold my-3">قانون الأحوال الشخصية</h3>

          <p className="text-sm my-3">
            الزواج، الطلاق، النفقة، الحضانة، إثبات النسب
          </p>
        </div>
        <div className=" p-4 my-2">
          <Image
            src="/images/Labor.png"
            alt="Labor specialization"
            width={50}
            height={50}
            className="mx-auto"
          />
          <h3 className="text-lg font-semibold my-3">القانون المدني</h3>

          <p className="text-sm my-3">
            . التعويضات، العقود، المسؤولية المدنية، الدعاوى المالية
          </p>
        </div>
        <div className=" p-4 my-2">
          <Image
            src="/images/Permanent-Job.png"
            alt="legal specialization"
            width={50}
            height={50}
            className="mx-auto"
          />
          <h3 className="text-lg font-semibold my-3">القانون الإداري</h3>

          <p className="text-sm my-3">
            قضايا الموظفين ضد الجهات الحكومية، القرارات الإدارية، التظلمات.
          </p>
        </div>
        <div className=" p-4 my-2">
          <Image
            src="/images/IncomeTax.png"
            alt="legal specialization"
            width={50}
            height={50}
            className="mx-auto"
          />
          <h3 className="text-lg font-semibold my-3">قانون العمل</h3>

          <p className="text-sm my-3">
            مشاكل العاملين، الفصل التعسفي، التعويض، العقود، التأمينات
          </p>
        </div>
        <div className=" p-4 my-2">
          <Image
            src="/images/Skyscrapers.png"
            alt="legal specialization"
            width={50}
            height={50}
            className="mx-auto"
          />
          <h3 className="text-lg font-semibold my-3">القانون التجاري</h3>

          <p className="text-sm my-3">
            تأسيس الشركات، الإفلاس، النزاعات التجارية، العلامات التجارية.
          </p>
        </div>
      </div>
      <div className="text-[#C9B38C] p-4 col-span-full">
        <button className="btn bg-[#C9B38C] hover:bg-[#b69d75] my-2">
         مزيد من التخصصات
        </button>
      </div>
    </div>
  );
}
