import React, { useState, useEffect } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { WHEEL_SEGMENTS, Segment } from '../constants';

interface SpinWheelProps {
  onFinished: (winner: Segment) => void;
  isSpinning: boolean;
  spinTrigger: number;
}

const SpinWheel: React.FC<SpinWheelProps> = ({ onFinished, isSpinning, spinTrigger }) => {
  const controls = useAnimation();
  const [rotation, setRotation] = useState(0);

  const numSegments = WHEEL_SEGMENTS.length;
  const radius = 150; // SVG units
  const center = 150;
  const sliceAngle = 360 / numSegments;

  // Helper to calculate SVG path for a slice
  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent) * radius;
    const y = Math.sin(2 * Math.PI * percent) * radius;
    return [x, y];
  };

  useEffect(() => {
    if (spinTrigger > 0) {
      spin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinTrigger]);

  const spin = async () => {
    // Calculate a random landing spot
    // We want at least 5 full rotations (1800 degrees)
    const minSpins = 5;
    const randomDegree = Math.floor(Math.random() * 360);
    const totalRotation = (minSpins * 360) + randomDegree;
    
    // Update React state for the next start position (cumulative)
    const newRotation = rotation + totalRotation;
    setRotation(newRotation);

    await controls.start({
      rotate: newRotation,
      transition: {
        duration: 4.5,
        ease: [0.15, 0.05, 0.20, 1.0], // Custom bezier for realistic wheel deceleration
      },
    });

    // Calculate winner
    // The pointer is at the top (270 degrees / -90 degrees visual).
    // However, the wheel rotates clockwise. 
    // The actual calculation needs to account for the final rotation modulus.
    
    const normalizedRotation = newRotation % 360;
    
    // Because the wheel rotates CW, the slice at the top is calculated by:
    // Top Index = Floor( (360 - rotation % 360) / sliceAngle )
    // However, we need to account for the initial offset if segment 0 starts at 0 degrees (3 o'clock).
    // In our SVG, segment 0 starts at 0 deg (3 o'clock).
    // We want the pointer at -90 deg (12 o'clock).
    // So we add 90 degrees to the check.
    
    const degreesFromStart = (normalizedRotation + 90) % 360;
    const winningIndex = Math.floor((360 - degreesFromStart) / sliceAngle) % numSegments;

    onFinished(WHEEL_SEGMENTS[winningIndex]);
  };

  return (
    <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px] flex items-center justify-center">
      {/* The Pointer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-30 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-[#fbbf24] drop-shadow-lg"></div>

      {/* Wheel Border/Rim */}
      <div className="absolute w-full h-full rounded-full border-8 border-[#991b1b] shadow-[0_10px_20px_rgba(0,0,0,0.5)] bg-[#7f1d1d] z-10"></div>

      {/* Rotating Part */}
      <motion.div
        className="w-[92%] h-[92%] relative z-20"
        animate={controls}
        initial={{ rotate: 0 }}
      >
        <svg
          viewBox="0 0 300 300"
          className="w-full h-full transform rotate-0" // Initial rotation to align start
          style={{ overflow: 'visible' }}
        >
          <g transform="translate(150, 150)">
            {WHEEL_SEGMENTS.map((segment, i) => {
              // Start and End angles for SVG path
              const startAngle = (i * sliceAngle) / 360;
              const endAngle = ((i + 1) * sliceAngle) / 360;

              const [startX, startY] = getCoordinatesForPercent(startAngle);
              const [endX, endY] = getCoordinatesForPercent(endAngle);
              
              // SVG Path command for a pie slice
              const largeArcFlag = sliceAngle > 180 ? 1 : 0;
              const pathData = [
                `M 0 0`,
                `L ${startX} ${startY}`,
                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                `Z`,
              ].join(' ');

              // Text Rotation
              const midAngle = i * sliceAngle + sliceAngle / 2;
              
              return (
                <g key={i}>
                  <path d={pathData} fill={segment.color} stroke="#7f1d1d" strokeWidth="1" />
                  <text
                    x={radius * 0.65}
                    y={0}
                    fill={segment.textColor}
                    fontSize="14"
                    fontWeight="bold"
                    fontFamily="Arial, sans-serif"
                    alignmentBaseline="middle"
                    textAnchor="middle"
                    transform={`rotate(${midAngle})`}
                  >
                    {segment.label}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </motion.div>
      
      {/* Center Cap */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-700 rounded-full z-40 shadow-inner border-2 border-yellow-200"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#7f1d1d] rounded-full z-50"></div>
    </div>
  );
};

export default SpinWheel;