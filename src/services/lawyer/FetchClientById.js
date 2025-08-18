// services/lawyer/getLawyerById.js

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export const fetchClientById = async (id) => {
  try {
    const docRef = doc(db, "clients", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("خطأ في جلب بيانات المحامي:", error);
    return null;
  }
};
