import { db } from "@/firebase/firebase.js";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default async function getMyRequests(uId) {
  try {
    const q = query(
      collection(db, "consultations"),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);

    const requests = querySnapshot.docs
      .filter(
        (doc) =>
          doc.data().userId === uId &&
          doc.data().status === "pending" &&
          doc.data().deletedByClient === false
      )
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

    return requests;
  } catch (error) {
    console.error("Error fetching requests:", error);
    return { success: false, error };
  }
}
