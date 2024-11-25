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

export default function NavbarCustom() {
  const [activeMenu, setActiveMenu] = useState("Beranda");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const getMenuClasses = (menu) => {
    return activeMenu === menu
      ? "font-bold font-inter text-[14px] text-white bg-pdarkblue py-2 px-4 rounded-full transition-colors duration-100"
      : "font-bold font-inter text-[14px] text-pdarkblue transition-colors duration-100";
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
          <p className="font-[800] font-inter italic text-[20px] sm:text-[18px] text-pdarkblue ml-3 block xs:inline-block">
            <Link href="/ayomagang" style={{ color: 'inherit', textDecoration: 'none' }}>
              AYO MAGANG! <br className="xs:hidden" />
            </Link>
          </p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden gap-4 sm:flex" justify="end">
        <NavbarItem className="hidden xs:flex">
          <Link
            href="/masukam"
            className={getMenuClasses("Masuk")}
            onClick={() => handleMenuClick("Masuk")}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px 15px',
              borderRadius: '15px', // Makes the background round
              backgroundColor: '#0B588F', // Background color
              color: 'white', // Text color
              textDecoration: 'none', // Remove underline
            }}
          >
            Masuk
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Link
            href="/daftaram"
            className={getMenuClasses("Daftar")}
            onClick={() => handleMenuClick("Daftar")}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px 15px',
              borderRadius: '15px', // Makes the background round
              backgroundColor: '#EB891B', // Background color
              color: 'white', // Text color
              textDecoration: 'none', // Remove underline
            }}
          >
            Daftar Akun
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu isOpen={isMenuOpen}>
        <NavbarMenuItem className="hidden lg:flex px-5">
          <Link
            href="/masukam"
            className={`${getMenuClasses("Masuk")} font-semibold font-inter text-white bg-pblue py-2 px-4 rounded-lg transition-colors duration-100 hover:bg-sky-700 hover:outline-0 hover:outline-white hover:outline hover:outline-offset-2`}
            onClick={() => handleMenuClick("Masuk")}
          >
            Masuk
        </Link>
        </NavbarMenuItem>
        <NavbarMenuItem className="hidden lg:flex"> 
          <Link
            href="/daftaram"
            className={getMenuClasses("Daftar")}
            onClick={() => handleMenuClick("Daftar")}
          >
            Daftar Akun
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}