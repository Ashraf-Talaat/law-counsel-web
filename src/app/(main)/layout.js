"use client";
import { usePathname } from "next/navigation";
import "@/styles/globals.css";

import { Cairo } from "next/font/google";

import Navbar from "@/_components/layout/navbar";
import Hero from "@/_components/layout/hero";
import LatestNews from "@/_components/layout/latestNews";
import About from "@/_components/layout/aboutus";
import Specializations from "@/_components/layout/home_specializations";
import Login from "../(auth)/login/page";
import LawyerRegisterForm from "../(auth)/register/lawyer/page";
import ClientRegisterForm from "../(auth)/register/user/page";
import LawyerProfile from "../profile/lawyer/layout";
import ClientLayout from "../client/consultations/layout";
import ArticlesProfile from "../profile/lawyer/myArticles/page";

import Home from "@/_components/layout/home";

import MainNav from "@/_components/layout/navbar/mainNav";
import Footer from "@/_components/layout/footer/page";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
});

// export const metadata = {
//   title: "Law Counsel",
//   description:
//     "منصة قانونية بتجمع محامين في كل التخصصات، تقدر من خلالها تلاقي المحامي المناسب لقضيتك، تحجز استشارة بسهولة، وكمان تتابع كل جديد في القانون. ولو مش عارف تبدأ منين؟ اسأل الشات بوت وهيساعدك تعرف نوع قضيتك وتوجهك للصح.",
// };

export default function RootLayout({ children }) {
  // const pathname = usePathname();
  // const hideLayout = pathname === "/home";
  return (
    <html lang="ar" dir="rtl" data-theme="light">
      <body className={`${cairo.className}  text-base-content font-sans `}>
        <Navbar />
        <Home />
        {/* {!hideLayout && <Navbar />} 
         <MainNav /> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
