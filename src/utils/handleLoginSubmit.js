import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { auth, db } from "@/firebase/firebase";

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("صيغة البريد الإلكتروني غير صحيحة")
    .required("البريد الإلكتروني مطلوب"),
  password: Yup.string()
    .required("كلمة المرور مطلوبة")
    .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

export const handleLoginSubmit = async ({
  e,
  loginInputs,
  setErrors,
  router,
}) => {
  e.preventDefault();

  try {
    await validationSchema.validate(loginInputs, { abortEarly: false });
    setErrors({});

    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginInputs.email,
      loginInputs.password
    );
    const uid = userCredential.user.uid;

    const clientDocRef = doc(db, "clients", uid);
    const lawyerDocRef = doc(db, "lawyers", uid);
    const clientDoc = await getDoc(clientDocRef);
    const lawyerDoc = await getDoc(lawyerDocRef);

    if (clientDoc.exists()) {
      localStorage.setItem("userType", "client");
      localStorage.setItem("uid", uid);
      toast.success("تم تسجيل الدخول بنجاح كعميل");
      router.push("/");
      return;
    } else if (lawyerDoc.exists()) {
      localStorage.setItem("userType", "lawyer");
      localStorage.setItem("uid", uid);

      if (!lawyerDoc.data().isApproved) {
        Swal.fire({
          icon: "info",
          text: " المحامي لسه مش متوافق عليه",
        });
        return;
      }
      toast.success("تم تسجيل الدخول بنجاح كمحامي");
      router.push("/lawyer/home/articles");
      return;
    } else {
      toast.error("لا يوجد حساب مرتبط بهذا البريد الإلكتروني.");
      setErrors((prev) => ({
        ...prev,
        general: "لا يوجد حساب مرتبط بهذا البريد الإلكتروني.",
      }));
      return;
    }
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      const formErrors = {};
      err.inner.forEach((error) => {
        formErrors[error.path] = error.message;
      });
      setErrors(formErrors);
    } else if (err?.code === "auth/user-not-found") {
      toast.error("هذا البريد الإلكتروني غير مسجل.");
      setErrors((prev) => ({
        ...prev,
        email: "هذا البريد غير مسجل. يرجى إنشاء حساب أولاً.",
      }));
    } else if (err?.code === "auth/wrong-password") {
      toast.error("كلمة المرور غير صحيحة.");
      setErrors((prev) => ({
        ...prev,
        password: "كلمة المرور غير صحيحة.",
      }));
    } else {
      toast.error("حدث خطأ غير متوقع. حاول مرة أخرى.");
      setErrors((prev) => ({
        ...prev,
        general: "حدث خطأ غير متوقع. حاول مرة أخرى.",
      }));
      console.error("Login error:", err);
    }
  }
};
