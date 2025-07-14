import React from "react";
import Image from "next/image";

export default function Login() {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Right Form Section */}
          <div className="text-right">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              أهلا بعودتك !
            </h1>
            <p className="text-2xl text-[#1C202E] mb-6 font-bold ">
              أدخل البيانات التالية لتتمكن من الدخول إلي حسابك
            </p>
            <form className="space-y-8 ">
              <div>
                <input
                  type="email"
                  placeholder=" البريد الإلكتروني :"
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#C9B38C]"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder=" كلمة المرور :"
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#C9B38C]"
                />
              </div>
              <div className="flex justify-center ">
                <button
                  type="submit"
                  className="w-md bg-[#C9B38C] hover:bg-[#b69d75] text-white py-2 rounded-md transition "
                >
                  تسجيل دخول
                </button>
              </div>
            </form>
            <div className="flex justify-center mt-2">
              <p className="mr-4 text-2xl text-gray-700">
                ليس لديك حساب ؟  
                <a
                  href="#"
                  className="text-[#1C202E] hover:underline font-bold mr-3"
                >
                  أنشئ حساب 
                </a>
              </p>
            </div>
          </div>
          {/* Left Logo Section */}
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
