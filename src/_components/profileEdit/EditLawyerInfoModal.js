"use client";
import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";

const EditLawyerInfoModal = ({ isOpen, onClose, initialData, onSave }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    aboutMe: initialData?.aboutMe || "",
    phoneNumber: initialData?.phoneNumber || "",
    city: initialData?.city || "",
    price: initialData?.price || 0.0,
  });

  useEffect(() => {
    setFormData({
      name: initialData?.name || "",
      email: initialData?.email || "",
      aboutMe: initialData?.aboutMe || "",
      phoneNumber: initialData?.phoneNumber || "",
      city: initialData?.city || "",
      price: initialData?.price || 0.0,
    });
  }, [initialData]);

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
      netPrice: (formData.price * 0.90)*10 ,
      
    });
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
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

const InputField = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
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
