import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";

const Aduan = () => {
  return (
    <div className="flex flex-col mt-[10%] mb-[5%]">
      <h1 className="text-center header">Pusat Pengaduan Masyarakat</h1>
      <img
        src="/image/aduan.png"
        alt="Pusat Aduan"
        style={{ height: "60%", width: "60%" }}
        className="mx-auto"
      />
      <p className="text-justify sub-header">
        &emsp; &emsp; Halo Sahabat Data, BPS Kabupaten Sidoarjo senantiasa
        selalu menerima kritik dan pengaduan dari anda. Sampaikan kritik dan
        saran sahabat data terkait kinerja mitra kami. Jangan segan untuk
        melaporkan pengaduan atau kritik atas program kerja maupun kinerja
        pegawai kami.
        <b>
          "Mari Bersama membangun BPS Kabupaten Sidoarjo dalam Wilayah Birokrasi
          Bersih Dan Melayani".
        </b>
      </p>
      <br />
      <br />
      <h2 className="text-center header pt-[3%]">Ketentuan Umum</h2>
      <p className="text-justify sub-header text-[#0B588F]">
        "Pengaduan anda akan kami tindaklanjuti jika mengandung bukti-bukti yang
        jelas dan disertai identitas diri yang benar". Anda tidak perlu khawatir
        terungkapnya identitas diri anda karena Layanan Pengaduan akan
        merahasiakan identitas diri anda. Kami sangat menghargai informasi yang
        Anda laporkan. Fokus kami kepada materi informasi yang Anda laporkan.
      </p>
      <ol className="text-left text-[#0B588F] list-decimal pl-5">
        <li>
          Hak Pelapor
          <ul className="list-disc pl-5">
            <li>Perlindungan kerahasiaan identitas</li>
            <li>Memberikan keterangan secara bebas tanpa paksaan</li>
            <li>
              Mendapatkan informasi tahapan laporan pengaduan yang didaftarkan
            </li>
            <li>
              Perlakuan yang sama dan setara dengan terlapor dalam pemeriksaan
            </li>
          </ul>
        </li>
        <li>
          Hak Terlapor
          <ul className="list-disc pl-5">
            <li>
              Dapat mengajukan saksi dan alat bukti lain untuk membuktikan bahwa
              ia tidak bersalah
            </li>
            <li>Meminta Berita Acara Pemeriksaan (BAP) dirinya</li>
          </ul>
        </li>
        <li>
          Hak Pemeriksaan
          <ul className="list-disc pl-5">
            <li>
              Merahasiakan kesimpulan dan hasil rekomendasi Laporan Hasil
              Pemeriksaan
            </li>
            <li>
              Menentukan jangka waktu yang memadai untuk menangani suatu
              pengaduan
            </li>
          </ul>
        </li>
      </ol>
      <br />
      <h2 className="text-center header pt-[3%]">Saluran pengaduan</h2>

      <div className="flex justify-center gap-8 mt-6">
        <Card isFooterBlurred radius="lg" className="border-none">
          <Image
            alt="Pengaduan"
            className="object-cover"
            height={200}
            src="/image/Ad3.png"
            width={150}
          />
          <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] h-fit shadow-small ml-1 z-10">
            <Dropdown
              placement="bottom"
              className="min-w-[140px] font-inter text-pdarkblue"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownTrigger>
                <Button
                  radius="lg"
                  color="#0B588F"
                  className="rounded-xl w-full h-fit font-inter text-white/80 text-tiny"
                >
                  Aduan
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                className="w-35 font-inter font-extralight"
                aria-label="Static Actions"
                variant="flat"
              >
                <DropdownItem
                  as="a"
                  href="http://s.bps.go.id/fedex"
                  target="_blank"
                  rel="noopener noreferrer"
                  key="responden"
                >
                  Responden
                </DropdownItem>
                <DropdownItem
                  as="a"
                  href="http://s.bps.go.id/BPS3515_Pengaduan%20"
                  target="_blank"
                  rel="noopener noreferrer"
                  key="masyarakat"
                >
                  Masyarakat
                </DropdownItem>
                <DropdownItem
                  as="a"
                  href="http://s.bps.go.id/GratifikasiBPS3515"
                  target="_blank"
                  rel="noopener noreferrer"
                  key="mitra-statistik"
                >
                  Mitra Statistik
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </CardFooter>
        </Card>

        <a
          href="https://webapps.bps.go.id/pengaduan/wbs/beranda"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline"
        >
          <Card isFooterBlurred radius="lg" className="border-none">
            <Image
              alt="Whistle Blowing"
              className="object-cover"
              height={200}
              src="/image/Ad2.png"
              width={150}
            />
            <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-tiny text-white/80">Whistle Blowing</p>
            </CardFooter>
          </Card>
        </a>
      </div>
    </div>
  );
};

export default Aduan;
