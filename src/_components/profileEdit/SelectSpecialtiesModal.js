"use client";
import { updateLawyerProfile } from "@/utils/handleEditLawyerInfo";
import { Dialog } from "@headlessui/react";
import { useEffect } from "react";
import { useState } from "react";

const specialtiesList = [
  "جنائي",
  "مدني",
  "تجاري",
  "الأحوال الشخصية",
  "الملكية الفكرية",
  "العمال",
  "الضرائب",
  "الإداري",
  "البيئة",
];

export default function SelectSpecialtiesModal({
  isOpen,
  onClose,
  initialSelected = [],
  onSave,
}) {
  const [selected, setSelected] = useState(initialSelected);

  // مزامنة الاختيارات عند فتح المودال أو تغيّر القيم المبدئية
  useEffect(() => {
    setSelected(initialSelected || []);
  }, [initialSelected, isOpen]);

  const toggleSpecialty = (specialty) => {
    if (selected.includes(specialty)) {
      setSelected(selected.filter((item) => item !== specialty));
    } else {
      setSelected([...selected, specialty]);
    }
  };

  const handleSave = async () => {
    const lawyerId = localStorage.getItem("uid");
    try {
      await updateLawyerProfile(lawyerId, { specializations: selected });
      onSave(selected); // لتحديث البيانات في الواجهة
      onClose();
    } catch (err) {
      console.error("فشل تحديث التخصصات:", err);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white p-6 rounded-2xl shadow-sm ring-1 ring-gray-100 w-full max-w-md text-right">
          <Dialog.Title className="text-xl font-bold text-gray-800 mb-4">
            اختر مجالات التخصص
          </Dialog.Title>

          <div className="flex flex-wrap gap-2 mb-4">
            {specialtiesList.map((item) => (
              <button
                key={item}
                className={`px-3 py-1 rounded-full border transition ${
                  selected.includes(item)
                    ? "bg-[#C9B38C] text-white border-[#C9B38C]"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[#C9B38C]`}
                onClick={() => toggleSpecialty(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-md bg-[#C9B38C] text-white hover:bg-[#b69d75]"
            >
              حفظ
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
