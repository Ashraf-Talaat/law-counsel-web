import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { uploadImage } from "@/utils/handleUrlImg";

const EditImageModal = ({ isOpen, onClose, onSave, title, currentImage }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(currentImage);

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
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <Dialog.Panel className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-4">
        <Dialog.Title className="text-lg font-bold text-gray-800">
          {title}
        </Dialog.Title>

        <div className="space-y-3">
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-48 object-cover rounded-md"
            />
          )}
          <input type="file" accept="image/*" onChange={handleFileChange} />
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

export default EditImageModal;
