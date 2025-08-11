import React, { useState } from "react";

export default function FeedbackForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    rating: 0,
  });

  //   const [clientName, setClientName] = useState("");
  //   const [description, setDescription] = useState("");
  //   const [rating, setRating] = useState(0);

  const handleRatingChange = (value) => {
    setFormData({ ...formData, rating: value });
  };

  const handleSubmit = () => {
    e.preventDefault();
    const feedbackData = {
      description : formData.description,
      rating:formData.rating,
    };
    console.log("Feedback Submitted:", feedbackData);
     setFormData({ title: "", description: "" });

    // بعد الإرسال يقفل
    setIsOpen(false);
    // تصفير الحقول
    setClientName("");
    setDescription("");
    setRating(0);
  };

  return (
    <div className="p-6">
      {/* الزرار اللي بيفتح الـ Dialog */}
      <button
        onClick={() => setIsOpen(true)}
        className="btn bg-[#262b3e] text-white"
      >
        أضف تقييم
      </button>

      {/* Dialog */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#00000033] bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg">
            <h2 className="text-xl font-bold mb-4">إضافة تقييم</h2>

            {/* الوصف */}
            <textarea
              placeholder="وصف التقييم"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="textarea textarea-bordered w-full mb-3"
            ></textarea>

            {/* النجوم */}
            <div className="rating mb-4 flex gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <input
                  key={value}
                  type="radio"
                  name="rating"
                  className="mask mask-star-2 bg-orange-400"
                  aria-label={`${value} star`}
                  checked={formData.rating === value}
                  onChange={() => handleRatingChange(value)}
                />
              ))}
            </div>

            {/* الزراير بتاعه open , close */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-outline"
              >
                إلغاء
              </button>
              <button
                onClick={handleSubmit}
                className="btn bg-[#262b3e] text-white"
              >
                إرسال
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
