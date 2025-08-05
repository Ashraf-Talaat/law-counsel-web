import { db } from "@/firebase/firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

export default async function approveRequest(requestId, userId, lawyerId) {
  try {
    const consultationRef = doc(db, "consultations", requestId);
    await updateDoc(consultationRef, {
      status: "approved",
      updatedAt: serverTimestamp(),
    });

    const chatDocRef = await addDoc(collection(db, "chats"), {
      clientId: userId,
      lawyerId: lawyerId,
      lastMessage: "مرحبا بك، يمكنك البدء في المحادثة الآن.",
      lastMessageTime: serverTimestamp(),
      createdAt: serverTimestamp(),
    });

    await addDoc(collection(db, "chats", chatDocRef.id, "messages"), {
      senderId: lawyerId,
      message: "مرحبا بك، يمكنك البدء في المحادثة الآن.",
      timestamp: serverTimestamp(),
    });

    return { success: true };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return { success: false, error };
  }
}
