import React from "react";
//Icons
import { TrashIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/outline";

export default function page() {
  return (
    <>
      <div className="bg-white rounded-md shadow-md p-6 w-[85%] mx-auto ">
        <h2 className="text-xl font-bold mb-6 goldTxt">طلباتي</h2>
        <div className="space-y-6">
          {[1, 2].map((id) => (
            <div key={id} className=" rounded-md p-4 bg-gray-100 shadow-md">
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold">عنوان الاستشارة</p>
                <span className="text-sm text-white bg-yellow-500 px-2 py-1 rounded-full">
                  معلقة
                </span>
              </div>
              <p className="text-gray-700 mb-3">
                محتوى الطلب: أنا عايز استشارة بخصوص
              </p>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="flex items-center gap-2 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  <TrashIcon className="w-5 h-5" />
                  حذف
                </button>

                <button
                  type="button"
                  className="flex items-center gap-2 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                >
                  <PencilIcon className="w-5 h-5" />
                  تعديل
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
