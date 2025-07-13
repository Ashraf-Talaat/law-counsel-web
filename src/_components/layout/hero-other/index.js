import React from "react";
import MainNav from "@/_components/layout/navbar/mainNav"; // Adjust the path if needed

export default function index({ title, description, showInput = false }) {
  return (
    <div className="">
      <div className="hero h-[55vh] w-full relative  bg-[url('/images/hero-bg.png')] bg-cover bg-center">
        <div className="absolute top-0 left-[5%] bg-transparent text-white z-50 w-[90%]">
          <MainNav />
        </div>
        <div className="hero-overlay  bg-[url('/images/Rectangle.png')]"></div>

        <div className="">
          <div className=" mt-15 flex text-center items-center justify-center flex-col  text-white z-10 ">
            <h1 className="text-5xl font-bold"> {title}</h1>
            <p className="py-6">{description}</p>
            {showInput && (
              <div className="mt-6">
                <input
                  type="text"
                  className="input input-bordered w-[500px] placeholder-gray-600 text-black"
                  placeholder="ابحث هنا..."
                />
              </div>
            )}
          </div>

          {/* <div className=" w-full  ">
            {showInput && (
              <div className="mt-6">
                <input
                  type="text"
                  className="input input-bordered max-w-md placeholder-gray-600 text-black"
                  placeholder="ابحث هنا..."
                />
              </div>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
}
