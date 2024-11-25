import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "antd";
import useWindowDimensions from "../../hooks/useWindowDimensions.js";
import {message} from 'antd'
import { URL } from '../../config';

const CarouselCustom = () => {
  const { width } = useWindowDimensions();

  const imgStyle = {
    width: "100%",
  };
  
  const baseURL = URL + 'banner';
  const [list, setList] = useState([]);
  const getList = async() => {
    try{
      await axios.get(baseURL).then((res) => {
        setList(res.data.data);
      });
      
    }
    catch (error) {
      message.error("["+error.status+"] Gagal Menampilkan Carrousel",0);
    }
   
  }
  useEffect(() => {
    getList()
  },[])

  return (
    <>
      <Carousel
        effect="fade"
        speed={2000}
        arrows
        infinite={true}
        autoplay
        autoplaySpeed={2500}
        className="overflow-hidden"
      >
        {list.map((item, index) => (
           <div>
           <img alt={item.urutan} src={item.gambar} style={imgStyle} />
         </div>
        ))}
        
      </Carousel>
    </>
  );
};

export default CarouselCustom;
