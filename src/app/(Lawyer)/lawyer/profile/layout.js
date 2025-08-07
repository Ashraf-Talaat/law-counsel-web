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
    <>
      <div className="relative bg-gray-100 min-h-screen">
        <ProfileNav />

        <div className="grid grid-cols-1 lg:grid-cols-[20rem_1fr] gap-6 px-4 relative z-10 mt-[-2rem]">
          <aside
            className="bg-white rounded-xl shadow-md p-6 w-[18rem] mt-[-4rem] h-[35rem] mx-auto lg:mx-0 lg:mr-10"
          >
            <Image
              src={lawyer?.profileImageUrl || "/images/lawyer.jpg"}
              alt="User"
              width={150}
              height={150}
              className="mx-auto rounded-full mb-4 border-4 border-[#C9B38C]"
            />
            <ProfileSubNav />
          </aside>

          <main className="w-full mt-10 lg:mt-20">{children}</main>
        </div>
      </div>
    </>
  );
}
