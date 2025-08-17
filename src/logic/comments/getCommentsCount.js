import { db } from "@/firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export function getCommentsCount(articleId, callback) {
  const commentsRef = collection(db, "articles", articleId, "comments");

  // realtime listener
  const unsubscribe = onSnapshot(commentsRef, (snapshot) => {
    callback(snapshot.size); 
  });

  return unsubscribe; 
}
