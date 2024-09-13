// ProgressBar.js
import React, { useEffect, useRef, useState } from 'react';
import '../components-styling/ProgressBar.css';

const ProgressBar = ({ progress }) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const { width, height } = dimensions;
  const radius = 20;
  const perimeter = 2 * (width + height - 2 * radius) + (2 * Math.PI * radius);

  return (
    <div ref={containerRef} className="progress-bar-container">
      <svg className="progress-bar" viewBox={`0 0 ${width} ${height}`}>
        <path
          d={`M ${radius},0 H ${width - radius} A ${radius},${radius} 0 0 1 ${width},${radius} V ${height - radius} A ${radius},${radius} 0 0 1 ${width - radius},${height} H ${radius} A ${radius},${radius} 0 0 1 0,${height - radius} V ${radius} A ${radius},${radius} 0 0 1 ${radius},0 Z`}
          fill="none"
          stroke="black"
          strokeWidth="80"
          strokeDasharray={perimeter}
          strokeDashoffset={perimeter - (perimeter * progress / 100)}
        />
      </svg>
    </div>
  );
};

export default ProgressBar;