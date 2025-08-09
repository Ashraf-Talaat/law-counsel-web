"use client";
import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";

export default function EditModal({ isOpen, setIsOpen, currentData, onSave }) {
  const [formData, setFormData] = useState(currentData);

  useEffect(() => {
    setFormData(currentData);
  }, [currentData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(currentData.id, formData);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6 space-y-4">
          <Dialog.Title className="text-lg font-bold">تعديل الطلب</Dialog.Title>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="العنوان"
            className="w-full p-2 border rounded"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="الوصف"
            className="w-full p-2 border rounded"
          ></textarea>
          <div className="flex justify-end gap-2">
            <button
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => setIsOpen(false)}
            >
              إلغاء
            </button>
            <button
              className="bg-[#c9b38c] hover:bg-[#dec395] text-white px-4 py-2 rounded"
              onClick={handleSubmit}
            >
              حفظ
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
