import { db } from "@/firebase/firebase.js";
import { collection, addDoc } from "firebase/firestore";

export default async function createArticle({
  content,
  imageUrl,
  userId,
  userName,
  userImage,
  likes
}) {
  try {
    const docRef = await addDoc(collection(db, "articles"), {
      content,
      imageUrl,
      userId,
      userName,
      userImage,
      createdAt: new Date().toISOString(),
      likes,
    });

    console.log("DocRef: ", docRef);
    return { success: true, data: docRef };
  } catch (error) {
    console.error("Error creating article: ", error);
    return { success: false, error };
  }
}
