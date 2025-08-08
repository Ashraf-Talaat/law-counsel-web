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
        title="المقالات القانونية"
        description="اكتشف أحدث المقالات القانونية من نخبة المحاميين المختصين لتوضيح حقوقك وواجباتك"
        showInput={false}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="w-[90%] max-w-7xl mx-auto py-16">
          {/* Header Section */}
          {/* <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              المقالات القانونية المميزة
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              مقالات قانونية شاملة من محاميين متخصصين تغطي مختلف جوانب القانون
            </p>
          </div> */}

          {/* Articles Horizontal Layout */}
          <div className="space-y-8">
            {articles.map((art) => (
              <article 
                key={art.id} 
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Article Image - Fixed Size */}
                 

                  {/* Article Content */}
                  <div className="flex-1 p-6 order- md:order-2">
                    {/* Author Info */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="relative w-12 h-12">
                        <Image
                          src={art.userImage || "/images/logo-dark.png"}
                          alt="صورة المحامي"
                          fill
                          className="rounded-full object-cover border-2 border-blue-100"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 text-sm">
                          {art.userName || "محامي متخصص"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(art.createdAt).toLocaleDateString("ar-EG", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Article Title */}
                    {art.title && (
                      <h3 className="text-xl font-bold text-gray-800 mb-3">
                        {art.title}
                      </h3>
                    )}

                    {/* Article Content */}
                    <div className="mb-4">
                      <p className="text-gray-600 text-md leading-relaxed">
                        {art.content}
                      </p>
                    </div>

                    {/* Article Footer */}
                    <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        قانوني
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        محامي
                      </span>
                    </div>
                  </div>
                   {art.imageUrl && (
                    <div className="relative w-full md:w-80 h-48 md:h-auto overflow-hidden order-1 md:order-1">
                      <Image
                        src={art.imageUrl}
                        alt={art.title ? art.title : "مقال قانوني"}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Empty State */}
          {articles.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                لا توجد مقالات متاحة حالياً
              </h3>
              <p className="text-gray-500">
                سيتم إضافة مقالات قانونية جديدة قريباً
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
