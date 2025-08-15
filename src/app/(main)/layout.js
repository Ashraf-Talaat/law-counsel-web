// app/layout.js
import "@/styles/globals.css";
import { Cairo } from "next/font/google";
import Navbar from "@/_components/layout/navbar";
import Footer from "@/_components/layout/footer/page";
import Home from "@/_components/layout/home";

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
      <body className={`${cairo.className} text-base-content font-sans`}>
        <Navbar />
        <Home />
        {children}
        <Footer />
      </body>
    </html>
  );
}
