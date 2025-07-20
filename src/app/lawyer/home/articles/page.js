"use client";
import React, { useState, useEffect } from "react";
import getAllArticles from "@/logic/articles/getAllArticles";
import Image from "next/image";

//Icons
import {
  HandThumbUpIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import CreateArticlePage from "../../create/page";

export default function HomeArticles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getAllArticles();
      setArticles(data);
      console.log(data);
    };

    fetchArticles();
  }, []);

  return (
    <>
      {/* start post */}
      <div className="flex flex-col justify-center p-6 bgLayout ">
        {articles.map((article) => {
          return (
            <div
              key={article.id}
              className="max-w-xl bg-white border border-gray-200 rounded-lg shadow-lg mb-10"
            >
              {article.imageUrl && (
                <Image
                  className="rounded-t-lg object-cover"
                  src={article.imageUrl}
                  alt=""
                  width={600}
                  height={100}
                />
              )}

              <div className="p-5">
                <p className="mb-3 font-normal subTxt">{article.content}</p>

                <div className="flex justify-end align-middle">
                  <div className="flex gap-8 mt-4 subTxt">
                    <button className="flex items-center gap-1 hover:text-primary">
                      <HandThumbUpIcon className="w-5 h-5" />
                      <span>12</span>
                    </button>

                    <button className="flex items-center gap-1 hover:text-primary">
                      <ChatBubbleBottomCenterTextIcon className="w-5 h-5" />
                      <span>4</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* end post */}
      <CreateArticlePage />
    </>
  );
}
