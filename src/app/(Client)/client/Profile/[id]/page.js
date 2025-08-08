"use client";
import React, { useEffect, useState } from "react";
import { fetchLawyerById } from "@/services/lawyer/FetchLawyerById";
import Image from "next/image";
import newRequest, {
  createRequest,
} from "@/logic/consultations/client/createRequest";

export default function LawyerProfileInfoForUser({ params }) {
  // get lawer id from url
  let { id } = params;
  const [lawyer, setLawyer] = useState(null);
  useEffect(() => {
    const getlawyer = async () => {
      const data = await fetchLawyerById(id);
      setLawyer(data);
    };
    getlawyer();
  }, []);

  //////////////////////////////////////////////////////////////////////////////////
  // request consultations
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [selectedLawyerId, setSelectedLawyerId] = useState(""); //تخزين ال id بتاع انهي محامي
  const handleSubmit = (e) => {
    e.preventDefault();
    newRequest({
      title: formData.title,
      description: formData.description,
      userId: "0hPemfz1O8Xd3RoEIyJ5GqO4BoH3",
      lawyerId: selectedLawyerId,
      createdAt: new Date().toISOString(),
      status: "pending",
      deletedByClient: false,
    });
    setFormData({ title: "", description: "" });
  };
  /////////////////////////////////////////////////////////////////////////////////////
  if (!lawyer) return <p>محامي غير موجود</p>;
  return (
    <div className=" min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-6xl  mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9B38C] opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#C9B38C] opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
          
          {/* Profile Image */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Image
                src={lawyer.profileImageUrl}
                alt="User"
                width={200}
                height={200}
                className="rounded-full border-6 border-[#C9B38C] shadow-2xl"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
            </div>
          </div>

          {/* Name and Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{lawyer.name}</h1>
            <p className="text-lg text-gray-600">محامي متخصص</p>
          </div>

          {/* Consultation Button */}
          <div className="flex justify-center">
            <div
              className="tooltip tooltip-bottom"
              data-tip="طلب استشارة"
            >
              <button 
                className="btn bgPrimary text-white px-8 py-3 rounded-xl hover:bgBtnHover focus:ring-4 focus:outline-none focus:bgBtnHover transform hover:scale-105 transition-all duration-200 shadow-lg"
                onClick={() => setSelectedLawyerId(lawyer.id)}
              >
                <label
                  htmlFor="create-post-modal"
                  className="cursor-pointer"
                >
                  طلب استشارة
                </label>
              </button>
            </div>
          </div>
        </div>

        {/* Consultation Modal */}
        <input
          type="checkbox"
          id="create-post-modal"
          className="modal-toggle"
        />
        <div className="modal">
          <div className="modal-box w-11/12 max-w-2xl bg-white rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-2xl text-gray-800">طلب الاستشارة</h3>
              <label htmlFor="create-post-modal" className="btn btn-sm btn-circle btn-ghost">✕</label>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">عنوان الاستشارة</label>
                <input
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    });
                  }}
                  type="text"
                  placeholder="أدخل عنوان الاستشارة"
                  className="input input-bordered w-full rounded-xl focus:ring-2 focus:ring-[#C9B38C] focus:border-[#C9B38C]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">محتوى الاستشارة</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    });
                  }}
                  className="textarea textarea-bordered w-full rounded-xl min-h-[120px] focus:ring-2 focus:ring-[#C9B38C] focus:border-[#C9B38C]"
                  placeholder="أدخل تفاصيل الاستشارة"
                ></textarea>
              </div>
            </div>

            <div className="modal-action gap-4 mt-8">
              <button
                onClick={handleSubmit}
                className="btn bgBtn text-white px-8 py-3 rounded-xl hover:bgBtnHover transform hover:scale-105 transition-all duration-200"
              >
                ارسال الطلب
              </button>
              <label htmlFor="create-post-modal" className="btn btn-outline px-8 py-3 rounded-xl">
                إغلاق
              </label>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">المعلومات الشخصية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all duration-200">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 bg-[#C9B38C] rounded-full mr-3"></div>
                <h5 className="text-sm font-medium text-gray-600">الإسم</h5>
              </div>
              <h3 className="text-lg pt-1.5 font-semibold text-gray-800">{lawyer.name}</h3>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all duration-200">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 bg-[#C9B38C] rounded-full mr-3"></div>
                <h5 className="text-sm font-medium text-gray-600">البريد الإلكترونى</h5>
              </div>
              <h3 className="text-lg pt-1.5 font-semibold text-gray-800">{lawyer.email}</h3>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all duration-200">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 bg-[#C9B38C] rounded-full mr-3"></div>
                <h5 className="text-sm font-medium text-gray-600">نبذة عنى</h5>
              </div>
              <h3 className="text-lg pt-1.5 font-semibold text-gray-800">محامى توب التوب والباقى فوتوشوب</h3>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all duration-200">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 bg-[#C9B38C] rounded-full mr-3"></div>
                <h5 className="text-sm font-medium text-gray-600">الهاتف</h5>
              </div>
              <h3 className="text-lg pt-1.5 font-semibold text-gray-800">{lawyer.phoneNumber}</h3>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all duration-200">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 bg-[#C9B38C] rounded-full mr-3"></div>
                <h5 className="text-sm font-medium text-gray-600">المدينة</h5>
              </div>
              <h3 className="text-lg pt-1.5 font-semibold text-gray-800">{lawyer.city}</h3>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all duration-200">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 bg-[#C9B38C] rounded-full mr-3"></div>
                <h5 className="text-sm font-medium text-gray-600">التخصصات</h5>
              </div>
              <h3 className="text-lg pt-1.5 font-semibold text-gray-800">{lawyer.specializations[0]}</h3>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">إنجازاتي</h2>
            <div className="w-12 h-12 bg-[#C9B38C] rounded-full flex items-center justify-center">
              <span className="text-white font-bold">🏆</span>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-[#C9B38C] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700 leading-relaxed">{lawyer.achievements}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
