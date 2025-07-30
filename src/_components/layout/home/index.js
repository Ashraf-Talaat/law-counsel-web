import React from "react";
import Hero from "@/_components/layout/hero";
import LatestNews from "@/_components/layout/latestNews";
import About from "@/_components/layout/aboutus";
import Specializations from "@/_components/layout/home_specializations";
import TopRated from "@/_components/layout/topRated";
import ContactUs from "@/_components/layout/contactUs";
import RegisPopup from "@/_components/layout/RegisPopup";
//
export default function index() {
  return (
    <div>
      <Hero />
      <TopRated />
      <div className="w-[85%] mx-auto ">
        <LatestNews />
        <Specializations />
        <About />
        <ContactUs />
        <RegisPopup  isPopup={false} />
        {/* <BookAppointment /> */}
      </div>
    </div>
  );
}
