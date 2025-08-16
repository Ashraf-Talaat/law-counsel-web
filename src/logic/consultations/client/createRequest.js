import { db } from "@/firebase/firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import handlePayment from "./handelPayment";


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

const newRequest = async ({ title, description, userId, lawyerId ,nameClient,nameLawyer,amount}) => {
  try {
    const docRef = await addDoc(collection(db, "consultations"), {
      title,
      description,
      userId,
      lawyerId,
      createdAt: serverTimestamp(),
      deletedByClient: false,
      status: "pending",
      nameClient,
      nameLawyer,
    });
    
   await handlePayment({
      clientId: userId,
      lawyerId,
      consultationId: docRef.id,
      amount, 
    });

    console.log("Consultation added with ID:", docRef.id);
    return { valid: true };
  } catch (error) {
    console.error("Error adding consultation:", error);
    return { valid: false };
  }
};

export default newRequest;
