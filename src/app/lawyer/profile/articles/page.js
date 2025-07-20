"use client";
import React, { useState, useEffect } from "react";
import getAllArticles from "@/logic/articles/getAllArticles";
import deleteArticle from "@/logic/articles/deleteArticle";
import Image from "next/image";

//Icons
import {
  HandThumbUpIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/outline";

export default function ProfileArticles() {
  const [articles, setArticles] = useState([]);

  // get all articles
  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getAllArticles();
      setArticles(data);
    };

    fetchArticles();
  }, []);

  // delete method
  const handleDelete = async (id) => {
    const confirm = window.confirm("هل أنت متأكد من حذف المقال؟");
    if (!confirm) return;

    const res = await deleteArticle(id);
    if (res?.success) {
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } else {
      alert("فشل في حذف المقال");
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-6">كل المقالات</h2>
        {/* display articles  */}
        {articles.map((article) => {
          return (
            <div
              key={article.id}
              className="max-w-xl bg-white border border-gray-200 rounded-lg shadow-lg mb-10"
            >
              {/* article image  */}
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
                {/* article content */}
                <p className="mb-3 font-normal subTxt">{article.content}</p>

                {/* buttons and icons */}
                <div className="flex justify-between align-middle mt-8">
                  {/* edit and delete buttons */}
                  <div className="flex gap-4">
                    {/* edit btn  */}
                    <button
                      type="button"
                      className="flex items-center gap-2 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                    >
                      <PencilIcon className="w-5 h-5" />
                      تعديل
                    </button>

                    {/* delete btn  */}
                    <button
                      onClick={() => {
                        handleDelete(article.id);
                      }}
                      type="button"
                      className="flex items-center gap-2 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    >
                      <TrashIcon className="w-5 h-5" />
                      حذف
                    </button>
                  </div>

                  {/* like comment icons */}
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
    </>
  );
}
