
import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getClientData = async (clientId) => {
  try {
    const docRef = doc(db, "clients", clientId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("No such Client!");
    }
  } catch (error) {
    console.error("Error fetching Client data:", error);
    throw error;
  }
};
