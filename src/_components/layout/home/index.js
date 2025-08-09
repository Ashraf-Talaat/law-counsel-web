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
import LoadingLogo from "@/_components/Loading";
import protectedRoute from "@/utils/protectedRoute";
import { useRouter } from "next/router";

export default function Index() {
  const [isLogin, setLogin] = useState(false);
  const [isLoading, setLoading] = useState(true);
  
  useEffect(() => {
    
    if (localStorage.getItem('uid') !== null && localStorage.getItem('userType') == 'client') {
      setLogin(true)
    }
   
    setLoading(false);
  }, []);

  if (isLoading) {
    return (
      <LoadingLogo />
    );
  } else {

    return (

      isLoading ? <LoadingLogo /> :
        <div>
          <Hero />
          <TopRated />
          <div className="w-[85%] mx-auto ">
            <LatestNews />
            <Specializations />
            <About />
            <ContactUs />

            {!isLogin && <RegisPopup isPopup={false} />}

            {/* <BookAppointment /> */}
          </div>
        </div>

    );
  } 

}
