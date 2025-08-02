import { db } from "@/firebase/firebase.js";
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    getDocs,
} from "firebase/firestore";


export function getAllChatsRealtime(uid, callback) {
    const q = query(
        collection(db, "chats"),
        orderBy("lastMessageTime", "desc")
    );

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        const chats = [];

        for (const doc of querySnapshot.docs) {
            const chatData = doc.data();

            if (chatData.lawyerId === uid) {
                const messagesRef = query(collection(db, "chats", doc.id, "messages"), orderBy("timestamp", "asc"));

                const messagesSnapshot = await getDocs(messagesRef);

                const messages = messagesSnapshot.docs.map((msgDoc) => ({
                    id: msgDoc.id,
                    ...msgDoc.data(),
                }));

                chats.push({
                    chatId: doc.id,
                    ...chatData,
                    messages,
                });
            }
        }
        console.log(chats);
        callback(chats); // نرجع البيانات للواجهة
    });

    return unsubscribe; // علشان توقف الاستماع بعدين
}
