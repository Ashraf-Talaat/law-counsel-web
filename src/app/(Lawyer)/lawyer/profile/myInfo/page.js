"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PencilIcon } from "@heroicons/react/24/solid";
import EditLawyerInfoModal from "@/_components/profileEdit/EditLawyerInfoModal";
import SelectSpecialtiesModal from "@/_components/profileEdit/SelectSpecialtiesModal";
import EditImageModal from "@/_components/profileEdit/EditImageModal";
import EditAchievementsModal from "@/_components/profileEdit/EditAchievementsModal";
import { updateLawyerProfile } from "@/utils/handleEditLawyerInfo";
import FeedBack from "@/_components/FeedBack";
import { useRouter } from "next/navigation";
import { useLawyer } from "@/context/LawyerContext"; // استخدم الكونتكست

// Firebase imports
import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function MyInfoProfile() {
  const { lawyer, setLawyer, loading } = useLawyer(); // ناخد القيم من الكونتكست
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSpecialtyModalOpen, setIsSpecialtyModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isAchievementsModalOpen, setIsAchievementsModalOpen] = useState(false);
  const [editingImageType, setEditingImageType] = useState(null);
  const router = useRouter();

  // جلب بيانات المحامي عند فتح الصفحة
  useEffect(() => {
    const fetchLawyerData = async () => {
      try {
        const lawyerId = localStorage.getItem("uid");
        if (!lawyerId) {
          console.error("لم يتم العثور على معرف المحامي");
          return;
        }

        const lawyerDocRef = doc(db, "lawyers", lawyerId);
        const lawyerDoc = await getDoc(lawyerDocRef);

        if (lawyerDoc.exists()) {
          const lawyerData = {
            id: lawyerDoc.id,
            ...lawyerDoc.data(),
          };
          setLawyer(lawyerData);
        } else {
          console.error("لم يتم العثور على بيانات المحامي");
        }
      } catch (error) {
        console.error("خطأ في جلب بيانات المحامي:", error);
      }
    };

    fetchLawyerData();

    // إعادة جلب البيانات عند العودة للصفحة
    const handleFocus = () => {
      fetchLawyerData();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [setLawyer]);

  // دالة لإعادة جلب البيانات يدوياً
  const refreshLawyerData = async () => {
    try {
      const lawyerId = localStorage.getItem("uid");
      if (!lawyerId) return;

      const lawyerDocRef = doc(db, "lawyers", lawyerId);
      const lawyerDoc = await getDoc(lawyerDocRef);

      if (lawyerDoc.exists()) {
        const lawyerData = {
          id: lawyerDoc.id,
          ...lawyerDoc.data(),
        };
        setLawyer(lawyerData);
      }
    } catch (error) {
      console.error("خطأ في إعادة جلب بيانات المحامي:", error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const openSpecialtyModal = () => setIsSpecialtyModalOpen(true);
  const openImageModal = (type) => {
    setEditingImageType(type);
    setIsImageModalOpen(true);
  };

  const handleSave = async (updatedData) => {
    try {
      const lawyerId = localStorage.getItem("uid");
      await updateLawyerProfile(lawyerId, updatedData);
      setLawyer((prev) => ({ ...prev, ...updatedData })); // تحديث الكونتكست
      router.refresh(); // إعادة تحميل الصفحة
    } catch (error) {
      console.error("خطأ أثناء حفظ البيانات:", error);
    }
  };

  const handleSpecialtySave = async (selectedSpecializations) => {
    try {
      const lawyerId = localStorage.getItem("uid");
      await updateLawyerProfile(lawyerId, {
        specializations: selectedSpecializations,
      });
      setLawyer((prev) => ({
        ...prev,
        specializations: selectedSpecializations,
      }));
      setIsSpecialtyModalOpen(false);
      router.refresh(); // إعادة تحميل الصفحة
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageSave = async (url) => {
    try {
      const lawyerId = localStorage.getItem("uid");
      const fieldToUpdate =
        editingImageType === "id" ? "idImageUrl" : "barAssociationImageUrl";
      await updateLawyerProfile(lawyerId, { [fieldToUpdate]: url });
      setLawyer((prev) => ({ ...prev, [fieldToUpdate]: url }));
      setIsImageModalOpen(false);
      router.refresh(); // إعادة تحميل الصفحة
    } catch (err) {
      console.error(err);
    }
  };

  const handleAchievementsSave = async (newAchievements) => {
    try {
      const lawyerId = localStorage.getItem("uid");
      await updateLawyerProfile(lawyerId, { achievements: newAchievements });
      setLawyer((prev) => ({ ...prev, achievements: newAchievements }));
      router.refresh(); // إعادة تحميل الصفحة
    } catch (error) {
      console.error(error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[40vh] bg-gray-50">
        <div className="w-8 h-8 border-3 border-[#C9B38C] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!lawyer)
    return (
      <p className="text-center mt-8 text-sm text-gray-600">
        تعذر تحميل البيانات
      </p>
    );

  return (
    <main dir="rtl" className="min-h-screen py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Card */}
        <div className="relative rounded-xl  mb-6">
          <div className="px-4 -mt-8 flex items-end justify-between flex-row-reverse">
            <div className="flex gap-2">
              <button
                onClick={refreshLawyerData}
                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-sm shadow-sm hover:shadow-md transition-all duration-200"
                title="تحديث البيانات"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                تحديث
              </button>
              <button
                onClick={openModal}
                className="bg-[#C9B38C] cursor-pointer hover:bg-[#C9B38C]  text-white px-4 py-1.5 rounded-lg flex items-center gap-1.5 text-sm shadow-sm hover:shadow-md transition-all duration-200"
              >
                <PencilIcon className="h-4 w-4" />
                تعديل
              </button>
            </div>
          </div>

          <div className="px-4 pb-4 pt-2 text-right">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InfoItem label="الإسم" value={lawyer.name || "غير متوفر"} />
              <InfoItem
                label="البريد الإلكترونى"
                value={lawyer.email || "غير متوفر"}
              />
              <InfoItem
                label="نبذة عنى"
                value={lawyer.aboutMe || "غير متوفر"}
              />
              <InfoItem
                label="الهاتف"
                value={lawyer.phoneNumber || "غير متوفر"}
              />
              <InfoItem label="المدينة" value={lawyer.city || "غير متوفر"} />
              <InfoItem
                label="السعر"
                value={
                  lawyer.price == null ? (
                    0
                  ) : (
                    <div className="flex justify-between">
                      <p>${lawyer.price} </p>
                      صافي الربح : ${lawyer.netPrice}
                    </div>
                  )
                }
              />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3">
              <FieldList
                title="مجال التخصص"
                items={
                  lawyer.specializations?.length > 0
                    ? lawyer.specializations
                    : ["غير محدد"]
                }
                onAddClick={openSpecialtyModal}
              />
              {/* <FieldList
                title=" اجمالي الربح"
                items={
                  // [lawyer.price - lawyer.price * 0.10]
                  lawyer.balance == null ? 0 : [lawyer.balance]
                }
              /> */}
              <h1>اجمالي الربح: ${lawyer.balance || 0}</h1>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ImageCard
                title="البطاقة الشخصية"
                src={lawyer.idImageUrl}
                onEdit={() => openImageModal("id")}
              />
              <ImageCard
                title="صورة الكارنيه"
                src={lawyer.barAssociationImageUrl}
                onEdit={() => openImageModal("bar")}
              />
            </div>
          </div>
        </div>

        {/* Achievements Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-right mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-800">إنجازاتي</h2>
            <button
              className="bg-[#C9B38C] hover:bg-[#b69d75] text-white px-3 py-1 rounded-lg text-sm cursor-pointer shadow-sm transition-colors"
              onClick={() => setIsAchievementsModalOpen(true)}
            >
              أضف إنجازاً
            </button>
          </div>
          <ul className="list-disc marker:text-[#C9B38C] list-inside bg-gray-50 rounded-lg p-3 space-y-2 text-sm text-gray-700">
            {lawyer.achievements && lawyer.achievements.trim() !== "" ? (
              lawyer.achievements.split("\n").map((ach, idx) => (
                <li key={idx} className="leading-relaxed">
                  {ach}
                </li>
              ))
            ) : (
              <li className="text-gray-500 italic">لا توجد إنجازات حتى الآن</li>
            )}
          </ul>
        </div>

        {/* feedback section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-[#C9B38C] to-[#b69d75] rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.12 3.436a1 1 0 00.95.69h3.614c.969 0 1.371 1.24.588 1.81l-2.923 2.12a1 1 0 00-.364 1.118l1.12 3.436c.3.921-.755 1.688-1.54 1.118l-2.923-2.12a1 1 0 00-1.176 0l-2.923 2.12c-.784.57-1.838-.197-1.539-1.118l1.12-3.436a1 1 0 00-.364-1.118L2.777 8.863c-.783-.57-.38-1.81.588-1.81h3.614a1 1 0 00.95-.69l1.12-3.436z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">التقييمات</h3>
          </div>
          {lawyer.feedback && lawyer.feedback.length > 0 ? (
            lawyer.feedback.map((feedback, i) => (
              <FeedBack
                rating={feedback.rating}
                name={feedback.nameClient}
                description={feedback.description}
                key={i}
              />
            ))
          ) : (
            <div>لا توجد تقييمات حتي الان</div>
          )}
        </div>

        {/* Modals */}
        <EditLawyerInfoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialData={lawyer}
          onSave={handleSave}
          router={router} // Pass the router to handle refresh
        />

        <SelectSpecialtiesModal
          isOpen={isSpecialtyModalOpen}
          onClose={() => setIsSpecialtyModalOpen(false)}
          initialSelected={lawyer.specializations || []}
          onSave={handleSpecialtySave}
        />

        <EditImageModal
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
          currentImage={
            editingImageType === "id"
              ? lawyer.idImageUrl
              : lawyer.barAssociationImageUrl
          }
          title={
            editingImageType === "id"
              ? "تعديل صورة الهوية"
              : "تعديل صورة الكارنيه"
          }
          onSave={handleImageSave}
        />

        <EditAchievementsModal
          isOpen={isAchievementsModalOpen}
          onClose={() => setIsAchievementsModalOpen(false)}
          currentAchievements={
            typeof lawyer?.achievements === "string"
              ? lawyer.achievements
                  .split("\n")
                  .map((item) => item.trim())
                  .filter((item) => item !== "")
              : []
          }
          onSave={handleAchievementsSave}
        />
      </div>
    </main>
  );
}

const InfoItem = ({ label, value }) => (
  <div className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
    <div className="text-xs text-gray-500 mb-1">{label}</div>
    <div className="text-sm font-medium text-gray-900">{value}</div>
  </div>
);

const FieldList = ({ title, items, onAddClick }) => (
  <div className="p-3">
    <h5 className="mb-2 text-xs text-gray-600 font-medium">{title}</h5>
    <div className="flex flex-wrap items-center gap-1.5">
      {items.map((item, idx) => (
        <span
          key={idx}
          className="inline-flex items-center rounded-md border border-[#C9B38C] text-[#C9B38C] bg-[#C9B38C]/10 px-2 py-1 text-xs"
        >
          {item}
        </span>
      ))}
      {onAddClick && (
        <button
          onClick={onAddClick}
          className="bg-[#C9B38C] hover:bg-[#b69d75] text-white px-2 py-1 rounded-md cursor-pointer text-xs transition-colors"
        >
          +
        </button>
      )}
    </div>
  </div>
);

const ImageCard = ({ title, src, onEdit }) => (
  <div className="p-3 space-y-2">
    <div className="flex items-center justify-between">
      <h5 className="text-sm font-medium text-gray-800">{title}</h5>
      <button
        onClick={onEdit}
        className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-700 text-xs transition-colors"
        aria-label={`تعديل ${title}`}
      >
        <PencilIcon className="w-3 h-3" />
        تعديل
      </button>
    </div>
    <div className="relative group">
      <Image
        src={src || "/placeholder.png"}
        alt={title}
        width={300}
        height={150}
        className="rounded-lg border border-gray-200 object-cover w-full h-32"
      />
      <div className="absolute inset-0 rounded-lg bg-black/0 group-hover:bg-black/20 transition-all duration-200" />
      <button
        onClick={onEdit}
        className="absolute inset-0 m-auto h-7 w-20 opacity-0 group-hover:opacity-100 bg-[#C9B38C] text-white rounded-md text-xs transition-all duration-200"
      >
        تعديل
      </button>
    </div>
  </div>
);

const Avatar = ({ src, name }) => (
  <div className="flex items-end gap-3">
    <div className="relative w-16 h-16 rounded-full ring-3 ring-white shadow-sm -mt-6 overflow-hidden">
      <Image
        src={src || "/placeholder.png"}
        alt={name || "Avatar"}
        fill
        className="object-cover"
      />
    </div>
    <div className="text-right">
      <p className="text-sm font-semibold text-gray-800">{name || "مستخدم"}</p>
      <p className="text-xs text-gray-500">
        عضو منذ {new Date().getFullYear()}
      </p>
    </div>
  </div>
);
