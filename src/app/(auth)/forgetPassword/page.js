"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { RegisPopup } from "@/_components/PobRegister";

import LoadingLogo from "@/_components/Loading";
import { handleForgotPasswordSubmit } from "@/utils/handleForgetPassword";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);

  const [showPopup, setShowPopup] = useState(false);

  const [forgotPasswordInputs, setForgotPasswordInputs] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic email validation
    if (!forgotPasswordInputs.email) {
      setErrors({ email: "البريد الإلكتروني مطلوب" });
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(forgotPasswordInputs.email)) {
      setErrors({ email: "البريد الإلكتروني غير صحيح" });
      setLoading(false);
      return;
    }

    try {
      //   // Here you would typically make an API call to send reset password email
      //   // For now, we'll just show a success message
      //   toast.success("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني");

      //   // Clear the form
      // //   setForgotPasswordInputs({ email: "" });
      // //   setErrors({});
      await handleForgotPasswordSubmit({
        e,
        forgotPasswordInputs,
        setErrors,
        setLoading,
        setForgotPasswordInputs,
      });
      // Optionally redirect to login page after a delay
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      toast.error("حدث خطأ، يرجى المحاولة مرة أخرى", error);
    } finally {
      setLoading(false);
    }
  };

  const validateField = async (fieldName) => {
    if (fieldName === "email") {
      if (!forgotPasswordInputs.email) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "البريد الإلكتروني مطلوب",
        }));
      } else if (!/\S+@\S+\.\S+/.test(forgotPasswordInputs.email)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "البريد الإلكتروني غير صحيح",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
      }
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
              نسيت كلمة المرور ؟
            </h1>
            <p className="text-2xl text-[#1C202E] mb-6 font-bold ">
              أدخل بريدك الإلكتروني لإعادة تعيين كلمة المرور
            </p>
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div>
                <input
                  type="email"
                  placeholder=" البريد الإلكتروني :"
                  name="email"
                  value={forgotPasswordInputs.email}
                  onChange={(event) => {
                    setForgotPasswordInputs({
                      ...forgotPasswordInputs,
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

              <div className="flex justify-center ">
                <button
                  type="submit"
                  className="w-md bg-[#C9B38C] hover:bg-[#b69d75] text-white py-2 rounded-md transition"
                >
                  إرسال رابط إعادة التعيين
                </button>
              </div>
            </form>

            <div className="flex justify-center mt-2">
              <p className="mr-4 text-md text-gray-700">
                ليس لديك حساب ؟
                <button
                  onClick={() => setShowPopup(true)}
                  className="text-[#1C202E] hover:underline font-bold mr-3"
                >
                  أنشئ حساب
                </button>
                {showPopup && (
                  <RegisPopup onClose={() => setShowPopup(false)} />
                )}
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
      <Toaster />
    </div>
  );
}
