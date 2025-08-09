'use client';
import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { uploadImage } from "@/utils/handleUrlImg";

const EditImageModal = ({ isOpen, onClose, onSave, title, currentImage }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(currentImage);

  useEffect(() => {
    setPreviewUrl(currentImage);
    setSelectedFile(null);
  }, [currentImage, isOpen]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    try {
      const imageUrl = await uploadImage(selectedFile);
      if (imageUrl) {
        onSave(imageUrl);
        onClose();
      } else {
        console.error("لم يتم الحصول على رابط الصورة");
      }
    } catch (error) {
      console.error("خطأ أثناء رفع الصورة:", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-6 space-y-4 text-right">
          <Dialog.Title className="text-xl font-bold text-gray-800">{title}</Dialog.Title>

          <div className="space-y-3">
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg border border-gray-200"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#C9B38C] file:text-white hover:file:bg-[#b69d75]"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
              إلغاء
            </button>
            <button onClick={handleSubmit} className="px-4 py-2 bg-[#C9B38C] hover:bg-[#b69d75] text-white rounded-md">
              حفظ
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditImageModal;
