import React from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function ProfileNav() {
  return (
    <nav className="bg-[#fff] w-[85%] mx-auto rounded-2xl p-8 mb-10 flex justify-between items-center shadow-sm">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-[#262b3e] to-[#687693] bg-clip-text text-transparent mb-3">
        الصفحة الشخصية
      </h1>

      <Link href={`/lawyer/home/articles`}>
        <ChevronLeftIcon className="w-12 h-12 text-[#1c202e] hover:text-[#687693] cursor-pointer" />
      </Link>
    </nav>
  );
}
