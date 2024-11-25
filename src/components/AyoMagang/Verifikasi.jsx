import React, { useEffect } from "react";
import { Button } from "@nextui-org/react";
import { Link,useLocation } from "react-router-dom";
import { URL } from '../../config';
import axios from "axios";

const Verif = () => {
  const location = useLocation();
  useEffect(() => {
    const token = new URLSearchParams(location.search).get('emailToken');
    const verifyEmail = async () => {
      try {
        await axios.patch(URL+'magang/verifyemail', {
          emailToken: token,
      })
      } catch (error) {
        window.location.href = '/masukam';
      }
    };

    if (token) {
      verifyEmail();
    } else {
      window.location.href = '/masukam';
    }
  }, []);
  return (
    <div
      className="relative flex items-center justify-center min-h-screen "
      style={{ backgroundImage: "url('/image/bg_am.png')", backgroundRepeat:"no-repeat", backgroundSize: 'cover', minHeight: '100%'   }}
    >
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md p-8 mt-10 bg-white shadow-md rounded-xl md:max-w-lg" style={{ marginTop: '120px', marginBottom: '60px' }}>
        <div className="flex flex-col items-center mb-8">
          <img
            src="/image/logo_am.png"
            alt="Logo"
            className="w-20 h-55 mb-3 md:w-30 md:h-50"
          />
          <p className="text-lg font-bold font-inter md:text-xl">
            Verifikasi Akun Berhasil!
          </p>
          <p className="text-center text-sm font-semibold tracking-wider text-gray-500 font-assistant">
            Silahkan login untuk melanjutkan pendaftaran magang!
          </p>
          <p className="text-lg font-bold font-inter md:text-xl" style ={{ marginTop: '20px' }}>
            - Terima Kasih -
          </p>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500 font-assistant">
            <Link to="/masukam" className="text-[#0B588F]">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Verif;