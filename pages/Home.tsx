import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-[calc(100vh-96px)] overflow-hidden bg-white">
      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
          <div className="text-sm font-bold tracking-widest animate-pulse">LOADING ARTWORK...</div>
        </div>
      )}

      {/* Spline 3D Scene */}
      <div className={`w-full h-full transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Spline 
          scene="https://prod.spline.design/Jf6flCS8UPgVPfmh/scene.splinecode"
          onLoad={() => setIsLoaded(true)}
        />
      </div>

      {/* Spline Logo Mask */}
      <div className="absolute bottom-0 right-0 w-56 h-20 bg-white z-20 pointer-events-auto" />

      {/* Custom Mask - Center Left */}
      <div className="absolute top-[53%] left-[39%] w-14 h-20 bg-white z-20 pointer-events-none" />

      {/* Overlay Interaction Hint */}
      {isLoaded && (
        <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center justify-center pointer-events-none z-30">
          <Link 
            to="/facing-the-divided-a" 
            className="pointer-events-auto flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full text-xs font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors shadow-lg"
          >
            View Projects <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}