"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  PencilSquareIcon,
  ArchiveBoxXMarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";

const articles = [
  {
    id: 1,
    name: "عبدالرحمن فوزي",
    time: "الآن",
    content:
      "تُعد المحاماة من أسمى المهن التي ترتبط ارتباطًا وثيقًا بتحقيق العدالة ونصرة المظلومين. فهي ليست مجرد مهنة لكسب الرزق، بل رسالة سامية تهدف إلى إعلاء العدالة وتحقيق المساواة والدفاع عن الحقوق والحريات.",
    likes: 2,
    image: "/images/lawyer.jpg",
  },
  {
    id: 2,
    name: "أشرف طلعت",
    time: "منذ ساعة",
    content:
      "تُعد المحاماة من أسمى المهن التي ترتبط ارتباطًا وثيقًا بتحقيق العدالة ونصرة المظلومين. فهي ليست مجرد مهنة لكسب الرزق، بل رسالة سامية تهدف إلى إعلاء العدالة وتحقيق المساواة والدفاع عن الحقوق والحريات.",
    likes: 5,
    image: "/images/lawyer.jpg",
  },
  {
    id: 3,
    name: "  أحمد مسعد",
    time: "منذ ساعتين",
    content:
      "تُعد المحاماة من أسمى المهن التي ترتبط ارتباطًا وثيقًا بتحقيق العدالة ونصرة المظلومين. فهي ليست مجرد مهنة لكسب الرزق، بل رسالة سامية تهدف إلى إعلاء العدالة وتحقيق المساواة والدفاع عن الحقوق والحريات.",
    likes: 1,
    image: "/images/lawyer.jpg",
  },
  {
    id: 4,
    name: "زهراء مجدى",
    time: "منذ يوم",
    content:
      "تُعد المحاماة من أسمى المهن التي ترتبط ارتباطًا وثيقًا بتحقيق العدالة ونصرة المظلومين. فهي ليست مجرد مهنة لكسب الرزق، بل رسالة سامية تهدف إلى إعلاء العدالة وتحقيق المساواة والدفاع عن الحقوق والحريات.",
    likes: 4,
    image: "/images/lawyer.jpg",
  },
  {
    id: 5,
    name: "ندي مجدي ",
    time: "منذ شهر",
    content:
      "تُعد المحاماة من أسمى المهن التي ترتبط ارتباطًا وثيقًا بتحقيق العدالة ونصرة المظلومين. فهي ليست مجرد مهنة لكسب الرزق، بل رسالة سامية تهدف إلى إعلاء العدالة وتحقيق المساواة والدفاع عن الحقوق والحريات.",
    likes: 3,
    image: "/images/lawyer.jpg",
  },
];

export default function ArticlesProfile() {
  const [expandedArticles, setExpandedArticles] = useState({});

  const toggleContent = (id) => {
    setExpandedArticles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const maxLength = 150;

  return (
    <div className="space-y-6">
      {articles.map((article) => {
        const isExpanded = expandedArticles[article.id];
        const contentToShow = isExpanded
          ? article.content
          : article.content.slice(0, maxLength) +
            (article.content.length > maxLength ? "..." : "");

        return (
          <div
            key={article.id}
            className="relative bg-white rounded-lg shadow-md p-4 text-right max-w-3xl mx-auto"
          >
            <div className="absolute top-4 left-4 flex gap-2">
              <button className="bg-red-600 text-white p-2 rounded-full cursor-pointer">
                <ArchiveBoxXMarkIcon className="h-5 w-5" />
              </button>
              <button className="bg-sky-600 text-white p-2 rounded-full cursor-pointer">
                <PencilSquareIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <Image
                src={article.image}
                alt="User"
                width={70}
                height={70}
                className="rounded-full border-4 border-[#C9B38C]"
              />
              <div>
                <p className="text-xl font-medium">{article.name}</p>
                <p className="text-xs text-gray-500 mt-1">{article.time}</p>
              </div>
            </div>
            <p className="text-md font-bold text-gray-800 mb-4">
              {contentToShow}
              {article.content.length > maxLength && (
                <span
                  className="text-blue-700 font-semibold cursor-pointer"
                  onClick={() => toggleContent(article.id)}
                >
                  {" "}
                  {isExpanded ? "عرض أقل" : "عرض المزيد"}
                </span>
              )}
            </p>

            <div className="flex justify-between items-center mt-3 px-1">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <HeartIcon className="h-8 w-8 text-red-500 cursor-pointer" />
                <span>{article.likes}</span>
              </div>
              <ChatBubbleOvalLeftEllipsisIcon className="h-8 w-8 text-gray-400 cursor-pointer" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
