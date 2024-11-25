import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import Pegawai from "./pegawai.jsx";

export default function ProfilBPS() {
  const [selectedMenu, setSelectedMenu] = useState("Informasi Umum");

  const menuItems = [
    "Informasi Umum",
    "Core Value",
    "Struktur Organisasi",
    "Profil Pejabat BPS",
  ];

  const content = {
    "Informasi Umum": (
      <div className="text-[12px]">
        <p className="text-justify text-slate-600">
          Badan Pusat Statistik (BPS) Kabupaten Sidoarjo merupakan lembaga
          pemerintah non-kementerian yang bertugas untuk mengumpulkan, mengolah,
          dan menyajikan data statistik yang akurat, berkualitas, dan relevan
          bagi pembangunan di Kabupaten Sidoarjo. Sebagai bagian dari jaringan
          Badan Pusat Statistik di seluruh Indonesia, BPS Kabupaten Sidoarjo
          berperan penting dalam menyediakan data yang menjadi dasar
          perencanaan, pelaksanaan, dan evaluasi kebijakan di berbagai sektor,
          baik di tingkat kabupaten maupun nasional. Berlokasi di pusat
          Sidoarjo, menjadikannya mudah diakses oleh seluruh pihak yang
          membutuhkan layanan data statistik. Dengan dukungan tenaga ahli yang
          profesional dan berkompeten, BPS Kabupaten Sidoarjo terus berkomitmen
          untuk meningkatkan kualitas pelayanan kepada masyarakat melalui
          penyediaan data yang terpercaya dan dapat diandalkan.
        </p>
      </div>
    ),
    "Core Value": (
      <div className="text-[12px]">
        <img
          src="/image/berakhlak.png"
          alt="motto"
          className="custom-image"
          style={{
            display: "block",
            margin: "auto",
            width: "300px",
            height: "auto",
          }} // Atur ukuran sesuai kebutuhan
        />
        <br />
        <p className="text-justify text-slate-600">
          BerAKHLAK dan employer branding “Bangga Melayani Bangsa” menjadi nilai
          dasar yang dapat dirasakan langsung oleh masyarakat dan muncul dalam
          sikap, perbuatan, perkataan, dan pengabdian Aparatur Sipil Negara
          terutama di BPS Kabupaten Sidoarjo. Beberapa poin-poin dalam Core
          Value BerAKHLAK diantaranya :
        </p>
        <ol className="mt-2 list-decimal list-inside text-slate-600">
          <li>
            Berorientasi Pelayanan, Komitmen memberikan pelayanan prima demi
            kepuasan masyarakat.
          </li>
          <li>Akuntabel, Bertanggung jawab atas kepercayaan yang diberikan.</li>
          <li>Kompeten, Terus belajar dan mengembangkan kapabilitas.</li>
          <li>Harmonis, Saling peduli dan menghargai perbedaan.</li>
          <li>
            Loyal, Berdedikasi dan mengutamakan kepentingan Bangsa dan Negara.
          </li>
          <li>
            Adaptif, Terus berinovasi dan antusias dalam menggerakkan serta
            menghadapi perubahan.
          </li>
          <li>Kolaboratif, Membangun kerja sama yang sinergis.</li>
        </ol>
      </div>
    ),
    "Struktur Organisasi": (
      <div className="text-[12px]">
      <img src="/image/struktur.png" alt="struktur" className="mx-auto flex justify-center" />
        <br />
        <p className="text-justify text-slate-600">
          Untuk melaksanakan tugas, fungsi, kewenangan, susunan organisasi dan
          tata kerja tersebut, sesuai Keputusan Kepala BPS Nomor 121 Tahun 2001
          tentang Organisasi dan Tata Kerja Perwakilan Badan Pusat Statistik di
          Daerah, telah ditentukan struktur organisasi Badan Pusat Statistik
          Kabupaten/Kota, yaitu :
        </p>
        <ol className="mt-2 list-decimal list-inside text-slate-600">
          <li>
            Kepala Kantor Tugas : memimpin BPS Kabupaten/Kota dengan tugas dan
            fungsi BPS Kabupaten/Kota serta membina aparatur BPS Kabupaten/Kota
            agar berdaya guna dan berhasil guna.
          </li>
          <li>
            Sub Bagian Umum Tugas : melakukan penyusunan perencanaan, keuangan,
            sumber daya manusia, hubungan masyarakat, hukum dan organisasi,
            kearsipan, persandian,barang milik negara, perlengkapan, dan rumah
            tangga.
          </li>
          <li>
            Kelompok Jabatan Fungsional Tugas : melakukan kegiatan sesuai dengan
            jabatan fungsional masing-masing berdasarkan ketentuan peraturan
            perundang-undangan yang berlaku.
          </li>
        </ol>
      </div>
    ),
    "Profil Pejabat BPS": <Pegawai />,
  };

  return (
    <>
      <h2
        className="mb-2 font-bold text-[20px] text-pdarkblue font-inter text-center"
        style={{ marginTop: "5%" }}
      >
        Profil
      </h2>
      <p className="mb-4 mt-4 text-[18px] text-pdarkblue font-assistant text-center">
        Dengan motto "Statistik Berkualitas untuk Indonesia Maju," BPS Kabupaten
        Sidoarjo terus berupaya memberikan kontribusi terbaiknya dalam
        menyediakan data yang dapat mendukung pembangunan yang berkelanjutan dan
        inklusif di Kabupaten Sidoarjo.
      </p>
      <div className="flex justify-center items-center">
        <iframe
          width="640"
          height="360"
          src="https://www.youtube.com/embed/f4vsit-e2cc?si=I6sszd8Co1m-96Ry"
          title="Profil video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="rounded-lg"
        ></iframe>
      </div>
      <br />
      <br />
      <div className="flex flex-col h-screen lg:flex-row lg:h-auto mb-[5%]">
        <div className="p-4 pl-0 bg-white lg:w-1/4 lg:border-r lg:border-gray-300">
          <ul>
            {menuItems.map((item) => (
              <li
                key={item}
                onClick={() => setSelectedMenu(item)}
                className={`p-2 mb-2 cursor-pointer text-[12px] font-semibold rounded-md ${
                  selectedMenu === item
                    ? "bg-pdarkblue text-white"
                    : "bg-white text-pdarkblue"
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 lg:w-3/4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="mb-2 text-[12px] font-bold text-pdarkblue">
              {selectedMenu}
            </h2>
            {/* Uncomment and customize the button as needed */}
            {/* <button className="px-4 py-2 text-white bg-blue-600 rounded-full">Selengkapnya</button> */}
          </div>
          <div>{content[selectedMenu]}</div>
        </div>
      </div>
    </>
  );
}