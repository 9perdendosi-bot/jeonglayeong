
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Info() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="min-h-screen bg-white pt-[3rem] pb-[5rem] px-[6%] md:px-[3rem] w-full max-w-[1800px] mx-auto font-sans">
      
      {/* 1. Main Container (Flex) - Wraps Left and Right content */}
      <div className="flex flex-col md:flex-row gap-[3rem] lg:gap-[8rem] h-full">
        
        {/* 2. Left Content (approx 65%) */}
        <div className="w-full md:w-[65%] flex flex-col justify-start">
          
          {/* Bio Text Area - Fluid Typography */}
          <div className="flex flex-col gap-[2rem]">
            <p className="leading-relaxed text-[#1a1a1a] font-bold text-justify tracking-tight text-[clamp(1.1rem,2vw,1.8rem)]">
              안녕하세요. 저는 감각과 구조, 그 사이에서 발생하는 관계에 관심을 두고 작업합니다. 저의 작업은 생명체와 구조가 맺는 역학관계를 시각적으로 탐구를 출발점으로 삼아 드로잉과 설치, 몰입형 경험을 중심으로 작업하고 있습니다.
            </p>
            <p className="leading-relaxed text-[#1a1a1a] font-bold text-justify tracking-tight text-[clamp(1.1rem,2vw,1.8rem)]">
              최근에는 라캉의 이론을 바탕으로 사과를 껍질, 씨앗, 과즙, 과육으로 분리하여 실재와 상징의 경계를 탐구하는 설치 작업을 진행했습니다. 껍질이라는 표면적 이미지와 그 이면에 숨겨진 본질 사이의 간극을 드러내며 언어와 문화의 경계를 넘나드는 더욱 확장된 예술적 소통을 &lt;꿈&gt;꾸고 있습니다.
            </p>
          </div>

        </div>

        {/* 3. Right Content (approx 35%) */}
        <div className="w-full md:w-[35%] flex flex-col justify-between items-end h-full">
          
          {/* Portrait Image Container - Minimalist style without blue border */}
          <div className="w-full mb-[3rem] md:mb-0 relative group">
             {!imgError ? (
               <div className="transition-all duration-500 hover:scale-[1.01]">
                 <img 
                   src="https://i.imgur.com/Ue8fXwk.png" 
                   alt="Portrait" 
                   className="w-full h-auto object-cover block"
                   referrerPolicy="no-referrer"
                   onError={() => setImgError(true)}
                   loading="lazy"
                 />
               </div>
             ) : (
               <div className="w-full aspect-[3/4] bg-gray-100 border border-gray-200 flex flex-col items-center justify-center text-gray-400 p-6 text-center">
                 <span className="text-sm font-bold uppercase tracking-widest mb-2">Image Not Found</span>
                 <span className="text-xs">Failed to load image</span>
               </div>
             )}
          </div>

          {/* Bottom CTA Link */}
          <div className="w-full text-right mt-auto pt-[2rem]">
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-end gap-2 text-gray-400 hover:text-black transition-colors font-light text-[clamp(1.2rem,2.5vw,1.5rem)]"
            >
              Get in touch <ArrowRight size={20} />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
