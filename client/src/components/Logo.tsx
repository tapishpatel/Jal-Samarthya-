import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  size = 'md', 
  showText = true 
}) => {
  const sizes = {
    sm: { icon: 'h-8 w-8', text: 'text-lg' },
    md: { icon: 'h-10 w-10', text: 'text-xl' },
    lg: { icon: 'h-12 w-12', text: 'text-2xl' }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Jal Samarthya Logo SVG */}
      <div className="relative group logo-animate">
        <svg 
          className={`${sizes[size].icon} drop-shadow-lg transition-transform group-hover:scale-105`} 
          viewBox="0 0 64 64" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background circle with gradient */}
          <defs>
            <radialGradient id="backgroundGradient" cx="0.5" cy="0.3" r="0.8">
              <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.1"/>
            </radialGradient>
            <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0ea5e9"/>
              <stop offset="50%" stopColor="#0284c7"/>
              <stop offset="100%" stopColor="#0369a1"/>
            </linearGradient>
            <linearGradient id="leafGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#22c55e"/>
              <stop offset="100%" stopColor="#16a34a"/>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Background circle */}
          <circle cx="32" cy="32" r="30" fill="url(#backgroundGradient)" className="animate-pulse"/>
          
          {/* Flowing water waves at bottom */}
          <path 
            d="M8 44C12 40 16 48 20 44C24 40 28 48 32 44C36 40 40 48 44 44C48 40 52 48 56 44V52C56 54 54 56 52 56H12C10 56 8 54 8 52V44Z" 
            fill="url(#waterGradient)" 
            opacity="0.6"
            className="water-animate"
          />
          
          {/* Main water droplet with enhanced design */}
          <path 
            d="M32 8C32 8 18 22 18 34C18 42.837 24.163 50 32 50C39.837 50 46 42.837 46 34C46 22 32 8 32 8Z" 
            fill="url(#waterGradient)"
            filter="url(#glow)"
            className="drop-shadow-md"
          />
          
          {/* Inner water highlight */}
          <path 
            d="M32 12C32 12 22 24 22 34C22 40.627 26.373 45 32 45C37.627 45 42 40.627 42 34C42 24 32 12 32 12Z" 
            fill="white" 
            opacity="0.2"
          />
          
          {/* Stylized leaf with stem */}
          <g filter="url(#glow)" className="leaf-animate">
            {/* Leaf stem */}
            <path 
              d="M36 24L38 22" 
              stroke="url(#leafGradient)" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
            {/* Main leaf */}
            <path 
              d="M38 22C42 20 48 22 50 28C52 34 48 38 42 38C38 38 36 34 36 30C36 27 37 24.5 38 22Z" 
              fill="url(#leafGradient)"
              className="drop-shadow-sm"
            />
            {/* Leaf vein */}
            <path 
              d="M38 24C40 26 42 28 44 32" 
              stroke="white" 
              strokeWidth="1" 
              opacity="0.6" 
              strokeLinecap="round"
            />
          </g>
          
          {/* Ripple effects */}
          <g opacity="0.7">
            <circle cx="32" cy="34" r="3" fill="white" opacity="0.8"/>
            <circle cx="32" cy="34" r="6" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5" className="ripple-animate"/>
            <circle cx="32" cy="34" r="9" fill="none" stroke="white" strokeWidth="1" opacity="0.3"/>
          </g>
          
          {/* Floating particles */}
          <circle cx="26" cy="20" r="1" fill="#22c55e" opacity="0.6" className="floating-particles" style={{animationDelay: "0s"}}/>
          <circle cx="38" cy="16" r="0.8" fill="#0ea5e9" opacity="0.4" className="floating-particles" style={{animationDelay: "1.5s"}}/>
          <circle cx="28" cy="42" r="1.2" fill="white" opacity="0.5" className="floating-particles" style={{animationDelay: "3s"}}/>
        </svg>
        
        {/* Enhanced glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 rounded-full blur-md opacity-20 -z-10 group-hover:opacity-30 transition-opacity"></div>
      </div>
      
      {/* Logo Text */}
      {showText && (
        <div className="group-hover:translate-x-1 transition-transform duration-200">
          <h1 className={`${sizes[size].text} font-bold text-gradient-shimmer leading-tight`}>
            Jal Samarthya
          </h1>
          <p className="text-xs text-muted-foreground leading-tight font-medium">
            Environmental Monitoring
          </p>
        </div>
      )}
    </div>
  );
};

export default Logo;