"use client";
import { useRef, useState } from "react";
import { useEffect } from "react";
import Image from "next/image";

//components
import LoadingLogo from "@/_components/Loading";

//logic
import { getAllChatsRealtime } from "@/logic/consultations/lawyer/getAllChats";
import { sendMessage } from "@/logic/consultations/lawyer/sendMessage";

//Icons
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import StatusChatRenderer from "@/_components/renderStatusChat/StatusChatRenderer";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export default function Page() {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [showEndConsultationModal, setShowEndConsultationModal] =
    useState(false);
  const [status, setStatus] = useState("ongoing"); // ongoing, completed, disputed

  const lawyerId = localStorage.getItem("uid");
  const chatContainerRef = useRef(null);

  //get all chats
  useEffect(() => {
    const unsubscribe = getAllChatsRealtime(lawyerId, (chat) => {
      if (chat && chat.length > 0) {
        setChats(chat);
        setMessages(chat[index]?.messages || []);
        setStatus(chat[index]?.status || "ongoing");
        setLoading(false);
      } else {
        setChats([]);
        setMessages([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [lawyerId, index]);

  //scroll bottom of chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleEndConsultation = async () => {
    const chatDocRef = doc(db, "chats", chats[index].chatId);
    await updateDoc(chatDocRef, {
      status: "pending",
      endRequestBy: "lawyer",
    });

    console.log("Consultation ended");
    setShowEndConsultationModal(false);
  };

  if (isLoading) {
    return <LoadingLogo />;
  } else if (chats.length === 0 || chats === null) {
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
        <div className="bg-white rounded-md shadow-md p-6 w-[85%] mx-auto mb-4">
          <div className="flex justify-around gap-6">
            {/*list of lawyers*/}
            <div className="w-1/2 p-5 rounded-md bg-gray-100 shadow-md space-y-2 h-[500px]">
              <h2 className="text-xl font-bold mb-4 goldTxt">العملاء</h2>
              <ul className="space-y-4 overflow-y-auto scroll-hidden h-[400px]">
                {chats.map((item, i) => (
                  <li
                    onClick={() => {
                      setStatus(item.status);
                      setIndex(i);
                      setMessages(item.messages);
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
                      <p className="font-semibold mb-1">{item.nameClient} </p>
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
                <div
                  ref={chatContainerRef}
                  className="space-y-2 overflow-y-auto h-[350px] scroll-hidden bg-gray-100 rounded-lg p-6 "
                >
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

              <StatusChatRenderer
                userType={"lawyer"}
                status={status}
                input={input}
                setInput={setInput}
                setShowEndConsultationModal={setShowEndConsultationModal}
                sendMessage={sendMessage}
                chats={chats}
                index={index}
                lawyerId={lawyerId}
                clientId={chats[index]?.userId}
              />
            </div>
          </div>
        </div>
        {/* End Consultation Confirmation Modal */}
        {showEndConsultationModal && (
          <div className="fixed inset-0 bg-opacity-20 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
                تأكيد إنهاء الاستشارة
              </h3>
              <p className="text-gray-600 mb-6 text-center">
                هل أنت متأكد من إنهاء الاستشارة؟
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleEndConsultation}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  نعم، إنهاء الاستشارة
                </button>
                <button
                  onClick={() => setShowEndConsultationModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
