import React from "react";
import Image from "next/image";
import { ShieldCheckIcon } from "@heroicons/react/24/solid";
export default function index({ icon, title, onClick }) {
  return (
    <>
      <div
        className="bg-[#262b3e] rounded-full cursor-pointer flex justify-center items-center mx-4 mb-6 flex px-4 "
        onClick={onClick}
      >
        <div>{icon}</div>

        <p className="text-white text-center p-4"> {title}</p>
      </div>
    </>
  );
}
