"use client";
import { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";

//components
import LoadingLogo from "@/_components/Loading";

//logic
import { getAllChatsRealtime } from "@/logic/consultations/lawyer/getAllChats";
import { sendMessage } from "@/logic/consultations/lawyer/sendMessage";

//Icons
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

export default function Page() {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [isLoading, setLoading] = useState(true);

  const lawyerId = localStorage.getItem("uid");

  //get all chats
  useEffect(() => {
    const unsubscribe = getAllChatsRealtime(lawyerId, (chat) => {
      setChats(chat);
      setMessages(chat[index].messages);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <LoadingLogo />;
   } else if (chats.length === 0) {
    return (
      <>
        <div className="bg-white rounded-md shadow-md p-6 w-[85%] mx-auto ">
          <h2 className="text-xl font-bold mb-6 goldTxt">المحامين</h2>
          <div className="space-y-6">
            <p>لا توجد استشارات</p>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="bg-white rounded-md shadow-md p-6 w-[85%] mx-auto ">
          <div className="flex justify-around gap-6">
            {/*list of lawyers*/}
            <div className="w-1/2 p-5 rounded-md bg-gray-100 shadow-md ">
              <h2 className="text-xl font-bold mb-4 goldTxt">العملاء</h2>
              <ul className="space-y-4">
                {chats.map((item, i) => (
                  <li
                    onClick={() => {
                      setIndex(i);
                      setMessages(item.messages);
                    }}
                    key={item.clientId}
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
                      <p className="font-semibold mb-1">اسم العميل</p>
                      <p className="text-sm subTxt "> {item.lastMessage}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* chat */}
            <div className="w-1/2 h-[500px] p-4 flex flex-col justify-between rounded-md shadow-2xl">
              <div>
                <h2 className="text-xl font-bold mb-4 goldTxt">الشات</h2>

                {/* Scrollable container */}
                <div className="space-y-2 overflow-y-auto h-[350px] bg-gray-100 rounded-lg p-6 scroll-hidden">
                  {messages.map((item) =>
                    item.senderId === lawyerId ? (
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

              {/* write message form  */}
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
                      ? await sendMessage(chats[index].chatId, lawyerId, input)
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
