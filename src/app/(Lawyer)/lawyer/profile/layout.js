"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ProfileNav from '@/_components/layout/profileNav/index';
import { ProfileSubNav } from '@/_components/layout/profileNav/profileSubNav/index';
import { getLawyerData } from "@/utils/getLawyerdate";

export default function LawyerProfile({ children }) {
  const [lawyer, setLawyer] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const lawyerId = localStorage.getItem("uid");
      if (!lawyerId) return;

      try {
        const data = await getLawyerData(lawyerId);
        setLawyer(data);
      } catch (err) {
        console.error(err);
     
      }
    };

    if (typeof window !== "undefined") {
      fetchData();
    }
  }, []);
  return (
    <div dir="rtl" className="relative bg-gray-50 min-h-screen">
      <ProfileNav />

      {/* Header stripe */}
      <div className="h-32 " />

      <div className="relative z-10  max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[20rem_1fr] gap-6">
          {/* Sidebar card */}
          <aside className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-6 h-fit sticky top-24">
            <div className="flex flex-col items-center text-center">
              <div className="relative w-28 h-28 rounded-full ring-4 ring-white shadow overflow-hidden -mt-10 border-2 border-[#C9B38C]">
                <Image
                  src={lawyer?.profileImageUrl || "/images/lawyer.jpg"}
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

          {/* Main content card */}
          <main className="w-full">
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
