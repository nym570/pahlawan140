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
import { Form, message, Button as AntButton, Input, Upload, Modal as AntModal } from "antd";
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

 
const columns = [
  { name: "Id", uid: "urut_rbc" },
  { name: "Judul", uid: "judul_rbc" },
  { name: "Cover", uid: "gambar_rbc" },
  { name: "Aksi", uid: "aksi_rbc" },
];

// const data_rbc = [
//   {
//     id_rbc: 1,
//     urut_rbc: "1",
//     judul_rbc: "Monev OPD",
//     gambar_rbc: "https://example.com/image1.jpg", 
//   },
//   {
//     id_rbc: 2,
//     urut_rbc: "2",
//     judul_rbc: "Monitoring Sensus dan Survei",
//     gambar_rbc: "https://example.com/image2.jpg", 
//   },
// ];

const RBc = () => {
  const [modalActionRBc, setModalActionRBc] = useState(null);
  const [selectedItemRBc, setSelectedItemRBc] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const { isOpen: isOpenRBc, onOpen: onOpenRBc, onOpenChange: onOpenChangeRBc } = useDisclosure();

  const rbcURL = URL+'baca';
  let [data_rbc, setRBC] = useState([]);

  const getRBc = async() => {
    try{
      await axios.get(rbcURL).then((res) => {
        setRBC( res.data.data.map(item => ({
          urut_rbc : item.id,
          judul_rbc : item.judul,
          gambar_rbc : item.gambar,
          link_rbc : item.link
        })));
      });
    }
    catch(error){
      message.error("["+error.status+"] Gagal Menampilkan List",5);
    }

  }
  useEffect(() => {
    getRBc()
  },[]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
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
  const [formRBc] = Form.useForm();

  const openModalRBc = (action, item) => {
    setModalActionRBc(action);
    formRBc.resetFields();
    setFileList([]);
    if(action=='add'){
      setSelectedItemRBc("");
    }
    if(action=='edit'||action=='view'){
      formRBc.setFieldsValue(item);
      setFileList([{uid:-1,status: 'done',url:item.gambar_rbc}]);
      setPreviewImage(item.gambar_rbc);
      
    }
    onOpenRBc();
  };
  const deleteRBc =(item) => {
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
          await axios.delete(`${rbcURL}/delete/${item.urut_rbc}`,{headers: {Authorization: `Bearer ${localStorage.getItem("tokenUser")}`  }});
        getRBc()
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

  const storeRBc = async (values) => {
    try{
      const data = await axios.post(rbcURL, {
        judul: values.judul_rbc,
        link: values.link_rbc
    },{headers: {Authorization: `Bearer ${localStorage.getItem("tokenUser")}`  }});
    try{
      await axios.post(rbcURL+'/upload', {
        id: data.data.data.id,
        gambar: values.gambar_rbc.file
        
      },{
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("tokenUser")}`
        }
      })
      formRBc.resetFields();
      setFileList([]);
      setSelectedItemRBc("");
    }
    catch(error){
      message.error("["+error.status+"] Gambar gagal ditambahkan",3);
    }
    
    Swal.fire({
      title: "Berhasil!",
      text: "Data berhasil ditambahkan!",
      icon: "success"
    });
    getRBc();
    
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

  const updateRBc = async (values) => {
    try{
      await axios.put(rbcURL+'/update/'+values.urut_rbc, {
        judul: values.judul_rbc,
        link: values.link_rbc
      },{headers: {Authorization: `Bearer ${localStorage.getItem("tokenUser")}`  }})
      try{
        await axios.post(rbcURL+'/upload', {
          id: values.urut_rbc,
          gambar: values.gambar_rbc.file
          
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
      getRBc();
    }
    catch(error){
      Swal.fire({
        title: "Gagal",
        text: "["+error.status+"] Data Gagal Diubah!",
        icon: "error"
      });
    }
    
  };

  const renderCellRBc = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];
    switch (columnKey) {
      case "judul_rbc":
        return <p className="text-bold text-sm text-center">{cellValue}</p>;
      case "gambar_rbc":
        return <img src={cellValue} alt="gambar" className="w-20 h-12" />;
      case "aksi_rbc":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="Detail">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => openModalRBc("view", item)}
              >
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip color="primary" content="Edit">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => openModalRBc("edit", item)}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Hapus">
              <span className="text-lg text-danger cursor-pointer active:opacity-50"  onClick={() => deleteRBc(item)}>
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
          Admin > Pahlawan140 > Ruang Baca
        </h6>
        <div className="mt-5 flex flex-col md:flex-row bg-white rounded-2xl p-10 justify-between space-y-5 md:space-y-0">
          <div className="w-full flex justify-center items-center flex-col">
            <h2 className="text-lg font-semibold text-pdarkblue mb-4">
              Pengaturan Ruang Baca
            </h2>

            <NextUIButton
              size="sm"
              color="primary"
              onPress={() => openModalRBc("add", null)}
            >
              Tambah <PlusOutlined />
            </NextUIButton>

            <NextUIModal
              size="xl"
              backdrop="opaque"
              isOpen={isOpenRBc}
              isDismissable={false}
              onOpenChange={onOpenChangeRBc}
              classNames={{
                backdrop: "transparent",
              }}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col items-center font-semibold text-pdarkblue">
                      {modalActionRBc === "view"
                        ? "Detail Ruang Baca"
                        : "Form Ruang Baca"}
                    </ModalHeader>
                    <Form form = {formRBc} name="basic" onFinish={modalActionRBc === "add" 
                        ? storeRBc
                        : updateRBc}
                        {...formItemLayout}
                        layout="horizontal"
                        labelAlign="left"
                        style={{ width: "100%" }}
                      >
                    <ModalBody>
                      
                        <Form.Item label="Id" name="urut_rbc" hidden={modalActionRBc === "add" ? true : false}>
                          <Input
                           placeholder=""
                           type={modalActionRBc === "add" ? 'hidden' : 'text'} 
                           disabled
                          />
                        </Form.Item>
                        <Form.Item label="Judul" name="judul_rbc" rules={[{required:true, message: 'Masukkan Judul'}]}>
                          <Input
                            placeholder="Masukkan Judul"
                            disabled={modalActionRBc === "view"}
                          />
                        </Form.Item>
                        <Form.Item label="Link" name="link_rbc" rules={[{required:true, message: 'Masukkan Link'}]}>
                          <Input
                            placeholder="https://www.example.com"
                            disabled={modalActionRBc === "view"}
                          />
                        </Form.Item>
                        <Form.Item label="Cover" name="gambar_rbc" rules={[{required:true, message: 'Masukkan cover'}]}>
                          <Upload
                           disabled={modalActionRBc === "view"}
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
                      {modalActionRBc !== "view" && (
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
              footer={null}
              MenuProps={{
                disablePortal: true, // <--- HERE
                onClick: e => {
                  e.preventDefault();
                }
              }}
              onCancel={handleCancelPreview}
            >
              <img alt="preview" style={{ width: '100%' }} src={previewImage} />
            </AntModal>

            <Table aria-label="Menu table with custom cells" shadow="none">
              <TableHeader columns={columns.slice(1)}>
                {(column) => (
                  <TableColumn key={column.uid} align="center">
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={data_rbc}>
                {(item) => (
                  <TableRow key={item.urut_rbc} className="text-center">
                    {(columnKey) => (
                      <TableCell className="text-center">
                        {renderCellRBc(item, columnKey)}
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

export default RBc;
