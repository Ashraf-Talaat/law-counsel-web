import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import Swal from "sweetalert2";

export const updateLawyerProfile = async (uid, updatedData) => {
  try {
    await updateDoc(doc(db, "lawyers", uid), updatedData);
    Swal.fire("تم الحفظ!", "تم تحديث البيانات بنجاح", "success");
  } catch (error) {
    Swal.fire("خطأ", error.message, "error");
    throw error;
  }
};
