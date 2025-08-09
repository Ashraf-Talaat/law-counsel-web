"use client";
import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";

const EditFieldModal = ({ isOpen, onClose, label, initialValue, onSave }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(initialValue || "");
  }, [initialValue]);

  const handleSubmit = () => {
    onSave(value);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-6 space-y-4 text-right">
          <Dialog.Title className="text-xl font-bold text-gray-800">
            تعديل {label}
          </Dialog.Title>

          <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#C9B38C] focus:border-[#C9B38C]"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
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

export default EditFieldModal;
