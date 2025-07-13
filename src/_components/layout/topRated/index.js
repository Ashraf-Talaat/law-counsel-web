import Image from "next/image";
import React from "react";

export default function index() {
  return (
    <>
      <div className="mt-52 mb-32 w-[85%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((_, idx) => (
          <div key={idx} className="relative mx-auto">
            <Image
              src="/images/lawer-pic.png"
              alt="topRated"
              width={280}
              height={0}
              className="rounded-xl"
            />
            <div className="w-[90%] p-3 rounded-xl  mx-4 bg-white absolute top-50 flex justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">أحمد محمد</h3>
                <p className="text-sm">محامي طلاق</p>
              </div>
              <div className=" ">
                <p className="mb-2 text-end">التقييم</p>
                <div className="flex  ">
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
