import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from '@nextui-org/react';
import urang from '/image/Urang.png';
import { Link } from 'react-router-dom';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { URL } from '../../config';
import {message} from 'antd'

const Beranda = () => {
  const [list, setList] = useState([]);
  const [sum, setSum] = useState(0);
  const getList = async() => {
    try{
      await axios.get(URL+'magang/count').then((res) => {
        setList(res.data.data);
        let sum = res.data.data.reduce(function(prev, current) {
          return prev + +current.statusCount
        }, 0);
        setSum(sum);
      });
      
    }
    catch (error){
      message.error("["+error.status+"] Gagal Menampilkan Peritungan Magang",5);
    }
  }

  useEffect(() => {
    getList()
   
  }, []);
  return (
    <div style={{ padding: '4rem 0px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#0B588F',
        color: 'white',
        padding: '25px',
        borderRadius: '10px',
        position: 'relative',
        flexDirection: 'row',
        textAlign: 'left',
      }}>
        <div class="px-4 sm:px-10">
          <h1 class="text-xl sm:text-2xl font-bold italic mb-3">Ayo Magang!</h1>
          <h2 class="text-lg sm:text-xl font-semibold font-inter">BPS Kabupaten Sidoarjo</h2>
          <p class="text-sm sm:text-base my-1 font-assistant font-light">
            Sebuah platform yang memfasilitasi pengajuan magang bagi mahasiswa/i dari berbagai universitas atau perguruan tinggi untuk
            memperoleh pengalaman bekerja secara nyata di lingkungan instansi Badan Pusat Statistik Kabupaten Sidoarjo sebagai penyedia
            data statistik di Kabupaten Sidoarjo.
          </p>
          <Button
            auto
            class="bg-gradient-to-r from-[#EB891B] to-[#ff9c3f] text-white font-inter font-semibold mt-2 rounded-full px-5 py-3 shadow-md transform transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <Link to="/daftaram" class="text-inherit no-underline font-inter sm:text-base text-sm">
              Daftar Akun Magang
            </Link>
          </Button>
        </div>
        <div className=''>
          <img
            src={urang}
            alt="Urang"
            className="hidden sm:block w-full max-w-[250px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[600px] mx-auto sm:mr-12"
          />
        </div>
        <div className="absolute -bottom-[400px] sm:bottom-[-50px] left-1/2 transform -translate-x-1/2 flex flex-col sm:flex-row bg-[#13466A] p-3 sm:p-5 rounded-[10px] sm:rounded-[15px] shadow-lg text-white sm:justify-between w-[35%] sm:w-[50%]">
          <div className="text-center flex-1 mb-2 sm:mb-0">
            <h3 className="text-3xl sm:text-4xl m-0 font-assistant font-semibold leading-tight">{sum}</h3>
            <p className="text-lg sm:text-medium m-0 font-assistant font-normal">Total Pendaftar</p>
          </div>
          <div className="h-[1px] sm:h-16 w-full sm:w-[1px] bg-white my-2 sm:my-0 sm:mx-3"></div>
          <div className="text-center flex-1 mb-2 sm:mb-0">
            <h3 className="text-3xl sm:text-4xl m-0 font-assistant font-semibold leading-tight">{list.find(({ status }) => status === "menunggu")?list.find(({ status }) => status === "menunggu").statusCount:0}</h3>
            <p className="text-lg sm:text-medium m-0 font-assistant font-normal">Menunggu Verifikasi</p>
          </div>
          <div className="h-[1px] sm:h-16 w-full sm:w-[1px] bg-white my-2 sm:my-0 sm:mx-3"></div>
          <div className="text-center flex-1 mb-2 sm:mb-0">
            <h3 className="text-3xl sm:text-4xl m-0 font-assistant font-semibold leading-tight">{list.find(({ status }) => status === "aktif")?list.find(({ status }) => status === "aktif").statusCount:0}</h3>
            <p className="text-lg sm:text-medium m-0 font-assistant font-normal">Magang Aktif</p>
          </div>
          <div className="h-[1px] sm:h-16 w-full sm:w-[1px] bg-white my-2 sm:my-0 sm:mx-3"></div>
          <div className="text-center flex-1">
            <h3 className="text-3xl sm:text-4xl m-0 font-assistant font-semibold leading-tight">12</h3>
            <p className="text-lg sm:text-medium m-0 font-assistant font-normal">Kuota Magang</p>
          </div>
        </div>
      </div>
      <div className="mt-[450px] sm:mt-[90px] px-4 sm:px-6 md:px-8 lg:px-12">
        <h2 className="font-bold font-assistant text-gray-600 text-center text-[1.2rem] sm:text-[1.4rem] md:text-[1.6rem] lg:text-[1.8rem] m-0">
          Tahapan Pendaftaran Magang
        </h2>
        <p className="font-assistant text-gray-500 text-center text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.2rem] my-2">
          Berikut merupakan alur pendaftaran magang BPS Kabupaten Sidoarjo
        </p>
      </div>

      <div className='w-full mt-5'>
        <VerticalTimeline lineColor='#0B588F'>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'linear-gradient(to right, #0B588F, #26AAE1)', color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: '600' }}
            contentArrowStyle={{ borderRight: '7px solid #26AAE1' }}
            iconStyle={{ background: '#EB891B', color: '#fff', boxShadow: "0 0 0 4px #fb6d17, inset 0 2px 0 rgba(0, 0, 0, .04), 0 3px 0 4px rgba(0, 0, 0, .05)"}}
            icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
              <text x="6" y="20" font-size="24" font-weight="semibold" fill="currentColor">1</text>
            </svg>
            }
          >
            <h3 className="vertical-timeline-element-title">Registrasi & masuk akun Ayo Magang!</h3>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'linear-gradient(to right, #0B588F, #26AAE1)', color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: '600' }}
            contentArrowStyle={{ borderRight: '7px solid #0B588F' }}
            iconStyle={{ background: '#EB891B', color: '#fff', boxShadow: "0 0 0 4px #fb6d17, inset 0 2px 0 rgba(0, 0, 0, .04), 0 3px 0 4px rgba(0, 0, 0, .05)"}}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                <text x="5" y="20" font-size="24" font-weight="semibold" fill="currentColor">2</text>
              </svg>
            }
          >
            <h3 className="vertical-timeline-element-title">Isi dan lengkapi data yang diperlukan pada formulir</h3>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'linear-gradient(to right, #0B588F, #26AAE1)', color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: '600' }}
            contentArrowStyle={{ borderRight: '7px solid #26AAE1' }}
            iconStyle={{ background: '#EB891B', color: '#fff', boxShadow: "0 0 0 4px #fb6d17, inset 0 2px 0 rgba(0, 0, 0, .04), 0 3px 0 4px rgba(0, 0, 0, .05)"}}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                <text x="4" y="20" font-size="24" font-weight="semibold" fill="currentColor">3</text>
              </svg>
            }
          >
            <h3 className="vertical-timeline-element-title">Unggah berkas-berkas pendukung seperti Surat Pengantar atau Proposal Magang, jika diperlukan</h3>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'linear-gradient(to right, #0B588F, #26AAE1)', color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: '600' }}
            contentArrowStyle={{ borderRight: '7px solid #0B588F' }}
            iconStyle={{ background: '#EB891B', color: '#fff', boxShadow: "0 0 0 4px #fb6d17, inset 0 2px 0 rgba(0, 0, 0, .04), 0 3px 0 4px rgba(0, 0, 0, .05)"}}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                <text x="4" y="20" font-size="24" font-weight="semibold" fill="currentColor">4</text>
              </svg>
            } 
          >
            <h3 className="vertical-timeline-element-title">Pastikan semua data telah benar sebelum dikumpulkan</h3>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default Beranda;
