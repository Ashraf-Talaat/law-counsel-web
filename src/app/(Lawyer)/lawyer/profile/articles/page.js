"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

// Firebase
import { db } from "@/firebase/firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

//alert
import Swal from "sweetalert2";
import toast from "react-hot-toast";

//logic
import deleteArticle from "@/logic/articles/deleteArticle";
import updateArticle from "@/logic/articles/updateArticle";
import getCommentsCount from "@/logic/comments/getCommentsCount";
import getLawyerArticles from "@/logic/articles/getLawyerArticles";

//edit page
import EditArticleModal from "./EditArticleModal";

//components
import LoadingLogo from "@/_components/Loading";
import CommentsSection from "@/_components/commentSection/CommentsSection";

//Icons
import {
  HandThumbUpIcon,
  ChatBubbleBottomCenterTextIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { HandThumbUpIcon as HandThumbUpSolidIcon } from "@heroicons/react/24/solid";

export default function ProfileArticles() {
  const [articles, setArticles] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [commentsCount, setCommentsCount] = useState({});
  const [lawyerId, setLawyerId] = useState(null);

  // get all articles and lawyer id
  useEffect(() => {
    const id = localStorage.getItem("uid");
    setLawyerId(id);

    const fetchArticles = async () => {
      if (!id) return console.error("No lawyer ID found");

      const response = await getLawyerArticles(id);

      if (response.success) {
        const articlesData = response.data;
        console.log("Fetched articles:", articlesData);

        setArticles(articlesData);
        setIsLoading(false);

        // Fetch comments count for each article
        const counts = {};
        for (const article of articlesData) {
          const count = await getCommentsCount(article.id);
          counts[article.id] = count;
        }
        setCommentsCount(counts);
        setLoading(false);
      } else {
        console.error("Failed to fetch articles:", response.error);
        setIsLoading(false);
        setLoading(false);
      }
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

  // delete method
  const handleDelete = async (id) => {
    Swal.fire({
      title: "هل أنت متأكد من حذف المقال؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "حذف",
      cancelButtonText: "الغاء",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteArticle(id);
        if (res?.success) {
          setArticles((prev) => prev.filter((a) => a.id !== id));
          Swal.fire({
            title: "لقد تم حذف المقال!",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "حدث خطأ أثناء حذف المقال.",
            icon: "error",
            confirmButtonText: "حسناً",
          });
        }
      }
    });
  };

  // edit modal handlers
  const handleEdit = (article) => {
    setSelectedArticle(article);
    setEditModalOpen(true);
  };

  const handleSaveEdit = async (updatedArticle) => {
    try {
      setLoading(true);
      await updateArticle(updatedArticle.id, {
        content: updatedArticle.content,
      });

      // update article locally
      setArticles((prev) =>
        prev.map((a) => (a.id === updatedArticle.id ? updatedArticle : a))
      );

      setEditModalOpen(false);
      setSelectedArticle(null);
    } catch (error) {
      console.error("Edit failed:", error);
      toast.error("فشل في تعديل المقال");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingLogo />;
  } else {
    return (
      <>
        <div className="max-w-4xl mx-auto mt-10">
          <h2 className="text-3xl font-bold mb-8 goldTxt">كل المقالات</h2>

          {articles.map((article) => {
            const isLiked =
              lawyerId &&
              Array.isArray(article.likes) &&
              article.likes.includes(lawyerId);
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

                <div className="p-5 ">
                  <p className="mb-3 font-normal subTxt leading-8 whitespace-pre-line break-words text-[15px] sm:text-[16px]">
                    {article.content}
                  </p>

                  <div className="flex justify-between items-center mt-8">
                    {/* edit & delete */}
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleEdit(article)}
                        type="button"
                        className="flex items-center gap-2 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                      >
                        <PencilIcon className="w-5 h-5" />
                        تعديل
                      </button>

                      <button
                        onClick={() => handleDelete(article.id)}
                        type="button"
                        className="flex items-center gap-2 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                      >
                        <TrashIcon className="w-5 h-5" />
                        حذف
                      </button>
                    </div>

                    {/* likes & comments */}
                    <div className="flex gap-8 mt-4 subTxt">
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

                          <CommentsSection articleId={article.id} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Edit Modal */}
        <EditArticleModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          article={selectedArticle}
          onSave={handleSaveEdit}
          loading={loading}
        />
      </>
    );
  }
}
