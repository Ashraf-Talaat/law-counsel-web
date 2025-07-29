"use client";
import React, { useEffect, useState } from "react";
import createArticale from "@/logic/articles/createArticle";

//alert
import Swal from "sweetalert2";
import toast from "react-hot-toast";

export default function CreateArticlePage() {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!content.trim()) {
      Swal.fire({
        title: "المحتوى فارغ!",
        text: "من فضلك اكتب محتوى للمقال قبل الإرسال.",
        icon: "warning",
        confirmButtonText: "حسناً",
      });
      return;
    }

    try {
      const response = await createArticale({
        content,
        imageUrl,
        lawyerId: "1LgdtODjbta0gnUVWaGNwFqmMTm2",
      });

      if (response.success) {
        setContent("");
        setImageUrl("");
        document.getElementById("create-post-modal").checked = false;
        Swal.fire({
          title: "تم إنشاء المقال بنجاح!",
          icon: "success",
          position: "center",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          title: "خطأ أثناء إنشاء المقال:",
          body: response.error.message,
          icon: "error",
          position: "center",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("خطأ أثناء إنشاء المقال:", error);

      Swal.fire({
        title: "خطأ أثناء إنشاء المقال:",
        body: error,
        icon: "error",
        position: "center",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setShowButton(!entries[0].isIntersecting);
      },
      { threshold: 0.5 }
    );

    const footer = document.getElementById("footer");
    if (footer) observer.observe(footer);

    return () => {
      if (footer) observer.unobserve(footer);
    };
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);

    try {
      const res = await fetch("/api/uploadimg", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setImageUrl(data.url);
        toast.success("تم رفع الصورة بنجاح!");
      } else {
        console.error("رفع الصورة فشل:", data.error);

        toast.error("حدث خطأ أثناء رفع الصورة");
      }
    } catch (err) {
      toast.error("حدث خطأ أثناء رفع الصورة");

      console.error("خطأ أثناء رفع الصورة:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-25 left-25 z-50">
        <div className="tooltip tooltip-right" data-tip="إنشاء بوست جديد">
          {showButton && (
            <label
              className="flex items-center justify-center text-white bgBtn rounded-lg w-14 h-14 hover:bgBtnHover focus:ring-4 focus:outline-none focus:bgBtnHover transition duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1"
              htmlFor="create-post-modal"
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m13.835 7.578-.005.007-7.137 7.137 2.139 2.138 7.143-7.142-2.14-2.14Zm-10.696 3.59 2.139 2.14 7.138-7.137.007-.005-2.141-2.141-7.143 7.143Zm1.433 4.261L2 12.852.051 18.684a1 1 0 0 0 1.265 1.264L7.147 18l-2.575-2.571Zm14.249-14.25a4.03 4.03 0 0 0-5.693 0L11.7 2.611 17.389 8.3l1.432-1.432a4.029 4.029 0 0 0 0-5.689Z" />
              </svg>
            </label>
          )}

          <input
            type="checkbox"
            id="create-post-modal"
            className="modal-toggle"
          />
          <div className="modal">
            <div className="modal-box w-11/12 max-w-2xl">
              <h3 className="font-bold text-lg">إنشاء بوست جديد</h3>
              <form onSubmit={handleSubmit}>
                <div className="py-4">
                  <textarea
                    className="textarea textarea-bordered w-full mb-3 outline-none"
                    placeholder="محتوى البوست"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>

                  <input
                    type="file"
                    accept="image/*"
                    className="file-input file-input-bordered w-full mb-3"
                    onChange={handleUpload}
                  />
                </div>

                <div className="modal-action gap-8">
                  <button
                    type="submit"
                    className="btn bgBtn text-white px-6"
                    disabled={loading}
                  >
                    {loading ? "جاري الحفظ..." : "نشر المقال"}
                  </button>
                  <label htmlFor="create-post-modal" className="btn">
                    إغلاق
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
