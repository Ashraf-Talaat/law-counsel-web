import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function LawyerNav() {
  return (
    <div className="text-center">
      <div className="navbar w-full ">
        {/* Start Navbar */}
        <div className="navbar-start">
          {/* dropdown menu */}
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
              className="menu menu-sm dropdown-content bgPrimary rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/lawyer/home/articles">الرئيسية</Link>
              </li>
              <li>
                <Link href="/lawyer/consultations/myConsultation">
                  الدردشات
                </Link>
              </li>
              <li>
                <Link href="/aboutUs">من نحن</Link>
              </li>
              <li>
                <Link href="#">تواصل معنا</Link>
              </li>
            </ul>
          </div>

          {/* profile */}
          <Link href="/lawyer/profile/myInfo">
            <Image
              src="/public/images/lawyer.jpg"
              alt="User"
              width={70}
              height={70}
              className="rounded-full border-4 border-[#C9B38C]"
            />
          </Link>
        </div>

        {/* navbar center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/lawyer/home/articles">الرئيسية</Link>
            </li>
            <li>
              <Link href="/lawyer/consultations/myConsultation">الدردشات</Link>
            </li>
            <li>
              <Link href="/aboutUs">من نحن</Link>
            </li>
            <li>
              <Link href="/#aboutUs">تواصل معنا</Link>
            </li>
          </ul>
        </div>

        {/* logo */}
        <div className="navbar-end">
          <Link href="/" className="">
            <Image
              src="/images/logo-dark.png"
              alt="logo"
              width={100}
              height={100}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
