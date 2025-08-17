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
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
//Firebase
import newRequest from "@/logic/consultations/client/createRequest";
import { fetchLawyers } from "@/services/lawyer/getAllLawyersData";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import LoadingLogo from "@/_components/Loading";


export default function Page() {
  // store all lawers
  const [lawyers, setLawyers] = useState([]);
  const [isLogin, setLogin] = useState(false);
  // const [uid, setUid] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [nameClient, setNameClient] = useState('');
  // const [nameLawyer, setNameLawyer] = useState('');
  const [price, setPrice] = useState(0);
  const uid = localStorage.getItem("uid");

  // fetch data to get all lawers from firebase 
  useEffect(() => {
    // setUid(localStorage.getItem("uid"));
    if (uid !== null && localStorage.getItem('userType') == 'client') {
      setLogin(true)
    }
    const allLawyers = async () => {
      const data = await fetchLawyers();
      setLawyers(data);
    };

    const getNames = async () => {
      const clientDoc = await getDoc(doc(db, 'clients', uid));
      const nClient = clientDoc.exists() ? clientDoc.data().name : 'عميل';
      setNameClient(nClient);
      console.log(nClient);
      // const lawyerDoc = await getDoc(doc(db, 'lawyers', lawyer));
      // const nLawyer = lawyerDoc.exists() ? lawyerDoc.data().name : 'محامي';
    }
    getNames();
    allLawyers();
    setLoading(false);
  }, [uid]);

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


  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [selectedLawyerId, setSelectedLawyerId] = useState(""); //تخزين ال id بتاع انهي محامي
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.title == '' && formData.description == '') {

      toast.error("برجاء ملء جميع البيانات")
      return
    }

    const requestPromise = () => newRequest({
      title: formData.title,
      description: formData.description,
      userId: uid,
      lawyerId: selectedLawyerId,
      createdAt: new Date().toISOString(),
      status: "pending",
      deletedByClient: false,
      nameClient: nameClient,
      nameLawyer: lawyers.find(lawyer => lawyer.id === selectedLawyerId)?.name || "Unknown Lawyer",
    });
    toast.promise(
      requestPromise,
      {
        loading: 'جاري إرسال الطلب...',
        success: 'تم إرسال الطلب بنجاح!',
        error: 'فشل في إرسال الطلب. حاول مرة أخرى.',
      }
    );

    try {
      requestPromise;
      setFormData({ title: "", description: "" });
    } catch (e) {
      console.error("Error sending request:", error);
    }

    setFormData({ title: "", description: "" });

  };
  if (isLoading) {
    return (
      <LoadingLogo />
    );
  } else {

    return (
      <div className="bg-[#EEEEEE]">
        <Toaster />
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
              setSelectedCategory("جنائى");
              console.log("Specializations: ", lawyers.specialization);
            }}
          />
          <CategoryBtn
            icon={<UserGroupIcon className="w-6 h-6 text-white" />}
            title="القانون العمالي"
            onClick={() => {
              setSelectedCategory("العمل");
            }}
          />
          <CategoryBtn
            icon={<DocumentTextIcon className="w-6 h-6 text-white" />}
            title=" القانون التجاري"
            onClick={() => {
              setSelectedCategory("تجارى");
            }}
          />
          <CategoryBtn
            icon={<ScaleIcon className="w-6 h-6 text-white" />}
            title="القانون المدنى"
            onClick={() => {
              setSelectedCategory("مدنى");
              // console.log("Specializations: ", lawyers.specializations);
            }}
          />
          <CategoryBtn
            icon={<CalculatorIcon className="w-6 h-6 text-white" />}
            title="قانون الضرائب"
            onClick={() => {
              setSelectedCategory("الضرائب");
            }}
          />
          <CategoryBtn
            icon={<UserGroupIcon className="w-6 h-6 text-white" />}
            title="قانون الأحوال الشخصية"
            onClick={() => {
              setSelectedCategory("الأحوال الشخصية");
            }}
          />
          <CategoryBtn
            icon={<BuildingOfficeIcon className="w-6 h-6 text-white" />}
            title="القانون الإداري"
            onClick={() => {
              setSelectedCategory("إدارى");
            }}
          />
          <CategoryBtn
            icon={<CurrencyDollarIcon className="w-6 h-6 text-white" />}
            title=" قانون التأمينات والمعاشات"
            onClick={() => {
              setSelectedCategory("التأمينات والمعاشات");
            }}
          />
        </div>
        <div className="w-[90%] mx-auto  grid grid-cols-1 sm:grid-cols-2 md:grid-col-3 lg:grid-cols-4 gap-7">
          {filteredData.map((lawyer) => (
            <div
              key={lawyer.id}
              className="relative mx-auto rounded-xl mb-10 overflow-hidden shadow-xl  min-h-[350px]   "
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
                  className=" object-cover h-full rounded transition-all duration-500  animate-fade-in hover:scale-110 hover:shadow-2xl animate-fade-in"
                />
              </Link>

              <div
                className="bg-white
    rounded-xl
    p-3
    mb-6
    relative
    z-10
    w-[90%]
    max-w-[700px]
    mx-auto
    sm:absolute
    sm:top-[70%]
    sm:left-1/2
    sm:-translate-x-1/2
    sm:-translate-y-1/2
    sm:shadow-lg
    flex
    flex-col
    sm:flex-row
    justify-between
    gap-4
    overflow-hidden"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="text-md font-semibold mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                    {lawyer.name.length > 10
                      ? lawyer.name.slice(0, 9) + "..."
                      : lawyer.name}
                  </h4>
                  <p className="text-sm mb-2">{lawyer.specializations[0]}</p>
                  <p className="text-sm">
                    السعر: <span className="font-bold">{lawyer.price}</span>{" "}
                    جنية
                  </p>
                </div>
                <div className=" text-end">
                  <p className="mb-2 ">التقييم</p>
                  <div className="flex justify-end">
                    {lawyer.feedback == null || lawyer.feedback.length == 0 ? "" : Array.from(
                      { length: lawyer.feedback[0].rating },
                      (_, i) => i + 1
                    ).map((s, starIdx) => (
                      <svg
                        key={starIdx}
                        className={`w-5 h-5 fill-current text-yellow-400 `}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.12 3.436a1 1 0 00.95.69h3.614c.969 0 1.371 1.24.588 1.81l-2.923 2.12a1 1 0 00-.364 1.118l1.12 3.436c.3.921-.755 1.688-1.54 1.118l-2.923-2.12a1 1 0 00-1.176 0l-2.923 2.12c-.784.57-1.838-.197-1.539-1.118l1.12-3.436a1 1 0 00-.364-1.118L2.777 8.863c-.783-.57-.38-1.81.588-1.81h3.614a1 1 0 00.95-.69l1.12-3.436z" />
                      </svg>
                    ))}
                  </div>

                  {/* ////////////////////////////////////////////////// */}

                  <button
                    className="mt-3 "
                    onClick={() => {
                      setPrice(lawyer.price);
                      setSelectedLawyerId(lawyer.id)}}
                  >
                    <label
                      className="whitespace-nowrap text-white px-2.5  cursor-pointer bgPrimary rounded-lg hover:bgBtnHover focus:ring-4 focus:outline-none focus:bgBtnHover"
                      htmlFor="create-post-modal"
                    >
                      طلب استشارة
                    </label>
                  </button>
                </div>
              </div>
              {/* </Link> */}
              <div className="tooltip tooltip-right" data-tip=" طلب استشارة">
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

                    <div className="modal-action gap-4 mt-8">
                      <div className="flex items-center gap-4">
                        <span className="text-gray-700 font-medium">
                          سعر الاستشارة = {price == null || price == 0 ? "500" : price} جنية
                        </span>
                        <button
                          onClick={handleSubmit}
                          className="btn bgBtn text-white px-8 py-3 rounded-xl hover:bgBtnHover transform hover:scale-105 transition-all duration-200"
                        >
                          ارسال الطلب
                        </button>
                      </div>
                      <label
                        htmlFor="create-post-modal"
                        className="btn btn-outline px-8 py-3 rounded-xl"
                      >
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
}
