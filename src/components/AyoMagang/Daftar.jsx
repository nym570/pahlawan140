import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { URL } from '../../config';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import { Link } from "react-router-dom";
import { Form, Button as AntButton, Input } from "antd";

const Daftar = () => {
  const [formRegist] = Form.useForm();
  const registrasi = async (values) => {
    Swal.fire({
      title: "Konfirmasi Pendaftaran",
      text: "Apakah Anda yakin ingin mendaftar akun magang dengan informasi yang telah diisi?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yakin"
    }).then(async (result) => {
      if (result.isConfirmed) {
       try{
      await axios.post(URL+'magang/regist', values)
      window.location.href = '/berhasildaftar'
    }
    catch (error){
      Swal.fire({
        title: "Gagal",
        text: "["+error.status+"] Registrasi gagal!",
        icon: "error"
      });
    }
        
      }
    });
     
   
    
  };
  
  return (
    <div
      className="relative flex items-center justify-center min-h-screen"
      style={{ backgroundImage: "url('/image/bg.svg')", backgroundSize: 'cover' }}
    >
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md p-8 mt-10 bg-white shadow-md rounded-xl md:max-w-lg" style={{ marginTop: '120px', marginBottom: '60px' }}>
        <div className="flex flex-col items-center mb-8">
          <img
            src="/image/logo_am.png"
            alt="Logo"
            className="w-25 h-40 mb-3 md:w-30 md:h-50"
          />
          <p className="text-lg font-bold font-inter md:text-xl">
            REGISTRASI AKUN MAGANG
          </p>
          <p className="text-sm italic font-semibold tracking-wider text-gray-500 font-assistant">
            AYO MAGANG!
          </p>
        </div>
        <Form form = {formRegist} name="basic" 
                        labelAlign="left"
                        onFinish={registrasi}
                        layout="vertical"
                        style={{ width: "100%" }}
                      >
                        <Form.Item className={"font-nunito font-bold md:text-lg"} label="Nama Lengkap" name="nama" rules={[{required:true, message: 'Masukkan Nama Lengkap'}]}>
                          <Input
                          size="large"
                          className={
                           "font-normal bg-slate-100 text-base text-black"
                          } 
                            placeholder="Masukkan Nama Lengkap"
                            allowClear
                          />
                        </Form.Item>
                        <Form.Item className={"font-nunito font-bold md:text-lg"} label="NIP/NIM" name="nim" rules={[{required:true, message: 'Masukkan Nomor Induk Pelajar/Mahasiswa'}]}>
                          <Input
                          size="large"
                          className={
                           "font-normal bg-slate-100 text-base text-black"
                          } 
                            placeholder="Masukkan Nomor Induk Pelajar/Mahasiswa"
                            allowClear
                          />
                        </Form.Item>
                        <Form.Item className={"font-nunito font-bold md:text-lg"} label="Sekolah/Perguruan Tinggi" name="sekolah" rules={[{required:true, message: 'Masukkan Nama Institusi'}]}>
                          <Input
                          size="large"
                          className={
                           "font-normal bg-slate-100 text-base text-black"
                          } 
                            placeholder="Cth: Universitas Muhammadiyah Sidoarjo"
                            allowClear
                          />
                        </Form.Item>
                        <Form.Item className={"font-nunito font-bold md:text-lg"} label="Jurusan/Program Studi" name="jurusan" rules={[{required:true, message: 'Masukkan Jurusan/Prodi'}]}>
                          <Input
                          size="large"
                          className={
                           "font-normal bg-slate-100 text-base text-black"
                          } 
                            placeholder="Cth: S1 Ilmu Hukum"
                            allowClear
                          />
                        </Form.Item>
                        <Form.Item className={"font-nunito font-bold md:text-lg"} label="Email Aktif" name="email" rules={[{required:true, message: 'Masukkan Email Aktif'}]}>
                          <Input
                          size="large"
                          type="email"
                          className={
                           "font-normal bg-slate-100 text-base text-black"
                          } 
                            placeholder="Cth: email@gmail.com"
                            allowClear
                          />
                        </Form.Item>
                        <Form.Item className={"font-nunito font-bold md:text-lg"} label="Nomor Whatsapp" name="nohp" rules={[{required:true, message: 'Masukkan No WA'}]}>
                          <Input
                          size="large"
                          type="tel"
                          className={
                           "font-normal bg-slate-100 text-base text-black"
                          } 
                            placeholder="Cth: 0856xxxx"
                            allowClear
                          />
                        </Form.Item>
                        <Form.Item className={"font-nunito font-bold md:text-lg"} label="Kata Sandi" name="password" rules={[{required:true, message: 'Masukkan Kata Sandi'}]}>
                          <Input.Password
                          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                          size="large"
                          className={
                           "font-normal bg-slate-100 text-base text-black"
                          } 
                            placeholder="Masukkan Kata Sandi"
                            allowClear
                          />
                        </Form.Item>
                     
                        <AntButton type="primary" size="large" htmlType="submit"  className="w-full font-bold font-nunito bg-[#0B588F] text-white mt-[5%]">
                          Simpan
                        </AntButton>
                     
                   
                    </Form>
        
        <div className="mt-4">
          <p className="text-sm text-gray-500 font-assistant">
            Sudah memiliki akun magang?{" "}
            <Link to="/masukam" className="text-[#0B588F]">
              Masuk di sini.
            </Link>
          </p>
        </div>
      </div>
    
    </div>
  );
};

export default Daftar;