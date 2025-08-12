"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
export function ProfileSubNav() {
  const pathname = usePathname();

  const links = [
    { label: "بياناتي الشخصية", href: "myInfo" },
    { label: "مقالاتي", href: "articles" },
  ];

  return (
    <ul className="space-y-6 text-center text-2xl font-medium">
      {links.map(({ label, href }) => (
        <li key={href}>
          <Link
            href={href}
            className={`block py-2 rounded-md cursor-pointer transition-colors ${
              pathname === href
                ? "bg-[#C9B38C] text-white"
                : "hover:bg-[#e0d4b7] text-[#1C202E]"
            }`}
          >
            {label}
          </Link>
        </li>
      ))}

      <hr className="my-6 border-t" />

      <li key="/login">
        <Link
          href="/login"
          className="flex items-center justify-center gap-2 hover:bg-[#e0d4b7] text-[#1C202E] py-2 rounded-md cursor-pointer transition-colors"
        >
          <ArrowLeftEndOnRectangleIcon className="h-8 w-8" />
          <span>تسجيل الخروج</span>
        </Link>
      </li>
      <li key="">
        <Link
          href=""
          className="block hover:bg-[#e0d4b7] text-[#1C202E] py-2 rounded-md cursor-pointer transition-colors"
        >
          مسح الحساب
        </Link>
      </li>
    </ul>
  );
}
