"use client";
import React, { useState, useEffect } from "react";
import getAllArticles from "@/logic/articles/getAllArticles";
import Image from "next/image";

// Firebase
import { db } from "@/firebase/firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

//Icons
import {
  HandThumbUpIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";

//alert
import Swal from "sweetalert2";
import toast from "react-hot-toast";

// Components
import CreateArticlePage from "@/app/(Lawyer)/lawyer/create/page";
import getCommentsCount from "@/logic/comments/getCommentsCount";
import LawyerHero from "@/_components/layout/lawyerHero";
import CommentsSection from "@/_components/commentSection/CommentsSection";

export default function HomeArticles() {
  const [articles, setArticles] = useState([]);
  const [commentsCount, setCommentsCount] = useState({});
  const [lawyerId, setLawyerId] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("uid");
    setLawyerId(id);
    console.log(id);
  }, []);

  // Fetch articles and comments count on component mount
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

  // Handle like button click
  const handleLike = async (articleId, currentLikes = []) => {
    if (!lawyerId) {
      Swal.fire({
        title: "يجب تسجيل الدخول أولاً لعمل لايك",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
        position: "center",
      });
      return;
    }

    const articleRef = doc(db, "articles", articleId);

    const isLiked = currentLikes.includes(lawyerId);

    try {
      await updateDoc(articleRef, {
        likes: isLiked ? arrayRemove(lawyerId) : arrayUnion(lawyerId),
      });

      // Update local state manually to reflect UI change
      setArticles((prevArticles) =>
        prevArticles.map((article) =>
          article.id === articleId
            ? {
                ...article,
                likes: isLiked
                  ? article.likes.filter((id) => id !== lawyerId)
                  : [...article.likes, lawyerId],
              }
            : article
        )
      );
    } catch (e) {
      console.log("Error Updates likes: " + e);
      toast.error("حدث خطأ أثناء تحديث المقالات");
    }
  };

  // Handle comment button click

  return (
    <>
      {/* start hero section */}
      <LawyerHero
        title="احدث المقالات"
        description={
          "اكتشف أحدث المقالات القانونية التي تبسط لك المفاهيم وتساعدك تفهم حقوقك بشكل أوضح."
        }
        showInput={false}
      />
      {/* end hero section */}

      {/* start Create Article */}
      <CreateArticlePage />
      {/* end Create Article */}

      {/* start article */}
      <div className="flex flex-col items-center p-6 bgLayout space-y-6 ">
        {articles.map((article) => {
          // const isLiked = lawyerId && article.likes.includes(lawyerId);
          const isLiked =
            lawyerId &&
            Array.isArray(article.likes) &&
            article.likes.includes(lawyerId);

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

                {/* Like + Comment Buttons */}
                <div className="flex justify-end items-center gap-8 subTxt text-sm">
                  {/* Like Button */}
                  <button
                    onClick={() => {
                      handleLike(article.id, article.likes);
                    }}
                    className={`flex items-center gap-1 transition ${
                      isLiked ? "text-blue-500" : "hover:text-primary"
                    }`}
                  >
                    {/* <span> {article.likes.length ?? ""}</span> */}
                    <span>{article.likes?.length ?? 0}</span>
                    <HandThumbUpIcon className="w-5 h-5" />
                  </button>

                  {/* Comment Button */}
                  <label
                    htmlFor={`modal-${article.id}`}
                    className="flex items-center gap-1 hover:text-primary transition cursor-pointer"
                  >
                    <span>{commentsCount[article.id] ?? ""}</span>
                    <ChatBubbleBottomCenterTextIcon className="w-5 h-5" />
                  </label>

                  {/* Modal */}
                  <input
                    type="checkbox"
                    id={`modal-${article.id}`}
                    className="modal-toggle"
                  />
                  <div className="modal" role="dialog">
                    <div className="modal-box w-full max-w-2xl relative">
                      {/* Close Icon */}
                      <label
                        htmlFor={`modal-${article.id}`}
                        className="absolute left-4 top-4 text-xl cursor-pointer text-gray-500 hover:text-red-500"
                      >
                        ✖
                      </label>

                      <h3 className="font-bold text-lg mb-4">التعليقات</h3>

                      <CommentsSection articleId={article.id} />
                    </div>
                  </div>
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
