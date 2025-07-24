import React from "react";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
export default function UserProfileInfo() {
  return (
  <>
    <div className="flex justify-center mt-[-10rem] mb-7 z-20 relative">
            <Image
              src="/images/lawyer.jpg"
              alt="User"
              width={180}
              height={180}
              className="rounded-full border-4 border-[#C9B38C]"
            />
            </div>
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
            <h5>الهاتف :</h5>
            <h2 className="text-2xl"> 01281898778</h2>
            <hr />
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-8 ">
        <button className="flex items-center gap-5 bg-[#C9B38C] hover:bg-[#b69d75] text-white px-4 py-2 rounded-lg cursor-pointer">
          تسجيل الخروج
          <ArrowLeftEndOnRectangleIcon className="h-5 w-5" />
        </button>
        <button className="flex items-center gap-5 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg cursor-pointer">
          مسح الأكونت
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </>
  );
}
