import React from "react";
import Image from "next/image";

export default function index() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 my-28">
      <div className="relative flex items-center justify-center w-full lg:w-1/2">
      <div className="hero-overlay bg-[#C9B38C] w-[300px] h-[330px]"></div>
        <Image
          src="/images/lawer-pic.png"
          alt="lawer pic"
          width={300}
          height={300}
          className=" h-auto absolute top-4 right-6 bottom-0 left-0 z-10"
        />
        
      </div>
      <div>
        <h4 className="text-[#C9B38C] font-semibold text-1xl my-5">من نحن</h4>
        <h4 className="font-semibold text-2xl my-3">
          مرحبا بكم في LOW COUNSEL
        </h4>
        <p className="my-3 text-[#687693]">
          نحن منصة قانونية متخصصة تهدف إلى تسهيل الوصول إلى نخبة من المحامين
          المعتمدين في مختلف التخصصات القانونية، من خلال تجربة رقمية سهلة وآمنة.
          نوفر خدمات استشارات قانونية، إعداد ومراجعة العقود، وتمثيل قانوني أمام
          الجهات المختصة، وكل ذلك من خلال واجهة سهلة الاستخدام تُتيح لك اختيار
          المحامي المناسب لمشكلتك القانونية، في أي وقت ومن أي مكان. نعمل على ربط
          الأفراد والشركات بمحامين أصحاب خبرة، ونسعى لتقديم تجربة قانونية مبنية
          على الثقة، الشفافية، والاحترافية.
        </p>
        <button className="btn bg-[#C9B38C] hover:bg-[#b69d75] my-2">
          قراءة المزيد
        </button>
      </div>
    </div>
  );
}
