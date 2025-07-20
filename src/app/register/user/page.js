"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { auth, db } from "../../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

export default function ClientRegisterForm() {
  const [clientInputs, setClientInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("الاسم مطلوب")
      .min(3, "يجب ان يحتوى على 3 حروف"),
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

  const validateField = async (fieldName, value) => {
    try {
      await Yup.reach(validationSchema, fieldName).validate(value);
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: error.message,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(clientInputs, { abortEarly: false });
      setErrors({});

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        clientInputs.email,
        clientInputs.password
      );

      const user = userCredential.user;

      await addDoc(collection(db, "clients"), {
        uid: user.uid,
        name: lawyerInputs.name,
        email: lawyerInputs.email,
        phoneNumber: lawyerInputs.phoneNumber,
      });

      alert("تم إنشاء الحساب بنجاح!");
    } catch (err) {
      if (err.inner) {
        const formErrors = {};
        err.inner.forEach((error) => {
          formErrors[error.path] = error.message;
        });
        setErrors(formErrors);
      } else {
        alert("حدث خطأ: " + err.message);
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <form onSubmit={handleSubmit} className="space-y-4 text-right w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            إنشاء حساب جديد
          </h2>
          <p className="text-2xl text-[#1C202E] mb-6 font-bold ">
            استمتع بتجربة قانونية ذكية وآمنة – ابدأ الآن.
          </p>
          <input
            type="text"
            value={clientInputs.name}
            onChange={(event) => {
              setClientInputs({ ...clientInputs, name: event.target.value });
              if (errors.name) {
                setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
              }
            }}
            onBlur={() => validateField("name", clientInputs.name)}
            placeholder="الاسم الكامل"
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#b19667]"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
          <input
            type="text"
            value={clientInputs.email}
            onChange={(event) => {
              setClientInputs({ ...clientInputs, email: event.target.value });
            }}
            onBlur={() => validateField("email", clientInputs.email)}
            placeholder="البريد الإلكتروني"
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#b19667]"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
          <input
            type="password"
            value={clientInputs.password}
            onChange={(event) => {
              setClientInputs({
                ...clientInputs,
                password: event.target.value,
              });
            }}
            onBlur={() => validateField("password", clientInputs.password)}
            placeholder="كلمة المرور"
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#b19667]"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
          <input
            type="password"
            value={clientInputs.confirmPassword}
            onChange={(event) => {
              setClientInputs({
                ...clientInputs,
                confirmPassword: event.target.value,
              });
            }}
            onBlur={() =>
              validateField("confirmPassword", clientInputs.confirmPassword)
            }
            placeholder="تأكيد كلمة المرور"
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#b19667]"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
          <input
            type="text"
            value={clientInputs.phoneNumber}
            onChange={(event) => {
              setClientInputs({
                ...clientInputs,
                phoneNumber: event.target.value,
              });
            }}
            onBlur={() =>
              validateField("phoneNumber", clientInputs.phoneNumber)
            }
            placeholder="رقم الهاتف"
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#b19667]"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
          )}
          <div className="flex flex-col md:flex-row items-start gap-6 mt-6"></div>
          <div className="flex justify-center ">
            <button
              type="submit"
              className="w-sm bg-[#C9B38C] hover:bg-[#b69d75] text-white py-2 mx-2 rounded-md transition cursor-pointer"
            >
              تسجيل مستخدم جديد
            </button>
          </div>

          <div className="flex justify-center">
            <p className="mt-4 text-2xl text-gray-700">
              لديك حساب بالفعل ؟
              <Link
                href="/login"
                className="text-[#1C202E] hover:underline font-bold "
              >
                سجل دخول
              </Link>
            </p>
          </div>
        </form>
        <div className="hidden md:flex justify-center items-center ">
          <Image
            src="/images/client-register.png"
            alt="Law Counsel Logo"
            width={500}
            height={500}
            className="mx-auto mb-4"
          />
        </div>
      </div>
    </div>
  );
}
