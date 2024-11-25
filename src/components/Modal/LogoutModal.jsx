import { Error } from '@mui/icons-material';
import React, { useEffect, useRef } from 'react';

const LogoutConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  return (
    <>
      {isOpen ? (
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center z-50 mx-5 md:mx-0">
          {/* Dark overlay */}
          <div className="fixed inset-0 bg-black opacity-50" />

          {/* Modal dialog */}
          <div
            ref={modalRef}
            tabIndex="-1"
            className="relative mx-auto max-w-lg bg-white p-8 rounded-2xl shadow-lg focus:outline-none"
          >
            <div className="text-center">
              <div className='mb-8 text-yellow-300 flex flex-col items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>

                <h2 className="text-2xl font-bold text-black">Keluar dari Pahlawan140?</h2>
                {/* <Error className='text-primaryOrange text-2xl' fontSize='large' /> */}
              </div>
        
              <div className="flex justify-center">
               
                <button
                  onClick={onClose}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Batal
                </button>

                <button
                  onClick={onConfirm}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 ml-4 rounded"
                >
                  Keluar
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default LogoutConfirmationModal;
