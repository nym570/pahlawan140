import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { URL } from '../../config';
import {message} from 'antd'

export default function Office ({kategori}) {

  const baseURL = URL+'link/get/kategori/'+kategori.id;
  const [list, setList] = useState([]);
  
  const getList = async() => {
    try{
      await axios.get(baseURL).then((res) => {
        setList(res.data.data);
      });
    }
    catch (error) {
      message.error("["+error.status+"] Gagal Menampilkan Segmen",0);
    }
   
  }
  useEffect(() => {
    getList()
  },[])

  return (
    <div className="mt-[10%] mb-[5%]">
      <h1 className="mb-2 text-center header">{kategori.judul}</h1>
      <p className="mb-2 text-center sub-header">
        {kategori.deskripsi}
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
                  width="100%"
                  alt={item.judul}
                  className="object-cover w-full h-full"
                  src={item.gambar}
                />
              </CardBody>
              <CardFooter className="block text-small">
                <b className="text-center title-card-lg">{item.judul}</b>
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

