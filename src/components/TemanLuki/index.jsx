import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image } from "@nextui-org/react";
import {message} from 'antd'
import { URL } from '../../config';

export default function TemanLuki() {
  const baseURL = URL + 'luki';
  const [list, setList] = useState([]);
  const getList = async() => {
    try{
      await axios.get(baseURL).then((res) => {
        setList(res.data.data);
      });
    }
    catch (error) {
      message.error("["+error.status+"] Gagal Menampilkan Data",0);
    }
   
  }
  useEffect(() => {
    getList()
  },[])
  return (
    <div className="mt-[7%] mb-[5%]">
      <h1 className="mb-2 text-center header">Teman Luki</h1>
      <p className="text-justify sub-header">
        Sistem Monitoring dan Evaluasi Kinerja Merupakan solusi inovatif yang
        dirancang khusus untuk mendukung capaian output dan pelayanan publik BPS
        Kabupaten Sidoarjo yang berbasis IT secara efektif dan efisien. Sistem
        ini bertujuan untuk meningkatkan transparansi, akurasi, dan kecepatan
        akses informasi terkait kinerja yang mana memungkinkan para pemangku
        kepentingan untuk membuat keputusan yang lebih akurat.
      </p>
      <br />
      <h2 className="mb-2 text-center header">Pencapaian Kami</h2>
      <div className="flex justify-center">
        <Image
          isZoomed
          isBlurred
          width={511}
          height={360}
          alt="Penghargaan Teman Luki"
          src="/image/sertifikat.png"
        />
      </div>
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
}
