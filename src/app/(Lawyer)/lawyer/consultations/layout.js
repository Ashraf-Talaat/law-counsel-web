import LawyerNav from "@/_components/layout/navbar/lawyerNav";
import SubNav from "@/_components/layout/subNav";
import React from "react";

export default function LawyerLayout({ children }) {
  return (
    <>
      <div className="w-[85%] mx-auto">
        <LawyerNav />
      </div>
      <div className="bgLayout p-4 text-right min-h-[50vh]">
        <SubNav userType={"lawyer"} />

        {children}
      </div>
    </>
  );
}
