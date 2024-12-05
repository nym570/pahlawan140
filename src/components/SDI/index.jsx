import React, { useEffect, useState } from "react";
import axios from "axios";
import {message, List, Flex} from 'antd'
import { URL } from '../../config';
import { EyeIcon } from "../../components/Icon/EyeIcon";

const data = [
  {
    desc: 'Memperkuat kapasitas pembina statistik sektoral',
  },
  {
    desc: 'Menggelar kegiatan dan inisiatif untuk meningkatkan kualitas dan efektivitas pembinaan statistik sektoral ',
  },
  {
   desc: 'Memproduksi dan menerapkan data yang inovatif',
  },
  {
    desc: 'Berkoordinasi membantu kementerian/lembaga dalam menyediakan indikator SDGs melalui kerangka kebijakan SDI ',
  },
];


const SDI = () => {
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
     
      <h6 className="text-center header">Satu Data Indonesia (SDI)</h6>
      <div className="flex flex-row mt-[3%] mb-[1%] justify-center" >
      <img
        src="/image/Kop BPS Sidoarjo.png"
        alt="BPS Sidoarjo"
        style={{ height:"70px" }}
        className="mx-[1%]"
      />
       <img
        src="/image/kabupaten_sidoarjo.png"
        alt="Pemerintah Kabupaten Sidoarjo"
        style={{ height:"70px" }}
        className="mx-[1%]"
      />
       <img
        src="/image/satudataindonesia.png"
        alt="Satu Data Indonesia"
        style={{ height:"70px" }}
        className="mx-[1%]"
      />
     
      </div>
      <p className="text-center sub-header text-[#0B588F] mt-[1%]">
      Satu Data Indonesia (SDI) merupakan kebijakan tata kelola data pemerintah yang bertujuan untuk menciptakan data berkualitas, mudah diakses, dan dapat dibagipakaikan antar Instansi Pusat serta Daerah. Kebijakan ini tertuang dalam Peraturan Presiden no. 39 tahun 2019 tentang Satu Data Indonesia. Melalui SDI, seluruh data pemerintah dan data instansi lain yang terkait dapat bermuara di Portal Satu Data Indonesia (data.go.id)
      </p>
      <p className="text-center sub-header text-[#0B588F] mt-[1%]">
      Portal Satu Data Indonesia merupakan portal resmi data terbuka Indonesia yang dikelola oleh Sekretariat Satu Data Indonesia tingkat Pusat, Kementerian Perencanaan Pembangunan Nasional / Bappenas. Melalui Portal Satu Data Indonesia, kami berupaya penuh untuk memperbaiki tata kelola data demi terwujudnya transparansi dan akuntabilitas pemerintah, serta mendukung pembangunan nasional.
      </p>
      
      <br />
      <h6 className="text-center header mt-[3%] mb-[1%]">Penyelenggaraan Satu Data Kabupaten Sidoarjo</h6>
      
      <br />
      
      <img
        src="/image/sdi.jpg"
        alt="Wilayah Bebas Korupsi"
        style={{ width: "60%" }}
        className="mx-auto"
      />
    
    <Flex justify="space-between" className="mt-[5%] flex-col lg:flex-row">
     
      <Flex
        vertical
        className="pe-5"
      >
       <h6 className="header mb-[2%]">BPS Berkomitmen</h6>
          <p >
          Badan Pusat Statistik (BPS) berkomitmen untuk mendukung implementasi Satu Data Indonesia (SDI) melalui berbagai kegiatan dan inisiatif:
          </p>
          <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item>
        <Flex>
          <p className="sub-header text-[#0B588F]">{item.desc}</p>
        </Flex>
       
       
      </List.Item>
    )}
  />
      </Flex>
      <img
        alt="avatar"
        src="/image/sdi pegawai.png" 
        style={{width:'85%'}}
      />
    </Flex>
  
      
    
  
     
      
    
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

export default SDI;
