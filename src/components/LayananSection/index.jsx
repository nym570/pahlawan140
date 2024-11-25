

import CardCustom from "../CardCustom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IconPickerItem } from 'react-icons-picker'

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
} from "swiper/modules";
import {message} from 'antd'
import { URL } from '../../config';

const LayananSection = () => {
  // Definisikan array data untuk setiap card
  const baseURL = URL + 'layanan';
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
    
    <div className="flex flex-col my-10">
      <h1 className="mb-2 text-center header">Layanan Kami</h1>
      <p className="mb-5 text-center sub-header">
        Layanan BPS Kabupaten Sidoarjo dalam Sketsa Ragam Pelayanan Kami kepada
        anda dalam melaksanakan kegiatan statistik.
      </p>
      <div className="swiperWrapper">
        <Swiper
          cssMode={true}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 0,
            },
          }}
          modules={[Autoplay, Navigation, Pagination, Mousewheel, Keyboard]}
          className=""
        >
          {list.map((card, index) => (
            <SwiperSlide
              key={index}
              className="lg:h-[270px] xl:h-[300px] 2xl:h-[270px] px-4 my-10"
            >
              <CardCustom
                bgColor={index%4==0?"#26AAE1":(index%4==1?"#00CC83":(index%4==2?"#EB891B":"#468585"))}
                iconColor="white"
                icon={<IconPickerItem value={card.icon} color="#ffff" />}
                title={card.judul}
                description={card.deskripsi}
                link={card.link}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default LayananSection;
