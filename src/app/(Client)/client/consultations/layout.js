import SubNav from "@/_components/layout/subNav";
import React from "react";

export default function ClientLayout({ children }) {
  return (
    <>
      <div className="bgLayout p-4 text-right mb-4">
      <SubNav />

      {children}
      </div>
    </>
  );
}
