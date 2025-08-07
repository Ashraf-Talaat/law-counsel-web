import { db } from "@/firebase/firebase.js";
import { doc, updateDoc } from "firebase/firestore";

export default async function editClientRequest(reqId, newData) {
  try {
    const req = await updateDoc(doc(db, "consultations", reqId), newData);
  } catch (e) {
    console.log("error update client request:" + e);
  }
}
