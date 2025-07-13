

import "../styles/globals.css";

import { Cairo } from "next/font/google";
import Navbar from "@/_components/layout/navbar"
import Hero from "@/_components/layout/hero";
import LatestNews from "@/_components/layout/latestNews";
import About from "@/_components/layout/aboutus";
import Specializations from "@/_components/layout/home_specializations";
import Login from "./login/page";
import LawyerRegisterForm from "./register/lawyer/page";
import ClientRegisterForm from "./register/user/page";
import LawyerProfile from "./profile/lawyer/layout";
import ClientLayout from "./client/consultations/layout";
import ArticlesProfile from "./profile/lawyer/myArticles/page";



const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
});



export const metadata = {
  title: "Law Counsel",
  description:
    "منصة قانونية بتجمع محامين في كل التخصصات، تقدر من خلالها تلاقي المحامي المناسب لقضيتك، تحجز استشارة بسهولة، وكمان تتابع كل جديد في القانون. ولو مش عارف تبدأ منين؟ اسأل الشات بوت وهيساعدك تعرف نوع قضيتك وتوجهك للصح.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" data-theme="light">

      <body

        className={`${cairo.className}  text-base-content font-sans `}

      >
        {/* <Navbar /> */}
        {/* <Hero />
        <div className="w-[85%] mx-auto "> 
        <LatestNews />
        <Specializations />
        <About />
         </div> */}
        {/* <Login /> */}
        {/* <LawyerRegisterForm />  */}
        {/* <ClientRegisterForm /> */}
        {/* <LawyerProfile /> */}
        {/* <ClientLayout /> */}

        {children}
      </body>
    </html>
  );
}
