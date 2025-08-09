"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PencilIcon } from "@heroicons/react/24/solid";
import { getLawyerData } from "@/utils/getLawyerdate";
import EditLawyerInfoModal from "@/_components/profileEdit/EditLawyerInfoModal";
import SelectSpecialtiesModal from "@/_components/profileEdit/SelectSpecialtiesModal";
import EditImageModal from "@/_components/profileEdit/EditImageModal";
import EditAchievementsModal from "@/_components/profileEdit/EditAchievementsModal";
import { updateLawyerProfile } from "@/utils/handleEditLawyerInfo";

export default function MyInfoProfile() {
  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSpecialtyModalOpen, setIsSpecialtyModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isAchievementsModalOpen, setIsAchievementsModalOpen] = useState(false);
  const [editingImageType, setEditingImageType] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const lawyerId = localStorage.getItem("uid");
      if (!lawyerId) return;

      try {
        const data = await getLawyerData(lawyerId);
        setLawyer(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (typeof window !== "undefined") {
      fetchData();
    }
  }, []);

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
      setLawyer((prev) => ({ ...prev, ...updatedData }));
    } catch (error) {
      console.error("\u062e\u0637\u0623 \u0623\u062b\u0646\u0627\u0621 \u062d\u0641\u0638 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a:", error);
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
    } catch (err) {
      console.error(err);
    }
  };

  const handleAchievementsSave = async (newAchievements) => {
    try {
      const lawyerId = localStorage.getItem("uid");
      await updateLawyerProfile(lawyerId, { achievements: newAchievements });
      setLawyer((prev) => ({ ...prev, achievements: newAchievements }));
    } catch (error) {
      console.error( error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[50vh] bg-gray-50">
        <div className="w-12 h-12 border-4 border-[#C9B38C] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!lawyer) return <p className="text-center mt-10">تعذر تحميل البيانات</p>;

  return (
    <main dir="rtl" className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Card */}
        <div className="relative bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 overflow-hidden mb-8">
          <div className="h-28 bg-gradient-to-l from-[#C9B38C] to-[#b69d75]" />
          <div className="px-6 -mt-10 flex items-end justify-between flex-row-reverse">
            <Avatar src={lawyer.profileImageUrl} name={lawyer.name} />
            <button
              onClick={openModal}
              className="bgPrimary text-white px-5 py-2 rounded-full flex items-center gap-2 shadow-sm hover:shadow transition"
            >
              <PencilIcon className="h-5 w-5" />
              تعديل
            </button>
          </div>

          <div className="px-6 pb-6 pt-4 text-right">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoItem label="الإسم" value={lawyer.name || "غير متوفر"} />
              <InfoItem label="البريد الإلكترونى" value={lawyer.email || "غير متوفر"} />
              <InfoItem label="نبذة عنى" value={lawyer.aboutMe || "غير متوفر"} />
              <InfoItem label="الهاتف" value={lawyer.phoneNumber || "غير متوفر"} />
              <InfoItem label="المدينة" value={lawyer.city || "غير متوفر"} />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4">
              <FieldList
                title="مجال التخصص"
                items={
                  lawyer.specializations?.length > 0
                    ? lawyer.specializations
                    : ["غير محدد"]
                }
                onAddClick={openSpecialtyModal}
              />
              <FieldList
                title="سعر الخدمة"
                items={
                  lawyer.prices?.length > 0
                    ? lawyer.prices.map((p) => `${p} جنيه`)
                    : ["100 جنيه"]
                }
              />
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
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
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-6 text-right">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">إنجازاتي</h1>
            <button
              className="bg-[#C9B38C] hover:bg-[#b69d75] text-white px-3 py-1 rounded-full cursor-pointer shadow-sm"
              onClick={() => setIsAchievementsModalOpen(true)}
            >
              أضف إنجازاً
            </button>
          </div>
          <ul className="mt-4 list-disc marker:text-[#C9B38C] list-inside bg-gray-50 rounded-xl p-5 space-y-3 text-gray-800">
            {lawyer.achievements && lawyer.achievements.trim() !== "" ? (
              lawyer.achievements
                .split("\n")
                .map((ach, idx) => (
                  <li key={idx} className="leading-relaxed tracking-wide">
                    {ach}
                  </li>
                ))
            ) : (
              <li className="text-gray-500 italic">لا توجد إنجازات حتى الآن</li>
            )}
          </ul>
        </div>

        {/* Modals */}
        <EditLawyerInfoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialData={lawyer}
          onSave={handleSave}
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
  <div className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
    <div className="text-xs text-gray-500 mb-1">{label}</div>
    <div className="text-lg font-medium text-gray-900">{value}</div>
  </div>
);

const FieldList = ({ title, items, onAddClick }) => (
  <div className="p-4">
    <h5 className="mb-3 text-sm text-gray-600">{title}</h5>
    <div className="flex flex-wrap items-center gap-2">
      {items.map((item, idx) => (
        <span
          key={idx}
          className="inline-flex items-center rounded-full border border-[#C9B38C] text-[#C9B38C] bg-[#C9B38C]/10 px-3 py-1 text-sm"
        >
          {item}
        </span>
      ))}
      {onAddClick && (
        <button
          onClick={onAddClick}
          className="bg-[#C9B38C] hover:bg-[#b69d75] text-white px-3 py-1 rounded-full cursor-pointer text-sm"
        >
          +
        </button>
      )}
    </div>
  </div>
);

const ImageCard = ({ title, src, onEdit }) => (
  <div className="m-5 p-4 space-y-2">
    <div className="flex items-center justify-between">
      <h5 className="text-lg font-medium">{title}</h5>
      <button
        onClick={onEdit}
        className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-800 text-sm"
        aria-label={`تعديل ${title}`}
      >
        <PencilIcon className="w-4 h-4" />
        تعديل
      </button>
    </div>
    <div className="relative group">
      <Image
        src={src || "/placeholder.png"}
        alt={title}
        width={300}
        height={150}
        className="rounded-lg border object-cover w-full h-40"
      />
      <div className="absolute inset-0 rounded-lg bg-black/0 group-hover:bg-black/30 transition" />
      <button
        onClick={onEdit}
        className="absolute inset-0 m-auto h-9 w-24 opacity-0 group-hover:opacity-100 bg-[#C9B38C] text-white rounded-full text-sm transition"
      >
        تعديل
      </button>
    </div>
  </div>
);

const Avatar = ({ src, name }) => (
  <div className="flex items-end gap-4">
    <div className="relative w-20 h-20 rounded-full ring-4 ring-white shadow -mt-6 overflow-hidden">
      <Image
        src={src || "/placeholder.png"}
        alt={name || "Avatar"}
        fill
        className="object-cover"
      />
    </div>
    <div className="text-right">
      <p className="text-lg font-semibold text-gray-800">{name || "مستخدم"}</p>
      <p className="text-xs text-gray-500">عضو منذ {new Date().getFullYear()}</p>
    </div>
  </div>
);