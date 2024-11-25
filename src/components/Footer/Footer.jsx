import React from "react";
import FooterTitle from "./FooterTittle";
import FooterList from "./FooterList";
import {
  YouTube,
  Instagram,
  Facebook,
  Twitter,
  Room,
  Email,
  X,
  FacebookOutlined,
  FacebookRounded,
  FacebookSharp,
  FacebookTwoTone,
  Call,
} from "@mui/icons-material";

const medSos = [
  {
    icon: FacebookOutlined,
    href: "https://id-id.facebook.com/statistik.sidoarjo/",
    text: "statistik.sidoarjo",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/bps.sidoarjo/",
    text: "@bps.sidoarjo",
  },
  {
    icon: X,
    href: "https://x.com/bpskabsidoarjo",
    text: "@bpskabsidoarjo",
  },
];

const contacts = [
  {
    icon: Room,
    href: "https://maps.app.goo.gl/4dMALXhFKqJ952D78/",
    text: "Jl. Pahlawan No 140 Sidoarjo",
  },
  {
    icon: Call,
    href: "https://api.whatsapp.com/send?phone=6285890003515",
    text: "085890003515",
  },
  {
    icon: Email,
    href: "mailto:bps3515@bps.go.id",
    text: "bps3515@bps.go.id",
  },
];

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative p-5 overflow-hidden bg-base text-pdarkblue  md:flex-around md:flex-row md:items-center md:p-0"
    >
     <div class="py-1 px-5 md:px-20 bg-pdarkblue">
     
        </div>
      <div className="relative flex flex-col p-5 mt-2 overflow-hidden bg-base text-pdarkblue md:flex-around md:flex-row">
      <div className="flex flex-col items-center justify-center mb-5 md:w-4/12 md:my-0">
        <a
          href="https://sidoarjokab.bps.go.id/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex items-center cursor-pointer">
            <img alt="logo" src="/image/logo.png" width={120} height={120} />

            {/* Divider here */}
            <div className="w-[6px] rounded-full h-24 bg-pdarkblue mx-4"></div>

            <p className="block text-lg">
              <b>BPS</b> <span className="block">Kabupaten</span>{" "}
              <span className="block">
                <b>Sidoarjo</b>
              </span>
            </p>
          </div>
        </a>

        <p className="z-40 mt-5 ml-6 text-base whitespace-pre-wrap w-42 md:text-left text-pdarkblue text-sm font-semibold">
          <b>
            <span>&#169;</span>2024 BPS Kabupaten Sidoarjo
          </b>
        </p>
      </div>
      <div className="grid grid-cols-1 gap-0 mx-auto md:grid-cols-3 md:w-9/12 text-sm font-semibold">
        <div>
          <FooterTitle title="Media Sosial" />
          <FooterList items={medSos} />
        </div>
        <div>
          <FooterTitle title="Kontak Kami" />
          <FooterList items={contacts} />
        </div>
        <div>
        <FooterTitle title="Statistik Pengunjung" />
        <div  className='flex flex-col items-center justify-center mt-5'>

        <script type='text/javascript' src='https://www.freevisitorcounters.com/auth.php?id=678eb5ab934f6bec541fb3321f6307c6a9467f1f'></script>

         
          <img src="https://www.freevisitorcounters.com/en/counter/render/1260528/t/1" border="0" class="counterimg" alt="counter" /> 
          <small><a className="mt-2" href="https://www.freevisitorcounters.com/en/home/stats/id/1260528" target="_blank">Statistik Selengkapnya...</a></small>
        </div>
        
          
        
        </div>
        
      </div>

      {/* <div className="absolute bottom-0 right-0 hidden md:block">
        <img src="/image/pattern.png" width={140} height={140} />
      </div> */}

      <div className="absolute bottom-0 left-0 hidden md:block">
        <img
          src="/image/pattern.png"
          width={140}
          height={140}
          style={{ transform: "scaleX(-1)" }}
        />
      </div>
      </div>
    </footer>
  );
}
