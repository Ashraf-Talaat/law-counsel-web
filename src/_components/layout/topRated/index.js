"use client"
import { fetchLawyers } from "@/services/lawyer/getAllLawyersData";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Index() {
  let [lawyers, setLawyers] =useState([]);
    useEffect(() => {
      // if (clientId !== null && localStorage.getItem('userType') == 'client') {
      //        setLogin(true)
      //       }
      const allLawyers = async () => {
        const data = await fetchLawyers();
        setLawyers(data);
      };
  
      allLawyers();
    }, []);
  return (
    <>
      <div className="mt-52  w-[85%] mx-auto">
        <h2 className="font-bold text-xl text-[#c9b38c]">الاعلي تقييما</h2>
        <div className=" mt-5   grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {lawyers.slice(0, 4).map((lawyer) => (
            <div key={lawyer.id} className="relative w-fit mx-auto">
              <Link href={`/client/Profile/${lawyer.id}`}>
                <Image
                  src={lawyer.profileImageUrl || "/images/lawer-pic.png"}
                  alt="topRated"
                  width={280}
                  height={300}
                  className="rounded-xl w-[280px] h-[300px] object-cover"
                />
                <div className="w-[90%] bg-white p-4 rounded-xl shadow-md absolute left-1/2 -translate-x-1/2 -bottom-[-20px] flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {lawyer.name}
                    </h3>
                    <p className="text-md text-gray-600">
                      {lawyer.specializations[0]}
                    </p>
                  </div>
                  <div className="text-end mt-2">
                    <p className="mb-1 text-sm text-gray-700">التقييم</p>
                    <div className="flex justify-end gap-1">
                      { lawyer.feedback == null || lawyer.feedback.length == 0?<div></div>: Array.from(
                        { length: lawyer.feedback[0].rating },
                        (_, i) => i + 1
                      ).map((s, starIdx) => (
                        <svg
                          key={starIdx}
                          className={`w-5 h-5 fill-current text-yellow-400 `}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.12 3.436a1 1 0 00.95.69h3.614c.969 0 1.371 1.24.588 1.81l-2.923 2.12a1 1 0 00-.364 1.118l1.12 3.436c.3.921-.755 1.688-1.54 1.118l-2.923-2.12a1 1 0 00-1.176 0l-2.923 2.12c-.784.57-1.838-.197-1.539-1.118l1.12-3.436a1 1 0 00-.364-1.118L2.777 8.863c-.783-.57-.38-1.81.588-1.81h3.614a1 1 0 00.95-.69l1.12-3.436z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
