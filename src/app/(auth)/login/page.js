"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { handleLoginSubmit, validationSchema } from "@/utils/handleLoginSubmit";
import toast, { Toaster } from "react-hot-toast";
import { RegisPopup } from "@/_components/layout/RegisPopup/index";

import LoadingLogo from "@/_components/Loading";

export default function Login() {
  const [loading, setLoading] = useState(false);

  const [showPopup, setShowPopup] = useState(false);

  const [loginInputs, setLoginInputs] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      await handleLoginSubmit({
        e,
        loginInputs,
        setErrors,
        router,
        setLoading,
      });
    } catch (error) {
      // console.error("Login submission error:", error);
      // setLoading(false);
      // toast.error("حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.");
    }
  };

  const validateField = async (fieldName) => {
    try {
      await validationSchema.validateAt(fieldName, {
        ...loginInputs,
      });
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: error.message,
      }));
    }
  };

  if (loading) {
    return <LoadingLogo />;
  }
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

              <div className="flex justify-end">
                <Link href="/forgetPassword">
                  <button className="text-[#1C202E] hover:underline hover:text-[#C9B38C] ">
                    نسيت كلمة المرور ؟
                  </button>
                </Link>
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
              <div className="mr-4 text-md text-gray-700">
                ليس لديك حساب ؟
                <button
                  onClick={() => setShowPopup(true)}
                  className="text-[#1C202E] hover:underline hover:text-[#C9B38C] font-bold mr-3"
                >
                  أنشئ حساب
                </button>
                {showPopup && (
                  <RegisPopup onClose={() => setShowPopup(false)} />
                )}
              </div>
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
      <Toaster />
    </div>
  );
}
