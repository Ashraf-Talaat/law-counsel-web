"use client";
import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { uploadImage } from "@/utils/handleUrlImg";




const EditLawyerInfoModal = ({ isOpen, onClose, initialData, onSave, router }) => {

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    aboutMe: initialData?.aboutMe || "",
    phoneNumber: initialData?.phoneNumber || "",
    city: initialData?.city || "",
    price: initialData?.price || 0.0,
    netPrice: initialData?.price ? (initialData.price * 0.9) : 0,
    profileImageUrl: initialData?.profileImageUrl || "",
  });



  const handleImageChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const url = await uploadImage(file);
    handleChange({
      target: { name: "profileImageUrl", value: url },
    })

  };

  useEffect(() => {
    setFormData({
      name: initialData?.name || "",
      email: initialData?.email || "",
      aboutMe: initialData?.aboutMe || "",
      phoneNumber: initialData?.phoneNumber || "",
      city: initialData?.city || "",
      price: initialData?.price || 0.0,
      netPrice: initialData?.price ? (initialData.price * 0.9) : 0,
      profileImageUrl: initialData?.profileImageUrl || "",
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === "price" ? parseFloat(value) || 0 : value;

    setFormData(prev => ({
      ...prev,
      [name]: parsedValue,
      netPrice: name === "price" ? (parseFloat(value) * 0.9 || 0) : prev.netPrice,
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
    router.refresh();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-6 space-y-4 text-right">
          <Dialog.Title className="text-xl font-bold text-gray-800">
            تعديل البيانات الأساسية
          </Dialog.Title>

          <div className="space-y-3">

            <InputField
              label="الإسم"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <label className="block text-sm font-medium text-gray-700 mb-1">
              صورة الملف الشخصى
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full mb-3 p-2 border border-gray-300 rounded file:mr-4 file:py-2 file:px-4"
              onChange={handleImageChange}
            />
            <InputField
              label="البريد الإلكترونى"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextareaField
              label="نبذة عنى"
              name="aboutMe"
              value={formData.aboutMe}
              onChange={handleChange}
            />
            <InputField
              label="الهاتف"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <InputField
              label="المدينة"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
            <InputField
              type="number"
              label="السعر"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
            <div className="p-3 bg-gray-50 rounded-md">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                صافي الربح (90% من السعر)
              </label>
              <div className="text-lg font-semibold text-[#C9B38C]">
                ${formData.netPrice?.toFixed(2) || "0.00"}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-[#C9B38C] hover:bg-[#b69d75] text-white rounded-md"
            >
              حفظ
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#C9B38C] focus:border-[#C9B38C]"
    />
  </div>
);

const TextareaField = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#C9B38C] focus:border-[#C9B38C]"
      rows={3}
    />
  </div>
);

export default EditLawyerInfoModal;
