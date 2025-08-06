import { db } from "@/firebase/firebase.js";
import { doc, getDoc } from "firebase/firestore";

export default async function myInfo(uid) {
  try {
    const q = doc(db, "lawyers", uid);
    const querySnapshot = await getDoc(q);
    console.log(querySnapshot.data());

    return querySnapshot.data();
  } catch (e) {
    console.log("error in myInfo: " + e);
  }
}
