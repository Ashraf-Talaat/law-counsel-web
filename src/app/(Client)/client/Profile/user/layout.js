import ProfileNav from "@/_components/layout/profileNav";
import Image from "next/image";
import React from "react";

export default function UserProfile({ children }) {
  return (
    <div className="relative bg-gray-100 min-h-screen flex flex-col">
      <div className="">
        <ProfileNav />
      </div>
      {/* <div className="flex justify-center mt-[-5rem] z-20 relative">
        <Image
          src="/images/lawyer.jpg"
          alt="User"
          width={180}
          height={180}
          className="rounded-full border-4 border-[#C9B38C]"
        />
      </div> */}
      <main className="pt-15 px-4 mb-9 max-w-4xl mx-auto">{children}</main>
    </div>
  );
}
