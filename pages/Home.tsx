
import React, { useState, memo } from 'react';
import Spline from '@splinetool/react-spline';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import OptimizedImage from '../components/OptimizedImage';

const Home = () => {
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  // Separate loaded state for mobile image is handled inside OptimizedImage, 
  // but we can use a simpler approach here or just let OptimizedImage handle the fade.

  return (
    <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden bg-white">
      {/* Desktop Version: Spline 3D (Hidden on Mobile) */}
      <div className={`hidden md:block w-full h-full transition-all duration-1000 ${isSplineLoaded ? 'opacity-100' : 'opacity-0'} origin-center will-change-transform`}>
        <Spline 
          scene="https://prod.spline.design/Jf6flCS8UPgVPfmh/scene.splinecode"
          onLoad={() => setIsSplineLoaded(true)}
        />
      </div>

      {/* Mobile Version: Static Image (Visible only on Mobile) */}
      <div className="block md:hidden w-full h-full">
        <OptimizedImage
          src="https://i.imgur.com/m6RRYYV.jpeg" 
          alt="Home Visual" 
          className="w-full h-full"
          imgClassName="object-cover object-center"
          priority={true} // Important for LCP on mobile
          sizes="100vw"
        />
      </div>

      {/* Masks to hide Spline elements/watermarks on Desktop */}
      <div className="hidden md:block absolute bottom-0 right-0 w-[14rem] h-[5rem] bg-white z-20 pointer-events-auto" />
      <div className="hidden md:block absolute top-[53%] left-[39%] w-[3.5rem] h-[5rem] bg-white z-20 pointer-events-none" />

      {/* Project CTA Button */}
      {/* Always show CTA on mobile, on desktop show after spline loads */}
      <div className={`absolute bottom-[3rem] left-0 right-0 flex flex-col items-center justify-center pointer-events-none z-30 transition-opacity duration-1000 md:${isSplineLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Link 
          to="/facing-the-divided-a" 
          className="pointer-events-auto flex items-center gap-2 px-[2rem] py-[1rem] bg-black text-white rounded-full font-bold tracking-widest uppercase hover:opacity-80 transition-all shadow-xl active:scale-95 text-[clamp(0.7rem,1.5vw,0.85rem)]"
        >
          View <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default memo(Home);
