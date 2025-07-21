"use client";
import React, { useEffect, useState } from "react";
import HeroOther from "@/_components/layout/hero-other";
import Image from "next/image";
import CategoryBtn from "@/_components/common/categoryBtn";
import { ShieldCheckIcon } from "@heroicons/react/24/solid";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import { ScaleIcon } from "@heroicons/react/24/outline";
import { CalculatorIcon } from "@heroicons/react/24/solid";
import { BuildingOfficeIcon } from "@heroicons/react/24/solid";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";
//Firebase
import { createRequest } from "@/logic/consultations/client/createRequest";

export default function Page() {
  // store all lawers
  const [lawyers, setLawyers] = useState([]);

  // fetch data to get all lawers from firebase
  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "lawyers")); 
        const lawyersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLawyers(lawyersData);
      } catch (error) {
        console.error("Error fetching lawyers: ", error);
      }
    };

    fetchLawyers();
  }, []);

  //handle filterd data
  const [searchValue, setSearchValue] = useState("");
  const filteredData = lawyers.filter(
    (lawyer) => lawyer.name?.toLowerCase().includes(searchValue.toLowerCase())
  );
  // handle submit consultaions
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    const newRequest = {
      title: { title },
      description: { description },
      clientId: "wCgQtUIRIRWuNZIQgV8XWMhXalp1", //from auth
      lawyerId: "3dvloPPDupUbFjhnrKIT",
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
        title="اختار المحامي المناسب لك "
        description="ابحث بسهولة عن المحامي المناسب لمشكلتك، تصفح التقييمات، وشاهد الملف الشخصي لكل محامٍ قبل بدء التواصل."
        showInput={true}
        onSearchChange={setSearchValue}
      />
      <div className="w-[85%] mx-auto my-20 flex items-center justify-center flex-wrap">
        <CategoryBtn
          icon={<ShieldCheckIcon className="w-6 h-6 text-white" />}
          title=" القانون الجنائي"
        />
        <CategoryBtn
          icon={<UserGroupIcon className="w-6 h-6 text-white" />}
          title=" القانون العمالي"
        />
        <CategoryBtn
          icon={<DocumentTextIcon className="w-6 h-6 text-white" />}
          title=" القانون التجاري"
        />
        <CategoryBtn
          icon={<ScaleIcon className="w-6 h-6 text-white" />}
          title=" القانون المدني"
        />
        <CategoryBtn
          icon={<CalculatorIcon className="w-6 h-6 text-white" />}
          title=" قانون الضرائب"
        />
        <CategoryBtn
          icon={<UserGroupIcon className="w-6 h-6 text-white" />}
          title=" قانون الأحوال الشخصية"
        />
        <CategoryBtn
          icon={<BuildingOfficeIcon className="w-6 h-6 text-white" />}
          title=" القانون الإداري"
        />
        <CategoryBtn
          icon={<CurrencyDollarIcon className="w-6 h-6 text-white" />}
          title=" قانون التأمينات والمعاشات"
        />
      </div>
      <div className="w-[85%] mx-auto my-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredData.map((lawyer) => (
          <div key={lawyer.id} className="relative mx-auto">
            <Image
              src={
                lawyer.profileImageUrl?.startsWith("http")
                  ? lawyer.profileImageUrl
                  : "/images/lawer-pic.png"
              }
              alt={lawyer.name}
              width={300}
              height={0}
              className=" object-cover h-full rounded"
            />
            <div className="w-[90%] p-3 rounded-xl  mx-4 bg-white absolute top-45 flex justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {lawyer.name.split(" ").slice(0, 2).join(" ")}{" "}
                </h3>
                <p className="text-sm mb-2">محامي طلاق</p>
                <p className="text-sm">
                  السعر :<span className="font-bold">500</span> جنية
                </p>
              </div>
              <div className=" text-end">
                <p className="mb-2 ">التقييم</p>
                <div className="flex justify-end">
                  {[1, 2, 3].map((s, starIdx) => (
                    <Image
                      key={starIdx}
                      src="/images/Star.png"
                      alt="star"
                      width={20}
                      height={20}
                      className=" "
                    />
                  ))}
                </div>

                {/* ////////////////////////////////////////////////// */}

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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
