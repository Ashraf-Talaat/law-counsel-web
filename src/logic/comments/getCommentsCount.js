import { db } from "@/firebase/firebase";
import { collection, getCountFromServer } from "firebase/firestore";

export default async function getCommentsCount(articleId) {
  try {
    const commentRef = collection(db, "articles", articleId, "comments");
    const commentSnap = await getCountFromServer(commentRef);

    if (commentSnap.exists()) {
      // console.log("Document data:", commentSnap.data());
      return commentSnap.data().count;
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such Comments!");
    }
  } catch (e) {
    console.log("error of get counts of comments" + e);
  }
}
