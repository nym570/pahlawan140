import React, { useState } from 'react';
import { Notifications, DoneAll } from '@mui/icons-material';
// import BreadCrumbs from '../Breadcrumbs';

export default function FloatingNavbar({ breadcrumbs }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [notifVisible, setNotifVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleNotif = () => {
    setNotifVisible(!notifVisible);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <div className={`sticky top-5 hidden xl:block mt-5 rounded-2xl shadow backdrop-filter backdrop-blur-lg mx-10 shadow-md z-50 ${scrolled ? 'bg-transparent' : 'bg-white'}`}>
      <div className="flex justify-between items-center h-16 px-4">
        
        <div className="relative flex items-center space-x-4">
          <div className="relative">
            <Notifications className="text-primaryBlue cursor-pointer" onClick={toggleNotif} />
            {notifVisible && (
              <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg">
                <div className="flex justify-between items-center px-4 py-2 bg-gray-100 border-b">
                  <h2 className="text-lg font-medium text-gray-800">Notifikasi</h2>
                  <button className="text-[12px] text-primaryBlue hover:underline flex items-center gap-x-1">
                    <DoneAll className='text-primaryBlue' fontSize='small'/>
                    Tandai sudah dibaca
                  </button>
                </div>
                <div className="p-4 space-y-4">
                  {/* Notification items */}
                  <div className="border-b pb-4">
                    <p className="text-gray-800"><strong>Rudi</strong> mengunggah dokumen FR.APL.01</p>
                    <p className="text-gray-600 text-sm">21 Juli 2024, 13.00</p>
                  </div>
                  <div className="border-b pb-4">
                    <p className="text-gray-800"><strong>User</strong> mengunggah bukti pembayaran</p>
                    <p className="text-gray-600 text-sm">21 Juli 2024, 14.00</p>
                  </div>
                  {/* Add more notifications here as needed */}
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <img
              src="https://ui-avatars.com/api/?name=Alfian+Syarif&background=D7EAFB&color=228be6&bold=true"
              alt=""
              className="w-10 h-10 rounded-full"         
            />

          </div>

          {modalVisible && (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-lg max-w-md text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16z" clipRule="evenodd" />
                  <path
                    fillRule="evenodd"
                    d="M10 11V6a1 1 0 00-1-1H8a1 1 0 00-1 1v5a1 1 0 001 1h1a1 1 0 001-1zm0 2v.001M9 14h2v2H9v-2z"
                    clipRule="evenodd"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500">
                  Are you sure you want to log out?
                </h3>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleLogout}
                    className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg focus:outline-none"
                  >
                    Yes, Log out
                  </button>
                  <button
                    onClick={toggleModal}
                    className="text-gray-700 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg focus:outline-none"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
