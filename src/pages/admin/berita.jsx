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

const columns = [
  { name: "Id", uid: "urut_tl" },
  { name: "Judul", uid: "judul_tl" },
  { name: "Aksi", uid: "aksi_tl" },
];



const Berita = () => {
  const [modalActionTL, setModalActionTL] = useState(null);
  const [selectedItemTL, setSelectedItemTL] = useState(null);
  
  const tlURL = URL+'video';
  let [data_tl, setTL] = useState([]);

  const getTL = async() => {
    try{
      await axios.get(tlURL).then((res) => {
        setTL( res.data.data.map(item => ({
          urut_tl : item.id,
          judul_tl : item.judul,
          link_tl : item.link,
        })));
      });
    }
    catch(error){
      message.error("["+error.status+"] Gagal Menampilkan List",5);
    }

  }
  useEffect(() => {
    getTL()
  },[]);

  const {
    isOpen: isOpenTL,
    onOpen: onOpenTL,
    onOpenChange: onOpenChangeTL,
  } = useDisclosure();

  const openModalTL = (action, item) => {
    setModalActionTL(action);
    formTL.resetFields();
    setSelectedItemTL(item);
    if(action=='add'){
      setSelectedItemTL("");
    }
    if(action=='edit'||action=='view'){
      formTL.setFieldsValue(item);
      
    }
    onOpenTL();
  };

  const deleteTL =(item) => {
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
          await axios.delete(`${tlURL}/delete/${item.urut_tl}`,{headers: {Authorization: `Bearer ${localStorage.getItem("tokenUser")}`  }});
        getTL()
        Swal.fire({
          title: "Berhasil!",
          text: "Data berhasil dihapus!",
          icon: "success"
        });
        }
        catch(error){
          console.log(error)
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
      await axios.post(tlURL, {
        judul: values.judul_tl,
        link: values.link_tl,
    },{headers: {Authorization: `Bearer ${localStorage.getItem("tokenUser")}`  }})
   
    Swal.fire({
      title: "Berhasil!",
      text: "Data berhasil ditambahkan!",
      icon: "success"
    });
    formTL.resetFields();
    getTL();
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
       await axios.put(tlURL+'/update/'+values.urut_tl, {
        judul: values.judul_tl,
        link: values.link_tl,

       },{headers: {Authorization: `Bearer ${localStorage.getItem("tokenUser")}`  }})
       Swal.fire({
         title: "Berhasil!",
         text: "Data berhasil diupdate!",
         icon: "success"
       });
       getTL();
    }
    catch(error){
     Swal.fire({
       title: "Gagal",
       text: "["+error.status+"] Data Gagal Diubah!",
       icon: "error"
     });
    } 
   };
   const [formTL] = Form.useForm();
   
  const renderCellTL = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];
    switch (columnKey) {
      case "judul_tl":
        return <p className="text-bold text-sm text-center">{cellValue}</p>;
      case "aksi_tl":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="Detail">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => openModalTL("view", item)}
              >
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip color="primary" content="Edit">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => openModalTL("edit", item)}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Hapus">
              <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => deleteTL(item)}>
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
          Admin > Pahlawan140 > Berita
        </h6>
        <div className="mt-5 flex flex-col md:flex-row bg-white rounded-2xl p-10 justify-between space-y-5 md:space-y-0">
          <div className="w-full flex justify-center items-center flex-col">
            <h2 className="text-lg font-semibold text-pdarkblue mb-4">
              Pengaturan Video Youtube
            </h2>

            <NextUIButton
              size="sm"
              color="primary"
              onPress={() => openModalTL("add", null)} // Open modal to add new item
            >
              Tambah <PlusOutlined />
            </NextUIButton>

            {/* Modal for Teman Luki */}
            <NextUIModal
              size="xl"
              backdrop="opaque"
              isOpen={isOpenTL} // Ensure this controls modal visibility
              isDismissable={false}
              onOpenChange={onOpenChangeTL} // Fix closing behavior
              classNames={{
                backdrop: "transparent",
              }}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col items-center font-semibold text-pdarkblue">
                      {modalActionTL === "view"
                        ? "Detail Video Youtube"
                        : "Form Video Youtube"}
                    </ModalHeader>
                    <Form form = {formTL} name="basic" onFinish={modalActionTL === "add" 
                        ? storeList
                        : updateList}
                        {...formItemLayout}
                        layout="horizontal"
                        labelAlign="left"
                        style={{ width: "100%" }}
                      >
                    <ModalBody>
                      
                        <Form.Item  label="Id" name="urut_tl" hidden={modalActionTL === "add" ? true : false}>
                          <Input
                            placeholder=""
                            type={modalActionTL === "add" ? 'hidden' : 'text'} 
                            disabled
                          />
                        </Form.Item>
                        <Form.Item label="Judul" name="judul_tl" rules={[{required:true, message: 'Masukkan Judul'}]}>
                          <Input
                             placeholder="Masukkan Judul"
                             disabled={modalActionTL === "view"}
                          />
                        </Form.Item>
                        <Form.Item label="Kode Video" name="link_tl" rules={[{required:true, message: 'Masukkan Link'}]}>
                          <Input
                             placeholder="ZywASdmR3JI"
                             disabled={modalActionTL === "view"}
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
                      {modalActionTL !== "view" && (
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
              <TableHeader columns={columns.slice(1)}>
                {(column) => (
                  <TableColumn key={column.uid} align="center">
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={data_tl}>
                {(item) => (
                  <TableRow key={item.urut_tl} className="text-center">
                    {(columnKey) => (
                      <TableCell className="text-center">
                        {renderCellTL(item, columnKey)}
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

export default Berita;
