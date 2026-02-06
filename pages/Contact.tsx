
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Contact() {
  return (
    <div className="w-full h-[calc(100vh-64px)] flex items-center justify-center relative bg-white">
      
      {/* Centered Business Card Box - Fluid width and text */}
      <div className="w-[85vw] max-w-[420px] aspect-[1.75/1] bg-[#bfbfbf] relative p-[5%] md:p-[1.5rem] font-sans mx-auto shadow-none flex flex-col justify-between text-[clamp(0.7rem,1.5vw,0.9rem)]">
        
        {/* Top Left: Email */}
        <div className="text-black tracking-tight md:tracking-wide">
          <a href="mailto:perdendosi9@naver.com" className="hover:opacity-60 transition-opacity font-medium">
            perdendosi9@naver.com
          </a>
        </div>

        {/* Bottom Right: Social Links - Stacked cleanly */}
        <div className="self-end text-right flex flex-col gap-[0.2rem] md:gap-[0.25rem] text-black">
          <span className="hover:opacity-60 transition-opacity cursor-default font-medium">
            T.010-6806-4644
          </span>
          <a 
            href="https://instagram.com/j_eonglayeon_g" 
            target="_blank" 
            rel="noreferrer"
            className="hover:opacity-60 transition-opacity font-medium"
          >
            instar.@j_eonglayeon_g
          </a>
        </div>
      </div>

      {/* Bottom Right Navigation Link - Fluid typography */}
      <div className="absolute bottom-[2.5rem] right-[1.5rem] md:right-[3rem]">
        <Link 
          to="/facing-the-divided-a" 
          className="group flex items-center gap-[0.5rem] md:gap-[0.75rem] text-gray-400 hover:text-black transition-colors font-light"
        >
          <span className="text-[clamp(0.8125rem,2vw,1.25rem)]">Show me some works</span>
          <ArrowRight className="transition-transform duration-300 group-hover:translate-x-2 w-[1rem] h-[1rem] md:w-[1.5rem] md:h-[1.5rem]" />
        </Link>
      </div>
    </div>
  );
}
