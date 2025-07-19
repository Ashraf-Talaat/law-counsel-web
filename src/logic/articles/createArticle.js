import { db } from "@/firebase/firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default async function createArticale({
  title,
  content,
  imgUrl,
  lawyerId,
}) {
  try {
    const docRef = await addDoc(collection(db, "articles"), {
      title,
      content,
      imgUrl,
      lawyerId,
      createAt: serverTimestamp(),
    });

    console.log("DocRef: ", docRef);
    return docRef;
  } catch (error) {
    console.error("Error creating article: ", error);
  }
}
