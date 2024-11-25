import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import Swal from "sweetalert2";

const Sidebar = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { pathname } = useLocation();
  const [isScreenWide, setIsScreenWide] = useState(window.innerWidth >= 1280);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1280px)");
    setIsSidebarOpen(mediaQuery.matches);
    setIsScreenWide(mediaQuery.matches);

    const handleResize = () => {
      setIsSidebarOpen(mediaQuery.matches);
      setIsScreenWide(mediaQuery.matches);
    };

    mediaQuery.addEventListener("change", handleResize);
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      <aside
        className={`h-screen z-40 fixed top-0 left-0 p-4 ${
          isSidebarOpen ? "w-64" : "w-24"
        } transition-all duration-300`}
      >
        <nav className="flex flex-col bg-white border-r bg-white rounded-2xl shadow-sm transition-all duration-300 h-full">
          <div className="p-4 pb-2 flex justify-between items-center">
            <a href="/">
              <img
                src="/image/logo.png"
                className={`overflow-hidden transition-all duration-300 ${
                  isSidebarOpen ? "w-24" : "w-0"
                }`}
                alt=""
              />
            </a>
            <a href="/">
              <p
                className={`font-semibold tracking-tight ml-3 text-primaryBlue ${
                  isSidebarOpen ? "" : "hidden"
                }`}
              >
                BPS Kabupaten Sidoarjo
              </p>
            </a>

            <button
              onClick={toggleSidebar}
              className={`p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 ${
                isScreenWide ? "md:hidden" : ""
              }`}
            >
              {isSidebarOpen ? (
                <ChevronLeft className="text-primaryBlue" />
              ) : (
                <ChevronRight className="text-primaryBlue" />
              )}
            </button>
          </div>

          <ul className="flex-1 px-3">
            {React.Children.map(children, (child) =>
              React.cloneElement(child, {
                isSidebarOpen,
                pathname,
                setIsSidebarOpen,
              })
            )}
          </ul>

          <div className="border-t flex p-3 xl:hidden">
            <img
              src="/image/profile.png"
              alt=""
              className="w-10 h-10 rounded-md"
            />
            <div
              className={`flex justify-between items-center overflow-hidden transition-all duration-300 ${
                isSidebarOpen ? "w-52 ml-3" : "w-0"
              }`}
            ></div>
          </div>
        </nav>
      </aside>
    </div>
  );
};

export function SidebarItem({
  icon,
  text,
  alert,
  to,
  submenu,
  isSidebarOpen,
  pathname,
  // setShowLogoutModal,
  setIsSidebarOpen,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive =
    location.pathname === to ||
    (submenu && submenu.some((subItem) => subItem.to === location.pathname));
  const hasSubmenu = submenu && submenu.length > 0;
  const [submenuOpen, setSubmenuOpen] = useState(() => {
    return localStorage.getItem(to) === "true";
  });

  useEffect(() => {
    if (isActive) {
      setSubmenuOpen(true);
    }
  }, [isActive]);

  useEffect(() => {
    localStorage.setItem(to, submenuOpen);
  }, [submenuOpen, to]);

  const handleLogoutClick = () => {
    Swal.fire({
      title: "Keluar?",
      text: "Apakah Anda yakin ingin keluar dari akun anda?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yakin"
    }).then((result) => {
      if (result.isConfirmed) {
         localStorage.removeItem("tokenUser");
         localStorage.removeItem("loginSuccess");
         localStorage.removeItem("userRole");
         window.location.href = '/';
      }
    });
    // setShowLogoutModal(true);
  };

  const handleSubmenuToggle = (e) => {
    e.stopPropagation();
    setSubmenuOpen((prevState) => !prevState);
    if (!isSidebarOpen) {
      setIsSidebarOpen(true); // Open the sidebar if it's closed
    }
  };

  const handleNavigation = (e) => {
    if (hasSubmenu) {
      e.preventDefault();
      handleSubmenuToggle(e);
    } else if (to.startsWith("http")) {
      window.location.href = to; // Directly navigate to the external URL
    } else {
      navigate(to);
    }
  };

  return (
    <>
      {to === "logout" ? (
        <li
          onClick={handleLogoutClick}
          className={`
            relative flex items-center py-2 px-3 my-2
            font-medium rounded-md cursor-pointer
            transition-colors group
            hover:bg-secondaryBlue text-ternaryBlue
            ${isSidebarOpen ? "ml-3" : "ml-0"}
          `}
        >
          {icon}
          <span
            className={`overflow-hidden transition-all duration-300 ${
              isSidebarOpen ? "ml-3" : "ml-1.5"
            }`}
          >
            {text}
          </span>
        </li>
      ) : (
        <div onClick={handleNavigation}>
          <li
            className={`
          relative flex items-center py-2 px-3 my-2
          font-medium rounded-md cursor-pointer
          transition-colors group
          ${
            isActive
              ? "bg-secondaryBlue text-primaryBlue"
              : "hover:bg-secondaryBlue text-ternaryBlue"
          }
          ${isSidebarOpen ? "ml-3" : "ml-0"}
        `}
          >
            {icon}
            <span
              className={`overflow-hidden transition-all duration-300 ${
                isSidebarOpen ? "ml-3" : "-ml-1"
              }`}
            >
              {text}
            </span>
            {hasSubmenu && (
              <button
                className="ml-auto focus:outline-none"
                onClick={handleSubmenuToggle}
              >
                {submenuOpen ? (
                  <ExpandLess className="text-primaryBlue" />
                ) : (
                  <ExpandMore className="text-primaryBlue" />
                )}
              </button>
            )}
            {alert && (
              <div
                className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
                  isSidebarOpen ? "" : "top-2"
                }`}
              />
            )}
          </li>

          {hasSubmenu && submenuOpen && isSidebarOpen && (
            <ul className="ml-5">
              {submenu.map((subItem, index) => (
                <Link key={index} to={subItem.to}>
                  <li
                    className={`
                  relative flex items-center py-2 px-3 my-1
                  font-medium rounded-md cursor-pointer
                  transition-colors group
                  ${
                    location.pathname === subItem.to
                      ? "bg-secondaryBlue text-primaryBlue"
                      : "hover:bg-secondaryBlue text-ternaryBlue"
                  }
                `}
                  >
                    <span className="ml-6">{subItem.icon}</span>
                    <span className="ml-3">{subItem.text}</span>
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
}

export default Sidebar;
