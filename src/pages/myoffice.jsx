import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import NavbarCustom from "../components/NavbarCustom";
import Office from "../components/Office";
import Footer from "../components/Footer/Footer";
import { URL } from '../config';
import {message} from 'antd'


const MyOffice = () => {
  const baseURL = URL+'segmen-link';
  const [list, setList] = useState([]);
  
  const getList = async() => {
    try{
      await axios.get(baseURL).then((res) => {
        setList(res.data.data);
      });
    }
    catch (error){
      message.error("["+error.status+"] Gagal Menampilkan List",0);
    }
  }

  useEffect(() => {
    getList(),
    AOS.init({
      duration: 1000, // animation duration in milliseconds
      once: true, // whether animation should happen only once - while scrolling down
    });
  }, []);

  return (
    <>
      <NavbarCustom />
      <div className="px-[10%]">
        {
          list.map((item,index) => (
            <div data-aos="fade-up" key={index}>
              <Office kategori={item}/>
            </div>
          ))
        }
        
      </div>
      <Footer />
    </>
  );
};

export default MyOffice;
