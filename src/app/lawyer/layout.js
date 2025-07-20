import { Cairo } from "next/font/google";
import React from "react";
import "@/styles/globals.css";
import { Hero } from "@/_components/layout/hero";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
});

export default function LayoutLawyer({ children }) {
  return (
    <html lang="ar" dir="rtl" data-theme="light">
      <body className={`${cairo.className} text-base-content font-sans`}>
        {children}
      </body>
    </html>
  );
}
