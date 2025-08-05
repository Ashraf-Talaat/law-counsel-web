"use client";
import React, { useEffect, useState } from "react";

//Icons
import { TrashIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/outline";

//logic
import getMyRequests from "@/logic/consultations/client/getMyRequests";
import DeleteRequest from "@/logic/consultations/client/deleteRequest";

//alert
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

export default function Page() {
  const [requests, setRequests] = useState([]);

  //get all requests
  useEffect(() => {
    const req = async () => {
      const result = await getMyRequests("V16E4Wi1pNSZdZFQhT896gm2jU73");
      setRequests(result);
    };
    req();
  }, []);

  //delete request method
  const handleDeleteRequest = async (requestId) => {
    const result = await Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لن تتمكن من التراجع عن هذا!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "نعم، احذفه!",
      cancelButtonText: "إلغاء",
    });

    if (result.isConfirmed) {
      Swal.fire({
        title: "جارٍ الحذف...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      //delete request
      try {
        await DeleteRequest(requestId);
        Swal.close();
        Swal.fire("تم الحذف!", "تم حذف الطلب بنجاح.", "success");
      } catch (error) {
        Swal.fire("خطأ", "حدث خطأ أثناء الحذف.", "error");
      }

      //update UI
      setRequests(requests.filter((item) => item.id !== requestId));
    }
  };

  //check if there is requests or not
  if (requests.length === 0) {
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
                <p className="font-semibold">اسم المحامي: {item.lawyerId}</p>

                {/* buttons of edit and delete */}
                <div className="flex justify-end gap-4">
                  {/* edit button  */}
                  <button
                  
                    type="button"
                    className="flex items-center gap-2 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                  >
                    <PencilIcon className="w-5 h-5" />
                    تعديل
                  </button>

                  {/* deleted button  */}
                  <button
                    onClick={() => handleDeleteRequest(item.id)}
                    type="button"
                    className="flex items-center gap-2 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    <TrashIcon className="w-5 h-5" />
                    حذف
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
