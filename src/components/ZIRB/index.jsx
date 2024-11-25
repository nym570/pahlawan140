import React, { useEffect, useState } from "react";
import axios from "axios";
import {message} from 'antd'
import { URL } from '../../config';

const ZIRB = () => {
  const baseURL = URL + 'zirb';
  const [list, setList] = useState([]);
  const getList = async() => {
    try{
      await axios.get(baseURL).then((res) => {
        setList(res.data.data);
      });
    }
    catch (error) {
      message.error("["+error.status+"] Gagal Menampilkan Data ZIRB",0);
    }
   
  }
  useEffect(() => {
    getList()
  },[])
  return (
    <div className="flex flex-col mt-[10%] mb-[5%]">
      
      <h6 className="text-center header">Zona Integritas (ZI)</h6>
      <p className="text-center sub-header text-[#0B588F]">
        Merupakan predikat yang diberikan kepada kementerian, lembaga dan
        pemerintah daerah yang pimpinan dan jajarannya mempunyai niat (komitmen)
        untuk mewujudkan WBK dan WBBM melalui upaya pencegahan korupsi,
        reformasi birokrasi dan peningkatan kualitas pelayanan publik.
      </p>
      <br />
      <h6 className="text-center header mt-[3%]">Reformasi Birokrasi (RB)</h6>
      <p className="text-center sub-header text-[#0B588F]">
        Adalah langkah penting untuk menciptakan perbaikan dalam tata kelola
        pemerintahan, yang merupakan fondasi utama bagi pembangunan nasional.
        Proses ini melibatkan upaya pembaharuan dan perubahan mendasar pada
        sistem pemerintahan guna mewujudkan prinsip-prinsip tata kelola yang
        baik, atau yang dikenal sebagai good governance.
      </p>
      <br />
      <img
        src="/image/wbk.png"
        alt="Wilayah Bebas Korupsi"
        style={{ height: "15%", width: "15%" }}
        className="mx-auto"
      />
      <p className="text-justify sub-header">
        &emsp; &emsp; BPS Kabupaten Sidoarjo Menerima Penghargaan Satker
        Predikat Wilayah Bebas dari Korupsi (WBK) dari Kementrian PAN-RB pada
        Senin, 20 Desember 2021. Setelah melalui beberapa kali Desk Evaluation
        (DE) WBK, tahun 2021 BPS Kabupaten Sidoarjo resmi menjadi satker dengan
        predikat WBK. WBK merupakan predikat yang diberikan kepada satuan kerja
        yang telah memenuhi kriteria tertentu sebagai bentuk pencegahan
        terjadinya korupsi, kolusi, dan nepotisme. Satker yang dinilai layak
        menyandang predikat WBK harus memenuhi 6 (enam) kriteria perubahan,
        antara lain: manajemen perubahan, penataan tata laksana, penataan sistem
        manajemen sumber daya manusia, penguatan pengawasan, dan penguatan
        akuntabilitas kinerja.
      </p>
      {list.map((item, index) => (
        <div>
          <br></br>
          <br></br>
          <br></br>
           <h2 className="mb-2 text-center header">{item.judul}</h2>
        <p className="text-justify sub-header"> {item.deskripsi}</p>
        <div className="flex justify-center mt-[3%]">
        <iframe
          width={item.width+"%"}
          height={item.height}
          src={item.link}
          style={{ border: 0 }}
          allowFullScreen
          sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        ></iframe>
      </div>
        </div>
       
          ))}
    </div>
  );
};

export default ZIRB;
