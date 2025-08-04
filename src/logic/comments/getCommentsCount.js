import { db } from "@/firebase/firebase";
import { collection, getCountFromServer } from "firebase/firestore";

export default async function getCommentsCount(articleId) {
  try {
    const commentRef = collection(db, "articles", articleId, "comments");
    const snapshot = await getCountFromServer(commentRef);
    return snapshot.data().count || 0;
  } catch (e) {
    console.error("Error getting comment count:", e);
    return 0;
  }
}
