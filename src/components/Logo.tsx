import React from 'react';

interface LogoProps {
  className?: string;
  wordmark?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = 'h-10 w-16', wordmark = true }) => {
  return (
    <div className="flex flex-col items-center">
      <div className={`flex ${className}`} aria-hidden="true">
        <div className="h-full flex-1 rounded-l-md bg-emerald-700" />
        <div className="h-full flex-1 bg-white" />
        <div className="h-full flex-1 rounded-r-md bg-emerald-700" />
      </div>
      {wordmark && (
        <span className="mt-1 text-[10px] font-bold tracking-tighter text-emerald-800">AJETAX</span>
      )}
    </div>
  );
};

export default Logo;
