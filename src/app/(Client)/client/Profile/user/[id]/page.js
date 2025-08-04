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
    <>
      <div className="flex justify-center mt-[-10rem] mb-7 z-20 relative">
        <Image
          src={lawyer.profileImageUrl}
          alt="User"
          width={180}
          height={180}
          className="rounded-full border-4 border-[#C9B38C]"
        />
      </div>
      {/* ////////////////////////////////////////////////////////////////////// */}

      <div
        className="tooltip my-7 text-center tooltip-right"
        data-tip=" طلب استشارة"
      >
        <button className="mt-3" onClick={() => setSelectedLawyerId(lawyer.id)}>
          <label
            className=" text-white px-2.5 bgPrimary  rounded-lg w-14 h-14 hover:bgBtnHover focus:ring-4 focus:outline-none focus:bgBtnHover"
            htmlFor="create-post-modal"
          >
            طلب استشارة
          </label>
        </button>

        <input
          type="checkbox"
          id="create-post-modal"
          className="modal-toggle"
        />
        <div className="modal">
          <div className="modal-box w-11/12 max-w-2xl">
            <h3 className="font-bold text-lg"> طلب الاستشارة</h3>
            <div className="py-4">
              <input
                // value={title}
                value={formData.title}
                onChange={(e) => {
                  // setTitle(e.target.value);
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  });
                }}
                type="text"
                placeholder="عنوان الاستشارة"
                className="input input-bordered w-full mb-3 "
              />

              <textarea
                // value={description}
                value={formData.description}
                onChange={(e) => {
                  // setDescription(e.target.value);
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  });
                }}
                className="textarea textarea-bordered w-full mb-3 outline-none"
                placeholder="محتوى الاستشارة"
              ></textarea>
            </div>

            <div className="modal-action gap-8">
              <button
                onClick={handleSubmit}
                className="btn bgBtn text-white px-6"
              >
                ارسال
              </button>
              <label htmlFor="create-post-modal" className="btn">
                إغلاق
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-5 max-w-3xl mx-auto mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
          <div className="m-5 p-4 space-y-3">
            <h5>الإسم :</h5>
            <h2 className="text-2xl"> {lawyer.name}</h2>
            <hr />
          </div>
          <div className="m-5 p-4 space-y-3">
            <h5>البريد الإلكترونى :</h5>
            <h2 className="text-2xl"> {lawyer.email}</h2>
            <hr />
          </div>
          <div className="m-5 p-4 space-y-3">
            <h5>نبذة عنى :</h5>
            <h2 className="text-2xl">محامى توب التوب والباقى فوتوشوب</h2>
            <hr />
          </div>
          <div className="m-5 p-4 space-y-3">
            <h5>الهاتف :</h5>
            <h2 className="text-2xl"> {lawyer.phoneNumber}</h2>
            <hr />
          </div>
          <div className="m-5 p-4 space-y-3">
            <h5>المدينة :</h5>
            <h2 className="text-xl"> {lawyer.city} </h2>
            <hr />
          </div>
          <div className="m-5 p-4 space-y-3">
            <h5>التخصصات :</h5>
            <h2 className="text-2xl"> {lawyer.specializations}</h2>
            <hr />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 text-right max-w-3xl mx-auto my-9   ">
        <div className="flex justify-between items-center m-3 p-5">
          <h1 className="text-xl font-bold">إنجازاتي</h1>
         
        </div>
        <ul className="list-disc list-inside m-3 p-5 space-y-2">
          {/* {lawyer.achievements.map((achievement, index) => (
            <li key={index} className="text-gray-700">
              {achievement}
            </li>
          ))} */}
          <li className="text-gray-700">{lawyer.achievements}</li>
        </ul>
      </div>
    </>
  );
}
