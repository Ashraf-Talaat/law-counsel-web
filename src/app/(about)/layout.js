import "@/styles/globals.css";
import { Cairo } from "next/font/google";



const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
});
export default function LayoutAbout({ children }) {

  return (
    <html lang="ar" dir="rtl" data-theme="light">
      <body className={`${cairo.className}  text-base-content font-sans `}>
        {children}

      </body>
    </html>
  );
}