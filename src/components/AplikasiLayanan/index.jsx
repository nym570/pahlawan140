import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import {message} from 'antd'
import { URL } from '../../config';

export default function AplikasiLayanan() {


  const baseURL = URL + 'aplikasi';
  const [list, setList] = useState([]);
  const getList = async() => {
    try{
      await axios.get(baseURL).then((res) => {
        setList(res.data.data);
      });
      
    }
    catch (error) {
      message.error("["+error.status+"] Gagal Menampilkan Layanan",0);
    }
   
  }
  useEffect(() => {
    getList()
  },[])

  return (
    <div>
      <h1 className="mb-2 text-center header">Aplikasi Pelayanan</h1>
      <p className="mb-5 text-center sub-header">
        Sistem yang memfasilitasi layanan BPS kepada publik
      </p>
      <br />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {list.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="card-link"
          >
            <Card
              shadow="md"
              isPressable
            >
              <CardBody className="p-4 overflow-visible">
                <Image
                  shadow="md"
                  radius="md"
                  width="100%"
                  alt={item.judul}
                  className="object-cover w-full h-full"
                  src={item.gambar}
                />
              </CardBody>
              <CardFooter className="block text-small">
                <b className="text-left title-card-lg">{item.judul}</b>
                <p
                  className="ml-2 text-content-card"
                  style={{ textAlign: "justify", padding: "2%" }}
                >
                  {item.deskripsi}
                </p>
              </CardFooter>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
