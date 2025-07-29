"use client";
import React, { useState, useEffect } from "react";

//alert
import Swal from "sweetalert2";
import toast from "react-hot-toast";

export default function EditArticleModal({
  isOpen,
  onClose,
  article,
  onSave,
  loading,
}) {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (article) setContent(article.content || "");
  }, [article]);

  const handleSave = () => {
    if (!content.trim())
      return Swal.fire({
        title: "من فضلك اكتب محتوى المقال",
        icon: "warning",
        position: "center",
      });
    onSave({ ...article, content });
    Swal.fire({
      title: "تم تعديل المقال بنجاح!",
      icon: "success",
      position: "center",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  if (!isOpen || !article) return null;

  return (
    <dialog open className="modal">
      <div className="modal-box max-w-xl">
        <h3 className="font-bold text-lg mb-4">تعديل المقال</h3>

        <textarea
          className="textarea textarea-bordered w-full mb-4"
          placeholder="محتوى المقال"
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <div className="modal-action flex justify-end gap-4">
          <button
            className="btn bgBtn text-white"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "جاري التعديل..." : "حفظ التعديلات"}
          </button>
          <button className="btn" onClick={onClose}>
            إغلاق
          </button>
        </div>
      </div>
    </dialog>
  );
}
