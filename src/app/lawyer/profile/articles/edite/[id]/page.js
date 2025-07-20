"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { updateArticle } from "@/logic/articles/updateArticle";

export default function EditArticlePage() {
  const { id } = useParams();
  const router = useRouter();
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      const docRef = doc(db, "articles", id);
      const snapshot = await getDoc(docRef);
      const data = snapshot.data();
      setContent(data.content);
    };

    fetchArticle();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateArticle(id, { content });
    if (res.success) {
      alert("تم تحديث المقال");
      router.push("/lawyer/profile/articles");
    } else {
      alert("حدث خطأ");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-xl font-bold mb-4">تعديل المقال</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="محتوى المقال"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="textarea textarea-bordered w-full mb-4"
          rows={5}
          required
        />

        <button type="submit" className="btn bgBtn text-white w-full">
          حفظ التعديلات
        </button>
      </form>
    </div>
  );
}
