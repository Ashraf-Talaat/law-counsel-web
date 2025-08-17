"use client";
import Image from "next/image";
import React from "react";

//components
import ProfileNav from "@/_components/layout/profileNav/index";
import { ProfileSubNav } from "@/_components/layout/profileNav/profileSubNav/index";

//context
import { useLawyer } from "@/context/LawyerContext";

export default function LawyerProfile({ children }) {
  const { lawyer, loading } = useLawyer();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>جاري التحميل ...</p>
      </div>
    );
  }

  if (!lawyer) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            لا يوجد بيانات
          </h2>
          <p className="text-sm text-gray-500">
            لم يتم العثور على أي معلومات للمحامي.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="relative bg-gray-50 max-h-screen">
      {/* navbar */}
      <ProfileNav />

      <div className="relative z-10 max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 min-h-[50vh]">
        <div className="grid grid-cols-1 lg:grid-cols-[20rem_1fr] gap-6">
          {/* Sidebar */}
          <aside className="bg-white rounded-2xl shadow-md ring-1 ring-gray-100 p-6 h-fit">
            <div className="flex flex-col items-center text-center">
              <div className="relative w-28 h-28 rounded-full ring-4 ring-white shadow overflow-hidden border-3 border-[#C9B38C]">
                <Image
                  src={lawyer?.profileImageUrl || "/images/lawyerAvatar.png"}
                  alt="User"
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-gray-900">
                {lawyer?.name || "المستخدم"}
              </h2>
              {lawyer?.city && (
                <p className="text-sm text-gray-500">{lawyer.city}</p>
              )}
            </div>
            <div className="mt-6">
              <ProfileSubNav />
            </div>
          </aside>

          {/* Main content */}

          <main className="w-full">
            <div className="bg-white rounded-2xl shadow-md ring-1 ring-gray-100 p-6 mb-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
