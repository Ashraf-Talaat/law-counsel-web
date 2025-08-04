import { db } from "@/firebase/firebase.js";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default async function getAllRequests(uid) {
  try {
    const q = query(
      collection(db, "consultations"),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);

    const requests = querySnapshot.docs
      .filter(
        (doc) => doc.data().lawyerId === uid && doc.data().status === "pending"
      )
      .map((doc) => {
        if (doc.data().lawyerId == uid) {
          if (doc.data().status == "pending") {
            return {
              id: doc.id,
              ...doc.data(),
            };
          }
        }
      });

    return requests;
  } catch (error) {
    console.error("Error fetching requests:", error);
    return { success: false, error };
  }
}
