"use client";

import Footer from "@/_components/layout/footer/page";
import LoadingLogo from "@/_components/Loading";
import "@/styles/globals.css";
import Cookies from "js-cookie";


import { Cairo } from "next/font/google";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
});


export default function LayoutClient({ children }) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const userType = (Cookies.get("userType") || "").toLowerCase();
    if (userType !== "client") {
      if (userType === "lawyer") {
        router.push("/lawyer/home/articles");
      } else {
        router.push("/login");
      }
    } else {
      setLoading(false);
    }
  }, [router]);

  return (
    <html lang="ar" dir="rtl" data-theme="light">
      <body className={`${cairo.className}  text-base-content font-sans `}>

        {isLoading ? <LoadingLogo /> : children}
        <Footer></Footer>
      </body>
    </html>
  );
}
