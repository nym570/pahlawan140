import React, { useState, useEffect } from 'react';
import { FaArrowUp, FaBullhorn} from 'react-icons/fa';


const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4">
      
      <button className="p-3 mx-1 text-white rounded-full shadow-md bg-success hover:bg-pblue focus:outline-none" data-tally-open="nGoD1Q" data-tally-emoji-text="👋" data-tally-emoji-animation="wave"><FaBullhorn className="size-5" /></button>
      {isVisible && (
        <button
          type="button"
          onClick={scrollToTop}
          className="p-3 text-white rounded-full shadow-md bg-pdarkblue hover:bg-pblue focus:outline-none"
        >
          <FaArrowUp className="size-5" />
        </button>
      )}
    </div>
  );
};

export default BackToTop;
