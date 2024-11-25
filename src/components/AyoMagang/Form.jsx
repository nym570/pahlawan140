import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Button,  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { Form, Button as AntButton, Input, Upload, DatePicker,message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { URL } from '../../config';

const FormM = () => {
  const [formRegist] = Form.useForm();
  const { RangePicker } = DatePicker;
  const [fileList, setFileList] = useState([]);
  const [fileListKTM, setFileListKTM] = useState([]);
  const [fileListProposal, setFileListProposal] = useState([]);
  const magangURL = URL+'magang/';
  useEffect(() => {
    getList()
  }, []);
  const getList = async() => {
    try{
      await axios.get(magangURL+'get',{headers: {Authorization: `Bearer ${localStorage.getItem("tokenMagang")}`  }}).then((res) => {
        formRegist.setFieldsValue(res.data.data);
      });
    }
    catch (error){
      message.error('Data pengguna gagal dimuat');
    }
  }
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
  const submitHandle = async (values) => {
    try{
      await axios.post(magangURL+'daftar', {
        email: values.email,
        nama: values.nama,
        nim: values.nim,
        sekolah: values.sekolah,
        jurusan: values.jurusan,
        nohp: values.nohp,
        mulai: values.tanggal[0].$d,
        selesai:values.tanggal[1].$d,
        status: 'menunggu'
      }, {headers: {Authorization: `Bearer ${localStorage.getItem("tokenMagang")}`  }})
      .then(async(res)=>{
        try{
          await axios.post(magangURL+'upload', {
            rekomendasi: values.rekomendasi.file,
            ktm: values.ktm.file,
            proposal: values.proposal.file,
            id: res.data.data.id
          }, {headers:  {"Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem("tokenMagang")}`  }})
         .then(() => {navigate("/berhasilmagang");})
      }
      catch(error){
        Swal.fire({
          title: "Gagal",
          text: "["+error.status+"] Gagal Menambahkan file!",
          icon: "error"
        });
      }
      })
     
    }
    
    catch (error){
      Swal.fire({
        title: "Gagal",
        text: "["+error.status+"] Gagal Mendaftar!",
        icon: "error"
      });
    }
  }
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();

  const handleConfirm = () => {
    onOpenChange(false); // Close the modal
    navigate("/konfirmasi"); // Redirect to /konfirmasi
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen"
      style={{ backgroundImage: "url('/image/bg.svg')", backgroundSize: "cover" }}
    >
      <div
        className="relative z-10 flex flex-col items-center justify-center w-full max-w-lg p-8 mt-10 bg-white shadow-md rounded-xl md:max-w-xl"
        style={{ marginTop: "120px", marginBottom: "60px" }}
      >
        <div className="flex flex-col items-center mb-8">
          <p className="text-lg font-semibold font-inter md:text-xl">
            Daftar Magang
          </p>
        </div>
         <Form form = {formRegist} name="basic" 
                        labelAlign="left"
                        onFinish={submitHandle}
                        layout="vertical"
                        style={{ width: "100%" }}
                      >
                         <Form.Item className={"font-nunito font-bold md:text-lg"} label="Email Aktif" name="email" rules={[{required:true, message: 'Masukkan Email Aktif'}]}>
                          <Input
                          size="large"
                          type="email"
                          disabled
                          className={
                           "font-normal bg-slate-100 text-base text-black"
                          } 
                            placeholder="Cth: email@gmail.com"
                            allowClear
                          />
                        </Form.Item>
                        <Form.Item className={"font-nunito font-bold md:text-lg"} label="Nama Lengkap" name="nama" rules={[{required:true, message: 'Masukkan Nama Lengkap'}]}>
                          <Input
                          size="large"
                          className={
                           "font-normal bg-slate-100 text-base text-black"
                          } 
                            placeholder="Masukkan Nama Lengkap"
                            allowClear
                          />
                        </Form.Item>
                        <Form.Item className={"font-nunito font-bold md:text-lg"} label="NIP/NIM" name="nim" rules={[{required:true, message: 'Masukkan Nomor Induk Pelajar/Mahasiswa'}]}>
                          <Input
                          size="large"
                          className={
                           "font-normal bg-slate-100 text-base text-black"
                          } 
                            placeholder="Masukkan Nomor Induk Pelajar/Mahasiswa"
                            allowClear
                          />
                        </Form.Item>
                        <Form.Item className={"font-nunito font-bold md:text-lg"} label="Sekolah/Perguruan Tinggi" name="sekolah" rules={[{required:true, message: 'Masukkan Nama Institusi'}]}>
                          <Input
                          size="large"
                          className={
                           "font-normal bg-slate-100 text-base text-black"
                          } 
                            placeholder="Cth: Universitas Muhammadiyah Sidoarjo"
                            allowClear
                          />
                        </Form.Item>
                        <Form.Item className={"font-nunito font-bold md:text-lg"} label="Jurusan/Program Studi" name="jurusan" rules={[{required:true, message: 'Masukkan Jurusan/Prodi'}]}>
                          <Input
                          size="large"
                          className={
                           "font-normal bg-slate-100 text-base text-black"
                          } 
                            placeholder="Cth: S1 Ilmu Hukum"
                            allowClear
                          />
                        </Form.Item>
                       
                        <Form.Item className={"font-nunito font-bold md:text-lg"} label="Nomor Whatsapp" name="nohp" rules={[{required:true, message: 'Masukkan No WA'}]}>
                          <Input
                          size="large"
                          type="tel"
                          className={
                           "font-normal bg-slate-100 text-base text-black"
                          } 
                            placeholder="Cth: 0856xxxx"
                            allowClear
                          />
                        </Form.Item>
                        <Form.Item className={"font-nunito font-bold md:text-lg"}  label="Tanggal Magang" name="tanggal" rules={[{ required: true, message: 'Masukkan Tanggal Mulai dan Tanggal Selesai',},]}
                        >
                          <RangePicker size="large" style={{width:'100%'}}/>
                        </Form.Item>
                     
                        <Form.Item className={"font-nunito font-bold md:text-lg"} label="Unggah Surat Rekomendasi" name="rekomendasi"  rules={[{required:true, message: 'Masukkan Surat Rekomendasi'}]}>
                           <Upload
                            fileList={fileList}
                            onChange={handleChange}
                            onRemove={()=>{
                              setFileList([]);
                            }}
                            beforeUpload={beforeUpload} // Prevent automatic upload
                          >
                            {fileList.length >= 1 ? null : uploadButton}
                          </Upload>
                        </Form.Item>

                        <Form.Item className={"font-nunito font-bold md:text-lg"}  label="Unggah KTM" name="ktm"  rules={[{required:true, message: 'Masukkan KTM/Kartu Pelajar'}]}>
                           <Upload
                            fileList={fileListKTM}
                            onChange={handleChangeKTM}
                            onRemove={()=>{
                              setFileListKTM([]);
                            }}
                            beforeUpload={beforeUpload} // Prevent automatic upload
                          >
                            {fileListKTM.length >= 1 ? null : uploadButton}
                          </Upload>
                        </Form.Item>

                        <Form.Item className={"font-nunito font-bold md:text-lg"}  label="Unggah Proposal" name="proposal" rules={[{required:true, message: 'Masukkan Proposal'}]}>
                           <Upload
                            fileList={fileListProposal}
                            onChange={handleChangeProposal}
                            onRemove={()=>{
                              setFileListProposal([]);
                            }}
                            beforeUpload={beforeUpload} // Prevent automatic upload
                          >
                            {fileListProposal.length >= 1 ? null : uploadButton}
                          </Upload>
                        </Form.Item>

                        <AntButton type="primary" size="large" htmlType="submit"  className="w-full font-bold font-nunito bg-[#0B588F] text-white mt-[5%]">
                          Simpan
                        </AntButton>
                     
                   
                    </Form>
      </div>
      <img
        src="/image/logo_am.png"
        alt="Logo"
        className="absolute bottom-0 right-0 w-30 h-40 m-5"
        style={{ marginRight: '70px' }}
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Konfirmasi</ModalHeader>
              <ModalBody>
                <p>Apakah Anda yakin dengan isian tersebut dan melakukan pendaftaran magang?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Tidak
                </Button>
                <Button color="primary" onPress={handleConfirm}>
                  Yakin
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default FormM;