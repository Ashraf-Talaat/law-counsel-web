import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function mainNav() {
  return (
    <div className="text-center">
      <div className="navbar w-full ">
        {/* Start Navbar */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="#">الرئيسية</Link>
              </li>
              <li>
                <Link href="#">من نحن</Link>
              </li>
              <li>
                <Link href="#">تواصل معنا</Link>
              </li>
            </ul>
          </div>
          <Link href="#" className="">
            <Image
              src="/images/logo-dark.png"
              alt="logo"
              width={100}
              height={100}
            />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="#">الرئيسية</Link>
            </li>
            <li>
              <Link href="#">من نحن</Link>
            </li>
            <li>
              <Link href="#">تواصل معنا</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <Link href="#" className="btn bgBtn me-1.5 hover:!bg-[#b69d75]">
            انشاء حساب
          </Link>
          <Link href="#" className="btn ">
            تسجيل دخول
          </Link>
        </div>
      </div>
    </div>
  );
}
