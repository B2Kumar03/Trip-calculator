import React, { useEffect, useState } from 'react';
import { ShieldCheck, MessageSquareText } from 'lucide-react';

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => { if (onComplete) onComplete(); }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    /* Background set to #EEFCF8 and horizontal padding to 10px */
    <div className="fixed inset-0 w-screen h-screen bg-[#EEFCF8] flex flex-col items-center justify-between py-14  z-[9999] overflow-hidden">
      
      {/* Top Status Indicators */}
      <div className="w-full flex justify-between px-2">
        <div className="flex items-center gap-1.5 opacity-30">
          <ShieldCheck size={12} className="text-[#3ccf9d]" />
          <span className="text-[9px] font-bold text-[#1a2e2a] tracking-[0.2em] uppercase">Admin Secure</span>
        </div>
        
      </div>

      {/* Center Logo Area */}
      <div className="flex flex-col items-center flex-1 justify-center">
        <div className="relative h-32 w-32 flex items-center justify-center mb-4">
          {/* Back Soft Circle */}
          <div className="absolute h-20 w-20 rounded-full border-[2px] border-[#3ccf9d] opacity-20 -translate-x-6"></div>
          
          {/* Main Front Circle */}
          <div className="relative h-20 w-20 rounded-full border-[3px] border-[#3ccf9d] flex items-center justify-center bg-white/40 backdrop-blur-sm">
             <span className="text-3xl text-[#3ccf9d] font-bold opacity-90">₹</span>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-[#1a2e2a] tracking-tight mb-10">
          TripSplit
        </h1>
        
        {/* Loading Bar Container - Max width set to keep it elegant on wider screens */}
        <div className="w-full max-w-[280px] px-2">
          <div className="w-full h-[5px] bg-white/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#3ccf9d] transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-3 px-1">
             <p className="text-[9px] text-[#9fb1ac] font-bold tracking-[0.15em] uppercase">
                Initializing Modules...
             </p>
             <p className="text-[9px] text-[#3ccf9d] font-bold">
                {progress}%
             </p>
          </div>
        </div>
      </div>

      {/* Bottom Tagline */}
      <div className="text-center pb-6">
        <p className="text-[19px] font-bold text-[#1a2e2a] mb-1">
          Split trips. Not friendships.
        </p>
        <p className="text-xs text-[#9fb1ac] font-medium tracking-wide">
          Made for Indian travelers
        </p>
        
        {/* Bottom Three Dots Decor */}
        <div className="flex justify-center gap-1.5 mt-10">
          <div className="h-1 w-1 rounded-full bg-[#3ccf9d] opacity-20"></div>
          <div className="h-1 w-1 rounded-full bg-[#3ccf9d] opacity-40"></div>
          <div className="h-1 w-1 rounded-full bg-[#3ccf9d] opacity-20"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;