
import AOS from 'aos';
import 'aos/dist/aos.css';
import NavbarCustom from '../components/AyoMagang/header2';
import Konfirm from '../components/AyoMagang/Konfirmasi';
import Footer from '../components/Footer/Footer';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { URL } from '../config';
import { Navigate } from "react-router-dom";

const BerhasilMagang = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in milliseconds
      once: true, // whether animation should happen only once - while scrolling down
    });
  }, []);

  return (
    <>
      <NavbarCustom />
      <Konfirm />
      <Footer />
    </>
  )
};

export default BerhasilMagang;