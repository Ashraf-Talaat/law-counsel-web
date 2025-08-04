"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowLeftEndOnRectangleIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

function EditProfileModal({ isOpen, onClose, userData, onSave }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (userData) {
      setName(userData.name || "");
      setEmail(userData.email || "");
      setPhone(userData.phone || "");
    }
  }, [userData]);

  const handleSave = () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      return Swal.fire({
        title: "يرجى ملء جميع الحقول",
        icon: "warning",
        position: "center",
      });
    }
    onSave({ name, email, phone });
    onClose();
    Swal.fire({
      title: "تم التعديل بنجاح!",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  if (!isOpen) return null;

  return (
    <dialog open className="modal">
      <div className="modal-box max-w-xl">
        <h3 className="font-bold text-lg mb-4">تعديل البيانات الشخصية</h3>

        <input
          className="w-full mb-3 p-2 border border-gray-300 rounded"
          placeholder="الاسم"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full mb-3 p-2 border border-gray-300 rounded"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full mb-3 p-2 border border-gray-300 rounded"
          placeholder="رقم الهاتف"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <div className="modal-action flex justify-end gap-4">
          <button className="btn bgBtn text-white" onClick={handleSave}>
            حفظ التعديلات
          </button>
          <button className="btn" onClick={onClose}>
            إغلاق
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default function UserProfileInfo() {
  const [userData, setUserData] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const userId =
    typeof window !== "undefined" ? localStorage.getItem("uid") : null;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      try {
        const docRef = doc(db, "clients", userId); 
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } catch (error) {
        toast.error("فشل في جلب البيانات");
      }
    };
    fetchUserData();
  }, [userId]);

  const handleSave = async (newData) => {
    try {
      const docRef = doc(db, "clients", userId); 
      await updateDoc(docRef, newData);
      setUserData((prev) => ({ ...prev, ...newData }));
    } catch (error) {
      toast.error("حدث خطأ أثناء التعديل");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("uid");
    toast.success("تم تسجيل الخروج");
    window.location.href = "/login";
  };

  const handleDeleteAccount = async () => {
    const confirm = await Swal.fire({
      title: "هل أنت متأكد؟",
      text: "سيتم حذف الحساب نهائيًا!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "نعم، احذف",
      cancelButtonText: "إلغاء",
    });

    if (!confirm.isConfirmed) return;

    try {
      await deleteDoc(doc(db, "clients", userId)); 
      localStorage.removeItem("uid");
      toast.success("تم حذف الحساب");
      window.location.href = "/login";
    } catch (err) {
      toast.error("حدث خطأ أثناء حذف الحساب");
    }
  };

  if (!userData) return <p className="text-center mt-10">جاري التحميل...</p>;

  return (
    <>
      <div className="relative bg-white rounded-2xl shadow-lg p-10 text-right max-w-6xl min-h-[350px] mx-auto mb-12">
        <PencilSquareIcon
          onClick={() => setIsEditOpen(true)}
          className="h-6 w-6 text-gray-500 hover:text-blue-600 cursor-pointer absolute top-4 left-4"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="pb-3 border-b border-gray-300">
            <h5 className="text-sm text-gray-500 mb-1">الاسم</h5>
            <h2 className="text-2xl">{userData.name}</h2>
          </div>
          <div className="pb-3 border-b border-gray-300">
            <h5 className="text-sm text-gray-500 mb-1">البريد الإلكتروني</h5>
            <h2 className="text-2xl">{userData.email}</h2>
          </div>
          <div className="pb-3 border-b border-gray-300">
            <h5 className="text-sm text-gray-500 mb-1">رقم الهاتف</h5>
            <h2 className="text-2xl">{userData.phone}</h2>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-8">
        <button
          className="flex items-center gap-3 bg-[#C9B38C] hover:bg-[#b69d75] text-white px-4 py-2 rounded-lg cursor-pointer"
          onClick={handleLogout}
        >
          تسجيل الخروج
          <ArrowLeftEndOnRectangleIcon className="h-5 w-5" />
        </button>

        <button
          onClick={handleDeleteAccount}
          className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          مسح الأكونت
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>

      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        userData={userData}
        onSave={handleSave}
      />
    </>
  );
}