"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

//Icons
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

//logic
import getAllChats from "@/logic/consultations/client/getAllChats";

export default function Page() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unsubscribe = getAllChats("0hPemfz1O8Xd3RoEIyJ5GqO4BoH3", (chat) => {
      setChats(chat);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="bg-white rounded-md shadow-md p-6 w-[85%] mx-auto ">
        <div className="flex flex-col lg:flex-row justify-around gap-6">
          {/*list of lawyers*/}
          <div className="w-full md:w-1/2 sm:w-1/2 p-5 rounded-md bg-gray-100 shadow-md ">
            <h2 className="text-xl font-bold mb-4 goldTxt">المحامين</h2>
            <ul className="space-y-4">
              {chats.map((ele) => (
                <li
                  key={ele.lawyerId}
                  className="flex items-center gap-3 p-3 bg-white rounded-md cursor-pointer hover:bg-gray-200 "
                >
                  <Image
                    src="/images/lawyer.jpg"
                    alt="محامي"
                    className="w-10 h-10 rounded-full "
                    width={40}
                    height={40}
                  />

                  <div>
                    <p className="font-semibold mb-1">اسم المحامي: zohraaaa</p>
                    <p className="text-sm subTxt "> {ele.lastMessage}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* chat */}
          <div className="w-full md:w-1/2 sm:w-1/2 h-[500px] p-6 flex flex-col justify-between rounded-md shadow-2xl">
            <div>
              <h2 className="text-xl font-bold mb-4 goldTxt">الشات</h2>
              <div className="space-y-3">
                <div className=" bg-gray-200 p-3 rounded-md w-fit ms-auto">
                  مرحبًا، عندي استشارة قانونية بخصوص...
                </div>
                <div className="text-left bg-blue-200 p-3 rounded-md w-fit">
                  تفضل، احكيلي التفاصيل
                </div>
              </div>
            </div>

            {/* كتابة رسالة */}
            <div className="mt-6 flex">
              <input
                type="text"
                placeholder="اكتب رسالتك هنا"
                className="w-full border p-3 rounded-md focus:outline-none focus:ring-1 focus:ring-[#c9b38c] caret-[#c9b38c] text-gray-700"
                style={{ borderColor: "#c9b38c" }}
              />
              <button className="p-2 goldTxt hover:bg-[#c9b38c36] rounded rotate-180 ms-2">
                <PaperAirplaneIcon className="w-9 h-9" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
