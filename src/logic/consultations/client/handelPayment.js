import { db } from "@/firebase/firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
const handlePayment = async ({ clientId, lawyerId, consultationId, amount }) => {
    try {
        const docRef = await addDoc(collection(db, "payments"), {
            clientId,
            consultationId,
            lawyerId,
            createdAt: serverTimestamp(),
            amount,
            status: "escrow",   // escrow, released, refunded
        });
        console.log("Payment added with ID:", docRef.id);
        return { valid: true };
    } catch (error) {
        console.error("Error adding payment:", error);
        return { valid: false };
    }
}
export default handlePayment;