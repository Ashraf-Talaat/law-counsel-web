import React from "react";
import Hero from "@/_components/layout/hero";
import LatestNews from "@/_components/layout/latestNews";
import About from "@/_components/layout/aboutus";
import Specializations from "@/_components/layout/home_specializations";
import TopRated from "@/_components/layout/topRated";
import ContactUs from "@/_components/layout/contactUs";

import RegisPopup from "@/_components/layout/RegisPopup";
import { useState } from "react";
import { useEffect } from "react";

export default function index() {
   const [isLogin, setLogin] = useState(false);
    useEffect(() => {
       if (localStorage.getItem('uid') !== null && localStorage.getItem('userType') == 'client') {
         setLogin(true)
       }
     }, []);
  return (
    
    <div>
      <Hero />
      <TopRated />
      <div className="w-[85%] mx-auto ">
        <LatestNews />
        <Specializations />
        <About />
        <ContactUs />

       {!isLogin&& <RegisPopup  isPopup={false} />}

        {/* <BookAppointment /> */}
      </div>
    </div>
  );
}
