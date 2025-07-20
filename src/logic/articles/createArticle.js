import { db } from "@/firebase/firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default async function createArticale({ content, imgUrl, lawyerId }) {
  try {
    const docRef = await addDoc(collection(db, "articles"), {
      content,
      imgUrl,
      lawyerId,
      createAt: serverTimestamp(),
    });

    console.log("DocRef: ", docRef);
    return { success: true, data: docRef };
  } catch (error) {
    console.error("Error creating article: ", error);
    return { success: false, error };
  }
}
