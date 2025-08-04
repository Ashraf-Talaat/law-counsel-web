"use client";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

//Icons
import { TrashIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

//logic
import getAllRequests from "@/logic/consultations/lawyer/getAllRequests";
import approveRequest from "@/logic/consultations/lawyer/approveRequest";
import rejectRequest from "@/logic/consultations/lawyer/rejectRequest";

//alert
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

export default function Page() {
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const r = async () => {
      const data = await getAllRequests("5oUmpSlGVTX2AsQoSlUpsUsWxi83");
      setRequests(data);
      console.log(data);
    };
    r();
  }, []);
  if (requests.length == 0) {
    return (
      <>
        <div className="bg-white rounded-md shadow-md p-6 w-[85%] mx-auto ">
          <h2 className="text-xl font-bold mb-6 goldTxt">طلباتي</h2>
          <div className="space-y-6">
            <p>لا توجد طلبات</p>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="bg-white rounded-md shadow-md p-6 w-[85%] mx-auto ">
          <h2 className="text-xl font-bold mb-6 goldTxt">طلباتي</h2>
          <Toaster />
          <div className="space-y-6">
            {requests.map((item) => (
              <div
                key={item.id}
                className=" rounded-md p-4 bg-gray-100 shadow-md"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold">
                    عنوان الاستشارة : {item.title}
                  </p>
                  <span className="text-sm text-white bg-yellow-500 px-2.5 p-1.5 rounded-full">
                    {item.status === "pending" ? "قيد الانتظار" : "تم الانتهاء"}
                  </span>
                </div>
                <p className="text-gray-700 mb-3">
                  محتوى الطلب: {item.description}
                </p>
                <p className="font-semibold ">اسم العميل</p>

                <div className="flex justify-end gap-4">
                  <button
                    onClick={async () => {
                      const result = await approveRequest(
                        item.id,
                        item.userId,
                        item.lawyerId
                      );
                      if (result.success) {
                        toast.success("تم موافقة علي طلب الاستشارة");
                      } else {
                        toast.error("حصل خطأ");
                      }
                    }}
                    type="button"
                    className="flex items-center gap-2 text-green-600 hover:text-white border border-green-700 hover:bg-green-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-500 dark:focus:ring-green-800"
                  >
                    <CheckCircleIcon className="w-6 h-6 " />
                    قبول
                  </button>

                  <button
                    onClick={async () => {
                      const result = await rejectRequest(item.id);
                      if (result.success) {
                        toast.success("تم الرفض علي طلب الاستشارة");
                      } else {
                        toast.error("حصل خطأ");
                      }
                    }}
                    type="button"
                    className="flex items-center gap-2 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    <TrashIcon className="w-5 h-5" />
                    رفض
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}
