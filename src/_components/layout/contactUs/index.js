"use client";
import React from "react";
import Image from "next/image";
import { db } from "@/firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
//icons
import { HomeIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function Index() {
  let [contactData, setContactData] = useState({
    name: "",
    email: "",
    description: "",
  });
  // const handleChange = (e) => {
  //   setContactData = [{ ...contactData, [e.target.name]: e.target.value }];
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "contact"), {
        name: contactData.name,
        email: contactData.email,
        description: contactData.description,
        createdAt: serverTimestamp(),
      });
      setContactData({ name: "", email: "", description: "" });
    } catch (error) {
      console.error("firestore error:", error);
    }
  };
  return (
    <>
      <div className="container  mx-auto my-20 px-4 py-8 bgPrimary">
        <h1 className="text-4xl font-bold mb-1 goldTxt flex items-center justify-start">
          <HomeIcon className="w-15 h-15 text-primary text-white bgBtn p-2 me-2 rounded-full border-5" />{" "}
          نموذج الاتصال
        </h1>
        <div className="flex items-center justify-around">
          <form className="w-full max-w-lg p-8 " onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2 goldTxt"
                htmlFor="name"
              >
                الاسم
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-primary text-gray-100"
                placeholder="أدخل اسمك"
                value={contactData.name}
                name="name"
                onChange={(e) => {
                  setContactData({
                    ...contactData,
                    name: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2 goldTxt"
                htmlFor="email"
              >
                البريد الإلكتروني
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-primary text-gray-100"
                placeholder="أدخل بريدك الإلكتروني"
                value={contactData.email}
                name="email"
                onChange={(e) => {
                  setContactData({
                    ...contactData,
                    email: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2 goldTxt"
                htmlFor="message"
              >
                الرسالة
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-primary text-gray-100"
                placeholder="اكتب رسالتك هنا..."
                value={contactData.description}
                name="description"
                onChange={(e) => {
                  setContactData({
                    ...contactData,
                    description: e.target.value,
                  });
                }}
              />
            </div>
            <button
              type="submit"
              className="cursor-pointer w-full bg-[#c9b38c] text-white font-bold py-2 px-4 rounded hover:bg-[#b69d75] transition duration-200"
            >
              إرسال
            </button>
          </form>

          <div className="w-full max-w-md hidden md:flex justify-center items-center">
            <Image
              src="/images/contactUsImg.png"
              alt="img of contact us"
              width={300}
              height={500}
              className="mt-8"
            />
          </div>
        </div>
      </div>
    </>
  );
}
