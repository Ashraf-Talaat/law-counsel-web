import LawyerNav from "@/_components/layout/navbar/lawyerNav";
import SubNav from "@/_components/layout/subNav";
import React from "react";

export default function LawyerLayout({ children }) {
  return (
    <>
      <LawyerNav />
      <div className="bgLayout p-4 text-right mb-4">
        <SubNav />

        {children}
      </div>
    </>
  );
}
