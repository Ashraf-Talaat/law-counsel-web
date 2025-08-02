
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";
import * as Yup from "yup";
import Swal from 'sweetalert2'


export const clientRegisterValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("الاسم مطلوب")
    .min(3, "يجب أن يحتوي على 3 حروف على الأقل"),
  email: Yup.string()
    .email("بريد إلكتروني غير صالح")
    .required("الإيميل مطلوب"),
  password: Yup.string()
    .required("كلمة المرور مطلوبة")
    .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
  confirmPassword: Yup.string()
    .required("تأكيد كلمة المرور مطلوب")
    .oneOf([Yup.ref("password"), null], "كلمتا المرور غير متطابقتين"),
  phoneNumber: Yup.string().required("رقم الهاتف مطلوب"),
});

export const handleClientRegisterSubmit = async (
  clientInputs,
  setErrors,
  router,
  resetForm 
) => {
  try {
    await clientRegisterValidationSchema.validate(clientInputs, {
      abortEarly: false,
    });
    setErrors({});

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      clientInputs.email,
      clientInputs.password
    );

    const user = userCredential.user;

    await setDoc(doc(db, "clients",user.uid), {
      uid: user.uid,
      name: clientInputs.name,
      email: clientInputs.email,
      phone: clientInputs.phoneNumber,
    });
    Swal.fire({
      icon: 'success',
      title: 'تم التسجيل بنجاح',
      text: 'يمكنك الآن تسجيل الدخول',
     
    }).then(()=>{
        router.push("/login");
    });

    if (resetForm) resetForm();


  } catch (err) {
    if (err.inner) {
      const formErrors = {};
      err.inner.forEach((error) => {
        formErrors[error.path] = error.message;
      });
      setErrors(formErrors);
    } else {
      // alert("حدث خطأ: " + err.message);
      Swal.fire({
      icon: 'error',
      title: 'حدث خطأ',
      text: 'يرجى المحاولة مرة أخرى : ' + err.message,
     
    })
    }
  }
};
