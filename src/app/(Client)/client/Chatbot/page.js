'use client'
import MainNav from "@/_components/layout/navbar/mainNav";
import LoadingLogo from "@/_components/Loading";
import { AskGemini } from "@/_components/test";
import { useEffect } from "react";
import { useState } from "react";

export default function Page() {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(()=>{
      setLoading(false)
    },1000)
  }, []);
  if (isLoading) {
    return (
      <LoadingLogo />
    );
  } else {
    return (
      <>
       <div className="w-[85%] mx-auto">
        <MainNav />
        </div>
        <main className="min-h-screen  p-8 bg-[#eee]">
          <div className="">
            <h1 className="text-2xl font-bold mb-4"> محاميك الذكي</h1>
            <AskGemini />
          </div>
        </main>
        
        
      </>
    );
  }
}
