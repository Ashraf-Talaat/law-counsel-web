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
import { getAuth } from "firebase/auth";
//Firebase
import newRequest, {createRequest,} from "@/logic/consultations/client/createRequest";
import { fetchLawyers } from "@/services/lawyer/getAllLawyersData";
import Link from "next/link";

export default function Page() {
  // store all lawers
  const [lawyers, setLawyers] = useState([]);
  const [isLogin, setLogin] = useState(false);
  // const clientId= localStorage.getItem('uid')
  // fetch data to get all lawers from firebase
  useEffect(() => {
    // if (clientId !== null && localStorage.getItem('userType') == 'client') {
    //        setLogin(true)
    //       }
    const allLawyers = async () => {
      const data = await fetchLawyers();
      setLawyers(data);
    };

    allLawyers();
  }, []);

  //handle filterd data
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const filteredData = lawyers.filter((lawyer) => {
    const matchData = lawyer.name
      ?.toLowerCase()
      .includes(searchValue.toLowerCase());

    const selectedCat = selectedCategory
      ? lawyer.specializations?.includes(selectedCategory)
      : true;
    return matchData && selectedCat;
  });
  // handle submit consultaions
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");

  // const handleSubmit = async () => {
  //   const newRequest = {
  //     title: { title },
  //     description: { description },
  //     clientId: "wCgQtUIRIRWuNZIQgV8XWMhXalp1", //from auth
  //     lawyerId: "3dvloPPDupUbFjhnrKIT",
  //   };

  //   try {
  //     const res = await createRequest(newRequest);
  //     console.log("Request created: ", res);
  //   } catch (error) {
  //     console.error("Error creating request: ", error);
  //   }
  // };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [selectedLawyerId, setSelectedLawyerId] = useState(""); //تخزين ال id بتاع انهي محامي
  const handleSubmit = (e) => {
    e.preventDefault();

    newRequest({
      title: formData.title,
      description: formData.description,
      userId: clientId,
      lawyerId: selectedLawyerId,
      createdAt: new Date().toISOString(),
      status: "pending",
      deletedByClient: false,
    });
    setFormData({ title: "", description: "" });
  };

  return (
    <div className="bg-[#EEEEEE]">
      <HeroOther
        title="اختار المحامي المناسب لك "
        description="ابحث بسهولة عن المحامي المناسب لمشكلتك، تصفح التقييمات، وشاهد الملف الشخصي لكل محامٍ قبل بدء التواصل."
        showInput={true}
        onSearchChange={setSearchValue}
      />
      <div className="w-[85%] mx-auto my-20 flex items-center justify-center flex-wrap">
        <CategoryBtn
          icon={<ScaleIcon className="w-6 h-6 text-white" />}
          title="عرض الكل"
          onClick={() => setSelectedCategory("")}
        />
        <CategoryBtn
          icon={<ShieldCheckIcon className="w-6 h-6 text-white" />}
          title=" القانون الجنائي"
          onClick={() => {
            setSelectedCategory("القانون الجنائى");
            console.log("Specializations: ", lawyers.specialization);
          }}
        />
        <CategoryBtn
          icon={<UserGroupIcon className="w-6 h-6 text-white" />}
          title="القانون العمالي"
          onClick={() => {
            setSelectedCategory(" العمالى");
          }}
        />
        <CategoryBtn
          icon={<DocumentTextIcon className="w-6 h-6 text-white" />}
          title=" القانون التجاري"
          onClick={() => {
            setSelectedCategory("القانون التجارى");
          }}
        />
        <CategoryBtn
          icon={<ScaleIcon className="w-6 h-6 text-white" />}
          title="القانون المدنى"
          onClick={() => {
            setSelectedCategory("مدني");
            // console.log("Specializations: ", lawyers.specializations);
          }}
        />
        <CategoryBtn
          icon={<CalculatorIcon className="w-6 h-6 text-white" />}
          title="قانون الضرائب"
          onClick={() => {
            setSelectedCategory("قانون الضرائب");
          }}
        />
        <CategoryBtn
          icon={<UserGroupIcon className="w-6 h-6 text-white" />}
          title="قانون الأحوال الشخصية"
          onClick={() => {
            setSelectedCategory("قانون الأحوال الشخصية");
          }}
        />
        <CategoryBtn
          icon={<BuildingOfficeIcon className="w-6 h-6 text-white" />}
          title="القانون الإداري"
          onClick={() => {
            setSelectedCategory("القانون الإدارى");
          }}
        />
        <CategoryBtn
          icon={<CurrencyDollarIcon className="w-6 h-6 text-white" />}
          title=" قانون التأمينات والمعاشات"
          onClick={() => {
            setSelectedCategory("قانون التأمينات والمعاشات");
          }}
        />
      </div>
      <div className="w-[85%] mx-auto  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredData.map((lawyer) => (
          <div
            key={lawyer.id}
            className="relative mx-auto rounded-xl mb-10 overflow-hidden shadow-xl  max-h-[350px]"
          >
            <Link href={`/client/Profile/${lawyer.id}`}>
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
              </Link>
              <div className="min-w-[90%] p-3 rounded-xl mb-6 mx-4 bg-white absolute top-45 flex justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {lawyer.name.split(" ").slice(0, 2).join(" ")}{" "}
                  </h3>
                  <p className="text-sm mb-2">{lawyer.specializations[0]} </p>
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

                  <button
                      className="mt-3"
                      onClick={() => setSelectedLawyerId(lawyer.id)}
                    >
                      <label
                        className=" text-white px-2.5 cursor-pointer bgPrimary  rounded-lg w-14 h-14 hover:bgBtnHover focus:ring-4 focus:outline-none focus:bgBtnHover"
                        htmlFor="create-post-modal"
                      >
                        طلب استشارة
                      </label>
                    </button>

                </div>
              </div>
            {/* </Link> */}
            <div
                    className="tooltip tooltip-right"
                    data-tip=" طلب استشارة"
                  >
                    

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
                            // value={title}
                            value={formData.title}
                            onChange={(e) => {
                              // setTitle(e.target.value);
                              setFormData({
                                ...formData,
                                title: e.target.value,
                              });
                            }}
                            type="text"
                            placeholder="عنوان الاستشارة"
                            className="input input-bordered w-full mb-3 "
                          />

                          <textarea
                            // value={description}
                            value={formData.description}
                            onChange={(e) => {
                              // setDescription(e.target.value);
                              setFormData({
                                ...formData,
                                description: e.target.value,
                              });
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
        ))}
      </div>
    </div>
  );
}
