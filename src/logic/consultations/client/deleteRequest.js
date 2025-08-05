import { db } from "@/firebase/firebase";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";

export default async function DeleteRequest(requestId) {
  try {
    const docRef = doc(db, "consultations", requestId);
    await updateDoc(docRef, {
      deletedByClient: true,
      status: "rejected",
      updatedAt: serverTimestamp(),
    });

    return { success: true };
  } catch (e) {
    console.log("error in deleteRequest: " + e);
    return { success: false, e };
  }
}
