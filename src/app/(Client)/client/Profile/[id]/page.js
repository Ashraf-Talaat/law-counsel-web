"use client";
import React, { useEffect, useState } from "react";
import { fetchLawyerById } from "@/services/lawyer/FetchLawyerById";
import Image from "next/image";
import newRequest, {
  createRequest,
} from "@/logic/consultations/client/createRequest";
import LoadingLogo from "@/_components/Loading";
import toast, { Toaster } from "react-hot-toast";
import { getDoc ,doc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import FeedBack from "@/_components/FeedBack";

export default  function LawyerProfileInfoForUser({ params }) {
  // get lawer id from url
  let { id } =  React.use(params);
  const [lawyer, setLawyer] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [nameClient, setNameClient] = useState('');
  const uid = localStorage.getItem("uid");
  useEffect(() => {
    const getlawyer = async () => {
      const data = await fetchLawyerById(id);
      setLawyer(data);
    };
    const getNames = async () => {
      const clientDoc = await getDoc(doc(db, 'clients', uid));
      const nClient = clientDoc.exists() ? clientDoc.data().name : 'عميل';
      setNameClient(nClient);
      console.log(nClient);
      // const lawyerDoc = await getDoc(doc(db, 'lawyers', lawyer));
      // const nLawyer = lawyerDoc.exists() ? lawyerDoc.data().name : 'محامي';
    }
    getNames();
    getlawyer();
    setLoading(false);
  }, []);

  //////////////////////////////////////////////////////////////////////////////////
  // request consultations
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [selectedLawyerId, setSelectedLawyerId] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title == '' && formData.description == '') {

      toast.error("برجاء ملء جميع البيانات")
      return
    }
    newRequest({
      title: formData.title,
      description: formData.description,
      userId: uid,
      lawyerId: selectedLawyerId,
      createdAt: new Date().toISOString(),
      status: "pending",
      deletedByClient: false,
      nameClient: nameClient,
      nameLawyer: lawyer.name,
    }).then(() => {
      toast.success("تم إرسال الطلب بنجاح!");
    }).catch(() => {
      toast.error("فشل في إرسال الطلب. حاول مرة أخرى.")
    });
    setFormData({ title: "", description: "" });
  };
  /////////////////////////////////////////////////////////////////////////////////////
  if (isLoading || !lawyer) return <LoadingLogo />;
  else {
    return (
      <>
        {/* Modern Lawyer Profile Layout with Separate Cards */}
        <div className="min-h-screen  p-6">
          <Toaster />
          <div className="max-w-7xl mx-auto">

            {/* Page Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#262b3e] to-[#687693] bg-clip-text text-transparent mb-2">
                ملف المحامي
              </h1>
              <p className="text-gray-600">تفاصيل المحامي وطلب الاستشارة القانونية</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Lawyer Info Card - Small */}
              <div className="lg:col-span-1">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 text-center relative">

                  {/* Accent bar */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#262b3e] to-[#687693] rounded-t-3xl" />

                  {/* Profile Image */}
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="w-full h-full rounded-full ring-4 ring-[#262b3e]/20 overflow-hidden">
                      <Image
                        src={lawyer.profileImageUrl}
                        alt="صورة المحامي"
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                      <span className="text-white text-xs">⚖️</span>
                    </div>
                  </div>

                  {/* Lawyer Name */}
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {lawyer.name}
                  </h2>
                  <p className="text-[#262b3e]-600 font-medium mb-4">محامي متخصص</p>

                  {/* Quick Info Badges */}
                  <div className="space-y-3 mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#262b3e]-100 text-[#262b3e]-700 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {lawyer.city}
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {lawyer.specializations[0]}
                    </div>
                  </div>

                  {/* Consultation Button */}
                  <div className="space-y-3">
                    <button
                      onClick={() => setSelectedLawyerId(lawyer.id)}
                      className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#262b3e] to-[#687693] hover:from-[#262b3e]-700 hover:to-blue-700 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <label htmlFor="create-post-modal" className="cursor-pointer">
                        طلب استشارة
                      </label>
                    </button>
                  </div>
                </div>
              </div>

              {/* Data Card - Takes remaining space */}
              <div className="lg:col-span-2">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">

                  {/* Card Header */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#262b3e]-100 to-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#262b3e]-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">البيانات الشخصية</h3>
                      <p className="text-gray-600">معلومات المحامي التفصيلية</p>
                    </div>
                  </div>

                  {/* Data Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                    {/* Name Field */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-[#262b3e0f] to-blue-50 border border-[#262b3e22]">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-[#687693] rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-[#262b3e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <h5 className="text-sm font-semibold text-indigo-700">الاسم الكامل</h5>
                      </div>
                      <p className="text-xl font-bold text-gray-800">{lawyer.name}</p>
                    </div>

                    {/* Email Field */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h5 className="text-sm font-semibold text-green-700">البريد الإلكتروني</h5>
                      </div>
                      <p className="text-xl font-bold text-gray-800 break-all">{lawyer.email}</p>
                    </div>

                    {/* Phone Field */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200/50">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <h5 className="text-sm font-semibold text-purple-700">رقم الهاتف</h5>
                      </div>
                      <p className="text-xl font-bold text-gray-800">{lawyer.phoneNumber}</p>
                    </div>

                    {/* City Field */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200/50">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <h5 className="text-sm font-semibold text-orange-700">المدينة</h5>
                      </div>
                      <p className="text-xl font-bold text-gray-800">{lawyer.city}</p>
                    </div>

                    {/* Specialization Field */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200/50 md:col-span-2">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <h5 className="text-sm font-semibold text-cyan-700">التخصصات</h5>
                      </div>
                      <p className="text-xl font-bold text-gray-800">
                        {
                          lawyer.specializations.map((spec, index) => (
                            spec + (lawyer.specializations.length - 1 === index ? "" : " - ")
                          ))
                        }
                      </p>

                    </div>
                  </div>

                  {/* Achievements Section */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-slate-50 border border-gray-200/50">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <span className="text-yellow-600 text-lg">🏆</span>
                      </div>
                      <h5 className="text-lg font-semibold text-gray-700">الإنجازات</h5>
                    </div>
                    <div className="bg-white rounded-xl p-4">
                      <p className="text-gray-700 leading-relaxed">{lawyer.achievements}</p>
                    </div>
                  </div>
                </div>
                {/* feedback section component */}
            <FeedBack/>
              </div>
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

      </>
    );
  }

}
