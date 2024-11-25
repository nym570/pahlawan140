import React, { useEffect, useState } from "react";
import axios from "axios";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay"; // Add this line
// import required modules
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules"; // Add Autoplay module
import {message} from 'antd'
import { URL } from '../../config';

export default function Penghargaan() {
  // State untuk pop-up
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  // Function untuk membuka pop-up
  const openPopup = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsOpen(true);
  };

  // Function untuk menutup pop-up
  const closePopup = () => {
    setIsOpen(false);
    setSelectedImage("");
  };
  const baseURL = URL + 'sertifikat';
  const [list, setList] = useState([]);
  const getList = async() => {
    try{
      await axios.get(baseURL).then((res) => {
        setList(res.data.data);
      });
      
    }
    catch (error) {
      message.error("["+error.status+"] Gagal Menampilkan Sertifikat",0);
    }
   
  }
  useEffect(() => {
    getList()
  },[])

  return (
    <div className="mt-[5%] mb-[5%]">
      <h1 className="mb-4 text-center header">Penghargaan</h1>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        spaceBetween={10} // Set space between slides here (e.g., 20px)
        slidesPerView={"3"}
        coverflowEffect={{
          rotate: 40,
          stretch: 0,
          depth: 150,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        autoplay={{
          delay: 2000, // 2 seconds delay
          disableOnInteraction: false, // Continue autoplay after user interactions
        }}
        loop={true} // Enable looping
        modules={[EffectCoverflow, Pagination, Autoplay]} // Add Autoplay module
        className="mySwiper w-[100%] h-[200px]" // Adjust the width and height here
      >
        {list.map((item, index) => (
          <SwiperSlide
            key={index}
            className="overflow-hidden rounded-lg"
            onClick={() => openPopup(item.gambar)} // Open pop-up on click
          >
            <img
              className="w-full h-full object-cover rounded-lg cursor-pointer"
              src={item.gambar}
              alt={item.judul}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="relative">
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-[55vw] max-h-[55vh] rounded-xl object-contain"
            />
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 bg-white rounded-full p-2 focus:outline-none"
            >
              ✖
            </button>
          </div>
          <br /><br /><br />
        </div>
      )}
    </div>
  );
}
