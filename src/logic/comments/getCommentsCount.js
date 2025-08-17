// logic/comments/getCommentsCount.js
import { db } from "@/firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function getCommentsCount(articleId, callback) {
  const commentsRef = collection(db, "articles", articleId, "comments");

  // realtime listener
  const unsubscribe = onSnapshot(commentsRef, (snapshot) => {
    callback(snapshot.size); 
  });

  return unsubscribe; 
}
