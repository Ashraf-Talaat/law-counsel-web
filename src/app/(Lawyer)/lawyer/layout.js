"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

//alerts
import { Toaster } from "react-hot-toast";

//contexts
import { LawyerProvider } from "@/context/LawyerContext";

//components
import Footer from "@/_components/layout/footer/page";
import LoadingLogo from "@/_components/Loading";
import "@/styles/globals.css";

//fonts
import { Cairo } from "next/font/google";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
});

export default function LayoutLawyer({ children }) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const userType = (Cookies.get("userType") || "").toLowerCase();
    if (userType !== "lawyer") {
      if (userType === "client") {
        router.push("/");
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
        <Toaster position="top-center" reverseOrder={false} />
        <LawyerProvider>
          {isLoading ? <LoadingLogo /> : children}
        </LawyerProvider>

        <Footer></Footer>
      </body>
    </html>
  );
}
