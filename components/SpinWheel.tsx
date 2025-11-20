import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
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
    const minSpins = 5;
    const randomDegree = Math.floor(Math.random() * 360);
    const totalRotation = (minSpins * 360) + randomDegree;
    
    const newRotation = rotation + totalRotation;
    setRotation(newRotation);

    await controls.start({
      rotate: newRotation,
      transition: {
        duration: 5.5, // Slightly longer for dramatic effect
        ease: [0.15, 0.05, 0.20, 1.0],
      },
    });

    const normalizedRotation = newRotation % 360;
    // Pointer is at -90deg (Top). 
    // Segment 0 starts at 0deg (Right).
    // Calculation corrects for this offset.
    const degreesFromStart = (normalizedRotation + 90) % 360;
    const winningIndex = Math.floor((360 - degreesFromStart) / sliceAngle) % numSegments;

    onFinished(WHEEL_SEGMENTS[winningIndex]);
  };

  return (
    <div className="relative w-[340px] h-[340px] md:w-[420px] md:h-[420px] flex items-center justify-center">
      {/* The Pointer - Luxury Gold */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-30 filter drop-shadow-xl">
         <svg width="50" height="60" viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 60L0 10H50L25 60Z" fill="#fbbf24"/>
            <path d="M25 60L0 10H25V60Z" fill="#d97706"/>
            <circle cx="25" cy="10" r="10" fill="#92400e"/>
            <circle cx="25" cy="10" r="6" fill="#fcd34d"/>
         </svg>
      </div>

      {/* Wheel Border/Rim - Gucci Pattern */}
      <div className="absolute w-full h-full rounded-full border-[12px] border-[#c5a059] shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-[#0f172a] z-10 overflow-hidden">
         {/* Inner Rim decoration */}
         <div className="absolute inset-0 border-[4px] border-dashed border-[#78350f] rounded-full opacity-40"></div>
      </div>

      {/* Rotating Part */}
      <motion.div
        className="w-[90%] h-[90%] relative z-20"
        animate={controls}
        initial={{ rotate: 0 }}
      >
        <svg
          viewBox="0 0 300 300"
          className="w-full h-full"
          style={{ overflow: 'visible' }}
        >
          <g transform="translate(150, 150)">
            {WHEEL_SEGMENTS.map((segment, i) => {
              const startAngle = (i * sliceAngle) / 360;
              const endAngle = ((i + 1) * sliceAngle) / 360;
              const [startX, startY] = getCoordinatesForPercent(startAngle);
              const [endX, endY] = getCoordinatesForPercent(endAngle);
              const largeArcFlag = sliceAngle > 180 ? 1 : 0;
              
              const pathData = [
                `M 0 0`,
                `L ${startX} ${startY}`,
                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                `Z`,
              ].join(' ');

              const midAngle = i * sliceAngle + sliceAngle / 2;
              
              return (
                <g key={i}>
                  <path d={pathData} fill={segment.color} stroke="#c5a059" strokeWidth="2" />
                  
                  {/* Text Label */}
                  <text
                    x={radius * 0.6}
                    y={0}
                    fill={segment.textColor}
                    fontSize="13"
                    fontWeight="900"
                    fontFamily="Montserrat, sans-serif"
                    alignmentBaseline="middle"
                    textAnchor="middle"
                    transform={`rotate(${midAngle})`}
                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                  >
                    {segment.label}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </motion.div>
      
      {/* Center Cap - Luxury Brand Style */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-b from-[#d97706] to-[#78350f] rounded-full z-40 shadow-2xl border-4 border-[#fcd34d] flex items-center justify-center">
         <div className="text-[#fcd34d] font-bold font-serif text-2xl">G</div>
      </div>
    </div>
  );
};

export default SpinWheel;
