import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import NavbarCustom from "../components/NavbarCustom";
import Berita from "../components/Berita";
import Footer from "../components/Footer/Footer";



const News = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in milliseconds
      once: true, // whether animation should happen only once - while scrolling down
    });
  }, []);
  return (
    <>
      <NavbarCustom />
      <div className="px-[10%] mt-[15vh]">
        <div data-aos="fade-up">
          <Berita />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default News;
