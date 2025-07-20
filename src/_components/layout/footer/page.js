import React from "react";
import Image from "next/image";
//Icons
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { PhoneIcon } from "@heroicons/react/24/outline";
import { FaPhoneAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <>
      <footer
        id="footer"
        className="footer sm:footer-horizontal bgSecondary items-center p-1 flex justify-around"
      >
        <form>
          <fieldset className="w-full">
            <div className="join">
              <input
                type="text"
                placeholder="البريد الإلكتروني"
                className="input join-item bgPrimary  subTxt outline-none border-none focus:ring-1 focus:ring-[#c9b38c] caret-[#c9b38c] goldTxt w-full "
              />
              <button className="btn bgBtn join-item p-2 goldTxt hover:bg-[#c9b38c36] rounded">
                <PaperAirplaneIcon className="w-9 h-9 rotate-180 text-white" />
              </button>
            </div>
          </fieldset>
        </form>

        <Image
          src="/images/logo-dark.png"
          alt="Logo"
          width={100}
          height={100}
          className="object-cover rounded-full"
        />

        <nav className="grid-flow-col items-center gap-4 md:place-self-center md:justify-self-end">
          <a>
            <FaPhoneAlt className="w-4 h-6 goldTxt" />
          </a>
          <a>
            <FaXTwitter className="w-4 h-6 goldTxt" />
          </a>

          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              className="fill-current goldTxt"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
            </svg>
          </a>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              className="fill-current goldTxt"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
            </svg>
          </a>
        </nav>
      </footer>

      <footer className="footer sm:footer-horizontal bgPrimary text-neutral-content p-10">
        <nav>
          <h5 className="footer-title">من نحن</h5>
          <p>
            مكتبنا يقدم خدمات قانونية متكاملةمن خلال نخبة من المحامين المتخصصين
            في مختلف فروع القانون.
          </p>
          <p>
            {" "}
            نضمن لك الشفافية، الالتزام، والاحترافية في التعامل مع كافة أنواع
            القضايا.
          </p>
        </nav>
        <nav>
          <h5 className="footer-title">عنوان المكتب</h5>
          <p>15 شارع النصر، مدينة نصر، القاهرة</p>
          <p>الهاتف: 0101375185</p>
          <p>البريد: lawcounsel@gmail.com</p>
        </nav>
        <nav>
          <h5 className="footer-title">مجالات التخصص</h5>
          <p>القضايا الجنائية</p>
          <p>القضايا التجارية</p>
          <p>قضايا التعويضات</p>
          <p>الأحوال الشخصية</p>
          <p>قضايا العقارات</p>
        </nav>
      </footer>
    </>
  );
}
