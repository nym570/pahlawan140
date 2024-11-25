import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import LayananSection from "../components/LayananSection";
import NavbarCustom from "../components/NavbarCustom";
import AplikasiLayanan from "../components/AplikasiLayanan";
import Carousel from "../components/CarouselCustom";
import Footer from "../components/Footer/Footer";
import Berita from "../components/Berita";
import Profil from "../components/Profil";
import Penghargaan from "../components/Penghargaan";

const Beranda = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in milliseconds
      once: true, // whether animation should happen only once - while scrolling down
    });
  }, []);

  return (
    <>
      <NavbarCustom />
      <Carousel />
      <div className="px-[10%]">
        <div data-aos="fade-up">
          <LayananSection />
        </div>
        <div data-aos="fade-up" data-aos-delay="100">
          <AplikasiLayanan />
        </div>
        <div data-aos="fade-up" data-aos-delay="300">
          <Penghargaan />
        </div>
      </div>
      <br />
      <Footer />
    </>
  );
};

export default Beranda;
