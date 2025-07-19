"use client";
import React, { useState, useEffect } from "react";
import getAllArticles from "@/logic/articles/getAllArticles";
import Image from "next/image";

//Icons
import {
  HandThumbUpIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";

export default function HomeArticles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getAllArticles();
      setArticles(data);
    };

    fetchArticles();
  }, []);

  return (
    <>
      {/* start post */}
      <div className="flex justify-center p-6 bgLayout">
        {/* {articles.map((article) => {
        return(
          <div key={article.id} className="max-w-xl bg-white border border-gray-200 rounded-lg shadow-lg">
            <Image
              className="rounded-t-lg object-cover"
              src={article.imgUrl}
              alt=""
              width={600}
              height={100}
            />

            <div className="p-5">
              <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-600">
                {article.title}
              </h3>
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
          </div>;
          );
        })} */}
        <div className="max-w-xl bg-white border border-gray-200 rounded-lg shadow-lg">
          <Image
            className="rounded-t-lg object-cover"
            src="/images/egyption_dustor.png"
            // src={}
            alt=""
            width={600}
            height={100}
          />

          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-600">
              عنوان المقالة القانونية
            </h5>
            <p className="mb-3 font-normal subTxt">
              استكشف أحدث المقالات القانونية التي تغطي مواضيع متنوعة من حقوقك
              القانونية إلى النصائح العملية للتعامل مع القضايا القانونية.
              مقالاتنا مصممة لتكون سهلة الفهم وتقدم معلومات موثوقة من قبل
              المحامين المتخصصين.
            </p>
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
      </div>
      {/* end post */}
    </>
  );
}
