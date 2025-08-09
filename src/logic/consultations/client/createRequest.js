import { db } from "@/firebase/firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// export async function createRequest(requestData) {
//   try {
//     const docRef = await addDoc(collection(db, "consultations"), {
//       ...requestData,
//       deletedByClient: false,
//       status: "pending",
//       createdAt: serverTimestamp(),
//     });
//     console.log("DocREf: ", docRef);
//     alert("done ");
//     return docRef;
//   } catch (error) {
//     console.error("Error creating request: ", error);
//   }
// }

const newRequest = async ({ title, description, userId, lawyerId }) => {
  try {
    const docRef = await addDoc(collection(db, "consultations"), {
      title,
      description,
      userId,
      lawyerId,
      createdAt: serverTimestamp(),
      deletedByClient: false,
      status: "pending",
    });
    console.log("Consultation added with ID:", docRef.id);
    return { valid: true };
  } catch (error) {
    console.error("Error adding consultation:", error);
    return { valid: false };
  }
};

export default newRequest;
