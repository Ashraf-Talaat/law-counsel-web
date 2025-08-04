"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import HeroOther from "@/_components/layout/hero-other";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
//Firebase
import { createRequest } from "@/logic/consultations/client/createRequest";
import { fetchLawyers } from "@/services/lawyer/getAllLawyersData";

export default function Page() {
  const searchParams = useSearchParams();
  const specialtyFromUrl = searchParams.get("specialty");

  // store all lawers
  const [lawyers, setLawyers] = useState([]);

  // function to get all lawers data from firebase
  useEffect(() => {
    const getLawyers = async () => {
      const data = await fetchLawyers();
      setLawyers(data);
    };

    getLawyers();
  }, []);

  // for submit consultaion

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

  // store search lawers
  const [searchValue, setSearchValue] = useState("");
  // filter result
  const filteredLawyers = lawyers.filter((lawyer) => {
    const nameMatch = lawyer.name
      ?.toLowerCase()
      .includes(searchValue.toLowerCase());
    const specialtyMatch = specialtyFromUrl
      ? lawyer.specialty === specialtyFromUrl
      : true;
    return nameMatch && specialtyMatch;
  });

  return (
    <div className="bg-[#EEEEEE]">
      <HeroOther
        title={specialtyFromUrl || "جميع المحامين"}
        description="هتم القانون الجنائي بتنظيم الجرائم والعقوبات، ويهدف إلى تحقيق
                      العدالة وردع المخالفين وحماية المجتمع من الأفعال الإجرامية."
        showInput={true}
        onSearchChange={setSearchValue}
      />

      <div className="w-[85%]  mx-auto my-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredLawyers.map((lawyer) => (
          <div
            key={lawyer.id}
            className="relative mx-auto bg-white rounded-xl overflow-hidden shadow-xl  max-h-[350px]"
          >
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
            <div className="w-[90%] p-3 rounded-xl mx-4 bg-white absolute top-50 ">
              <div className="flex justify-between ">
                <h3 className="text-lg font-semibold mb-2">
                  {" "}
                  {lawyer.name.split(" ").slice(0, 2).join(" ")}
                </h3>
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
                  <button className="mt-3">
                    <label
                      className=" text-white px-2.5 bgPrimary  rounded-lg w-14 h-14 hover:bgBtnHover focus:ring-4 focus:outline-none focus:bgBtnHover"
                      htmlFor="create-post-modal"
                    >
                      طلب استشارة
                    </label>
                  </button>

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
