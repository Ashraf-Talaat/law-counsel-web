"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

// Firebase
import { db } from "@/firebase/firebase";
import { doc, updateDoc, arrayUnion, arrayRemove, collection, onSnapshot, orderBy, query } from "firebase/firestore";

//Icons
import {
  HandThumbUpIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import { HandThumbUpIcon as HandThumbUpSolidIcon } from "@heroicons/react/24/solid";

//alert
import Swal from "sweetalert2";
import toast from "react-hot-toast";

//logic
import getCommentsCount from "@/logic/comments/getCommentsCount";

// Components
import CreateArticlePage from "@/app/(Lawyer)/lawyer/create/page";
import LawyerHero from "@/_components/layout/lawyerHero";
import CommentsSection from "@/_components/commentSection/CommentsSection";
import LoadingLogo from "@/_components/Loading";

export default function HomeArticles() {
  const [articles, setArticles] = useState([]);
  const [commentsCount, setCommentsCount] = useState({});
  const [lawyerId, setLawyerId] = useState(null);
  const [isLoading, setLoading] = useState(true);

  //get lawyer id
  useEffect(() => {
    const id = localStorage.getItem("uid");
    setLawyerId(id);
  }, []);

  // Fetch articles using onSnapshot for real-time updates
  useEffect(() => {
    // Create query with orderBy to sort from newest to oldest
    const articlesQuery = query(
      collection(db, "articles"),
      orderBy("createdAt", "desc")
    );

    // Set up real-time listener
    const unsubscribe = onSnapshot(articlesQuery, async (snapshot) => {
      const articlesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setArticles(articlesData);

      // Fetch comments count for each article
      const counts = {};
      for (const article of articlesData) {
        const count = await getCommentsCount(article.id);
        counts[article.id] = count;
      }
      setCommentsCount(counts);
      setLoading(false);
      
    }, (error) => {
      console.error("Error fetching articles:", error);
      toast.error("حدث خطأ أثناء جلب المقالات");
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
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
      // setArticles((prevArticles) =>
      //   prevArticles.map((article) =>
      //     article.id === articleId
      //       ? {
      //           ...article,
      //           likes: isLiked
      //             ? article.likes.filter((id) => id !== lawyerId)
      //             : [...article.likes, lawyerId],
      //         }
      //       : article
      //   )
      // );
    } catch (e) {
      console.log("Error Updates likes: " + e);
      toast.error("حدث خطأ أثناء تحديث المقالات");
    }
  };

  //UI
  if (isLoading) {
    return <LoadingLogo />;
  } else {
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
        <div className="flex justify-center px-4 py-8 bg-gray-50">
          <div className="w-full max-w-2xl space-y-4 sm:space-y-6">
            {articles.map((article) => {
              const isLiked =
                lawyerId &&
                Array.isArray(article.likes) &&
                article.likes.includes(lawyerId);

              return (
                <div
                  key={article.id}
                  className="w-full bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
                >
                  {/* Author Info */}
                  <div className="flex items-center gap-3 m-4">
                    <div className="relative w-12 h-12">
                      <Image
                        src={article.userImage || "/images/logo-dark.png"}
                        alt="صورة المحامي"
                        fill
                        className="rounded-full object-cover border-2 border-blue-100"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm">
                        {article.userName || "محامي متخصص"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(article.createdAt).toLocaleDateString(
                          "ar-EG",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                  {/*  article image */}
                  {article.imageUrl && (
                    <Image
                      className="w-full max-h-96 object-cover"
                      src={article.imageUrl}
                      alt="article image"
                      width={1200}
                      height={500}
                    />
                  )}

                  {/*  article content */}
                  <div className="p-5 sm:p-6">
                    {/* author header padding to align */}
                    <div className="sm:hidden" />
                    <p className="text-gray-900 mb-4 leading-8 whitespace-pre-line break-words text-[15px] sm:text-[16px]">
                      {article.content}
                    </p>

                    {/* Like + Comment Buttons */}
                    <div className="mt-2 border-t border-gray-100 pt-4 flex items-center justify-between text-sm">
                      {/* Like Button */}
                      <button
                        onClick={() => {
                          handleLike(article.id, article.likes);
                        }}
                        aria-pressed={Boolean(isLiked)}
                        className={`group inline-flex items-center gap-2 px-3 py-1.5 rounded-full transition ${
                          isLiked
                            ? "text-[#C9B38C] bg-[#C9B38C]/10"
                            : "text-gray-600 hover:text-[#C9B38C] hover:bg-[#C9B38C]/10"
                        }`}
                      >
                        {isLiked ? (
                          <HandThumbUpSolidIcon className="w-5 h-5" />
                        ) : (
                          <HandThumbUpIcon className="w-5 h-5" />
                        )}
                        <span className="text-[13px]">
                          {isLiked ? "إلغاء الإعجاب" : "أعجبني"}
                        </span>
                        <span className="tabular-nums">
                          {article.likes?.length ?? 0}
                        </span>
                      </button>

                      {/* Comment Button */}
                      <label
                        htmlFor={`modal-${article.id}`}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-gray-600 hover:text-[#C9B38C] hover:bg-[#C9B38C]/10 transition cursor-pointer"
                      >
                        <ChatBubbleBottomCenterTextIcon className="w-5 h-5" />
                        <span className="tabular-nums">
                          {commentsCount[article.id] ?? 0}
                        </span>
                      </label>

                      {/* comment Modal */}
                      <input
                        type="checkbox"
                        id={`modal-${article.id}`}
                        className="modal-toggle"
                      />
                      <div className="modal" role="dialog">
                        <div className="modal-box w-full max-w-2xl relative rounded-2xl ring-1 ring-gray-100">
                          {/* Close Icon */}
                          <label
                            htmlFor={`modal-${article.id}`}
                            className="absolute left-4 top-4 text-xl cursor-pointer text-gray-500 hover:text-red-500"
                          >
                            ✖
                          </label>

                          <h3 className="font-bold text-lg mb-4">التعليقات</h3>

                          <CommentsSection articleId={article.id} setCommentsCount={setCommentsCount}  />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* end article */}
      </>
    );
  }
}
