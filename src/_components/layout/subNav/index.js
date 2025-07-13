"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function SubNav() {
  const pathname = usePathname();
  return (
    <>
      {/* Start sub-navbar */}
      <div className="navbar bg-base-100 shadow-md p-3 flex justify-around w-[85%] mx-auto rounded-md mb-2">
        <Link
          href={"/client/consultations/myConsultation"}
          key={"myConsultation"}
          className={`px-16 py-2 rounded-t-md mx-2 text-black font-semibold ${
            pathname === "/client/consultations/myConsultation"
              ? "bgBtn text-white"
              : ""
          }`}
        >
          استشارتي
        </Link>

        <Link
          href={"/client/consultations/myRequests"}
          key="myRequests"
          className={`px-16 py-2.5 rounded-t-md mx-2 text-black font-semibold ${
            pathname === "/client/consultations/myRequests"
              ? "bgBtn text-white"
              : ""
          }`}
        >
          طلباتي
        </Link>
      </div>
      {/* End sub-navbar */}
    </>
  );
}
