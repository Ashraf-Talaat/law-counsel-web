"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RegisPopup from "@/_components/layout/RegisPopup";
import { useEffect } from "react";
import { getClientData } from "@/utils/getClientData";
export default function MainNav() {
  const [showPopup, setShowPopup] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [client, setClient] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const clientId = localStorage.getItem("uid");
      const userType = localStorage.getItem("userType");

      if (clientId !== null && userType == "client") {
        setLogin(true);
      }
      if (!clientId) return;

      try {
        const data = await getClientData(clientId);
        setClient(data);
      } catch (err) {
        console.error(err);
      }
    
    }
    if (typeof window !== "undefined") {
      fetchData();
    }

    
  }, []);
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
              className="menu menu-sm dropdown-content bg-[#262b3e] rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/">الرئيسية</Link>
              </li>
              {isLogin ? (
                <li>
                  <Link href="/client/userArticle">المقالات</Link>
                </li>
              ) : (
                ""
              )}
              {isLogin ? (
                <li>
                  <Link href="/client/consultations/myConsultation">
                    الدردشات
                  </Link>
                </li>
              ) : (
                ""
              )}
              <li>
                <Link href="/aboutUs">من نحن</Link>
              </li>
              <li>
                <Link href="#">تواصل معنا</Link>
              </li>
            </ul>
          </div>
          <Link href="/" className="">
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
              <Link href="/">الرئيسية</Link>
            </li>
            {isLogin ? (
              <li>
                <Link href="/client/userArticle">المقالات</Link>
              </li>
            ) : (
              ""
            )}
            {isLogin ? (
              <li>
                <Link href="/client/consultations/myConsultation">
                  الدردشات
                </Link>
              </li>
            ) : (
              ""
            )}
            <li>
              <Link href="/aboutUs">من نحن</Link>
            </li>
            <li>
              <Link href="/#aboutUs">تواصل معنا</Link>
            </li>
          </ul>
        </div>
        {isLogin ? (
          <div className="navbar-end">
            <Link href="/client/Profile/myInfo">
            <Image
              src={client.imageUrl||"/images/logo-dark.png"}
              width={70}
              height={70}
              alt="profile pic"
              className=" rounded-full border-2 border-[#C9B38C] object-cover"
              
            />
            </Link>
          </div>
        ) : (
          <div className="navbar-end">
            <button
              onClick={() => setShowPopup(true)}
              className="btn bgBtn me-1.5 hover:!bg-[#b69d75]"
            >
              انشاء حساب
            </button>
            {showPopup && <RegisPopup onClose={() => setShowPopup(false)} />}
            <Link href="/login" className="btn ">
              تسجيل دخول
            </Link>
          </div>
        )}
      </div>
      {/* {showPopup && <RegisPopup onClose={() => setShowPopup(false)} />} */}
    </div>
  );
}
