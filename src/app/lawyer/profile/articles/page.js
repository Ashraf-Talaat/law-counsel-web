"use client";
import React, { useState, useEffect } from "react";
import getAllArticles from "@/logic/articles/getAllArticles";
import deleteArticle from "@/logic/articles/deleteArticle";
import { useRouter } from "next/navigation";
import Image from "next/image";

//Icons
import {
  HandThumbUpIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";

export default function ProfileArticles() {
  const [articles, setArticles] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getAllArticles();
      setArticles(data);
    };

    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("هل أنت متأكد من حذف المقال؟");
    if (!confirm) return;

    const res = await deleteArticle(id);
    if (res.success) {
      setArticles((prev) => prev.filter((a) => a.id !== id));
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-6">كل المقالات</h2>
        {articles.map((article) => {
          return (
            <div
              key={article.id}
              className="max-w-xl bg-white border border-gray-200 rounded-lg shadow-lg"
            >
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

                {/* buttons and icons */}
                <div className="flex justify-between align-middle">
                  {/* edit and delete buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        router.push(
                          `/lawyer/profile/articles/edit/${article.id}`
                        )
                      }
                      className="btn btn-sm bg-blue-600 text-white"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="btn btn-sm bg-red-600 text-white"
                    >
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
