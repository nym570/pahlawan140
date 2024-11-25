import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { ChevronDown } from "./Icon.jsx";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import axios from "axios";
import {message} from 'antd'
import { URL } from '../../config';
import { Dropdown as DropdownAntd, Space } from 'antd';


export default function NavbarCustom() {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  // const items = [
    
  //   {
  //     key: '2',
  //     label: 'sub menu',
  //     children: [
  //       {
  //         key: '2-1',
  //         label : (
  //           <a target="_blank" rel="noopener noreferrer" href="google.com">
  //             google
  //           </a>
  //         ),
  //       },
  //       {
  //         key: '2-2',
  //         label: (
  //           <a target="_blank" rel="noopener noreferrer" href="google.com">
  //             coba
  //           </a>
  //         ),
  //       },
  //     ],
  //   },
  //   {
  //     key: '1',
  //     label: (
  //       <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
  //         1st menu item
  //       </a>
  //     ),
  //   }
  // ];
  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
  };
  const menuURL = URL + 'menu';
  const [list, setList] = useState([]);
  const getList = async() => {
    try{
      await axios.get(menuURL).then((res) => {
        setList(res.data.data.map(
          (item,index) => {
            return item.submenus.length > 0 ?
            ({
            key : ""+(index+1),
            label : item.judul,
            children:  item.submenus.map(
              (data,i) => ({
                key : (index+1)+'-'+(i+1),
                label : (
                  <a target="_blank" rel="noopener noreferrer" href={data.link}>
                    {data.judul}
                  </a>
                ),
              })
            ),
          }) : 
          ({
            key : ""+(index+1),
            label : (
              <a target="_blank" rel="noopener noreferrer" href={item.link}>
                {item.judul}
              </a>
            ),
            
          })
      }
        ));
      });
    
    }
    catch (error) {
      message.error("["+error.status+"] Gagal Menampilkan Menu Tambahan",0);
    }
   
  }
  useEffect(() => {
    getList();
    const path = location.pathname;
    const loginSuccess = localStorage.getItem("loginSuccess");
    const role = localStorage.getItem("userRole");
    setIsLoggedIn(loginSuccess === "true");
    setUserRole(role);
    

    if (path === "/") setActiveMenu("Beranda");
    else if (path === "/myoffice") setActiveMenu("MyOffice");
    else if (path === "/temanluki") setActiveMenu("Teman Luki");
    else if (path === "/ruangbaca") setActiveMenu("Ruang Baca");
    else if (path === "/zi-rb") setActiveMenu("ZI-RB");
    else if (path.startsWith("/mitraqita")) setActiveMenu("MitraQita");
    else if (path === "/aduan") setActiveMenu("Aduan");
  }, [location]);

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
        />
        <NavbarBrand>
          <a href="/">
            <img
              src="https://www.bps.go.id/_next/image?url=%2Fassets%2Flogo-bps.png&w=1080&q=75"
              alt="BPS Logo"
              width={48}
              height={48}
            />
          </a>
          <a href="/">
            <p className="font-[800] font-inter italic text-[14px] sm:text-[18px] text-pdarkblue ml-3 block xs:inline-block">
              BPS KABUPATEN <br className="xs:hidden" />
              SIDOARJO
            </p>
          </a>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden gap-4 sm:flex" justify="end">
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className={
                  getMenuClasses("Beranda") +
                  " p-0 bg-transparent data-[hover=true]:bg-transparent font-inter text-pdarkblue"
                }
                endContent={icons.chevron}
                radius="sm"
                variant="light"
              >
                <RouterLink to="/" className={getMenuClasses("Beranda")}>
                  Beranda
                </RouterLink>
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[180px] font-inter text-pdarkblue"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem className="font-bold" key="profil">
              <RouterLink to="/profil" className={getMenuClasses("Profil")}>
                <p className="font-semibold text-[14px] font-inter">Profil</p>
              </RouterLink>
            </DropdownItem>
            <DropdownItem className="font-bold" key="berita">
              <RouterLink to="/berita" className={getMenuClasses("Berita")}>
                <p className="font-semibold text-[14px] font-inter">Berita</p>
              </RouterLink>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavbarItem className="hidden lg:flex">
          <RouterLink to="/temanluki" className={getMenuClasses("Teman Luki")}>
            Teman Luki
          </RouterLink>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <RouterLink to="/ruangbaca" className={getMenuClasses("Ruang Baca")}>
            Ruang Baca
          </RouterLink>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <RouterLink to="/aduan" className={getMenuClasses("Aduan")}>
            Aduan
          </RouterLink>
        </NavbarItem>
        <Dropdown >
          <NavbarItem className="hidden sm:flex lg:hidden">
            <DropdownTrigger>
              <Button
                disableRipple
                className={
                  getMenuClasses("Layanan") +
                  " p-0 bg-transparent data-[hover=true]:bg-transparent font-inter hidden sm:flex lg:hidden"
                }
                endContent={icons.chevron}
                radius="sm"
                variant="light"
              >
                Layanan
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[210px] font-inter text-pdarkblue"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem >
              
                <p className="text-[14px] font-inter font-semibold ">
                <RouterLink to="/temanluki" >
            Teman Luki
          </RouterLink>
                </p>
            
            </DropdownItem>
            <DropdownItem >
              
              <p className="text-[14px] font-inter font-semibold ">
              <RouterLink to="/ruangbaca" >
            Ruang Baca
          </RouterLink>
              </p>
          
          </DropdownItem>
            <DropdownItem >
              <p className="text-[14px] font-inter font-semibold ">
              <RouterLink to="/aduan">
            Aduan
          </RouterLink>
              </p>
            </DropdownItem>
            <DropdownItem >
              <p className="text-[14px] font-inter font-semibold ">
              <RouterLink to="/myoffice">
            MyOffice
          </RouterLink>
              </p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        
        <DropdownAntd
         overlayClassName="w-[180px] text-pdarkblue font-semibold text-[14px] font-inter"
         
    menu={{
      items : list,
      
     
    }}
    trigger={['click']}
  >
    <a
      className={
                  getMenuClasses("MitraQita") +
                  " p-0 bg-transparent data-[hover=true]:bg-transparent font-inter inline-flex"
                } 
      onClick={(e) => e.preventDefault()}
      style={{ cursor: "pointer" }}
      >
        
      Tautan <ChevronDown className="mt-1 ms-1" fill="currentColor" size={16} />
    {/* <Button
                disableRipple
                
                className={
                  getMenuClasses("MitraQita") +
                  " p-0 bg-transparent data-[hover=true]:bg-transparent font-inter"
                }
                endContent={icons.chevron}
                radius="sm"
                variant="light"
              >
                Tautan
              </Button> */}
    </a>
  </DropdownAntd>
        
        {/* <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className={
                  getMenuClasses("MitraQita") +
                  " p-0 bg-transparent data-[hover=true]:bg-transparent font-inter"
                }
                endContent={icons.chevron}
                radius="sm"
                variant="light"
              >
                ZI-RB
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[210px] font-inter text-pdarkblue"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem className="font-bold" key="berita">
              <a href="https://rb.bps.go.id/">
                <p className="font-semibold text-[14px] font-inter">BPS RI</p>
              </a>
            </DropdownItem>
            <DropdownItem className="font-bold" key="sobat">
              <p className="font-semibold text-[14px] font-inter">
                <RouterLink to="/zi-rb" className={getMenuClasses("Berita")}>
                  BPS Kabupaten Sidoarjo
                </RouterLink>
              </p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className={
                  getMenuClasses("MitraQita") +
                  " p-0 bg-transparent data-[hover=true]:bg-transparent font-inter"
                }
                endContent={icons.chevron}
                radius="sm"
                variant="light"
              >
                MitraQita
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[150px] font-inter text-pdarkblue"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem className="font-bold" key="daftarmitra">
              <a href="https://mitra.bps.go.id/registrasi">
                <p className="font-semibold text-[14px] font-inter">
                  Daftar Mitra
                </p>
              </a>
            </DropdownItem>
            <DropdownItem className="font-bold" key="sobat">
              <a href="https://mitra.bps.go.id/login">
                <p className="font-semibold text-[14px] font-inter">
                  Aplikasi Sobat
                </p>
              </a>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown> */}
        <NavbarItem className="hidden lg:flex">
          <RouterLink to="/myoffice" className={getMenuClasses("MyOffice")}>
            MyOffice
          </RouterLink>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <RouterLink
            to={isLoggedIn && userRole === "admin" ? "/dashboard" : "/login"}
            className={getMenuClasses(isLoggedIn ? "Logout" : "Login")}
          >
            {isLoggedIn ? <IoLogOut size={36} /> : <IoLogIn size={36} />}
          </RouterLink>
        </NavbarItem>
      </NavbarContent>

      {/* small screen */}

      <NavbarMenu>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className={
                  getMenuClasses("Beranda") +
                  " p-0 bg-transparent data-[hover=true]:bg-transparent font-inter text-pdarkblue"
                }
                endContent={icons.chevron}
                radius="sm"
                variant="light"
              >
                <RouterLink to="/" className={getMenuClasses("Beranda")}>
                  Beranda
                </RouterLink>
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[180px] font-inter text-pdarkblue"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem className="font-bold" key="profil">
              <RouterLink to="/profil" className={getMenuClasses("Profil")}>
                <p className="font-semibold text-[14px] font-inter">Profil</p>
              </RouterLink>
            </DropdownItem>
            <DropdownItem className="font-bold" key="berita">
              <RouterLink to="/berita" className={getMenuClasses("Berita")}>
                <p className="font-semibold text-[14px] font-inter">Berita</p>
              </RouterLink>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className={
                  getMenuClasses("Layanan") +
                  " p-0 bg-transparent data-[hover=true]:bg-transparent font-inter text-pdarkblue"
                }
                endContent={icons.chevron}
                radius="sm"
                variant="light"
              >
                Layanan
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[180px] font-inter text-pdarkblue"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem >
              
              <p className="text-[14px] font-inter font-semibold ">
              <RouterLink to="/temanluki" >
          Teman Luki
        </RouterLink>
              </p>
          
          </DropdownItem>
          <DropdownItem >
            
            <p className="text-[14px] font-inter font-semibold ">
            <RouterLink to="/ruangbaca" >
          Ruang Baca
        </RouterLink>
            </p>
        
        </DropdownItem>
          <DropdownItem >
            <p className="text-[14px] font-inter font-semibold ">
            <RouterLink to="/aduan" >
          Aduan
        </RouterLink>
            </p>
          </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        {/* <NavbarMenuItem className="lg:flex">
          <RouterLink to="/temanluki" className={getMenuClasses("Teman Luki")}>
            Teman Luki
          </RouterLink>
        </NavbarMenuItem>
        <NavbarMenuItem className="lg:flex">
          <RouterLink to="/ruangbaca" className={getMenuClasses("Ruang Baca")}>
            Ruang Baca
          </RouterLink>
        </NavbarMenuItem>
        <NavbarMenuItem className="lg:flex">
          <RouterLink to="/aduan" className={getMenuClasses("Aduan")}>
            Aduan
          </RouterLink>
        </NavbarMenuItem> */}
        {/* <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className={
                  getMenuClasses("ZI-RB") +
                  " p-0 bg-transparent text-left data-[hover=true]:bg-transparent font-inter"
                }
                endContent={icons.chevron}
                radius="sm"
                variant="light"
              >
              ZI-RB
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[210px] font-inter text-pdarkblue"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem className="font-bold" key="berita">
              <a href="https://rb.bps.go.id/">
                <p className="font-semibold text-[14px] font-inter">BPS RI</p>
              </a>
            </DropdownItem>
            <DropdownItem className="font-bold" key="sobat">
              <p className="font-semibold text-[14px] font-inter">
                <RouterLink to="/zi-rb" className={getMenuClasses("Berita")}>
                  BPS Kabupaten Sidoarjo
                </RouterLink>
              </p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
       
        <Dropdown>
          <NavbarMenuItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className={
                  getMenuClasses("MitraQita") +
                  " p-0 bg-transparent data-[hover=true]:bg-transparent justify-between"
                }
                endContent={icons.chevron}
                radius="sm"
                variant="light"
              >
                MitraQita
              </Button>
            </DropdownTrigger>
          </NavbarMenuItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[150px] font-inter text-pdarkblue"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem className="font-bold" key="daftarmitra">
              <a href="https://mitra.bps.go.id/registrasi">
                <p className="font-semibold text-[14px] font-inter">
                  Daftar Mitra
                </p>
              </a>
            </DropdownItem>
            <DropdownItem className="font-bold" key="sobat">
              <a href="https://mitra.bps.go.id/login">
                <p className="font-semibold text-[14px] font-inter">
                  Aplikasi Sobat
                </p>
              </a>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown> */}
        <NavbarItem>
        <DropdownAntd
         overlayClassName="w-[180px] text-pdarkblue font-semibold text-[14px] font-inter"
         
    menu={{
      items : list,
      
     
    }}
    trigger={['click']}
  >
     
     <a
      className={
                  getMenuClasses("MitraQita") +
                  " p-0 bg-transparent data-[hover=true]:bg-transparent font-inter inline-flex"
                } 
      onClick={(e) => e.preventDefault()}
      style={{ cursor: "pointer" }}
      >
        
      Tautan <ChevronDown className="mt-1 ms-1" fill="currentColor" size={16} />
    </a>
   
  </DropdownAntd>
  </NavbarItem>

        <NavbarMenuItem >
          <RouterLink to="/myoffice" className={getMenuClasses("MyOffice")}>
            MyOffice
          </RouterLink>
        </NavbarMenuItem>
        <NavbarItem className=" lg:flex">
          <RouterLink
            to={isLoggedIn && userRole === "admin" ? "/dashboard" : "/login"}
            className={getMenuClasses(isLoggedIn ? "Logout" : "Login")}
          >
            {isLoggedIn ? "Admin" : "Login"}
          </RouterLink>
        </NavbarItem>
      </NavbarMenu>
    </Navbar>
  );
}
