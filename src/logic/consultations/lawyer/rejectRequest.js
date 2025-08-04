import { db } from "@/firebase/firebase";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";



export default async function rejectRequest(requestId){
    try{
        const consultationRef =  doc(db,"consultations", requestId);
        await updateDoc(consultationRef, {
            status: "rejected",
            updatedAt: serverTimestamp(), 
        });

        return{success: true};

    }catch(error){
        console.error("Error fetching articles:", error);
        return { success: false, error };
    }

}