
import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  light?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", showText = true, light = false }) => {
  // Colors sampled from the provided logo image
  const navyColor = light ? "#f8fafc" : "#1D2B44";
  const goldColor = "#E1AD21";
  const greenColor = "#76B947";

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Logo Icon */}
      <svg 
        viewBox="0 0 120 100" 
        className="w-12 h-10 shrink-0" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Navy Blue Plug Loop - Precisely matching the image shape */}
        <path 
          d="M85 65 C 85 85, 20 95, 20 60 C 20 20, 95 20, 95 55 L 95 62" 
          stroke={navyColor} 
          strokeWidth="6" 
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Plug head */}
        <rect x="88" y="62" width="14" height="16" rx="2" fill={navyColor} />
        <path d="M92 78 V83 M98 78 V83" stroke={navyColor} strokeWidth="3" strokeLinecap="round" />
        
        {/* Green Leaves - Dual leaf design from image */}
        <g transform="translate(25, 35) scale(0.8)">
          {/* Left Leaf */}
          <path 
            d="M30 40 Q 5 25, 25 5 Q 35 25, 30 40" 
            fill={greenColor} 
            transform="rotate(-15, 30, 40)"
          />
          {/* Right Leaf */}
          <path 
            d="M30 40 Q 55 25, 35 5 Q 25 25, 30 40" 
            fill={greenColor} 
            transform="rotate(10, 30, 40)"
            opacity="0.9"
          />
        </g>
      </svg>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center font-normal text-3xl tracking-tight leading-none">
            <span style={{ color: navyColor }}>Green</span>
            <span className="mx-1.5" style={{ color: goldColor }}>Gold</span>
            <span style={{ color: navyColor }}>Carbon</span>
          </div>
          <div 
            className="text-[14px] font-normal tracking-[0.45em] mt-1 text-left uppercase"
            style={{ color: navyColor }}
          >
            INTELLIGENCE LTD
          </div>
        </div>
      )}
    </div>
  );
};

export default Logo;
