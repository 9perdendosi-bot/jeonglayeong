import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Contact() {
  return (
    <div className="w-full h-[calc(100vh-96px)] flex items-center justify-center relative bg-white">
      
      {/* Centered Gray Box */}
      <div className="w-[440px] h-[280px] bg-[#bfbfbf] relative p-6 text-[15px] font-sans mx-4 shadow-none">
        {/* Top Left: Email */}
        <div className="absolute top-6 left-6 text-black tracking-wide">
          <a href="mailto:perdendosi9@naver.com" className="hover:opacity-60 transition-opacity">
            perdendosi9@naver.com
          </a>
        </div>

        {/* Bottom Right: Social Links */}
        <div className="absolute bottom-6 right-6 text-right flex flex-col gap-1 text-black">
          <span className="hover:opacity-60 transition-opacity cursor-default">
            T.010-6806-4644
          </span>
          <a 
            href="https://instagram.com/j_eonglayeon_g" 
            target="_blank" 
            rel="noreferrer"
            className="hover:opacity-60 transition-opacity"
          >
            instar.@j_eonglayeon_g
          </a>
        </div>
      </div>

      {/* Bottom Right Navigation Link */}
      <div className="absolute bottom-12 right-6 md:right-12">
        <Link 
          to="/facing-the-divided-a" 
          className="group flex items-center gap-3 text-xl md:text-2xl text-gray-400 hover:text-black transition-colors font-light"
        >
          Show me some projects 
          <ArrowRight className="transition-transform duration-300 group-hover:translate-x-2" size={24} />
        </Link>
      </div>
    </div>
  );
}