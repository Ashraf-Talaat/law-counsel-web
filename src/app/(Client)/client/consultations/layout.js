import SubNav from "@/_components/layout/subNav";
import React from "react";
import MainNav from "@/_components/layout/navbar/mainNav";

export default function ClientLayout({ children }) {
  return (
    <>
      <MainNav />
      <div className="bgLayout p-4 text-right mb-4">
        <SubNav />

        {children}
      </div>
    </>
  );
}
