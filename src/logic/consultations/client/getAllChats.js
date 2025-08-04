import { db } from "@/firebase/firebase.js";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDocs,
} from "firebase/firestore";

export default function getAllChats(uId, callback) {
  const q = query(collection(db, "chats"), orderBy("lastMessageTime", "desc"));

  const unsubscribe = onSnapshot(q, async (querySnap) => {
    const chats = [];

    for (const doc of querySnap.docs) {
      const chatData = doc.data();

      if (chatData.clientId === uId) {
        const messagesRef = query(
          collection(db, "chats", doc.id, "messages"),
          orderBy("timestamp", "asc")
        );

        const messagesSnapshot = await getDocs(messagesRef);

        const messages = messagesSnapshot.docs.map((msg) => ({
          id: msg.id,
          ...msg.data(),
        }));

        chats.push({
          chatId: doc.id,
          ...chatData,
          messages,
        });
      }
    }
    console.log(chats);
    callback(chats);
  });
  return unsubscribe;
}
