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
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <Dialog.Panel className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-4">
        <Dialog.Title className="text-lg font-bold text-gray-800">
          تعديل {label}
        </Dialog.Title>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full border rounded-md p-2 mt-1"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 border rounded-md">
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

export default EditFieldModal;
