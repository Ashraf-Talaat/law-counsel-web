"use client";
import React, { useState } from "react";
import { storage } from "@/firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import Image from "next/image";

//Firebase
import createArticale from "@/logic/articles/createArticle";

//Icons
import {
  HandThumbUpIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";

export default function CreateArticlePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";

      if (imageFile) {
        const imageRef = ref(
          storage,
          `articles/${Date.now()}_${imageFile.name}`
        );
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      const response = await createArticale({
        title,
        content,
        imgUrl,
        lawyerId: "lawyer123", // Replace with actual lawyer ID
      });

      if (response.success) {
        alert("Article created successfully!");
        router.push("/lawyer/home/articles");
      } else {
        alert("Failed to create article: " + response.error.message);
      }
    } catch (error) {
      console.error("Error creating article: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Create Post</h1>
      <br />
      {/* start button to add post */}
      <div className="fixed bottom-25 left-25 z-50">
        <div className="tooltip tooltip-right" data-tip="إنشاء بوست جديد">
          <label
            className="flex items-center justify-center text-white bgBtn rounded-lg w-14 h-14 hover:bgBtnHover focus:ring-4 focus:outline-none focus:bgBtnHover"
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
                  <input
                    type="text"
                    placeholder="عنوان البوست"
                    className="input input-bordered w-full mb-3 "
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                  <textarea
                    className="textarea textarea-bordered w-full mb-3 outline-none"
                    placeholder="محتوى البوست"
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                  ></textarea>
                  <input
                    type="file"
                    accept="image/*"
                    className="file-input file-input-bordered w-full mb-3"
                    onChange={(e) => {
                      setImgUrl(e.target.files[0]);
                    }}
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
      {/* end button to add post */}
    </>
  );
}
