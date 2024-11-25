import React from "react";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

const BerhasilDaftar = () => {
  return (
    <div
      className="relative flex items-center justify-center min-h-screen"
      style={{ backgroundImage: "url('/image/bg.svg')", backgroundSize: 'cover' }}
    >
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md p-8 mt-10 bg-white shadow-md rounded-xl md:max-w-lg" style={{ marginTop: '120px'}}>
        <div className="flex flex-col items-center mb-8">
          <img
            src="/image/logo_am.png"
            alt="Logo"
            className="w-20 h-55 mb-3 md:w-30 md:h-50"
          />
          <p className="text-lg font-bold font-inter md:text-xl">
            Pendaftaran Akun Magang Berhasil!
          </p>
          <p className="text-sm font-semibold tracking-wider text-gray-500 font-assistant">
            Silahkan cek e-mail untuk melakukan aktivasi akun.
          </p>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500 font-assistant">
            Sudah memiliki akun magang?{" "}
            <Link to="/masukam" className="text-[#0B588F]">
              Masuk di sini.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BerhasilDaftar;