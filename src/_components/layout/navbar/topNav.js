import Image from "next/image";
import React from "react";

export default function index() {
  return (
    <div className="bgSecondary">
      <div className="w-[90%] mx-auto flex items-center justify-between py-1">
        {/* Social icons */}
        <div className="flex items-center gap-2">
          <Image
            src="/images/Facebook.png"
            alt="facebook icon"
            width={20}
            height={20}
          />
          <Image
            src="/images/Instagram.png"
            alt="instagram icon"
            width={20}
            height={20}
          />
          <Image src="/images/X.png" alt="x icon" width={20} height={20} />
        </div>

        {/* Contact info */}
        <div className="flex items-center gap-4 text-white text-xs">
          <div className="flex items-center gap-1">
            <p>(+20) 1013761845</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#C9B38C"
              viewBox="0 0 24 24"
              className="w-3 h-3"
            >
              <path
                fillRule="evenodd"
                d="M19.5 9.75a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 1.5 0v2.69l4.72-4.72a.75.75 0 1 1 1.06 1.06L16.06 9h2.69a.75.75 0 0 1 .75.75Z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div className="flex items-center gap-1">
            <p>lawconsel@gmail.com</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#C9B38C"
              viewBox="0 0 24 24"
              className="w-3 h-3"
            >
              <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
              <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
