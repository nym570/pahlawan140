
import React, { useEffect, useState } from "react";
import axios from "axios";
import CardCustom from "../CardCustom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Image } from "@nextui-org/react";

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
import { Link } from "react-router-dom";
import {message} from 'antd'
import { URL } from '../../config';

const RuangBaca = () => {
  // Definisikan array data untuk setiap card
  const baseURL = URL + 'baca';
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
    <div className="flex flex-col mt-[8%] mb-[5%]">
      <h1 className="mb-2 text-center header">
        Selamat Datang di Ruang Baca Digital BPS Sidoarjo!
      </h1>
      <p className="text-center sub-header">
        Berikut merupakan koleksi pustaka bacaan yang telah kami sediakan untuk
        memenuhi kebutuhan informasi dan literasi Anda. Dengan akses yang mudah
        dan cepat, Anda dapat menjelajahi berbagai jenis bacaan yang tersedia
        dimanapun dan kapanpun.
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
              spaceBetween: 10,
            },
          }}
          modules={[Autoplay, Navigation, Pagination, Mousewheel, Keyboard]}
          className="px-[50px] py-[30px]"
        >
          {list.map((card, index) => (
            <SwiperSlide
              key={index}
              className="lg:h-[270px] xl:h-[300px] 2xl:h-[270px] px-4 my-10"
            >
              <Link to={card.link} target="_blank" rel="noopener noreferrer">
                <Image
                  isBlurred
                  width={180}
                  height={240}
                  src={card.gambar}
                  alt={card.judul}
                  className="m-5"
                />
                <p className="text-center mt-2 font-bold text-[#0B588F]">
                  {card.judul}
                </p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RuangBaca;
