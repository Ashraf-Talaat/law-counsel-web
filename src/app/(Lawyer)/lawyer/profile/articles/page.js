"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

//alert
import Swal from "sweetalert2";
import toast from "react-hot-toast";

//logic
import getAllArticles from "@/logic/articles/getAllArticles";
import deleteArticle from "@/logic/articles/deleteArticle";
import updateArticle from "@/logic/articles/updateArticle";

//edit page
import EditArticleModal from "./EditArticleModal";

//Icons
import {
  HandThumbUpIcon,
  ChatBubbleBottomCenterTextIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

export default function ProfileArticles() {
  const [articles, setArticles] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(false);

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

  return (
    <>
      <div className="max-w-4xl mx-auto mt-10">
        <h2 className="text-3xl font-bold mb-8 goldTxt">كل المقالات</h2>

        {articles.map((article) => (
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
        ))}
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
