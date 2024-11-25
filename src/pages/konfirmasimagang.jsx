
import AOS from 'aos';
import 'aos/dist/aos.css';
import NavbarCustom from '../components/AyoMagang/header2';
import Verif from '../components/AyoMagang/Verifikasi';
import Footer from '../components/Footer/Footer';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { URL } from '../config';
import { Navigate } from "react-router-dom";

const Konfirmasi = () => {
  const location = useLocation();
  const [isVerified, setisVerified] = useState(false);
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in milliseconds
      once: true, // whether animation should happen only once - while scrolling down
    });
    const handle = async () => {
      try {
          const params = new URLSearchParams(location.search);
          const emailToken = params.get('emailToken');
          const response = await axios.patch(URL+'magang/verifyemail', {
              emailToken: emailToken
          });
          
          if(response.data.status === "Success"){
              setisVerified(true);
          }
      } catch (error) {
        console.log(error);
      }
  };
  handle();
  }, []);

  return isVerified ? (
    <>
      <NavbarCustom />
      <Konfirm />
      <Footer />
    </>
  ): <Navigate to="/masukam" />;
};

export default Verif;