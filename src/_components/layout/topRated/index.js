import Image from "next/image";
import React from "react";

export default function index() {
  return (
    <>
      <div className="mt-52  w-[85%] mx-auto">
        <h2 className="font-bold text-xl text-[#c9b38c]">الاعلي تقييما</h2>
        <div className=" mt-5   grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((_, idx) => (
            <div key={idx} className="relative w-fit mx-auto">
              <Image
                src="/images/lawer-pic.png"
                alt="topRated"
                width={280}
                height={300}
                className="rounded-xl w-[280px] h-[300px] object-cover"
              />
              <div className="w-[90%] bg-white p-4 rounded-xl shadow-md absolute left-1/2 -translate-x-1/2 -bottom-[-20px] flex justify-between items-start gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">أحمد محمد</h3>
                  <p className="text-sm text-gray-600">محامي طلاق</p>
                </div>
                <div className="text-end">
                  <p className="mb-1 text-sm text-gray-700">التقييم</p>
                  <div className="flex justify-end gap-1">
                    {[1, 2, 3].map((s, starIdx) => (
                      <Image
                        key={starIdx}
                        src="/images/Star.png"
                        alt="star"
                        width={18}
                        height={18}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
