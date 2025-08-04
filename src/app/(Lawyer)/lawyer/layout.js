import Footer from "@/_components/layout/footer/page";
import "@/styles/globals.css";
import { Cairo } from "next/font/google";
import { Toaster } from "react-hot-toast";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
});
export default function LayoutClient({ children }) {
  return (
    <html lang="ar" dir="rtl" data-theme="light">
      <body className={`${cairo.className}  text-base-content font-sans `}>
        <Toaster position="top-center" reverseOrder={false} />

        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
