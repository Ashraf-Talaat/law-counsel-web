"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

//icons
import { PencilIcon } from "@heroicons/react/24/solid";

//components
import EditLawyerInfoModal from "@/_components/profileEdit/EditLawyerInfoModal";
import SelectSpecialtiesModal from "@/_components/profileEdit/SelectSpecialtiesModal";
import EditImageModal from "@/_components/profileEdit/EditImageModal";
import EditAchievementsModal from "@/_components/profileEdit/EditAchievementsModal";
import LoadingLogo from "@/_components/Loading";

//utils
import { getLawyerData } from "@/utils/getLawyerdate";
import { updateLawyerProfile } from "@/utils/handleEditLawyerInfo";

export default function MyInfoProfile() {
  const [lawyer, setLawyer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSpecialtyModalOpen, setIsSpecialtyModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isAchievementsModalOpen, setIsAchievementsModalOpen] = useState(false);
  const [editingImageType, setEditingImageType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
      }
    };

    if (typeof window !== "undefined") {
      fetchData();
    }
    setIsLoading(false);
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
      console.error(
        "\u062e\u0637\u0623 \u0623\u062b\u0646\u0627\u0621 \u062d\u0641\u0638 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a:",
        error
      );
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

  //******************************************************************************* */
  const InfoItem = ({ label, value }) => (
    <div className="m-5 p-4 space-y-3">
      <h5>{label} :</h5>
      <h2 className="text-2xl">{value}</h2>
      <hr />
    </div>
  );

  const FieldList = ({ title, items, onAddClick }) => (
    <div className="m-5 p-4 space-x-3">
      <h5 className="mb-5">{title}</h5>
      {items.map((item, idx) => (
        <span
          key={idx}
          className="border border-goldTxt px-3 py-1 rounded-full mx-1"
        >
          {item}
        </span>
      ))}
      {onAddClick && (
        <button
          onClick={onAddClick}
          className="bg-[#C9B38C] hover:bg-[#b69d75] text-white px-3 py-1 rounded-full cursor-pointer"
        >
          +
        </button>
      )}
    </div>
  );

  const ImageCard = ({ title, src, onEdit }) => (
    <div className="m-5 p-4 space-y-2">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-medium">{title}</h5>
        <PencilIcon
          className="w-5 h-5 text-gray-600 cursor-pointer"
          onClick={onEdit}
        />
      </div>
      <Image
        src={src || "/placeholder.png"}
        alt={title}
        width={300}
        height={150}
        className="rounded-lg border"
      />
    </div>
  );

// <<<<<<< ashraf-connect
//   //******************************************************************************* */

//   if (isLoading) {
//     return <LoadingLogo />;
//   } else {
//     if (!lawyer)
//       return <p className="text-center mt-10">تعذر تحميل البيانات</p>;
// =======
      <div className="bg-white rounded-lg shadow-md p-4 text-right max-w-3xl mx-auto my-9">
        <div className="flex justify-between items-center m-3 p-5">
          <h1 className="text-xl font-bold">إنجازاتي</h1>
          <button
            className="bg-[#C9B38C] hover:bg-[#b69d75] text-white px-3 py-1 rounded-full cursor-pointer"
            onClick={() => setIsAchievementsModalOpen(true)}
          >
            أضف إنجازاً
          </button>
        </div>
      <ul className="list-disc list-inside bg-gray-50 rounded-lg p-5 m-3 space-y-3 text-gray-800">
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


    return (
      <>
        <div className="bg-white rounded-lg shadow-md p-4 text-right max-w-3xl mx-auto mb-10">
          <div className="flex justify-end m-3 p-5">
            <button
              onClick={openModal}
              className="bgPrimary text-white px-5 py-2 rounded-full flex items-center gap-2"
            >
              <PencilIcon className="h-5 w-5" />
              تعديل
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
            <InfoItem label="الإسم" value={lawyer.name || "غير متوفر"} />
            <InfoItem
              label="البريد الإلكترونى"
              value={lawyer.email || "غير متوفر"}
            />
            <InfoItem label="نبذة عنى" value={lawyer.aboutMe || "غير متوفر"} />
            <InfoItem
              label="الهاتف"
              value={lawyer.phoneNumber || "غير متوفر"}
            />
            <InfoItem label="المدينة" value={lawyer.city || "غير متوفر"} />
          </div>

          <div className="grid grid-cols-1 gap-2 mb-2">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-2">
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

// <<<<<<< ashraf-connect
//         <div className="bg-white rounded-lg shadow-md p-4 text-right max-w-3xl mx-auto my-9">
//           <div className="flex justify-between items-center m-3 p-5">
//             <h1 className="text-xl font-bold">إنجازاتي</h1>
//             <button
//               className="bg-[#C9B38C] hover:bg-[#b69d75] text-white px-3 py-1 rounded-full cursor-pointer"
//               onClick={() => setIsAchievementsModalOpen(true)}
//             >
//               أضف إنجازاً
//             </button>
//           </div>
//           <ul className="list-disc list-inside m-3 p-5 space-y-2">
//             {lawyer.achievements && lawyer.achievements.length > 0 ? (
//               lawyer.achievements.map((ach, idx) => <li key={idx}>{ach}</li>)
//             ) : (
//               <li>لا توجد إنجازات حتى الآن</li>
//             )}
//           </ul>
//         </div>

   <EditAchievementsModal
  isOpen={isAchievementsModalOpen}
  onClose={() => setIsAchievementsModalOpen(false)}
 currentAchievements={
  typeof lawyer?.achievements === "string"
    ? lawyer.achievements.split("\n").map(item => item.trim()).filter(item => item !== "")
    : []
}

  onSave={handleAchievementsSave}
/>


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
            Array.isArray(lawyer?.achievements) ? lawyer.achievements : []
          }
          onSave={handleAchievementsSave}
        />
      </>
    );
  }
}
