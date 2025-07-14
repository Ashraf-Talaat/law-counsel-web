import React from "react";
import Image from "next/image";
import HeroOther from "@/_components/layout/hero-other";
export default function page() {
  return (
    <>
      <HeroOther
        title="احدث المقالات"
        description="اكتشف أحدث المقالات القانونية التي تبسط لك المفاهيم وتساعدك تفهم حقوقك بشكل أوضح."
        showInput={false}
      />
      <div className="w-[85%] mx-auto my-20">
        <p>المقالات الاكثر انتشارا</p>
        <div className="w-[60%] mx-auto my-20 p-6 bg-white ">
          {[1, 2, 3].map((_, idx) => (
            <div key={idx} className="mb-15 p-8 rounded-lg shadow-lg">
              <div className="flex w-[20%] justify-between mb-6 ">
                {/* ternary operator to check if the image exists */}
                <Image
                  src="/images/avatar.png"
                  alt="topRated"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold mb-2">ندي محمد</p>
                  <p className="text-sm">اليوم</p>
                </div>
              </div>
              <div className="my-4">
                <p className="text-sm text-gray-600">
                  المقالات القانونية هي مقالات تتناول مواضيع قانونية متنوعة، مثل
                  حقوق الإنسان، القانون الجنائي، القانون المدني، وغيرها. تهدف
                  هذه المقالات إلى توعية الجمهور بالقوانين والحقوق والواجبات
                  القانونية. المقالات القانونية هي مقالات تتناول مواضيع قانونية
                  متنوعة، مثل حقوق الإنسان، القانون الجنائي، القانون المدني،
                  وغيرها. تهدف هذه المقالات إلى توعية الجمهور بالقوانين والحقوق
                  والواجبات القانونية. المقالات القانونية هي مقالات تتناول
                  مواضيع قانونية متنوعة، مثل حقوق الإنسان، القانون الجنائي،
                  القانون المدني، وغيرها. تهدف هذه المقالات إلى توعية الجمهور
                  بالقوانين والحقوق والواجبات القانونية. المقالات القانونية هي
                  مقالات تتناول مواضيع قانونية متنوعة، مثل حقوق الإنسان، القانون
                  الجنائي، القانون المدني، وغيرها. تهدف هذه المقالات إلى توعية
                  الجمهور بالقوانين والحقوق والواجبات القانونية.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
