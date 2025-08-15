import ProfileNav from "@/_components/layout/profileNav";
import Image from "next/image";
import React from "react";

export default function UserProfile({ children }) {
  return (
    <div className="relative bg-gray-100 min-h-screen flex flex-col">
        <ProfileNav />
      
      <main className=''>{children}</main>
    </div>
  );
}
