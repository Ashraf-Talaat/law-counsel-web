import { db } from "@/firebase/firebase.js";
import { collection, addDoc } from "firebase/firestore";

export default async function createArticale({ content, imageUrl, lawyerId }) {
  try {
    const docRef = await addDoc(collection(db, "articles"), {
      content,
      imageUrl,
      lawyerId,
      createdAt: new Date().toISOString(),
    });

    console.log("DocRef: ", docRef);
    return { success: true, data: docRef };
  } catch (error) {
    console.error("Error creating article: ", error);
    return { success: false, error };
  }
}
