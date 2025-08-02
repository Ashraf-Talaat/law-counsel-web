import React from "react";
import Image from "next/image";
import { PencilIcon } from "@heroicons/react/24/solid";
export default function MyInfoProfile() {
  const achievements = [
    "حصلت على حكم بالبراءة في 12 قضية جنائية كبرى.",
    "تعاملت مع أكثر من 100 استشارة قانونية بنجاح.",
    "خبرة في المحاكم الجنائية لأكثر من 7 سنوات.",
    "ساعدت في حل نزاعات قانونية بمبالغ تتجاوز 2 مليون جنيه.",
    "تم توكيلها من قبل شركات معروفة في قضايا جنائية حساسة.",
    "حصلت على تقييم - 4.9 من عملاء سابقين.",
    "عضو نقابة المحامين بمحافظة الشرقية - مرخصة منذ 2020"
  ];
  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-4 text-right max-w-3xl mx-auto mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
          <div className="m-5 p-4 space-y-3">
            <h5>الإسم :</h5>
            <h2 className="text-2xl"> عبدالرحمن فوزى نصر محمود</h2>
            <hr />
          </div>
          <div className="m-5 p-4 space-y-3">
            <h5>البريد الإلكترونى :</h5>
            <h2 className="text-2xl"> abdofawzy185@gmail.com</h2>
            <hr />
          </div>
          <div className="m-5 p-4 space-y-3">
            <h5>نبذة عنى :</h5>
            <h2 className="text-2xl">محامى توب التوب والباقى فوتوشوب</h2>
            <hr />
          </div>
          <div className="m-5 p-4 space-y-3">
            <h5>الهاتف :</h5>
            <h2 className="text-2xl"> 01281898778</h2>
            <hr />
          </div>
          <div className="m-5 p-4 space-y-3">
            <h5>المدينة :</h5>
            <h2 className="text-xl"> ميت غمر </h2>
            <hr />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 mb-2">
          <div className="m-5 p-4 space-x-3">
            <h5 className="mb-5"> مجال التخصص</h5>
            <span className="bg-[#C9B38C] text-white px-3 py-1 rounded-full ">
              {" "}
              قانون مدنى{" "}
            </span>
            <span className="bg-[#C9B38C]  text-white px-3 py-1 rounded-full ">
              قانون جنائى{" "}
            </span>
            <button className="bg-[#C9B38C] hover:bg-[#b69d75] text-white px-3 py-1 rounded-full cursor-pointer">
              +
            </button>
          </div>
          <div className="m-5 p-4 space-x-3">
            <h5 className="mb-5"> سعر الخدمة </h5>
            <span className="bg-[#C9B38C] text-white px-3 py-1 rounded-full ">
              {" "}
              500 جنية
            </span>
            <span className="bg-[#C9B38C]  text-white px-3 py-1 rounded-full ">
              300 جنية{" "}
            </span>
            <button className="bg-[#C9B38C] hover:bg-[#b69d75] text-white px-3 py-1 rounded-full cursor-pointer">
              +
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-2">
          <div className="m-5 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h5 className="text-lg font-medium">البطاقة الشخصية</h5>
              <PencilIcon className="w-5 h-5 text-gray-600" />
            </div>

            <Image
              src="/images/id.png"
              alt="User"
              width={300}
              height={150}
              className="rounded-lg border"
            />
          </div>

          <div className="m-5 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h5 className="text-lg font-medium">صورة الكارنيه</h5>
              <PencilIcon className="w-5 h-5 text-gray-600" />
            </div>

            <Image
              src="/images/card.png"
              alt="User"
              width={300}
              height={150}
              className="rounded-lg border"
            />
          </div>
        </div>
      </div>
<div className="bg-white rounded-lg shadow-md p-4 text-right max-w-3xl mx-auto my-9   ">
  <div className="flex justify-between items-center m-3 p-5">
    <h1 className="text-xl font-bold">إنجازاتي</h1>
    <button className="bg-[#C9B38C] hover:bg-[#b69d75] text-white  px-3 py-1 rounded-full cursor-pointer">
      أضف إنجازاً
    </button>
  </div>
  <ul className="list-disc list-inside m-3 p-5 space-y-2">
    {achievements.map((achievement, index) => (
      <li key={index} className="text-gray-700">
        {achievement}
      </li>
    ))}
  </ul>
</div>
    </>
  );
}
