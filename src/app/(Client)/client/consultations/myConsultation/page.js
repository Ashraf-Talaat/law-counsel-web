"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

//Icons
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

//logic
import getAllChats from "@/logic/consultations/client/getAllChats";

import { sendMessage } from "@/logic/consultations/lawyer/sendMessage";

import LoadingLogo from "@/_components/Loading";


export default function Page() {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");


  //get user id
  const clientId = localStorage.getItem("uid");

  //scroll bottom of chat
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const unsubscribe = getAllChats(clientId, (chat) => {
      setChats(chat);
      setMessages(chat[index].messages);

    });
    setLoading(false);

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
              {chats.map((chat, i) => (
                <li
                  onClick={() => {
                    setMessages(chat.messages);
                    setIndex(i);
                  }}
                  key={i}
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
                    <p className="text-sm subTxt "> {chat.lastMessage}</p>
                  </div>
                </li>
              ))}
            </ul>


//   }, []);
//   if (isLoading) {
//     return (
//       <LoadingLogo />
//     );
//   } else if (chats.length === 0) {
//     return (
//       <>
//         <div className="bg-white rounded-md shadow-md p-6 w-[85%] mx-auto ">
//           <h2 className="text-xl font-bold mb-6 goldTxt">المحامين</h2>
//           <div className="space-y-6">
//             <p>لا توجد استشارات</p>

//           </div>
//         </div>
//       </>
//     );
//   } else {
    return (
      <>
        <div className="bg-white rounded-md shadow-md p-6 w-[85%] mx-auto ">
          <div className="flex flex-col lg:flex-row justify-around gap-6">
            {/*list of lawyers*/}
            <div className="w-full md:w-1/2 sm:w-1/2 p-5 rounded-md bg-gray-100 shadow-md ">
              <h2 className="text-xl font-bold mb-4 goldTxt">المحامين</h2>
              <ul className="space-y-4">
                {chats.map((ele, i) => (
                  <li
                    onClick={() => {
                      setIndex(i);
                      setMessages(ele.messages);
                    }}
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
            {/* <div className="w-full md:w-1/2 sm:w-1/2 h-[500px] p-6 flex flex-col justify-between rounded-md shadow-2xl">
            <div>
              <h2 className="text-xl font-bold mb-4 goldTxt">الشات</h2>

              {/* Scrollable container */}
              <div
                ref={chatContainerRef}
                className="space-y-2 overflow-y-auto h-[350px] bg-gray-100 rounded-lg p-6 scroll-hidden"
              >
                {messages.map((item) =>
                  item.senderId === clientId ? (
                    <div
                      key={item.id}
                      className="text-left bg-blue-200 p-2 rounded-md w-fit"
                    >
                      {item.message}
                    </div>
                  ) : (
                    <div
                      key={item.id}
                      className="bg-gray-300 p-2 rounded-md w-fit ms-auto"
                    >
                      {item.message}
                    </div>
                  )
                )}
              </div>
            </div>


            {/* write message form */}

            <div className="mt-6 flex">
              <input
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                type="text"
                placeholder="اكتب رسالتك هنا"
                className="w-full border p-3 rounded-md focus:outline-none focus:ring-1 focus:ring-[#c9b38c] caret-[#c9b38c] text-gray-700"
                style={{ borderColor: "#c9b38c" }}
              />
              <button
                onClick={async () => {
                  input !== ""
                    ? await sendMessage(chats[index].chatId, clientId, input)
                    : "";
                  setInput("");
                }}
                className="p-2 goldTxt hover:bg-[#c9b38c36] rounded rotate-180 ms-2"
              >
                <PaperAirplaneIcon className="w-9 h-9" />
              </button>
            </div>
          </div> */}
            <div className="w-1/2 h-[500px] p-4 flex flex-col justify-between rounded-md shadow-2xl">
              <div>
                <h2 className="text-xl font-bold mb-4 goldTxt">الشات</h2>

                {/* Scrollable container */}
                <div className="space-y-2 overflow-y-auto h-[350px] bg-gray-100 rounded-lg p-6 scroll-hidden">
                  {messages.map((item) =>
                    item.senderId === uid ? (
                      <div
                        key={item.id}
                        className="text-left bg-blue-200 p-2 rounded-md w-fit"
                      >
                        {item.message}
                      </div>
                    ) : (
                      <div
                        key={item.id}
                        className="bg-gray-300 p-2 rounded-md w-fit ms-auto"
                      >
                        {item.message}
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* كتابة رسالة */}
              <div className="mt-6 flex">
                <input
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                  type="text"
                  placeholder="اكتب رسالتك هنا"
                  className="w-full border p-3 rounded-md focus:outline-none focus:ring-1 focus:ring-[#c9b38c] caret-[#c9b38c] text-gray-700"
                  style={{ borderColor: "#c9b38c" }}
                />
                <button
                  onClick={async () => {
                    input !== ""
                      ? await sendMessage(
                        chats[index].chatId,
                        uid,
                        input
                      )
                      : "";
                    setInput("");
                  }}
                  className="p-2 goldTxt hover:bg-[#c9b38c36] rounded rotate-180 ms-2"
                >
                  <PaperAirplaneIcon className="w-9 h-9" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </>
    );
  }
}
