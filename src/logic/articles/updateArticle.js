import { db } from "@/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default async function updateArticle(id, updatedData) {
  try {
    const articleRef = doc(db, "articles", id);
    await updateDoc(articleRef, updatedData);
  } catch (error) {
    console.error("Error updating article:", error);
  }
}
