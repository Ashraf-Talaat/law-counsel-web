import { db } from '@/firebase/firebase';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { collection, doc, getDocs, increment, query, updateDoc, where } from 'firebase/firestore';


const StatusChatRenderer = ({
  userType,
  status,
  input,
  setInput,
  setShowEndConsultationModal,
  sendMessage,
  chats,
  index,
  lawyerId,
  clientId,
}) => {
  const handleAcceptEndRequest = async ({ chats, index }) => {
    const chatDocRef = doc(db, "chats", chats[index].chatId);
    await updateDoc(chatDocRef, {
      status: "completed",
    });

    const paymentsRef = collection(db, "payments");
    const q = query(
      paymentsRef,
      where("lawyerId", "==", chats[index].lawyerId),
      where("clientId", "==", chats[index].clientId),
      where("status", "==", "escrow") // escrow, released, refunded
    );
    console.log(q);
    const querySnapshot = await getDocs(q);
    let amount = 0;
    for (const paymentDoc of querySnapshot.docs) {
      const paymentDocRef = doc(db, "payments", paymentDoc.id);
      amount = paymentDoc.data().amount;
      await updateDoc(paymentDocRef, {
        status: "released",
      });
    }
    console.log(amount);
    const lawyerDocRef = doc(db, "lawyers", chats[index].lawyerId);
    await updateDoc(lawyerDocRef, {
      balance: increment(amount - amount * 0.1), // Assuming amount is the consultation fee
    });

    const platformDocRef = doc(db, "platform", "balance");
    await updateDoc(platformDocRef, {
      balance: increment(amount * 0.1), // 10% platform fee
    });

  }
  const handleRejectEndRequest = async ({ chats, index }) => {
    const chatDocRef = doc(db, "chats", chats[index].chatId);
    await updateDoc(chatDocRef, {
      status: "disputed",
    });
  }
  switch (status) {
    case "ongoing":
      return (
        <div className="mt-6 flex">
          <button
            onClick={() => setShowEndConsultationModal(true)}
            className="px-3 py-1.5 mx-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
          >
            إنهاء الاستشارة
          </button>
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
                ? userType == "lawyer" ? await sendMessage(chats[index].chatId, lawyerId, input) : await sendMessage(chats[index].chatId, clientId, input)
                : "";
              setInput("");
            }}
            className="p-2 goldTxt hover:bg-[#c9b38c36] rounded rotate-180 "
          >
            <PaperAirplaneIcon className="w-9 h-9" />
          </button>
        </div>
      );
    case "pending":
      if (chats[index].endRequestBy !== userType) {
        return (
          <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-yellow-800 text-sm">
                الطرف الآخر قام بطلب إنهاء الاستشارة
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAcceptEndRequest({ chats, index })}
                  className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm"
                >
                  موافق
                </button>
                <button
                  onClick={() => handleRejectEndRequest({ chats, index })}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
                >
                  غير موافق
                </button>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-center">
              تم إرسال طلب إنهاء الاستشارة
            </p>
          </div>
        );
      }
    case "completed":
      return (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 text-center font-medium">
            تم الانتهاء من الاستشارة
          </p>
        </div>
      );
    case "disputed":
      return (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 text-center">
            الإدارة الموقع ستقوم بمراجعة القضية
          </p>
        </div>
      );
    default:
      return null;
  }
};

export default StatusChatRenderer;
