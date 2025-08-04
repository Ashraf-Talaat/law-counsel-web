import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

const EditLawyerInfoModal = ({ isOpen, onClose, initialData, onSave }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    aboutMe: initialData.aboutMe || "",
    phoneNumber: initialData.phoneNumber || "",
    city: initialData.city || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <Dialog.Panel className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-4">
        <Dialog.Title className="text-lg font-bold text-gray-800">
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
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md"
          >
            إلغاء
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-primary text-white rounded-md"
          >
            حفظ
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

const InputField = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium">{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border rounded-md p-2"
    />
  </div>
);

const TextareaField = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border rounded-md p-2"
      rows={3}
    />
  </div>
);

export default EditLawyerInfoModal;
