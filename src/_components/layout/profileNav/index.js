import React from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function ProfileNav() {
  return (
    <nav className="bg-[#fff] h-30 w-full p-12 flex justify-between items-center">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#262b3e] to-[#687693] bg-clip-text text-transparent mb-2">
          ملف المحامي
        </h1>
        <p className="text-gray-600">تفاصيل المحامي وطلب الاستشارة القانونية</p>
      </div>

      <Link href={`/lawyer/home/articles`}>
        <ChevronLeftIcon className="w-8 h-8 text-[#1c202e] absolute top-7 left-9 cursor-pointer" />
      </Link>
    </nav>
  );
}
