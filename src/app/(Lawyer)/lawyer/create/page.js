"use client";
import React, { useEffect, useState } from "react";

//Firebase

// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import createArticale from "@/logic/articles/createArticle";

export default function CreateArticlePage() {
  // articles useState
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // create btn useState
  const [showButton, setShowButton] = useState(true);

  // create article method
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    //upload img
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

      // call create method
      const response = await createArticale({
        content,
        imgUrl: imageUrl,
        lawyerId: "1LgdtODjbta0gnUVWaGNwFqmMTm2",
      });

      if (response.success) {
        setContent("");
        setImageFile(null);

        document.getElementById("create-post-modal").checked = false;

        alert("Article created successfully!");
      } else {
        alert("Failed to create article: " + response.error.message);
      }
    } catch (error) {
      console.error("Error creating article: ", error);
    } finally {
      setLoading(false);
    }
  };

  // hide create btn
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setShowButton(false);
        } else {
          setShowButton(true);
        }
      },
      { threshold: 0.5 }
    );

    const footer = document.getElementById("footer");
    if (footer) observer.observe(footer);

    return () => {
      if (footer) observer.unobserve(footer);
    };
  }, []);

  return (
    <>
      <div className="fixed bottom-25 left-25 z-50">
        <div className="tooltip tooltip-right" data-tip="إنشاء بوست جديد">
          {/* create Btn  */}
          {showButton && (
            <label
              className={`flex items-center justify-center text-white bgBtn rounded-lg w-14 h-14 hover:bgBtnHover focus:ring-4 focus:outline-none focus:bgBtnHover transition-opacity duration-300 `}
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

          {/* article form */}
          <div className="modal">
            <div className="modal-box w-11/12 max-w-2xl">
              <h3 className="font-bold text-lg">إنشاء بوست جديد</h3>
              <form onSubmit={handleSubmit}>
                <div className="py-4">
                  {/* content input  */}
                  <textarea
                    className="textarea textarea-bordered w-full mb-3 outline-none"
                    placeholder="محتوى البوست"
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                  ></textarea>

                  {/* image input  */}
                  <input
                    type="file"
                    accept="image/*"
                    className="file-input file-input-bordered w-full mb-3"
                    onChange={(e) => {
                      setImageFile(e.target.files[0]);
                    }}
                  />
                </div>

                {/* Buttons of send and close  */}
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
