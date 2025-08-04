import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";
export const fetchLawyers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "lawyers"));
    const lawyersData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(lawyersData);
    return lawyersData;
  } catch (error) {
    console.error("Error fetching lawyers: ", error);
  }
};
