import SubNav from "@/_components/layout/subNav";
import React from "react";

export default function ClientLayout({ children }) {
  return (
    <>
      <SubNav />

      {children}
    </>
  );
}
