import { db } from "@/firebase/firebase";
import { doc, deleteDoc } from "firebase/firestore";

export default async function deleteArticle(id) {
  try {
    await deleteDoc(doc(db, "articles", id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting article: ", error);
    return { success: false, error };
  }
}
