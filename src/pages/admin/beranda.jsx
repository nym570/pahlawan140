import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AdminLayout from "../layout/AdminLayout";
import { URL } from '../../config';
import { PlusOutlined } from "@ant-design/icons";
import { Form, message, Image, Button as AntButton, Input, Upload, Modal as AntModal } from "antd";
import IconPicker from 'react-icons-picker';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Button as NextUIButton,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { EditIcon } from "../../components/Icon/EditIcon";
import { DeleteIcon } from "../../components/Icon/DeleteIcon";
import { EyeIcon } from "../../components/Icon/EyeIcon";

//penghargaan kami table
const columns_cert = [
  { name: "ID", uid: "id_cert" },
  { name: "Urutan", uid: "urut_cert" },
  { name: "Judul", uid: "judul_cert" },
  { name: "Aksi", uid: "aksi_cert" },
];
// pegawai
const columns_pp = [
  { name: "ID", uid: "id_pp" },
  { name: "Urutan", uid: "urut_pp" },
  { name: "Nama", uid: "nama_pp" },
  { name: "Jabatan", uid: "jabatan_pp" },
  { name: "Aksi", uid: "aksi_pp" },
];
//carrousel
const columns_car = [
  { name: "ID", uid: "id_car" },
  { name: "Urutan", uid: "urut_car" },
  { name: "Gambar", uid: "gambar_car" },
  { name: "Aksi", uid: "aksi_car" },
];
//layanan kami table
const columns_lyn = [
  { name: "ID", uid: "urut_lyn" },
  { name: "Judul", uid: "judul_lyn" },
  { name: "Aksi", uid: "aksi_lyn" },
];

//aplikasi pelayanan table
const columns_app = [
  { name: "ID", uid: "urut_app" },
  { name: "Judul", uid: "judul_app" },
  { name: "Aksi", uid: "aksi_app" },
];


// Helper function to get Base64 of a file
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Gambar harus berupa jpg/png');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Gambar harus lebih kecil dari 2MB');
    }
    return false;
  };

function BerandaAdmin() {
  //Profil Pejabat
  const [modalActionPP, setModalActionPP] = useState(null);
  const [selectedItemPP, setSelectedItemPP] = useState(null);
  const [previewVisiblePP, setPreviewVisiblePP] = useState(false);
  const [previewTitlePP, setPreviewTitlePP] = useState('');
  const [previewImagePP, setPreviewImagePP] = useState("");
  const [fileListPP, setFileListPP] = useState([
    // {
    //   uid: "-1",
    //   name: "image.png",
    //   status: "done",
    //   url: "image/Pegawai/Anggie.png",
    // },
    // {
    //   uid: "-2",
    //   name: "image.png",
    //   status: "done",
    //   url: "image/Pegawai/Chandra.png",
    // },
    // {
    //   uid: "-3",
    //   name: "image.png",
    //   status: "done",
    //   url: "image/Pegawai/Eka.png",
    // },
    // {
    //   uid: "-4",
    //   name: "image.png",
    //   status: "done",
    //   url: "image/Pegawai/Febri.png",
    // },
    // {
    //   uid: "-5",
    //   name: "image.png",
    //   status: "done",
    //   url: "image/Pegawai/Indra.png",
    // },
    // {
    //   uid: "-6",
    //   name: "image.png",
    //   status: "done",
    //   url: "image/Pegawai/Ismail.png",
    // },
    // {
    //   uid: "-7",
    //   name: "image.png",
    //   status: "done",
    //   url: "image/Pegawai/Kristin.png",
    // },
    // {
    //   uid: "-8",
    //   name: "image.png",
    //   status: "done",
    //   url: "image/Pegawai/Lukmi.png",
    // },
    // {
    //   uid: "-9",
    //   name: "image.png",
    //   status: "done",
    //   url: "image/Pegawai/Maserul.png",
    // },
    // {
    //   uid: "-10",
    //   name: "image.png",
    //   status: "done",
    //   url: "image/Pegawai/Mutia.png",
    // },
    // {
    //   uid: "-11",
    //   name: "image.png",
    //   status: "done",
    //   url: "image/Pegawai/Neli.png",
    // },
    // {
    //   uid: "-12",
    //   name: "image.png",
    //   status: "done",
    //   url: "image/Pegawai/Uus.png",
    // },
    // {
    //   uid: "-13",
    //   name: "image.png",
    //   status: "done",
    //   url: "image/Pegawai/Yayuk.png",
    // },
    // {
    //   uid: "-14",
    //   name: "image.png",
    //   status: "done",
    //   url: "image/Pegawai/Yuli.png",
    // },
    // {
    //   uid: "-15",
    //   name: "image.png",
    //   status: "done",
    //   url: "image/Pegawai/Neli.png",
    // },
  ]);
  
  const { isOpen: isOpenPP, onOpen: onOpenPP, onOpenChange: onOpenChangePP } = useDisclosure();
  const ppURL = URL+'pegawai';
  let [data_pp, setPP] = useState([]);
  const getPP = async() => {
    try{
      await axios.get(ppURL).then((res) => {
        setPP( res.data.data.map(item => ({
          id_pp: item.id,
          urut_pp : item.urutan,
          nama_pp : item.nama,
          jabatan_pp : item.jabatan,
          gambar_pp : item.gambar,
        })));
      });
    }
    catch(error){
      message.error("["+error.status+"] Gagal Menampilkan List Pegawai",5);
    }

  }
  const handlePreviewPP = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImagePP(file.url || file.preview);
    setPreviewTitlePP(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    setPreviewVisiblePP(true);
  };

  const handleChangePP = ({ file:file, fileList: newFileList }) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (isJpgOrPng&&isLt2M) {
      setFileListPP(newFileList);
    }
  }
  const handleCancelPreviewPP = () => setPreviewVisiblePP(false);
  const [formPP] = Form.useForm();

  const openModalPP = (action, item) => {
    setModalActionPP(action);
    formPP.resetFields();
    setFileListPP([]);
    if(action=='add'){
      setSelectedItemPP("");
    }
    if(action=='edit'||action=='view'){
      formPP.setFieldsValue(item);
      setFileListPP([{uid:-1,status: 'done',url:item.gambar_pp}]);
      setPreviewImagePP(item.gambar_pp);
      
    }
    onOpenPP();
  };
  const [loading, setLoading] = useState(false);
  const beforeUpload3 = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Gambar harus berupa jpg/png');
    }
    const isLt3M = file.size / 1024 / 1024 < 5;
    if (!isLt3M) {
      message.error('Gambar harus lebih kecil dari 5MB');
    }
    return false;
  };
  
  const deletePP =(item) => {
    Swal.fire({
      title: "Apa Anda Yakin?",
      text: "Data yang terhapus tidak dapat dipulihkan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try{
          await axios.delete(`${ppURL}/delete/${item.id_pp}`,{headers: {Authorization: `Bearer ${localStorage.getItem("tokenUser")}`  }});
        getPP()
        Swal.fire({
          title: "Berhasil!",
          text: "Data berhasil dihapus!",
          icon: "success"
        });
        }
        catch(error){
          Swal.fire({
            title: "Gagal",
            text: "["+error.status+"] Data Gagal Dihapus!",
            icon: "error"
          });
        }
      }
    });
     
  };

  const storePP = async (values) => {
    try{
      const data = await axios.post(ppURL, {
        nama: values.nama_pp,
        urutan: values.urut_pp,
        jabatan: values.jabatan_pp,

    },{headers: {Authorization: `Bearer ${localStorage.getItem("tokenUser")}`  }});
    try{
      await axios.post(ppURL+'/upload', {
        id: data.data.data.id,
        gambar: values.gambar_pp.file
        
      },{
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("tokenUser")}`
        }
      })
      formPP.resetFields();
      setFileListPP([]);
      setSelectedItemPP("");
    }
    catch(error){
      message.error("["+error.status+"] Gambar gagal ditambahkan",3);
    }
    
    Swal.fire({
      title: "Berhasil!",
      text: "Data berhasil ditambahkan!",
      icon: "success"
    });
    getPP();
    
    }
    catch(error){
      Swal.fire({
        title: "Gagal",
        text: "["+error.status+"] Data Gagal Ditambahkan!",
        icon: "error"
      });
    }
    // console.log(values);
  };

  const updatePP = async (values) => {
    try{
      await axios.put(ppURL+'/update/'+values.id_pp, {
        nama: values.nama_pp,
        urutan: values.urut_pp,
        jabatan: values.jabatan_pp,
      },{headers: {Authorization: `Bearer ${localStorage.getItem("tokenUser")}`  }})
      try{
        await axios.post(ppURL+'/upload', {
          id: values.id_pp,
          gambar: values.gambar_pp.file
          
        },{
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("tokenUser")}`
          }
        })
      }
      catch(error){
        message.error("["+error.status+"] Gambar gagal diubah",3);
      }
      
     
      Swal.fire({
        title: "Berhasil!",
        text: "Data berhasil diupdate!",
        icon: "success"
      });
      getPP();
    }
    catch(error){
      Swal.fire({
        title: "Gagal",
        text: "["+error.status+"] Data Gagal Diubah!",
        icon: "error"
      });
    }
    
  };

  const renderCellPP = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];
    switch (columnKey) {
      case "urut_pp":
        return <p className="text-bold text-sm text-center">{cellValue}</p>;
      case "nama_pp":
        return <p className="text-bold text-sm text-center">{cellValue}</p>;
      case "jabatan_pp":
        return <p className="text-bold text-sm text-center">{cellValue}</p>;
      case "aksi_pp":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="Detail">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => openModalPP("view", item)}
              >
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip color="primary" content="Edit">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => openModalPP("edit", item)}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Hapus">
              <span className="text-lg text-danger cursor-pointer active:opacity-50"  onClick={() => deletePP(item)}>
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return <p className="text-sm text-center">{cellValue}</p>;
    }
  }, []);


  //Carousel
  const [modalActionCar, setModalActionCar] = useState(null);
  const [selectedItemCar, setSelectedItemCar] = useState(null);
  const [previewVisibleCar, setPreviewVisibleCar] = useState(false);
  const [previewImageCar, setPreviewImageCar] = useState('');
  const [previewTitleCar, setPreviewTitleCar] = useState('');

  const [fileListCar, setFileListCar] = useState([
    // {
    //   uid: "-1",
    //   name: "image.png",
    //   status: "done",
    //   url: "image/Carousel/C1.svg",
    // },
    // {
    //   uid: "-2",
    //   name: "image.png",
    //   status: "done",
    //   url: "image/Carousel/C2.svg",
    // },
    // {
    //   uid: "-3",
    //   name: "image.png",
    //   status: "done",
    //   url: "image/Carousel/C3.svg",
    // },
    // {
    //   uid: "-4",
    //   name: "image.png",
    //   status: "done",
    //   url: "image/Carousel/C4.svg",
    // },
    // {
    //   uid: '-xxx',
    //   percent: 50,
    //   name: 'image.png',
    //   status: 'uploading',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
    // {
    //   uid: '-5',
    //   name: 'image.png',
    //   status: 'error',
    // },
  ]);
  
  const { isOpen: isOpenCar, onOpen: onOpenCar, onOpenChange: onOpenChangeCar } = useDisclosure();

  const carURL = URL+'banner';
  let [data_car, setCar] = useState([]);

  const getCar = async() => {
    try{
      await axios.get(carURL).then((res) => {
        setCar( res.data.data.map(item => ({
          id_car : item.id,
          urut_car : item.urutan,
          gambar_car : item.gambar,
        })));
      });
    }
    catch(error){
      message.error("["+error.status+"] Gagal Menampilkan List Carousell",5);
    }


  }

  const handlePreviewCar = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImageCar(file.url || file.preview);
    setPreviewTitleCar(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    setPreviewVisibleCar(true);
  };

  const handleChangeCar = ({ file:file, fileList: newFileList }) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt2M = file.size / 1024 / 1024 < 4;
    if (isJpgOrPng&&isLt2M) {
      setFileListCar(newFileList);
    }
  }

  const handleCancelPreviewCar = () => setPreviewVisibleCar(false);
  const [formCar] = Form.useForm();

  const openModalCar = (action, item) => {
    setModalActionCar(action);
    formCar.resetFields();
    setFileListCar([]);
    if(action=='add'){
      setSelectedItemCar("");
    }
    if(action=='edit'||action=='view'){
      formCar.setFieldsValue(item);
      setFileListCar([{uid:-1,status: 'done',url:item.gambar_car}]);
      setPreviewImageCar(item.gambar_car);
      
    }
    onOpenCar();
  };

  const deleteCar =(item) => {
    Swal.fire({
      title: "Apa Anda Yakin?",
      text: "Data yang terhapus tidak dapat dipulihkan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try{
          await axios.delete(`${carURL}/delete/${item.id_car}`,{headers: {Authorization: `Bearer ${localStorage.getItem("tokenUser")}`  }});
        getCar()
        Swal.fire({
          title: "Berhasil!",
          text: "Data berhasil dihapus!",
          icon: "success"
        });
        }
        catch(error){
          Swal.fire({
            title: "Gagal",
            text: "["+error.status+"] Data Gagal Dihapus!",
            icon: "error"
          });
        }
      }
    });
     
  };

  const storeCar = async (values) => {
    try{
      const data = await axios.post(carURL, {
        urutan: values.urut_car
    },{headers: {Authorization: `Bearer ${localStorage.getItem("tokenUser")}`  }});
    try{
      await axios.post(carURL+'/upload', {
        id: data.data.data.id,
        gambar: values.gambar_car.file
        
      },{
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("tokenUser")}` 
        }
      })
      formCar.resetFields();
      setFileListCar([]);
      setSelectedItemCar("");
    }
    catch(error){
      message.error("["+error.status+"] Gambar gagal ditambahkan",3);
    }
    
    Swal.fire({
      title: "Berhasil!",
      text: "Data berhasil ditambahkan!",
      icon: "success"
    });
    getCar();
    
    }
    catch(error){
      Swal.fire({
        title: "Gagal",
        text: "["+error.status+"] Data Gagal Ditambahkan!",
        icon: "error"
      });
    }
    // console.log(values);
  };

  const updateCar = async (values) => {
    try{
      await axios.put(carURL+'/update/'+values.id_car, {
       urutan : values.urut_car
      },{headers: {Authorization: `Bearer ${localStorage.getItem("tokenUser")}`  }})
      try{
        await axios.post(carURL+'/upload', {
          id: values.id_car,
          gambar: values.gambar_car.file
          
        },{
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("tokenUser")}`
          }
        })
      }
      catch(error){
        message.error("["+error.status+"] Gambar gagal diubah",3);
      }
      
     
      Swal.fire({
        title: "Berhasil!",
        text: "Data berhasil diupdate!",
        icon: "success"
      });
      getCar();
    }
    catch(error){
      Swal.fire({
        title: "Gagal",
        text: "["+error.status+"] Data Gagal Diubah!",
        icon: "error"
      });
    }
    
  };

  const renderCellCar = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];
    switch (columnKey) {
      case "urut_car":
        return <p className="text-bold text-sm text-center">{cellValue}</p>;
      case "gambar_car":
        return <img src={cellValue} alt="gambar" className="w-20 h-12" />;
      case "aksi_car":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="Detail">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => openModalCar("view", item)}
              >
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip color="primary" content="Edit">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => openModalCar("edit", item)}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Hapus">
              <span className="text-lg text-danger cursor-pointer active:opacity-50"  onClick={() => deleteCar(item)}>
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return <p className="text-sm text-center">{cellValue}</p>;
    }
  }, []);

  //Penghargaan Kami
  const [modalActionCert, setModalActionCert] = useState(null);
  const [selectedItemCert, setSelectedItemCert] = useState(null);
  const [previewVisibleCert, setPreviewVisibleCert] = useState(false);
  const [previewTitleCert, setPreviewTitleCert] = useState('');
  const [previewImageCert, setPreviewImageCert] = useState("");
  const [fileListCert, setFileListCert] = useState([
    // {
    //   uid: "-1",
    //   name: "image.png",
    //   status: "done",
    //   url: "image/Sertifikat/1.jpg",
    // },
    // {
    //   uid: "-2",
    //   name: "image.png",
    //   status: "done",
    //   url: "image/Sertifikat/2.jpg",
    // },
    // {
    //   uid: "-3",
    //   name: "image.png",
    //   status: "done",
    //   url: "image/Sertifikat/3.jpg",
    // },
    // {
    //   uid: "-4",
    //   name: "image.png",
    //   status: "done",
    //   url: "image/Sertifikat/4.jpg",
    // },
    // {
    //   uid: "-5",
    //   name: "image.png",
    //   status: "done",
    //   url: "image/Sertifikat/5.jpg",
    // },
  ]);
  const { isOpen: isOpenCert, onOpen: onOpenCert, onOpenChange: onOpenChangeCert } = useDisclosure();
  const certURL = URL+'sertifikat';
  let [data_cert, setCert] = useState([]);
  const getCert = async() => {
    try{
      await axios.get(certURL).then((res) => {
        setCert( res.data.data.map(item => ({
          id_cert: item.id,
          urut_cert : item.urutan,
          judul_cert : item.judul,
          gambar_cert : item.gambar,
        })));
      });
    }
    catch(error){
      message.error("["+error.status+"] Gagal Menampilkan List Sertifikat",5);
    }

  }
  const handlePreviewCert = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImageCert(file.url || file.preview);
    setPreviewTitleCert(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    setPreviewVisibleCert(true);
  };

  const handleChangeCert = ({ file:file, fileList: newFileList }) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (isJpgOrPng&&isLt2M) {
      setFileListCert(newFileList);
    }
  }
  const handleCancelPreviewCert = () => setPreviewVisibleCert(false);
  const [formCert] = Form.useForm();

  const openModalCert = (action, item) => {
    setModalActionCert(action);
    formCert.resetFields();
    setFileListCert([]);
    if(action=='add'){
      setSelectedItemCert("");
    }
    if(action=='edit'||action=='view'){
      formCert.setFieldsValue(item);
      setFileListCert([{uid:-1,status: 'done',url:item.gambar_cert}]);
      setPreviewImageCert(item.gambar_cert);
      
    }
    onOpenCert();
  };
  const deleteCert =(item) => {
    Swal.fire({
      title: "Apa Anda Yakin?",
      text: "Data yang terhapus tidak dapat dipulihkan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try{
          await axios.delete(`${certURL}/delete/${item.id_cert}`,{headers: {Authorization: `Bearer ${localStorage.getItem("tokenUser")}`  }});
        getCert()
        Swal.fire({
          title: "Berhasil!",
          text: "Data berhasil dihapus!",
          icon: "success"
        });
        }
        catch(error){
          Swal.fire({
            title: "Gagal",
            text: "["+error.status+"] Data Gagal Dihapus!",
            icon: "error"
          });
        }
      }
    });
     
  };

  const storeCert = async (values) => {
    try{
      const data = await axios.post(certURL, {
        judul: values.judul_cert,
        urutan: values.urut_cert
    },{headers: {Authorization: `Bearer ${localStorage.getItem("tokenUser")}`  }});
    try{
      await axios.post(certURL+'/upload', {
        id: data.data.data.id,
        gambar: values.gambar_cert.file
        
      },{
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("tokenUser")}`
        }
      })
      formCert.resetFields();
      setFileListCert([]);
      setSelectedItemCert("");
    }
    catch(error){
      message.error("["+error.status+"] Gambar gagal ditambahkan",3);
    }
    
    Swal.fire({
      title: "Berhasil!",
      text: "Data berhasil ditambahkan!",
      icon: "success"
    });
    getCert();
    
    }
    catch(error){
      Swal.fire({
        title: "Gagal",
        text: "["+error.status+"] Data Gagal Ditambahkan!",
        icon: "error"
      });
    }
    // console.log(values);
  };

  const updateCert = async (values) => {
    try{
      await axios.put(certURL+'/update/'+values.id_cert, {
        judul: values.judul_cert,
        urutan: values.urut_cert
      },{headers: {Authorization: `Bearer ${localStorage.getItem("tokenUser")}`  }})
      try{
        await axios.post(certURL+'/upload', {
          id: values.urut_cert,
          gambar: values.gambar_cert.file
          
        },{
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("tokenUser")}` 
          }
        })
      }
      catch(error){
        message.error("["+error.status+"] Gambar gagal diubah",3);
      }
      
     
      Swal.fire({
        title: "Berhasil!",
        text: "Data berhasil diupdate!",
        icon: "success"
      });
      getCert();
    }
    catch(error){
      console.log(error)
      Swal.fire({
        title: "Gagal",
        text: "["+error.status+"] Data Gagal Diubah!",
        icon: "error"
      });
    }
    
  };
  const renderCellCert = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];
    switch (columnKey) {
      case "urut_cert":
        return <p className="text-bold text-sm text-center">{cellValue}</p>;
      case "judul_cert":
        return <p className="text-bold text-sm text-center">{cellValue}</p>;
      case "aksi_cert":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="Detail">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => openModalCert("view", item)}
              >
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip color="primary" content="Edit">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => openModalCert("edit", item)}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Hapus">
              <span className="text-lg text-danger cursor-pointer active:opacity-50"  onClick={() => deleteCert(item)}>
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return <p className="text-sm text-center">{cellValue}</p>;
    }
  }, []);
 
  // Separate state for Layanan Kami modal
  const [modalActionLyn, setModalActionLyn] = useState(null);
  const [icon, setIcon] = React.useState("FaUsers");
  const LynURL = URL+'layanan';
  let [data_lyn, setLyn] = useState([]);

  // Separate state for Aplikasi Pelayanan modal
  const [modalActionApp, setModalActionApp] = useState(null);
  const [selectedItemApp, setSelectedItemApp] = useState(null);
  const [fileListApp, setFileListApp] = useState([]);
  const [previewVisibleApp, setPreviewVisibleApp] = useState(false);
  const [previewImageApp, setPreviewImageApp] = useState('');
  const [previewTitleApp, setPreviewTitleApp] = useState('');
  const AppURL = URL+'aplikasi';
  let [data_app, setApp] = useState([]);

  const {
    isOpen: isOpenLyn,
    onOpen: onOpenLyn,
    onOpenChange: onOpenChangeLyn,
  } = useDisclosure();
  
  const {
    isOpen: isOpenApp,
    onOpen: onOpenApp,
    onOpenChange: onOpenChangeApp,
  } = useDisclosure();

  const getLyn = async() => {
    try{
      await axios.get(LynURL).then((res) => {
        setLyn( res.data.data.map(item => ({
          urut_lyn : item.id,
          judul_lyn : item.judul,
          link_lyn : item.link,
          desk_lyn : item.deskripsi,
          icon_lyn : item.icon
        })));
      });
    }
    catch(error){
      message.error("["+error.status+"] Gagal Menampilkan List Layanan",5);
    }

  }
  const getApp = async() => {
    try{
      await axios.get(AppURL).then((res) => {
        setApp( res.data.data.map(item => ({
          urut_app : item.id,
          judul_app : item.judul,
          gambar_app : item.gambar,
          link_app : item.link,
          desk_app : item.deskripsi
        })));
      });
    }
    catch(error){
      message.error("["+error.status+"] Gagal Menampilkan List Aplikasi",5);
    }

  }
  useEffect(() => {
    getLyn(),
    getApp(),
    getCert(),
    getPP(),
    getCar()
  },[]);

  const handlePreviewApp = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImageApp(file.url || file.preview);
    setPreviewTitleApp(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    setPreviewVisibleApp(true);
  };

  const handleChangeApp = ({ file:file, fileList: newFileList }) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (isJpgOrPng&&isLt2M) {
      setFileListApp(newFileList);
    }
  }


  const handleCancelPreviewApp = () => setPreviewVisibleApp(false);
  const [formApp] = Form.useForm();

  const [formLyn] = Form.useForm();

  // Open modal for Layanan Kami
  const openModalLyn = (action, item) => {
    setModalActionLyn(action);
    formLyn.resetFields();
    if(action=='add'){
      setIcon("FaUsers");
    }
    if(action=='edit'||action=='view'){
      formLyn.setFieldsValue(item);

      
    }
    onOpenLyn();
  };

  // Open modal for Aplikasi Pelayanan
  const openModalApp = (action, item) => {
    setModalActionApp(action);
    formApp.resetFields();
    setFileListApp([]);
    if(action=='add'){
      setSelectedItemApp("");
    }
    if(action=='edit'||action=='view'){
      formApp.setFieldsValue(item);
      setFileListApp([{uid:-1,status: 'done',url:item.gambar_app}]);
      setPreviewImageApp(item.gambar_app);
      
    }
    onOpenApp();
  };

  const deleteApp =(item) => {
    Swal.fire({
      title: "Apa Anda Yakin?",
      text: "Data yang terhapus tidak dapat dipulihkan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try{
          await axios.delete(`${AppURL}/delete/${item.urut_app}`,{headers: {Authorization: `Bearer ${localStorage.getItem("tokenUser")}`  }});
        getApp()
        Swal.fire({
          title: "Berhasil!",
          text: "Data berhasil dihapus!",
          icon: "success"
        });
        }
        catch(error){
          Swal.fire({
            title: "Gagal",
            text: "["+error.status+"] Data Gagal Dihapus!",
            icon: "error"
          });
        }
      }
    });
     
  };

  const storeApp = async (values) => {
    try{
      const data = await axios.post(AppURL, {
        judul: values.judul_app,
        link: values.link_app,
        deskripsi: values.desk_app
    },{headers: {Authorization: `Bearer ${localStorage.getItem("tokenUser")}`  }});
    try{
      await axios.post(AppURL+'/upload', {
        id: data.data.data.id,
        gambar: values.gambar_app.file
        
      },{
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("tokenUser")}`
        }
      })
      formApp.resetFields();
      setFileListApp([]);
      setSelectedItemApp("");
    }
    catch(error){
      message.error("["+error.status+"] Gambar gagal ditambahkan",3);
    }
    
    Swal.fire({
      title: "Berhasil!",
      text: "Data berhasil ditambahkan!",
      icon: "success"
    });
    getApp();
    
    }
    catch(error){
      Swal.fire({
        title: "Gagal",
        text: "["+error.status+"] Data Gagal Ditambahkan!",
        icon: "error"
      });
    }
  };

  const updateApp = async (values) => {
    try{
      await axios.put(AppURL+'/update/'+values.urut_app, {
        judul: values.judul_app,
        link: values.link_app,
        deskripsi : values.desk_app
      },{headers: {Authorization: `Bearer ${localStorage.getItem("tokenUser")}`  }})
      try{
        await axios.post(AppURL+'/upload', {
          id: values.urut_app,
          gambar: values.gambar_app.file
          
        },{
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("tokenUser")}`
          }
        })
      }
      catch(error){
        message.error("["+error.status+"] Gambar gagal diubah",3);
      }
      
     
      Swal.fire({
        title: "Berhasil!",
        text: "Data berhasil diupdate!",
        icon: "success"
      });
      getApp();
    }
    catch(error){
      Swal.fire({
        title: "Gagal",
        text: "["+error.status+"] Data Gagal Diubah!",
        icon: "error"
      });
    }
    
  };

  const deleteLyn =(item) => {
    Swal.fire({
      title: "Apa Anda Yakin?",
      text: "Data yang terhapus tidak dapat dipulihkan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try{
          await axios.delete(`${LynURL}/delete/${item.urut_lyn}`,{headers: {Authorization: `Bearer ${localStorage.getItem("tokenUser")}`  }});
        getLyn()
        Swal.fire({
          title: "Berhasil!",
          text: "Data berhasil dihapus!",
          icon: "success"
        });
        }
        catch(error){
          Swal.fire({
            title: "Gagal",
            text: "["+error.status+"] Data Gagal Dihapus!",
            icon: "error"
          });
        }
      }
    });
     
  };

  const storeLyn = async (values) => {
    try{
      const data = await axios.post(LynURL, {
        judul: values.judul_lyn,
        link: values.link_lyn,
        deskripsi: values.desk_lyn,
        icon:values.icon_lyn
    },{headers: {Authorization: `Bearer ${localStorage.getItem("tokenUser")}`  }});
   
    
    Swal.fire({
      title: "Berhasil!",
      text: "Data berhasil ditambahkan!",
      icon: "success"
    });
    getLyn();
    formLyn.resetFields();
    
    }
    catch(error){
      Swal.fire({
        title: "Gagal",
        text: "["+error.status+"] Data Gagal Ditambahkan!",
        icon: "error"
      });
    }
    // console.log(values);
  };

  const updateLyn = async (values) => {
    try{
      await axios.put(LynURL+'/update/'+values.urut_lyn, {
        judul: values.judul_lyn,
        link: values.link_lyn,
        deskripsi: values.desk_lyn,
        icon:values.icon_lyn
      },{headers: {Authorization: `Bearer ${localStorage.getItem("tokenUser")}`  }})
     
     
      Swal.fire({
        title: "Berhasil!",
        text: "Data berhasil diupdate!",
        icon: "success"
      });
      getLyn();
    }
    catch(error){
      Swal.fire({
        title: "Gagal",
        text: "["+error.status+"] Data Gagal Diubah!",
        icon: "error"
      });
    }
    
  };

  const renderCellLyn = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case "judul_lyn":
        return <p className="text-bold text-sm text-center">{cellValue}</p>;
      case "aksi_lyn":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="Detail">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => openModalLyn("view", item)}
              >
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip color="primary" content="Edit">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => openModalLyn("edit", item)}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Hapus">
            <span className="text-lg text-danger cursor-pointer active:opacity-50"  onClick={() => deleteLyn(item)}>
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return <p className="text-sm text-center">{cellValue}</p>;
    }
  }, []);

  const renderCellApp = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case "judul_app":
        return <p className="text-bold text-sm text-center">{cellValue}</p>;
      case "aksi_app":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="Detail">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => openModalApp("view", item)}
              >
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip color="primary" content="Edit">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => openModalApp("edit", item)}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Hapus">
            <span className="text-lg text-danger cursor-pointer active:opacity-50"  onClick={() => deleteApp(item)}>
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return <p className="text-sm text-center">{cellValue}</p>;
    }
  }, []);

  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="bg-grayCustom min-h-screen p-10 mt-0 mx-auto">
        <h6 className="text-sm font-semibold text-pdarkblue">
          Admin > Pahlawan140 > Beranda
        </h6>
        <div className="mt-5 flex flex-col md:flex-row bg-white rounded-2xl p-10 justify-between space-y-5 md:space-y-0">
          <div className="w-full flex justify-center items-center flex-col">
            <h2 className="text-lg font-semibold text-pdarkblue mb-4">
              Galeri Profil Pejabat
            </h2>
            <NextUIButton
              size="sm"
              color="primary"
              onPress={() => openModalPP("add", null)}
            >
              Tambah <PlusOutlined />
            </NextUIButton>

            <Modal
              size="xl"
              backdrop="opaque"
              isOpen={isOpenPP}
              isDismissable={false}
              onOpenChange={onOpenChangePP}
              classNames={{
                backdrop: "transparent",
              }}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col items-center font-semibold text-pdarkblue">
                      {modalActionCert === "view"
                        ? "Detail Pegawai"
                        : "Form Pegawai"}
                    </ModalHeader>
                    <Form form = {formPP} name="basicPP" onFinish={modalActionPP === "add" 
                        ? storePP
                        : updatePP}
                        {...formItemLayout}
                        layout="horizontal"
                        labelAlign="left"
                        style={{ width: "100%" }}
                      >
                    <ModalBody>
                      
                        <Form.Item label="ID" name="id_pp" hidden>
                          <Input
                           placeholder=""
                           disabled
                          />
                        </Form.Item>
                        <Form.Item label="Urutan" name="urut_pp" rules={[{required:true, message: 'Masukkan Urutan'}]}>
                          <Input
                           placeholder="1"
                           type="number"
                           min={0}
                           disabled={modalActionPP === "view"}
                          />
                        </Form.Item>
                        <Form.Item label="Nama" name="nama_pp" rules={[{required:true, message: 'Masukkan Nama'}]}>
                          <Input
                            placeholder="Masukkan Nama"
                            disabled={modalActionPP === "view"}
                          />
                        </Form.Item>
                        <Form.Item label="Jabatan" name="jabatan_pp" rules={[{required:true, message: 'Masukkan Jabatan'}]}>
                          <Input
                            placeholder="Masukkan Jabatan"
                            disabled={modalActionPP === "view"}
                          />
                        </Form.Item>
                        <Form.Item label="Gambar" name="gambar_pp" rules={[{required:true, message: 'Masukkan gambar'}]}>
                          <Upload
                           disabled={modalActionPP === "view"}
                           listType="picture-card"
                           fileList={fileListPP}
                           onPreview={handlePreviewPP}
                           onChange={handleChangePP}
                           onRemove={()=>{
                             setFileListPP([]);
                           }}
                           beforeUpload={beforeUpload} // Prevent automatic upload
                          >
                            {fileListPP.length >= 1 ? null : uploadButton}
                          </Upload>
                        </Form.Item>
                        
                      
                    </ModalBody>
                    <ModalFooter>
                      <NextUIButton
                        color="danger"
                        variant="light"
                        onPress={onClose}
                      >
                        Batal
                      </NextUIButton>
                      {modalActionPP !== "view" && (
                       <AntButton type="primary" htmlType="submit">
                       Simpan
                     </AntButton>
                      )}
                    </ModalFooter>
                    </Form>
                  </>
                )}
              </ModalContent>
            </Modal>

            {/* Preview Modal for Image */}
            <AntModal
              open={previewVisiblePP}
              title={previewTitlePP}
              footer={null}
              MenuProps={{
                disablePortal: true, // <--- HERE
                onClick: e => {
                  e.preventDefault();
                }
              }}
              onCancel={handleCancelPreviewPP}
            >
              <img alt="preview" style={{ width: '100%' }} src={previewImagePP} />
            </AntModal>

            <Table aria-label="Menu table with custom cells" shadow="none">
            <TableHeader columns={columns_pp.slice(1)}>
                {(column_pp) => (
                  <TableColumn key={column_pp.uid} align="center">
                    {column_pp.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={data_pp}>
                {(item) => (
                  <TableRow key={item.urut_pp} className="text-center">
                    {(columnKey) => (
                      <TableCell className="text-center">
                        {renderCellPP(item, columnKey)}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="mt-5 flex flex-col md:flex-row bg-white rounded-2xl p-10 justify-between space-y-5 md:space-y-0">
          <div className="w-full flex justify-center items-center flex-col">
            <h2 className="text-lg font-semibold text-pdarkblue mb-4">
              Galeri Carousel
            </h2>
            <NextUIButton
              size="sm"
              color="primary"
              onPress={() => openModalCar("add", null)}
            >
              Tambah <PlusOutlined />
            </NextUIButton>

            <Modal
              size="xl"
              backdrop="opaque"
              isOpen={isOpenCar}
              isDismissable={false}
              onOpenChange={onOpenChangeCar}
              classNames={{
                backdrop: "transparent",
              }}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col items-center font-semibold text-pdarkblue">
                      {modalActionCar === "view"
                        ? "Detail"
                        : "Form"}
                    </ModalHeader>
                    <Form form = {formCar} name="basicCar" onFinish={modalActionCar === "add" 
                        ? storeCar
                        : updateCar}
                        {...formItemLayout}
                        layout="horizontal"
                        labelAlign="left"
                        style={{ width: "100%" }}
                      >
                    <ModalBody>
                      
                        <Form.Item label="ID" name="id_car" hidden>
                          <Input
                           placeholder=""
                           disabled
                          />
                        </Form.Item>
                        <Form.Item label="Urutan" name="urut_car" rules={[{required:true, message: 'Masukkan Urutan'}]}>
                          <Input
                           placeholder="1"
                           type="number"
                           min={0}
                           disabled={modalActionCar === "view"}
                          />
                        </Form.Item>
                        <Form.Item label="Gambar" name="gambar_car" rules={[{required:true, message: 'Masukkan gambar'}]}>
                          <Upload
                           disabled={modalActionCar === "view"}
                           listType="picture-card"
                           fileList={fileListCar}
                           onPreview={handlePreviewCar}
                           onChange={handleChangeCar}
                           onRemove={()=>{
                             setFileListCar([]);
                           }}
                           beforeUpload={beforeUpload3} // Prevent automatic upload
                          >
                            {fileListCar.length >= 1 ? null : uploadButton}
                          </Upload>
                        </Form.Item>
                        
                      
                    </ModalBody>
                    <ModalFooter>
                      <NextUIButton
                        color="danger"
                        variant="light"
                        onPress={onClose}
                      >
                        Batal
                      </NextUIButton>
                      {modalActionCar !== "view" && (
                       <AntButton type="primary" htmlType="submit">
                       Simpan
                     </AntButton>
                      )}
                    </ModalFooter>
                    </Form>
                  </>
                )}
              </ModalContent>
            </Modal>

            {/* Preview Modal for Image */}
            <AntModal
              open={previewVisibleCar}
              title={previewTitleCar}
              footer={null}
              MenuProps={{
                disablePortal: true, // <--- HERE
                onClick: e => {
                  e.preventDefault();
                }
              }}
              onCancel={handleCancelPreviewCar}
            >
              <img alt="preview" style={{ width: '100%' }} src={previewImageCar} />
            </AntModal>

            <Table aria-label="Menu table with custom cells" shadow="none">
            <TableHeader columns={columns_car.slice(1)}>
                {(column_car) => (
                  <TableColumn key={column_car.uid} align="center">
                    {column_car.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={data_car}>
                {(item) => (
                  <TableRow key={item.urut_car} className="text-center">
                    {(columnKey) => (
                      <TableCell className="text-center">
                        {renderCellCar(item, columnKey)}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="mt-5 flex flex-col md:flex-row bg-white rounded-2xl p-10 justify-between space-y-5 md:space-y-0">
          <div className="w-full flex justify-center items-center flex-col">
            <h2 className="text-lg font-semibold text-pdarkblue mb-4">
              Layanan Kami
            </h2>
            <NextUIButton
              size="sm"
              color="primary"
              onPress={() => openModalLyn("add", null)}
            >
              Tambah <PlusOutlined />
            </NextUIButton>

            {/* Modal for Layanan Kami */}
            <Modal
              size="xl"
              backdrop="opaque"
              isOpen={isOpenLyn} // Use isOpenLyn here
              isDismissable={false}
              onOpenChange={onOpenChangeLyn} // Use onOpenChangeLyn here
              classNames={{
                backdrop: "transparent",
              }}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col items-center font-semibold text-pdarkblue">
                      {modalActionLyn === "view"
                        ? "Detail Layanan Kami"
                        : "Form Layanan Kami"}
                    </ModalHeader>
                    <Form form = {formLyn} name="basicLyn" onFinish={modalActionLyn === "add" 
                        ? storeLyn
                        : updateLyn}
                        {...formItemLayout}
                        layout="horizontal"
                        labelAlign="left"
                        style={{ width: "100%" }}
                      >
                    <ModalBody>
                     
                    <Form.Item label="Id" name="urut_lyn" hidden={modalActionLyn === "add" ? true : false}>
                          <Input
                           placeholder=""
                           type={modalActionLyn === "add" ? 'hidden' : 'text'} 
                           disabled
                          />
                        </Form.Item>
                        <Form.Item label="Icon" name="icon_lyn" rules={[{required:true, message: 'Masukkan Icon'}]}>
                        <IconPicker  />
                        </Form.Item>
                        
                        <Form.Item label="Judul" name="judul_lyn" rules={[{required:true, message: 'Masukkan Judul'}]}>
                          <Input
                            placeholder="Masukkan Judul"
                            disabled={modalActionLyn === "view"}
                          />
                        </Form.Item>
                        <Form.Item label="Deskripsi" name="desk_lyn" rules={[{required:true, message: 'Masukkan Deskripsi'}]}>
                          <Input
                            placeholder="Deskripsi Panjang"
                            disabled={modalActionLyn === "view"}
                          />
                        </Form.Item>
                        <Form.Item label="Link" name="link_lyn" rules={[{required:true, message: 'Masukkan Link'}]}>
                          <Input
                            placeholder="https://www.example.com"
                            disabled={modalActionLyn === "view"}
                          />
                        </Form.Item>
                      
                     
                    </ModalBody>
                    <ModalFooter>
                      <NextUIButton
                        color="danger"
                        variant="light"
                        onPress={onClose}
                      >
                        Batal
                      </NextUIButton>
                      {modalActionLyn !== "view" && (
                       <AntButton type="primary" htmlType="submit">
                       Simpan
                     </AntButton>
                      )}
                    </ModalFooter>
                    </Form>
                  </>
                )}
              </ModalContent>
            </Modal>
            <Table aria-label="Menu table with custom cells" shadow="none">
              <TableHeader columns={columns_lyn.slice(1)}>
                {(column_lyn) => (
                  <TableColumn key={column_lyn.uid} align="center">
                    {column_lyn.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={data_lyn}>
                {(item) => (
                  <TableRow key={item.urut_lyn} className="text-center">
                    {(columnKey) => (
                      <TableCell className="text-center">
                        {renderCellLyn(item, columnKey)}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="mt-5 flex flex-col md:flex-row bg-white rounded-2xl p-10 justify-between space-y-5 md:space-y-0">
          <div className="w-full flex justify-center items-center flex-col">
            <h2 className="text-lg font-semibold text-pdarkblue mb-4">
              Aplikasi Pelayanan
            </h2>
            <NextUIButton
              size="sm"
              color="primary"
              onPress={() => openModalApp("add", null)}
            >
              Tambah <PlusOutlined />
            </NextUIButton>

            {/* Modal for Aplikasi Pelayanan */}
            <Modal
              size="xl"
              backdrop="opaque"
              isOpen={isOpenApp} // Use isOpenApp here
              isDismissable={false}
              onOpenChange={onOpenChangeApp} // Use onOpenChangeApp here
              classNames={{
                backdrop: "transparent",
              }}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col items-center font-semibold text-pdarkblue">
                      {modalActionApp === "view"
                        ? "Detail Aplikasi Pelayanan"
                        : "Form Aplikasi Pelayanan"}
                    </ModalHeader>
                    <Form form = {formApp} name="basicApp" onFinish={modalActionApp === "add" 
                        ? storeApp
                        : updateApp}
                        {...formItemLayout}
                        layout="horizontal"
                        labelAlign="left"
                        style={{ width: "100%" }}
                      >
                    <ModalBody>
                     
                        <Form.Item label="Id" name="urut_app" hidden={modalActionApp === "add" ? true : false}>
                          <Input
                           placeholder=""
                           type={modalActionApp === "add" ? 'hidden' : 'text'} 
                           disabled
                          />
                        </Form.Item>
                        <Form.Item label="Judul" name="judul_app" rules={[{required:true, message: 'Masukkan Judul'}]}>
                          <Input
                            placeholder="Masukkan Judul"
                            disabled={modalActionApp === "view"}
                          />
                        </Form.Item>
                       
                        <Form.Item label="Deskripsi" name="desk_app" rules={[{required:true, message: 'Masukkan Deskripsi'}]}>
                          <Input
                            placeholder="Deskripsi panjang"
                            disabled={modalActionApp === "view"}
                          />
                        </Form.Item>
                        <Form.Item label="Link" name="link_app" rules={[{required:true, message: 'Masukkan Link'}]}>
                          <Input
                            placeholder="https://www.example.com"
                            disabled={modalActionApp === "view"}
                          />
                        </Form.Item>
                        <Form.Item label="Cover" name="gambar_app" rules={[{required:true, message: 'Masukkan cover'}]}>
                          <Upload
                           disabled={modalActionApp === "view"}
                           listType="picture-card"
                           fileList={fileListApp}
                           onPreview={handlePreviewApp}
                           onChange={handleChangeApp}
                           onRemove={()=>{
                             setFileListApp([]);
                           }}
                           beforeUpload={beforeUpload} // Prevent automatic upload
                          >
                            {fileListApp.length >= 1 ? null : uploadButton}
                          </Upload>
                        </Form.Item>
                      
                    </ModalBody>
                    <ModalFooter>
                      <NextUIButton
                        color="danger"
                        variant="light"
                        onPress={onClose}
                      >
                        Batal
                      </NextUIButton>
                      {modalActionApp !== "view" && (
                       <AntButton type="primary" htmlType="submit">
                       Simpan
                     </AntButton>
                      )}
                    </ModalFooter>
                    </Form>
                  </>
                )}
              </ModalContent>
            </Modal>

            <Table aria-label="Menu table with custom cells" shadow="none">
              <TableHeader columns={columns_app.slice(1)}>
                {(column_app) => (
                  <TableColumn key={column_app.uid} align="center">
                    {column_app.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={data_app}>
                {(item) => (
                  <TableRow key={item.urut_app} className="text-center">
                    {(columnKey) => (
                      <TableCell className="text-center">
                        {renderCellApp(item, columnKey)}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="mt-5 flex flex-col md:flex-row bg-white rounded-2xl p-10 justify-between space-y-5 md:space-y-0">
          <div className="w-full flex justify-center items-center flex-col">
            <h2 className="text-lg font-semibold text-pdarkblue mb-4">
              Daftar Penghargaan
            </h2>
            <NextUIButton
              size="sm"
              color="primary"
              onPress={() => openModalCert("add", null)}
            >
              Tambah <PlusOutlined />
            </NextUIButton>

            <Modal
              size="xl"
              backdrop="opaque"
              isOpen={isOpenCert}
              isDismissable={false}
              onOpenChange={onOpenChangeCert}
              classNames={{
                backdrop: "transparent",
              }}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col items-center font-semibold text-pdarkblue">
                      {modalActionCert === "view"
                        ? "Detail Sertifikat"
                        : "Form Sertifikat"}
                    </ModalHeader>
                    <Form form = {formCert} name="basicCert" onFinish={modalActionCert === "add" 
                        ? storeCert
                        : updateCert}
                        {...formItemLayout}
                        layout="horizontal"
                        labelAlign="left"
                        style={{ width: "100%" }}
                      >
                    <ModalBody>
                      
                        <Form.Item label="ID" name="id_cert" hidden>
                          <Input
                           placeholder=""
                           disabled
                          />
                        </Form.Item>
                        <Form.Item label="Urutan" name="urut_cert" rules={[{required:true, message: 'Masukkan Urutan'}]}>
                          <Input
                           placeholder="1"
                           type="number"
                           min={0}
                           disabled={modalActionCert === "view"}
                          />
                        </Form.Item>
                        <Form.Item label="Judul" name="judul_cert" rules={[{required:true, message: 'Masukkan Judul'}]}>
                          <Input
                            placeholder="Masukkan Judul"
                            disabled={modalActionCert === "view"}
                          />
                        </Form.Item>
                        <Form.Item label="Gambar" name="gambar_cert" rules={[{required:true, message: 'Masukkan gambar'}]}>
                          <Upload
                           disabled={modalActionCert === "view"}
                           listType="picture-card"
                           fileList={fileListCert}
                           onPreview={handlePreviewCert}
                           onChange={handleChangeCert}
                           onRemove={()=>{
                             setFileListCert([]);
                           }}
                           beforeUpload={beforeUpload} // Prevent automatic upload
                          >
                            {fileListCert.length >= 1 ? null : uploadButton}
                          </Upload>
                        </Form.Item>
                        
                      
                    </ModalBody>
                    <ModalFooter>
                      <NextUIButton
                        color="danger"
                        variant="light"
                        onPress={onClose}
                      >
                        Batal
                      </NextUIButton>
                      {modalActionCert !== "view" && (
                       <AntButton type="primary" htmlType="submit">
                       Simpan
                     </AntButton>
                      )}
                    </ModalFooter>
                    </Form>
                  </>
                )}
              </ModalContent>
            </Modal>

            {/* Preview Modal for Image */}
            <AntModal
              open={previewVisibleCert}
              title={previewTitleCert}
              footer={null}
              MenuProps={{
                disablePortal: true, // <--- HERE
                onClick: e => {
                  e.preventDefault();
                }
              }}
              onCancel={handleCancelPreviewCert}
            >
              <img alt="preview" style={{ width: '100%' }} src={previewImageCert} />
            </AntModal>

            <Table aria-label="Menu table with custom cells" shadow="none">
              <TableHeader columns={columns_cert.slice(1)}>
                {(column) => (
                  <TableColumn key={column.uid} align="center">
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={data_cert}>
                {(item) => (
                  <TableRow key={item.id_cert} className="text-center">
                    {(columnKey) => (
                      <TableCell className="text-center">
                        {renderCellCert(item, columnKey)}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default BerandaAdmin;
