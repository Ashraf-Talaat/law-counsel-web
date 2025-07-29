"use client";
import React, { useState, useEffect } from "react";
import getAllArticles from "@/logic/articles/getAllArticles";
import Image from "next/image";

//Icons
import {
  HandThumbUpIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import CreateArticlePage from "@/app/(Lawyer)/lawyer/create/page";
import getCommentsCount from "@/logic/comments/getCommentsCount";

export default function HomeArticles() {
  const [articles, setArticles] = useState([]);
  const [commentsCount, setCommentsCount] = useState({});

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getAllArticles();
      setArticles(data);

      // Fetch comments count for each article
      const counts = {};
      for (const article of data) {
        const count = await getCommentsCount(article.id);
        counts[article.id] = count;
      }
      setCommentsCount(counts);
    };

    fetchArticles();
  }, []);

  return (
    <>
      {/* start Create Article */}
      <CreateArticlePage />
      {/* end Create Article */}

      {/* start article */}
      <div className="flex flex-col items-center p-6 bgLayout space-y-6 ">
        {articles.map((article) => {
          console.log("article", article);

          return (
            <div
              key={article.id}
              className="w-full max-w-3xl bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden transition-transform hover:scale-[1.01] hover:shadow-lg"
            >
              {/*  article image */}
              {article.imageUrl && (
                <Image
                  className="w-full h-64 object-cover"
                  src={article.imageUrl}
                  alt="article image"
                  width={1200}
                  height={300}
                />
              )}

              {/*  article content */}
              <div className="p-6">
                <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                  {article.content}
                </p>

                <div className="flex justify-end items-center gap-8 subTxt text-sm">
                  <button className="flex items-center gap-1 hover:text-primary transition">
                    <span> {article.likes.length ?? ""}</span>
                    <HandThumbUpIcon className="w-5 h-5" />
                  </button>

                  <button className="flex items-center gap-1 hover:text-primary transition">
                    <span> {commentsCount[article.id] ?? ""} </span>
                    <ChatBubbleBottomCenterTextIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* end article */}
    </>
  );
}
