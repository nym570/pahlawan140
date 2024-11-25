import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AdminLayout from "../layout/AdminLayout";
import { URL } from '../../config';

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Button as NextUIButton,
  Modal as NextUIModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { EditIcon } from "../../components/Icon/EditIcon";
import { DeleteIcon } from "../../components/Icon/DeleteIcon";
import { EyeIcon } from "../../components/Icon/EyeIcon";
import { Form, Select, message, Button as AntButton, Input, Upload, Modal as AntModal } from "antd";
import { PlusOutlined } from "@ant-design/icons";


const columns_seg = [
  { name: "Id", uid: "urut_seg" },
  { name: "Menu", uid: "judul_seg" },
  { name: "Link", uid: "desk_seg" },
  { name: "Aksi", uid: "aksi_seg" },
];

const columns_off = [
  { name: "Id", uid: "urut_off" },
  { name: "SubMenu", uid: "judul_off" },
  { name: "Menu", uid: "cat_off" },
  { name: "Link", uid: "desk_off" },
  { name: "Aksi", uid: "aksi_off" },
];



const Menu = () => {
  const [modalActionSeg, setModalActionSeg] = useState(null);

  const [modalActionOff, setModalActionOff] = useState(null);
  const [selectedItemOff, setSelectedItemOff] = useState(null);


  
  const segURL = URL+'menu';
 let [data_seg, setSeg] = useState([]);

 const offURL =  URL+'submenu';
 let [data_off, setOff] = useState([]);
  
  const getSeg = async() => {
    try{
      await axios.get(segURL).then((res) => {
        setSeg( res.data.data.map(
          item => ({
            urut_seg : item.id,
            judul_seg : item.judul,
            desk_seg : item.link,
          })
        ));
      });
    }
    catch(error){
      message.error("["+error.status+"] Gagal Menampilkan Menu",5);
    }
    

  }
  const getOff = async() => {
    try{
      await axios.get(offURL).then((res) => {
        setOff( res.data.data.map(item => ({
          urut_off : item.id,
          judul_off : item.judul,
          cat_off : item.menus,
          seg_off : item.menu,
          desk_off : item.link,
        })));
      });
    }
    catch(error){
      message.error("["+error.status+"] Gagal Menampilkan Sub Menu",5);
    }

  }
  useEffect(() => {
    getSeg(),
    getOff()
  },[]);
  

  const {
    isOpen: isOpenSeg,
    onOpen: onOpenSeg,
    onOpenChange: onOpenChangeSeg,
  } = useDisclosure();
  const {
    isOpen: isOpenOff,
    onOpen: onOpenOff,

    onOpenChange: onOpenChangeOff,
  } = useDisclosure();

  
  const [formSeg] = Form.useForm();
  const openModalSeg = (action, item) => {
    setModalActionSeg(action);
    formSeg.resetFields();
    if(action=='edit'||action=='view'){
      formSeg.setFieldsValue(item);

    }

    onOpenSeg();
  };

  
const deleteSeg =(item) => {
  Swal.fire({
    title: "Apa Anda Yakin?",
    text: "Seluruh link terkait juga akan ikut terhapus",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, hapus!"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try{
        await axios.delete(`${segURL}/delete/${item.urut_seg}`,{headers: {Authorization: `Bearer ${localStorage.getItem("tokenUser")}`  }});
        getSeg()
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

const deleteOff =(item) => {
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
        await axios.delete(`${offURL}/delete/${item.urut_off}`,{headers: {Authorization: `Bearer ${localStorage.getItem("tokenUser")}`  }});
      getOff()
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
const storeList = async (values) => {
  try{
    await axios.post(segURL, {
      judul: values.judul_seg,
      link: values.desk_seg
  },{headers: {Authorization: `Bearer ${localStorage.getItem("tokenUser")}`  }})
 
  Swal.fire({
    title: "Berhasil!",
    text: "Data berhasil ditambahkan!",
    icon: "success"
  });
  formSeg.resetFields();
  getSeg();
  }
  catch (error){
    Swal.fire({
      title: "Gagal",
      text: "["+error.status+"] Data Gagal Ditambahkan!",
      icon: "error"
    });
  }
 
  
};

const updateList = async (values) => {
 try{
    await axios.put(segURL+'/update/'+values.urut_seg, {
        judul: values.judul_seg,
        link: values.desk_seg
    },{headers: {Authorization: `Bearer ${localStorage.getItem("tokenUser")}`  }})

    Swal.fire({
      title: "Berhasil!",
      text: "Data berhasil diupdate!",
      icon: "success"
    });
    getSeg();
 }
 catch(error){
  Swal.fire({
    title: "Gagal",
    text: "["+error.status+"] Data Gagal Diubah!",
    icon: "error"
  });
 } 
  
  
};
const [formOff] = Form.useForm();

  const openModalOff = (action, item) => {
   
    setModalActionOff(action);
    formOff.resetFields();

    if(action=='add'){
    }
    if(action=='edit'||action=='view'){
      formOff.setFieldsValue(item);

      
    }
   
    onOpenOff();
  };

  const storeLink = async (values) => {
    try{
      await axios.post(offURL, {
        judul: values.judul_off,
        link: values.desk_off,
        menu : values.seg_off

    },{headers: {Authorization: `Bearer ${localStorage.getItem("tokenUser")}`  }})
   
    Swal.fire({
      title: "Berhasil!",
      text: "Data berhasil ditambahkan!",
      icon: "success"
    });
    formOff.resetFields();
    getOff();
    }
    catch (error){
      Swal.fire({
        title: "Gagal",
        text: "["+error.status+"] Data Gagal Ditambahkan!",
        icon: "error"
      });
    }
    
  };
  
  const updateLink = async (values) => {
    try{
      await axios.put(offURL+'/update/'+values.urut_off, {
        judul: values.judul_off,
        link: values.desk_off,
        menu : values.seg_off
      },{headers: {Authorization: `Bearer ${localStorage.getItem("tokenUser")}`  }})
  
      Swal.fire({
        title: "Berhasil!",
        text: "Data berhasil diupdate!",
        icon: "success"
      });
      getOff();
   }
   catch(error){
    Swal.fire({
      title: "Gagal",
      text: "["+error.status+"] Data Gagal Diubah!",
      icon: "error"
    });
   } 
    
  };

  const renderCellSeg = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];
    switch (columnKey) {
      case "judul_seg":
        return <p className="text-bold text-sm text-center">{cellValue}</p>;
      case "desk_seg":
        return <p className="text-bold text-sm text-justify">{cellValue}</p>;
      case "aksi_seg":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="Detail">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => openModalSeg("view", item)}
              >
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip color="primary" content="Edit">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => openModalSeg("edit", item)}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Hapus">

                 <span className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => deleteSeg(item)}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return <p className="text-sm text-center">{cellValue}</p>;
    }
  }, []);

  const renderCellOff = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];
    console.log(cellValue)
    switch (columnKey) {
      case "judul_off":
        return <p className="text-bold text-sm text-center">{cellValue}</p>;
      case "cat_off":
        return <p className="text-bold text-sm text-center">{cellValue.judul}</p>;
        case "desk_off":
          return <p className="text-bold text-sm text-justify">{cellValue}</p>;
      case "aksi_off":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="Detail">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => openModalOff("view", item)}
              >
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip color="primary" content="Edit">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => openModalOff("edit", item)}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Hapus">
            <span className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => deleteOff(item)}
              >
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



  return (
    <AdminLayout>
      <div className="bg-grayCustom min-h-screen p-10 mt-0 mx-auto">
        <h6 className="text-sm font-semibold text-pdarkblue">
          Admin > Pahlawan140 > Menu Tautan
        </h6>
        <div className="mt-5 flex flex-col md:flex-row bg-white rounded-2xl p-10 justify-between space-y-5 md:space-y-0">
          <div className="w-full flex justify-center items-center flex-col">
            <h2 className="text-lg font-semibold text-pdarkblue mb-4">
              Menu Tautan
            </h2>

            <NextUIButton
              size="sm"
              color="primary"
              onPress={() => openModalSeg("add", null)}
            >
              Tambah <PlusOutlined />
            </NextUIButton>

            <NextUIModal
              size="xl"
              backdrop="opaque"
              isOpen={isOpenSeg}
              isDismissable={false}
              onOpenChange={onOpenChangeSeg}
              classNames={{
                backdrop: "transparent",
              }}
            >
              <ModalContent>
                {(onClose) => (
                  
                  <>
                    <ModalHeader className="flex flex-col items-center font-semibold text-pdarkblue">
                      {modalActionSeg === "view"
                        ? "Detail Menu"
                        : "Form Menu"}
                    </ModalHeader>
                    <Form form = {formSeg} name="basic" onFinish={modalActionSeg === "add" 
                        ? storeList
                        : updateList}
                        
                        {...formItemLayout}
                        layout="horizontal"
                        labelAlign="left"
                        style={{ width: "100%" }}
                      >
                    <ModalBody>
                      
                        <Form.Item label="Id" name="urut_seg" hidden={modalActionSeg === "add" ? true : false} >
                          <Input
                            placeholder=""
                            type={modalActionSeg === "add" ? 'hidden' : 'text'} 
                            disabled
                          />
                        </Form.Item>
                        <Form.Item label="Judul" name="judul_seg" rules={[{required:true, message: 'Masukkan Judul'}]}>
                          <Input
                            placeholder="Masukkan Judul"
                            disabled={modalActionSeg === "view"}
                          />
                        </Form.Item>
                        <Form.Item label="Link" name="desk_seg" rules={[{required:true, message: 'Masukkan Link'}]}>
                          <Input
                            placeholder="Masukkan Link"
                            disabled={modalActionSeg === "view"}
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
                      {modalActionSeg !== "view" && (
                        <AntButton type="primary" htmlType="submit">
                          Simpan
                        </AntButton>
                      )}
                    </ModalFooter>
                    </Form>
                  </>
                )}
              </ModalContent>
            </NextUIModal>

            <Table aria-label="Menu table with custom cells" shadow="none">
              <TableHeader columns={columns_seg.slice(1)}>
                {(column) => (
                  <TableColumn key={column.uid} align="center">
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={data_seg}>
                {(item) => (
                  <TableRow key={item.urut_seg} className="text-center">
                    {(columnKey) => (
                      <TableCell className="text-center">
                        {renderCellSeg(item, columnKey)}
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
              Sub Menu Tautan
            </h2>

            <NextUIButton
              size="sm"
              color="primary"
              onPress={() => openModalOff("add", null)}
            >
              Tambah <PlusOutlined />
            </NextUIButton>

            <NextUIModal
              size="xl"
              backdrop="opaque"
              isOpen={isOpenOff}
              isDismissable={false}
              onOpenChange={onOpenChangeOff}
              classNames={{
                backdrop: "transparent",
              }}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col items-center font-semibold text-pdarkblue">
                      {modalActionOff === "view"
                        ? "Detail Submenu"
                        : "Form Submenu"}
                    </ModalHeader>

                    <Form form = {formOff} name="basicoff" onFinish={modalActionOff === "add" 
                        ? storeLink
                        : updateLink}
                        
                        {...formItemLayout}
                        layout="horizontal"
                        labelAlign="left"
                        style={{ width: "100%" }}
                      >
                    <ModalBody>
                      
                    <Form.Item label="Id" name="urut_off" hidden={modalActionOff === "add" ? true : false} >
                          <Input
                            placeholder=""
                            type={modalActionOff === "add" ? 'hidden' : 'text'} 
                            disabled
                          />
                        </Form.Item>
                        
                        <Form.Item label="Judul" name="judul_off" rules={[{required:true, message: 'Masukkan Judul'}]}>
                          <Input
                            placeholder="Masukkan Judul"
                            disabled={modalActionOff === "view"}
                          />
                        </Form.Item>
                       
                        
                        <Form.Item label="Menu" name="seg_off" rules={[{required:true, message: 'Pilih Menu'}]}>
                        <Select
                        
                            placeholder="Pilih Menu"
                            disabled={modalActionOff === "view"}
                            options={data_seg.map((seg) => ({
                              label: seg.judul_seg,
                              value: seg.urut_seg,
                            }))}
                          />

                        </Form.Item>
                        <Form.Item label="Link" name="desk_off" rules={[{required:true, message: 'Masukkan Link'}]}>
                          <Input
                            placeholder="Masukkan Deskripsi"
                            disabled={modalActionOff === "view"}
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
                      {modalActionOff !== "view" && (
                        <AntButton type="primary" htmlType="submit">
                          Simpan
                        </AntButton>
                      )}
                    </ModalFooter>
                    </Form>
                  </>
                )}
              </ModalContent>
            </NextUIModal>

          

            <Table aria-label="Menu table with custom cells" shadow="none">
              <TableHeader columns={columns_off.slice(1)}>
                {(column) => (
                  <TableColumn key={column.uid} align="center">
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={data_off}>
                {(item) => (
                  <TableRow key={item.urut_off} className="text-center">
                    {(columnKey) => (
                      <TableCell className="text-center">
                        {renderCellOff(item, columnKey)}
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
};

export default Menu;
