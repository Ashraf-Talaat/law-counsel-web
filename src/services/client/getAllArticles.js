
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";
export const fetchArticles = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "articles"));
    const articles = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(articles);
    return articles;
  } catch (error) {
    console.error("Error fetching lawyers: ", error);
  }
};
