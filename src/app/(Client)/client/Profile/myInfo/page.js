"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowLeftEndOnRectangleIcon,
  PencilSquareIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import LoadingLogo from "@/_components/Loading";
import { uploadImage } from "@/utils/handleUrlImg";
import Cookies from "js-cookie";

function EditProfileModal({ isOpen, onClose, userData, onSave }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [imageUrl, setImgUrl]= useState("");

  useEffect(() => {
    if (userData) {
      setName(userData.name || "");
      setEmail(userData.email || "");
      setPhone(userData.phone || "");
      setImgUrl(userData.imageUrl||"");
    }
  }, [userData]);

  const handleSave = () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !imageUrl.trim()) {
      return Swal.fire({
        title: "يرجى ملء جميع الحقول",
        icon: "warning",
        position: "center",
      });
    }
    onSave({ name, email, phone , imageUrl });
    onClose();
    Swal.fire({
      title: "تم التعديل بنجاح!",
      icon: "success",
      timer: 1500,
      showConfirmButton: false, 
    });
  };

  const handleImageChange = async(e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const url = await uploadImage(file);
    console.log(url);
    setImgUrl(url);
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

        {imageUrl && (
          <Image
            src={imageUrl}
            alt="معاينة الصورة"
            className="w-24 h-24 rounded-full object-cover mb-3"
            width={70}
            height={70}
          />
        )}
        <input
          type="file"
          accept="image/*"
          className="w-full mb-3 p-2 border border-gray-300 rounded file:mr-4 file:py-2 file:px-4"
          onChange={handleImageChange}
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
    localStorage.removeItem("userType");
    Cookies.remove("userType")
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

  if (!userData) return<LoadingLogo/>;

  return (
    <>
      {/* Modern Profile Layout with Separate Cards */}
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Page Header */}
         

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* User Info Card - Small */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 text-center relative">
                
                {/* Edit Icon */}
                <button
                  onClick={() => setIsEditOpen(true)}
                  className="absolute top-4 left-4 p-2 rounded-full bg-indigo-100 hover:[#687693] transition-colors duration-200"
                >
                  <PencilSquareIcon className="h-5 w-5 text-[#262b3e]" />
                </button>

                {/* Accent bar */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#262b3e] to-[#687693] rounded-t-3xl" />

                {/* Profile Image */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="w-full h-full rounded-full ring-4 ring-indigo-500/20 overflow-hidden">
                    <Image
                      src={userData?.imageUrl || "/images/logo-dark.png"}
                      alt="صورة المستخدم"
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  
                </div>

                {/* User Name */}
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {userData.name}
                </h2>
                
                {/* Quick Info Badges */}
                <div className="space-y-3 mb-8 ">
                  <div className="inline-flex mx-2 items-center gap-2 px-4 py-2 rounded-full bg-[#262b3e23] text-[#262b3e] text-sm">
                    <EnvelopeIcon className="h-4 w-4" />
                    <span className="truncate max-w-[150px]">{userData.email}</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#262b3e23] text-[#262b3e] text-sm">
                    <PhoneIcon className="h-4 w-4" />
                    {userData.phone}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#262b3e] to-[#6a7899] hover:from-[#687693] hover:to-[#1c202e] text-white px-6 py-3 rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <ArrowLeftEndOnRectangleIcon className="h-5 w-5" />
                    تسجيل الخروج
                  </button>

                  <button
                    onClick={handleDeleteAccount}
                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <TrashIcon className="h-5 w-5" />
                    حذف الحساب
                  </button>
                </div>
              </div>
            </div>

            {/* Data Card - Takes remaining space */}
            <div className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
                
                {/* Card Header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#262b3e5e] to-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#262b3e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">البيانات الشخصية</h3>
                    <p className="text-gray-600">معلوماتك الأساسية المسجلة في النظام</p>
                  </div>
                </div>

                {/* Data Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Name Field */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <h5 className="text-sm font-semibold text-indigo-700">الاسم الكامل</h5>
                    </div>
                    <p className="text-xl font-bold text-gray-800">{userData.name}</p>
                  </div>

                  {/* Email Field */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <EnvelopeIcon className="w-5 h-5 text-green-600" />
                      </div>
                      <h5 className="text-sm font-semibold text-green-700">البريد الإلكتروني</h5>
                    </div>
                    <p className="text-xl font-bold text-gray-800 break-all">{userData.email}</p>
                  </div>

                  {/* Phone Field */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200/50 md:col-span-2">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <PhoneIcon className="w-5 h-5 text-purple-600" />
                      </div>
                      <h5 className="text-sm font-semibold text-purple-700">رقم الهاتف</h5>
                    </div>
                    <p className="text-xl font-bold text-gray-800">{userData.phone}</p>
                  </div>

                  
                </div>
              </div>
            </div>
          </div>
        </div>
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