"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "../../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import * as Yup from "yup";

export default function Login() {
  const [loginInputs, setLoginInputs] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("صيغة البريد الإلكتروني غير صحيحة")
      .required("البريد الإلكتروني مطلوب"),
    password: Yup.string()
      .required("كلمة المرور مطلوبة")
      .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
  });

  const validateField = async (fieldName) => {
    try {
      await validationSchema.validateAt(fieldName, loginInputs);
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, [fieldName]: error.message }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLoginInputs((prev) => ({ ...prev, [name]: value }));
    try {
      await validationSchema.validate(loginInputs, { abortEarly: false });
      setErrors({});

      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginInputs.email,
        loginInputs.password
      );

      alert("تم تسجيل الدخول بنجاح");
      router.push("/profile/lawyer");
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const formErrors = {};
        err.inner.forEach((error) => {
          formErrors[error.path] = error.message;
        });
        setErrors(formErrors);
      } else if (err?.code === "auth/user-not-found") {
        setErrors((prev) => ({
          ...prev,
          email: "هذا البريد غير مسجل. يرجى إنشاء حساب أولاً.",
        }));
      } else if (err?.code === "auth/wrong-password") {
        setErrors((prev) => ({
          ...prev,
          password: "كلمة المرور غير صحيحة.",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          general: "حدث خطأ غير متوقع. حاول مرة أخرى.",
        }));
        console.error("Login error:", err);
      }
    }
  };
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="text-right">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              أهلا بعودتك !
            </h1>
            <p className="text-2xl text-[#1C202E] mb-6 font-bold ">
              أدخل البيانات التالية لتتمكن من الدخول إلي حسابك
            </p>
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div>
                <input
                  type="email"
                  placeholder=" البريد الإلكتروني :"
                  name="email"
                  value={loginInputs.email}
                  onChange={(event) => {
                    setLoginInputs({
                      ...loginInputs,
                      email: event.target.value,
                    });
                    if (errors.email) {
                      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
                    }
                  }}
                  onBlur={() => validateField("email")}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#C9B38C]"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <input
                  type="password"
                  placeholder=" كلمة المرور :"
                  name="password"
                  value={loginInputs.password}
                  onChange={(event) => {
                    setLoginInputs({
                      ...loginInputs,
                      password: event.target.value,
                    });
                    if (errors.password) {
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        password: "",
                      }));
                    }
                  }}
                  onBlur={() => validateField("password")}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#C9B38C]"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div className="flex justify-center ">
                <button
                  type="submit"
                  className="w-md bg-[#C9B38C] hover:bg-[#b69d75] text-white py-2 rounded-md transition"
                >
                  تسجيل دخول
                </button>
              </div>
            </form>
            <div className="flex justify-center mt-2">
              <p className="mr-4 text-2xl text-gray-700">
                ليس لديك حساب ؟
                <Link
                  href="/register/user"
                  className="text-[#1C202E] hover:underline font-bold mr-3"
                >
                  أنشئ حساب
                </Link>
              </p>
            </div>
          </div>
          <div className="hidden md:flex text-center">
            <Image
              src="/images/login.png"
              alt="Law Counsel Logo"
              width={600}
              height={600}
              className="mx-auto mb-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
