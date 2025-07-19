import { db } from "@/firebase/firebase.js";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default async function getAllArticles() {
  try {
    const q = query(collection(db, "articles"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const articles = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { success: true, data: articles };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return { success: false, error };
  }
}
