"use client";

import { sendPasswordResetEmail } from "firebase/auth";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { auth } from "@/firebase/firebase";
import Swal from "sweetalert2";


export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("صيغة البريد الإلكتروني غير صحيحة")
    .required("البريد الإلكتروني مطلوب"),
});

export const handleForgotPasswordSubmit = async ({
  e,
  forgotPasswordInputs,
  setForgotPasswordInputs,
  setErrors,
  setLoading
}) => {
  e.preventDefault();

  try {
    await validationSchema.validate(forgotPasswordInputs, { abortEarly: false });
    setErrors({});

    await sendPasswordResetEmail(auth, forgotPasswordInputs.email);
    
   
    
    // Clear the form
    setForgotPasswordInputs({ email: "" });
    setErrors({});
    
    // Show success message with SweetAlert
    Swal.fire({
      icon: "success",
      title: "تم الإرسال بنجاح",
      text: "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني. يرجى التحقق من صندوق الوارد الخاص بك.",
      confirmButtonText: "حسناً"
    });
    
  } catch (err) {
    setLoading(false);
     const errorMessage = getFirebaseAuthErrorMessage(err.code, 'arabic');
    Swal.fire({
      icon: "error",
      title: "حدث خطأ",
      text: errorMessage,
    });
   
  }
};
