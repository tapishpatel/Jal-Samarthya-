import React from 'react';

interface LogoIconProps {
  className?: string;
  size?: number;
}

const LogoIcon: React.FC<LogoIconProps> = ({ 
  className = "", 
  size = 32 
}) => {
  return (
    <svg 
      className={`drop-shadow-lg ${className}`} 
      width={size}
      height={size}
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Enhanced gradients and effects */}
      <defs>
        <radialGradient id={`backgroundGradient-${size}`} cx="0.5" cy="0.3" r="0.8">
          <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.1"/>
        </radialGradient>
        <linearGradient id={`waterGradient-${size}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9"/>
          <stop offset="50%" stopColor="#0284c7"/>
          <stop offset="100%" stopColor="#0369a1"/>
        </linearGradient>
        <linearGradient id={`leafGradient-${size}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22c55e"/>
          <stop offset="100%" stopColor="#16a34a"/>
        </linearGradient>
      </defs>
      
      {/* Background circle */}
      <circle cx="32" cy="32" r="30" fill={`url(#backgroundGradient-${size})`}/>
      
      {/* Water waves */}
      <path 
        d="M8 44C12 40 16 48 20 44C24 40 28 48 32 44C36 40 40 48 44 44C48 40 52 48 56 44V52C56 54 54 56 52 56H12C10 56 8 54 8 52V44Z" 
        fill={`url(#waterGradient-${size})`} 
        opacity="0.6"
      />
      
      {/* Main water droplet */}
      <path 
        d="M32 8C32 8 18 22 18 34C18 42.837 24.163 50 32 50C39.837 50 46 42.837 46 34C46 22 32 8 32 8Z" 
        fill={`url(#waterGradient-${size})`}
      />
      
      {/* Inner highlight */}
      <path 
        d="M32 12C32 12 22 24 22 34C22 40.627 26.373 45 32 45C37.627 45 42 40.627 42 34C42 24 32 12 32 12Z" 
        fill="white" 
        opacity="0.2"
      />
      
      {/* Stylized leaf */}
      <path 
        d="M38 22C42 20 48 22 50 28C52 34 48 38 42 38C38 38 36 34 36 30C36 27 37 24.5 38 22Z" 
        fill={`url(#leafGradient-${size})`}
      />
      
      {/* Ripples */}
      <circle cx="32" cy="34" r="3" fill="white" opacity="0.8"/>
      <circle cx="32" cy="34" r="6" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5"/>
    </svg>
  );
};

export default LogoIcon;