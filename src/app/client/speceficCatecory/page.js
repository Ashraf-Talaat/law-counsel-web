"use client";
import React, { useState } from "react";
import HeroOther from "@/_components/layout/hero-other";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";

//Firebase
import { createRequest } from "@/logic/consultations/client/createRequest";

export default function Page() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const handleSubmit = async () => {
    const newRequest = {
      title: { title },
      description: { description },
      clientId: "0hPemfz1O8Xd3RoEIyJ5GqO4BoH3", //from auth
      lawyerId: "1LgdtODjbta0gnUVWaGNwFqmMTm2",
    };

    try {
      const res = await createRequest(newRequest);
      console.log("Request created: ", res);
    } catch (error) {
      console.error("Error creating request: ", error);
    }
  };

  return (
    <div>
      <HeroOther
        title="القانون الجنائي"
        description="هتم القانون الجنائي بتنظيم الجرائم والعقوبات، ويهدف إلى تحقيق
 العدالة وردع المخالفين وحماية المجتمع من الأفعال الإجرامية."
        showInput={true}
      />

      <div className="w-[85%] mx-auto my-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((_, idx) => (
          <div key={idx} className="relative mx-auto">
            <Image
              src="/images/lawer-pic.png"
              alt="topRated"
              width={300}
              height={0}
              className=""
            />
            <div className="w-[90%] p-3 rounded-xl  mx-4 bg-white absolute top-50 ">
              <div className="flex justify-between ">
                <h3 className="text-lg font-semibold mb-2">أحمد محمد</h3>
                <div className="flex ">
                  <p className="mb-2">التقييم</p>
                  <div className="flex ">
                    <StarIcon className="w-5 h-5 text-yellow-400" />

                    <p>4</p>
                  </div>
                </div>
              </div>

              <div className=" flex justify-between ">
                {/* //////////////////////////////////////////////////////////////////////////// */}
                <div className="tooltip tooltip-right" data-tip=" طلب استشارة">
                  <label
                    className=" text-white px-2.5 bgPrimary mt-2 rounded-lg w-14 h-14 hover:bgBtnHover focus:ring-4 focus:outline-none focus:bgBtnHover"
                    htmlFor="create-post-modal"
                  >
                    طلب استشارة
                  </label>

                  <input
                    type="checkbox"
                    id="create-post-modal"
                    className="modal-toggle"
                  />
                  <div className="modal">
                    <div className="modal-box w-11/12 max-w-2xl">
                      <h3 className="font-bold text-lg"> طلب الاستشارة</h3>
                      <div className="py-4">
                        <input
                          value={title}
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                          type="text"
                          placeholder="عنوان الاستشارة"
                          className="input input-bordered w-full mb-3 "
                        />

                        <textarea
                          value={description}
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                          className="textarea textarea-bordered w-full mb-3 outline-none"
                          placeholder="محتوى الاستشارة"
                        ></textarea>
                      </div>

                      <div className="modal-action gap-8">
                        <button
                          onClick={handleSubmit}
                          className="btn bgBtn text-white px-6"
                        >
                          ارسال
                        </button>
                        <label htmlFor="create-post-modal" className="btn">
                          إغلاق
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm mt-2">
                  السعر :<span className="font-bold">500</span> جنية
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
