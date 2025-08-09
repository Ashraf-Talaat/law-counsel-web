import { db } from "@/firebase/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

export async function sendMessage(chatId, senderId, message) {
  try {
    const messageRef = collection(db, "chats", chatId, "messages");
    await addDoc(messageRef, {
      senderId,
      message,
      timestamp: serverTimestamp(),
    });

    // Update the parent chat document with lastMessage info
    const chatDocRef = doc(db, "chats", chatId);
    await updateDoc(chatDocRef, {
      lastMessage: message,
      lastMessageTime: serverTimestamp(),
    });
    console.log(" Message sent");
    return { success: true };
  } catch (error) {
    console.error(" Error sending message:", error);
    return { success: false, error: error.message };
  }
}
