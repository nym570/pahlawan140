import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "tailwindcss/tailwind.css";
import {message} from 'antd'
import { URL } from '../../config';

// const data = {
//   youtube: [
//     {
//       id: 1,
//       title: "Video Profil IST Kabupaten Sidoarjo-Nofriana Florida Djami Raga",
//       imageUrl: "https://img.youtube.com/vi/Ujd9LP7wu4U/maxresdefault.jpg",
//       videoUrl: "https://www.youtube.com/embed/Ujd9LP7wu4U",
//     },
//     {
//       id: 2,
//       title: "Ngulik 2.0 (Full Version) - Life in Nigeria Through Data Lens",
//       imageUrl: "https://img.youtube.com/vi/ZL2pSOvmNDU/maxresdefault.jpg",
//       videoUrl: "https://www.youtube.com/embed/ZL2pSOvmNDU",
//     },
//     {
//       id: 3,
//       title: "GANTARI I Jatim Census Film Festival",
//       imageUrl: "https://img.youtube.com/vi/kBkx0i-Vyxk/maxresdefault.jpg",
//       videoUrl: "https://www.youtube.com/embed/kBkx0i-Vyxk",
//     },
//     {
//       id: 4,
//       title: "BPS Kabupaten Sidoarjo Menuju WBK 2021",
//       imageUrl: "https://img.youtube.com/vi/DsgWD5ocHjA/maxresdefault.jpg",
//       videoUrl: "https://www.youtube.com/embed/DsgWD5ocHjA",
//     },
//     {
//       id: 5,
//       title: "Zona Integritas BPS Kabupaten Sidoarjo",
//       imageUrl: "https://img.youtube.com/vi/tMABaoPfVsg/maxresdefault.jpg",
//       videoUrl: "https://www.youtube.com/embed/tMABaoPfVsg",
//     },
//     {
//       id: 6,
//       title: "IST BPS Kabupaten Sidoarjo Tahun 2023",
//       imageUrl: "https://img.youtube.com/vi/aSiLH0cRy4A/maxresdefault.jpg",
//       videoUrl: "https://www.youtube.com/embed/aSiLH0cRy4A",
//     },
//   ],
// };

const Berita = () => {
  const [selectedCategory, setSelectedCategory] = useState("youtube");
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  const youtubeURL = URL + 'video';
  const [youtube, setYoutube] = useState([]);
  const getYoutube = async() => {
    try{
      await axios.get(youtubeURL).then((res) => {
        setYoutube(res.data.data);
      });
    }
    catch (error) {
      message.error("["+error.status+"] Gagal Menampilkan Video",0);
    }
   
  }
  useEffect(() => {
    getYoutube()
  },[])

  return (
    <div className="my-12">
      <div className="flex items-center justify-center mb-1">
        <h1 className="header">Kabar BPS 3515</h1>
      </div>
      <p className="mb-7 sub-header text-center">
        Baca informasi terbaru seputar kegiatan dan layanan dari BPS Kabupaten
        Sidoarjo
      </p>
      <div className="flex justify-start gap-4 mb-5 text-sm font-semibold">
        <button
          onClick={() => setSelectedCategory("youtube")}
          className={`text-[14px] px-4 py-2 rounded-full border ${
            selectedCategory === "youtube"
              ? "bg-pdarkblue text-white"
              : "bg-white text-pdarkblue border-pdarkblue"
          }`}
        >
          YouTube
        </button>
        <button
          onClick={() =>
            window.open("https://sidoarjokab.bps.go.id/id/news", "_blank")
          }
          className={`text-[14px] px-4 py-2 rounded-full border ${
            selectedCategory === "berita"
              ? "bg-pdarkblue text-white"
              : "bg-white text-pdarkblue border-pdarkblue"
          }`}
        >
          Berita
        </button>
      </div>
      <Carousel
        showArrows={true}
        showThumbs={false}
        showIndicators={false}
        infiniteLoop
        selectedItem={youtube.length}
        className="carousel"
      >
        {Array.from({
          length: Math.ceil(youtube.length / 3),
        }).map((_, index) => (
          <div className="flex" key={index}>
            {youtube
              .slice(index * 3, (index + 1) * 3)
              .map((item) => (
                
                <div key={item.link} className="relative w-full px-2 md:w-1/3">
                  
                  <div
                    className="relative w-full h-72 overflow-hidden rounded-lg cursor-pointer"
                    onClick={() => handleVideoClick("https://www.youtube.com/embed/"+item.link)}
                  >
                    <img
                      src={"https://img.youtube.com/vi/"+item.link+"/maxresdefault.jpg"}
                      alt={item.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 text-left text-white">
                    <p className="mb-2 text-sm font-semibold">{item.title}</p>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </Carousel>

      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="relative w-full max-w-2xl mx-auto rounded-lg overflow-hidden">
            <iframe
              src={selectedVideo}
              title="YouTube video player"
              
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-96"
            ></iframe>
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-2 right-2 text-black bg-white rounded-full p-2"
            >
              
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Berita;