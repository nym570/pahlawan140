import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { URL } from '../../config';
import { Form, Button as AntButton, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link } from "react-router-dom";

const Masuk = () => {
  const [formLogin] = Form.useForm();
  const login = async (values) => {
   
       try{
      await axios.post(URL+'magang/login', values)
      .then((response) => {
        const token = response.data.data.token;
        const nama= response.data.data.nama;
        localStorage.setItem("tokenMagang", token);
        localStorage.setItem("userMagang", nama);
        window.location.href = '/berandamasuk'
      })
      
    }
    catch (error){
      console.log(error);
      Swal.fire({
        title: "Gagal",
        text: "["+error.status+"] "+error.response.data.error,
        icon: "error"
      });
    }
     
   
    
  };
  return (
    <div
      className="relative flex items-center justify-center min-h-screen"
      style={{ backgroundImage: "url('/image/bg.svg')", backgroundSize: 'cover' }}
    >
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-sm p-8 m-5 bg-white shadow-md rounded-xl md:max-w-md" style = {{ marginTop: '80px' }}>
        <div className="flex flex-col items-center mb-3">
          <img
            src="/image/logo_am.png"
            alt="Logo"
            className="w-25 h-40 mb-2 md:w-30 md:h-50"
          />
          <p className="text-lg font-bold font-inter md:text-xl">
            MASUK
          </p>
          <p className="text-sm italic font-semibold tracking-wider text-gray-500 font-assistant">
            AYO MAGANG!
          </p>
        </div>
        <Form form = {formLogin} name="basic" 
                        labelAlign="left"
                        onFinish={login}
                        layout="vertical"
                        style={{ width: "100%" }}
                      >
                        <Form.Item className={"font-nunito font-bold md:text-lg"} label="Email Akun" name="email" rules={[{required:true, message: 'Masukkan Email Akun'}]}>
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
                          Masuk
                        </AntButton>
                     
                   
                    </Form>
        <div className="mt-4">
          <p className="text-sm text-gray-500 font-assistant">
            Belum memiliki akun magang?{" "}
            <Link to="/daftaram" className="text-[#0B588F]">
              Daftar di sini.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Masuk;