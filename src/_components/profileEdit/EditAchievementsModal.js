"use client";
import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";

export default function EditAchievementsModal({ isOpen, onClose, onSave, currentAchievements }) {
  const [achievements, setAchievements] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    if (Array.isArray(currentAchievements)) {
      setAchievements(currentAchievements);
    } else if (typeof currentAchievements === "string") {
      const parsed = currentAchievements
        .split("\n")
        .map((item) => item.trim())
        .filter((item) => item !== "");
      setAchievements(parsed);
    } else {
      setAchievements([]);
    }
  }, [currentAchievements]);

  const handleDelete = (index) => {
    const updated = [...achievements];
    updated.splice(index, 1);
    setAchievements(updated);
  };

  const handleAdd = () => {
    const trimmed = newItem.trim();
    if (trimmed !== "") {
      setAchievements([...achievements, trimmed]);
      setNewItem("");
    }
  };

  const handleSave = () => {
    const updatedString = achievements.join("\n");
    onSave(updatedString);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-6 space-y-4 text-right">
          <Dialog.Title className="text-xl font-bold text-gray-800">تعديل الإنجازات</Dialog.Title>

          <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {achievements.map((ach, idx) => (
              <li key={idx} className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                <span className="text-sm text-gray-800">{ach}</span>
                <button onClick={() => handleDelete(idx)} className="text-red-500 hover:text-red-600 text-xs">
                  حذف
                </button>
              </li>
            ))}
            {achievements.length === 0 && (
              <li className="text-gray-500 italic text-sm">لا توجد إنجازات حتى الآن</li>
            )}
          </ul>

          <div className="flex gap-2">
            <input
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              type="text"
              className="flex-1 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9B38C] focus:border-[#C9B38C]"
              placeholder="أضف إنجاز جديد"
            />
            <button onClick={handleAdd} className="px-3 py-2 bg-[#C9B38C] hover:bg-[#b69d75] text-white text-sm rounded-md">
              إضافة
            </button>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button onClick={onClose} className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm">
              إلغاء
            </button>
            <button onClick={handleSave} className="px-4 py-2 bg-[#C9B38C] hover:bg-[#b69d75] text-white rounded-md text-sm">
              حفظ
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
