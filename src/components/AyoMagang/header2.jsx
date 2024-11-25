import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { ChevronDown } from "./Icon.jsx";
import LogoImage from '/image/logo_am.png';
import axios from "axios";
import Swal from "sweetalert2";
import { URL } from '../../config';

export default function NavbarCustom() {
  const [activeMenu, setActiveMenu] = useState("Beranda");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const logOut = async () => {
    Swal.fire({
      title: "Keluar?",
      text: "Apakah Anda yakin ingin keluar dari akun anda?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yakin"
    }).then(async (result) => {
      if (result.isConfirmed) {
         localStorage.removeItem("tokenMagang");
         localStorage.removeItem("userMagang");
     window.location.href = '/ayomagang'
      }
    });
};

  const getMenuClasses = (menu) => {
    return activeMenu === menu
      ? "font-bold font-inter text-[14px] text-white bg-pdarkblue py-2 px-4 rounded-full transition-colors duration-100"
      : "font-bold font-inter text-[14px] text-pdarkblue transition-colors duration-100";
  };

  const handleLogoClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <Navbar className="absolute bg-base">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        <NavbarBrand>
          <a href="https://pahlawan140.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://www.bps.go.id/_next/image?url=%2Fassets%2Flogo-bps.png&w=1080&q=75"
              alt="BPS Logo"
              width={48}
              height={48}
            />
          </a>
          <p className="font-[800] font-inter italic text-[14px] sm:text-[18px] text-pdarkblue ml-3 block xs:inline-block">
            <Link href="/berandamasuk" style={{ color: 'inherit', textDecoration: 'none' }}>
              AYO MAGANG <br className="xs:hidden" />
            </Link>
          </p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden gap-4 sm:flex" justify="end">
        <NavbarItem className="hidden xs:flex">
          <Link
            href="/berandamasuk"
            className={getMenuClasses("Masuk")+"text-[16px]"}
            onClick={() => handleMenuClick("Masuk")}
          >
            Beranda
          </Link>
        </NavbarItem>
        <NavbarItem>
          <p className="font-bold font-inter sm:text-[14px] text-pdarkblue">
            Hai, {localStorage.getItem("userMagang")}!
          </p>
        </NavbarItem>
        <NavbarItem className="hidden xs:flex">
        <div className="dropdown bg-none hover:bg-none">
          <div tabIndex={0} role="button" className="bg-none">
          <img
            src={LogoImage}
            alt="User Logo"
            className="rounded-full cursor-pointer bg-base-100 p-1"
            style={{ width: '35px', height: '35px' }}
            onClick={handleLogoClick}
          />
          </div>
          <ul tabIndex={4} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-21 p-1 shadow">
            <li className="text-pdarkblue font-assistant font-semibold">
              <p onClick={logOut}>Keluar</p>
            </li>
          </ul>
        </div>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu isOpen={isMenuOpen} className="lg:hidden">
        
        <NavbarMenuItem className="flex mt-3 bg-base-100 rounded-box p-2">
          
          <img
            src={LogoImage}
            alt="User Logo"
            className=" rounded-full cursor-pointer"
            style={{ width: '30px', height: '30px' }}
            onClick={handleLogoClick}
          />
          <p className="font-bold font-inter text-[14px] text-pdarkblue ps-2">
            Hai, {localStorage.getItem("userMagang")}!
          </p>

        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            href="/berandamasuk"
            className={getMenuClasses("Masuk") + "text-[18px]"}
            onClick={() => handleMenuClick("Masuk")}
          >
            Beranda
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
        <Link className="font-bold text-[14px] text-pdarkblue cursor-pointer" onClick={logOut}>
            Keluar
          </Link>
        
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
