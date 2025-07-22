"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import HeroOther from "@/_components/layout/hero-other";
import { fetchArticles } from "@/services/client/getAllArticles";

export default function Page() {
  let [articles, setArticles] = useState([]);

  useEffect(() => {
    const allArticle = async () => {
      const data = await fetchArticles();
      console.log(data);
      setArticles(data);
    };
    allArticle();
  }, []);

  return (
    <>
      <HeroOther
        title="احدث المقالات"
        description="اكتشف أحدث المقالات القانونية التي تبسط لك المفاهيم وتساعدك تفهم حقوقك بشكل أوضح."
        showInput={false}
      />
      <div className="w-[85%] mx-auto my-20">
        <p>المقالات الاكثر انتشارا</p>
        <div className="w-full max-w-3xl mx-auto my-10 p-6 bg-white ">
          {articles.map((art) => (
            <div key={art.id} className="mb-15 p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-6">
                <Image
                  src="/images/logo-dark.png"
                  alt="topRated"
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />

                <div>
                  <p className="font-semibold mb-1">ندي محمد</p>
                  <p className="text-sm text-gray-500">
                    {new Date(art.createdAt).toLocaleDateString("ar-EG", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <Image
                  src={art.imageUrl}
                  alt={art.title ? art.title : ""}
                  width={900}
                  height={100}
                  className="rounded-md"
                />
              </div>

              <div>
                <p className="text-sm text-gray-600">{art.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
