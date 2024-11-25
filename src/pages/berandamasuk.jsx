import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '../components/AyoMagang/header2';
import Beranda from '../components/AyoMagang/BerandaMasuk';
import Footer from '../components/Footer/Footer';

const BerandaMasuk = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in milliseconds
      once: true, // whether animation should happen only once - while scrolling down
    });
  }, []);

  return (
    <>
      <Header />
      <div data-aos="fade-up" data-aos-delay="100">
        <Beranda />
      </div>
      <Footer />
    </>
  );
};

export default BerandaMasuk;