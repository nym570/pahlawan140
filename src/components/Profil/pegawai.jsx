import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import {message} from 'antd'
import { URL } from '../../config';

export default function Pegawai() {
  const baseURL = URL + 'pegawai';
  const [list, setList] = useState([]);
  const getList = async() => {
    try{
      await axios.get(baseURL).then((res) => {
        setList(res.data.data);
      });
      
    }
    catch (error) {
      message.error("["+error.status+"] Gagal Menampilkan Pegawai",0);
    }
   
  }
  useEffect(() => {
    getList()
  },[])

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {list.map((item, index) => (
        <Card
          key={index}
          className="mx-auto"
          css={{
            width: '100%',      
            height: 'auto',      
            aspectRatio: '1/1'  
          }}
        >
          <CardBody className="p-0">
            <Image
              radius="none"
              objectFit="cover"
              alt={item.jabatan}
              className="w-full h-full object-cover"
              src={item.gambar}
            />
          </CardBody>
          <CardFooter className="block text-small text-center">
                <b className="title-card-lg">{item.jabatan}</b>
                <p
                  className="ml-2 text-content-card"
                 
                >
                  {item.nama}
                </p>
              </CardFooter>
        </Card>
      ))}
    </div>
  );
}