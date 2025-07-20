import { db } from "@/firebase/firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function createRequest(requestData) {
  try {
    const docRef = await addDoc(collection(db, "consultations"), {
      ...requestData,
      deletedByClient: false,
      status: "pending",
      createdAt: serverTimestamp(),
    });
    console.log("DocREf: ", docRef);
    alert("done ");
    return docRef;
  } catch (error) {
    console.error("Error creating request: ", error);
  }
}
