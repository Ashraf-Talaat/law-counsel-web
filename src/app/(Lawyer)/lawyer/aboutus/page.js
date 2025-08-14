import React from "react";
import Image from "next/image";
import Link from "next/link";
import LawyerNav from "@/_components/layout/navbar/lawyerNav";

export default function page() {
  return (
    <>
      <div className="w-[85%] mx-auto ">
        <LawyerNav />
      </div>
      <div
        id="aboutUs"
        className=" bg-gray-100 p-10 rounded-lg shadow-lg h-[100vh] "
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-9 rounded-lg  bg-white p-10 ">
          <div className="relative ">
            <div className="hero-overlay bg-[#C9B38C] max-w-[300px] min-h-[330px]"></div>
            <Image
              src="/images/lawer-pic.png"
              alt="lawer pic"
              width={300}
              height={300}
              className=" h-auto absolute top-4 right-5 bottom-0 left-0 z-10"
            />
          </div>
          <div className="col-span-2">
            <h4 className="text-[#C9B38C] font-semibold text-1xl my-5">
              من نحن
            </h4>
            <h4 className="font-semibold text-2xl my-3">
              مرحبا بكم في LOW COUNSEL
            </h4>
            <p className="my-3 text-[#687693]">
              نحن منصة قانونية متخصصة تهدف إلى تسهيل الوصول إلى نخبة من المحامين
              المعتمدين في مختلف التخصصات القانونية، من خلال تجربة رقمية سهلة
              وآمنة. نوفر خدمات استشارات قانونية، إعداد ومراجعة العقود، وتمثيل
              قانوني أمام الجهات المختصة، وكل ذلك من خلال واجهة سهلة الاستخدام
              تُتيح لك اختيار المحامي المناسب لمشكلتك القانونية، في أي وقت ومن
              أي مكان. نعمل على ربط الأفراد والشركات بمحامين أصحاب خبرة، ونسعى
              لتقديم تجربة قانونية مبنية على الثقة، الشفافية، والاحترافية.
            </p>

            <Link href="/aboutUs">
              <button className="btn bg-[#C9B38C] hover:bg-[#b69d75] my-2 text-white">
                قراءة المزيد
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
