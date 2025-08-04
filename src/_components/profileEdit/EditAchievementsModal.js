"use client";
import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";

export default function EditAchievementsModal({ isOpen, onClose, onSave, currentAchievements }) {
  const [achievements, setAchievements] = useState("");
useEffect(() => {
  if (Array.isArray(currentAchievements)) {
    setAchievements(currentAchievements.join("\n"));
  } else if (typeof currentAchievements === "string") {
    setAchievements(currentAchievements); 
  } else {
    setAchievements(""); // default
  }
}, [currentAchievements]);
const handleSave = () => {
  const updatedList = achievements
    .split("\n")
    .map((item) => item.trim())
    .filter((item) => item !== "");

  onSave(updatedList); // send array to parent
  onClose();
};

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <Dialog.Panel className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-4">
        <Dialog.Title className="text-lg font-bold text-gray-800">تعديل الإنجازات</Dialog.Title>

        <textarea
          value={achievements}
          onChange={(e) => setAchievements(e.target.value)}
          rows={6}
          className="w-full border rounded-md p-2"
          placeholder="اكتب كل إنجاز في سطر منفصل"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded-md">
            إلغاء
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-primary text-white rounded-md">
            حفظ
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
