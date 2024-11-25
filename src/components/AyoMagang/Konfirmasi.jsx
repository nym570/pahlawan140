import React from "react";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

const Konfirm = () => {
  return (
    <div
      className="relative flex items-center justify-center min-h-screen"
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
            Pendaftaran Magang Berhasil!
          </p>
          <p className="text-center text-sm font-semibold tracking-wider text-gray-500 font-assistant">
            Pengajuan magang Anda akan segera kami proses dalam waktu 7 hari kerja, silahkan cek e-mail Anda untuk mengetahui kabar selanjutnya.
          </p>
          <p className="text-lg font-bold font-inter md:text-xl" style ={{ marginTop: '20px' }}>
            - Terima Kasih -
          </p>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500 font-assistant">
            <Link to="/berandamasuk" className="text-[#0B588F]">
              Kembali ke Beranda
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Konfirm;