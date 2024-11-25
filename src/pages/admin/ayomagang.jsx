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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Chip,
} from "@nextui-org/react";
import { EditIcon } from "../../components/Icon/EditIcon";
import { DeleteIcon } from "../../components/Icon/DeleteIcon";
import { EyeIcon } from "../../components/Icon/EyeIcon";
import { StatusIcon } from "../../components/Icon/StatusIcon";
import { Form, Select, message, Button as AntButton, Input, Upload, Card, Col, Row, Statistic, Modal as AntModal } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const { RangePicker } = DatePicker;
const dateFormat = "DD/MM/YYYY";
const weekFormat = "DD/MM";

/** Manually entering any of the following formats will perform date parsing */
const dateFormatList = ["DD-MM-YYYY"];
const customFormat = (value) => ` ${dayjs(value).format(dateFormat)}`;
const customWeekStartEndFormat = (value) =>
  `${dayjs(value).startOf("week").format(weekFormat)} ~ ${dayjs(value)
    .endOf("week")
    .format(weekFormat)}`;




const columns = [
  { name: "No", uid: "id_am" },
  { name: "Nama", uid: "nama_am" },
  { name: "Perguruan Tinggi", uid: "pt_am" },
  { name: "Program Studi", uid: "prodi_am" },
  { name: "Mulai", uid: "mulai_am" },
  { name: "Selesai", uid: "selesai_am" },
  { name: "Status", uid: "status_am" },
  { name: "Aksi", uid: "aksi_am" }, // Add action column
];

const statusColorMap = {
  aktif: "success",
  diterima: "secondary",
  menunggu: "warning",
  ditolak: "danger",
  selesai: "dark"
};

// const data_am = [
//   {
//     id_am: 1,
//     nama_am: "Rahadian Eka Pambayun",
//     pt_am: "Universitas Trunojoyo Madura",
//     prodi_am: "Statistika",
//     status_am: "Diterima",
//   },
//   {
//     id_am: 2,
//     nama_am: "Ilzamuddin Armain",
//     pt_am: "Universitas Arilangga",
//     prodi_am: "Fisika",
//     status_am: "Menunggu",
//   },
//   {
//     id_am: 3,
//     nama_am: "Ayfa Hamda",
//     pt_am: "Univesitas Brawijaya",
//     prodi_am: "Teknik Mesin",
//     status_am: "Menunggu",
//   },
//   {
//     id_am: 4,
//     nama_am: "Ryan Abdullah",
//     pt_am: "Univesitas NU Sidoarjo",
//     prodi_am: "Sastra Indonesia",
//     status_am: "Ditolak",
//   },
//   {
//     id_am: 5,
//     nama_am: "Rahmad Sinaga",
//     pt_am: "Univesitas Muhammadiyah Sidoarjo",
//     prodi_am: "Informatika",
//     status_am: "Diterima",
//   },
// ];

const AyoMg = () => {
  const [modalActionAM, setModalActionAM] = useState(null);
  const [selectedItemAM, setSelectedItemAM] = useState(null);
  const [fileList, setFileList] = useState([]); // For upload file management
  const [fileListKTM, setFileListKTM] = useState([]);
  const [fileListProposal, setFileListProposal] = useState([]);
  const [list, setList] = useState([]);
  const [sum, setSum] = useState(0);
  const getList = async() => {
    try{
      await axios.get(URL+'magang/count').then((res) => {
        setList(res.data.data);
        let sum = res.data.data.reduce(function(prev, current) {
          return prev + +current.statusCount
        }, 0);
        setSum(sum);
        
      });
      
    }
    catch (error){
      message.error("["+error.status+"] Gagal Menampilkan Peritungan Magang",5);
    }
  }

  const {
    isOpen: isOpenAM,
    onOpen: onOpenAM,
    onOpenChange: onOpenChangeAM,
  } = useDisclosure();

  const {
    isOpen: isOpenStat,
    onOpen: onOpenStat,
    onOpenChange: onOpenChangeStat,
  } = useDisclosure();

  const [formReg] = Form.useForm();
  const [formStat] = Form.useForm();

  const openModalAM = (action, item) => {
    setModalActionAM(action);
    setSelectedItemAM(item);
      formReg.setFieldsValue(item);
      if(item.rekomendasi_am){
        setFileList([{uid:-1,name:"rekomendasi "+item.nim_am,status: 'done',url:item.rekomendasi_am}]);
      }
      if(item.ktm_am){
        setFileListKTM([{uid:-1,name:"ktm "+item.nim_am,status: 'done',url:item.ktm_am}]);
      }
     if(item.proposal_am){
      setFileListProposal([{uid:-1,name:"proposal "+item.nim_am,status: 'done',url:item.proposal_am}]);
     }
      
      

    onOpenAM();
  };

  const openModalStat = (item) => {
      formStat.setFieldsValue(item);
    onOpenStat();
  };

  const amURL = URL+'magang';
  let [data_am, setAM] = useState([]);


  const handleChange = ({ file:file, fileList: newFileList }) => {
    const isLt5M = file.size / 1024 / 1024 < 5;
    const isPDF = file.type === 'application/pdf';
    if (isLt5M&&isPDF) {
      setFileList(newFileList);
    }
  }

  const handleChangeKTM = ({ file:file, fileList: newFileList }) => {
    const isLt5M = file.size / 1024 / 1024 < 5;
    const isPDF = file.type === 'application/pdf';
    if (isLt5M&&isPDF) {
      setFileListKTM(newFileList);
    }
  }

  const handleChangeProposal = ({ file:file, fileList: newFileList }) => {
    const isLt5M = file.size / 1024 / 1024 < 5;
    const isPDF = file.type === 'application/pdf';
    if (isLt5M&&isPDF) {
      setFileListProposal(newFileList);
    }
  }

  const beforeUpload = (file) => {
    const isLt5M = file.size / 1024 / 1024 < 5;
    const isPDF = file.type === 'application/pdf';
    if (!isPDF) {
      message.error('File harus berupa pdf');
    }
    if (!isLt5M) {
      message.error('File harus lebih kecil dari 5MB');
    }
    return false;
  };
  const uploadButton = (
    <p className="bg-slate-100 py-3 px-5 rounded-box cursor-pointer font-bold border" > <UploadOutlined />     Upload Dokumen</p>
  );

  const getAM = async() => {
    try{
      await axios.get(amURL,{headers: {Authorization: `Bearer ${localStorage.getItem("tokenUser")}`  }}).then((res) => {
        setAM( res.data.data.map(
          item => ({
            id_am : item.id,
            akun_am : item.akun,
            nama_am : item.magangaccs.nama,
            pt_am : item.magangaccs.sekolah,
            prodi_am : item.magangaccs.jurusan,
            email_am : item.magangaccs.email,
            telp_am : item.magangaccs.nohp,
            rekomendasi_am : item.rekomendasi,
            ktm_am : item.ktm,
            proposal_am : item.proposal,
            nim_am: item.magangaccs.nim,
            mulai_am : customFormat(item.mulai),
            selesai_am : customFormat(item.selesai),
            status_am: item.status,
            tanggal_am: [dayjs(item.mulai),dayjs(item.selesai)]
          })
        ));
      });
      
    }
    catch(error){
      message.error("["+error.status+"] Gagal Menampilkan List Magang",5);
    }
    

  }

  useEffect(() => {
    getAM(),
    getList()
  },[]);

  const deleteAM =(item) => {
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
          await axios.delete(`${amURL}/delete/${item.id_am}`,{headers: {Authorization: `Bearer ${localStorage.getItem("tokenUser")}`  }});
        getAM();
        getList();
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
  
  const updateAM = async (values) => {
   
    try{
      await axios.put(amURL+'/update/'+values.id_am, {
        akun:values.akun_am,
        nama: values.nama_am,
        nim : values.nim_am,
        sekolah: values.pt_am,
        jurusan: values.prodi_am,
        nohp: values.telp_am,
        status: values.status_am,
        mulai: values.tanggal_am[0].$d,
        selesai: values.tanggal_am[1].$d,
      },{headers: {Authorization: `Bearer ${localStorage.getItem("tokenUser")}`  }})
      try{
        await axios.post(amURL+'/upload', {
          id: values.id_am,
          rekomendasi: values.rekomendasi_am.file,
          ktm: values.ktm_am.file,
          proposal: values.proposal_am.file
        },{
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("tokenUser")}`
          }
        })
      }
      catch(error){
        message.error("["+error.status+"] Dokumen gagal diubah",3);
      }
      
     
      Swal.fire({
        title: "Berhasil!",
        text: "Data berhasil diupdate!",
        icon: "success"
      });
      getAM();
    }
    catch(error){
      Swal.fire({
        title: "Gagal",
        text: "["+error.status+"] Data Gagal Diubah!",
        icon: "error"
      });
    }
    
  };

  const statusAM = async (values) => {
    try{
      await axios.put(amURL+'/status/'+values.id_am, {
        status: values.status_am,
        nama: values.nama_am,
        mulai: values.mulai_am,
        email: values.email_am
      },{headers: {Authorization: `Bearer ${localStorage.getItem("tokenUser")}`  }})

      Swal.fire({
        title: "Berhasil!",
        text: "Status berhasil diupdate!",
        icon: "success"
      });
      getAM();
      getList();
    }
    catch(error){
      Swal.fire({
        title: "Gagal",
        text: "["+error.status+"] Status gagal Diubah!",
        icon: "error"
      });
    }
    
  };

  const renderCellAM = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];
    switch (columnKey) {
      case "nama_am":
        return <p className="text-bold text-sm text-center">{cellValue}</p>;
      case "pt_am":
        return <p className="text-bold text-sm text-center">{cellValue}</p>;
      case "prodi_am":
        return <p className="text-bold text-sm text-center">{cellValue}</p>;
      case "mulai_am":
        return <p className="text-bold text-sm text-center">{cellValue}</p>;
      case "selesai_am":
        return <p className="text-bold text-sm text-center">{cellValue}</p>;
      case "status_am":
        return (
          <Chip
            className="capitalize text-center"
            color={statusColorMap[cellValue]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "aksi_am":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="Detail">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => openModalAM("view", item)}
              >
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip color="primary" content="Edit">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => openModalAM("edit", item)}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="warning" content="Status">
              <span
                className="text-lg text-warning cursor-pointer active:opacity-50"
                onClick={() => openModalStat(item)}
              >
                <StatusIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Hapus">
              <span className="text-lg text-danger cursor-pointer active:opacity-50"  onClick={() => deleteAM(item)}>
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return <p className="text-sm text-center">{cellValue}</p>;
    }
  }, []);


  return (
    <AdminLayout>
      <div className="bg-grayCustom min-h-screen p-10 mt-0 mx-auto">
        <h6 className="text-sm font-semibold text-pdarkblue mb-5">
          Admin > AyoMagang
        </h6>
        <Row className="w-full" gutter={[16,24]}>
    <Col span={12} md={{ span: 6}}>
      <Card bordered={false}>
        <Statistic
          title="Pendaftar"
          value={sum}
          
        />
      </Card>
    </Col>
    <Col span={12} md={{ span: 6}}>
      <Card bordered={false}>
        <Statistic
          title="Menunggu"
          value={list.find(({ status }) => status === "menunggu")?list.find(({ status }) => status === "menunggu").statusCount:0}
          valueStyle={{
            color: '#cf1322',
          }}
          
        />
      </Card>
    </Col>
    <Col span={12} md={{ span: 6}}>
      <Card bordered={false}>
        <Statistic
          title="Aktif"
          value={list.find(({ status }) => status === "aktif")?list.find(({ status }) => status === "aktif").statusCount:0}
          valueStyle={{
            color: '#3f8600',
          }}
          
        />
      </Card>
    </Col>
    
    <Col span={12} md={{ span: 6}}>
      <Card bordered={false}>
        <Statistic
          title="Diterima"
          value={list.find(({ status }) => status === "diterima")?list.find(({ status }) => status === "diterima").statusCount:0}
          valueStyle={{
            color: '#3f8600',
          }}
          
        />
      </Card>
    </Col>
    
  </Row>
        <div className="mt-5 flex flex-col md:flex-row bg-white rounded-2xl p-10 justify-between space-y-5 md:space-y-0">
        
          <div className="w-full flex justify-center items-center flex-col">
          
          
            <h2 className="text-lg font-semibold text-pdarkblue mb-4">
              Daftar Peserta Magang
            </h2>
            <Modal
              size="m"
              backdrop="opaque"
              isOpen={isOpenStat}
              isDismissable={false}
              onOpenChange={onOpenChangeStat}
              classNames={{
                backdrop: "transparent",
              }}
            >
              <ModalContent>
                {(onClose) => (
                  
                  <>
                    <ModalHeader className="flex flex-col items-center font-semibold text-pdarkblue">
                      {"Ubah Status Magang"}
                    </ModalHeader>
                    <Form form = {formStat} name="stat" onFinish={statusAM}
                        layout="horizontal"
                        labelAlign="left"
                        style={{ width: "100%" }}
                      >
                    <ModalBody>
                      
                    <Form.Item label="Id" name="id_am" hidden={true} style={{ marginBottom: "20px" }}>
                          <Input
                            placeholder=""
                            type="hidden"
                            disabled
                          />
                        </Form.Item>
                        <Form.Item label="mulai" name="mulai_am" hidden={true} style={{ marginBottom: "20px" }}>
                          <Input
                            placeholder=""
                            type="hidden"
                            disabled
                          />
                        </Form.Item>
                        <Form.Item style={{ flex: 1, marginBottom: 0 }} name="nama_am" hidden={true}>
                              <Input
                                placeholder=""
                                 type="hidden"
                                disabled
                              />
                            </Form.Item>
                        <Form.Item style={{ flex: 1, marginBottom: 0 }} name="email_am" hidden={true}>
                              <Input
                                placeholder=""
                                 type="hidden"
                                disabled
                              />
                            </Form.Item>
                         {/* 'Status' Field */}
                         <Form.Item
                          label="Status"
                          style={{ marginBottom: "20px" }}
                          rules={[{required:true, message: 'Pilih Status'}]}
                          name="status_am"
                        >
                          <Select
                            disabled={modalActionAM === "view"}
                            options={[
                              {
                                label: (
                                  <span
                                    className={`text-${statusColorMap["menunggu"]} bg-${statusColorMap["menunggu"]}-100 p-1 rounded`}
                                  >
                                    Menunggu
                                  </span>
                                ),
                                value: "menunggu",
                                disabled: true,
                              },
                              {
                                label: (
                                  <span
                                    className={`text-${statusColorMap["ditolak"]} bg-${statusColorMap["ditolak"]}-100 p-1 rounded`}
                                  >
                                    Ditolak
                                  </span>
                                ),
                                value: "ditolak",
                              },
                              {
                                label: (
                                  <span
                                    className={`text-${statusColorMap["diterima"]} bg-${statusColorMap["diterima"]}-100 p-1 rounded`}
                                  >
                                    Diterima
                                  </span>
                                ),
                                value: "diterima",
                              },
                              {
                                label: (
                                  <span
                                    className={`text-${statusColorMap["aktif"]} bg-${statusColorMap["aktif"]}-100 p-1 rounded`}
                                  >
                                    Aktif
                                  </span>
                                ),
                                value: "aktif",
                              },
                              {
                                label: (
                                  <span
                                    className={`text-${statusColorMap["selesai"]} bg-${statusColorMap["selesai"]}-100 p-1 rounded`}
                                  >
                                    Selesai
                                  </span>
                                ),
                                value: "selesai",
                              },
                            ]}
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
                     
                        <AntButton type="primary" htmlType="submit">
                          Simpan
                        </AntButton>
                      
                    </ModalFooter>
                    </Form>
                  </>
                )}
              </ModalContent>
            </Modal>

            <Modal
              size="3xl"
              backdrop="opaque"
              isOpen={isOpenAM}
              isDismissable={false}
              onOpenChange={onOpenChangeAM}
              classNames={{
                backdrop: "transparent",
              }}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col items-center font-semibold text-pdarkblue">
                      {modalActionAM === "view"
                        ? "Detail Identitas Peserta Magang"
                        : "Form Identitas Peserta Magang"}
                    </ModalHeader>
                    <Form
                    form={formReg}
                        layout="horizontal"
                        labelAlign="left"
                        style={{ width: "100%" }}
                        labelCol={{ span: 5 }} // Lebar label
                        wrapperCol={{ span: 20 }} // Lebar input field
                        onFinish={updateAM}
                      >
                    <ModalBody>
                     
                        {/* 'No' Field */}
                        <Form.Item label="Id" name="akun_am" hidden={true} style={{ marginBottom: "20px" }}>
                          <Input
                            placeholder=""
                            type="hidden"
                            disabled
                          />
                        </Form.Item>
                        <Form.Item label="Id" name="id_am" hidden={true} style={{ marginBottom: "20px" }}>
                          <Input
                            placeholder=""
                            type="hidden"
                            disabled
                          />
                        </Form.Item>

                        {/* 'Nama' Field */}
                        <Form.Item
                          label="Nama"
                          style={{ marginBottom: "20px" }}
                          name="nama_am" rules={[{required:true, message: 'Masukkan Nama'}]}
                        >
                          <Input
                            placeholder=""
                            disabled={modalActionAM === "view"}
                          />
                        </Form.Item>

                        <Form.Item
                          label="NIM"
                          style={{ marginBottom: "20px" }}
                          name="nim_am" rules={[{required:true, message: 'Masukkan NIM'}]}
                        >
                          <Input
                            placeholder=""
                            disabled={modalActionAM === "view"}
                          />
                        </Form.Item>

                        {/* 'Perguruan Tinggi' Field */}
                        <Form.Item
                          label="Perguruan Tinggi"
                          style={{ marginBottom: "20px" }}
                          name="pt_am" rules={[{required:true, message: 'Masukkan Nama'}]}
                        >
                          <Input
                            placeholder=""
                            disabled={modalActionAM === "view"}
                          />
                        </Form.Item>

                        {/* 'Program Studi' Field */}
                        <Form.Item
                          label="Jurusan"
                          style={{ marginBottom: "20px" }}
                          name="prodi_am" rules={[{required:true, message: 'Masukkan Jurusan'}]}
                        >
                          <Input
                            placeholder=""
                            disabled={modalActionAM === "view"}
                          />
                        </Form.Item>

                        {/* Email & Telp in the same row */}
                        <Form.Item
                          label="Email"
                          style={{ marginBottom: "20px" }}
                        >
                          <div style={{ display: "flex", gap: "16px" }}>
                            <Form.Item style={{ flex: 1, marginBottom: 0 }} name="email_am" rules={[{required:true, message: 'Masukkan Email'}]}>
                              <Input
                                placeholder=""
                                disabled
                              />
                            </Form.Item>
                            <Form.Item
                              label="Telp"
                              style={{ flex: 1, marginBottom: 0 }}
                              name="telp_am" rules={[{required:true, message: 'Masukkan No Whatsapp'}]}
                            >
                              <Input
                                placeholder=""
                                disabled={modalActionAM === "view"}
                              />
                            </Form.Item>
                          </div>
                        </Form.Item>

                        {/* Periode Waktu */}
                        <Form.Item
                          label="Periode Waktu"
                          style={{ marginBottom: "20px" }}
                          name="tanggal_am" rules={[{required:true, message: 'Masukkan Periode Waktu'}]}
                        >
                          
                            <RangePicker
                            
                              format={dateFormat}
                              style={{ width: "100%" }}
                              disabled={modalActionAM === "view"}
                            />
                         
                        </Form.Item>

                       

                        {/* 'Dokumen Terlampir' Field */}
                        <Form.Item
                          label="Surat Rekomendasi"
                          name="rekomendasi_am"
                          style={{ marginBottom: "20px" }}
                          rules={[{required:true, message: 'Masukkan surat rekomendasi'}]}
                        >
                          <Upload 
                          disabled={modalActionAM === "view"}
                          fileList={fileList}
                          onChange={handleChange}
                          beforeUpload={beforeUpload}
                          onRemove={()=>{
                            setFileList([]);
                          }}

                         
                          >
                          {fileList.length >= 1 ? null : uploadButton}
                          </Upload>
                        </Form.Item>

                        <Form.Item
                          label="KTM"
                          name="ktm_am"
                          style={{ marginBottom: "20px" }}
                          rules={[{required:true, message: 'Masukkan dokumen'}]}
                        >
                          <Upload 
                          disabled={modalActionAM === "view"}
                          fileList={fileListKTM}
                          onChange={handleChangeKTM}
                          beforeUpload={beforeUpload}
                          onRemove={()=>{
                            setFileListKTM([]);
                          }}

                         
                          >
                          {fileListKTM.length >= 1 ? null : uploadButton}
                          </Upload>
                        </Form.Item>
                        <Form.Item
                        disabled={modalActionAM === "view"}
                          label="Proposal"
                          name="proposal_am"
                          style={{ marginBottom: "20px" }}
                          rules={[{required:true, message: 'Masukkan proposal'}]}
                        >
                          <Upload 
                          fileList={fileListProposal}
                          onChange={handleChangeProposal}
                          beforeUpload={beforeUpload}
                          onRemove={()=>{
                            setFileListProposal([]);
                          }}

                         
                          >
                          {fileListProposal.length >= 1 ? null : uploadButton}
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
                      {modalActionAM !== "view" && (
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

            {/* Table */}
            <Table aria-label="Menu table with custom cells" shadow="none">
              <TableHeader columns={columns.slice(1)}>
                {(column) => (
                  <TableColumn key={column.uid} className="text-center">
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={data_am}>
                {(item) => (
                  <TableRow key={item.id_am} className="text-center">
                    {(columnKey) => (
                      <TableCell className="text-center">
                        {renderCellAM(item, columnKey)}
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

export default AyoMg;
