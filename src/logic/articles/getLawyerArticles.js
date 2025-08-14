import { db } from "@/firebase/firebase.js";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";

export default async function getLawyerArticles(uId) {
  if (!uId) return { success: false, error: "Invalid lawyer ID" };

  try {
    const q = query(
      collection(db, "articles"),
      where("userId", "==", uId),
      orderBy("createdAt", "desc") // make sure all articles have createdAt field
    );

    const querySnapshot = await getDocs(q);

    const articles = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { success: true, data: articles };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return { success: false, error: error.message };
  }
}
