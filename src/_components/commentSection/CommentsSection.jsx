"use client";
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { getAuth } from "firebase/auth";

//alert
import Swal from "sweetalert2";
import toast from "react-hot-toast";

export default function CommentsSection({ articleId }) {
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
    });

    return () => unsubscribe();
  }, [articleId]);

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
    if (!newComment.trim()) return;

    await addDoc(collection(db, "articles", articleId, "comments"), {
      userId: user.uid,
      userName: user.displayName || "مستخدم",
      content: newComment.trim(),
      createdAt: new Date(),
    });

    setNewComment("");
  };

  return (
    <>
      {/*  comments list */}
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

      {/*  add comment form */}
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
