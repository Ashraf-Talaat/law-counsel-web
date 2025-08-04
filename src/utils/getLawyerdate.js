
import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getLawyerData = async (lawyerId) => {
  try {
    const docRef = doc(db, "lawyers", lawyerId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("No such lawyer!");
    }
  } catch (error) {
    console.error("Error fetching lawyer data:", error);
    throw error;
  }
};
