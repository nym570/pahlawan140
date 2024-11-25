import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import useScrollDirection from '../../hooks/useScrollDirection.js';

const ScrollEffect = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const scrollDirection = useScrollDirection();
  const [scale, setScale] = useState('scale-100');

  useEffect(() => {
    if (scrollDirection === 'down' && inView) {
      setScale('scale-100');
    } else if (scrollDirection === 'down' && !inView) {
      setScale('scale-90');
    }
  }, [scrollDirection, inView]);

  return (
    <div
      ref={ref}
      className={`transition-transform duration-500 ease-in-out ${scale}`}
      style={{ transformOrigin: 'top center' }}
    >
      {children}
    </div>
  );
};

export default ScrollEffect;
