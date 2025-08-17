"use client";
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { getAuth } from "firebase/auth";

//alert
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { fetchLawyerById } from "@/services/lawyer/FetchLawyerById";

export default function CommentsSection({ articleId, setCommentsCount }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const q = query(
      collection(db, "articles", articleId, "comments"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(data);

      // 👇 check قبل ما نستخدمها
      if (typeof setCommentsCount === "function") {
        setCommentsCount((prevCounts) => ({
          ...prevCounts,
          [articleId]: data.length,
        }));
      }
    });

    return () => unsubscribe();
  }, [articleId, setCommentsCount]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire({
        title: "يجب تسجيل الدخول أولاً لكتابه تعليق",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
        position: "center",
      });
      return;
    }

    const lawyer = await fetchLawyerById(user.uid);

    if (!lawyer) {
      Swal.fire({
        title: "لا يمكن العثور على بيانات المحامي",
        icon: "error",
        showConfirmButton: true,
        position: "center",
      });
      return;
    }

    if (!newComment.trim()) return;

    try {
      await addDoc(collection(db, "articles", articleId, "comments"), {
        userId: user.uid,
        userName: lawyer.name || "مستخدم",
        content: newComment.trim(),
        createdAt: serverTimestamp(),
      });

      setNewComment("");
      toast.success("تم إضافة التعليق بنجاح");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("حدث خطأ أثناء إضافة التعليق");
    }
  };

  return (
    <>
      {/* comments list */}
      <div className="max-h-60 overflow-y-auto mb-4 space-y-3">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="border rounded p-2 text-sm text-gray-700"
          >
            <strong>{comment.userName}: </strong> {comment.content}
          </div>
        ))}
      </div>

      {/* add comment form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="اكتب تعليقك..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit" className="btn bgBtn text-white">
          إرسال
        </button>
      </form>
    </>
  );
}
