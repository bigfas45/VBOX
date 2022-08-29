import React from "react";

import Navbar from "./Navbar";
import Hero from "./Hero";
import Showcase from "./Showcase";
import Producers from "./Producers";
import MobileAppBanner from "./MobileAppBanner";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Showcase />
      <Producers />
      <MobileAppBanner />
      <Footer />
    </>
  );
};

export default LandingPage;
