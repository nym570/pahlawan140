import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import NavbarCustom from "../components/NavbarCustom";
import ProfilBPS from "../components/Profil";
import Footer from "../components/Footer/Footer";

const Profil = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  // return (
  //   <div className="flex flex-col min-h-screen">
  //     <NavbarCustom />
  //     <div className="flex-grow px-[10%] mt-[15vh]">
  //       <div data-aos="fade-up">
  //         <ProfilBPS />
  //       </div>
  //     </div>
  //   </div>
  //   <Footer />
  // );
  return (
    <>
      <NavbarCustom />
      <div className="px-[10%] mt-[15vh]">
        <div data-aos="fade-up">
          <ProfilBPS />
        </div>
      </div>
      <Footer className=""/>
    </>
  );
};

export default Profil;
