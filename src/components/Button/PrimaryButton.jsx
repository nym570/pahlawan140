import React from 'react';
import { Link } from 'react-router-dom';

function PrimaryButton({ text, cta = false, link = '#', type = 'button' }) {
  const buttonElement = (
    <button 
      type={type} 
      className={`flex items-center text-white px-6 py-2 rounded-md transition-colors duration-300 ease-in-out transform transition-transform duration-300 ease-in-out hover:-translate-y-1 ${cta ? 'bg-gradient-cta' : 'bg-primaryBlue hover:bg-ternaryBlue'}`}
    >
      {text}
      {cta && <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
      </svg>}
    </button>
  );

  return cta ? (
    <Link to={link} className="inline-block">
      {buttonElement}
    </Link>
  ) : (
    <div>
      {buttonElement}
    </div>
  );
}

export default PrimaryButton;
