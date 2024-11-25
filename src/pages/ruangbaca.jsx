import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import NavbarCustom from "../components/NavbarCustom";
import RuangBaca from "../components/RuangBaca";
import Footer from "../components/Footer/Footer";


const RB = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in milliseconds
      once: true, // whether animation should happen only once - while scrolling down
    });
  }, []);

  return (
    <>
      <NavbarCustom />
      <div className="px-[10%]">
        <div data-aos="fade-up">
          <RuangBaca />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RB;
