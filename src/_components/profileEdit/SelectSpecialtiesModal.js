import { updateLawyerProfile } from "@/utils/handleEditLawyerInfo";
import { Dialog } from "@headlessui/react";
import { useState } from "react";

const specialtiesList = [
  "قانون جنائي",
  "قانون مدني",
  "قانون تجاري",
  "قانون الأحوال الشخصية",
  "الملكية الفكرية",
];

export default function SelectSpecialtiesModal({
  isOpen,
  onClose,
  initialSelected = [],
  onSave,
}) {
  const [selected, setSelected] = useState(initialSelected);

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
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="bg-white p-6 rounded-xl w-[90%] max-w-md">
          <Dialog.Title className="text-lg font-semibold mb-4">
            اختر مجالات التخصص
          </Dialog.Title>

          <div className="flex flex-wrap gap-2 mb-4">
            {specialtiesList.map((item) => (
              <button
                key={item}
                className={`px-3 py-1 rounded-full border ${
                  selected.includes(item)
                    ? "bg-[#C9B38C] text-white"
                    : "bg-gray-100 text-black"
                }`}
                onClick={() => toggleSpecialty(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              إلغاء
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded bg-[#C9B38C] text-white hover:bg-[#b69d75]"
            >
              حفظ
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
