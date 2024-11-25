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
 

const columns_seg = [
  { name: "Id", uid: "urut_seg" },
  { name: "Nama Segmen", uid: "judul_seg" },
  { name: "Deskripsi", uid: "desk_seg" },
  { name: "Aksi", uid: "aksi_seg" },
];

const columns_off = [
  { name: "Id", uid: "urut_off" },
  { name: "Judul", uid: "judul_off" },
  { name: "Deskripsi", uid: "desk_off" },
  { name: "Segmen", uid: "cat_off" },
  { name: "Cover", uid: "cover_off" },
  { name: "Link", uid: "link_off" },
  { name: "Aksi", uid: "aksi_off" },
];



const MyOff = () => {
  const [modalActionSeg, setModalActionSeg] = useState(null);

  const [modalActionOff, setModalActionOff] = useState(null);
  const [selectedItemOff, setSelectedItemOff] = useState(null);

  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  
  const segURL = URL+'segmen-link';
 let [data_seg, setSeg] = useState([]);

 const offURL =  URL+'link';
 let [data_off, setOff] = useState([]);
  
  const getSeg = async() => {
    try{
      await axios.get(segURL).then((res) => {
        setSeg( res.data.data.map(
          item => ({
            urut_seg : item.id,
            judul_seg : item.judul,
            desk_seg : item.deskripsi,
          })
        ));
      });
    }
    catch(error){
      message.error("["+error.status+"] Gagal Menampilkan Segmen",5);
    }
    

  }
  const getOff = async() => {
    try{
      await axios.get(offURL).then((res) => {
        setOff( res.data.data.map(item => ({
          urut_off : item.id,
          judul_off : item.judul,
          cover_off : item.gambar,
          cat_off : item.catlinks,
          seg_off : item.segmen,
          desk_off : item.deskripsi,
          link_off : item.link
        })));
      });
    }
    catch(error){
      message.error("["+error.status+"] Gagal Menampilkan List",5);
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

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
    setPreviewVisible(true);
  };
  

  const handleChange = ({ file:file, fileList: newFileList }) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (isJpgOrPng&&isLt2M) {
      setFileList(newFileList);
    }
  }
  const handleCancelPreview = () => setPreviewVisible(false);
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
      deskripsi: values.desk_seg
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
        deskripsi: values.desk_seg
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
    setFileList([]);
    if(action=='add'){
    }
    if(action=='edit'||action=='view'){
      formOff.setFieldsValue(item);
      setFileList([{uid:-1,status: 'done',url:item.cover_off}]);
      setPreviewImage(item.cover_off);
      
    }
   
    onOpenOff();
  };

  const storeLink = async (values) => {
    try{
      const data = await axios.post(offURL, {
        judul: values.judul_off,
        deskripsi: values.desk_off,
        segmen: values.seg_off,
        link: values.link_off
    },{headers: {Authorization: `Bearer ${localStorage.getItem("tokenUser")}`  }});
    try{
      await axios.post(offURL+'/upload', {
        id: data.data.data.id,
        gambar: values.cover_off.file
        
      },{
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("tokenUser")}`
        }
      })
      formOff.resetFields();
      setFileList([]);
    }
    catch(error){
      message.error("["+error.status+"] Gambar gagal ditambahkan",3);
    }
    
    Swal.fire({
      title: "Berhasil!",
      text: "Data berhasil ditambahkan!",
      icon: "success"
    });
    getOff();
    
    }
    catch(error){
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
        deskripsi: values.desk_off,
        segmen: values.seg_off,
        link: values.link_off
      },{headers: {Authorization: `Bearer ${localStorage.getItem("tokenUser")}`  }})
      try{
        await axios.post(offURL+'/upload', {
          id: values.urut_off,
          gambar: values.cover_off.file
          
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
    switch (columnKey) {
      case "judul_off":
        return <p className="text-bold text-sm text-center">{cellValue}</p>;
      case "cat_off":
        return <p className="text-bold text-sm text-center">{cellValue.judul}</p>;
      case "cover_off":
        return <img src={cellValue} alt="cover" className="w-20 h-12" />;
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
          Admin > Pahlawan140 > MyOffice
        </h6>
        <div className="mt-5 flex flex-col md:flex-row bg-white rounded-2xl p-10 justify-between space-y-5 md:space-y-0">
          <div className="w-full flex justify-center items-center flex-col">
            <h2 className="text-lg font-semibold text-pdarkblue mb-4">
              Segmen MyOffice
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
                        ? "Detail Segmen MyOffice"
                        : "Form Segmen MyOffice"}
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
                        <Form.Item label="Deskripsi" name="desk_seg" rules={[{required:true, message: 'Masukkan Deskripsi'}]}>
                          <Input
                            placeholder="Masukkan Deskripsi"
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
              Menu MyOffice
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
                        ? "Detail Menu MyOffice"
                        : "Form Menu MyOffice"}
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
                        <Form.Item label="Deskripsi" name="desk_off" rules={[{required:true, message: 'Masukkan Deskripsi'}]}>
                          <Input
                            placeholder="Masukkan Deskripsi"
                            disabled={modalActionOff === "view"}
                          />
                        </Form.Item>
                        
                        <Form.Item label="Segmen" name="seg_off" rules={[{required:true, message: 'Pilih Segmen'}]}>
                        <Select
                        
                            placeholder="Pilih Segmen"
                            disabled={modalActionOff === "view"}
                            options={data_seg.map((seg) => ({
                              label: seg.judul_seg,
                              value: seg.urut_seg,
                            }))}
                          />

                        </Form.Item>
                        <Form.Item label="Link" name="link_off" rules={[{required:true, message: 'Masukkan Link'}]}>
                          <Input
                            placeholder="https://www.example.com"
                            disabled={modalActionOff === "view"}
                          />
                        </Form.Item>
                        <Form.Item label="Cover" name="cover_off" rules={[{required:true, message: 'Masukkan cover'}]}>
                          <Upload
                           disabled={modalActionOff === "view"}
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            onRemove={()=>{
                              setFileList([]);
                            }}
                            beforeUpload={beforeUpload} // Prevent automatic upload
                          >
                            {fileList.length >= 1 ? null : uploadButton}
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

            {/* Preview Modal for Image */}
            <AntModal
              open={previewVisible}
              title={previewTitle}
              MenuProps={{
                disablePortal: true, // <--- HERE
                onClick: e => {
                  e.preventDefault();
                }
              }}
              footer={null}
              onCancel={handleCancelPreview}
            >
              <img alt="preview" style={{ width: "100%" }} src={previewImage} />
            </AntModal>

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

export default MyOff;
