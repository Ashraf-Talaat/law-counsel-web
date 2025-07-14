import Image from "next/image";
export default function ClientRegisterForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <form className="space-y-4 text-right w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            إنشاء حساب جديد
          </h2>
          <p className="text-2xl text-[#1C202E] mb-6 font-bold ">
            استمتع بتجربة قانونية ذكية وآمنة – ابدأ الآن.
          </p>
          <input
            type="text"
            placeholder="الاسم الكامل"
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#b19667]"
          />
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#b19667]"
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#b19667]"
          />
          <input
            type="password"
            placeholder="تأكيد كلمة المرور"
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#b19667]"
          />
          <input
            type="text"
            placeholder="رقم الهاتف"
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#b19667]"
          />
          <div className="flex flex-col md:flex-row items-start gap-6 mt-6"></div>
          <div className="flex justify-center ">
            <button
              type="submit"
              className="w-sm bg-[#C9B38C] hover:bg-[#b69d75] text-white py-2 mx-2 rounded-md transition "
            >
              تسجيل مستخدم جديد
            </button>
            <button
              type="submit"
              className="w-sm bg-white hover:bg-[#b69d75] hover:text-white text-[#C9B38C] py-2 mx-2 border border-2-[#C9B38C] rounded-md transition "
            >
              تسجيل بجوجل
            </button>
          </div>

          <div className="flex justify-center">
            <p className="mt-4 text-2xl text-gray-700">
              لديك حساب بالفعل ؟
              <a href="#" className="text-[#1C202E] hover:underline font-bold ">
                سجل دخول
              </a>
            </p>
          </div>
        </form>
        <div className="hidden md:flex justify-center items-center ">
          <Image
            src="/images/client-register.png"
            alt="Law Counsel Logo"
            width={500}
            height={500}
            className="mx-auto mb-4"
          />
        </div>
      </div>
    </div>
  );
}
